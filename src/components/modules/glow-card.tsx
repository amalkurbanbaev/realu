import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type GlowCardProps = {
  children: ReactNode
  className?: string
}

export function GlowCard({ children, className }: GlowCardProps) {
  return (
    <div className={cn("relative isolate h-full", className)}>
      <div className="h-full border-gradient px-8 py-8 text-center md:px-3 md:py-8">{children}</div>
    </div>
  )
}
