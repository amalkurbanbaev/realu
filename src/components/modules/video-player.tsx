"use client"
import { type ComponentPropsWithRef, useEffect, useImperativeHandle, useRef, useState } from "react"
import Image from "next/image"

type Props = {
  src: string
  autoPlay?: boolean
} & ComponentPropsWithRef<"video">

export function VideoPlayer({ src, autoPlay = false, ref: externalRef, ...props }: Props) {
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

    // Автоплей при загрузке
    if (autoPlay && video.readyState >= 2) {
      video.play().catch(() => {})
      setIsPlaying(true)
    }

    return () => {
      video.removeEventListener("play", handlePlay)
      video.removeEventListener("pause", handlePause)
    }
  }, [autoPlay])

  // Дополнительный эффект для автоплея когда видео загрузится
  useEffect(() => {
    const video = internalRef.current
    if (!video || !autoPlay) return

    const handleCanPlay = () => {
      video.play().catch(() => {})
      setIsPlaying(true)
    }

    video.addEventListener("canplay", handleCanPlay)
    return () => video.removeEventListener("canplay", handleCanPlay)
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
    <div className="relative aspect-video size-full">
      <video ref={internalRef} src={src} className="h-full w-full object-cover" playsInline loop {...props} />

      <button
        onClick={togglePlayback}
        className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50"
        type="button"
        aria-label="play-video-button"
      >
        {isPlaying ? null : <Image src="/icons/play.svg" alt="play-icon" width={48} height={48} className="transition-transform hover:scale-110" />}
      </button>
    </div>
  )
}
