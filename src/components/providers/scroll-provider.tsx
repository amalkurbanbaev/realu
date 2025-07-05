"use client"

import gsap from "gsap"
import ReactLenis, { type LenisRef } from "lenis/react"
import { type ReactNode, useEffect, useRef } from "react"

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

    return () => {
      gsap.ticker.remove(update)
      document.removeEventListener("visibilitychange", onVisible)
    }
  }, [])
  return (
    <ReactLenis ref={lenisRef} root>
      {children}
    </ReactLenis>
  )
}
