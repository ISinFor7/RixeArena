import type React from "react"
import "@/app/globals.css"
import { Orbitron } from "next/font/google"
import { RetrowaveHeader } from "@/components/retrowave-header"

const orbitron = Orbitron({ subsets: ["latin"] })

export const metadata = {
  title: "Retrowave Articles",
  description: "A retrowave-themed article site",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${orbitron.className} scanlines`}>
        <div className="flex min-h-screen flex-col">
          <RetrowaveHeader />
          <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
          <footer className="mt-auto border-t border-primary/30 py-6">
            <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
              © {new Date().getFullYear()} RETROWAVE ARTICLES. ALL RIGHTS RESERVED.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
