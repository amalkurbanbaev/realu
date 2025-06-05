import { cn } from "@/lib/utils"
import Image from "next/image"
import type { ComponentPropsWithoutRef } from "react"

export function AppleButton({
  className,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  return (
    <a
      className={cn(
        "flex max-h-12 items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm",
        className,
      )}
      href="https://www.apple.com"
      target="_blank"
      rel="noreferrer"
      {...props}
    >
      <Image src="/apple-logo.svg" alt="apple logo" width={20} height={24} />
      <span className="font-bold text-black">App Store</span>
    </a>
  )
}
