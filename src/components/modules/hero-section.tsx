"use client"

import { cn } from "@/lib/utils"
import { Volume2Icon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useRef, useState } from "react"
import { MuteIcon } from "../icons"
import { Button } from "../ui/button"
import { ScrollScreenButton } from "./scroll-screen-button"
import { VideoPlayer } from "./video-player"

export function HeroSection() {
  const t = useTranslations("home-page.layout")
  const videoRef = useRef<HTMLVideoElement>(null)

  const [isMuted, setIsMuted] = useState(false)
  const [isManuallyPaused, setIsManuallyPaused] = useState(false)
  const [shouldZoomOut, setShouldZoomOut] = useState(false)

  const skipScrollPlayUntilTop = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current
      if (!video) return

      const scrolledDown = window.scrollY > 100

      if (scrolledDown) {
        setShouldZoomOut(true)

        if (!video.paused && !isManuallyPaused) {
          video.pause()
        }
      } else {
        // Скролл вверх
        if (skipScrollPlayUntilTop.current) {
          // 💥 блокируем воспроизведение до возвращения вверх
          return
        }

        if (
          !skipScrollPlayUntilTop.current &&
          !isManuallyPaused &&
          video.paused &&
          video.readyState >= 2
        ) {
          video.play().catch(() => {})
          setShouldZoomOut(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isManuallyPaused])

  const handleTogglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      video.play().catch(() => {})
      setIsManuallyPaused(false)
    } else {
      video.pause()
      setIsManuallyPaused(true)
      setShouldZoomOut(true)

      skipScrollPlayUntilTop.current = true
    }
  }
  const toggleMute = () => {
    setIsMuted((prev) => !prev)
  }

  return (
    <section className="container sticky top-0 flex h-screen flex-col overflow-hidden pt-[var(--header-height)]">
      <div
        className={cn(
          "mx-auto w-full flex-grow overflow-hidden rounded-[48px] transition-transform duration-1000 ease-in-out md:max-w-3/4",
          shouldZoomOut && "scale-90",
        )}
      >
        <VideoPlayer
          ref={videoRef}
          muted={isMuted}
          onClick={handleTogglePlay} // 💡 прокидываем контроль воспроизведения в VideoPlayer
          src="https://yoe5uv0pyxq0fpip.public.blob.vercel-storage.com/main_compressed-Zz2XLGcCQAUh1ZgGtoFHx0BioJXXIP.mp4"
          poster="/video/poster-main.png"
        />
      </div>

      <div className="container relative z-10 py-4 md:pt-8 md:pb-12">
        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="font-bold text-2xl">{t("title")}</h1>
          <h5 className="font-light">{t("description")}</h5>
        </div>
      </div>

      <Button
        aria-label="mute"
        tabIndex={0}
        variant="secondary"
        className="absolute bottom-10 left-10 z-50 flex size-10 cursor-pointer flex-col items-center justify-center rounded-full"
        onClick={toggleMute}
      >
        {isMuted ? <Volume2Icon /> : <MuteIcon />}
      </Button>

      <ScrollScreenButton />
    </section>
  )
}
