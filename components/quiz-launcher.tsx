"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

export default function QuizLauncher() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <section id="quiz" ref={ref} className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready for a{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-glow">
                FUN QUIZ?
              </span>
            </h2>
            <p className="text-lg text-white/80 mb-8">
              Hey! It's me, Klim! Let's play a super fun quiz game together! Answer some cool questions and I'll help
              you find awesome sports you'll love!
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
                  <span className="font-bold">1</span>
                </div>
                <p>Just 5 minutes - super quick!</p>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
                  <span className="font-bold">2</span>
                </div>
                <p>Fun questions with cool pictures!</p>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center border border-primary/50">
                  <span className="font-bold">3</span>
                </div>
                <p>Find 5 amazing sports just for you!</p>
              </div>
            </div>
            <Button
              asChild
              className="mt-8 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold rounded-full px-8 py-6 text-lg transition-all transform hover:scale-105 hover:shadow-lg border border-white/20 red-glow"
            >
              <Link href="/quiz">
                Let's Play! <ArrowRight className="ml-2" size={18} />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            className="md:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-full h-[400px]">
              <Image
                src="/images/klimb-mascot.png"
                alt="KLIMB Mascot"
                fill
                className="object-contain"
                style={{ filter: "drop-shadow(0 0 20px rgba(255, 59, 48, 0.5))" }}
              />
            </div>
            <motion.div
              className="absolute top-20 right-24 text-white p-4 font-bold z-20 max-w-[200px]"
              initial={{ scale: 0, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
              transition={{ delay: 0.8, type: "spring", stiffness: 200 }}
            >
              {/* Cloud speech bubble with multiple bubbles for cloudy effect */}
              <div className="relative">
                {/* Main speech bubble */}
                <div className="absolute -top-2 -left-2 w-full h-full bg-white/10 rounded-2xl blur-md"></div>
                <div className="absolute -top-1 -right-1 w-full h-full bg-primary/10 rounded-2xl blur-md"></div>
                <div className="relative bg-black/60 backdrop-blur-xl p-4 rounded-2xl border border-white/20 shadow-[0_5px_15px_rgba(255,59,48,0.3)]">
                  Let's find your favorite sport together!
                  {/* Speech bubble pointer */}
                  <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-8 h-8">
                    <div className="absolute w-8 h-8 bg-black/60 rounded-full blur-sm"></div>
                    <div className="absolute w-6 h-6 bg-black/60 rounded-full blur-sm left-1 top-1"></div>
                    <div className="absolute w-4 h-4 bg-black/60 rounded-full blur-sm left-3 top-2"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
