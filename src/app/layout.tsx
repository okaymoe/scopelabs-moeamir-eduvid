import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/src/components/theme-provider"
import { Header } from "@/src/components/header"
import { Footer } from "@/src/components/footer"
import { Toaster } from "sonner"
import { RootShell } from "@/src/components/RootShell"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "EduVid - Educational Video Platform",
  description: "A platform for creating and watching educational videos",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <RootShell>
            <div className="flex flex-col min-h-screen">
              <Header />
              <div className="flex-1">{children}</div>
              <Footer />
            </div>
          </RootShell>
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
