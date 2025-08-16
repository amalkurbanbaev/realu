import { getLocale } from "next-intl/server"

import { FAQ, FAQNavigation } from "@/components/modules/faq"
import { getLocalizedContent } from "@/lib/utils"
import type { FAQSection } from "@/types/entities"

export async function HelpPageTemplate() {
  const locale = await getLocale()
  const _activeTab = "about"

  const allQuestions = await getLocalizedContent<FAQSection | undefined>(
    "faq",
    locale,
  )

  const sections = allQuestions?.map((el) => ({ id: el.id, title: el.title }))
  const questions = allQuestions

  return (
    <section className="container relative z-10 py-10 text-white">
      <div className="lg:grid lg:grid-cols-[320px_1fr] lg:gap-16">
        <FAQNavigation
          sections={sections?.map((el) => ({ id: el.id, title: el.title }))}
        />
        <FAQ questions={questions} />
      </div>
    </section>
  )
}
