"use client"

import { useMediaQuery } from "usehooks-ts"

import { GradientBackgroundBottom, GradientBackgroundTop } from "../modules/gradient-background"
import { ScrollProvider } from "../providers"
import { ClientOnly } from "../ui/client-only"
import { Footer, Header } from "./parts"

type PageLayoutProps = {
  children: React.ReactNode
  withGradient?: boolean
}

export function PageLayout({ children, withGradient = true }: PageLayoutProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)")

  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />

      {withGradient ? <GradientBackgroundTop /> : null}

      <main className="flex flex-1 flex-col rounded-b-[56px] bg-background">
        <ScrollProvider>{children}</ScrollProvider>
      </main>

      <ClientOnly>{isDesktop ? <GradientBackgroundBottom /> : null}</ClientOnly>

      <Footer />
    </div>
  )
}
