"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Alex, 9",
    quote: "Swimming is SO COOL! I never knew I'd love it this much! Thanks Klim!",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Sarah's Mom",
    quote: "My daughter LOVES gymnastics now! We never would have tried it without KLIMB's fun quiz!",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Jayden, 11",
    quote: "The quiz was super fun and now I'm playing basketball with awesome coaches!",
    rating: 4,
    avatar: "/placeholder.svg?height=80&width=80",
  },
  {
    name: "Emma's Dad",
    quote: "Emma is CRAZY about rock climbing now! She's been doing it for 6 months and has so much fun!",
    rating: 5,
    avatar: "/placeholder.svg?height=80&width=80",
  },
]

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id="testimonials" ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            What Other Kids{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-glow">
              Say About Us
            </span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Check out what other awesome kids and their parents think about their KLIMB adventure!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface TestimonialCardProps {
  testimonial: {
    name: string
    quote: string
    rating: number
    avatar: string
  }
  index: number
  isInView: boolean
}

function TestimonialCard({ testimonial, index, isInView }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: 0.1 * index }}
      className="glassmorphic rounded-2xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl border border-white/10 white-glow"
    >
      <div className="flex items-center mb-4">
        <div className="relative w-16 h-16 mr-4 rounded-full overflow-hidden border-2 border-primary/50">
          <Image src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} fill className="object-cover" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
          <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={16}
                className={`${i < testimonial.rating ? "text-primary fill-primary" : "text-white/20"}`}
              />
            ))}
          </div>
        </div>
      </div>
      <p className="text-white/80 italic">"{testimonial.quote}"</p>
    </motion.div>
  )
}
