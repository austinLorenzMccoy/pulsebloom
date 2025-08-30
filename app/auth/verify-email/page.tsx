"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, RefreshCw } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const { resetPassword } = useAuth()

  const handleResendEmail = async () => {
    setIsResending(true)
    setMessage(null)

    // In a real app, you'd have a resend verification email function
    // For now, we'll simulate it
    setTimeout(() => {
      setMessage("Verification email sent! Check your inbox.")
      setIsResending(false)
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-background to-accent/20">
      <div className="w-full max-w-md">
        <Card className="border-0 shadow-2xl">
          <CardHeader className="text-center pb-8">
            <div className="mx-auto mb-6 pulse-bloom">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="font-heading text-2xl font-semibold text-primary text-balance">Check Your Inbox</h1>
            <p className="text-muted-foreground">
              We've sent a verification link to your email address. Click the link to activate your account and start
              using PulseBloom.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {message && (
              <Alert>
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}

            <Button
              onClick={handleResendEmail}
              variant="outline"
              className="w-full h-12 border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
              disabled={isResending}
            >
              {isResending ? (
                <div className="flex items-center gap-2">
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Sending...
                </div>
              ) : (
                "Resend Verification Email"
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              <p>Didn't receive the email? Check your spam folder or try resending.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
