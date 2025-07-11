"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line } from "recharts"
import { BarChart3, TrendingUp, Users, Calendar, Download, Twitter, Linkedin, Facebook } from "lucide-react"

const postsPerPlatform = [
  { platform: "Twitter", posts: 45, color: "#1DA1F2" },
  { platform: "LinkedIn", posts: 32, color: "#0077B5" },
  { platform: "Facebook", posts: 28, color: "#1877F2" },
  { platform: "Instagram", posts: 15, color: "#E4405F" },
]

const successRateData = [
  { month: "Aug", rate: 95 },
  { month: "Sep", rate: 98 },
  { month: "Oct", rate: 96 },
  { month: "Nov", rate: 99 },
  { month: "Dec", rate: 97 },
  { month: "Jan", rate: 98 },
]

const topPosts = [
  {
    id: 1,
    content: "Our latest product update is here! Check out the new features that will transform your workflow.",
    engagement: 2453,
    platforms: ["twitter", "linkedin"],
    date: "2 days ago",
  },
  {
    id: 2,
    content: "Behind the scenes: How we built our remote-first culture and what we learned along the way.",
    engagement: 1876,
    platforms: ["linkedin", "facebook"],
    date: "1 week ago",
  },
  {
    id: 3,
    content: "Quick tip: 5 ways to improve your social media engagement in under 10 minutes.",
    engagement: 1654,
    platforms: ["twitter"],
    date: "3 days ago",
  },
]

const platformIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  facebook: Facebook,
}

export default function AnalyticsPage() {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-gray-600">Track your social media performance and insights</p>
        </div>
        <div className="flex items-center gap-4">
          <Select defaultValue="30days">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">120</div>
            <p className="text-xs text-gray-600">+15% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">98%</div>
            <p className="text-xs text-gray-600">+2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">1.2K</div>
            <p className="text-xs text-gray-600">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent className="p-4">
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-gray-600">Next 7 days</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Posts per Platform Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Posts per Platform</CardTitle>
            <CardDescription>Distribution of posts across social media platforms</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <ChartContainer
              config={{
                posts: {
                  label: "Posts",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={postsPerPlatform}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="platform" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="posts" fill="var(--color-posts)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Success Rate Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Success Rate Timeline</CardTitle>
            <CardDescription>Publishing success rate over time</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            <ChartContainer
              config={{
                rate: {
                  label: "Success Rate",
                  color: "hsl(var(--chart-2))",
                },
              }}
              className="h-64"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={successRateData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[90, 100]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="rate" stroke="var(--color-rate)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performing Posts */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Posts</CardTitle>
          <CardDescription>Your most engaging content this month</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-4">
          {topPosts.map((post, index) => (
            <div key={post.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 mb-2">{post.content}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>{post.date}</span>
                  <div className="flex items-center gap-1">
                    {post.platforms.map((platform) => {
                      const Icon = platformIcons[platform as keyof typeof platformIcons]
                      return <Icon key={platform} className="h-3 w-3" />
                    })}
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 text-right">
                <div className="text-lg font-bold text-green-600">{post.engagement.toLocaleString()}</div>
                <div className="text-xs text-gray-500">engagements</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
