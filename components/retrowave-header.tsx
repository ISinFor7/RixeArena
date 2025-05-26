"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { Menu, X } from "lucide-react"
export function RetrowaveHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as Element).closest(".mobile-menu-container")) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobileMenuOpen])
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-primary/30 sm:px-8">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold z-10">
          <Image
            src="/Logo.ico"
            width={40}
            height={40}
            alt="Logo"
          />
          <span className="text-primary text-xl tracking-wider">Rixe Arena Tournament</span>
        </Link>

        <nav className="hidden ml-auto md:flex items-center gap-4 z-10">
          <Link href="/" className="text-sm font-medium hover:text-secondary transition-colors">
            Accueil
          </Link>
          <Link href="/events" className="text-sm font-medium hover:text-secondary transition-colors">
            Calendrier
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-secondary transition-colors">
            Contact
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden z-10 p-2 text-primary hover:text-secondary transition-colors"
          aria-label="Toggle mobile menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Open Mobile Menu + shadow */}
        {isMobileMenuOpen && (
          <div className="fixed min-h-screen inset-0 bg-black/70 z-40 md:hidden" onClick={() => setIsMobileMenuOpen(false)} />
        )}

        {/* Mobile Menu */}
        <div
          className={`mobile-menu-container fixed top-0 right-0 h-screen w-64 bg-card/95 backdrop-blur-md border-l border-primary/30 transform transition-transform duration-300 ease-in-out z-50 md:hidden ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full hidden"
          }`}
        >
          <div className="flex justify-end p-4 border-b border-primary/20">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-primary hover:text-secondary transition-colors"
              aria-label="Close mobile menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-col p-6 space-y-4">
            <Link href="/" className="text-lg font-medium hover:text-secondary transition-colors py-2 border-b border-primary/20" onClick={() => setIsMobileMenuOpen(false)}>
              Accueil
            </Link>
            <Link href="/events" className="text-lg font-medium hover:text-secondary transition-colors py-2 border-b border-primary/20" onClick={() => setIsMobileMenuOpen(false)}>
              Calendrier
            </Link>
            <Link href="/contact" className="text-lg font-medium hover:text-secondary transition-colors py-2 border-b border-primary/20" onClick={() => setIsMobileMenuOpen(false)}>
              Contact
            </Link>

            {/* Additional mobile-only options 
            <div className="pt-4 mt-4 border-t border-primary/20">
              <p className="text-xs text-muted-foreground mb-2">QUICK ACTIONS</p>
              <Link
                href="/search"
                className="text-sm font-medium hover:text-secondary transition-colors py-1 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                SEARCH ARTICLES
              </Link>
              <Link
                href="/categories"
                className="text-sm font-medium hover:text-secondary transition-colors py-1 block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CATEGORIES
              </Link>
            </div>*/}
          </nav>
        </div>
      </div>
    </header>
  )
}
