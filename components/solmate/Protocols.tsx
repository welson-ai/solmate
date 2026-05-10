'use client'

import Image from 'next/image'

export function Protocols() {
  return (
    <section id="protocols" className="w-full bg-solmate-black py-20 md:py-32 relative overflow-hidden">
      {/* Background Map */}
      <div className="absolute inset-0 opacity-60">
        <Image
          src="/assets/image.png"
          alt="World map"
          fill
          className="object-cover"
          style={{ objectPosition: 'center center' }}
          quality={85}
          priority={false}
        />
      </div>

      {/* Darker overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Card Content */}
          <div className="p-8 md:p-12 rounded-2xl backdrop-blur-md" style={{ backgroundColor: 'rgba(255,255,255,0.85)', border: '1px solid rgba(0,200,150,0.3)', backdropFilter: 'blur(8px)' }}>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
              All Protocols. <span className="text-[#00C896]">One Assistant.</span>
            </h2>

            <p className="text-gray-800 mb-8 leading-relaxed">
              Solmate connects to more than 9 major Solana protocols — monitoring positions, optimizing yield and executing strategies across the deepest liquidity in DeFi, all in one place.
            </p>

            {/* Bullet Points */}
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-[#00C896] font-bold text-lg mt-1">—</span>
                <p className="text-gray-700">
                  <span className="font-bold text-gray-900">Deep Protocol Coverage</span> — Kamino, Jupiter, Drift, Raydium, Meteora, Jito, Marinade, Orca and MarginFi
                </p>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-[#00C896] font-bold text-lg mt-1">—</span>
                <p className="text-gray-700">
                  <span className="font-bold text-gray-900">One Interface</span> — manage every position, swap, and yield strategy from a single AI-powered assistant
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Empty space for now */}
          <div className="hidden md:flex flex-col justify-center items-center relative w-full h-96">
            {/* Content removed to reduce visual noise */}
          </div>
        </div>
      </div>
    </section>
  )
}
