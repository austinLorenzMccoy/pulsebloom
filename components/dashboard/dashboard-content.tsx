"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Plus, BarChart3, Users, TrendingUp, Settings, LogOut, User } from "lucide-react"
import { useAuth } from "@/components/auth/auth-provider"
import { useRouter } from "next/navigation"
import type { User as SupabaseUser } from "@supabase/supabase-js"
import type { Profile } from "@/lib/types/auth"

interface DashboardContentProps {
  user: SupabaseUser
  profile: Profile | null
}

export function DashboardContent({ user, profile }: DashboardContentProps) {
  const { signOut } = useAuth()
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    await signOut()
    router.push("/")
  }

  const displayName = profile?.display_name || profile?.full_name || user.email?.split("@")[0] || "User"
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-accent/10">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-secondary pulse-bloom"></div>
              <span className="font-heading text-xl font-semibold text-foreground">PulseBloom</span>
            </div>

            <div className="flex items-center gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Create Poll
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={profile?.avatar_url || ""} alt={displayName} />
                      <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{displayName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} disabled={isSigningOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    {isSigningOut ? "Signing out..." : "Sign out"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-semibold text-foreground mb-2">Welcome back, {displayName}!</h1>
          <p className="text-muted-foreground">Here's what's happening with your polls today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-2 border-border hover:border-primary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Polls</CardTitle>
              <BarChart3 className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">0</div>
              <p className="text-xs text-muted-foreground">No polls created yet</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-border hover:border-secondary/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
              <Users className="h-4 w-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">0</div>
              <p className="text-xs text-muted-foreground">No responses yet</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-border hover:border-accent/50 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">0%</div>
              <p className="text-xs text-muted-foreground">Create your first poll</p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Polls Section */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Polls
                <Badge variant="secondary">0</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-foreground mb-2">No polls yet</h3>
                <p className="text-muted-foreground mb-6">Create your first poll to start gathering opinions.</p>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Your First Poll
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-border">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant="outline"
                className="w-full justify-start h-12 border-2 border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
              >
                <Plus className="h-4 w-4 mr-3" />
                Create New Poll
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start h-12 border-2 border-secondary/20 text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
              >
                <BarChart3 className="h-4 w-4 mr-3" />
                View Analytics
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start h-12 border-2 border-border text-muted-foreground hover:bg-muted hover:text-foreground bg-transparent"
              >
                <Settings className="h-4 w-4 mr-3" />
                Account Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
