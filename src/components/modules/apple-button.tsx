import type { ComponentPropsWithoutRef } from "react"
import Image from "next/image"

import { cn } from "@/lib/utils"

export function AppleButton({
  className,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className={cn(className)}
      href="https://www.apple.com"
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      <Image
        src="/app-store-badge.svg"
        alt="apple logo"
        width={128}
        height={48}
      />
    </a>
  )
}
