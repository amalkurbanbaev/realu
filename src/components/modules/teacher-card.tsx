import Image from "next/image"

import { cn } from "@/lib/utils"

import { Typography } from "../ui/typography"

type TeacherCardProps = {
  imageSrc: string
  alt: string
  text: string
  variant: "en" | "ru"
  side?: "left" | "right"
  isActive?: boolean
  animEnabled?: boolean
}

export function TeacherCard({ imageSrc, alt, text, variant, side = "left", isActive = true, animEnabled = true }: TeacherCardProps) {
  if (variant === "en") {
    return (
      <div
        className={cn(
          "md:-rotate-[1.5deg] relative flex-1 overflow-clip rounded-4xl bg-primary/20",
          animEnabled ? "opacity-100" : "opacity-0",
          isActive && animEnabled && "fade-in zoom-in-95 animate-in duration-[1.5s] ease-in-out",
          side === "left" && "md:-rotate-[1.5deg] slide-in-from-left-10",
          side === "right" && "slide-in-from-right-10 md:rotate-[1.5deg]",
          "min-h-[470px] w-full lg:h-[531px] lg:w-[596px]",
        )}
      >
        <Image
          src={imageSrc}
          alt={alt}
          width={596}
          height={531}
          className={cn(
            "pointer-events-none h-full w-full select-none object-cover max-md:scale-125",
            side === "left" && "origin-top-left",
            side === "right" && "origin-top-right",
          )}
        />
        <Image src="/teachers/noise.png" alt="Noise" fill className="pointer-events-none select-none" />
        <Typography
          variant="body-2"
          as="p"
          className={cn(
            "absolute bottom-8 max-w-[280px] text-center text-sm text-white max-md:inset-x-0 max-md:mx-auto md:bottom-14",
            side === "left" && "right-8 md:max-w-[291px]",
            side === "right" && "left-8 md:max-w-[259px]",
          )}
        >
          {text}
        </Typography>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative overflow-clip rounded-4xl bg-primary/20",
        animEnabled ? "opacity-100" : "opacity-0",
        isActive && animEnabled && "fade-in zoom-in-90 animate-in duration-[1.5s] ease-in-out",
        "h-[349px] w-auto lg:h-[530] lg:w-[596]",
      )}
    >
      <Image src={imageSrc} alt={alt} width={596} height={530} className="pointer-events-none select-none" />
      <Image src="/teachers/noise.png" alt="Noise" fill className="pointer-events-none select-none" />
      <Typography variant="body-2" as="p" className="-translate-x-1/2 absolute bottom-14 left-1/2 max-w-[291px] text-center text-white">
        {text}
      </Typography>
    </div>
  )
}
