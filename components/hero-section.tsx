"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Set up scroll-linked animation for hero section exit
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  // Transform scroll progress to opacity and movement
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return

      const { left, top, width, height } = containerRef.current.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      const elements = containerRef.current.querySelectorAll(".floating-icon")
      elements.forEach((el) => {
        const element = el as HTMLElement
        const speed = Number.parseFloat(element.getAttribute("data-speed") || "1")
        element.style.transform = `translate(${x * 20 * speed}px, ${y * 20 * speed}px)`
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <motion.section
      className="relative min-h-screen flex items-center pt-16 overflow-hidden"
      ref={containerRef}
      style={{ opacity, y }}
    >
      {/* Floating Sports Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="floating-icon absolute top-1/4 left-1/5 w-12 h-12 opacity-20" data-speed="2">
          <Image src="/placeholder.svg?height=48&width=48" alt="Basketball" width={48} height={48} />
        </div>
        <div className="floating-icon absolute top-1/3 right-1/4 w-10 h-10 opacity-20" data-speed="1.5">
          <Image src="/placeholder.svg?height=40&width=40" alt="Soccer" width={40} height={40} />
        </div>
        <div className="floating-icon absolute bottom-1/4 left-1/3 w-14 h-14 opacity-20" data-speed="1.8">
          <Image src="/placeholder.svg?height=56&width=56" alt="Tennis" width={56} height={56} />
        </div>
        <div className="floating-icon absolute top-2/3 right-1/5 w-16 h-16 opacity-20" data-speed="1.2">
          <Image src="/placeholder.svg?height=64&width=64" alt="Swimming" width={64} height={64} />
        </div>
      </div>

      <div className="container mx-auto px-4 z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 text-white">
              Let's Find Your{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-glow">
                SUPER SPORT!
              </span>
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Hi there! I'm Klim, your sports buddy! Together we'll go on an AWESOME adventure to discover the perfect
              sport for YOU!
            </p>
            <Button
              asChild
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold rounded-full px-8 py-6 text-lg transition-all transform hover:scale-105 hover:shadow-lg border border-white/20 red-glow"
            >
              <Link href="#quiz">Play the Fun Quiz!</Link>
            </Button>
          </motion.div>

          <motion.div
            className="md:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full h-[400px] md:h-[500px]">
              <Image
                src="/images/klimb-mascot.png"
                alt="KLIMB Mascot"
                fill
                className="object-contain"
                style={{ filter: "drop-shadow(0 0 20px rgba(255, 59, 48, 0.5))" }}
              />
            </div>
            <motion.div
              className="absolute -bottom-10 -right-10 glassmorphic-light text-white p-4 rounded-2xl font-bold shadow-lg transform rotate-6 z-20 border border-primary/30"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring", stiffness: 200 }}
            >
              Hey friend! I'm Klim! Let's play!
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
      >
        <p className="text-white/70 mb-2">Scroll to start your journey</p>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-primary"
        >
          <path
            d="M12 5L12 19M12 19L19 12M12 19L5 12"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </motion.section>
  )
}
