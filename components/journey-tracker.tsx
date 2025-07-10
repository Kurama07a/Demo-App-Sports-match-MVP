"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform, useInView } from "framer-motion"

const journeySteps = [
  {
    title: "Play the Quiz",
    description: "Answer fun questions with me, Klim!",
    icon: "🎮",
    details: [
      "Take a super fun 5-minute quiz",
      "Answer questions about what you like to do",
      "No wrong answers - just be yourself!",
      "Klim will guide you through each step",
    ],
  },
  {
    title: "Find Your Match",
    description: "Discover 5 awesome sports just for you!",
    icon: "🏆",
    details: [
      "Get matched with sports that fit YOU",
      "See why each sport matches your personality",
      "Learn about sports you might not have tried before",
      "Find out your top 5 best matches",
    ],
  },
  {
    title: "Visit Us",
    description: "Come play at our super cool center!",
    icon: "🔍",
    details: [
      "Book a visit to your nearest KLIMB center",
      "Try out different sports equipment",
      "Play fun games that test your skills",
      "Meet other kids who love sports",
    ],
  },
  {
    title: "Meet Coaches",
    description: "Say hi to friendly coaches who love sports!",
    icon: "👨‍🏫",
    details: [
      "Our coaches are super friendly and fun",
      "They'll show you cool sports techniques",
      "Learn the basics of your matched sports",
      "Get personalized tips just for you",
    ],
  },
  {
    title: "Start Playing",
    description: "Begin your amazing sports adventure!",
    icon: "🚀",
    details: [
      "Join regular sessions at local clubs",
      "Track your progress on your dashboard",
      "Earn cool badges as you improve",
      "Make new friends who share your interests",
    ],
  },
]

export default function JourneyTracker() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 })

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })

  const sectionOpacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0])
  const sectionY = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [50, 0, 0, -50])

  return (
    <motion.section
      id="journey"
      ref={sectionRef}
      style={{ opacity: sectionOpacity, y: sectionY }}
      className="py-20 relative"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Your Adventure with{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent text-glow">
              KLIMB
            </span>
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Check out these super fun steps on your sports adventure! It's like a treasure map!
          </p>
        </motion.div>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary to-accent rounded-full" />

          {/* Timeline steps */}
          {journeySteps.map((step, index) => (
            <TimelineCard key={index} step={step} index={index} isLeft={index % 2 === 0} />
          ))}
        </div>
      </div>
    </motion.section>
  )
}

interface TimelineCardProps {
  step: {
    title: string
    description: string
    icon: string
    details: string[]
  }
  index: number
  isLeft: boolean
}

function TimelineCard({ step, index, isLeft }: TimelineCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: false, amount: 0.3 })

  return (
    <div className="flex items-center justify-center mb-20 relative">
      {/* Timeline node */}

      {/* Card */}
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -50 : 50 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`w-full md:w-5/12 ${isLeft ? "md:mr-auto" : "md:ml-auto"}`}
      >
        {/* Timeline connector */}
        <div
          className={`hidden md:block absolute top-1/2 w-8 h-1 bg-gradient-to-r ${
            isLeft
              ? "from-transparent to-primary right-0 translate-x-full"
              : "from-primary to-transparent left-0 -translate-x-full"
          }`}
        />

        {/* Timeline node */}

        {/* Card container with perspective effect */}
        <div className="group perspective-1000">
          <div className="relative transform transition-all duration-500 group-hover:rotate-y-2 group-hover:scale-[1.02]">
            {/* Card header with icon */}
            <div className="relative overflow-hidden rounded-t-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90 mix-blend-multiply" />
              <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=400')] bg-cover bg-center opacity-20" />
              <div className="relative p-6 flex items-center">
                <div className="w-16 h-16 bg-black/40 backdrop-blur-md rounded-full flex items-center justify-center text-4xl mr-4 border border-white/30 shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-6">
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-md">{step.title}</h3>
                  <p className="text-white/90 mt-1 drop-shadow-sm">{step.description}</p>
                </div>
              </div>
            </div>

            {/* Card body */}
            <div className="glassmorphic-card rounded-b-2xl p-6 border-t-0 border-primary/20 shadow-[0_10px_30px_-15px_rgba(255,59,48,0.3)]">
              <h4 className="font-bold text-white text-xl mb-4 flex items-center">
                <span className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2 text-primary">
                  {index + 1}
                </span>
                What happens in this step:
              </h4>
              <ul className="space-y-3">
                {step.details.map((detail, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start group/item"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ delay: 0.1 * idx + 0.3, duration: 0.5 }}
                  >
                    <span className="inline-block w-6 h-6 bg-primary/20 text-primary rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 transition-all duration-300 group-hover/item:bg-primary group-hover/item:text-white">
                      ✓
                    </span>
                    <span className="text-white/90 group-hover/item:text-white transition-colors duration-300">
                      {detail}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br from-primary/20 to-transparent rounded-full blur-xl -z-10" />
            <div className="absolute -top-2 -left-2 w-16 h-16 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-xl -z-10" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
