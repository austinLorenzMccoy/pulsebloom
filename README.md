<div align="center">
  <h1>PulseBloom Polls</h1>
  <p>✨ A modern, full-stack polling application with real-time results and secure authentication ✨</p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![shadcn/ui](https://img.shields.io/badge/shadcn_ui-18181B?style=for-the-badge&logo=react&logoColor=white)](https://ui.shadcn.com/)

  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](https://github.com/yourusername/pulsebloom-polls/pulls)
</div>

## 🚀 Features

### 🔐 Authentication
- **Email/Password** - Secure sign up and login
- **Google OAuth** - One-click sign in with Google
- **Password Reset** - Secure password recovery flow
- **Session Management** - Protected routes and automatic session handling

### 📊 Polling System
- Create and manage polls
- Real-time voting and results
- Secure voting with user authentication
- Responsive design for all devices

### 🛠️ Tech Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express, TypeScript
- **Database & Auth**: Supabase
- **Package Manager**: pnpm

## 🏗️ Project Structure

```
pulsebloom-auth/
├── frontend/                # Next.js 15 frontend
│   ├── app/                 # App router pages
│   │   ├── auth/            # Authentication pages
│   │   └── dashboard/       # Protected routes
│   ├── components/          # Reusable UI components
│   ├── lib/                 # Shared utilities and API clients
│   └── styles/              # Global styles and themes
├── backend/                 # Express backend
│   ├── src/
│   │   ├── index.ts         # Main server file
│   │   └── voteHandler.ts   # Vote handling logic
│   └── tsconfig.json
└── scripts/                 # Database scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- pnpm (included with Node.js 16.17+ via Corepack)
- Supabase account (free tier available)
- Google Cloud project (for OAuth, optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/pulsebloom-polls.git
   cd pulsebloom-polls
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   pnpm install
   
   # Install frontend dependencies
   cd frontend
   pnpm install
   
   # Install backend dependencies
   cd ../backend
   pnpm install
   ```

3. **Environment Setup**
   Create `.env` files in both `frontend` and `backend` directories:
   
   **Frontend (`.env.local`):**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_API_URL=http://localhost:4000
   ```
   
   **Backend (`.env`):**
   ```env
   PORT=4000
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_anon_key
   NODE_ENV=development
   ```

4. **Start Development Servers**
   ```bash
   # In the root directory
   pnpm dev
   ```
   This will start both the frontend (port 3000) and backend (port 4000) in development mode.

## 🎯 API Endpoints

### Polls
- `GET /api/polls/:id/results` - Get poll results
- `POST /api/polls/:id/vote` - Cast a vote (requires authentication)

### Authentication
- `POST /api/auth/signup` - Create a new account
- `POST /api/auth/signin` - Sign in with email/password
- `POST /api/auth/signout` - Sign out
- `POST /api/auth/reset-password` - Request password reset

## 🧪 Testing

Run the test suite:
```bash
# Run frontend tests
cd frontend
pnpm test

# Run backend tests
cd ../backend
pnpm test
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) to get started.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework for Production
- [Supabase](https://supabase.com/) - Open Source Firebase Alternative
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework

---

<div align="center">
  Made with ❤️ by the PulseBloom Team
</div>
pnpm --filter frontend dev

# Backend (Express API)
pnpm --filter backend dev
```

Visit http://localhost:3000 for the frontend and http://localhost:4000/health for the backend health endpoint.

---

## Supabase Configuration (Frontend)

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

- Frontend:
  - `pnpm --filter frontend dev` — start local dev server
  - `pnpm --filter frontend build` — production build
  - `pnpm --filter frontend start` — start production server (after build)
  - `pnpm --filter frontend lint` — lint the codebase

- Backend:
  - `pnpm --filter backend dev` — start local dev API server (tsx watch)
  - `pnpm --filter backend build` — TypeScript build to `backend/dist`
  - `pnpm --filter backend start` — run compiled server

---

## How It Works (Auth)

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

- __Env not loading (frontend)__
  - Use `frontend/.env.local` (Next.js loads this by default)
  - Restart the dev server after changing env vars

- __Corepack / pnpm errors__
  - Try pinning pnpm: `corepack prepare pnpm@9.12.2 --activate`
  - Ensure Node.js 18+ is installed

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
