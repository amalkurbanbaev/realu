import { type RefObject, useEffect, useRef } from "react"

export const useVideoBackground = (videoRefOrElement: RefObject<HTMLVideoElement | null> | HTMLVideoElement | null) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Поддерживаем как RefObject, так и прямой элемент
    let video: HTMLVideoElement | null = null
    if (videoRefOrElement) {
      if (typeof videoRefOrElement === "object" && "current" in videoRefOrElement) {
        // Это RefObject
        video = (videoRefOrElement as RefObject<HTMLVideoElement | null>).current
      } else {
        // Это прямой элемент
        video = videoRefOrElement as HTMLVideoElement
      }
    }

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
        const videoWidth = video.videoWidth
        const videoHeight = video.videoHeight

        if (!videoWidth || !videoHeight) {
          return
        }

        ctx.filter = "blur(3px)"

        // Вычисляем пропорции для cover-эффекта (заполнение с сохранением пропорций)
        const canvasAspect = canvas.width / canvas.height
        const videoAspect = videoWidth / videoHeight

        let drawWidth = canvas.width
        let drawHeight = canvas.height
        let offsetX = 0
        let offsetY = 0

        if (videoAspect > canvasAspect) {
          // Видео шире - масштабируем по высоте и обрезаем по ширине
          drawHeight = canvas.height
          drawWidth = drawHeight * videoAspect
          offsetX = (canvas.width - drawWidth) / 2
        } else {
          // Видео выше - масштабируем по ширине и обрезаем по высоте
          drawWidth = canvas.width
          drawHeight = drawWidth / videoAspect
          offsetY = (canvas.height - drawHeight) / 2
        }

        ctx.drawImage(video, offsetX, offsetY, drawWidth, drawHeight)
      } catch {}
    }

    const syncSize = () => {
      // Устанавливаем canvas в размеры экрана (clientWidth/clientHeight)
      const w = canvas.clientWidth || window.innerWidth
      const h = canvas.clientHeight || window.innerHeight
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
      if (vfcId && video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(vfcId)
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
      // После загрузки данных проверяем, играет ли видео
      if (!video.paused && video.readyState >= 2) {
        onPlay()
      }
    }
    const onResize = () => {
      syncSize()
      if (!video.paused) draw()
    }

    video.addEventListener("loadedmetadata", onLoadedMeta)
    video.addEventListener("loadeddata", onLoadedData)
    video.addEventListener("play", onPlay)
    video.addEventListener("playing", onPlay) // Обрабатываем событие playing для надежности
    video.addEventListener("pause", onPause)
    video.addEventListener("ended", onPause)
    window.addEventListener("resize", onResize)

    // первичная инициализация
    onLoadedMeta()

    // Проверяем, играет ли видео уже (например, из-за autoPlay)
    // и запускаем анимацию, если оно играет
    if (!video.paused && video.readyState >= 2) {
      onPlay()
    }

    return () => {
      stopKeepAlive()
      stopRVFC()
      stopRAF()
      video.removeEventListener("loadedmetadata", onLoadedMeta)
      video.removeEventListener("loadeddata", onLoadedData)
      video.removeEventListener("play", onPlay)
      video.removeEventListener("playing", onPlay)
      video.removeEventListener("pause", onPause)
      video.removeEventListener("ended", onPause)
      window.removeEventListener("resize", onResize)
    }
  }, [videoRefOrElement])

  return { canvasRef }
}
