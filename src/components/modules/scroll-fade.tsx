"use client"

import { Particle } from "@/components/modules/particle"
import { useSlides } from "@/hooks/use-slides"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export function ScrollFade() {
  const slides = useSlides()

  const wrapperRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null) // ← наблюдаем за ним
  const [activeIndex, setActiveIndex] = useState(0)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const checkIfFullyInView = () => {
      if (!wrapperRef.current) return

      const rect = wrapperRef.current.getBoundingClientRect()
      const screenHeight = window.innerHeight

      const fullyVisible = rect.top <= 0 && rect.bottom >= screenHeight

      if (fullyVisible) {
        setEnabled(true)
      }
    }

    window.addEventListener("scroll", checkIfFullyInView)
    window.addEventListener("resize", checkIfFullyInView)

    // Проверяем при загрузке
    checkIfFullyInView()

    return () => {
      window.removeEventListener("scroll", checkIfFullyInView)
      window.removeEventListener("resize", checkIfFullyInView)
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      if (!wrapperRef.current) return

      const wrapperTop = wrapperRef.current.offsetTop
      const scrollY = window.scrollY
      const screenHeight = window.innerHeight

      // 🧮 Насколько вниз мы ушли от начала секции
      const relativeScroll = scrollY - wrapperTop

      // ⏳ Пока секция не полностью заняла экран — ничего не делаем
      if (relativeScroll < 0) {
        setActiveIndex(0)
        return
      }

      const startOffset = screenHeight * 0.4

      const index = Math.floor((relativeScroll - startOffset) / screenHeight)

      const clampedIndex = Math.max(0, Math.min(index, slides.length - 1))
      setActiveIndex(clampedIndex)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [slides.length])

  return (
    <section ref={wrapperRef} className="relative z-20 h-[700vh]">
      {/* ← наблюдаемый триггер, появляется в начале секции */}
      <div ref={sentinelRef} className="-z-50 absolute top-0 h-screen w-full" />

      <div className="sticky top-0 h-screen w-full">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            className={cn(
              "absolute inset-0 ml-auto flex w-full flex-col items-center justify-center gap-8 overflow-visible px-8 transition-opacity duration-700 will-change-[opacity]",
              i === activeIndex ? "opacity-100" : "opacity-0",
              "pointer-events-none", // можно оставить, чтобы не мешали скрытые слои
            )}
          >
            <div className="flex items-center justify-center">
              <Image
                src={slide.image}
                alt={slide.title}
                width={279}
                height={606}
                className="rounded-xl shadow-xl"
              />
            </div>

            <div className="-z-10 absolute inset-0">
              <Image
                src={`/gradients/${slide.id}.png`}
                alt="slide-background"
                fill
                className="object-cover"
              />
            </div>

            <div className="relative flex max-w-sm items-center p-4">
              <div className="z-10 font-medium text-white/80 text-xl">
                {slide.description}
              </div>

              {slide.particles.map((p, pi) => (
                <Particle
                  key={`${p.src}-${i}-${pi}`}
                  width={p.width}
                  height={p.height}
                  src={p.src}
                  alt={p.src}
                  className={cn(
                    p.position,
                    i === activeIndex && enabled && "animate-in duration-1000",
                    pi % 2 !== 0
                      ? "slide-in-from-bottom-25"
                      : "slide-in-from-top-25",
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
