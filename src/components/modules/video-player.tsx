"use client"
import { type ComponentPropsWithRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import { Volume2Icon } from "lucide-react"
import Image from "next/image"

import { cn } from "@/lib/utils"

import { MuteIcon } from "../icons"
import { Button } from "../ui/button"

type Props = {
  src: string
  autoPlay?: boolean
  isMuted?: boolean
  toggleMute?: () => void
  bg?: boolean
} & ComponentPropsWithRef<"video">

// Оригинальное тяжёлое видео удалено, используем сжатую версию
// В будущем src будет подтягиваться из бакета
const RESOLVED_VIDEO_SRC = "/main-video-mobile.mp4"

export function VideoPlayer({ src: _src, autoPlay = false, ref: externalRef, isMuted = false, toggleMute, bg = true, ...props }: Props) {
  const internalRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(autoPlay)

  useImperativeHandle(externalRef, () => internalRef.current as HTMLVideoElement)

  useEffect(() => {
    const video = internalRef.current
    if (!video) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener("play", handlePlay)
    video.addEventListener("pause", handlePause)

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
    }
  }, [])

  useEffect(() => {
    const video = internalRef.current
    if (!video || !autoPlay) return

    const attemptPlay = () => {
      if (video.paused && autoPlay) {
        video.play().catch(() => {})
      }
    }

    if (video.readyState >= 1) {
      attemptPlay()
    }

    video.addEventListener("canplay", attemptPlay)
    return () => video.removeEventListener("canplay", attemptPlay)
  }, [autoPlay])

  const togglePlayback = () => {
    const video = internalRef.current
    if (!video) return

    if (video.paused) {
      video.play().catch(() => {})
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="relative flex h-auto w-full items-center justify-center overflow-hidden rounded-3xl xl:rounded-[48px]">
      <video ref={internalRef} src={RESOLVED_VIDEO_SRC} className="object-cover" playsInline loop autoPlay={autoPlay} muted={isMuted} {...props} />

      <Button
        aria-label="mute"
        tabIndex={0}
        variant="secondary"
        className="absolute right-4 bottom-4 z-50 size-10 cursor-pointer flex-col items-center justify-center rounded-full md:hidden"
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()

          toggleMute?.()
        }}
      >
        {isMuted ? <Volume2Icon /> : <MuteIcon />}
      </Button>

      <button
        onClick={togglePlayback}
        className={cn("absolute inset-0 flex cursor-pointer items-center justify-center", bg ? "bg-black/50" : "")}
        type="button"
        aria-label="play-video-button"
      >
        {isPlaying ? null : <Image src="/icons/play.svg" alt="play-icon" width={48} height={48} className="transition-transform hover:scale-110" />}
      </button>
    </div>
  )
}
