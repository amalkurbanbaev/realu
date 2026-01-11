"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

import { Skeleton } from "./skeleton"

interface ProgressiveImageProps extends ImageProps {
  containerClassName?: string
  skeletonClassName?: string
}

export function ProgressiveImage({ containerClassName, className, skeletonClassName, onLoad, ...props }: ProgressiveImageProps) {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false)
    onLoad?.(e)
  }

  return (
    <div className={containerClassName}>
      {<Skeleton className={`absolute inset-0 size-full ${skeletonClassName ?? ""}`} />}
      <Image
        {...props}
        className={`transition-all duration-300 group-hover:scale-105 ${isLoading ? "opacity-0" : "opacity-100"} ${className ?? ""}`}
        onLoad={handleLoad}
      />
    </div>
  )
}
