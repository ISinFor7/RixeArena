import type React from "react"
import "@/app/globals.css"
import { Orbitron } from "next/font/google"
import { RetrowaveHeader } from "@/components/retrowave-header"
import { Viewport } from "next"
import BPaypal from "@/components/logo/paypal-big"
import { url } from "inspector"

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
    siteName: 'Rixe Arena Tournament',
    //url: 'https://rixe-arena-tournament.fr',
    url: 'https://rixe-arena.vercel.app/',
    images: 'https://rixe-arena.vercel.app/Logo.png',
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
              <a href="https://www.paypal.com/donate?token=JT3Kvah8e9K1zqAOfHyGjsl-fJlzpO-_yr3GVocmuZg5_8dA_OTrtHW8GuumH8ogaOXhu8mRaNTfcP3k">
                Faites un don
                <BPaypal className="inline-block ml-2 w-20 h-auto" />
              </a>
              <br />
              <br />
              <div className="flex flex-col sm:flex-row justify-center gap-2">
                © {new Date().getFullYear()} Rixe Arena Tournament.
                <a href="/mentions-legales" className="ml-5">Mentions legales</a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
