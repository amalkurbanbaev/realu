import type { ReactNode } from "react"

import { cn } from "@/lib/utils"

type GlowCardProps = {
  children: ReactNode
  className?: string
}

export function GlowCard({ children, className }: GlowCardProps) {
  return (
    <div className={cn("relative isolate h-full", className)}>
      <div className="h-full border-gradient p-6 text-center">{children}</div>
    </div>
  )
}
