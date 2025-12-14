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

export function VideoPlayer({ src, autoPlay = false, ref: externalRef, isMuted = false, toggleMute, bg = true, ...props }: Props) {
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

  // Автоплей для мобильных устройств (iOS Safari требует нативный autoplay + playsInline + muted)
  useEffect(() => {
    const video = internalRef.current
    if (!video || !autoPlay) return

    // Для мобильных устройств используем нативный autoplay атрибут
    // Но также пытаемся программно запустить для десктопа
    const attemptPlay = () => {
      if (video.paused && autoPlay) {
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true)
            })
            .catch((error) => {
              // Автоплей заблокирован (обычно на мобильных без взаимодействия)
              // Это нормально, пользователь сможет запустить вручную
              console.error("Autoplay prevented:", error)
            })
        }
      }
    }

    // Пытаемся запустить сразу, если уже есть данные
    if (video.readyState >= 1) {
      attemptPlay()
    }

    // Запускаем при первом доступном событии загрузки данных
    const handleLoadedData = () => {
      attemptPlay()
    }

    // canplay срабатывает раньше, когда можно начать воспроизведение
    const handleCanPlay = () => {
      attemptPlay()
    }

    // loadedmetadata - самое раннее событие, когда можно попробовать запустить
    const handleLoadedMetadata = () => {
      attemptPlay()
    }

    video.addEventListener("loadedmetadata", handleLoadedMetadata)
    video.addEventListener("loadeddata", handleLoadedData)
    video.addEventListener("canplay", handleCanPlay)

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata)
      video.removeEventListener("loadeddata", handleLoadedData)
      video.removeEventListener("canplay", handleCanPlay)
    }
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
      <video ref={internalRef} src={src} className="object-cover" playsInline loop autoPlay={autoPlay} muted={isMuted} {...props} />

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
