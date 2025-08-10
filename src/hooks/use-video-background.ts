"use client"

import { type RefObject, useEffect, useRef } from "react"

export const useVideoBackground = (
  videoRef: RefObject<HTMLVideoElement | null>,
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const init = () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    let step: number | undefined

    const mediaQuery = window?.matchMedia("(prefers-reduced-motion: reduce)")

    if (mediaQuery.matches || !canvas || !video) {
      return
    }

    const ctx = canvas.getContext("2d")

    if (!ctx) {
      return
    }

    // 🔹 если есть постер — рисуем его сразу, чтобы фон был с первого кадра
    const poster = video.getAttribute("poster")
    if (poster) {
      const img = new Image()
      img.crossOrigin = "anonymous"
      img.onload = () => {
        try {
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height)
        } catch {}
      }
      img.src = poster
    }

    ctx.filter = "blur(3px)"

    const draw = () => {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
    }

    const drawLoop = () => {
      draw()
      step = window.requestAnimationFrame(drawLoop)
    }

    const drawPause = () => {
      if (step) window.cancelAnimationFrame(step)
      step = undefined
    }

    // Initialize
    video.addEventListener("loadeddata", draw, false)
    video.addEventListener("seeked", draw, false)
    video.addEventListener("play", drawLoop, false)
    video.addEventListener("pause", drawPause, false)
    video.addEventListener("ended", drawPause, false)

    // Run cleanup on unmount event
    return () => {
      video.removeEventListener("loadeddata", draw)
      video.removeEventListener("seeked", draw)
      video.removeEventListener("play", drawLoop)
      video.removeEventListener("pause", drawPause)
      video.removeEventListener("ended", drawPause)
    }
  }

  useEffect(init, [])

  return {
    canvasRef,
    videoRef,
  }
}
