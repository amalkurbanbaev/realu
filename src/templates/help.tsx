import { getLocale } from "next-intl/server"

import { FAQ, FAQNavigation } from "@/components/modules/faq"
import { SlidingTabBar } from "@/components/modules/faq-new"
import { getLocalizedContent } from "@/lib/utils"
import type { FAQSection } from "@/types/entities"

export async function HelpPageTemplate() {
  const locale = await getLocale()

  const allQuestions = await getLocalizedContent<FAQSection | undefined>("faq", locale)

  const sections = allQuestions?.map((el) => ({ id: el.id, title: el.title })) || []

  return (
    <section className="container relative z-10 py-10 text-white">
      <div className="lg:grid lg:grid-cols-[320px_1fr] lg:gap-16">
        <SlidingTabBar sections={sections} />
        <FAQNavigation sections={sections?.map((el) => ({ id: el.id, title: el.title }))} />
        <FAQ questions={allQuestions} />
        <div id="end-of-faq" />
      </div>
    </section>
  )
}
