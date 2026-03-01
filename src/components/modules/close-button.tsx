"use client"

import { XIcon } from "lucide-react"
import { useLocale } from "next-intl"

import { Link, useRouter } from "@/i18n/navigation"

type CloseButtonProps = {
  className?: string
} & (
  | { href: string; onClick?: never; useHistory?: never }
  | { onClick: () => void; href?: never; useHistory?: never }
  | { useHistory: true; fallbackHref: string; onClick?: never; href?: never }
)

export const CloseButton = ({ className = "", ...props }: CloseButtonProps) => {
  const router = useRouter()
  const locale = useLocale()

  const baseClassName = `my-6 ml-auto block size-10 rounded-full bg-white/10 p-2 transition-colors hover:bg-muted ${className}`.trim()

  const content = (
    <>
      <XIcon className="size-6" />
      <span className="sr-only">{locale === "ru" ? "Закрыть" : "Close"}</span>
    </>
  )

  if ("useHistory" in props && props.useHistory) {
    const handleClick = () => {
      if (window.history.length > 1) {
        router.back()
      } else {
        router.push(props.fallbackHref)
      }
    }

    return (
      <button type="button" onClick={handleClick} className={baseClassName}>
        {content}
      </button>
    )
  }

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={baseClassName}>
        {content}
      </Link>
    )
  }

  return (
    <button type="button" onClick={props.onClick} className={baseClassName}>
      {content}
    </button>
  )
}
