"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Image from "next/image"

import { useVideoBackground } from "@/hooks"
import { useSlides } from "@/hooks/use-slides"
import { cn } from "@/lib/utils"

import { ArrowDownIcon } from "../icons"
import { Button } from "../ui/button"
import { Typography } from "../ui/typography"
import { Particle } from "./particle"

export function ScrollFade() {
  const slides = useSlides()
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Определяем мобильное устройство только после монтирования, чтобы избежать проблем с гидратацией
  useEffect(() => {
    setMounted(true)
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 767)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const wrapperRef = useRef<HTMLDivElement>(null)
  const [videoEl, setVideoEl] = useState<HTMLVideoElement | null>(null)
  const { canvasRef } = useVideoBackground(videoEl)

  const [activeIndex, setActiveIndex] = useState(0)
  const [panelVisible, setPanelVisible] = useState(false) // рендерим UI только когда секция целиком во вью
  const [animEnabled, setAnimEnabled] = useState(false) // партиклы живут на 1-м экране и когда секция во вью
  const [isAnimating, setIsAnimating] = useState(false)
  const animFallbackRef = useRef<number | null>(null)

  // Callback ref для видео элементов
  const setVideoRefCallback = (element: HTMLVideoElement | null, slideIndex: number) => {
    if (isMobile) return
    if (element && slideIndex === activeIndex) {
      setVideoEl(element)
    }
    if (!element && slideIndex === activeIndex) {
      setVideoEl(null)
    }
  }

  // Обновляем videoEl при изменении activeIndex (на случай если callback ref не сработал)
  useEffect(() => {
    if (isMobile) {
      setVideoEl(null)
      return
    }
    const activeSlide = slides[activeIndex]
    if (activeSlide?.video) {
      // Ищем видео элемент активного слайда
      requestAnimationFrame(() => {
        const slideContainer = document.querySelector(`[data-slide-index="${activeIndex}"]`)
        if (slideContainer) {
          const videoElement = slideContainer.querySelector("video") as HTMLVideoElement | null
          if (videoElement) {
            setVideoEl(videoElement)
          }
        }
      })
    } else {
      setVideoEl(null)
    }
  }, [activeIndex, slides, isMobile])

  const H = () => window.innerHeight
  // дополнительное пространство для последнего слайда (в vh)
  const LAST_SLIDE_EXTRA_VH = 0.5
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

  // высота секции = кол-во слайдов * 100vh + дополнительное пространство для последнего слайда (только для desktop)
  useLayoutEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    if (isMobile) {
      // на мобильных убираем фиксированную высоту, слайды идут друг за другом
      el.style.height = "auto"
      return
    }
    const baseHeight = Math.max(1, slides.length) * 100
    const extraHeight = LAST_SLIDE_EXTRA_VH * 100
    el.style.height = `${baseHeight + extraHeight}vh`
  }, [slides.length, isMobile])

  // флаги видимости/анимаций (только для desktop)
  // biome-ignore lint/correctness/useExhaustiveDependencies: use only needed deps
  useEffect(() => {
    if (isMobile) {
      setPanelVisible(true)
      setAnimEnabled(false)
      return
    }
    const updateFlags = () => {
      const fully = isFullyInView()
      setPanelVisible(fully)
      // particles показываем когда секция во вью, на первом слайде вверху страницы,
      // или когда мы на последнем слайде (даже если секция уже ушла вверх)
      const isOnLastSlide = activeIndex === slides.length - 1
      setAnimEnabled(fully || (window.scrollY === 0 && activeIndex === 0) || isOnLastSlide)
    }
    updateFlags()
    window.addEventListener("scroll", updateFlags, { passive: true })
    window.addEventListener("resize", updateFlags)
    return () => {
      window.removeEventListener("scroll", updateFlags)
      window.removeEventListener("resize", updateFlags)
    }
  }, [activeIndex, slides.length, isMobile])

  // индекс по полу — без перепрыгиваний (только для desktop)
  // biome-ignore lint/correctness/useExhaustiveDependencies: use only needed deps
  useEffect(() => {
    if (isMobile) {
      // на мобильных не отслеживаем активный индекс
      return
    }
    const onScroll = () => {
      const top = getWrapperTop()
      const rel = window.scrollY - top
      const h = H()

      if (rel < 0) {
        setActiveIndex(0)
        return
      }

      // для последнего слайда учитываем дополнительное пространство
      const lastSlideStart = (slides.length - 1) * h
      const lastSlideExtra = LAST_SLIDE_EXTRA_VH * h

      if (rel >= lastSlideStart) {
        // если мы в зоне последнего слайда (включая дополнительное пространство)
        if (rel <= lastSlideStart + lastSlideExtra) {
          setActiveIndex(slides.length - 1)
        } else {
          // если проскроллили дальше дополнительного пространства, остаёмся на последнем слайде
          setActiveIndex(slides.length - 1)
        }
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
  }, [slides.length, isMobile])

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
      // проверяем, находимся ли мы в дополнительном пространстве последнего слайда
      const rel = window.scrollY - top
      const lastSlideStart = (slides.length - 1) * h
      const lastSlideExtra = LAST_SLIDE_EXTRA_VH * h

      if (rel < lastSlideStart + lastSlideExtra) {
        // если ещё не проскроллили дополнительное пространство, скроллим до конца секции
        animateScrollTo(top + lastSlideStart + lastSlideExtra)
      } else {
        // после секции (ровно за слайдер)
        const el = wrapperRef.current
        if (el) {
          const rect = el.getBoundingClientRect()
          const wrapperBottom = window.scrollY + rect.bottom
          animateScrollTo(wrapperBottom)
        }
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

  // Мобильная версия - простой вертикальный скролл
  // Показываем мобильную версию только после монтирования, чтобы избежать проблем с гидратацией
  if (mounted && isMobile) {
    return (
      <section ref={wrapperRef} className="relative z-20 mt-14">
        {slides.map((slide) => (
          <div key={slide.id} className="flex flex-col items-center justify-center px-4 py-12">
            {/* Изображение или видео по центру */}
            <div className="mb-8 flex items-center justify-center px-4">
              {slide.image ? (
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={227}
                  height={492}
                  className="pointer-events-none h-auto w-auto max-w-[227px] select-none rounded-4xl border-4 border-white/10"
                />
              ) : slide.video ? (
                <video
                  src={slide.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="pointer-events-none h-[492px] w-auto max-w-[227px] select-none rounded-4xl border-4 border-white/10 object-cover"
                  width={227}
                  height={492}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              ) : null}
            </div>

            {/* Текст по центру */}
            <div className="flex max-w-[320px] flex-col items-center gap-y-2 text-center">
              <Typography variant="headline-1" as="h4">
                {slide.title}
              </Typography>
              <Typography variant="body-1" as="p" className="font-light">
                {slide.description}
              </Typography>
            </div>
          </div>
        ))}
      </section>
    )
  }

  // Desktop версия - sticky скролл с анимациями
  // На сервере и до монтирования всегда рендерим desktop версию
  const activeSlide = slides[activeIndex]
  const isVideoSlide = activeSlide?.video !== undefined

  return (
    <section ref={wrapperRef} className="relative z-20 [scroll-snap-type:none]">
      <div className="sticky top-0 h-screen w-full">
        {/* Фоновая подсветка для видео-слайдов */}
        {isVideoSlide && (
          <canvas
            className="fade-in -z-10 pointer-events-none absolute inset-0 m-auto size-[95%] animate-in blur-3xl duration-1000"
            ref={canvasRef}
            style={{ opacity: 0.5 }}
          />
        )}
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            data-slide-index={i}
            className={cn(
              "absolute inset-0 overflow-visible transition-opacity duration-700 will-change-[opacity]",
              i === activeIndex ? "opacity-100" : "opacity-0",
            )}
          >
            {/* Фон градиент */}
            {slide.withGradient && (
              <div className="-z-10 pointer-events-none absolute inset-0">
                <Image src={`/gradients/${slide.id}.svg`} alt="slide-background" fill className="object-cover" />
              </div>
            )}

            {/* Частицы */}
            <div className="-z-10 absolute inset-0 hidden overflow-hidden md:block">
              {slide.particles.map((p, pi) => (
                <Particle
                  key={`${p.src}-${i}-${pi}`}
                  width={p.width}
                  height={p.height}
                  src={p.src}
                  alt={p.src}
                  className={cn(
                    "absolute",
                    p.position,
                    animEnabled ? "opacity-100" : "opacity-0",
                    i === activeIndex && animEnabled && "fade-in zoom-in-90 animate-in duration-[1.5s] ease-in-out",
                    i === 0 && "delay-100",
                  )}
                />
              ))}
            </div>

            {/* Изображение или видео по центру */}
            <div className="absolute inset-0 mb-10 flex items-center justify-center px-4">
              {slide.image ? (
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={227}
                  height={492}
                  className="pointer-events-none h-auto w-auto max-w-[227px] select-none rounded-4xl border-4 border-white/10 md:max-w-[180px] lg:max-w-[227px]"
                />
              ) : slide.video ? (
                <video
                  ref={(el) => setVideoRefCallback(el, i)}
                  src={slide.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="pointer-events-none h-[492px] w-auto max-w-[227px] select-none rounded-4xl border-4 border-white/10 object-cover md:h-[400px] md:max-w-[180px] lg:h-[492px] lg:max-w-[227px]"
                  width={227}
                  height={492}
                >
                  <source src={slide.video} type="video/mp4" />
                </video>
              ) : null}
            </div>

            {/* Подписи слайда по центру (анимируются вместе со слайдом) */}
            {panelVisible && i === activeIndex && (
              <div className="-translate-x-1/2 absolute bottom-10 left-1/2 z-40 flex max-w-[520px] flex-col items-center gap-y-2 px-4 text-center">
                <Typography variant="headline-1" as="h4">
                  {slide.title}
                </Typography>
                <Typography variant="body-1" as="p" className="max-w-[444px] font-medium">
                  {slide.description}
                </Typography>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Статичная нижняя панель со счётчиком и кнопками (не анимируется) */}
      {panelVisible && (
        <div className="-translate-x-1/2 container pointer-events-none fixed bottom-10 left-1/2 z-50 flex w-full items-center justify-between gap-4 px-8">
          {/* Счётчик слева */}
          <SliderCounter activeIndex={activeIndex + 1} total={slides.length} enabled={panelVisible} />

          {/* Заполнитель для центрирования подписей */}
          <div className="flex-1" />

          {/* Кнопки навигации справа */}
          <div style={{ pointerEvents: "auto" }}>
            <SliderNavButtons
              enabled={panelVisible}
              prevSlide={() => handleScroll("prev")}
              nextSlide={() => handleScroll("next")}
              disabled={{
                prev: isAnimating,
                next: isAnimating,
              }}
            />
          </div>
        </div>
      )}
    </section>
  )
}

type SliderCounterProps = {
  activeIndex: number
  total: number
  enabled: boolean
}

// тут добавляем кол-во секций всей страницы сверху и снизу
const SliderCounter = ({ activeIndex, total }: SliderCounterProps) => {
  return (
    <div className={cn("pointer-events-none flex items-center gap-2.5", "fade-in animate-in opacity-100")} aria-hidden>
      <span className="font-medium text-[32px]">{activeIndex + 1}</span>
      <span className="text-muted-foreground">/</span>
      <span className="text-muted-foreground">{total + 2}</span>
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

const SliderNavButtons = ({ prevSlide, nextSlide, disabled }: SliderNavButtonsProps) => {
  return (
    <div
      className={cn("flex flex-col gap-2.5", "fade-in animate-in opacity-100")}
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
