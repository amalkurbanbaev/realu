"use client"

import { useVideoBackground } from "@/hooks"
import { cn } from "@/lib/utils"
import { Volume2Icon } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useEffect, useMemo, useRef, useState } from "react"
import { MuteIcon } from "../icons"
import { Button } from "../ui/button"
import { ScrollScreenButton } from "./scroll-screen-button"
import { VideoPlayer } from "./video-player"

const isDev = process.env.NODE_ENV === "development"
const MAIN_VIDEO_RU =
  "https://yoe5uv0pyxq0fpip.public.blob.vercel-storage.com/main-ru.mp4"
const MAIN_VIDEO_EN =
  "https://yoe5uv0pyxq0fpip.public.blob.vercel-storage.com/main_compressed-Zz2XLGcCQAUh1ZgGtoFHx0BioJXXIP.mp4"
const SCROLL_TO_VIDEO_ZOOM_OUT = 100

export function HeroSection() {
  const locale = useLocale()
  const t = useTranslations("home-page.layout")
  const videoRef = useRef<HTMLVideoElement>(null)

  const { canvasRef } = useVideoBackground(videoRef)

  const [isMuted, setIsMuted] = useState(false)
  const [isManuallyPaused, setIsManuallyPaused] = useState(false)
  const [shouldZoomOut, setShouldZoomOut] = useState(false)

  // NEW: было ли видео когда-либо запущено пользователем (Play)
  const userStartedRef = useRef(false)
  // NEW: ставили ли паузу именно из-за скролла вниз
  const pausedByScrollRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current
      if (!video) return

      const scrolledDown = window.scrollY > SCROLL_TO_VIDEO_ZOOM_OUT

      if (scrolledDown) {
        setShouldZoomOut(true)

        // Пауза только если играем и это не ручная пауза
        if (!video.paused && !isManuallyPaused) {
          video.pause()
          pausedByScrollRef.current = true
        }
      } else {
        setShouldZoomOut(false)

        if (
          userStartedRef.current &&
          pausedByScrollRef.current &&
          !isManuallyPaused &&
          video.paused &&
          video.readyState >= 2
        ) {
          video.play().catch(() => {})
          pausedByScrollRef.current = false
        }
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isManuallyPaused])

  const handleTogglePlay = () => {
    const video = videoRef.current
    if (!video) return

    if (video.paused) {
      // Пользовательский старт — теперь можно авторезюмить после скролла
      userStartedRef.current = true
      video.play().catch(() => {})
      setIsManuallyPaused(false)
      // если до этого мы ставили паузу скроллом — снимаем флаг
      pausedByScrollRef.current = false
    } else {
      // Ручная пауза — больше не возобновляем автоматически
      video.pause()
      setIsManuallyPaused(true)
      setShouldZoomOut(true)
      pausedByScrollRef.current = false
    }
  }

  const toggleMute = () => {
    setIsMuted((prev) => !prev)
  }

  const videoUrlByLocale = useMemo(() => {
    if (locale === "ru") {
      return MAIN_VIDEO_RU
    }
    return MAIN_VIDEO_EN
  }, [locale])

  const videoSrc = isDev ? "/local/main-video.mp4" : videoUrlByLocale

  return (
    <section className="container sticky top-0 flex h-screen flex-col overflow-hidden pt-[var(--header-height)]">
      <div
        className={cn(
          "mx-auto w-full flex-grow overflow-hidden rounded-[48px] transition-transform duration-1000 ease-in-out md:max-w-3/4",
          shouldZoomOut && "scale-90",
        )}
      >
        <canvas
          className="fade-in -z-10 pointer-events-none absolute inset-0 m-auto size-[95%] animate-in opacity-50 blur-3xl duration-1000"
          ref={canvasRef}
        />

        <VideoPlayer
          preload="auto"
          ref={videoRef}
          muted={isMuted}
          onClick={handleTogglePlay}
          src={videoSrc}
          poster="/video/poster-main.png"
        />
      </div>

      <div className="flex items-end justify-between py-4 md:pt-8 md:pb-12">
        <Button
          aria-label="mute"
          tabIndex={0}
          variant="secondary"
          className="flex size-10 cursor-pointer flex-col items-center justify-center rounded-full"
          onClick={toggleMute}
        >
          {isMuted ? <Volume2Icon /> : <MuteIcon />}
        </Button>

        <div className="flex flex-col items-center justify-center gap-2">
          <h1 className="font-bold text-2xl">{t("title")}</h1>
          <h5 className="font-light">{t("description")}</h5>
        </div>

        <ScrollScreenButton />
      </div>
    </section>
  )
}
