"use client"
import { HEADER_LINKS } from "@/constants/links"
import { useNormalizedPathname } from "@/hooks/use-normalized-pathname"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from "use-intl"

export const Header = () => {
  const pathname = useNormalizedPathname()
  const isHome = pathname === "/"

  return (
    <header
      className={cn(
        "container inset-x-0 flex w-full justify-between py-6",
        isHome ? "absolute top-0" : "",
      )}
    >
      <Link href="/">
        <Image
          alt="Site logo"
          src="/logo.svg"
          priority
          width={119}
          height={40}
        />
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
              "py-2 opacity-50",
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
