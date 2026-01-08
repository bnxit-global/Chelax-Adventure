import { ArrowDown, Star } from 'lucide-react'
import React from 'react'

const Hero: React.FC = () => {
  return (
    <div
      id="home"
      className="relative h-screen min-h-[700px] w-full overflow-hidden flex items-center justify-center bg-zinc-900"
    >
      {/* Background with Video and Overlay */}
      <div className="absolute inset-0 z-0 select-none">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source src="/assets/background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/50" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-10 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8">
          <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
          <span className="text-xs font-medium text-white/90 uppercase tracking-widest">
            Voted Tampa's Best
          </span>
        </div>

        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-medium leading-[1.1] mb-6 tracking-tight drop-shadow-2xl">
          Travel{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-chelax-lightTeal to-white italic pr-2">
            Effortlessly.
          </span>
        </h1>

        <p className="text-white/80 text-lg md:text-xl font-light mb-10 max-w-2xl mx-auto leading-relaxed">
          We handle every detail of your dream vacation, letting you relax,
          explore, and savor the world without a worry.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#book"
            className="min-w-[160px] bg-primary text-white px-8 py-4 rounded-full font-semibold tracking-wide hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-primary/20 hover:-translate-y-1"
          >
            Book Your Trip
          </a>
          <a
            href="#about"
            className="min-w-[160px] group bg-white/5 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold tracking-wide hover:bg-white/10 transition-all duration-300 hover:-translate-y-1"
          >
            Learn More
          </a>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/50 animate-bounce cursor-pointer hover:text-white transition-colors">
        <ArrowDown size={28} />
      </div>
    </div>
  )
}

export default Hero
