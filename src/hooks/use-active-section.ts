"use client"

import { useEffect, useRef, useState } from "react"

type Options = {
  /** Сколько миллисекунд игнорировать события IntersectionObserver после программного скролла */
  freezeMs?: number
}

export const useActiveSection = (sectionIds: string[], options: Options = {}) => {
  const { freezeMs = 600 } = options
  const [activeSection, setActiveSection] = useState<string>("")
  const freezeUntilRef = useRef<number>(0)

  // даёт возможность внешне «заморозить» наблюдение на время программного скролла
  const freezeObserver = (ms = freezeMs) => {
    freezeUntilRef.current = Date.now() + ms
  }

  // ручная установка активной секции (с обновлением URL)
  const setActiveSectionManually = (id: string) => {
    setActiveSection(id)
    if (window.location.hash !== `#${id}`) {
      window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${id}`)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // пока «заморожено», игнорим
        if (Date.now() < freezeUntilRef.current) return

        const visibleSections = entries.filter((entry) => entry.isIntersecting).map((entry) => entry.target.id)

        if (visibleSections.length > 0) {
          // берём первую по порядку из sectionIds
          const firstVisible = sectionIds.find((id) => visibleSections.includes(id))
          if (firstVisible && firstVisible !== activeSection) {
            setActiveSection(firstVisible)
            if (window.location.hash !== `#${firstVisible}`) {
              window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#${firstVisible}`)
            }
          }
        }
      },
      {
        // чуть «консервативнее», чтобы меньше дёргалось на промежуточных секциях
        rootMargin: "-25% 0px -65% 0px",
        threshold: 0,
      },
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    // начальное состояние из hash
    if (window.location.hash) {
      const h = window.location.hash.slice(1)
      if (sectionIds.includes(h)) setActiveSection(h)
    }

    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionIds.join("|")])

  return { activeSection, setActiveSectionManually, freezeObserver }
}
