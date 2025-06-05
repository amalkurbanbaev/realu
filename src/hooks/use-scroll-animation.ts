import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { type RefObject, useEffect, useState } from "react"

gsap.registerPlugin(ScrollTrigger)

export const useScrollAnimation = (
  slidesRef: RefObject<(HTMLElement | null)[]>,
) => {
  const [activeIndex, setActiveIndex] = useState(0)

  // Отслеживание активного слайда
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setActiveIndex(index)
          }
        }
      },
      { threshold: 0.5 },
    )

    for (const el of slidesRef.current) {
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [slidesRef])

  // GSAP-анимации
  useEffect(() => {
    const triggers: ScrollTrigger[] = []

    for (const el of slidesRef.current) {
      if (!el) continue

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          end: "bottom top",
          scrub: true,
        },
      })

      tl.fromTo(
        el,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
          filter: "blur(5px) grayscale(1)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px) grayscale(0)",
          duration: 1,
          ease: "power3.out",
        },
      ).to(
        el,
        {
          opacity: 0,
          y: -60,
          scale: 0.9,
          filter: "blur(5px) grayscale(1)",
          duration: 1,
          ease: "power3.in",
        },
        ">",
      )

      if (tl.scrollTrigger) triggers.push(tl.scrollTrigger)
    }

    return () => {
      for (const trigger of triggers) {
        trigger.kill()
      }
    }
  }, [slidesRef])

  return { activeIndex, setActiveIndex }
}
