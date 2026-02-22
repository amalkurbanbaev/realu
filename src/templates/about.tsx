import { getLocale } from "next-intl/server"

import { AboutFeedback, AboutNavigation } from "@/components/modules/about"
import { AboutContent } from "@/components/modules/about-components"
import { SlidingTabBar } from "@/components/modules/faq-new"
import { getLocalizedContent } from "@/lib/utils"
import type { AboutSection } from "@/types/entities"

export async function AboutPageTemplate() {
  const locale = await getLocale()

  const allSections = await getLocalizedContent<AboutSection | undefined>("about", locale)

  const sections = allSections?.map((el) => ({ id: el.id, title: el.title })) || []

  return (
    <section className="container relative z-10 py-6 text-white">
      <div className="lg:grid lg:grid-cols-[320px_1fr] lg:gap-16">
        <SlidingTabBar sections={sections} />
        <AboutNavigation sections={sections?.map((el) => ({ id: el.id, title: el.title }))} />

        <AboutContent sections={allSections} />

        <AboutFeedback className="mx-auto mt-4 block max-w-xs text-center font-light text-sm lg:hidden" />
      </div>
    </section>
  )
}
