"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useTranslations } from "next-intl"

import { Typography } from "@/components/ui/typography"
import { useActiveSection } from "@/hooks"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

import { AboutFeedback } from "./about-feedback"

type AboutNavigationProps = { sections?: { id: string; title: string }[] }

export const AboutNavigation = ({ sections }: AboutNavigationProps) => {
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

      <AboutFeedback className="mt-auto" />
    </nav>
  )
}
