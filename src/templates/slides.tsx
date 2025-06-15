"use client"

import { Particle } from "@/components/modules/particle"
import { useScrollAnimation } from "@/hooks"
import { useSlides } from "@/hooks/use-slides"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { useRef } from "react"

gsap.registerPlugin(ScrollTrigger)

export function SlidesOverlay() {
  const sectionRefs = useRef<(HTMLElement | null)[]>([])
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  const slides = useSlides()

  const { activeIndex } = useScrollAnimation(sectionRefs, imageRefs)

  return (
    <section>
      <div className="relative grid h-full grid-cols-3 gap-4">
        {/* Панелька */}
        <div className="container sticky top-0 z-10 flex h-screen flex-col items-start justify-center gap-4">
          {slides.map((slide, i) => (
            <button
              key={slide.id}
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
            <div
              key={slide.id}
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
                  width={279}
                  height={606}
                  className="rounded-xl shadow-xl"
                />
              </div>

              {/* Градиент */}
              <div
                className={cn(
                  "-z-10 pointer-events-none absolute inset-0 select-none",
                )}
              >
                <Image
                  src={`/gradients/${slide.id}.png`}
                  alt="bg-slide-gradient"
                  fill
                />
              </div>

              {/* Справа: текст */}
              <div className="relative flex max-w-sm items-center p-4">
                <div className="font-medium text-white/80 text-xl">
                  {slide.description}
                </div>

                {slide.particles.map((p) => (
                  <Particle
                    key={p.src}
                    width={p.width}
                    height={p.height}
                    src={p.src}
                    alt={p.src}
                    className={cn(p.position)}
                  />
                ))}

                {/* <div className="absolute top-0 left-0 size-full border">
                  <Image fill alt="particle" src="/particles/learn-1.svg" />
                </div> */}

                {/* <div className="absolute inset-x-0 border-2">
                  {slide.particles.map((p, i) => (
                    <div
                      key={p}
                      className={cn(
                        // "absolute inset-x-0 size-full",
                        i % 2
                          ? "translate-y-10"
                          : "-translate-y-1/2 top-0 h-20",
                        "h-full w-full border border-red-500",
                      )}
                    >
                      <Image src={p} alt="particle" fill />
                    </div>
                  ))}
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
