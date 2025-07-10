"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"

// Quiz questions
const questions = [
  {
    id: 1,
    question: "What do you enjoy doing in your free time?",
    options: [
      { id: "a", text: "Playing with friends outdoors" },
      { id: "b", text: "Building or creating things" },
      { id: "c", text: "Watching videos or playing games" },
      { id: "d", text: "Reading or learning new things" },
    ],
  },
  {
    id: 2,
    question: "How do you feel about being part of a team?",
    options: [
      { id: "a", text: "I love working with others!" },
      { id: "b", text: "I prefer doing things on my own" },
      { id: "c", text: "I like a mix of teamwork and solo activities" },
      { id: "d", text: "I'm not sure, I haven't tried much teamwork" },
    ],
  },
  {
    id: 3,
    question: "What sounds like the most fun to you?",
    options: [
      { id: "a", text: "Running fast and jumping high" },
      { id: "b", text: "Swimming or being in water" },
      { id: "c", text: "Dancing or moving to music" },
      { id: "d", text: "Solving puzzles or strategy games" },
    ],
  },
  {
    id: 4,
    question: "How do you handle challenges?",
    options: [
      { id: "a", text: "I keep trying until I succeed" },
      { id: "b", text: "I ask for help when needed" },
      { id: "c", text: "I try to find an easier way" },
      { id: "d", text: "I might get frustrated but I don't give up" },
    ],
  },
  {
    id: 5,
    question: "What's your favorite season?",
    options: [
      { id: "a", text: "Summer - I love the heat!" },
      { id: "b", text: "Winter - Snow and cold are fun!" },
      { id: "c", text: "Spring - Not too hot, not too cold" },
      { id: "d", text: "Fall - Perfect weather for activities" },
    ],
  },
]

// Sample sports matches
const sportMatches = [
  {
    name: "Swimming",
    description: "Great for building endurance and full-body strength.",
    image: "/placeholder.svg?height=200&width=200",
    match: "95%",
  },
  {
    name: "Soccer",
    description: "Perfect for teamwork and developing coordination.",
    image: "/placeholder.svg?height=200&width=200",
    match: "88%",
  },
  {
    name: "Gymnastics",
    description: "Excellent for flexibility, balance, and body awareness.",
    image: "/placeholder.svg?height=200&width=200",
    match: "82%",
  },
  {
    name: "Basketball",
    description: "Develops height, coordination, and strategic thinking.",
    image: "/placeholder.svg?height=200&width=200",
    match: "79%",
  },
  {
    name: "Tennis",
    description: "Great for reflexes, coordination, and mental focus.",
    image: "/placeholder.svg?height=200&width=200",
    match: "75%",
  },
]

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [mascotMessage, setMascotMessage] = useState("Let's find your perfect sport!")

  const handleAnswer = (questionId: number, optionId: string) => {
    setAnswers({ ...answers, [questionId]: optionId })

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      updateMascotMessage(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const updateMascotMessage = (questionIndex: number) => {
    const messages = [
      "Let's find your perfect sport!",
      "Awesome choice! Let's keep playing!",
      "You're doing AMAZING! Just a few more!",
      "Almost there! You're super good at this!",
      "Last question! You're a STAR!",
    ]

    setMascotMessage(messages[questionIndex])
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
      updateMascotMessage(currentQuestion - 1)
    }
  }

  const resetQuiz = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    setMascotMessage("Let's find your perfect sport!")
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center text-white hover:text-primary transition-colors mb-8">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>

        <div className="max-w-4xl mx-auto">
          {!showResults ? (
            <div className="glassmorphic-card rounded-3xl overflow-hidden red-glow">
              <div className="p-8">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-full">
                    <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Find Your Perfect Sport</h1>
                    <div className="w-full bg-white/10 rounded-full h-2.5 mb-4">
                      <div
                        className="bg-gradient-to-r from-primary to-accent h-2.5 rounded-full"
                        style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-white/70">
                      Question {currentQuestion + 1} of {questions.length}
                    </p>
                  </div>
                  <div className="relative">
                    <div className="w-24 h-24 relative">
                      <Image
                        src="/images/klimb-mascot.png"
                        alt="KLIMB Mascot"
                        width={96}
                        height={96}
                        className="object-contain"
                        style={{ filter: "drop-shadow(0 0 15px rgba(255, 59, 48, 0.5))" }}
                      />
                    </div>
                    <div className="absolute top-0 right-0 bg-black/60 backdrop-blur-md text-white p-2 rounded-lg text-xs font-bold transform -rotate-6 border border-primary/30">
                      {mascotMessage}
                    </div>
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6">
                      {questions[currentQuestion].question}
                    </h2>
                    <div className="space-y-4">
                      {questions[currentQuestion].options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleAnswer(questions[currentQuestion].id, option.id)}
                          className="w-full text-left p-4 rounded-xl border border-white/10 hover:border-primary transition-colors flex items-center glassmorphic-light"
                        >
                          <div className="w-6 h-6 rounded-full border-2 border-white/30 mr-3 flex items-center justify-center">
                            {answers[questions[currentQuestion].id] === option.id && (
                              <div className="w-3 h-3 rounded-full bg-primary"></div>
                            )}
                          </div>
                          <span className="text-white">{option.text}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="border-t border-white/10 p-6 flex justify-between">
                <Button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  variant="outline"
                  className="flex items-center border-white/20 text-white hover:bg-white/10 hover:text-white"
                >
                  <ArrowLeft size={16} className="mr-2" /> Previous
                </Button>
                <div className="text-white/50 text-sm">Your answers help us find your perfect match!</div>
              </div>
            </div>
          ) : (
            <div className="glassmorphic-card rounded-3xl overflow-hidden red-glow">
              <div className="p-8">
                <div className="text-center mb-8">
                  <h1 className="text-3xl font-bold text-white mb-4">WOW! Look at Your Sport Matches!</h1>
                  <p className="text-white/70 max-w-2xl mx-auto">
                    Based on your awesome answers, we found these COOL sports that match your super skills! Come visit a
                    KLIMB center for even more fun!
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {sportMatches.map((sport, index) => (
                    <motion.div
                      key={sport.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="glassmorphic-light rounded-xl p-4 relative overflow-hidden border border-white/10 group hover:border-primary/50 transition-colors"
                    >
                      <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold py-1 px-2 rounded-full">
                        {sport.match} Match
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-24 h-24 relative mb-4 group-hover:scale-110 transition-transform">
                          <Image
                            src={sport.image || "/placeholder.svg"}
                            alt={sport.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{sport.name}</h3>
                        <p className="text-white/70 text-center text-sm">{sport.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="glassmorphic-light border-l-4 border-primary p-4 rounded-lg mb-8">
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
                        These sports look PERFECT for you! Come visit our fun center for more cool games and meet
                        awesome coaches who can't wait to play with you!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 p-6 flex justify-between">
                <Button
                  onClick={resetQuiz}
                  variant="outline"
                  className="flex items-center border-white/20 text-white hover:bg-white/10 hover:text-white"
                >
                  <ArrowLeft size={16} className="mr-2" /> Retake Quiz
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
                >
                  <Link href="/find-center">
                    Find a KLIMB Center <ArrowRight size={16} className="ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
