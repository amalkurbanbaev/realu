import { AppleButton } from "@/components/modules/apple-button"
import { FeatureCarousel } from "@/components/modules/feature-carousel"
import { GradientBackground } from "@/components/modules/gradient-background"
import { HeroSection } from "@/components/modules/hero-section"
import { ScrollFade } from "@/components/modules/scroll-fade"
import { TestimonialCarousel } from "@/components/modules/tesimonials-carousel"
import { getLocale, getTranslations } from "next-intl/server"

export async function HomePageTemplate() {
  const t = await getTranslations("home-page.layout")
  const locale = await getLocale()

  const features =
    locale === "ru"
      ? require("@/content/features/ru").features
      : require("@/content/features/en").features

  const testimonials =
    locale === "ru"
      ? require("@/content/testimonials/ru").testimonials
      : require("@/content/testimonials/en").testimonials

  return (
    <>
      <HeroSection />

      <section className="relative z-50 bg-background" id="presentation">
        <ScrollFade />
      </section>

      <section
        id="reviews"
        className="container relative z-30 space-y-12 bg-background py-10"
      >
        <GradientBackground position="top" />

        <h3 className="mb-6 font-bold text-2xl">Вы найдете</h3>
        <FeatureCarousel features={features} />

        <h3 className="mb-6 font-bold text-2xl">Люди говорят</h3>
        <TestimonialCarousel testimonials={testimonials} />
      </section>

      <section className="container relative z-30 space-y-12 overflow-clip rounded-b-[56px] bg-background py-10">
        <div className="flex flex-col items-end gap-12 py-6 lg:flex-row">
          <h1 className="max-w-sm font-bold text-2xl">{t("title2")}</h1>
          <h5 className="max-w-lg font-medium text-muted-foreground">
            {t("description2")}
          </h5>

          <AppleButton className="ml-auto grow-0" />
        </div>
      </section>
    </>
  )
}
