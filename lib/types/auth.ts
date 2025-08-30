import type { User } from "@supabase/supabase-js"

export interface Profile {
  id: string
  display_name: string | null
  full_name: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface AuthContextType {
  user: User | null
  profile: Profile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (
    email: string,
    password: string,
    metadata?: { full_name?: string; display_name?: string },
  ) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: Error | null }>
}
