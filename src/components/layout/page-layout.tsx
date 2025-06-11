import { GradientBackground } from "../modules/gradient-background"
import { ScrollProvider } from "../providers"
import { Footer, Header } from "./parts"

export function PageLayout({
  children,
  withGradient = true,
}: {
  children: React.ReactNode
  withGradient?: boolean
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {withGradient && (
        <div
          className="-z-10 pointer-events-none absolute inset-0 overflow-hidden"
          aria-hidden
        >
          <GradientBackground />
        </div>
      )}

      <Header />
      <main className="flex-1">
        <ScrollProvider>{children}</ScrollProvider>
      </main>
      <Footer />
    </div>
  )
}
