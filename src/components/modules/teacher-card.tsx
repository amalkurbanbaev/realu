import Image from "next/image"

import { cn } from "@/lib/utils"

import { Typography } from "../ui/typography"

type TeacherCardProps = {
  imageSrc?: string
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
          "md:-rotate-[1.5deg] relative flex-1 overflow-clip rounded-4xl bg-primary/20 max-md:max-w-[320px]",
          animEnabled ? "opacity-100" : "opacity-0",
          isActive && animEnabled && "fade-in zoom-in-95 animate-in duration-[1.5s] ease-in-out",
          side === "left" && "md:-rotate-[1.5deg] slide-in-from-left-10",
          side === "right" && "slide-in-from-right-10 md:rotate-[1.5deg]",
          "h-full min-h-[470px] w-full lg:h-[531px] lg:w-[596px]",
        )}
      >
        {imageSrc && (
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
        )}
        <Image src="/teachers/noise.png" alt="Noise" fill className="pointer-events-none select-none" />
        <Typography
          variant="body-2"
          as="p"
          className={cn(
            "absolute bottom-8 max-w-[280px] text-center text-sm text-white max-md:inset-x-0 max-md:mx-auto md:bottom-14",
            side === "left" && "right-8 md:max-w-[291px] md:rotate-[1.5deg]",
            side === "right" && "md:-rotate-[1.5deg] left-8 md:max-w-[259px]",
          )}
        >
          {text}
        </Typography>
      </div>
    )
  }

  return (
    <div className="container h-[507px] max-md:max-w-[320px] max-md:px-0">
      <div
        className={cn(
          "md:-rotate-3 slide-in-from-bottom-10 relative size-full overflow-clip rounded-4xl bg-primary/20 md:rounded-[48px]",
          animEnabled ? "opacity-100" : "opacity-0",
          isActive && animEnabled && "fade-in zoom-in-95 animate-in duration-[1.5s] ease-in-out",
        )}
      >
        {/* Mobile version */}
        <Image
          src="/teachers/tati-frost-image-mobile.png"
          alt={alt}
          className={cn("pointer-events-none block select-none md:hidden")}
          unoptimized
          fill
        />

        {/* Desktop version */}
        <Image
          src="/teachers/tati-frost-image-desktop.png"
          alt={alt}
          className={cn("pointer-events-none hidden select-none object-contain object-top-left md:block")}
          unoptimized
          fill
        />

        {/* Noise */}
        <Image src="/teachers/noise.png" alt="Noise" fill className="pointer-events-none size-full select-none" />
        <Typography
          variant="body-2"
          as="p"
          className={cn(
            "absolute text-sm text-white md:rotate-3",
            "md:right-[5%] md:bottom-30 md:max-w-[480px] md:text-left",
            "max-md:inset-x-0 max-md:bottom-8 max-md:mx-auto max-md:w-[280px] max-md:text-center",
          )}
        >
          {text}
        </Typography>
      </div>
    </div>
  )
}
