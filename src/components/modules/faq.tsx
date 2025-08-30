"use client"

import { useRef } from "react"
import { Accordion } from "@radix-ui/react-accordion"
import { useTranslations } from "next-intl"

import { useActiveSection } from "@/hooks"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import type { FAQSection } from "@/types/entities"

import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

type FAQNavigationProps = { sections?: { id: string; title: string }[] }

export const FAQNavigation = ({ sections }: FAQNavigationProps) => {
  const t = useTranslations("help-page.layout")

  const sectionIds = sections?.map((s) => s.id) || []
  const { activeSection } = useActiveSection(sectionIds)

  const scrollTo = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const barRef = useRef<HTMLDivElement>(null)

  const getIndicatorPosition = (id: string) => {
    const totalMenuItems = sections?.length || 0
    const activeIndex = sections?.findIndex((s) => s.id === id) || 0

    const barHeight = barRef.current?.clientHeight || 0

    return (activeIndex * barHeight) / totalMenuItems + 2
  }

  return (
    <nav className="sticky top-[calc(var(--header-height)+2.5rem)] hidden h-[calc(100vh-var(--header-height)-4.5rem)] flex-col pb-[2.5rem] lg:flex">
      <h3 className="mb-6 font-bold text-2xl">{t("title")}</h3>

      <div className="relative flex px-4 lg:flex-col" ref={barRef}>
        <div className="absolute top-0 left-0 h-full w-0.5">
          <div className="absolute h-full w-0.5 rounded-sm bg-white/10" />

          {activeSection && (
            <div
              className="absolute top-0 left-0 z-10 h-6 w-0.5 rounded-sm bg-white transition-all duration-500 ease-out"
              style={{
                transform: `translateY(${getIndicatorPosition(activeSection)}px)`,
              }}
            />
          )}
        </div>

        {/* Навигационные ссылки */}
        {sections?.map((s) => (
          <Link
            key={s.id}
            href={`#${s.id}`}
            scroll={false}
            onClick={() => scrollTo(s.id)}
            className={cn("font-semibold text-base text-muted-foreground leading-8 transition-colors", activeSection === s.id && "text-white")}
          >
            {s.title}
          </Link>
        ))}
      </div>

      <div className="mt-auto text-muted-foreground">
        {t.rich("contact", {
          a: (chunks) => (
            <Link href="mailto:support@meditolife.com" className="text-white">
              {chunks}
            </Link>
          ),
        })}
      </div>
    </nav>
  )
}

type FAQProps = {
  questions?: FAQSection
}

export const FAQ = ({ questions }: FAQProps) => {
  return (
    <Accordion type="multiple" className="ml-auto w-full max-w-7xl space-y-4">
      {questions?.map((q) => (
        <div key={q.id} className="space-y-4 pt-10 first:pt-0" id={q.id}>
          <h4 className="font-semibold text-xl">{q.title}</h4>
          {q.questions.map((q) => (
            <AccordionItem key={q.text} value={q.text}>
              <AccordionTrigger className="">{q.text}</AccordionTrigger>
              <AccordionContent className="flex flex-col gap-4 text-balance text-white">
                <p>{q.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </div>
      ))}
    </Accordion>
  )
}
