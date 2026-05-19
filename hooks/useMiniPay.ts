'use client'

import { useState, useEffect, useCallback } from 'react'

interface MiniPayState {
  isMiniPay: boolean
  isConnected: boolean
  address: string | null
  chainId: number | null
  balance: string | null
  error: string | null
  isLoading: boolean
}

interface UseMiniPayReturn extends MiniPayState {
  connect: () => Promise<string | null>
  disconnect: () => void
  sendCUSD: (to: string, amount: string) => Promise<string | null>
  getBalance: () => Promise<string | null>
  switchToCelo: () => Promise<boolean>
}

// Celo Mainnet config
const CELO_CHAIN_ID = 42220
const CELO_CONFIG = {
  chainId: '0xa4ec', // 42220 in hex
  chainName: 'Celo Mainnet',
  nativeCurrency: { name: 'CELO', symbol: 'CELO', decimals: 18 },
  rpcUrls: ['https://forno.celo.org'],
  blockExplorerUrls: ['https://celoscan.io'],
}

// cUSD contract address on Celo Mainnet
const CUSD_ADDRESS = '0x765DE816845861e75A25fCA122bb6898B8B1282a'

// Minimal ERC20 ABI for balance and transfer
const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function decimals() view returns (uint8)',
]

declare global {
  interface Window {
    ethereum?: {
      isMiniPay?: boolean
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
      on: (event: string, callback: (...args: unknown[]) => void) => void
      removeListener: (event: string, callback: (...args: unknown[]) => void) => void
    }
  }
}

export function useMiniPay(): UseMiniPayReturn {
  const [state, setState] = useState<MiniPayState>({
    isMiniPay: false,
    isConnected: false,
    address: null,
    chainId: null,
    balance: null,
    error: null,
    isLoading: true,
  })

  // Check if running in MiniPay
  useEffect(() => {
    const checkMiniPay = async () => {
      if (typeof window === 'undefined' || !window.ethereum) {
        setState(prev => ({ ...prev, isLoading: false }))
        return
      }

      const isMiniPay = window.ethereum.isMiniPay === true
      setState(prev => ({ ...prev, isMiniPay, isLoading: false }))

      // Auto-connect if MiniPay
      if (isMiniPay) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' }) as string[]
          if (accounts.length > 0) {
            const chainId = await window.ethereum.request({ method: 'eth_chainId' }) as string
            setState(prev => ({
              ...prev,
              isConnected: true,
              address: accounts[0],
              chainId: parseInt(chainId, 16),
            }))
          }
        } catch (err) {
          console.error('MiniPay auto-connect error:', err)
        }
      }
    }

    checkMiniPay()
  }, [])

  // Listen for account/chain changes
  useEffect(() => {
    if (typeof window === 'undefined' || !window.ethereum) return

    const handleAccountsChanged = (accounts: unknown) => {
      const accts = accounts as string[]
      if (accts.length === 0) {
        setState(prev => ({ ...prev, isConnected: false, address: null, balance: null }))
      } else {
        setState(prev => ({ ...prev, isConnected: true, address: accts[0] }))
      }
    }

    const handleChainChanged = (chainId: unknown) => {
      setState(prev => ({ ...prev, chainId: parseInt(chainId as string, 16) }))
    }

    window.ethereum.on('accountsChanged', handleAccountsChanged)
    window.ethereum.on('chainChanged', handleChainChanged)

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged)
      window.ethereum?.removeListener('chainChanged', handleChainChanged)
    }
  }, [])

  // Connect wallet
  const connect = useCallback(async (): Promise<string | null> => {
    if (!window.ethereum) {
      setState(prev => ({ ...prev, error: 'No wallet found' }))
      return null
    }

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))
      
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      }) as string[]

      const chainId = await window.ethereum.request({ method: 'eth_chainId' }) as string

      setState(prev => ({
        ...prev,
        isConnected: true,
        address: accounts[0],
        chainId: parseInt(chainId, 16),
        isLoading: false,
      }))

      return accounts[0]
    } catch (err) {
      const error = err as Error
      setState(prev => ({ ...prev, error: error.message, isLoading: false }))
      return null
    }
  }, [])

  // Disconnect
  const disconnect = useCallback(() => {
    setState(prev => ({
      ...prev,
      isConnected: false,
      address: null,
      balance: null,
    }))
  }, [])

  // Get cUSD balance
  const getBalance = useCallback(async (): Promise<string | null> => {
    if (!window.ethereum || !state.address) return null

    try {
      // Encode balanceOf call
      const data = '0x70a08231' + state.address.slice(2).padStart(64, '0')
      
      const result = await window.ethereum.request({
        method: 'eth_call',
        params: [{ to: CUSD_ADDRESS, data }, 'latest'],
      }) as string

      const balance = parseInt(result, 16) / 1e18
      const formatted = balance.toFixed(2)
      
      setState(prev => ({ ...prev, balance: formatted }))
      return formatted
    } catch (err) {
      console.error('Balance fetch error:', err)
      return null
    }
  }, [state.address])

  // Send cUSD
  const sendCUSD = useCallback(async (to: string, amount: string): Promise<string | null> => {
    if (!window.ethereum || !state.address) {
      setState(prev => ({ ...prev, error: 'Wallet not connected' }))
      return null
    }

    try {
      setState(prev => ({ ...prev, isLoading: true, error: null }))

      // Convert amount to wei (18 decimals)
      const amountWei = BigInt(Math.floor(parseFloat(amount) * 1e18))
      const amountHex = '0x' + amountWei.toString(16).padStart(64, '0')
      
      // Encode transfer(address,uint256)
      const data = '0xa9059cbb' + to.slice(2).padStart(64, '0') + amountHex.slice(2)

      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: state.address,
          to: CUSD_ADDRESS,
          data,
        }],
      }) as string

      setState(prev => ({ ...prev, isLoading: false }))
      return txHash
    } catch (err) {
      const error = err as Error
      setState(prev => ({ ...prev, error: error.message, isLoading: false }))
      return null
    }
  }, [state.address])

  // Switch to Celo network
  const switchToCelo = useCallback(async (): Promise<boolean> => {
    if (!window.ethereum) return false

    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: CELO_CONFIG.chainId }],
      })
      return true
    } catch (switchError) {
      // Chain not added, try to add it
      try {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [CELO_CONFIG],
        })
        return true
      } catch (addError) {
        console.error('Failed to add Celo network:', addError)
        return false
      }
    }
  }, [])

  return {
    ...state,
    connect,
    disconnect,
    sendCUSD,
    getBalance,
    switchToCelo,
  }
}
