"use client"

import { useMediaQuery } from "usehooks-ts"

import { GradientBackground, GradientBackgroundBottom } from "../modules/gradient-background"
import { ScrollProvider } from "../providers"
import { Footer, Header } from "./parts"

type PageLayoutProps = {
  children: React.ReactNode
  withGradient?: boolean
}

export function PageLayout({ children, withGradient = true }: PageLayoutProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)")

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />

      {withGradient ? <GradientBackground /> : null}

      <main className="flex-1 rounded-b-[56px] bg-background">
        <ScrollProvider>{children}</ScrollProvider>
      </main>

      {isDesktop ? <GradientBackgroundBottom /> : null}

      <Footer />
    </div>
  )
}
