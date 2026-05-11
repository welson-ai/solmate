'use client'

import Link from 'next/link'

export function Opportunity() {
  return (
    <section id="opportunity" className="w-full py-24 relative overflow-hidden">
      {/* ROW 1 - WHITE BACKGROUND */}
      <div className="bg-white pb-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center min-h-[400px]">
            {/* LEFT SIDE - Text Content */}
            <div className="space-y-6">
              {/* Small green uppercase label */}
              <p className="text-[#00C896] font-bold text-sm tracking-widest">THE OPPORTUNITY</p>
              
              {/* Large bold dark heading */}
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                The Capital of Capital.
              </h2>

              {/* Subtext */}
              <p className="text-gray-900/75 text-lg max-w-[500px] leading-relaxed">
                Capital flows to where it works hardest. Solmate puts yours 
                at the front of the line.
              </p>

              {/* 4 Stat Cards in a row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Card 1 */}
                <div className="p-4 rounded-lg border border-[#00C896]/30 bg-white hover:shadow-lg hover:shadow-[#00C896]/20 transition-all hover:scale-105">
                  <div className="text-2xl md:text-3xl font-bold text-[#00C896] mb-1">$9.4B+</div>
                  <div className="text-xs md:text-sm text-gray-700">Solana DeFi TVL</div>
                </div>
                
                {/* Card 2 */}
                <div className="p-4 rounded-lg border border-[#00C896]/30 bg-white hover:shadow-lg hover:shadow-[#00C896]/20 transition-all hover:scale-105">
                  <div className="text-2xl md:text-3xl font-bold text-[#00C896] mb-1">10–30%</div>
                  <div className="text-xs md:text-sm text-gray-700">APY Across Top Pools</div>
                </div>
                
                {/* Card 3 */}
                <div className="p-4 rounded-lg border border-[#00C896]/30 bg-white hover:shadow-lg hover:shadow-[#00C896]/20 transition-all hover:scale-105">
                  <div className="text-2xl md:text-3xl font-bold text-[#00C896] mb-1">$700M+</div>
                  <div className="text-xs md:text-sm text-gray-700">Daily Jupiter Volume</div>
                </div>
                
                {/* Card 4 */}
                <div className="p-4 rounded-lg border border-[#00C896]/30 bg-white hover:shadow-lg hover:shadow-[#00C896]/20 transition-all hover:scale-105">
                  <div className="text-2xl md:text-3xl font-bold text-[#00C896] mb-1">400ms</div>
                  <div className="text-xs md:text-sm text-gray-700">Transaction Finality</div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - Image placeholder */}
            <div className="hidden md:flex items-center justify-center">
              <div className="w-full h-80 bg-[#f5f5f5] rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-sm">[ Image coming soon ]</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ROW 2 - DARK BLACK BACKGROUND */}
      <div className="bg-[#050505] pt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center min-h-[400px]">
            {/* LEFT SIDE - Image placeholder */}
            <div className="hidden md:flex items-center justify-center">
              <div className="w-full h-80 bg-[#111111] rounded-lg flex items-center justify-center">
                <span className="text-gray-500 text-sm">[ Image coming soon ]</span>
              </div>
            </div>

            {/* RIGHT SIDE - Text Content */}
            <div className="space-y-6">
              {/* Small green uppercase label */}
              <p className="text-[#00C896] font-bold text-sm tracking-widest">YOUR EDGE</p>
              
              {/* Large bold white heading */}
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Stop Leaving Yield On The Table.
              </h2>

              {/* Subtext */}
              <p className="text-white/75 text-lg max-w-[500px] leading-relaxed">
                Solmate monitors every position, executes the best strategy 
                and compounds your returns — while you do nothing.
              </p>

              {/* 4 Stat Cards in a row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Card 1 */}
                <div className="p-4 rounded-lg border border-[#00C896]/20 bg-black/50 hover:bg-black/70 transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#00C896]/20">
                  <div className="text-2xl md:text-3xl font-bold text-[#00C896] mb-1">10–30%</div>
                  <div className="text-xs md:text-sm text-white/80">APY Available</div>
                </div>
                
                {/* Card 2 */}
                <div className="p-4 rounded-lg border border-[#00C896]/20 bg-black/50 hover:bg-black/70 transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#00C896]/20">
                  <div className="text-2xl md:text-3xl font-bold text-[#00C896] mb-1">24/7</div>
                  <div className="text-xs md:text-sm text-white/80">Autonomous Monitoring</div>
                </div>
                
                {/* Card 3 */}
                <div className="p-4 rounded-lg border border-[#00C896]/20 bg-black/50 hover:bg-black/70 transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#00C896]/20">
                  <div className="text-2xl md:text-3xl font-bold text-[#00C896] mb-1">9+</div>
                  <div className="text-xs md:text-sm text-white/80">Protocols Working For You</div>
                </div>
                
                {/* Card 4 */}
                <div className="p-4 rounded-lg border border-[#00C896]/20 bg-black/50 hover:bg-black/70 transition-all hover:scale-105 hover:shadow-lg hover:shadow-[#00C896]/20">
                  <div className="text-2xl md:text-3xl font-bold text-[#00C896] mb-1">100%</div>
                  <div className="text-xs md:text-sm text-white/80">Non-Custodial</div>
                </div>
              </div>

              {/* Green CTA button */}
              <div className="flex justify-center mt-8">
                <Link href="/app" className="px-8 py-3 bg-[#00C896] text-black font-bold rounded-full text-lg hover:bg-[#00a878] transition transform hover:scale-105 shadow-lg inline-block">
                  Launch App
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
