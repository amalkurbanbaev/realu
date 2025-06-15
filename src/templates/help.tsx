import { Link } from "@/i18n/navigation"
import { cn, getLocalizedContent } from "@/lib/utils"
import type { FAQSection } from "@/types/entities"
import { ChevronDownIcon } from "lucide-react"
import { getLocale } from "next-intl/server"

type HelpPageTemplate = {
  activeTab?: string
}

const DEFAULT_TAB = "about"

export async function HelpPageTemplate({
  activeTab = DEFAULT_TAB,
}: HelpPageTemplate) {
  // const t = await getTranslations("help-page")
  const locale = await getLocale()

  const allQuestions = await getLocalizedContent<FAQSection | undefined>(
    "faq",
    locale,
  )

  const sections = allQuestions?.map((el) => ({ id: el.id, title: el.unit }))
  const questions = allQuestions?.find((el) => el.id === activeTab)?.questions

  // const sections = t.raw("units") as Record<
  //   string,
  //   { title: string; questions: { title: string; text: string }[] }
  // >

  // const tabKeys = Object.keys(sections)

  // const section = sections[activeTab]

  return (
    <section className="container relative z-10 py-20 text-white">
      <div className="grid grid-cols-[320px_1fr] gap-12">
        <nav className="flex w-full flex-col gap-4">
          {sections?.map((s) => (
            <Link
              key={s.id}
              href={`?tab=${s.id}`}
              className={cn(
                "text-2xl transition-colors",
                s.id === activeTab
                  ? "font-bold text-white"
                  : "text-muted-foreground",
              )}
            >
              {s.title}
            </Link>
          ))}
        </nav>

        <div className="ml-auto w-full max-w-4xl space-y-4">
          {questions?.map((q) => (
            <details key={q.text} className="group rounded-2xl bg-white/5">
              <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-semibold text-white">
                <span>{q.text}</span>
                <ChevronDownIcon className="transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="px-6 pb-6">
                <p className="text-white/80 leading-relaxed">{q.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
