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
    // 3) инициируем плавный скролл к секции
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <>
      {/* Градиентная подложка - всегда видна */}
      <div
        className={cn(
          "pointer-events-none fixed inset-x-0 bottom-0 z-40 h-28 bg-gradient-to-t from-background via-background to-transparent transition-opacity duration-500 lg:hidden",
          isHidden ? "opacity-0" : "opacity-100",
        )}
      />

      {/* Основная панель с табами */}
      <div
        ref={scrollRef}
        className={cn(
          "scrollbar-hidden fixed inset-x-0 bottom-0 z-50 h-14 w-full overflow-x-auto border-b transition-transform duration-500 ease-in-out lg:hidden",
          isHidden ? "translate-y-full" : "translate-y-0",
        )}
      >
        <div className="relative mx-4 flex h-full min-w-max items-center gap-x-4">
          <div className="pointer-events-none absolute right-0 bottom-2 left-0 h-0.5 rounded-3xl bg-white/10" />

          <span
            className="pointer-events-none absolute bottom-2 rounded-3xl transition-all duration-300"
            style={{ left: tabUnderlineLeft, width: tabUnderlineWidth, height: 2 }}
          >
            <span className="block h-full w-full rounded-3xl bg-white" />
          </span>

          {sections.map((tab, index) => (
            <button
              type="button"
              key={tab.id}
              ref={(el) => {
                tabsRef.current[index] = el
              }}
              className={cn(
                "shrink-0 text-nowrap px-3 py-1.5 font-semibold text-base leading-8 transition-colors",
                index === activeTabIndex ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
              onClick={() => {
                setActiveTabIndex(index) // локально сразу подсветим
                scrollTo(tab.id) // и запустим управляемый скролл
              }}
            >
              {tab.title}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
