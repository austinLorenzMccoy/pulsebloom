"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import type { AuthContextType, Profile } from "@/lib/types/auth"

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user ?? null)

      if (session?.user) {
        await fetchProfile(session.user.id)
      }

      setLoading(false)
    }

    getInitialSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("[v0] Auth state changed:", event, session?.user?.email)
      setUser(session?.user ?? null)

      if (session?.user) {
        await fetchProfile(session.user.id)
      } else {
        setProfile(null)
      }

      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const fetchProfile = async (userId: string) => {
    try {
      console.log("[v0] Fetching profile for user:", userId)
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single()

      if (error && error.code !== "PGRST116") {
        console.error("[v0] Error fetching profile:", error)
        return
      }

      console.log("[v0] Profile fetched:", data)
      setProfile(data || null)
    } catch (error) {
      console.error("[v0] Error fetching profile:", error)
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      console.log("[v0] Attempting sign in for:", email)
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        console.error("[v0] Sign in error:", error)
      } else {
        console.log("[v0] Sign in successful")
      }
      return { error }
    } catch (error) {
      console.error("[v0] Sign in exception:", error)
      return { error: error as Error }
    }
  }

  const signUp = async (email: string, password: string, metadata?: { full_name?: string; display_name?: string }) => {
    try {
      console.log("[v0] Attempting sign up for:", email, "with metadata:", metadata)
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/callback`,
          data: metadata || {},
        },
      })
      if (error) {
        console.error("[v0] Sign up error:", error)
      } else {
        console.log("[v0] Sign up successful")
      }
      return { error }
    } catch (error) {
      console.error("[v0] Sign up exception:", error)
      return { error: error as Error }
    }
  }

  const signOut = async () => {
    console.log("[v0] Signing out user")
    await supabase.auth.signOut()
  }

  const resetPassword = async (email: string) => {
    try {
      console.log("[v0] Requesting password reset for:", email)
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL || `${window.location.origin}/auth/reset-password`,
      })
      if (error) {
        console.error("[v0] Password reset error:", error)
      } else {
        console.log("[v0] Password reset email sent")
      }
      return { error }
    } catch (error) {
      console.error("[v0] Password reset exception:", error)
      return { error: error as Error }
    }
  }

  const value: AuthContextType = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
