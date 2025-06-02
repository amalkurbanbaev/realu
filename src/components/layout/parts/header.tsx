"use client"
import { HEADER_LINKS } from "@/constants/links"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from "use-intl"

export const Header = () => {
  return (
    <header className="container flex justify-between py-6">
      <Link href="/">
        <Image alt="Site logo" src="/logo.svg" width={119} height={40} />
      </Link>

      <nav>
        <HeaderLinks />
      </nav>
    </header>
  )
}

const HeaderLinks = () => {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations("header.links")

  const normalizedPath = pathname.replace(`/${locale}`, "") || "/"

  return (
    <ul className="flex gap-x-8 font-medium text-xl">
      {HEADER_LINKS.map((link) => {
        const isActive = normalizedPath === link.href
        return (
          <li
            key={link.translationKey}
            className={cn(
              "px-4 py-2 opacity-50",
              isActive ? "opacity-50" : "opacity-100 hover:opacity-80",
            )}
          >
            <Link href={link.href}>{t(link.translationKey)}</Link>
          </li>
        )
      })}
    </ul>
  )
}
