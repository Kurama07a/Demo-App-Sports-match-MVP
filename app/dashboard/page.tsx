"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Calendar, Clock, MapPin, Trophy } from "lucide-react"
import { motion } from "framer-motion"

// Sample user data
const userData = {
  childName: "Alex Johnson",
  childAge: 10,
  assessmentDate: "2023-06-15",
  upcomingSession: {
    date: "2023-06-22",
    time: "4:00 PM",
    location: "KLIMB Sports Center - Downtown",
    address: "123 Main Street, Downtown, City",
    coach: "Coach Sarah",
  },
  recommendedSports: [
    {
      name: "Swimming",
      match: 95,
      progress: 65,
      nextMilestone: "50m Freestyle under 40 seconds",
      sessions: 8,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Soccer",
      match: 88,
      progress: 42,
      nextMilestone: "Basic dribbling skills mastery",
      sessions: 5,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      name: "Basketball",
      match: 79,
      progress: 30,
      nextMilestone: "Consistent free throws",
      sessions: 4,
      image: "/placeholder.svg?height=80&width=80",
    },
  ],
  achievements: [
    {
      title: "First Swimming Lesson",
      date: "2023-06-18",
      description: "Completed first swimming assessment with Coach Mike",
      icon: "🏊‍♂️",
    },
    {
      title: "Soccer Skills Introduction",
      date: "2023-06-20",
      description: "Learned basic passing and ball control techniques",
      icon: "⚽",
    },
  ],
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("progress")

  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <Link href="/" className="inline-flex items-center text-white hover:text-primary transition-colors mb-8">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glassmorphic-card rounded-3xl overflow-hidden red-glow mb-8"
          >
            <div className="bg-gradient-to-r from-primary to-accent p-8 text-white">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{userData.childName}'s Dashboard</h1>
                  <p className="opacity-90">
                    Age: {userData.childAge} • Joined: {userData.assessmentDate}
                  </p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Button
                    asChild
                    variant="outline"
                    className="bg-white/20 text-white border-white/40 hover:bg-white/30"
                  >
                    <Link href="/book/1">Book Next Session</Link>
                  </Button>
                </div>
              </div>
            </div>

            {userData.upcomingSession && (
              <div className="p-6 border-b border-white/10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 border border-primary/30">
                      <Calendar className="text-primary" size={24} />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-white">Upcoming Session</h2>
                      <p className="text-white/70">
                        {userData.upcomingSession.date} at {userData.upcomingSession.time} with{" "}
                        {userData.upcomingSession.coach}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center text-white/70">
                    <MapPin size={16} className="mr-1" />
                    <span>{userData.upcomingSession.location}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="p-6">
              <Tabs defaultValue="progress" value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 mb-8 bg-black/40 border border-white/10">
                  <TabsTrigger
                    value="progress"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white text-white/70"
                  >
                    Sports Progress
                  </TabsTrigger>
                  <TabsTrigger
                    value="achievements"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white text-white/70"
                  >
                    Achievements
                  </TabsTrigger>
                  <TabsTrigger
                    value="recommendations"
                    className="data-[state=active]:bg-primary data-[state=active]:text-white text-white/70"
                  >
                    Recommendations
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="progress" className="space-y-6">
                  {userData.recommendedSports.map((sport, index) => (
                    <motion.div
                      key={sport.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glassmorphic-light rounded-xl p-4 hover:border-primary/50 border border-white/10 transition-all"
                    >
                      <div className="flex items-center mb-4">
                        <div className="relative w-12 h-12 mr-4">
                          <Image
                            src={sport.image || "/placeholder.svg"}
                            alt={sport.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-white">{sport.name}</h3>
                            <span className="text-sm bg-black/40 text-primary px-2 py-1 rounded-full border border-primary/30">
                              {sport.match}% Match
                            </span>
                          </div>
                          <div className="flex items-center text-white/70 text-sm">
                            <Clock size={14} className="mr-1" />
                            <span>{sport.sessions} sessions completed</span>
                          </div>
                        </div>
                      </div>

                      <div className="mb-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm text-white/70">Progress toward next milestone</span>
                          <span className="text-sm font-medium text-white">{sport.progress}%</span>
                        </div>
                        <Progress value={sport.progress} className="h-2 bg-white/10" indicatorClassName="bg-primary" />
                      </div>

                      <div className="text-sm text-white/70">
                        <span className="font-medium text-white">Next milestone:</span> {sport.nextMilestone}
                      </div>
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="achievements" className="space-y-6">
                  {userData.achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="glassmorphic-light rounded-xl p-4 hover:border-primary/50 border border-white/10 transition-all"
                    >
                      <div className="flex items-start">
                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mr-4 text-2xl border border-primary/30">
                          {achievement.icon}
                        </div>
                        <div>
                          <div className="flex items-center mb-1">
                            <h3 className="text-lg font-bold text-white mr-2">{achievement.title}</h3>
                            <Trophy size={16} className="text-primary" />
                          </div>
                          <p className="text-sm text-white/50 mb-2">{achievement.date}</p>
                          <p className="text-white/70">{achievement.description}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {userData.achievements.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                        <Trophy size={24} className="text-white/30" />
                      </div>
                      <h3 className="text-lg font-medium text-white mb-2">No achievements yet</h3>
                      <p className="text-white/70">Complete your first session to earn achievements!</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="recommendations" className="space-y-6">
                  <div className="glassmorphic-light border-l-4 border-primary p-4 rounded-r-lg mb-6">
                    <h3 className="font-bold text-white mb-2">Coach's Fun Tips</h3>
                    <p className="text-white/80">
                      Hey superstar! Our coaches think you'd have a BLAST with swimming as your main sport, and soccer
                      would be a super fun activity to try too! Swimming helps you build strong muscles and soccer helps
                      you make lots of friends!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="glassmorphic-light rounded-xl p-4 border border-white/10"
                    >
                      <h3 className="font-bold text-white mb-2">Local Swimming Clubs</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></div>
                          <div>
                            <p className="font-medium text-white">Aquatic Center Downtown</p>
                            <p className="text-sm text-white/70">Beginner to advanced classes, 2 miles away</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></div>
                          <div>
                            <p className="font-medium text-white">Westside Swim Club</p>
                            <p className="text-sm text-white/70">Competitive focus, 4 miles away</p>
                          </div>
                        </li>
                      </ul>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="glassmorphic-light rounded-xl p-4 border border-white/10"
                    >
                      <h3 className="font-bold text-white mb-2">Recommended Equipment</h3>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></div>
                          <div>
                            <p className="font-medium text-white">Junior Swimming Kit</p>
                            <p className="text-sm text-white/70">Goggles, cap, and training fins</p>
                          </div>
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-2"></div>
                          <div>
                            <p className="font-medium text-white">Youth Soccer Starter Set</p>
                            <p className="text-sm text-white/70">Size 4 ball, shin guards, and cleats</p>
                          </div>
                        </li>
                      </ul>
                    </motion.div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
