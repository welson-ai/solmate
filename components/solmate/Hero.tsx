'use client'

import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative w-full h-[95vh] bg-solmate-black flex items-center justify-center overflow-hidden">
      {/* Full-screen Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        style={{ position: 'absolute', top: '0', left: '0', width: '100%', height: '100%', objectFit: 'cover', zIndex: '0' }}
      >
        <source src="https://drive.google.com/uc?export=download&id=15GGOMKDV1jE_hfyBRWAmIURA3jVsqtqt" type="video/mp4" />
        {/* Fallback to local file */}
        <source src="./assets/hero-video.mp4" type="video/mp4" />
      </video>
      
      {/* Content Wrapper */}
      <div className="relative z-1 text-center" style={{ position: 'relative', zIndex: '1' }}>
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-none">
            Your <span className="text-[#00C896]">Intelligent</span> <span className="text-[#00C896]">DeFi</span> Assistant
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-16">
            Solmate combines advanced AI with Solana&apos;s speed to give you 24/7 yield optimization. 
            Monitor positions, execute strategies, and maximize returns—all with complete control.
          </p>
          <Link href="/app" className="px-10 py-4 bg-[#00C896] text-black font-bold rounded-full text-lg hover:bg-[#00a878] transition transform hover:scale-105 shadow-lg inline-block">
            Get Started
          </Link>
        </div>
      </div>
    </section>
  )
}
