"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background to-accent/20">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-6 pulse-bloom">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <span className="text-2xl font-bold text-white">404</span>
              </div>
            </div>
            <h1 className="font-heading text-2xl font-semibold text-foreground text-balance">Page Not Found</h1>
            <p className="text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/">
              <Button className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Button>
            </Link>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full h-12 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
