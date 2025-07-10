"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react"

// Sample center data
const center = {
  id: 1,
  name: "KLIMB Sports Center - Downtown",
  address: "123 Main Street, Downtown, City",
  phone: "(123) 456-7890",
  email: "downtown@klimb.com",
  image: "/placeholder.svg?height=300&width=600",
  description:
    "Our downtown center features state-of-the-art facilities for comprehensive sports assessments and training. Our expert coaches will help your child discover their perfect sport and develop their skills.",
}

// Available time slots
const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

export default function BookingPage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    childName: "",
    childAge: "",
    parentName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    notes: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit this data to your backend
    console.log("Booking data:", formData)
    setIsSubmitted(true)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 pt-16">
      <div className="container mx-auto px-4 py-8">
        <Link
          href="/find-center"
          className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors mb-8"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Centers
        </Link>

        <div className="max-w-5xl mx-auto">
          {!isSubmitted ? (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
              <div className="relative h-64 w-full">
                <Image src={center.image || "/placeholder.svg"} alt={center.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <div className="p-8">
                    <h1 className="text-3xl font-bold text-white mb-2">{center.name}</h1>
                    <div className="flex items-center text-white/90">
                      <MapPin size={16} className="mr-1" />
                      {center.address}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Book Your Assessment</h2>
                    <p className="text-gray-600 mb-6">{center.description}</p>

                    <div className="bg-purple-50 rounded-xl p-4 mb-6">
                      <h3 className="font-bold text-gray-800 mb-2">What to Expect:</h3>
                      <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                          <span className="inline-block w-5 h-5 bg-purple-600 rounded-full text-white flex items-center justify-center text-xs mr-2 mt-0.5">
                            1
                          </span>
                          <span>Fun games to test your awesome skills!</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-5 h-5 bg-purple-600 rounded-full text-white flex items-center justify-center text-xs mr-2 mt-0.5">
                            2
                          </span>
                          <span>Cool activities with Klim, your sports buddy!</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-5 h-5 bg-purple-600 rounded-full text-white flex items-center justify-center text-xs mr-2 mt-0.5">
                            3
                          </span>
                          <span>Discover your SUPER sports with our friendly coaches!</span>
                        </li>
                        <li className="flex items-start">
                          <span className="inline-block w-5 h-5 bg-purple-600 rounded-full text-white flex items-center justify-center text-xs mr-2 mt-0.5">
                            4
                          </span>
                          <span>Meet other kids who love the same sports as you!</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-2 text-gray-700">
                      <div className="flex items-center">
                        <Calendar size={18} className="mr-2 text-purple-600" />
                        <span>Assessment duration: 45-60 minutes</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={18} className="mr-2 text-purple-600" />
                        <span>Please arrive 10 minutes early</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="childName" className="block text-sm font-medium text-gray-700 mb-1">
                          Child's Name *
                        </label>
                        <Input
                          id="childName"
                          name="childName"
                          value={formData.childName}
                          onChange={handleChange}
                          required
                          className="rounded-lg"
                        />
                      </div>

                      <div>
                        <label htmlFor="childAge" className="block text-sm font-medium text-gray-700 mb-1">
                          Child's Age *
                        </label>
                        <Input
                          id="childAge"
                          name="childAge"
                          type="number"
                          min="4"
                          max="18"
                          value={formData.childAge}
                          onChange={handleChange}
                          required
                          className="rounded-lg"
                        />
                      </div>

                      <div>
                        <label htmlFor="parentName" className="block text-sm font-medium text-gray-700 mb-1">
                          Parent/Guardian Name *
                        </label>
                        <Input
                          id="parentName"
                          name="parentName"
                          value={formData.parentName}
                          onChange={handleChange}
                          required
                          className="rounded-lg"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="rounded-lg"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone *
                          </label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            className="rounded-lg"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                            Preferred Date *
                          </label>
                          <Input
                            id="date"
                            name="date"
                            type="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="rounded-lg"
                            min={new Date().toISOString().split("T")[0]}
                          />
                        </div>

                        <div>
                          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                            Preferred Time *
                          </label>
                          <Select value={formData.time} onValueChange={(value) => handleSelectChange("time", value)}>
                            <SelectTrigger className="rounded-lg">
                              <SelectValue placeholder="Select a time" />
                            </SelectTrigger>
                            <SelectContent>
                              {timeSlots.map((slot) => (
                                <SelectItem key={slot} value={slot}>
                                  {slot}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                          Additional Notes
                        </label>
                        <Textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder="Any special requirements or information we should know?"
                          className="rounded-lg"
                          rows={4}
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold rounded-xl py-3 mt-4"
                      >
                        Book Assessment
                      </Button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden p-8 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Booking Confirmed!</h1>
              <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
                Thank you for booking an assessment at {center.name}. We've sent a confirmation email to{" "}
                {formData.email} with all the details. Our team will contact you shortly to confirm your appointment.
              </p>
              <div className="bg-purple-50 rounded-xl p-6 max-w-md mx-auto mb-8">
                <h3 className="font-bold text-gray-800 mb-4">Your Booking Details:</h3>
                <div className="space-y-2 text-left">
                  <p>
                    <span className="font-medium">Child:</span> {formData.childName}, {formData.childAge} years old
                  </p>
                  <p>
                    <span className="font-medium">Date:</span> {formData.date}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span> {formData.time}
                  </p>
                  <p>
                    <span className="font-medium">Location:</span> {center.address}
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild variant="outline" className="rounded-xl">
                  <Link href="/">Return to Home</Link>
                </Button>
                <Button
                  asChild
                  className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-xl"
                >
                  <Link href="/dashboard">View Your Dashboard</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
