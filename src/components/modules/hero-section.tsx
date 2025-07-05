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

  const [isPausedByScroll, setIsPausedByScroll] = useState(false)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const video = videoRef.current
      if (!video) return

      if (window.scrollY > 100) {
        if (!video.paused) {
          video.pause()
          setIsPausedByScroll(true)
        }
      } else if (window.scrollY < 100) {
        if (video.paused && video.readyState >= 2) {
          video.play().catch((e) => {
            console.warn("Autoplay error:", e)
          })
          setIsPausedByScroll(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMute = () => {
    setIsMuted((prev) => !prev)
  }

  return (
    <section className="container sticky top-0 flex h-screen flex-col overflow-hidden pt-[var(--header-height)]">
      <div
        className={cn(
          "mx-auto w-full flex-grow overflow-hidden rounded-[48px] transition-transform duration-1000 ease-in-out md:max-w-3/4",
          isPausedByScroll && "scale-90",
        )}
      >
        <VideoPlayer
          ref={videoRef}
          src="https://yoe5uv0pyxq0fpip.public.blob.vercel-storage.com/main_compressed-Zz2XLGcCQAUh1ZgGtoFHx0BioJXXIP.mp4"
          //   src="/test-video.mp4"
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
        aria-label="play-pause"
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
