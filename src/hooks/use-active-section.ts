"use client"

import { useEffect, useState } from "react"

export const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState<string>("")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Находим видимые секции
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target.id)

        if (visibleSections.length > 0) {
          // Если есть видимые секции, выбираем первую в списке
          const firstVisibleSection = sectionIds.find((id) =>
            visibleSections.includes(id),
          )
          if (firstVisibleSection) {
            setActiveSection(firstVisibleSection)

            // Обновляем URL с якорем (без перезагрузки страницы)
            if (window.location.hash !== `#${firstVisibleSection}`) {
              window.history.replaceState(
                null,
                "",
                `${window.location.pathname}${window.location.search}#${firstVisibleSection}`,
              )
            }
          }
        }
      },
      {
        rootMargin: "-20% 0px -80% 0px", // Секция считается активной когда находится в верхней 20% области viewport
        threshold: 0,
      },
    )

    // Наблюдаем за всеми секциями
    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })

    // Устанавливаем активную секцию на основе текущего якоря в URL
    if (window.location.hash) {
      const hashSection = window.location.hash.substring(1)
      if (sectionIds.includes(hashSection)) {
        setActiveSection(hashSection)
      }
    }

    return () => {
      observer.disconnect()
    }
  }, [sectionIds])

  return activeSection
}
