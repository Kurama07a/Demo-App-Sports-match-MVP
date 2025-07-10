"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Trophy, Home, Info, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled ? "glassmorphic py-2" : "bg-transparent py-4",
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-3xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-glow">
            KLIMB
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-white/80 hover:text-primary font-medium transition-colors flex items-center">
            <Home size={16} className="mr-1" /> Home
          </Link>
          <Link
            href="/assessment"
            className="text-white/80 hover:text-primary font-medium transition-colors flex items-center"
          >
            <Trophy size={16} className="mr-1" /> Games
          </Link>
          <Link
            href="/find-center"
            className="text-white/80 hover:text-primary font-medium transition-colors flex items-center"
          >
            <MapPin size={16} className="mr-1" /> Centers
          </Link>
          <Link
            href="/about"
            className="text-white/80 hover:text-primary font-medium transition-colors flex items-center"
          >
            <Info size={16} className="mr-1" /> About
          </Link>
          <Link href="/auth/login" className="text-white/80 hover:text-primary font-medium transition-colors">
            Login
          </Link>
          <Button
            asChild
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold rounded-full px-6 py-2 transition-all transform hover:scale-105 border border-white/20"
          >
            <Link href="/assessment">Play Now</Link>
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden glassmorphic rounded-b-2xl px-4 py-4 absolute top-full left-0 right-0 z-50 transition-all duration-300 ease-in-out">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-white/80 hover:text-primary font-medium py-2 transition-colors flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Home size={16} className="mr-2" /> Home
            </Link>
            <Link
              href="/assessment"
              className="text-white/80 hover:text-primary font-medium py-2 transition-colors flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Trophy size={16} className="mr-2" /> Games
            </Link>
            <Link
              href="/find-center"
              className="text-white/80 hover:text-primary font-medium py-2 transition-colors flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <MapPin size={16} className="mr-2" /> Centers
            </Link>
            <Link
              href="/about"
              className="text-white/80 hover:text-primary font-medium py-2 transition-colors flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Info size={16} className="mr-2" /> About
            </Link>
            <Link
              href="/auth/login"
              className="text-white/80 hover:text-primary font-medium py-2 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Button
              asChild
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold rounded-full px-6 py-2 transition-all transform hover:scale-105 border border-white/20"
              onClick={() => setIsOpen(false)}
            >
              <Link href="/assessment">Play Now</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
