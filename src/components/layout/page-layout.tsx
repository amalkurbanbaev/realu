import { GradientBackground } from "../modules/gradient-background"
import { ScrollProvider } from "../providers"
import { Footer, Header } from "./parts"

type PageLayoutProps = {
  children: React.ReactNode
  withGradient?: boolean
}

export function PageLayout({ children, withGradient = true }: PageLayoutProps) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />

      {withGradient ? <GradientBackground position="top" /> : null}

      <main className="flex-1 rounded-b-[56px] bg-background">
        <ScrollProvider>{children}</ScrollProvider>
      </main>

      <GradientBackground position="bottom" />

      <Footer />
    </div>
  )
}
