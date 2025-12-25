"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, ChevronLeft, ChevronRight, Clock, Twitter, Linkedin, Facebook } from "lucide-react"

const scheduledPosts = [
  {
    id: 1,
    content: "Exciting news about our new product launch! 🚀 #ProductLaunch #Innovation",
    date: "2024-01-15",
    time: "14:00",
    platforms: ["twitter", "linkedin"],
    status: "scheduled",
  },
  {
    id: 2,
    content: "Check out our latest blog post on social media trends for 2024",
    date: "2024-01-16",
    time: "10:00",
    platforms: ["facebook", "linkedin"],
    status: "scheduled",
  },
  {
    id: 3,
    content: "Behind the scenes at our office today - great team collaboration!",
    date: "2024-01-18",
    time: "15:00",
    platforms: ["twitter", "facebook"],
    status: "scheduled",
  },
  {
    id: 4,
    content: "Join our webinar next week on digital marketing strategies",
    date: "2024-01-20",
    time: "11:00",
    platforms: ["linkedin"],
    status: "scheduled",
  },
]

const failedPosts = [
  {
    id: 5,
    content: "Weekly newsletter is now available - don't miss out!",
    date: "2024-01-12",
    time: "09:00",
    platforms: ["twitter"],
    status: "failed",
    error: "Authentication failed",
  },
]

const platformIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  facebook: Facebook,
}

// Mock BotanicalIllustration component
const BotanicalIllustration = ({ variant, className }: { variant: "leaf1" | "leaf2" | "leaf3"; className: string }) => {
  // Replace with actual implementation if available
  return <div className={className}>Botanical Illustration ({variant})</div>
}

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState("January 2024")
  const [selectedView, setSelectedView] = useState("month")

  const getDaysInMonth = () => {
    // Simplified calendar generation
    const days = []
    for (let i = 1; i <= 31; i++) {
      const dayPosts = scheduledPosts.filter((post) => new Date(post.date).getDate() === i)
      days.push({ day: i, posts: dayPosts })
    }
    return days
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Calendar</h1>
          <p className="text-gray-600">Manage your scheduled posts and content pipeline</p>
        </div>
        <Button className="button-primary">New Post</Button>
      </div>

      <Tabs defaultValue="scheduled" className="w-full">
        <TabsList className="bg-gray-100 rounded-2xl p-1 mb-6">
          <TabsTrigger value="scheduled" className="rounded-xl font-medium px-4">
            Scheduled
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-xl font-medium px-4">
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="month" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CalendarIcon className="h-5 w-5" />
                  {currentMonth}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-6 pt-4">
              <div className="grid grid-cols-7 gap-2 mb-4">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="p-2 text-center font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-6">
                {getDaysInMonth()
                  .slice(0, 35)
                  .map(({ day, posts }) => (
                    <div key={day} className="min-h-20 p-2 border rounded-lg hover:bg-gray-50">
                      <div className="font-medium text-sm mb-1">{day}</div>
                      <div className="space-y-1">
                        {posts.slice(0, 2).map((post) => (
                          <div key={post.id} className="text-xs p-1 bg-blue-100 text-blue-800 rounded truncate">
                            {post.content.slice(0, 20)}...
                          </div>
                        ))}
                        {posts.length > 2 && <div className="text-xs text-gray-500">+{posts.length - 2} more</div>}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="list" className="space-y-4">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="failed">Failed</TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Posts</CardTitle>
                  <CardDescription>Posts scheduled for publishing</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pb-6 pt-4">
                  {scheduledPosts.map((post, index) => (
                    <div key={post.id} className="card-modern card-soft-shadow animate-fade-in">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 pr-4">
                          <div className="mb-2">
                            <span className="text-sm text-blue-600 font-medium">Scheduled</span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-2">{post.content}</h3>
                          <p className="text-gray-600 mb-3">
                            Scheduled for {post.time} on {post.date}
                          </p>
                          <Button variant="outline" className="button-secondary bg-transparent">
                            View
                          </Button>
                        </div>
                        <div className="w-40 h-24 flex-shrink-0">
                          <BotanicalIllustration
                            variant={`leaf${(index % 3) + 1}` as "leaf1" | "leaf2" | "leaf3"}
                            className="w-full h-full"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="failed" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Failed Posts</CardTitle>
                  <CardDescription>Posts that failed to publish</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4 pb-6 pt-4">
                  {failedPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex items-start justify-between p-4 border border-red-200 rounded-lg bg-red-50"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 mb-2">{post.content}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {new Date(`${post.date}T${post.time}`).toLocaleDateString()} at {post.time}
                          </div>
                          <div className="flex items-center gap-1">
                            {post.platforms.map((platform) => {
                              const Icon = platformIcons[platform as keyof typeof platformIcons]
                              return <Icon key={platform} className="h-4 w-4" />
                            })}
                          </div>
                        </div>
                        <p className="text-sm text-red-600">Error: {post.error}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive">Failed</Badge>
                        <Button variant="outline" size="sm">
                          Retry
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>
    </div>
  )
}
