"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Calendar, BarChart3, Clock, CheckCircle, AlertCircle, Twitter, Linkedin, Facebook } from "lucide-react"

const upcomingPosts = [
  {
    id: 1,
    content: "Exciting news about our new product launch! 🚀",
    scheduledTime: "Today, 2:00 PM",
    platforms: ["twitter", "linkedin"],
    status: "scheduled",
  },
  {
    id: 2,
    content: "Check out our latest blog post on social media trends",
    scheduledTime: "Tomorrow, 10:00 AM",
    platforms: ["facebook", "linkedin"],
    status: "scheduled",
  },
  {
    id: 3,
    content: "Behind the scenes at our office today",
    scheduledTime: "Dec 8, 3:00 PM",
    platforms: ["twitter", "facebook"],
    status: "scheduled",
  },
]

const recentActivity = [
  {
    id: 1,
    content: "Weekly newsletter is live!",
    time: "2 hours ago",
    platforms: ["twitter", "linkedin"],
    status: "success",
  },
  {
    id: 2,
    content: "Product update announcement",
    time: "1 day ago",
    platforms: ["facebook"],
    status: "failed",
  },
]

const platformIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  facebook: Facebook,
}

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome back! Here's what's happening with your social media.
          </p>
        </div>
        <Link href="/create">
          <Button className="button-primary px-6 py-3">
            <Plus className="h-5 w-5 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card className="card-modern card-soft-shadow dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Scheduled Posts</CardTitle>
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center">
              <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">12</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">+2 from last week</p>
          </CardContent>
        </Card>

        <Card className="card-modern card-soft-shadow dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Published Today</CardTitle>
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">4</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Across all platforms</p>
          </CardContent>
        </Card>

        <Card className="card-modern card-soft-shadow dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Connected Accounts</CardTitle>
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-2xl flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">3</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Twitter, LinkedIn, Facebook</p>
          </CardContent>
        </Card>

        <Card className="card-modern card-soft-shadow dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</CardTitle>
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-2xl flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </CardHeader>
          <CardContent className="pb-4">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">98%</div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Last 30 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Posts */}
        <Card className="card-modern card-soft-shadow dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Upcoming Posts
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Your next scheduled posts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 dark:text-white mb-1">{post.content}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{post.scheduledTime}</p>
                </div>
                <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 font-medium px-2 py-1 rounded-xl">
                  Scheduled
                </Badge>
              </div>
            ))}
            <Link href="/calendar">
              <Button
                variant="outline"
                className="w-full bg-transparent rounded-2xl py-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                View All Scheduled Posts
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="card-modern card-soft-shadow dark:bg-gray-800 dark:border-gray-700">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">Latest posting activity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-4 border dark:border-gray-600 rounded-2xl">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="dark:bg-gray-700">
                    {activity.status === "success" ? (
                      <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-red-600 dark:text-red-400" />
                    )}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{activity.content}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">{activity.time}</p>
                  <div className="flex items-center gap-1 mt-1">
                    {activity.platforms.map((platform) => {
                      const Icon = platformIcons[platform as keyof typeof platformIcons]
                      return <Icon key={platform} className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                    })}
                  </div>
                </div>
                <Badge variant={activity.status === "success" ? "default" : "destructive"}>
                  {activity.status === "success" ? "Posted" : "Failed"}
                </Badge>
              </div>
            ))}
            <Link href="/history">
              <Button
                variant="outline"
                className="w-full bg-transparent rounded-2xl py-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                View Full History
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="card-modern card-soft-shadow dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold dark:text-white">Quick Actions</CardTitle>
          <CardDescription className="dark:text-gray-400">Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent className="pb-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/create">
              <Button
                variant="outline"
                className="w-full h-20 flex-col gap-2 bg-transparent rounded-2xl dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <Plus className="h-5 w-5" />
                Create New Post
              </Button>
            </Link>
            <Link href="/calendar">
              <Button
                variant="outline"
                className="w-full h-20 flex-col gap-2 bg-transparent rounded-2xl dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <Calendar className="h-5 w-5" />
                View Calendar
              </Button>
            </Link>
            <Link href="/analytics">
              <Button
                variant="outline"
                className="w-full h-20 flex-col gap-2 bg-transparent rounded-2xl dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
              >
                <BarChart3 className="h-5 w-5" />
                View Analytics
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
