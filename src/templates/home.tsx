import { getLocale } from "next-intl/server"

import { AppFeatures } from "@/components/modules/app-features"
import { DownloadBanner } from "@/components/modules/download-banner"
import { GradientBackground } from "@/components/modules/gradient-background"
import { HeroSection } from "@/components/modules/hero-section"
import { ScrollFade } from "@/components/modules/scroll-fade"

export async function HomePageTemplate() {
  const locale = await getLocale()

  const features = locale === "ru" ? require("@/content/features/ru").features : require("@/content/features/en").features

  return (
    <>
      <HeroSection />

      <section className="relative z-50 bg-background" id="presentation">
        <ScrollFade />
      </section>

      <section id="features" className="container relative z-30 space-y-12 overflow-clip rounded-b-[56px] bg-background py-10">
        <GradientBackground position="top" />
        <AppFeatures features={features} />
        <DownloadBanner />
      </section>
    </>
  )
}
