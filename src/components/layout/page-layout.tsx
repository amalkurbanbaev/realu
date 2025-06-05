import { ScrollProvider } from "../providers"
import { Footer, Header } from "./parts"

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <ScrollProvider>{children}</ScrollProvider>
      </main>
      <Footer />
    </div>
  )
}
