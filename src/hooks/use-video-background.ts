import { type RefObject, useEffect, useRef } from "react"

export const useVideoBackground = (
  videoRef: RefObject<HTMLVideoElement | null>,
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let rafId: number | undefined
    let vfcId: number | undefined
    let keepAliveId: number | undefined
    const hasRVFC = "requestVideoFrameCallback" in HTMLVideoElement.prototype

    const draw = () => {
      try {
        ctx.filter = "blur(3px)"
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      } catch {}
    }

    const syncSize = () => {
      const w = video.videoWidth || canvas.clientWidth || 640
      const h = video.videoHeight || canvas.clientHeight || 360
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        draw() // сразу перерисовать после любого изменения размера
      }
    }

    const startRAF = () => {
      stopRAF()
      const loop = () => {
        draw()
        rafId = requestAnimationFrame(loop)
      }
      rafId = requestAnimationFrame(loop)
    }
    const stopRAF = () => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = undefined
    }

    const startRVFC = () => {
      stopRVFC()
      const step = () => {
        draw()
        vfcId = video.requestVideoFrameCallback(step)
      }
      vfcId = video.requestVideoFrameCallback(step)
    }
    const stopRVFC = () => {
      if (vfcId && video.cancelVideoFrameCallback)
        video.cancelVideoFrameCallback(vfcId)
      vfcId = undefined
    }

    // 🔸 keep-alive при паузе: низкочастотная перерисовка
    const startKeepAlive = () => {
      stopKeepAlive()
      keepAliveId = window.setInterval(() => {
        syncSize()
        draw()
      }, 250)
    }
    const stopKeepAlive = () => {
      if (keepAliveId) clearInterval(keepAliveId)
      keepAliveId = undefined
    }

    const onPlay = () => {
      stopKeepAlive()
      syncSize()
      hasRVFC ? startRVFC() : startRAF()
    }

    const onPause = () => {
      stopRVFC()
      stopRAF()
      syncSize()
      draw() // зафиксировать последний кадр
      startKeepAlive() // подстраховать очистки холста
    }

    const onLoadedMeta = () => {
      syncSize()
      draw()
    }
    const onLoadedData = () => {
      syncSize()
      draw()
    }
    const onResize = () => {
      syncSize()
      if (!video.paused) draw()
    }

    video.addEventListener("loadedmetadata", onLoadedMeta)
    video.addEventListener("loadeddata", onLoadedData)
    video.addEventListener("play", onPlay)
    video.addEventListener("pause", onPause)
    video.addEventListener("ended", onPause)
    window.addEventListener("resize", onResize)

    // первичная инициализация
    onLoadedMeta()

    return () => {
      stopKeepAlive()
      stopRVFC()
      stopRAF()
      video.removeEventListener("loadedmetadata", onLoadedMeta)
      video.removeEventListener("loadeddata", onLoadedData)
      video.removeEventListener("play", onPlay)
      video.removeEventListener("pause", onPause)
      video.removeEventListener("ended", onPause)
      window.removeEventListener("resize", onResize)
    }
  }, [videoRef])

  return { canvasRef }
}
