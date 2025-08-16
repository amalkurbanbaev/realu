"use client"

import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

import { ArrowDownIcon } from "../icons"
import { Button } from "../ui/button"

type Props = ComponentPropsWithoutRef<"button"> & {
  /** id секции, к которой нужно прокрутить */
  targetId?: string
  /** дополнительный сдвиг по Y, если нужно (например, учесть фиксированный header) */
  offset?: number
}

export function ScrollScreenButton({
  className,
  targetId,
  offset = 0,
  ...props
}: Props) {
  const handleScrollScreen = () => {
    if (targetId) {
      const el = document.getElementById(targetId)
      if (el) {
        // прокрутка строго к началу следующей секции
        const rect = el.getBoundingClientRect()
        const y = Math.max(0, Math.round(window.scrollY + rect.top + offset))
        window.scrollTo({ top: y, behavior: "smooth" })
        return
      }
    }

    // фолбэк, если targetId не передан/не найден
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
        "flex size-10 cursor-pointer flex-col items-center justify-center rounded-full",
        className,
      )}
      onClick={handleScrollScreen}
      {...props}
    >
      <ArrowDownIcon />
    </Button>
  )
}
