"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Game types
type GameState = "intro" | "reaction" | "balance" | "coordination" | "results"

// Sample results
const sampleResults = {
  reaction: 0,
  balance: 0,
  coordination: 0,
}

export default function InteractiveAssessmentPage() {
  const [gameState, setGameState] = useState<GameState>("intro")
  const [results, setResults] = useState(sampleResults)
  const [progress, setProgress] = useState(0)

  // Reaction test
  const [reactionStarted, setReactionStarted] = useState(false)
  const [reactionTarget, setReactionTarget] = useState(false)
  const [reactionTime, setReactionTime] = useState<number | null>(null)
  const [reactionAttempts, setReactionAttempts] = useState(0)
  const [reactionTimes, setReactionTimes] = useState<number[]>([])
  const reactionStartTime = useRef<number | null>(null)

  // Balance test
  const [balanceStarted, setBalanceStarted] = useState(false)
  const [balanceScore, setBalanceScore] = useState(0)
  const [balancePosition, setBalancePosition] = useState({ x: 50, y: 50 })
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 })
  const balanceInterval = useRef<NodeJS.Timeout | null>(null)

  // Coordination test
  const [coordinationStarted, setCoordinationStarted] = useState(false)
  const [coordinationScore, setCoordinationScore] = useState(0)
  const [coordinationTargets, setCoordinationTargets] = useState<{ id: number; x: number; y: number }[]>([])
  const [coordinationTimeLeft, setCoordinationTimeLeft] = useState(15)
  const coordinationInterval = useRef<NodeJS.Timeout | null>(null)

  // Update progress based on game state
  useEffect(() => {
    switch (gameState) {
      case "intro":
        setProgress(0)
        break
      case "reaction":
        setProgress(25)
        break
      case "balance":
        setProgress(50)
        break
      case "coordination":
        setProgress(75)
        break
      case "results":
        setProgress(100)
        break
    }
  }, [gameState])

  // Reaction test logic
  useEffect(() => {
    if (reactionStarted && !reactionTarget) {
      const delay = 1000 + Math.random() * 3000
      const timeout = setTimeout(() => {
        setReactionTarget(true)
        reactionStartTime.current = Date.now()
      }, delay)

      return () => clearTimeout(timeout)
    }
  }, [reactionStarted, reactionTarget])

  const startReactionTest = () => {
    setReactionStarted(true)
    setReactionTarget(false)
    setReactionTime(null)
  }

  const handleReactionClick = () => {
    if (!reactionTarget) {
      // Clicked too early
      setReactionTarget(false)
      setReactionTime(-1)
      return
    }

    if (reactionStartTime.current) {
      const time = Date.now() - reactionStartTime.current
      setReactionTime(time)
      setReactionTimes([...reactionTimes, time])
      setReactionTarget(false)
      setReactionAttempts(reactionAttempts + 1)

      if (reactionAttempts >= 2) {
        // Calculate average reaction time (excluding penalties)
        const validTimes = reactionTimes.filter((t) => t > 0)
        const avgTime =
          validTimes.length > 0 ? validTimes.reduce((sum, time) => sum + time, 0) / validTimes.length : 1000

        // Convert to a score out of 100 (faster = higher score)
        // 200ms is excellent (100), 500ms is average (50)
        const score = Math.max(0, Math.min(100, 100 - (avgTime - 200) / 3))

        setResults({ ...results, reaction: Math.round(score) })
        setTimeout(() => setGameState("balance"), 2000)
      } else {
        setTimeout(startReactionTest, 1500)
      }
    }
  }

  // Balance test logic
  useEffect(() => {
    if (balanceStarted) {
      // Create a moving target
      balanceInterval.current = setInterval(() => {
        setTargetPosition({
          x: 40 + Math.random() * 20,
          y: 40 + Math.random() * 20,
        })
      }, 2000)

      // End the test after 15 seconds
      const timeout = setTimeout(() => {
        if (balanceInterval.current) clearInterval(balanceInterval.current)
        setBalanceStarted(false)
        setResults({ ...results, balance: Math.round(balanceScore) })
        setTimeout(() => setGameState("coordination"), 2000)
      }, 15000)

      return () => {
        if (balanceInterval.current) clearInterval(balanceInterval.current)
        clearTimeout(timeout)
      }
    }
  }, [balanceStarted, balanceScore, results])

  const startBalanceTest = () => {
    setBalanceStarted(true)
    setBalanceScore(0)
    setBalancePosition({ x: 50, y: 50 })
    setTargetPosition({ x: 50, y: 50 })
  }

  const handleDeviceMotion = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!balanceStarted) return

    // Get mouse/touch position
    let clientX, clientY

    if ("touches" in e) {
      clientX = e.touches[0].clientX
      clientY = e.touches[0].clientY
    } else {
      clientX = e.clientX
      clientY = e.clientY
    }

    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    const y = ((clientY - rect.top) / rect.height) * 100

    setBalancePosition({
      x: Math.max(0, Math.min(100, x)),
      y: Math.max(0, Math.min(100, y)),
    })

    // Calculate distance to target (closer = better score)
    const distance = Math.sqrt(
      Math.pow(balancePosition.x - targetPosition.x, 2) + Math.pow(balancePosition.y - targetPosition.y, 2),
    )

    // Update score based on proximity to target
    if (distance < 10) {
      setBalanceScore((prev) => Math.min(100, prev + 1))
    }
  }

  // Coordination test logic
  useEffect(() => {
    if (coordinationStarted) {
      // Add initial targets
      generateTargets()

      // Countdown timer
      coordinationInterval.current = setInterval(() => {
        setCoordinationTimeLeft((prev) => {
          if (prev <= 1) {
            if (coordinationInterval.current) clearInterval(coordinationInterval.current)
            setCoordinationStarted(false)
            setResults({ ...results, coordination: Math.round((coordinationScore / 15) * 100) })
            setTimeout(() => setGameState("results"), 2000)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => {
        if (coordinationInterval.current) clearInterval(coordinationInterval.current)
      }
    }
  }, [coordinationStarted, coordinationScore, results])

  const startCoordinationTest = () => {
    setCoordinationStarted(true)
    setCoordinationScore(0)
    setCoordinationTimeLeft(15)
    setCoordinationTargets([])
  }

  const generateTargets = () => {
    const newTargets = []
    const count = 3

    for (let i = 0; i < count; i++) {
      newTargets.push({
        id: Date.now() + i,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
      })
    }

    setCoordinationTargets(newTargets)
  }

  const handleTargetClick = (id: number) => {
    setCoordinationTargets((prev) => prev.filter((target) => target.id !== id))
    setCoordinationScore((prev) => prev + 1)

    if (coordinationTargets.length <= 1) {
      generateTargets()
    }
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center text-white hover:text-primary transition-colors mb-8">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glassmorphic-card rounded-3xl overflow-hidden red-glow mb-8"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div className="w-full">
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Interactive Skills Assessment</h1>
                  <div className="w-full bg-white/10 rounded-full h-2.5 mb-4">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {gameState === "intro" && (
                  <motion.div
                    key="intro"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8"
                  >
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <Image
                        src="/images/klimb-mascot.png"
                        alt="KLIMB Mascot"
                        fill
                        className="object-contain"
                        style={{ filter: "drop-shadow(0 0 15px rgba(255, 59, 48, 0.5))" }}
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Let's Play Some SUPER FUN Games!</h2>
                    <p className="text-white/70 mb-8 max-w-md mx-auto">
                      Hi friend! I'm Klim! These games are SUPER fun and will help me find the PERFECT sport for you!
                      Are you ready for some awesome games?
                    </p>
                    <Button
                      onClick={() => setGameState("reaction")}
                      className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold rounded-full px-8 py-6 text-lg"
                    >
                      Let's Play! <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </motion.div>
                )}

                {gameState === "reaction" && (
                  <motion.div
                    key="reaction"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <h2 className="text-2xl font-bold text-white mb-4">Super Speed Test!</h2>
                    <p className="text-white/70 mb-6">
                      Click as FAST as you can when the circle turns GREEN! Don't click too early or you'll lose points!
                    </p>

                    <div
                      className={`w-64 h-64 rounded-full mx-auto mb-6 flex items-center justify-center cursor-pointer transition-colors ${
                        !reactionStarted
                          ? "bg-white/10 border border-white/20"
                          : reactionTarget
                            ? "bg-primary border border-white/20"
                            : "bg-black/40 border border-white/10"
                      }`}
                      onClick={reactionStarted ? handleReactionClick : startReactionTest}
                    >
                      {!reactionStarted ? (
                        <span className="text-white/70 font-medium">Click to start</span>
                      ) : reactionTime !== null ? (
                        <span className="text-white font-bold text-xl">
                          {reactionTime === -1 ? "Too early!" : `${reactionTime} ms`}
                        </span>
                      ) : (
                        <span className="text-white/70 font-medium">Wait for green...</span>
                      )}
                    </div>

                    <p className="text-sm text-white/50 mb-4">Attempt {reactionAttempts + 1} of 3</p>

                    {reactionAttempts > 0 && (
                      <div className="mb-6">
                        <h3 className="font-medium text-white mb-2">Your times:</h3>
                        <div className="flex justify-center gap-2">
                          {reactionTimes.map((time, index) => (
                            <div
                              key={index}
                              className="px-3 py-1 bg-black/40 border border-white/10 rounded-full text-sm text-white/70"
                            >
                              {time === -1 ? "Too early" : `${time} ms`}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}

                {gameState === "balance" && (
                  <motion.div
                    key="balance"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <h2 className="text-2xl font-bold text-white mb-4">Awesome Balance Challenge!</h2>
                    <p className="text-white/70 mb-6">
                      Move your finger or mouse to keep the blue ball inside the green target! It's like a fun maze
                      game!
                    </p>

                    <div
                      className="w-80 h-80 bg-black/40 rounded-xl mx-auto mb-6 relative border border-white/10"
                      onMouseMove={handleDeviceMotion}
                      onTouchMove={handleDeviceMotion}
                    >
                      {/* Target area */}
                      <div
                        className="absolute w-16 h-16 bg-primary/30 rounded-full transition-all duration-1000 border border-primary/50"
                        style={{
                          left: `calc(${targetPosition.x}% - 2rem)`,
                          top: `calc(${targetPosition.y}% - 2rem)`,
                        }}
                      />

                      {/* Player ball */}
                      <div
                        className="absolute w-8 h-8 bg-primary rounded-full transition-all duration-100 shadow-[0_0_15px_rgba(255,59,48,0.5)]"
                        style={{
                          left: `calc(${balancePosition.x}% - 1rem)`,
                          top: `calc(${balancePosition.y}% - 1rem)`,
                        }}
                      />

                      {!balanceStarted && (
                        <div className="absolute inset-0 bg-black/70 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <Button
                            onClick={startBalanceTest}
                            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
                          >
                            Start Balance Test
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <h3 className="font-medium text-white mb-2">Score: {balanceScore}</h3>
                      <Progress
                        value={balanceScore}
                        className="h-2 w-64 mx-auto bg-white/10"
                        indicatorClassName="bg-primary"
                      />
                    </div>

                    {balanceStarted && (
                      <p className="text-sm text-white/50">Keep the blue ball inside the green target!</p>
                    )}
                  </motion.div>
                )}

                {gameState === "coordination" && (
                  <motion.div
                    key="coordination"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <h2 className="text-2xl font-bold text-white mb-4">Target Blaster Game!</h2>
                    <p className="text-white/70 mb-6">
                      Click on as many purple targets as you can! How many can you get? Ready, set, GO!
                    </p>

                    <div className="w-80 h-80 bg-black/40 rounded-xl mx-auto mb-6 relative border border-white/10">
                      {coordinationTargets.map((target) => (
                        <motion.div
                          key={target.id}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute w-10 h-10 bg-primary rounded-full cursor-pointer shadow-[0_0_15px_rgba(255,59,48,0.5)]"
                          style={{
                            left: `calc(${target.x}% - 1.25rem)`,
                            top: `calc(${target.y}% - 1.25rem)`,
                          }}
                          onClick={() => handleTargetClick(target.id)}
                        />
                      ))}

                      {!coordinationStarted && (
                        <div className="absolute inset-0 bg-black/70 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <Button
                            onClick={startCoordinationTest}
                            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
                          >
                            Start Coordination Test
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center w-64 mx-auto mb-4">
                      <div>
                        <h3 className="font-medium text-white">Score: {coordinationScore}</h3>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Time: {coordinationTimeLeft}s</h3>
                      </div>
                    </div>

                    {coordinationStarted && (
                      <p className="text-sm text-white/50">Click on the purple circles as quickly as you can!</p>
                    )}
                  </motion.div>
                )}

                {gameState === "results" && (
                  <motion.div
                    key="results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8"
                  >
                    <div className="relative w-32 h-32 mx-auto mb-6">
                      <Image
                        src="/images/klimb-mascot.png"
                        alt="KLIMB Mascot"
                        fill
                        className="object-contain"
                        style={{ filter: "drop-shadow(0 0 15px rgba(255, 59, 48, 0.5))" }}
                      />
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">WOW! You're AMAZING!</h2>
                    <p className="text-white/70 mb-8 max-w-md mx-auto">
                      You finished all the games like a CHAMPION! Check out your super cool scores:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
                      <div className="glassmorphic-light rounded-xl p-4 border border-white/10">
                        <h3 className="font-bold text-white mb-2">Reaction Time</h3>
                        <div className="text-3xl font-bold text-primary mb-2">{results.reaction}%</div>
                        <Progress
                          value={results.reaction}
                          className="h-2 bg-white/10"
                          indicatorClassName="bg-primary"
                        />
                      </div>

                      <div className="glassmorphic-light rounded-xl p-4 border border-white/10">
                        <h3 className="font-bold text-white mb-2">Balance</h3>
                        <div className="text-3xl font-bold text-primary mb-2">{results.balance}%</div>
                        <Progress value={results.balance} className="h-2 bg-white/10" indicatorClassName="bg-primary" />
                      </div>

                      <div className="glassmorphic-light rounded-xl p-4 border border-white/10">
                        <h3 className="font-bold text-white mb-2">Coordination</h3>
                        <div className="text-3xl font-bold text-primary mb-2">{results.coordination}%</div>
                        <Progress
                          value={results.coordination}
                          className="h-2 bg-white/10"
                          indicatorClassName="bg-primary"
                        />
                      </div>
                    </div>

                    <div className="glassmorphic-light border-l-4 border-primary p-4 rounded-lg mb-8 max-w-2xl mx-auto text-left">
                      <div className="flex">
                        <div className="flex-shrink-0 w-12 h-12 relative mr-4">
                          <Image
                            src="/images/klimb-mascot.png"
                            alt="KLIMB Mascot"
                            width={48}
                            height={48}
                            className="object-contain"
                            style={{ filter: "drop-shadow(0 0 10px rgba(255, 59, 48, 0.5))" }}
                          />
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-white">Klim says:</h4>
                          <p className="text-white/80">
                            WOW! Based on your AWESOME scores, you might be great at sports that need
                            {results.reaction > 70 ? " super-fast reflexes, " : " "}
                            {results.balance > 70 ? " amazing balance, " : " "}
                            {results.coordination > 70 ? " and eagle-eye coordination! " : " "}
                            Come play more fun games at our KLIMB center!
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        onClick={() => setGameState("intro")}
                        variant="outline"
                        className="rounded-xl border-white/20 text-white hover:bg-white/10 hover:text-white"
                      >
                        Play Again
                      </Button>
                      <Button
                        asChild
                        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-xl"
                      >
                        <Link href="/find-center">Find a KLIMB Center</Link>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
