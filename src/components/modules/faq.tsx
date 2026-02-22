"use client"

import { type ComponentPropsWithoutRef, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { Accordion } from "@radix-ui/react-accordion"
import { useTranslations } from "next-intl"

import { EMAIL_SUPPORT_LINK } from "@/constants/links"
import { useActiveSection } from "@/hooks"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"
import type { FAQSection } from "@/types/entities"

import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"
import { Typography } from "../ui/typography"

type FAQNavigationProps = { sections?: { id: string; title: string }[] }

export const FAQNavigation = ({ sections }: FAQNavigationProps) => {
  const t = useTranslations("help-page.layout")

  const sectionIds = useMemo(() => sections?.map((s) => s.id) || [], [sections])
  const { activeSection } = useActiveSection(sectionIds)

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const containerRef = useRef<HTMLDivElement>(null)
  const linkRefs = useRef<Map<string, HTMLAnchorElement>>(new Map())
  const [indicatorStyle, setIndicatorStyle] = useState<{ top: number; height: number } | null>(null)

  useEffect(() => {
    if (!activeSection || !containerRef.current) {
      setIndicatorStyle(null)
      return
    }

    const activeLink = linkRefs.current.get(activeSection)
    if (!activeLink) {
      setIndicatorStyle(null)
      return
    }

    const containerRect = containerRef.current.getBoundingClientRect()
    const linkRect = activeLink.getBoundingClientRect()

    setIndicatorStyle({
      top: linkRect.top - containerRect.top,
      height: linkRect.height,
    })
  }, [activeSection])

  const setLinkRef = useCallback((id: string, element: HTMLAnchorElement | null) => {
    if (element) {
      linkRefs.current.set(id, element)
    } else {
      linkRefs.current.delete(id)
    }
  }, [])

  return (
    <nav className="sticky top-[calc(var(--header-height)+1.5rem)] hidden h-[calc(100vh-var(--header-height)-4.5rem)] flex-col pb-[2.5rem] lg:flex">
      <Typography variant="headline-1" className="mb-6">
        {t("title")}
      </Typography>

      <div className="relative flex pr-4 lg:flex-col" ref={containerRef}>
        <div className="absolute top-0 left-0 h-full w-0.5">
          <div className="absolute h-full w-0.5 rounded-sm bg-white/10" />
          {indicatorStyle && (
            <div
              className="absolute left-0 z-10 w-0.5 rounded-sm bg-white transition-all duration-500 ease-out"
              style={{
                top: `${indicatorStyle.top}px`,
                height: `${indicatorStyle.height}px`,
              }}
            />
          )}
        </div>

        {sections?.map((s) => (
          <Link
            key={s.id}
            ref={(el) => setLinkRef(s.id, el)}
            href={`#${s.id}`}
            scroll={false}
            onClick={() => scrollTo(s.id)}
            className={cn("pl-4 font-semibold text-base text-muted-foreground leading-8 transition-colors", activeSection === s.id && "text-white")}
          >
            {s.title}
          </Link>
        ))}
      </div>

      <FAQFeedback className="mt-auto" />
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
          <Typography variant="headline-2">{q.title}</Typography>
          {q.questions.map((q) => (
            <AccordionItem key={q.text} value={q.text}>
              <AccordionTrigger>
                <Typography variant="headline-3">{q.text}</Typography>
              </AccordionTrigger>

              <AccordionContent className="flex flex-col gap-4">
                <Typography variant="body-1" className="font-light md:font-medium">
                  {q.answer}
                </Typography>
              </AccordionContent>
            </AccordionItem>
          ))}
        </div>
      ))}
    </Accordion>
  )
}

export const FAQFeedback = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => {
  const t = useTranslations("help-page.layout")

  return (
    <Typography variant="body-1" className={cn("max-w-5/6 whitespace-pre-line text-muted-foreground", className)} {...props}>
      {t.rich("contact", {
        EMAIL_SUPPORT_LINK,
        a: (chunks) => (
          <Link href={`mailto:${EMAIL_SUPPORT_LINK}`} className="text-white hover:underline">
            {chunks}
          </Link>
        ),
      })}
    </Typography>
  )
}
