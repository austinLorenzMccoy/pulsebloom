"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, BarChart3, Users, Zap } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { PulseBloomIllustration } from "@/components/auth/pulse-bloom-illustration"
import Link from "next/link"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If user is authenticated, redirect to dashboard
    if (!loading && user) {
      router.push("/dashboard")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="pulse-bloom">
          <div className="h-12 w-12 rounded-full bg-primary"></div>
        </div>
      </div>
    )
  }

  // If user is authenticated, don't show landing page (will redirect)
  if (user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/20">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary pulse-bloom"></div>
              <span className="font-heading text-xl font-semibold text-foreground">PulseBloom</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/auth/login">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-heading text-4xl lg:text-6xl font-bold text-foreground text-balance">
                Where Every{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Voice Matters
                </span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance leading-relaxed">
                Create engaging polls, gather meaningful insights, and make decisions together with PulseBloom's
                intuitive polling platform.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth/register">
                <Button
                  size="lg"
                  className="w-full sm:w-auto h-14 px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium gradient-shift"
                >
                  Start Creating Polls
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/auth/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto h-14 px-8 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                >
                  Sign In
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <PulseBloomIllustration />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-foreground mb-4 text-balance">
            Powerful Polling Made Simple
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Everything you need to create, share, and analyze polls that drive meaningful conversations.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 border-border hover:border-primary/50 transition-colors">
            <CardContent className="p-8 text-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Quick & Easy</h3>
              <p className="text-muted-foreground leading-relaxed">
                Create professional polls in seconds with our intuitive interface. No complex setup required.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-border hover:border-secondary/50 transition-colors">
            <CardContent className="p-8 text-center">
              <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Engage Everyone</h3>
              <p className="text-muted-foreground leading-relaxed">
                Share polls easily and watch as your community participates in real-time discussions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-border hover:border-accent/50 transition-colors">
            <CardContent className="p-8 text-center">
              <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="h-8 w-8 text-foreground" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Rich Insights</h3>
              <p className="text-muted-foreground leading-relaxed">
                Get detailed analytics and visualizations to understand what your audience really thinks.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center space-y-8">
          <h2 className="font-heading text-3xl lg:text-4xl font-semibold text-foreground text-balance">
            Ready to Start Polling?
          </h2>
          <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
            Join thousands of users who trust PulseBloom to gather opinions and make better decisions.
          </p>
          <Link href="/auth/register">
            <Button
              size="lg"
              className="h-14 px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium gradient-shift"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <div className="h-6 w-6 rounded-full bg-gradient-to-r from-primary to-secondary pulse-bloom"></div>
              <span className="font-heading text-lg font-semibold text-foreground">PulseBloom</span>
              <span className="text-muted-foreground">- Where every voice matters</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
