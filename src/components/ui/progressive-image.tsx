"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

import { cn } from "@/lib/utils"

import { Skeleton } from "./skeleton"

interface ProgressiveImageProps extends ImageProps {
  containerClassName?: string
  skeletonClassName?: string
}

export function ProgressiveImage({ containerClassName, className, skeletonClassName, onLoad, fill, ...props }: ProgressiveImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false)
    onLoad?.(e)
  }

  const image = (
    <>
      {isLoading && <Skeleton className={cn("absolute inset-0 size-full", skeletonClassName)} />}
      <Image
        {...props}
        fill={fill}
        className={cn("transition-opacity duration-300", isLoading ? "opacity-0" : "opacity-100", className)}
        onLoad={handleLoad}
      />
    </>
  )

  // Если fill без containerClassName — родитель снаружи уже positioned, не добавляем лишний div
  if (fill && !containerClassName) return image

  return <div className={cn("relative", containerClassName)}>{image}</div>
}
