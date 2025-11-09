import { useEffect } from "react"

/**
 * Хук для управления Lenis скроллом
 * Останавливает Lenis при монтировании компонента и запускает при размонтировании
 */
export function useLenisControl(shouldStop = true) {
  useEffect(() => {
    if (!shouldStop) return

    // Останавливаем Lenis
    document.dispatchEvent(new CustomEvent("lenis:stop"))

    return () => {
      // Запускаем Lenis при размонтировании
      document.dispatchEvent(new CustomEvent("lenis:start"))
    }
  }, [shouldStop])
}

/**
 * Утилиты для ручного управления Lenis
 */
export const lenisControl = {
  stop: () => document.dispatchEvent(new CustomEvent("lenis:stop")),
  start: () => document.dispatchEvent(new CustomEvent("lenis:start")),
}
