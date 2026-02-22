"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2Icon } from "lucide-react"
import { useTranslations } from "next-intl"

import { useVideoBackground } from "@/hooks"
import { cn } from "@/lib/utils"

import { MuteIcon } from "../icons"
import { Button } from "../ui/button"
import { Typography } from "../ui/typography"
import { AppleButton } from "./apple-button"
import { ScrollScreenButton } from "./scroll-screen-button"
import { VideoPlayer } from "./video-player"

// const isDev = process.env.NODE_ENV === "development"
// const MAIN_VIDEO_RU = "https://yoe5uv0pyxq0fpip.public.blob.vercel-storage.com/main-ru.mp4"
// const MAIN_VIDEO_EN = "https://yoe5uv0pyxq0fpip.public.blob.vercel-storage.com/main_compressed-Zz2XLGcCQAUh1ZgGtoFHx0BioJXXIP.mp4"
const SCROLL_TO_VIDEO_ZOOM_OUT = 100

export function HeroSection() {
  // const locale = useLocale()
  const t = useTranslations("home-page.layout")
  const videoRef = useRef<HTMLVideoElement>(null)

  const { canvasRef } = useVideoBackground(videoRef)

  const [isMuted, setIsMuted] = useState(true)
  const [isManuallyPaused, setIsManuallyPaused] = useState(false)
  const [shouldZoomOut, setShouldZoomOut] = useState(false)

  // NEW: было ли видео когда-либо запущено пользователем (Play)
  const userStartedRef = useRef(true) // Устанавливаем true для автоплея
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

        if (userStartedRef.current && pausedByScrollRef.current && !isManuallyPaused && video.paused && video.readyState >= 2) {
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

  // const videoUrlByLocale = useMemo(() => {
  //   if (locale === "ru") {
  //     return MAIN_VIDEO_RU
  //   }
  //   return MAIN_VIDEO_EN
  // }, [locale])

  // // Biome ignore: unused-local-variable
  // const videoSrc = isDev ? "/main-video-compressed.mp4" : videoUrlByLocale

  return (
    <section className="flex flex-col overflow-hidden pt-[var(--header-height)] md:sticky md:top-0 md:h-screen">
      <canvas
        className="fade-in pointer-events-none absolute inset-0 -z-10 m-auto size-[95%] animate-in blur-3xl duration-1000"
        ref={canvasRef}
        style={{ opacity: shouldZoomOut ? 0.4 : 0.5 }}
      />

      <div
        className={cn(
          "container flex w-full flex-col items-center justify-center overflow-hidden transition-transform duration-1000 ease-in-out md:flex-grow",
          shouldZoomOut && "scale-90",
        )}
      >
        <VideoPlayer
          preload="auto"
          ref={videoRef}
          muted={isMuted}
          autoPlay={true}
          onClick={handleTogglePlay}
          src="main-video-compressed.mp4"
          poster="/video/poster-main.png"
          isMuted={isMuted}
          toggleMute={toggleMute}
        />
      </div>

      <div className="container flex items-end justify-center py-4 md:justify-between md:pt-8 md:pb-12">
        <Button
          aria-label="mute"
          tabIndex={0}
          variant="secondary"
          className="hidden size-10 cursor-pointer flex-col items-center justify-center rounded-full md:flex"
          onClick={toggleMute}
        >
          {!isMuted ? <Volume2Icon /> : <MuteIcon />}
        </Button>

        <div className="mt-6 flex flex-col items-center justify-center gap-2 text-center lg:mt-0">
          <Typography variant="headline-1" as="h1" className="max-md:px-8">
            {t("title")}
          </Typography>

          <Typography variant="body-1" as="p" className="max-md:px-4">
            {t("description")}
          </Typography>
        </div>

        <ScrollScreenButton targetId="presentation" className="z-50 hidden md:block" type="button" />
      </div>

      <div className="container">
        <AppleButton className="mx-auto block w-fit md:hidden" />
      </div>
    </section>
  )
}
