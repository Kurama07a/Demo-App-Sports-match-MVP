"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Save, CheckCircle } from "lucide-react"

// Sample assessment data
const assessmentData = {
  id: "123",
  childName: "Alex Johnson",
  childAge: 10,
  date: "2023-06-22",
  coach: "Coach Sarah",
  status: "in-progress",
  physicalMetrics: {
    height: 142, // cm
    weight: 35, // kg
    flexibility: 65, // percentage
    strength: 70, // percentage
    endurance: 75, // percentage
    coordination: 80, // percentage
    speed: 72, // percentage
    balance: 68, // percentage
  },
  psychologicalMetrics: {
    teamwork: 85, // percentage
    focus: 70, // percentage
    competitiveness: 75, // percentage
    persistence: 80, // percentage
    riskTaking: 65, // percentage
    creativity: 90, // percentage
  },
  sportMatches: [
    { name: "Swimming", match: 92 },
    { name: "Soccer", match: 85 },
    { name: "Basketball", match: 78 },
    { name: "Tennis", match: 72 },
    { name: "Gymnastics", match: 68 },
  ],
  notes: "",
}

export default function AssessmentPage({ params }: { params: { id: string } }) {
  const [assessment, setAssessment] = useState(assessmentData)
  const [activeTab, setActiveTab] = useState("physical")
  const [isSaving, setIsSaving] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const handleMetricChange = (category: "physicalMetrics" | "psychologicalMetrics", metric: string, value: number) => {
    setAssessment({
      ...assessment,
      [category]: {
        ...assessment[category],
        [metric]: value,
      },
    })
  }

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setAssessment({
      ...assessment,
      notes: e.target.value,
    })
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSaving(false)
    setIsSaved(true)

    // Reset saved indicator after 3 seconds
    setTimeout(() => setIsSaved(false), 3000)
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-8 pb-16">
      <div className="container mx-auto px-4">
        <Link
          href="/admin"
          className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors mb-8"
        >
          <ArrowLeft size={16} className="mr-2" /> Back to Admin Dashboard
        </Link>

        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold mb-1">Assessment: {assessment.childName}</h1>
                <p>
                  Age: {assessment.childAge} • Date: {assessment.date} • Coach: {assessment.coach}
                </p>
              </div>
              <Button onClick={handleSave} disabled={isSaving} className="bg-white text-purple-600 hover:bg-gray-100">
                {isSaving ? (
                  "Saving..."
                ) : isSaved ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" /> Saved
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" /> Save Assessment
                  </>
                )}
              </Button>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="physical">Physical Assessment</TabsTrigger>
              <TabsTrigger value="psychological">Psychological Assessment</TabsTrigger>
              <TabsTrigger value="results">Results & Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="physical" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Basic Measurements</CardTitle>
                    <CardDescription>Record the child's physical measurements</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="height">Height (cm)</Label>
                        <span className="text-gray-500">{assessment.physicalMetrics.height} cm</span>
                      </div>
                      <Slider
                        id="height"
                        min={100}
                        max={200}
                        step={1}
                        value={[assessment.physicalMetrics.height]}
                        onValueChange={(value) => handleMetricChange("physicalMetrics", "height", value[0])}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="weight">Weight (kg)</Label>
                        <span className="text-gray-500">{assessment.physicalMetrics.weight} kg</span>
                      </div>
                      <Slider
                        id="weight"
                        min={20}
                        max={100}
                        step={1}
                        value={[assessment.physicalMetrics.weight]}
                        onValueChange={(value) => handleMetricChange("physicalMetrics", "weight", value[0])}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Physical Abilities</CardTitle>
                    <CardDescription>Rate the child's physical capabilities</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(assessment.physicalMetrics)
                      .filter(([key]) => !["height", "weight"].includes(key))
                      .map(([key, value]) => (
                        <div key={key} className="space-y-2">
                          <div className="flex justify-between">
                            <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                            <span className="text-gray-500">{value}%</span>
                          </div>
                          <Slider
                            id={key}
                            min={0}
                            max={100}
                            step={1}
                            value={[value as number]}
                            onValueChange={(val) => handleMetricChange("physicalMetrics", key, val[0])}
                          />
                        </div>
                      ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="psychological" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Psychological Traits</CardTitle>
                  <CardDescription>Evaluate the child's psychological characteristics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(assessment.psychologicalMetrics).map(([key, value]) => (
                      <div key={key} className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                          <span className="text-gray-500">{value}%</span>
                        </div>
                        <Slider
                          id={key}
                          min={0}
                          max={100}
                          step={1}
                          value={[value as number]}
                          onValueChange={(val) => handleMetricChange("psychologicalMetrics", key, val[0])}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Assessment Notes</CardTitle>
                  <CardDescription>Add any additional observations or notes</CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Enter your observations about the child's behavior, interests, and preferences..."
                    className="min-h-[150px]"
                    value={assessment.notes}
                    onChange={handleNotesChange}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sport Matches</CardTitle>
                  <CardDescription>Based on the assessment, these sports are the best matches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {assessment.sportMatches.map((sport) => (
                      <div key={sport.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                              <span className="text-lg">{sport.name.charAt(0)}</span>
                            </div>
                            <span className="font-medium">{sport.name}</span>
                          </div>
                          <span className="text-purple-600 font-medium">{sport.match}% Match</span>
                        </div>
                        <Progress value={sport.match} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Physical Strengths</CardTitle>
                    <CardDescription>Areas where the child excels physically</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {Object.entries(assessment.physicalMetrics)
                        .filter(([key, value]) => !["height", "weight"].includes(key) && (value as number) >= 75)
                        .map(([key, value]) => (
                          <li key={key} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span>
                              {key.charAt(0).toUpperCase() + key.slice(1)}: {value}%
                            </span>
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Psychological Strengths</CardTitle>
                    <CardDescription>Areas where the child excels mentally</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {Object.entries(assessment.psychologicalMetrics)
                        .filter(([key, value]) => (value as number) >= 75)
                        .map(([key, value]) => (
                          <li key={key} className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                            <span>
                              {key.charAt(0).toUpperCase() + key.slice(1)}: {value}%
                            </span>
                          </li>
                        ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
