import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth/auth-provider"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "PulseBloom Polls - Where Every Voice Matters",
  description:
    "Create and participate in polls with PulseBloom - the intuitive polling platform that makes every voice count. Join conversations, gather insights, and make decisions together.",
  keywords: ["polls", "voting", "surveys", "opinions", "democracy", "feedback", "community"],
  authors: [{ name: "PulseBloom Team" }],
  creator: "PulseBloom",
  publisher: "PulseBloom",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://pulsebloom.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PulseBloom Polls - Where Every Voice Matters",
    description:
      "Create and participate in polls with PulseBloom - the intuitive polling platform that makes every voice count.",
    url: "https://pulsebloom.app",
    siteName: "PulseBloom",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "PulseBloom - Where Every Voice Matters",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PulseBloom Polls - Where Every Voice Matters",
    description:
      "Create and participate in polls with PulseBloom - the intuitive polling platform that makes every voice count.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FF6B6B" />
        <meta name="color-scheme" content="light dark" />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
