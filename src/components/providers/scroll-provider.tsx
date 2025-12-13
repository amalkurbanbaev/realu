"use client"

import { type ReactNode, useEffect, useRef } from "react"
import gsap from "gsap"
import ReactLenis, { type LenisRef } from "lenis/react"

export function ScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<LenisRef>(null)

  useEffect(() => {
    const lenis = lenisRef.current?.lenis
    if (!lenis) return

    const update = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(update)

    const onVisible = () => {
      requestAnimationFrame((time) => lenis.raf(time * 1000))
    }

    document.addEventListener("visibilitychange", onVisible)

    // Слушаем события блокировки/разблокировки скролла для модальных окон
    const handleModalOpen = () => {
      lenis.stop()
    }

    const handleModalClose = () => {
      lenis.start()
    }

    // Кастомные события для управления Lenis из модальных окон
    document.addEventListener("lenis:stop", handleModalOpen)
    document.addEventListener("lenis:start", handleModalClose)

    return () => {
      gsap.ticker.remove(update)
      document.removeEventListener("visibilitychange", onVisible)
      document.removeEventListener("lenis:stop", handleModalOpen)
      document.removeEventListener("lenis:start", handleModalClose)
    }
  }, [])

  return (
    <ReactLenis
      ref={lenisRef}
      root
      className="h-full"
      options={{
        // Исключаем элементы с data-lenis-prevent из обработки
        prevent: (node) => {
          return node.hasAttribute("data-lenis-prevent")
        },
      }}
    >
      {children}
    </ReactLenis>
  )
}
