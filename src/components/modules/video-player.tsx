"use client"

import Image from "next/image"
import { useRef, useState } from "react"

type Props = {
  src: string
}

export function VideoPlayer({ src }: Props) {
  const ref = useRef<HTMLVideoElement>(null)

  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlayback = () => {
    const video = ref.current
    if (!video) return

    if (video.paused) {
      video.play()
      setIsPlaying(true)
    } else {
      video.pause()
      setIsPlaying(false)
    }
  }

  return (
    <div className="relative h-full w-full">
      <video
        ref={ref}
        src={src}
        className="h-full w-full object-cover"
        playsInline
        muted
        loop
      />

      <button
        onClick={togglePlayback}
        className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/50"
        type="button"
      >
        {isPlaying ? null : (
          <Image
            src="/icons/play.svg"
            alt="play-icon"
            width={48}
            height={48}
            className="transition-transform hover:scale-110"
          />
        )}
      </button>
    </div>
  )
}
