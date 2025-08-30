# PulseBloom Auth

A modern, stylish authentication starter for PulseBloom Polls built with Next.js (App Router), TypeScript, Supabase Auth, TailwindCSS, and shadcn/ui. Includes email/password, password reset, and Google OAuth with session-aware routing and a polished UI.

---

## Features

- 
- __Email/password auth__: register, login, logout
- __Google OAuth__: one-click login via Supabase
- __Password reset__: request email link and set new password
- __Session management__: client + middleware to protect routes
- __Profile fetching__: example `profiles` table pattern
- __Responsive UI__: shadcn/ui, Tailwind, custom PulseBloom theme
- __App Router ready__: Next.js 15, React 19

---

## Project Structure

```
pulsebloom-auth/
├─ app/
│  ├─ auth/
│  │  ├─ login/page.tsx             # Login UI (Google button wired)
│  │  ├─ register/page.tsx          # Signup UI
│  │  ├─ forgot-password/page.tsx   # Request reset email
│  │  ├─ reset-password/page.tsx    # Set new password
│  │  └─ callback/page.tsx          # OAuth/email callback handler
│  ├─ dashboard/                    # Protected area
│  └─ error.tsx                     # Global error boundary
├─ components/
│  ├─ auth/
│  │  └─ auth-provider.tsx          # Supabase Auth context
│  ├─ dashboard/
│  └─ ui/                           # shadcn/ui components
├─ hooks/
│  ├─ use-mobile.ts
│  └─ use-toast.ts
├─ lib/
│  ├─ supabase/
│  │  ├─ client.ts                  # Browser client
│  │  ├─ server.ts                  # Server client
│  │  └─ middleware.ts              # Route protection + redirects
│  ├─ types/
│  └─ utils.ts
├─ package.json
├─ .env.local                       # Your local env vars
└─ README.md
```

Key files referenced above:
- `components/auth/auth-provider.tsx`: exposes `signIn`, `signUp`, `signOut`, `resetPassword` and listens to Supabase auth state.
- `app/auth/login/page.tsx`: email/password login + "Continue with Google" wired via `supabase.auth.signInWithOAuth({ provider: 'google' })` to `redirectTo: /auth/callback`.
- `lib/supabase/middleware.ts`: protects `'/dashboard'`, redirects logged-in users away from `'/auth/login'`, `'/auth/register'`, `'/auth/forgot-password'`.
- `app/auth/callback/page.tsx`: validates the session and forwards to `'/dashboard'` or back to login on error.

---

## Prerequisites

- Node.js 18+ (recommended LTS) and pnpm
- A Supabase project (free tier works)
- Google Cloud project for OAuth (optional but recommended)

Install pnpm if you need it:

```bash
npm i -g pnpm
```

---

## Setup

1) Clone and install

```bash
pnpm install
```

2) Environment variables

Create `./.env.local` in the project root with:

```
NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
# Optional: helps build redirect URLs for email flows during local dev
NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000
```

You can copy from `.env` if provided and then fill in real values.

3) Run the dev server

```bash
pnpm dev
```

Visit http://localhost:3000

---

## Supabase Configuration

1) Authentication → URL Configuration
- __Site URL__: `http://localhost:3000`
- __Redirect URLs__:
  - `http://localhost:3000/auth/callback`
  - `http://localhost:3000/auth/reset-password`

2) Enable Google (optional if using social login)
- Authentication → Providers → Google
- Toggle ON and paste your Google OAuth Client ID and Client Secret
- Save

3) Database (optional profile example)
- Typical approach: create a `profiles` table keyed by `auth.users.id`
- The app’s provider fetches the profile after login as an example pattern

---

## Google OAuth Setup (Console)

1) Go to https://console.cloud.google.com → select/create a project
2) OAuth consent screen → User type: External → configure basic fields
   - While in Testing, add your Google account under Test users
3) Credentials → Create Credentials → OAuth client ID → Web application
4) Configure:
   - Authorized JavaScript origins: `http://localhost:3000`
   - Authorized redirect URIs: `https://<your-project-ref>.supabase.co/auth/v1/callback`
5) Create → Copy Client ID and Client Secret
6) Paste both into Supabase → Authentication → Providers → Google → Save

Now clicking "Continue with Google" on `'/auth/login'` will go to Google → Supabase → back to `'/auth/callback'` → `'/dashboard'`.

---

## Commands

- `pnpm dev` — start local dev server
- `pnpm build` — production build
- `pnpm start` — start production server (after build)
- `pnpm lint` — lint the codebase

---

## How It Works

- __Client auth__: `auth-provider.tsx` initializes Supabase client (`lib/supabase/client.ts`), exposes auth methods and keeps session state.
- __Middleware__: `lib/supabase/middleware.ts` checks session on navigation and applies redirects.
- __Callback__: `app/auth/callback/page.tsx` reads `supabase.auth.getSession()`; if present, forwards to `'/dashboard'`.
- __Email flows__: `signUp()` sets `emailRedirectTo` to your dev origin (or `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL`), so verification/reset links return to your app.

---

## Troubleshooting

- __400 (Bad Request) on /auth/v1/authorize__
  - Google provider not enabled in Supabase
  - Wrong Client ID/Secret in Supabase
  - Missing Supabase callback in Google: `https://<project-ref>.supabase.co/auth/v1/callback`
  - Missing Redirect URLs in Supabase URL Configuration

- __Stuck on callback__
  - Check `app/auth/callback/page.tsx` logic and browser console
  - Verify cookies aren’t blocked; try a normal browser window

- __Consent screen errors__
  - If in Testing, add your account to Test users in Google Cloud

- __Env not loading__
  - Use `.env.local` (Next.js loads this by default)
  - Restart the dev server after changing env vars

- __Type or build issues__
  - Ensure Node 18+, `pnpm install`
  - Clear `.next/` if needed and rebuild: `pnpm build`

---

## Security Notes

- Never commit secrets. `.env.local` is gitignored.
- Use the anon key on the client; service role keys must stay server-side only (not used here).
- For production, set exact domain URLs (no localhost) in Supabase and Google.

---

## Roadmap

- Magic link login
- Additional providers (GitHub, Twitter/X)
- E2E tests for auth flows (Playwright/Cypress)
- CI workflow (lint, typecheck, build)
- Improved profile management and settings page

---

## License

MIT
