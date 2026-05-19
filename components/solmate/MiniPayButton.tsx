'use client'

import { useMiniPay } from '@/hooks/useMiniPay'
import { useEffect } from 'react'

export function MiniPayButton() {
  const {
    isMiniPay,
    isConnected,
    address,
    balance,
    isLoading,
    error,
    connect,
    disconnect,
    getBalance,
    switchToCelo,
    chainId,
  } = useMiniPay()

  // Fetch balance when connected
  useEffect(() => {
    if (isConnected && address) {
      getBalance()
    }
  }, [isConnected, address, getBalance])

  // Auto switch to Celo if wrong network
  useEffect(() => {
    if (isConnected && chainId && chainId !== 42220) {
      switchToCelo()
    }
  }, [isConnected, chainId, switchToCelo])

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  if (isLoading) {
    return (
      <button
        disabled
        className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-full opacity-50 cursor-not-allowed"
      >
        Loading...
      </button>
    )
  }

  if (isConnected && address) {
    return (
      <div className="flex items-center gap-3">
        {balance && (
          <span className="text-[#00C896] font-medium">
            {balance} cUSD
          </span>
        )}
        <button
          onClick={disconnect}
          className="px-6 py-3 bg-[#1a1a2e] border border-[#00C896] text-[#00C896] font-semibold rounded-full hover:bg-[#00C896] hover:text-black transition-all"
        >
          {formatAddress(address)}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={connect}
        className="px-8 py-3 bg-[#00C896] text-black font-bold rounded-full text-lg hover:bg-[#00a878] transition transform hover:scale-105 shadow-lg flex items-center gap-2"
      >
        {isMiniPay ? (
          <>
            <MiniPayIcon />
            Connect MiniPay
          </>
        ) : (
          'Connect Wallet'
        )}
      </button>
      {error && (
        <span className="text-red-400 text-sm">{error}</span>
      )}
      {isMiniPay && (
        <span className="text-gray-400 text-xs">MiniPay detected</span>
      )}
    </div>
  )
}

function MiniPayIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="10" fill="#FCFF52" />
      <path
        d="M8 12L11 15L16 9"
        stroke="#000"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
