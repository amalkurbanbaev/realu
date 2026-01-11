import { getLocale } from "next-intl/server"

import { AppFeatures } from "@/components/modules/app-features"
import { DownloadBanner } from "@/components/modules/download-banner"
import { GradientBackgroundTop } from "@/components/modules/gradient-background"
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

      <section
        id="features"
        className="justify-center-short-screen relative z-30 flex flex-col items-center space-y-7 overflow-clip bg-background pt-10 md:min-h-[calc(100vh-var(--header-height))] lg:rounded-b-[56px] lg:py-10"
      >
        <GradientBackgroundTop className="hidden lg:block" />
        <AppFeatures features={features} locale={locale} />
        <DownloadBanner />
      </section>
    </>
  )
}
