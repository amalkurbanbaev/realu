"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Image from "next/image"

import { useSlides } from "@/hooks/use-slides"
import { cn } from "@/lib/utils"

import { ArrowDownIcon } from "../icons"
import { Button } from "../ui/button"
import { Particle } from "./particle"

export function ScrollFade() {
  const slides = useSlides()

  const wrapperRef = useRef<HTMLDivElement>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [panelVisible, setPanelVisible] = useState(false) // рендерим UI только когда секция целиком во вью
  const [animEnabled, setAnimEnabled] = useState(false) // партиклы живут на 1-м экране и когда секция во вью
  const [isAnimating, setIsAnimating] = useState(false)
  const animFallbackRef = useRef<number | null>(null)

  const H = () => window.innerHeight
  const getWrapperTop = () => {
    const el = wrapperRef.current
    if (!el) return 0
    const r = el.getBoundingClientRect()
    return r.top + window.scrollY
  }
  const isFullyInView = () => {
    const el = wrapperRef.current
    if (!el) return false
    const rect = el.getBoundingClientRect()
    const vh = window.innerHeight
    return rect.top <= 0 && rect.bottom >= vh
  }

  // высота секции = кол-во слайдов * 100vh
  useLayoutEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    el.style.height = `${Math.max(1, slides.length) * 100}vh`
  }, [slides.length])

  // флаги видимости/анимаций
  // biome-ignore lint/correctness/useExhaustiveDependencies: use only needed deps
  useEffect(() => {
    const updateFlags = () => {
      const fully = isFullyInView()
      setPanelVisible(fully)
      setAnimEnabled(fully || (window.scrollY === 0 && activeIndex === 0))
    }
    updateFlags()
    window.addEventListener("scroll", updateFlags, { passive: true })
    window.addEventListener("resize", updateFlags)
    return () => {
      window.removeEventListener("scroll", updateFlags)
      window.removeEventListener("resize", updateFlags)
    }
  }, [activeIndex])

  // индекс по полу — без перепрыгиваний
  // biome-ignore lint/correctness/useExhaustiveDependencies: use only needed deps
  useEffect(() => {
    const onScroll = () => {
      const top = getWrapperTop()
      const rel = window.scrollY - top
      const h = H()

      if (rel < 0) {
        setActiveIndex(0)
        return
      }

      const idx = Math.floor(rel / h + 0.001)
      const clamped = Math.max(0, Math.min(idx, slides.length - 1))
      setActiveIndex(clamped)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    onScroll()
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [slides.length])

  // своя анимация скролла
  const animateScrollTo = (toY: number, duration = 500) => {
    if (animFallbackRef.current) {
      clearTimeout(animFallbackRef.current)
      animFallbackRef.current = null
    }

    setIsAnimating(true)

    const fromY = window.scrollY
    const diff = toY - fromY
    if (Math.abs(diff) < 1) {
      window.scrollTo({ top: toY })
      setIsAnimating(false)
      return
    }

    const start = performance.now()
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)

    let raf = 0
    const step = (now: number) => {
      const p = Math.min(1, (now - start) / duration)
      const y = fromY + diff * ease(p)
      window.scrollTo({ top: y })
      if (p < 1) {
        raf = requestAnimationFrame(step)
      } else {
        setIsAnimating(false)
      }
    }
    raf = requestAnimationFrame(step)

    // фолбэк — гарант разблокировки
    animFallbackRef.current = window.setTimeout(() => {
      cancelAnimationFrame(raf)
      window.scrollTo({ top: toY })
      setIsAnimating(false)
      animFallbackRef.current = null
    }, duration + 400)
  }

  const handleScroll = (dir: "prev" | "next") => {
    const top = getWrapperTop()
    const h = H()

    const isLast = activeIndex >= slides.length - 1
    const isFirst = activeIndex <= 0

    if (dir === "next" && isLast) {
      // после секции (ровно за слайдер)
      const el = wrapperRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        const wrapperBottom = window.scrollY + rect.bottom
        animateScrollTo(wrapperBottom)
      }
      return
    }

    if (dir === "prev" && isFirst) {
      animateScrollTo(0)
      return
    }

    const nextIndex = dir === "next" ? activeIndex + 1 : activeIndex - 1
    animateScrollTo(top + nextIndex * h)
  }

  return (
    <section ref={wrapperRef} className="relative z-20 [scroll-snap-type:none]">
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
                className="rounded-xl shadow-xl"
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
                      animEnabled ? "opacity-100" : "opacity-0",
                      i === activeIndex &&
                        animEnabled &&
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

            <div className="flex max-w-md flex-col items-center p-4 text-center">
              <h4 className="mb-2 font-bold text-2xl">{slide.title}</h4>
              <h5 className="z-10 font-medium text-base text-white/80">
                {slide.description}
              </h5>
            </div>
          </div>
        ))}
      </div>

      {/* Счётчик и кнопки — МОНТИМ только когда секция целиком во вью.
          Пока их нет в DOM — по hero ничего не наложится. */}
      {panelVisible && (
        <>
          <SliderCounter
            activeIndex={activeIndex + 1}
            total={slides.length}
            enabled={panelVisible}
          />

          <SliderNavButtons
            enabled={panelVisible}
            prevSlide={() => handleScroll("prev")}
            nextSlide={() => handleScroll("next")}
            disabled={{
              prev: isAnimating,
              next: isAnimating,
            }}
          />
        </>
      )}
    </section>
  )
}

type SliderCounterProps = {
  activeIndex: number
  total: number
  enabled: boolean
}
const SliderCounter = ({ activeIndex, total }: SliderCounterProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none fixed bottom-10 left-10 z-40 flex items-center gap-2.5",
        "fade-in animate-in opacity-100",
      )}
      aria-hidden
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
}: SliderNavButtonsProps) => {
  return (
    <div
      className={cn(
        "fixed right-10 bottom-10 z-40 flex flex-col gap-2.5",
        "fade-in animate-in opacity-100",
      )}
      // гарантируем, что клики проходят только по видимым кнопкам
      style={{ pointerEvents: "auto" }}
    >
      <Button
        type="button"
        variant="secondary"
        disabled={disabled.prev}
        className="z-40 flex size-10 flex-col items-center justify-center rounded-full"
        onClick={prevSlide}
        aria-label="prev-slide"
      >
        <ArrowDownIcon className="rotate-180" />
      </Button>
      <Button
        type="button"
        variant="secondary"
        disabled={disabled.next}
        className="z-40 size-10 rounded-full"
        onClick={nextSlide}
        aria-label="next-slide"
      >
        <ArrowDownIcon />
      </Button>
    </div>
  )
}
