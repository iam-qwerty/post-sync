"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Twitter, Linkedin, Facebook, Instagram, Upload, Copy, Calendar, Clock, Send } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const platforms = [
  { id: "twitter", name: "Twitter", icon: Twitter, limit: 280, connected: true },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, limit: 3000, connected: true },
  { id: "facebook", name: "Facebook", icon: Facebook, limit: 63206, connected: true },
  { id: "instagram", name: "Instagram", icon: Instagram, limit: 2200, connected: false },
]

export default function CreatePostPage() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["twitter", "linkedin"])
  const [masterContent, setMasterContent] = useState("")
  const [platformContent, setPlatformContent] = useState<Record<string, string>>({})
  const [postMode, setPostMode] = useState<"now" | "schedule">("now")
  const [scheduleDate, setScheduleDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handlePlatformToggle = (platformId: string) => {
    if (selectedPlatforms.includes(platformId)) {
      setSelectedPlatforms((prev) => prev.filter((id) => id !== platformId))
    } else {
      setSelectedPlatforms((prev) => [...prev, platformId])
      // Initialize with master content if available
      if (masterContent && !platformContent[platformId]) {
        setPlatformContent((prev) => ({
          ...prev,
          [platformId]: masterContent,
        }))
      }
    }
  }

  const handleMasterContentChange = (content: string) => {
    setMasterContent(content)
    // Auto-populate platform content if it's empty
    selectedPlatforms.forEach((platformId) => {
      if (!platformContent[platformId]) {
        setPlatformContent((prev) => ({
          ...prev,
          [platformId]: content,
        }))
      }
    })
  }

  const handleApplyToAll = () => {
    const updatedContent: Record<string, string> = {}
    selectedPlatforms.forEach((platformId) => {
      updatedContent[platformId] = masterContent
    })
    setPlatformContent(updatedContent)
    toast({
      title: "Content applied",
      description: "Master content has been applied to all selected platforms.",
    })
  }

  const handleSubmit = async () => {
    if (selectedPlatforms.length === 0) {
      toast({
        title: "No platforms selected",
        description: "Please select at least one platform to post to.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate post creation
    setTimeout(() => {
      setIsSubmitting(false)
      const action = postMode === "now" ? "queued for publishing" : "scheduled"
      toast({
        title: "Post created!",
        description: `Your post has been ${action} to ${selectedPlatforms.length} platform(s).`,
      })
      router.push("/dashboard")
    }, 2000)
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Post</h1>
        <p className="text-gray-600 dark:text-gray-400">Share your content across all your social platforms</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {/* Content Type Tabs */}
          <Tabs defaultValue="media" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800 rounded-2xl p-1 mb-6">
              <TabsTrigger
                value="media"
                className="rounded-xl font-medium py-2 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white"
              >
                Media
              </TabsTrigger>
              <TabsTrigger
                value="text"
                className="rounded-xl font-medium py-2 dark:data-[state=active]:bg-gray-700 dark:data-[state=active]:text-white"
              >
                Text
              </TabsTrigger>
            </TabsList>

            <TabsContent value="media" className="space-y-6">
              {/* Media Upload */}
              <Card className="card-modern card-soft-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg dark:text-white">Upload Media</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Add images, videos, or create a carousel post
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="upload-area mb-6 dark:bg-gray-700/50 dark:border-gray-600">
                    <Upload className="h-10 w-10 mx-auto text-gray-400 dark:text-gray-500 mb-3" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Drag and drop to upload
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Or, browse to choose a file from your computer
                    </p>
                    <Button className="button-primary px-6 py-2">Browse</Button>
                  </div>

                  {/* Cover Image Section */}
                  <div className="space-y-3">
                    <Label className="font-medium dark:text-gray-200">Cover Image</Label>
                    <div className="border-2 border-dashed border-gray-200 dark:border-gray-600 rounded-2xl p-6 bg-gray-50/50 dark:bg-gray-700/50">
                      <div className="flex items-center justify-center">
                        <Button
                          variant="outline"
                          className="rounded-2xl bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Choose Cover Image
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Recommended size: 1080 x 1080px</p>
                  </div>
                </CardContent>
              </Card>

              {/* Captions for Media Posts */}
              <Card className="card-modern card-soft-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg dark:text-white">Captions</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Add captions for your media post across platforms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Master Caption */}
                  <div className="space-y-2">
                    <Label className="font-medium dark:text-gray-200">Master Caption</Label>
                    <Textarea
                      placeholder="Write your caption here..."
                      value={masterContent}
                      onChange={(e) => handleMasterContentChange(e.target.value)}
                      className="min-h-24 resize-none rounded-2xl dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-500">
                        {masterContent.length} characters
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleApplyToAll}
                        className="rounded-xl bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Apply to All
                      </Button>
                    </div>
                  </div>

                  {/* Platform-Specific Captions */}
                  {selectedPlatforms.map((platformId) => {
                    const platform = platforms.find((p) => p.id === platformId)
                    if (!platform) return null

                    const Icon = platform.icon
                    const content = platformContent[platformId] || ""
                    const isOverLimit = content.length > platform.limit

                    return (
                      <div key={platformId} className="space-y-2 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-white dark:bg-gray-600 rounded-xl flex items-center justify-center">
                            <Icon className="h-3 w-3 dark:text-gray-300" />
                          </div>
                          <Label className="font-medium dark:text-gray-200">{platform.name}</Label>
                          <Badge
                            variant="outline"
                            className="text-xs rounded-lg dark:border-gray-600 dark:text-gray-300"
                          >
                            {content.length}/{platform.limit}
                          </Badge>
                        </div>
                        <Textarea
                          placeholder={`Caption for ${platform.name}...`}
                          value={content}
                          onChange={(e) =>
                            setPlatformContent((prev) => ({
                              ...prev,
                              [platformId]: e.target.value,
                            }))
                          }
                          className={`min-h-20 resize-none rounded-xl dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 ${isOverLimit ? "border-red-500 dark:border-red-500" : ""}`}
                        />
                        {isOverLimit && (
                          <p className="text-sm text-red-500 dark:text-red-400">
                            Content exceeds {platform.name} character limit
                          </p>
                        )}
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="text" className="space-y-6">
              {/* Master Content */}
              <Card className="card-modern card-soft-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg dark:text-white">Master Content</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Write your main content here. You can customize it for each platform below.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <Textarea
                    placeholder="What's on your mind? Share your thoughts..."
                    value={masterContent}
                    onChange={(e) => handleMasterContentChange(e.target.value)}
                    className="min-h-32 resize-none rounded-2xl dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400"
                  />
                  <div className="flex justify-between items-center mt-3">
                    <span className="text-sm text-gray-500 dark:text-gray-500">{masterContent.length} characters</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleApplyToAll}
                      className="rounded-xl bg-transparent dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Apply to All
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Platform-Specific Content */}
              <Card className="card-modern card-soft-shadow dark:bg-gray-800 dark:border-gray-700">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg dark:text-white">Platform-Specific Content</CardTitle>
                  <CardDescription className="dark:text-gray-400">
                    Customize your content for each selected platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {selectedPlatforms.map((platformId) => {
                    const platform = platforms.find((p) => p.id === platformId)
                    if (!platform) return null

                    const Icon = platform.icon
                    const content = platformContent[platformId] || ""
                    const isOverLimit = content.length > platform.limit

                    return (
                      <div key={platformId} className="space-y-2 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-2xl">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-white dark:bg-gray-600 rounded-xl flex items-center justify-center">
                            <Icon className="h-3 w-3 dark:text-gray-300" />
                          </div>
                          <Label className="font-medium dark:text-gray-200">{platform.name}</Label>
                          <Badge
                            variant="outline"
                            className="text-xs rounded-lg dark:border-gray-600 dark:text-gray-300"
                          >
                            {content.length}/{platform.limit}
                          </Badge>
                        </div>
                        <Textarea
                          placeholder={`Caption for ${platform.name}...`}
                          value={content}
                          onChange={(e) =>
                            setPlatformContent((prev) => ({
                              ...prev,
                              [platformId]: e.target.value,
                            }))
                          }
                          className={`min-h-24 resize-none rounded-xl dark:bg-gray-600 dark:border-gray-500 dark:text-white dark:placeholder-gray-400 ${isOverLimit ? "border-red-500 dark:border-red-500" : ""}`}
                        />
                        {isOverLimit && (
                          <p className="text-sm text-red-500 dark:text-red-400">
                            Content exceeds {platform.name} character limit
                          </p>
                        )}
                      </div>
                    )
                  })}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Platform Selection & Scheduling */}
        <div className="space-y-6">
          {/* Select Platforms */}
          <Card className="card-modern card-soft-shadow dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Select Platforms</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Choose which platforms to post to
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {platforms.map((platform) => {
                const Icon = platform.icon
                const isSelected = selectedPlatforms.includes(platform.id)
                const isConnected = platform.connected

                return (
                  <div key={platform.id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={() => handlePlatformToggle(platform.id)}
                        className="w-5 h-5 rounded border-2 dark:border-gray-600 dark:data-[state=checked]:bg-blue-500 dark:data-[state=checked]:border-blue-500"
                        disabled={!isConnected}
                      />
                      <Icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                      <span className="font-medium text-gray-900 dark:text-white capitalize">{platform.name}</span>
                    </div>
                    <div>
                      {isConnected ? (
                        <Badge className="bg-blue-500 hover:bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Connected
                        </Badge>
                      ) : (
                        <span className="text-gray-500 dark:text-gray-500 text-sm font-medium">Not Connected</span>
                      )}
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>

          {/* Schedule Settings */}
          <Card className="card-modern card-soft-shadow dark:bg-gray-800 dark:border-gray-700">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-gray-900 dark:text-white">Schedule Settings</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Choose when to publish your post
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <Switch
                  id="schedule-mode"
                  checked={postMode === "schedule"}
                  onCheckedChange={(checked) => setPostMode(checked ? "schedule" : "now")}
                  className="data-[state=checked]:bg-blue-500"
                />
                <Label htmlFor="schedule-mode" className="text-base font-medium text-gray-900 dark:text-white">
                  Schedule for later
                </Label>
              </div>

              {postMode === "schedule" && (
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="schedule-date" className="text-sm font-medium text-gray-900 dark:text-gray-200">
                      Date
                    </Label>
                    <div className="relative">
                      <Input
                        id="schedule-date"
                        type="date"
                        value={scheduleDate}
                        onChange={(e) => setScheduleDate(e.target.value)}
                        className="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white pr-10"
                        placeholder="mm/dd/yyyy"
                      />
                      <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="schedule-time" className="text-sm font-medium text-gray-900 dark:text-gray-200">
                      Time
                    </Label>
                    <div className="relative">
                      <Input
                        id="schedule-time"
                        type="time"
                        value={scheduleTime}
                        onChange={(e) => setScheduleTime(e.target.value)}
                        className="rounded-lg border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white pr-10"
                        placeholder="--:-- --"
                      />
                      <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2"
              onClick={handleSubmit}
              disabled={isSubmitting}
            >
              {postMode === "schedule" ? (
                <>
                  <Calendar className="h-4 w-4" />
                  {isSubmitting ? "Scheduling..." : "Schedule Post"}
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Publishing..." : "Post Now"}
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              className="w-full text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 font-medium py-2"
            >
              Save as Draft
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
