"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, Search, Users, CalendarIcon, BarChart, Settings } from "lucide-react"

// Sample data
const upcomingBookings = [
  {
    id: 1,
    childName: "Alex Johnson",
    childAge: 10,
    parentName: "Sarah Johnson",
    date: "2023-06-22",
    time: "4:00 PM",
    status: "confirmed",
  },
  {
    id: 2,
    childName: "Emma Davis",
    childAge: 8,
    parentName: "Michael Davis",
    date: "2023-06-22",
    time: "5:00 PM",
    status: "confirmed",
  },
  {
    id: 3,
    childName: "Noah Wilson",
    childAge: 12,
    parentName: "Jennifer Wilson",
    date: "2023-06-23",
    time: "3:30 PM",
    status: "pending",
  },
  {
    id: 4,
    childName: "Olivia Brown",
    childAge: 9,
    parentName: "David Brown",
    date: "2023-06-23",
    time: "4:30 PM",
    status: "confirmed",
  },
]

const recentAssessments = [
  {
    id: 1,
    childName: "Liam Smith",
    childAge: 11,
    date: "2023-06-20",
    topSport: "Swimming",
    match: 95,
    coach: "Coach Mike",
  },
  {
    id: 2,
    childName: "Sophia Martinez",
    childAge: 7,
    date: "2023-06-19",
    topSport: "Gymnastics",
    match: 92,
    coach: "Coach Sarah",
  },
  {
    id: 3,
    childName: "Jackson Taylor",
    childAge: 10,
    date: "2023-06-18",
    topSport: "Soccer",
    match: 88,
    coach: "Coach James",
  },
]

const stats = [
  {
    title: "Total Assessments",
    value: "248",
    change: "+12% from last month",
    icon: Users,
  },
  {
    title: "Upcoming Bookings",
    value: "32",
    change: "+8% from last week",
    icon: CalendarIcon,
  },
  {
    title: "Most Popular Sport",
    value: "Swimming",
    change: "42% of matches",
    icon: BarChart,
  },
]

export default function AdminDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("dashboard")

  const filteredBookings = upcomingBookings.filter(
    (booking) =>
      booking.childName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.parentName.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <div className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200">
          <div className="flex items-center justify-center h-16 border-b border-gray-200 px-4">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
              KLIMB Admin
            </span>
          </div>
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              <li>
                <Button
                  variant={activeTab === "dashboard" ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeTab === "dashboard" ? "bg-purple-600 hover:bg-purple-700" : ""
                  }`}
                  onClick={() => setActiveTab("dashboard")}
                >
                  <BarChart className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </li>
              <li>
                <Button
                  variant={activeTab === "bookings" ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeTab === "bookings" ? "bg-purple-600 hover:bg-purple-700" : ""
                  }`}
                  onClick={() => setActiveTab("bookings")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Bookings
                </Button>
              </li>
              <li>
                <Button
                  variant={activeTab === "assessments" ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeTab === "assessments" ? "bg-purple-600 hover:bg-purple-700" : ""
                  }`}
                  onClick={() => setActiveTab("assessments")}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Assessments
                </Button>
              </li>
              <li>
                <Button
                  variant={activeTab === "settings" ? "default" : "ghost"}
                  className={`w-full justify-start ${
                    activeTab === "settings" ? "bg-purple-600 hover:bg-purple-700" : ""
                  }`}
                  onClick={() => setActiveTab("settings")}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Button>
              </li>
            </ul>
          </nav>
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center">
              <div className="relative w-10 h-10 rounded-full overflow-hidden mr-3">
                <Image src="/images/klimb-mascot.png" alt="Admin" fill className="object-cover" />
              </div>
              <div>
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-gray-500">admin@klimb.com</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              Sign Out
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto">
          <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-800">
              {activeTab === "dashboard" && "Dashboard"}
              {activeTab === "bookings" && "Bookings Management"}
              {activeTab === "assessments" && "Assessment Records"}
              {activeTab === "settings" && "System Settings"}
            </h1>
            <div className="relative w-64">
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <Input
                placeholder="Search..."
                className="pl-8 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </header>

          <div className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="dashboard" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {stats.map((stat, index) => (
                    <Card key={index}>
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">{stat.title}</CardTitle>
                        <stat.icon className="h-4 w-4 text-gray-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Assessments</CardTitle>
                    <CardDescription>Latest sports assessments conducted at your center</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAssessments.map((assessment) => (
                        <div
                          key={assessment.id}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100"
                        >
                          <div>
                            <h3 className="font-medium text-gray-800">
                              {assessment.childName}, {assessment.childAge}
                            </h3>
                            <div className="flex items-center text-gray-500 text-sm">
                              <Calendar size={14} className="mr-1" />
                              {assessment.date}
                              <span className="mx-2">•</span>
                              <span>Coach: {assessment.coach}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-800">{assessment.topSport}</div>
                            <div className="text-sm text-purple-600">{assessment.match}% Match</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      View All Assessments
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="bookings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Bookings</CardTitle>
                    <CardDescription>Manage scheduled assessments at your center</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredBookings.length > 0 ? (
                        filteredBookings.map((booking) => (
                          <div
                            key={booking.id}
                            className="flex justify-between items-center p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                          >
                            <div>
                              <h3 className="font-medium text-gray-800">
                                {booking.childName}, {booking.childAge}
                              </h3>
                              <p className="text-gray-600 text-sm">Parent: {booking.parentName}</p>
                              <div className="flex items-center text-gray-500 text-sm mt-1">
                                <Calendar size={14} className="mr-1" />
                                {booking.date}
                                <span className="mx-2">•</span>
                                <Clock size={14} className="mr-1" />
                                {booking.time}
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <Badge
                                className={`${
                                  booking.status === "confirmed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {booking.status === "confirmed" ? "Confirmed" : "Pending"}
                              </Badge>
                              <div className="flex space-x-2 mt-2">
                                <Button size="sm" variant="outline">
                                  Reschedule
                                </Button>
                                <Button size="sm" variant="default">
                                  Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <p className="text-gray-500">No bookings found matching your search.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="assessments" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Assessment Records</CardTitle>
                    <CardDescription>View and manage completed assessments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAssessments.map((assessment) => (
                        <div
                          key={assessment.id}
                          className="flex justify-between items-center p-4 border border-gray-100 rounded-lg hover:shadow-md transition-shadow"
                        >
                          <div>
                            <h3 className="font-medium text-gray-800">
                              {assessment.childName}, {assessment.childAge}
                            </h3>
                            <div className="flex items-center text-gray-500 text-sm">
                              <Calendar size={14} className="mr-1" />
                              {assessment.date}
                              <span className="mx-2">•</span>
                              <span>Coach: {assessment.coach}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium text-gray-800">{assessment.topSport}</div>
                            <div className="text-sm text-purple-600">{assessment.match}% Match</div>
                            <Button size="sm" variant="outline" className="mt-2">
                              View Report
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Center Settings</CardTitle>
                    <CardDescription>Manage your center's information and preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="centerName">Center Name</Label>
                        <Input id="centerName" defaultValue="KLIMB Sports Center - Downtown" className="rounded-lg" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" defaultValue="123 Main Street, Downtown, City" className="rounded-lg" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" defaultValue="(123) 456-7890" className="rounded-lg" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" defaultValue="downtown@klimb.com" className="rounded-lg" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="operatingHours">Operating Hours</Label>
                        <Input
                          id="operatingHours"
                          defaultValue="9:00 AM - 6:00 PM, Monday to Saturday"
                          className="rounded-lg"
                        />
                      </div>
                      <Button type="button" className="bg-purple-600 hover:bg-purple-700">
                        Save Changes
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  )
}
