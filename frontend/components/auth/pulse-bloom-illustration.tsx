"use client"

export function PulseBloomIllustration() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-[#0D1B2A] via-[#1B2A3A] to-[#0D1B2A]">
      {/* Animated background waves */}
      <div className="absolute inset-0">
        <svg className="h-full w-full" viewBox="0 0 400 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Coral flowing lines */}
          <path
            d="M0 300 Q100 200 200 300 T400 300"
            stroke="url(#coral-gradient)"
            strokeWidth="3"
            fill="none"
            className="animate-pulse"
          />
          <path
            d="M0 350 Q150 250 300 350 T400 350"
            stroke="url(#coral-gradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "1s" }}
          />

          {/* Emerald flowing lines */}
          <path
            d="M0 400 Q200 300 400 400"
            stroke="url(#emerald-gradient)"
            strokeWidth="2"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "2s" }}
          />
          <path
            d="M0 250 Q250 150 400 250"
            stroke="url(#emerald-gradient)"
            strokeWidth="1.5"
            fill="none"
            className="animate-pulse"
            style={{ animationDelay: "0.5s" }}
          />

          {/* Pulse bloom orbs */}
          <circle cx="100" cy="200" r="8" fill="url(#coral-radial)" className="pulse-bloom" />
          <circle
            cx="300"
            cy="400"
            r="6"
            fill="url(#emerald-radial)"
            className="pulse-bloom"
            style={{ animationDelay: "1.5s" }}
          />
          <circle
            cx="200"
            cy="500"
            r="4"
            fill="url(#sand-radial)"
            className="pulse-bloom"
            style={{ animationDelay: "3s" }}
          />

          <defs>
            <linearGradient id="coral-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FF6B6B" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="emerald-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06D6A0" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#06D6A0" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#06D6A0" stopOpacity="0.1" />
            </linearGradient>
            <radialGradient id="coral-radial">
              <stop offset="0%" stopColor="#FF6B6B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0.2" />
            </radialGradient>
            <radialGradient id="emerald-radial">
              <stop offset="0%" stopColor="#06D6A0" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#06D6A0" stopOpacity="0.2" />
            </radialGradient>
            <radialGradient id="sand-radial">
              <stop offset="0%" stopColor="#F8E9A1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F8E9A1" stopOpacity="0.2" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* PulseBloom logo/text overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="mb-4 pulse-bloom">
            <div className="h-16 w-16 rounded-full bg-gradient-to-r from-primary to-secondary mx-auto"></div>
          </div>
          <h1 className="font-heading text-4xl font-bold text-white mb-2">PulseBloom</h1>
          <p className="text-white/70 text-lg">Where every voice matters</p>
        </div>
      </div>
    </div>
  )
}
