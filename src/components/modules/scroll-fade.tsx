"use client"
import { useSlides } from "@/hooks/use-slides"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { ArrowDownIcon } from "../icons"
import { Button } from "../ui/button"
import { Particle } from "./particle"

export function ScrollFade() {
  const slides = useSlides()

  const wrapperRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null) // ← наблюдаем за ним
  const [activeIndex, setActiveIndex] = useState(0)
  const [enabled, setEnabled] = useState(false)
  const [isScrolling] = useState(false)

  useEffect(() => {
    const checkIfFullyInView = () => {
      if (!wrapperRef.current) return

      const rect = wrapperRef.current.getBoundingClientRect()
      const screenHeight = window.innerHeight

      const fullyVisible = rect.top <= 0 && rect.bottom >= screenHeight

      if (fullyVisible) {
        setEnabled(true)
      } else {
        setEnabled(false)
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

  const handleScroll = (dir: "prev" | "next") => {
    if (!wrapperRef.current) return

    const screenHeight = window.innerHeight
    const wrapperTop = wrapperRef.current.offsetTop
    const startOffset = screenHeight * 0.4

    const isLast = activeIndex >= slides.length - 1
    const isFirst = activeIndex <= 0

    if (dir === "next" && isLast) {
      const reviewsSection = document.getElementById("reviews")
      if (reviewsSection) {
        reviewsSection.scrollIntoView({ behavior: "smooth" })
      }
      return
    }

    if (dir === "prev" && isFirst) {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const nextIndex = dir === "next" ? activeIndex + 1 : activeIndex - 1
    const scrollTarget = wrapperTop + startOffset + screenHeight * nextIndex

    window.scrollTo({
      top: scrollTarget,
      behavior: "smooth",
    })
  }

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
            )}
          >
            <div className="relative flex w-full items-center justify-center">
              <Image
                src={slide.image}
                alt={slide.title}
                width={279}
                height={606}
                className={cn("rounded-xl shadow-xl")}
              />

              <div className="-z-10 absolute inset-0 mx-auto size-full max-w-5xl">
                {slide.particles.map((p, pi) => (
                  <Particle
                    key={`${p.src}-${i}-${pi}`}
                    width={p.width}
                    height={p.height}
                    src={p.src}
                    alt={p.src}
                    className={cn(
                      enabled ? "opacity-100" : "opacity-0",
                      i === activeIndex &&
                        enabled &&
                        "fade-in animate-in duration-[1.5s] ease-in-out",
                      i === 0 && "delay-100",
                      pi === 0 &&
                        "slide-in-from-right-60 slide-in-from-bottom-40 inset-x-0 top-0",
                      pi === 1 &&
                        "slide-in-from-right-60 -translate-y-1/2 inset-x-0 top-1/2",
                      pi === 2 &&
                        "slide-in-from-right-60 slide-in-from-top-40 inset-x-0 bottom-0",
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="-z-10 absolute inset-0">
              <Image
                src={`/gradients/${slide.id}.png`}
                alt="slide-background"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex max-w-md items-center p-4 text-center">
              <div className="z-10 font-medium text-white/80 text-xl">
                {slide.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      <SliderCounter
        activeIndex={activeIndex + 1}
        total={slides.length}
        enabled={enabled}
      />

      <SliderNavButtons
        enabled={enabled}
        prevSlide={() => {
          handleScroll("prev")
        }}
        nextSlide={() => {
          handleScroll("next")
        }}
        disabled={{
          prev: isScrolling,
          next: isScrolling,
        }}
      />
    </section>
  )
}

type SliderCounterProps = {
  activeIndex: number
  total: number
  enabled: boolean
}
const SliderCounter = ({ activeIndex, total, enabled }: SliderCounterProps) => {
  return (
    <div
      className={cn(
        "-z-50 fixed bottom-10 left-10 flex items-center gap-2.5",
        enabled
          ? "fade-in animate-in opacity-100"
          : "fade-out animate-out opacity-0 delay-200",
      )}
    >
      <span className="font-medium text-[32px]">{activeIndex}</span>
      <span className="text-muted-foreground">/</span>
      <span className="text-muted-foreground">{total}</span>
    </div>
  )
}

type SliderNavButtonsProps = {
  prevSlide: () => void
  nextSlide: () => void
  disabled: {
    prev: boolean
    next: boolean
  }
  enabled: boolean
}

const SliderNavButtons = ({
  prevSlide,
  nextSlide,
  disabled,
  enabled,
}: SliderNavButtonsProps) => {
  return (
    <div
      className={cn(
        "fixed right-10 bottom-10 z-[500] flex flex-col gap-2.5 duration-500",
        enabled
          ? "fade-in animate-in opacity-100"
          : "fade-out animate-out opacity-0 delay-200",
      )}
    >
      <Button
        variant="secondary"
        disabled={disabled.prev}
        className="z-50 flex size-10 flex-col items-center justify-center rounded-full"
        onClick={prevSlide}
        aria-label="prev-slide"
        tabIndex={0}
      >
        <ArrowDownIcon className="rotate-180" />
      </Button>
      <Button
        variant="secondary"
        disabled={disabled.next}
        className="size-10 rounded-full"
        onClick={nextSlide}
        aria-label="next-slide"
        tabIndex={0}
      >
        <ArrowDownIcon />
      </Button>
    </div>
  )
}
