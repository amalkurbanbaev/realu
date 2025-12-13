import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type GlowCardProps = {
  children: ReactNode
  className?: string
}

export function GlowCard({ children, className }: GlowCardProps) {
  return (
    <div className={cn("relative isolate h-full", className)}>
      <div className="h-full border-gradient px-3 py-8 text-center">{children}</div>
    </div>
  )
}
