'use client'

import Link from 'next/link'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function AppPage() {
  const { select, wallets, connect, connecting } = useWallet()
  const { connection } = useConnection()
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  // Debug: Check if wallets are detected
  console.log('Available wallets:', wallets)
  console.log('Connecting:', connecting)

  // Manual wallet list for fallback
  const manualWallets = [
    { name: 'Phantom', icon: '👻', url: 'https://phantom.app/' },
    { name: 'Solflare', icon: '🔆', url: 'https://solflare.com/' }
  ]

  const handleConnect = async (walletName: string) => {
    try {
      setError(null)
      
      if (walletName === 'Phantom') {
        // Direct Phantom connection
        if (typeof window !== 'undefined' && (window as any).phantom?.solana) {
          try {
            const phantom = (window as any).phantom.solana
            const response = await phantom.connect()
            console.log('Phantom connected:', response.publicKey)
            
            // Navigate to chat with connection info
            localStorage.setItem('phantomPublicKey', response.publicKey.toString())
            router.push('/app/chat')
            return
          } catch (err) {
            console.error('Direct Phantom connection error:', err)
            setError('Phantom connection failed. Please try again.')
          }
        } else {
          setError('Phantom not detected. Please install Phantom extension.')
        }
      }
      
      // Try wallet adapter for other wallets
      const wallet = wallets.find(w => w.adapter.name === walletName)
      if (wallet) {
        select(wallet.adapter.name)
        await connect()
        router.push('/app/chat')
      } else if (walletName !== 'Phantom') {
        setError('Wallet not found. Please make sure it\'s installed and unlocked.')
      }
    } catch (err) {
      console.error('Connection error:', err)
      setError('Failed to connect. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col">
      {/* Back to landing page */}
      <div className="absolute top-6 left-6">
        <Link 
          href="/"
          className="flex items-center gap-2 text-gray-400 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back</span>
        </Link>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="w-full max-w-md">
          {/* Logo and wordmark */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-12 bg-[#00C896] rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-xl">S</span>
              </div>
              <span className="text-white font-bold text-2xl">Solmate</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-white text-center mb-4">
            Connect Your Wallet
          </h1>

          {/* Subtext */}
          <p className="text-gray-400 text-center mb-12">
            Connect a Solana wallet to start optimizing your yield with Solmate.
          </p>

          {/* Wallet buttons */}
          <div className="space-y-3 mb-8">
            {wallets.length > 0 && (
              <div className="mb-4">
                <p className="text-gray-400 text-sm mb-2">Detected wallets:</p>
                {wallets.map((wallet) => (
                  <button
                    key={wallet.adapter.name}
                    onClick={() => handleConnect(wallet.adapter.name)}
                    disabled={connecting}
                    className="w-full flex items-center gap-4 p-4 bg-[#111111] rounded-lg hover:border hover:border-[#00C896] transition-all hover:scale-105 group disabled:opacity-50 disabled:cursor-not-allowed mb-2"
                  >
                    <span className="text-2xl">
                      {wallet.adapter.name === 'Phantom' && '👻'}
                      {wallet.adapter.name === 'Solflare' && '🔆'}
                    </span>
                    <span className="text-white font-medium">{wallet.adapter.name}</span>
                    {connecting && <Loader2 className="w-4 h-4 animate-spin ml-auto" />}
                  </button>
                ))}
              </div>
            )}
            
            <div>
              <p className="text-gray-400 text-sm mb-2">Manual connection:</p>
              <button
                onClick={() => handleConnect('Phantom')}
                disabled={connecting}
                className="w-full flex items-center gap-4 p-4 bg-[#111111] rounded-lg hover:border hover:border-[#00C896] transition-all hover:scale-105 group disabled:opacity-50 disabled:cursor-not-allowed mb-2"
              >
                <span className="text-2xl">👻</span>
                <span className="text-white font-medium">Connect Phantom</span>
                {connecting && <Loader2 className="w-4 h-4 animate-spin ml-auto" />}
              </button>
              
              <p className="text-gray-400 text-sm mb-2 mt-4">Or install a wallet:</p>
              {manualWallets.map((wallet) => (
                <a
                  key={wallet.name}
                  href={wallet.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-4 p-4 bg-[#111111] rounded-lg hover:border hover:border-[#00C896] transition-all hover:scale-105 group mb-2 block"
                >
                  <span className="text-2xl">{wallet.icon}</span>
                  <span className="text-white font-medium">Install {wallet.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Error message */}
          {error && (
            <div className="mb-4 text-center">
              <span className="text-red-500 text-sm">{error}</span>
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-gray-500 text-xs text-center opacity-50">
            Non-custodial. Solmate never holds your assets or private keys.
          </p>
        </div>
      </div>
    </div>
  )
}
