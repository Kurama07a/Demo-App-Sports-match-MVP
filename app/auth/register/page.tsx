"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    parentName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      // Simulate registration
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, we'll just redirect to the add child page
      // In a real app, you would create the user account and set auth cookies/tokens
      router.push("/auth/add-child")
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors mb-8"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="relative w-16 h-16">
                <Image src="/images/klimb-mascot.png" alt="KLIMB Mascot" fill className="object-contain" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Create Your Account</h1>
            <p className="text-center text-gray-600 mb-8">Join KLIMB to discover your child's perfect sport</p>

            {error && <div className="bg-red-50 text-red-800 p-3 rounded-lg mb-6 text-sm">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="parentName">Parent/Guardian Name</Label>
                <Input
                  id="parentName"
                  name="parentName"
                  placeholder="Your full name"
                  value={formData.parentName}
                  onChange={handleChange}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="rounded-xl"
                />
              </div>

              <p className="text-xs text-gray-500">
                By creating an account, you agree to our{" "}
                <Link href="/terms" className="text-purple-600 hover:text-purple-800">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-purple-600 hover:text-purple-800">
                  Privacy Policy
                </Link>
                .
              </p>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-xl py-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-purple-600 hover:text-purple-800 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
