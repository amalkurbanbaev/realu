import { cn } from "@/lib/utils"
import Image from "next/image"

type GradientBackgroundProps = {
  position: "top" | "bottom"
}

export function GradientBackground({ position }: GradientBackgroundProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0",
        position === "top"
          ? "top-0 z-0 size-full"
          : "-z-10 bottom-0 h-[300px] w-full object-cover object-bottom",
      )}
    >
      <Image
        src={
          position === "top"
            ? "/gradients/header-gradient.png"
            : "/gradients/footer-gradient.png"
        }
        alt={`gradient-${position}`}
        fill
      />
    </div>
  )
}
