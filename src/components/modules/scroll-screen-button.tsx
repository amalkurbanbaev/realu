"use client"

import { cn } from "@/lib/utils"
import type { ComponentPropsWithoutRef } from "react"
import { ArrowDownIcon } from "../icons"
import { Button } from "../ui/button"

type Props = ComponentPropsWithoutRef<"button">

export function ScrollScreenButton({ className, ...props }: Props) {
  const handleScrollScreen = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <Button
      aria-label="scroll-down"
      tabIndex={0}
      variant="secondary"
      className={cn(
        "absolute right-10 bottom-10 z-50 flex size-10 cursor-pointer flex-col items-center justify-center rounded-full",
        className,
      )}
      onClick={handleScrollScreen}
      {...props}
    >
      <ArrowDownIcon />
    </Button>
  )
}
