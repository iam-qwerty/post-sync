"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Twitter, Linkedin, Facebook, Instagram, Youtube } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const platforms = [
  { id: "twitter", name: "Twitter", icon: Twitter, color: "bg-sky-500" },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin, color: "bg-blue-600" },
  { id: "facebook", name: "Facebook", icon: Facebook, color: "bg-blue-700" },
  { id: "instagram", name: "Instagram", icon: Instagram, color: "bg-pink-500" },
  { id: "youtube", name: "YouTube", icon: Youtube, color: "bg-red-600" },
]

export default function OnboardingPage() {
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([])
  const [isConnectingState, setIsConnectingState] = useState<string | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  const handleConnect = async (platformId: string) => {
    setIsConnectingState(platformId)

    // Simulate OAuth connection
    setTimeout(() => {
      setConnectedPlatforms((prev) => [...prev, platformId])
      setIsConnectingState(null)
      toast({
        title: `${platforms.find((p) => p.id === platformId)?.name} connected!`,
        description: "Your account has been successfully linked.",
      })
    }, 1500)
  }

  const handleContinue = () => {
    if (connectedPlatforms.length === 0) {
      toast({
        title: "Connect at least one platform",
        description: "You need to connect at least one social media account to continue.",
        variant: "destructive",
      })
      return
    }
    router.push("/dashboard")
  }

  const handleSkip = () => {
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center pb-8">
          <CardTitle className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Connect your social accounts
          </CardTitle>
          <CardDescription className="text-lg text-gray-600 dark:text-gray-300">
            Connect your social accounts to Post-Sync to start scheduling posts.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            {platforms.map((platform) => {
              const Icon = platform.icon
              const isConnected = connectedPlatforms.includes(platform.id)
              const isConnecting = isConnectingState === platform.id

              return (
                <div key={platform.id} className="platform-card dark:bg-gray-700/50 dark:hover:bg-gray-700">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-600 rounded-2xl flex items-center justify-center">
                      <Icon className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">{platform.name}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Connect your {platform.name} account to PostBridge
                      </p>
                    </div>
                  </div>
                  <div>
                    {isConnected ? (
                      <Badge className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 font-medium px-3 py-1 rounded-xl">
                        Connected
                      </Badge>
                    ) : (
                      <Button
                        className="button-primary"
                        onClick={() => handleConnect(platform.id)}
                        disabled={isConnecting}
                      >
                        {isConnecting ? "Connecting..." : "Connect"}
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>

        <div className="flex justify-between pt-6 px-6 pb-6">
          <Button variant="ghost" onClick={handleSkip} className="dark:text-gray-300 dark:hover:text-white">
            Skip for now
          </Button>
          <Button onClick={handleContinue}>Continue to Dashboard</Button>
        </div>
      </Card>
    </div>
  )
}
