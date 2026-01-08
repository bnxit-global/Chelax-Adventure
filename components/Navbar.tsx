import { Menu, Plane, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { NavLinkType } from '../types'

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileOpen])

  const navLinks = Object.values(NavLinkType)

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md border-border/40 py-3 shadow-sm'
          : 'bg-transparent border-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div
            className={`p-2.5 rounded-xl transition-all duration-300 ${
              isScrolled
                ? 'bg-primary/10 text-primary'
                : 'bg-white/20 backdrop-blur-sm text-white'
            }`}
          >
            <Plane className="w-5 h-5 transform group-hover:-rotate-45 transition-transform duration-500" />
          </div>
          <div className="flex flex-col">
            <span
              className={`font-serif text-xl font-bold tracking-wider leading-none ${
                isScrolled ? 'text-foreground' : 'text-white'
              }`}
            >
              CHELAX
            </span>
            <span
              className={`text-[0.6rem] uppercase tracking-[0.25em] font-medium leading-none mt-1 ${
                isScrolled ? 'text-primary' : 'text-white/80'
              }`}
            >
              Adventures
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 hover:bg-white/10 ${
                isScrolled
                  ? 'text-muted-foreground hover:text-primary hover:bg-primary/5'
                  : 'text-white/90 hover:text-white'
              }`}
            >
              {link}
            </a>
          ))}
          <div className="ml-4">
            <a
              href="#contact"
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 ${
                isScrolled
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : 'bg-white text-primary hover:bg-white/90'
              }`}
            >
              Start Planning
            </a>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden p-2 rounded-lg transition-colors ${
            isScrolled
              ? 'text-foreground hover:bg-secondary'
              : 'text-white hover:bg-white/10'
          }`}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileOpen && (
        <div
          className={`fixed top-0 left-0 right-0 bottom-0 bg-background/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center space-y-8 lg:hidden`}
          onClick={() => setIsMobileOpen(false)}
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              onClick={(e) => {
                e.stopPropagation()
                setIsMobileOpen(false)
              }}
              className="text-foreground text-3xl font-serif font-light hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
          <button
            onClick={() => setIsMobileOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-secondary text-foreground"
          >
            <X size={24} />
          </button>
        </div>
      )}
    </nav>
  )
}

export default Navbar
