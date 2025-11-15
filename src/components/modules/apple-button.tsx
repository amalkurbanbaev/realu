import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

import { AppleBadgeIcon } from "../icons/apple-badge-icon"

export function AppleButton({ className, ...props }: ComponentPropsWithoutRef<"a">) {
  return (
    <a className={cn(className)} href="https://www.apple.com" target="_blank" rel="noreferrer" {...props}>
      <AppleBadgeIcon />
    </a>
  )
}
