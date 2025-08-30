"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { RefreshCw, Home } from "lucide-react"
import Link from "next/link"

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error("[v0] Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background to-accent/20">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-6">
              <div className="h-16 w-16 rounded-full bg-destructive/20 flex items-center justify-center">
                <span className="text-2xl font-bold text-destructive">!</span>
              </div>
            </div>
            <h1 className="font-heading text-2xl font-semibold text-destructive text-balance">Something went wrong</h1>
            <p className="text-muted-foreground">
              We encountered an unexpected error. Please try again or contact support if the problem persists.
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={reset}
              className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Link href="/">
              <Button
                variant="outline"
                className="w-full h-12 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
              >
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
