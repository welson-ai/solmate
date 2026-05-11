'use client'

import Link from 'next/link'
import { ArrowLeft, Send, Plus, LogOut } from 'lucide-react'
import { useWallet, useConnection } from '@solana/wallet-adapter-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function ChatPage() {
  const { publicKey, disconnect, connected } = useWallet()
  const { connection } = useConnection()
  const router = useRouter()

  useEffect(() => {
    // Check for localStorage connection or wallet adapter connection
    const storedKey = localStorage.getItem('phantomPublicKey')
    if (!connected && !storedKey) {
      router.push('/app')
    }
  }, [connected, router])

  const handleDisconnect = async () => {
    localStorage.removeItem('phantomPublicKey')
    await disconnect()
    router.push('/app')
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }
  return (
    <div className="min-h-screen bg-[#050505] flex">
      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-[#0a0a0a] border-r border-[#1a1a1a] flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-[#1a1a1a]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00C896] rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-lg">S</span>
            </div>
            <span className="text-white font-bold text-xl">Solmate</span>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button className="w-full bg-[#00C896] text-black font-medium py-3 px-4 rounded-lg hover:bg-[#00a878] transition flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>

        {/* Previous Chats */}
        <div className="flex-1 px-4 space-y-2">
          <div className="text-gray-400 text-sm py-2 px-3 hover:bg-[#1a1a1a] rounded cursor-pointer transition">
            Kamino vault optimization
          </div>
          <div className="text-gray-400 text-sm py-2 px-3 hover:bg-[#1a1a1a] rounded cursor-pointer transition">
            Jupiter swap strategy
          </div>
          <div className="text-gray-400 text-sm py-2 px-3 hover:bg-[#1a1a1a] rounded cursor-pointer transition">
            Portfolio rebalancing
          </div>
        </div>

        {/* Connected Wallet */}
        <div className="p-4 border-t border-[#1a1a1a]">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#00C896] rounded-full"></div>
              <span className="text-gray-400 text-sm">
                {publicKey ? formatAddress(publicKey.toString()) : localStorage.getItem('phantomPublicKey') ? formatAddress(localStorage.getItem('phantomPublicKey')!) : 'Not connected'}
              </span>
            </div>
            <button
              onClick={handleDisconnect}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition text-xs"
            >
              <LogOut className="w-3 h-3" />
              Disconnect
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-[#0a0a0a] border-b border-[#1a1a1a] px-6 py-4">
          <div className="flex items-center gap-3">
            <Link href="/app" className="text-gray-400 hover:text-white transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <span className="text-white font-medium">Solmate AI</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-[#00C896] rounded-full"></div>
                <span className="text-[#00C896] text-xs">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Message 1 - Solmate */}
          <div className="flex justify-start">
            <div className="max-w-lg bg-[#111111] rounded-lg p-4">
              <p className="text-white">
                👋 Welcome to Solmate! I'm monitoring your wallet across Kamino, Jupiter, Drift, Raydium, Meteora and more. What would you like to optimize today?
              </p>
            </div>
          </div>

          {/* Message 2 - User */}
          <div className="flex justify-end">
            <div className="max-w-lg bg-[#00C896] rounded-lg p-4">
              <p className="text-black font-medium">
                Show me my current positions
              </p>
            </div>
          </div>

          {/* Message 3 - Solmate */}
          <div className="flex justify-start">
            <div className="max-w-lg bg-[#111111] rounded-lg p-4">
              <p className="text-white">
                I'm scanning your portfolio across all integrated protocols... Connect your wallet to see live position data, APY opportunities and personalized yield strategies.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Input Bar */}
        <div className="bg-[#0a0a0a] border-t border-[#1a1a1a] p-4">
          <div className="flex gap-3 mb-2">
            <input
              type="text"
              placeholder="Ask Solmate anything..."
              className="flex-1 bg-[#111111] text-white placeholder-gray-500 rounded-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#00C896]"
            />
            <button className="bg-[#00C896] text-black p-3 rounded-full hover:bg-[#00a878] transition">
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-500 text-xs opacity-40 text-center">
            Solmate may make mistakes. Always verify before executing transactions.
          </p>
        </div>
      </div>
    </div>
  )
}
