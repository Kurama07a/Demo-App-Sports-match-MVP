"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, Loader2, Plus } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AddChildPage() {
  const [children, setChildren] = useState([{ id: 1, name: "", age: "", gender: "" }])
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleChange = (id: number, field: string, value: string) => {
    setChildren(children.map((child) => (child.id === id ? { ...child, [field]: value } : child)))
  }

  const addChild = () => {
    const newId = Math.max(...children.map((c) => c.id)) + 1
    setChildren([...children, { id: newId, name: "", age: "", gender: "" }])
  }

  const removeChild = (id: number) => {
    if (children.length > 1) {
      setChildren(children.filter((child) => child.id !== id))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, we'll just redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      console.error("Error adding children:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Link
          href="/auth/register"
          className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors mb-8"
        >
          <ArrowLeft size={16} className="mr-2" /> Back
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="p-8">
            <div className="flex justify-center mb-6">
              <div className="relative w-16 h-16">
                <Image src="/images/klimb-mascot.png" alt="KLIMB Mascot" fill className="object-contain" />
              </div>
            </div>

            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">Add Your Children</h1>
            <p className="text-center text-gray-600 mb-8">Tell us about the young athletes in your family</p>

            <form onSubmit={handleSubmit} className="space-y-8">
              {children.map((child, index) => (
                <div key={child.id} className="p-6 bg-gray-50 rounded-xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="font-bold text-gray-800">Child {index + 1}</h2>
                    {children.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeChild(child.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        Remove
                      </Button>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`name-${child.id}`}>Child's Name</Label>
                    <Input
                      id={`name-${child.id}`}
                      value={child.name}
                      onChange={(e) => handleChange(child.id, "name", e.target.value)}
                      required
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`age-${child.id}`}>Age</Label>
                    <Input
                      id={`age-${child.id}`}
                      type="number"
                      min="4"
                      max="18"
                      value={child.age}
                      onChange={(e) => handleChange(child.id, "age", e.target.value)}
                      required
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <RadioGroup
                      value={child.gender}
                      onValueChange={(value) => handleChange(child.id, "gender", value)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="boy" id={`boy-${child.id}`} />
                        <Label htmlFor={`boy-${child.id}`}>Boy</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="girl" id={`girl-${child.id}`} />
                        <Label htmlFor={`girl-${child.id}`}>Girl</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id={`other-${child.id}`} />
                        <Label htmlFor={`other-${child.id}`}>Prefer not to say</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addChild}
                className="w-full rounded-xl py-6 border-dashed border-2 border-gray-300 text-gray-600 hover:border-purple-500 hover:text-purple-600"
              >
                <Plus size={16} className="mr-2" /> Add Another Child
              </Button>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 rounded-xl py-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  "Continue to Dashboard"
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
