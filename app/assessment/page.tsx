"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, ArrowRight, MapPin, Calendar, Clock } from "lucide-react"
import { useMobile } from "@/hooks/use-mobile"

// Game types
type GameState = "intro" | "agility" | "reaction" | "balance" | "strength" | "results" | "recommendation"

// Assessment data structure
interface AssessmentResults {
  agility: number
  reaction: number
  balance: number
  strength: number
  completed: boolean
}

// Sport recommendation type
interface SportRecommendation {
  name: string
  description: string
  match: number
  image: string
  traits: string[]
}

// Initial assessment results
const initialResults: AssessmentResults = {
  agility: 0,
  reaction: 0,
  balance: 0,
  strength: 0,
  completed: false,
}

// Sport recommendations based on assessment results
const sportRecommendations: SportRecommendation[] = [
  {
    name: "Swimming",
    description: "Great for building endurance, coordination, and full-body strength.",
    match: 0, // Will be calculated based on results
    image: "/placeholder.svg?height=200&width=200",
    traits: ["balance", "strength"],
  },
  {
    name: "Soccer",
    description: "Perfect for agility, teamwork, and developing coordination.",
    match: 0,
    image: "/placeholder.svg?height=200&width=200",
    traits: ["agility", "reaction"],
  },
  {
    name: "Gymnastics",
    description: "Excellent for flexibility, balance, and body awareness.",
    match: 0,
    image: "/placeholder.svg?height=200&width=200",
    traits: ["balance", "strength"],
  },
  {
    name: "Basketball",
    description: "Develops height, coordination, and strategic thinking.",
    match: 0,
    image: "/placeholder.svg?height=200&width=200",
    traits: ["agility", "reaction"],
  },
  {
    name: "Tennis",
    description: "Great for reflexes, coordination, and mental focus.",
    match: 0,
    image: "/placeholder.svg?height=200&width=200",
    traits: ["reaction", "agility"],
  },
  {
    name: "Martial Arts",
    description: "Builds discipline, strength, and self-confidence.",
    match: 0,
    image: "/placeholder.svg?height=200&width=200",
    traits: ["balance", "strength"],
  },
]

// Sample centers data
const centers = [
  {
    id: 1,
    name: "KLIMB Sports Center - Downtown",
    address: "123 Main Street, Downtown, City",
    distance: "1.2 miles",
    nextAvailable: "Tomorrow at 3:00 PM",
  },
  {
    id: 2,
    name: "KLIMB Sports Academy - Westside",
    address: "456 West Avenue, Westside, City",
    distance: "2.5 miles",
    nextAvailable: "Thursday at 4:30 PM",
  },
]

export default function AssessmentPage() {
  const [gameState, setGameState] = useState<GameState>("intro")
  const [results, setResults] = useState<AssessmentResults>(initialResults)
  const [progress, setProgress] = useState(0)
  const [recommendations, setRecommendations] = useState<SportRecommendation[]>([])
  const isMobile = useMobile()

  // Game-specific states
  // Agility game
  const [agilityStarted, setAgilityStarted] = useState(false)
  const [agilityScore, setAgilityScore] = useState(0)
  const [agilityTargets, setAgilityTargets] = useState<{ id: number; x: number; y: number }[]>([])
  const [agilityTimeLeft, setAgilityTimeLeft] = useState(20)
  const agilityInterval = useRef<NodeJS.Timeout | null>(null)
  const agilityTimerInterval = useRef<NodeJS.Timeout | null>(null)

  // Reaction game
  const [reactionStarted, setReactionStarted] = useState(false)
  const [reactionTarget, setReactionTarget] = useState(false)
  const [reactionTime, setReactionTime] = useState<number | null>(null)
  const [reactionAttempts, setReactionAttempts] = useState(0)
  const [reactionTimes, setReactionTimes] = useState<number[]>([])
  const reactionStartTime = useRef<number | null>(null)

  // Balance game
  const [balanceStarted, setBalanceStarted] = useState(false)
  const [balanceScore, setBalanceScore] = useState(0)
  const [balancePosition, setBalancePosition] = useState({ x: 50, y: 50 })
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 })
  const balanceInterval = useRef<NodeJS.Timeout | null>(null)
  const balanceTimerInterval = useRef<NodeJS.Timeout | null>(null)
  const [balanceTimeLeft, setBalanceTimeLeft] = useState(20)

  // Strength game
  const [strengthStarted, setStrengthStarted] = useState(false)
  const [strengthScore, setStrengthScore] = useState(0)
  const [strengthClicks, setStrengthClicks] = useState(0)
  const [strengthTimeLeft, setStrengthTimeLeft] = useState(10)
  const strengthInterval = useRef<NodeJS.Timeout | null>(null)

  // Update progress based on game state
  useEffect(() => {
    switch (gameState) {
      case "intro":
        setProgress(0)
        break
      case "agility":
        setProgress(20)
        break
      case "reaction":
        setProgress(40)
        break
      case "balance":
        setProgress(60)
        break
      case "strength":
        setProgress(80)
        break
      case "results":
      case "recommendation":
        setProgress(100)
        break
    }
  }, [gameState])

  // Calculate sport recommendations based on assessment results
  useEffect(() => {
    if (results.completed) {
      const updatedRecommendations = sportRecommendations.map((sport) => {
        // Calculate match percentage based on relevant traits
        let totalScore = 0
        let relevantTraits = 0

        sport.traits.forEach((trait) => {
          if (trait === "agility") {
            totalScore += results.agility
            relevantTraits++
          } else if (trait === "reaction") {
            totalScore += results.reaction
            relevantTraits++
          } else if (trait === "balance") {
            totalScore += results.balance
            relevantTraits++
          } else if (trait === "strength") {
            totalScore += results.strength
            relevantTraits++
          }
        })

        const match = Math.round(totalScore / relevantTraits)
        return { ...sport, match }
      })

      // Sort by match percentage (highest first)
      updatedRecommendations.sort((a, b) => b.match - a.match)
      setRecommendations(updatedRecommendations)
    }
  }, [results])

  // AGILITY GAME LOGIC
  const startAgilityGame = () => {
    setAgilityStarted(true)
    setAgilityScore(0)
    setAgilityTimeLeft(20)
    generateAgilityTargets()

    // Start timer
    agilityTimerInterval.current = setInterval(() => {
      setAgilityTimeLeft((prev) => {
        if (prev <= 1) {
          finishAgilityGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const generateAgilityTargets = () => {
    const newTargets = []
    const count = isMobile ? 2 : 3

    for (let i = 0; i < count; i++) {
      newTargets.push({
        id: Date.now() + i,
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
      })
    }

    setAgilityTargets(newTargets)
  }

  const handleAgilityTargetClick = (id: number) => {
    setAgilityTargets((prev) => prev.filter((target) => target.id !== id))
    setAgilityScore((prev) => prev + 1)

    if (agilityTargets.length <= 1) {
      generateAgilityTargets()
    }
  }

  const finishAgilityGame = () => {
    if (agilityTimerInterval.current) clearInterval(agilityTimerInterval.current)
    setAgilityStarted(false)

    // Calculate score (0-100)
    // Average player gets ~30 targets in 20 seconds
    const normalizedScore = Math.min(100, Math.round((agilityScore / 30) * 100))

    setResults((prev) => ({
      ...prev,
      agility: normalizedScore,
    }))

    // Move to next game after a short delay
    setTimeout(() => setGameState("reaction"), 1500)
  }

  // REACTION GAME LOGIC
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

  const startReactionGame = () => {
    setReactionStarted(true)
    setReactionTarget(false)
    setReactionTime(null)
    setReactionAttempts(0)
    setReactionTimes([])
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

      if (reactionAttempts >= 4) {
        finishReactionGame()
      } else {
        setTimeout(() => {
          setReactionTarget(false)
          reactionStartTime.current = null
        }, 1000)
      }
    }
  }

  const finishReactionGame = () => {
    setReactionStarted(false)

    // Calculate average reaction time (excluding penalties)
    const validTimes = reactionTimes.filter((t) => t > 0)
    const avgTime = validTimes.length > 0 ? validTimes.reduce((sum, time) => sum + time, 0) / validTimes.length : 500

    // Convert to a score out of 100 (faster = higher score)
    // 200ms is excellent (100), 500ms is average (50)
    const normalizedScore = Math.max(0, Math.min(100, Math.round(100 - (avgTime - 200) / 3)))

    setResults((prev) => ({
      ...prev,
      reaction: normalizedScore,
    }))

    // Move to next game after a short delay
    setTimeout(() => setGameState("balance"), 1500)
  }

  // BALANCE GAME LOGIC
  const startBalanceGame = () => {
    setBalanceStarted(true)
    setBalanceScore(0)
    setBalancePosition({ x: 50, y: 50 })
    setTargetPosition({ x: 50, y: 50 })
    setBalanceTimeLeft(20)

    // Create a moving target
    balanceInterval.current = setInterval(() => {
      setTargetPosition({
        x: 10 + Math.random() * 80,
        y: 10 + Math.random() * 80,
      })
    }, 2000)

    // Start timer
    balanceTimerInterval.current = setInterval(() => {
      setBalanceTimeLeft((prev) => {
        if (prev <= 1) {
          finishBalanceGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)
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
    if (distance < 15) {
      setBalanceScore((prev) => prev + 1)
    }
  }

  const finishBalanceGame = () => {
    if (balanceInterval.current) clearInterval(balanceInterval.current)
    if (balanceTimerInterval.current) clearInterval(balanceTimerInterval.current)
    setBalanceStarted(false)

    // Calculate score (0-100)
    // Average player gets ~40 points in 20 seconds
    const normalizedScore = Math.min(100, Math.round((balanceScore / 40) * 100))

    setResults((prev) => ({
      ...prev,
      balance: normalizedScore,
    }))

    // Move to next game after a short delay
    setTimeout(() => setGameState("strength"), 1500)
  }

  // STRENGTH GAME LOGIC
  const startStrengthGame = () => {
    setStrengthStarted(true)
    setStrengthScore(0)
    setStrengthClicks(0)
    setStrengthTimeLeft(10)

    // Start timer
    strengthInterval.current = setInterval(() => {
      setStrengthTimeLeft((prev) => {
        if (prev <= 1) {
          finishStrengthGame()
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const handleStrengthClick = () => {
    if (!strengthStarted) return

    setStrengthClicks((prev) => prev + 1)
    setStrengthScore((prev) => prev + 1)

    // Add visual feedback for each click
    const strengthBar = document.getElementById("strength-bar")
    if (strengthBar) {
      strengthBar.classList.add("pulse-animation")
      setTimeout(() => {
        strengthBar.classList.remove("pulse-animation")
      }, 200)
    }
  }

  const finishStrengthGame = () => {
    if (strengthInterval.current) clearInterval(strengthInterval.current)
    setStrengthStarted(false)

    // Calculate score (0-100)
    // Average player gets ~50 clicks in 10 seconds
    const normalizedScore = Math.min(100, Math.round((strengthClicks / 50) * 100))

    setResults((prev) => ({
      ...prev,
      strength: normalizedScore,
      completed: true,
    }))

    // Move to results after a short delay
    setTimeout(() => setGameState("results"), 1500)
  }

  // Clean up intervals on unmount
  useEffect(() => {
    return () => {
      if (agilityInterval.current) clearInterval(agilityInterval.current)
      if (agilityTimerInterval.current) clearInterval(agilityTimerInterval.current)
      if (balanceInterval.current) clearInterval(balanceInterval.current)
      if (balanceTimerInterval.current) clearInterval(balanceTimerInterval.current)
      if (strengthInterval.current) clearInterval(strengthInterval.current)
    }
  }, [])

  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="inline-flex items-center text-white hover:text-primary transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Home
          </Link>
          <div className="text-2xl font-extrabold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-glow">
            KLIMB
          </div>
        </div>

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
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">KLIMB Sports Skills Assessment</h1>
                  <div className="w-full bg-white/10 rounded-full h-2.5 mb-4">
                    <div
                      className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-white/70">
                    {gameState === "intro" && "Let's discover your sports superpowers!"}
                    {gameState === "agility" && "Game 1 of 4: Agility Challenge"}
                    {gameState === "reaction" && "Game 2 of 4: Reaction Time Test"}
                    {gameState === "balance" && "Game 3 of 4: Balance Master"}
                    {gameState === "strength" && "Game 4 of 4: Power Tapper"}
                    {gameState === "results" && "Your Amazing Results!"}
                    {gameState === "recommendation" && "Your Perfect Sports Matches!"}
                  </p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {/* INTRO SCREEN */}
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
                    <h2 className="text-2xl font-bold text-white mb-4">Let's Discover Your Sports Superpowers!</h2>
                    <p className="text-white/70 mb-8 max-w-md mx-auto">
                      Hi friend! I'm Klim! I've created 4 SUPER FUN games to test your amazing skills. These games will
                      help us find the PERFECT sports for you!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      <div className="glassmorphic-light rounded-xl p-4 border border-white/10 text-left">
                        <h3 className="font-bold text-white mb-2 flex items-center">
                          <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 text-primary">
                            1
                          </span>
                          Agility Challenge
                        </h3>
                        <p className="text-white/70 text-sm">
                          Tap the targets as quickly as you can! Tests your speed and coordination.
                        </p>
                      </div>

                      <div className="glassmorphic-light rounded-xl p-4 border border-white/10 text-left">
                        <h3 className="font-bold text-white mb-2 flex items-center">
                          <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 text-primary">
                            2
                          </span>
                          Reaction Time Test
                        </h3>
                        <p className="text-white/70 text-sm">
                          Click when the circle turns green! Tests your reflexes and timing.
                        </p>
                      </div>

                      <div className="glassmorphic-light rounded-xl p-4 border border-white/10 text-left">
                        <h3 className="font-bold text-white mb-2 flex items-center">
                          <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 text-primary">
                            3
                          </span>
                          Balance Master
                        </h3>
                        <p className="text-white/70 text-sm">
                          Keep the ball in the target zone! Tests your steadiness and control.
                        </p>
                      </div>

                      <div className="glassmorphic-light rounded-xl p-4 border border-white/10 text-left">
                        <h3 className="font-bold text-white mb-2 flex items-center">
                          <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mr-2 text-primary">
                            4
                          </span>
                          Power Tapper
                        </h3>
                        <p className="text-white/70 text-sm">
                          Tap as fast as you can! Tests your strength and endurance.
                        </p>
                      </div>
                    </div>

                    <Button
                      onClick={() => setGameState("agility")}
                      className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold rounded-full px-8 py-6 text-lg"
                    >
                      Let's Play! <ArrowRight className="ml-2" size={18} />
                    </Button>
                  </motion.div>
                )}

                {/* AGILITY GAME */}
                {gameState === "agility" && (
                  <motion.div
                    key="agility"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <h2 className="text-2xl font-bold text-white mb-4">Agility Challenge!</h2>
                    <p className="text-white/70 mb-6">
                      Tap on as many targets as you can before time runs out! Ready, set, GO!
                    </p>

                    <div className="w-full h-[300px] md:h-[400px] bg-black/40 rounded-xl mx-auto mb-6 relative border border-white/10">
                      {agilityTargets.map((target) => (
                        <motion.div
                          key={target.id}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="absolute w-12 h-12 bg-primary rounded-full cursor-pointer shadow-[0_0_15px_rgba(255,59,48,0.5)]"
                          style={{
                            left: `calc(${target.x}% - 1.5rem)`,
                            top: `calc(${target.y}% - 1.5rem)`,
                          }}
                          onClick={() => handleAgilityTargetClick(target.id)}
                        />
                      ))}

                      {!agilityStarted && (
                        <div className="absolute inset-0 bg-black/70 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <Button
                            onClick={startAgilityGame}
                            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
                          >
                            Start Agility Challenge
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center w-full max-w-md mx-auto mb-4">
                      <div>
                        <h3 className="font-medium text-white">Score: {agilityScore}</h3>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Time: {agilityTimeLeft}s</h3>
                      </div>
                    </div>

                    {agilityStarted && (
                      <p className="text-sm text-white/50">Tap on the red circles as quickly as you can!</p>
                    )}
                  </motion.div>
                )}

                {/* REACTION GAME */}
                {gameState === "reaction" && (
                  <motion.div
                    key="reaction"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <h2 className="text-2xl font-bold text-white mb-4">Reaction Time Test!</h2>
                    <p className="text-white/70 mb-6">
                      Click as FAST as you can when the circle turns RED! Don't click too early!
                    </p>

                    <div
                      className={`w-64 h-64 rounded-full mx-auto mb-6 flex items-center justify-center cursor-pointer transition-colors ${
                        !reactionStarted
                          ? "bg-white/10 border border-white/20"
                          : reactionTarget
                            ? "bg-primary border border-white/20 animate-pulse-glow"
                            : "bg-black/40 border border-white/10"
                      }`}
                      onClick={reactionStarted ? handleReactionClick : startReactionGame}
                    >
                      {!reactionStarted ? (
                        <span className="text-white/70 font-medium">Click to start</span>
                      ) : reactionTime !== null ? (
                        <span className="text-white font-bold text-xl">
                          {reactionTime === -1 ? "Too early!" : `${reactionTime} ms`}
                        </span>
                      ) : (
                        <span className="text-white/70 font-medium">Wait for red...</span>
                      )}
                    </div>

                    <p className="text-sm text-white/50 mb-4">Attempt {reactionAttempts + 1} of 5</p>

                    {reactionAttempts > 0 && (
                      <div className="mb-6">
                        <h3 className="font-medium text-white mb-2">Your times:</h3>
                        <div className="flex flex-wrap justify-center gap-2">
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

                {/* BALANCE GAME */}
                {gameState === "balance" && (
                  <motion.div
                    key="balance"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <h2 className="text-2xl font-bold text-white mb-4">Balance Master!</h2>
                    <p className="text-white/70 mb-6">
                      Move your finger or mouse to keep the red ball inside the target zone! It's like a fun maze game!
                    </p>

                    <div
                      className="w-full h-[300px] md:h-[400px] bg-black/40 rounded-xl mx-auto mb-6 relative border border-white/10"
                      onMouseMove={handleDeviceMotion}
                      onTouchMove={handleDeviceMotion}
                    >
                      {/* Target area */}
                      <div
                        className="absolute w-20 h-20 bg-primary/30 rounded-full transition-all duration-1000 border border-primary/50"
                        style={{
                          left: `calc(${targetPosition.x}% - 2.5rem)`,
                          top: `calc(${targetPosition.y}% - 2.5rem)`,
                        }}
                      />

                      {/* Player ball */}
                      <div
                        className="absolute w-10 h-10 bg-primary rounded-full transition-all duration-100 shadow-[0_0_15px_rgba(255,59,48,0.5)]"
                        style={{
                          left: `calc(${balancePosition.x}% - 1.25rem)`,
                          top: `calc(${balancePosition.y}% - 1.25rem)`,
                        }}
                      />

                      {!balanceStarted && (
                        <div className="absolute inset-0 bg-black/70 rounded-xl flex items-center justify-center backdrop-blur-sm">
                          <Button
                            onClick={startBalanceGame}
                            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
                          >
                            Start Balance Challenge
                          </Button>
                        </div>
                      )}
                    </div>

                    <div className="flex justify-between items-center w-full max-w-md mx-auto mb-4">
                      <div>
                        <h3 className="font-medium text-white">Score: {balanceScore}</h3>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Time: {balanceTimeLeft}s</h3>
                      </div>
                    </div>

                    {balanceStarted && (
                      <p className="text-sm text-white/50">Keep the red ball inside the target zone!</p>
                    )}
                  </motion.div>
                )}

                {/* STRENGTH GAME */}
                {gameState === "strength" && (
                  <motion.div
                    key="strength"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <h2 className="text-2xl font-bold text-white mb-4">Power Tapper!</h2>
                    <p className="text-white/70 mb-6">
                      Tap or click as FAST as you can to fill the power bar! Show your strength!
                    </p>

                    <div className="w-full max-w-md mx-auto mb-6">
                      <div
                        id="strength-bar"
                        className="w-full h-32 bg-black/40 border border-white/10 rounded-xl flex items-center justify-center cursor-pointer hover:bg-black/30 transition-colors"
                        onClick={handleStrengthClick}
                      >
                        {!strengthStarted ? (
                          <Button
                            onClick={startStrengthGame}
                            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
                          >
                            Start Power Challenge
                          </Button>
                        ) : (
                          <div className="text-4xl font-bold text-white">TAP!</div>
                        )}
                      </div>

                      <div className="mt-4 w-full bg-white/10 h-6 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
                          style={{
                            width: `${strengthStarted ? Math.min(100, (strengthClicks / 50) * 100) : 0}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center w-full max-w-md mx-auto mb-4">
                      <div>
                        <h3 className="font-medium text-white">Taps: {strengthClicks}</h3>
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Time: {strengthTimeLeft}s</h3>
                      </div>
                    </div>

                    {strengthStarted && <p className="text-sm text-white/50">Tap or click as fast as you can!</p>}
                  </motion.div>
                )}

                {/* RESULTS SCREEN */}
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

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-8">
                      <div className="glassmorphic-light rounded-xl p-4 border border-white/10">
                        <h3 className="font-bold text-white mb-2">Agility</h3>
                        <div className="text-3xl font-bold text-primary mb-2">{results.agility}%</div>
                        <Progress value={results.agility} className="h-2 bg-white/10" indicatorClassName="bg-primary" />
                      </div>

                      <div className="glassmorphic-light rounded-xl p-4 border border-white/10">
                        <h3 className="font-bold text-white mb-2">Reaction</h3>
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
                        <h3 className="font-bold text-white mb-2">Strength</h3>
                        <div className="text-3xl font-bold text-primary mb-2">{results.strength}%</div>
                        <Progress
                          value={results.strength}
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
                            WOW! Based on your AWESOME scores, I can recommend some SUPER FUN sports that match your
                            skills perfectly! Let's see what sports you'll be amazing at!
                          </p>
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={() => setGameState("recommendation")}
                      className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-bold rounded-xl px-8 py-4"
                    >
                      See My Sport Matches <ArrowRight className="ml-2" size={16} />
                    </Button>
                  </motion.div>
                )}

                {/* RECOMMENDATION SCREEN */}
                {gameState === "recommendation" && (
                  <motion.div
                    key="recommendation"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="py-4"
                  >
                    <h2 className="text-2xl font-bold text-white mb-4 text-center">Your Perfect Sport Matches!</h2>
                    <p className="text-white/70 mb-8 text-center">
                      Based on your skills, these sports would be AWESOME for you! The higher the match percentage, the
                      better you'll be!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                      {recommendations.slice(0, 4).map((sport, index) => (
                        <motion.div
                          key={sport.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className="glassmorphic-light rounded-xl p-4 relative overflow-hidden border border-white/10 group hover:border-primary/50 transition-colors"
                        >
                          <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold py-1 px-2 rounded-full">
                            {sport.match}% Match
                          </div>
                          <div className="flex items-center">
                            <div className="w-16 h-16 relative mr-4 group-hover:scale-110 transition-transform">
                              <Image
                                src={sport.image || "/placeholder.svg"}
                                alt={sport.name}
                                fill
                                className="object-contain"
                              />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1">{sport.name}</h3>
                              <p className="text-white/70 text-sm">{sport.description}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-xl p-6 mb-8 border border-white/10">
                      <h3 className="text-xl font-bold text-white mb-4 text-center">
                        Complete Your Assessment at a KLIMB Center!
                      </h3>
                      <p className="text-white/80 mb-6 text-center">
                        This online test is just the beginning! Visit one of our centers for a FULL assessment with
                        professional coaches and specialized equipment!
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {centers.map((center) => (
                          <div key={center.id} className="glassmorphic-light rounded-xl p-4 border border-white/10">
                            <h4 className="font-bold text-white mb-2">{center.name}</h4>
                            <div className="flex items-center text-white/70 text-sm mb-2">
                              <MapPin size={14} className="mr-1 text-primary" />
                              {center.address}
                            </div>
                            <div className="flex items-center text-white/70 text-sm mb-2">
                              <Clock size={14} className="mr-1 text-primary" />
                              {center.distance} away
                            </div>
                            <div className="flex items-center text-white/70 text-sm mb-3">
                              <Calendar size={14} className="mr-1 text-primary" />
                              Next available: {center.nextAvailable}
                            </div>
                            <Button
                              asChild
                              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
                            >
                              <Link href={`/book/${center.id}`}>Book Assessment</Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        onClick={() => {
                          setResults(initialResults)
                          setGameState("intro")
                        }}
                        variant="outline"
                        className="rounded-xl border-white/20 text-white hover:bg-white/10 hover:text-white"
                      >
                        Play Again
                      </Button>
                      <Button
                        asChild
                        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-xl"
                      >
                        <Link href="/find-center">Find All KLIMB Centers</Link>
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .pulse-animation {
          animation: pulse 0.2s ease-in-out;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
      `}</style>
    </main>
  )
}
