"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, MapPin, Search } from "lucide-react"
import { motion } from "framer-motion"

// Sample centers data
const centers = [
  {
    id: 1,
    name: "KLIMB Sports Center - Downtown",
    address: "123 Main Street, Downtown, City",
    distance: "1.2 miles",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.8,
    reviews: 124,
    sports: ["Swimming", "Basketball", "Soccer", "Tennis", "Gymnastics"],
  },
  {
    id: 2,
    name: "KLIMB Sports Academy - Westside",
    address: "456 West Avenue, Westside, City",
    distance: "2.5 miles",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.6,
    reviews: 98,
    sports: ["Swimming", "Basketball", "Volleyball", "Track & Field"],
  },
  {
    id: 3,
    name: "KLIMB Youth Sports - Northgate",
    address: "789 North Road, Northgate, City",
    distance: "3.8 miles",
    image: "/placeholder.svg?height=200&width=300",
    rating: 4.9,
    reviews: 156,
    sports: ["Soccer", "Tennis", "Gymnastics", "Swimming"],
  },
]

export default function FindCenterPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCenters, setFilteredCenters] = useState(centers)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const filtered = centers.filter(
      (center) =>
        center.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        center.sports.some((sport) => sport.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    setFilteredCenters(filtered)
  }

  return (
    <main className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16">
        <Link href="/quiz" className="inline-flex items-center text-white hover:text-primary transition-colors mb-8">
          <ArrowLeft size={16} className="mr-2" /> Back to Results
        </Link>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glassmorphic-card rounded-3xl overflow-hidden red-glow mb-8"
          >
            <div className="p-8">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-white mb-4">Find a KLIMB Fun Center Near You!</h1>
                <p className="text-white/70 max-w-2xl mx-auto">
                  Our centers are full of games, friendly coaches, and tons of sports equipment! Come play with us and
                  find your favorite sport!
                </p>
              </div>

              <form onSubmit={handleSearch} className="mb-8">
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50" />
                    <Input
                      type="text"
                      placeholder="Search by location, center name, or sport..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 py-6 rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-primary"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white rounded-xl"
                  >
                    Search
                  </Button>
                </div>
              </form>

              <div className="space-y-6">
                {filteredCenters.length > 0 ? (
                  filteredCenters.map((center, index) => (
                    <motion.div
                      key={center.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex flex-col md:flex-row gap-6 glassmorphic-light rounded-xl p-4 hover:border-primary/50 border border-white/10 transition-all"
                    >
                      <div className="md:w-1/3 relative h-48 md:h-auto rounded-lg overflow-hidden">
                        <Image
                          src={center.image || "/placeholder.svg"}
                          alt={center.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="md:w-2/3">
                        <div className="flex justify-between items-start">
                          <h2 className="text-xl font-bold text-white mb-2">{center.name}</h2>
                          <div className="bg-black/40 text-primary px-3 py-1 rounded-full text-sm font-medium border border-primary/30">
                            {center.distance}
                          </div>
                        </div>
                        <div className="flex items-center mb-2 text-white/70">
                          <MapPin size={16} className="mr-1" />
                          {center.address}
                        </div>
                        <div className="flex items-center mb-4">
                          <div className="flex items-center text-primary mr-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(center.rating) ? "fill-current" : "fill-white/20"
                                }`}
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                          </div>
                          <span className="text-white/70 text-sm">
                            {center.rating} ({center.reviews} reviews)
                          </span>
                        </div>
                        <div className="mb-4">
                          <h3 className="text-sm font-medium text-white/80 mb-2">Available Sports:</h3>
                          <div className="flex flex-wrap gap-2">
                            {center.sports.map((sport) => (
                              <span
                                key={sport}
                                className="bg-black/40 text-white text-xs px-2 py-1 rounded-full border border-white/10"
                              >
                                {sport}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <Button
                            asChild
                            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white"
                          >
                            <Link href={`/book/${center.id}`}>Book Assessment</Link>
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-white/70">
                      No centers found matching your search. Please try a different query.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  )
}
