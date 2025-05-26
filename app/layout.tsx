import type React from "react"
import "@/app/globals.css"
import { Orbitron } from "next/font/google"
import { RetrowaveHeader } from "@/components/retrowave-header"
import { Viewport } from "next"
  

const orbitron = Orbitron({ subsets: ["latin"] })


export const viewport:Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#000000",
}

export const metadata = {
  title: "Rixe Arena Tournament",
  icons: {
    icon: "/Logo.ico",
    shortcut: "/Logo.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    title: "Rixe Arena Tournament",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rixe Arena Tournament",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en",
      "fr-FR": "/",
    },
  },
  description: "Rixe Arena Tournament",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${orbitron.className}`}>
        <div className="flex min-h-screen flex-col retrowave-grid scanlines">
          <RetrowaveHeader />
          <main className="flex-1 container mx-auto pb-8 min-w-[99vw]">{children}</main>
          <footer className="mt-auto border-t border-primary/30 py-6">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} Rixe Arena Tournament.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
