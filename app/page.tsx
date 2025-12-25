import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Zap, Calendar, BarChart3 } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">Post-Sync</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="dark:text-gray-300 dark:hover:text-white">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Cross-Post to All Your Social Media
          <span className="text-blue-600"> Instantly</span>
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
          Create once, publish everywhere. Schedule and manage your social media content across all platforms from one
          powerful dashboard.
        </p>
        <Link href="/signup">
          <Button size="lg" className="text-lg px-8 py-4">
            Start Free Trial
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <Card>
            <CardHeader>
              <CheckCircle className="h-10 w-10 text-green-600 mb-4" />
              <CardTitle className="dark:text-white">Multi-Platform Publishing</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Connect Twitter, LinkedIn, Facebook, Instagram and more. Publish to all platforms simultaneously.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <Calendar className="h-10 w-10 text-blue-600 mb-4" />
              <CardTitle className="dark:text-white">Smart Scheduling</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Schedule posts in advance with our intuitive calendar interface. Never miss the perfect posting time.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <BarChart3 className="h-10 w-10 text-purple-600 mb-4" />
              <CardTitle className="dark:text-white">Analytics & Insights</CardTitle>
              <CardDescription className="dark:text-gray-300">
                Track performance across platforms. Understand what content works best for your audience.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>
    </div>
  )
}
