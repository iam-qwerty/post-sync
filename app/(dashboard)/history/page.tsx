"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  HistoryIcon,
  Search,
  MoreHorizontal,
  Copy,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock,
  Twitter,
  Linkedin,
  Facebook,
} from "lucide-react"

const postHistory = [
  {
    id: 1,
    content:
      "Excited to announce our new product launch! 🚀 This has been months in the making and we can't wait for you to try it.",
    publishedAt: "2024-01-10T14:30:00Z",
    platforms: ["twitter", "linkedin"],
    status: "published",
    engagement: { likes: 45, shares: 12, comments: 8 },
  },
  {
    id: 2,
    content:
      "Behind the scenes: How we built our remote-first culture and what we learned along the way. Read our latest blog post!",
    publishedAt: "2024-01-08T10:15:00Z",
    platforms: ["linkedin", "facebook"],
    status: "published",
    engagement: { likes: 89, shares: 23, comments: 15 },
  },
  {
    id: 3,
    content:
      "Quick tip Tuesday: 5 ways to improve your social media engagement in under 10 minutes. Which one will you try first?",
    publishedAt: "2024-01-05T16:45:00Z",
    platforms: ["twitter"],
    status: "published",
    engagement: { likes: 67, shares: 34, comments: 21 },
  },
  {
    id: 4,
    content: "Weekly newsletter is now available! This week we're covering industry trends and actionable insights.",
    publishedAt: "2024-01-03T09:00:00Z",
    platforms: ["twitter", "linkedin"],
    status: "failed",
    error: "Authentication token expired",
  },
  {
    id: 5,
    content:
      "Happy New Year! Thank you to our amazing community for making 2023 incredible. Here's to an even better 2024! 🎉",
    publishedAt: "2024-01-01T12:00:00Z",
    platforms: ["twitter", "linkedin", "facebook"],
    status: "published",
    engagement: { likes: 156, shares: 78, comments: 43 },
  },
]

const platformIcons = {
  twitter: Twitter,
  linkedin: Linkedin,
  facebook: Facebook,
}

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [platformFilter, setPlatformFilter] = useState("all")

  const filteredPosts = postHistory.filter((post) => {
    const matchesSearch = post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || post.status === statusFilter
    const matchesPlatform = platformFilter === "all" || post.platforms.includes(platformFilter)

    return matchesSearch && matchesStatus && matchesPlatform
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "published":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "scheduled":
        return <Clock className="h-4 w-4 text-blue-600" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-700">Published</Badge>
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      case "scheduled":
        return <Badge className="bg-blue-100 text-blue-700">Scheduled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Post History</h1>
        <p className="text-gray-600">View and manage your published and scheduled posts</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-full md:w-40">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  {getStatusIcon(post.status)}
                  <span className="text-sm text-gray-600">{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(post.status)}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Copy className="h-4 w-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <p className="text-gray-900 mb-3 leading-relaxed">{post.content}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Posted to:</span>
                  <div className="flex gap-2">
                    {post.platforms.map((platform) => {
                      const Icon = platformIcons[platform as keyof typeof platformIcons]
                      return (
                        <div key={platform} className="flex items-center gap-1">
                          <Icon className="h-4 w-4" />
                        </div>
                      )
                    })}
                  </div>
                </div>

                {post.status === "published" && post.engagement && (
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{post.engagement.likes} likes</span>
                    <span>{post.engagement.shares} shares</span>
                    <span>{post.engagement.comments} comments</span>
                  </div>
                )}

                {post.status === "failed" && post.error && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-red-600">Error: {post.error}</span>
                    <Button variant="outline" size="sm">
                      Retry
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <HistoryIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No posts found</h3>
            <p className="text-gray-600">
              {searchQuery || statusFilter !== "all" || platformFilter !== "all"
                ? "Try adjusting your filters to see more posts."
                : "You haven't published any posts yet. Create your first post to get started!"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
