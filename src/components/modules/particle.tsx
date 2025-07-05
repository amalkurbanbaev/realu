import { cn } from "@/lib/utils" // если у тебя есть утиль cn()
import Image from "next/image"

interface ParticleProps {
  src: string
  className?: string
  width?: number
  height?: number
  alt?: string
}

export function Particle({
  src,
  className,
  width = 32,
  height = 32,
  alt = "particle",
}: ParticleProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        "pointer-events-none absolute left-0 scale-110 select-none",
        className,
      )}
      draggable={false}
    />
  )
}
