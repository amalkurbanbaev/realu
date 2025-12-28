"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

type NoiseOverlayProps = {
  className?: string
  opacity?: number
  scale?: number
}

export function NoiseOverlay({ className, opacity = 0.02, scale = 1 }: NoiseOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Получаем размеры контейнера
    const updateCanvas = () => {
      const container = canvas.parentElement
      if (!container) return

      const rect = container.getBoundingClientRect()
      // Canvas должен быть больше, чтобы после scale заполнять контейнер
      const width = Math.ceil(rect.width * scale)
      const height = Math.ceil(rect.height * scale)

      // Устанавливаем размеры canvas
      canvas.width = width
      canvas.height = height

      // Генерируем шум (менее контрастный)
      const imageData = ctx.createImageData(width, height)
      const data = imageData.data

      for (let i = 0; i < data.length; i += 4) {
        // Центрируем шум вокруг среднего значения и уменьшаем контраст
        const noise = (Math.random() - 0.5) * 40 + 128
        const value = Math.max(0, Math.min(255, noise))
        data[i] = value // R
        data[i + 1] = value // G
        data[i + 2] = value // B
        data[i + 3] = opacity * 255 // A
      }

      ctx.putImageData(imageData, 0, 0)
    }

    updateCanvas()

    // Обновляем при изменении размера окна
    const resizeObserver = new ResizeObserver(() => {
      updateCanvas()
    })

    const parentElement = canvas.parentElement
    if (parentElement) {
      resizeObserver.observe(parentElement)
    }

    return () => {
      resizeObserver.disconnect()
    }
  }, [opacity, scale])

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full select-none", className)}
      style={scale !== 1 ? { transform: `scale(${scale})`, transformOrigin: "center" } : undefined}
    />
  )
}
