"use client"

import { useScrollAnimation } from "@/hooks"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

const imageKeys = [
  "learn",
  "meditation",
  "breath",
  "yoga",
  "tests",
  "watch",
  "warmup",
]

export function SlidesOverlay() {
  const t = useTranslations("home-page.layout")
  const locale = useLocale()

  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  const slides = imageKeys.map((key, index) => ({
    key,
    title: t(`slides.${index}.title`),
    description: t(`slides.${index}.description`),
    image: `/screenshots/${locale}/${key}.png`,
  }))

  const { activeIndex } = useScrollAnimation(sectionRefs, imageRefs)

  return (
    <section className="container">
      <div className="relative grid h-full grid-cols-3 gap-4">
        {/* Панелька */}
        <div className="sticky top-0 z-10 flex h-screen flex-col items-start justify-center gap-4">
          {slides.map((slide, i) => (
            <button
              key={slide.key}
              type="button"
              onClick={() =>
                sectionRefs.current[i]?.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                })
              }
              className={cn(
                "cursor-pointer font-semibold text-2xl transition-colors duration-500",
                i === activeIndex
                  ? "font-semibold text-foreground"
                  : "font-medium text-muted-foreground",
              )}
            >
              {slide.title}
            </button>
          ))}
        </div>

        {/* Слайды */}
        <div className="col-span-2 flex flex-col scroll-smooth">
          {slides.map((slide, i) => (
            <section
              key={slide.key}
              data-index={i}
              ref={(el) => {
                sectionRefs.current[i] = el
              }}
              className="grid h-screen grid-cols-2 items-center justify-center gap-8 will-change-transform"
            >
              {/* Центр: скриншот */}
              <div
                ref={(el) => {
                  imageRefs.current[i] = el
                }}
                className="flex items-center justify-center will-change-transform"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={300}
                  height={600}
                  className="rounded-xl shadow-xl"
                />
              </div>

              {/* Справа: текст */}
              <div className="flex max-w-sm items-center p-4">
                <div className="font-medium text-white/80 text-xl">
                  {slide.description}
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  )
}
