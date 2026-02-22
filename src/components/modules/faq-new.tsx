"use client"
import { useCallback, useEffect, useRef, useState } from "react"

import { useActiveSection } from "@/hooks"
import { cn } from "@/lib/utils"

export const SlidingTabBar = ({ sections }: { sections: { id: string; title: string }[] }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([])
  const [activeTabIndex, setActiveTabIndex] = useState<number | null>(null)
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0)
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0)
  const [isHidden, setIsHidden] = useState(false)

  // ⬇️ берём расширенный API из хука
  const { activeSection, setActiveSectionManually, freezeObserver } = useActiveSection(
    sections.map((s) => s.id),
    { freezeMs: 600 },
  )

  useEffect(() => {
    if (activeSection) {
      const idx = sections.findIndex((s) => s.id === activeSection)
      setActiveTabIndex(idx)
    }
  }, [activeSection, sections])

  const centerActiveTab = useCallback(() => {
    if (activeTabIndex == null) return
    const container = scrollRef.current
    const el = tabsRef.current[activeTabIndex]
    if (!container || !el) return

    const elLeft = el.offsetLeft
    const elWidth = el.offsetWidth
    const target = elLeft + elWidth / 2 - container.clientWidth / 2
    const maxScroll = container.scrollWidth - container.clientWidth
    const nextLeft = Math.max(0, Math.min(target, maxScroll))
    container.scrollTo({ left: nextLeft, behavior: "smooth" })
  }, [activeTabIndex])

  useEffect(() => {
    if (activeTabIndex === null) return
    const currentTab = tabsRef.current[activeTabIndex]
    if (!currentTab) return

    setTabUnderlineLeft(currentTab.offsetLeft ?? 0)
    setTabUnderlineWidth(currentTab.clientWidth ?? 0)
    centerActiveTab()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabIndex, centerActiveTab])

  useEffect(() => {
    const onResize = () => {
      if (activeTabIndex == null) return
      const el = tabsRef.current[activeTabIndex]
      if (!el) return
      setTabUnderlineLeft(el.offsetLeft ?? 0)
      setTabUnderlineWidth(el.clientWidth ?? 0)
      centerActiveTab()
    }
    window.addEventListener("resize", onResize)
    window.addEventListener("orientationchange", onResize)
    return () => {
      window.removeEventListener("resize", onResize)
      window.removeEventListener("orientationchange", onResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTabIndex, centerActiveTab])

  // Отслеживание конца FAQ для скрытия панели
  useEffect(() => {
    const endElement = document.getElementById("end-of-faq")
    if (!endElement) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Когда элемент end-of-faq становится видимым, скрываем панель
          setIsHidden(entry.isIntersecting)
        })
      },
      {
        rootMargin: "0px 0px 30% 0px", // Скрываем когда элемент еще ДО попадания в поле зрения (раньше)
        threshold: 0,
      },
    )

    observer.observe(endElement)
    return () => observer.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    // 1) замораживаем обзёрвер на время программного скролла
    freezeObserver(700)
    // 2) вручную выставляем активную секцию (и URL)
    setActiveSectionManually(id)
    // 3) скроллим с отступом сверху, чтобы заголовок не прилипал к краю экрана
    const el = document.getElementById(id)
    if (!el) return
    const TOP_OFFSET = 24
    const top = el.getBoundingClientRect().top + window.scrollY - TOP_OFFSET
    window.scrollTo({ top, behavior: "smooth" })
  }

  return (
    <>
      {/* Градиент снизу */}
      <div
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-0 z-40 h-28 bg-gradient-to-t from-background to-transparent transition-opacity duration-500 lg:hidden",
          isHidden ? "opacity-0" : "opacity-100",
        )}
      />

      {/* Pill-панель */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-5 z-50 flex justify-center transition-transform duration-500 ease-in-out lg:hidden",
          isHidden ? "translate-y-[calc(100%+20px)]" : "translate-y-0",
        )}
      >
        <div
          ref={scrollRef}
          className="scrollbar-hidden max-w-[90vw] overflow-x-auto rounded-full border border-white/10 bg-white/10 px-1 shadow-lg backdrop-blur-xl backdrop-saturate-150"
        >
          <div className="relative flex h-11 min-w-max items-center gap-x-1">
            <span
              className="pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-white/15 transition-all duration-300"
              style={{ left: tabUnderlineLeft, width: tabUnderlineWidth, height: "calc(100% - 8px)" }}
            />

            {sections.map((tab, index) => (
              <button
                type="button"
                key={tab.id}
                ref={(el) => {
                  tabsRef.current[index] = el
                }}
                className={cn(
                  "relative shrink-0 text-nowrap rounded-full px-4 py-1.5 font-semibold text-sm transition-colors duration-200",
                  index === activeTabIndex ? "text-foreground" : "text-muted-foreground",
                )}
                onClick={() => {
                  setActiveTabIndex(index)
                  scrollTo(tab.id)
                }}
              >
                {tab.title}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
