"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate authentication
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, we'll just redirect to dashboard
      // In a real app, you would validate credentials and set auth cookies/tokens
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center text-white hover:text-primary transition-colors mb-8">
          <ArrowLeft size={16} className="mr-2" /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glassmorphic-card rounded-3xl overflow-hidden red-glow"
        >
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="relative w-16 h-16">
                <Image
                  src="/images/klimb-mascot.png"
                  alt="KLIMB Mascot"
                  fill
                  className="object-contain"
                  style={{ filter: "drop-shadow(0 0 15px rgba(255, 59, 48, 0.5))" }}
                />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center text-white mb-2">Welcome Back!</h1>
            <p className="text-center text-white/70 mb-8">Sign in to access your KLIMB dashboard</p>

            {error && (
              <div className="bg-primary/10 text-primary p-3 rounded-lg mb-6 text-sm border border-primary/30">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-white">
                    Password
                  </Label>
                  <Link href="/auth/forgot-password" className="text-sm text-primary hover:text-primary/80">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-xl bg-white/5 border-white/10 text-white placeholder:text-white/50 focus:border-primary"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  className="border-white/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none text-white/70 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 rounded-xl py-6 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-white/70">
                Don't have an account?{" "}
                <Link href="/auth/register" className="text-primary hover:text-primary/80 font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
