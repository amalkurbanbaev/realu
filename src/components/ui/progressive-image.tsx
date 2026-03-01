import Image, { type ImageProps } from "next/image"

import { cn } from "@/lib/utils"

interface ProgressiveImageProps extends ImageProps {
  containerClassName?: string
}

export function ProgressiveImage({ containerClassName, className, fill, blurDataURL, ...props }: ProgressiveImageProps) {
  const image = (
    <Image {...props} fill={fill} placeholder={blurDataURL ? "blur" : "empty"} blurDataURL={blurDataURL} className={cn("object-cover", className)} />
  )

  if (fill && !containerClassName) return image

  return <div className={cn("relative", containerClassName)}>{image}</div>
}
