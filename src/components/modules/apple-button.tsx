import type { ComponentPropsWithoutRef } from "react"

import { cn } from "@/lib/utils"

import { AppleBadgeIcon } from "../icons/apple-badge-icon"
import { AppleBadgeMobileIcon } from "../icons/apple-badge-icon-mobile"

export function AppleButton({ className, ...props }: ComponentPropsWithoutRef<"a">) {
  return (
    <a className={cn(className)} href="https://www.apple.com" target="_blank" rel="noreferrer" {...props}>
      <AppleBadgeIcon className="hidden md:block" />
      <AppleBadgeMobileIcon className="block md:hidden" />
    </a>
  )
}
