"use client"

import { useState } from "react"
import { XIcon } from "lucide-react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useLocale, useTranslations } from "next-intl"

import { MenuMinimalIcon } from "@/components/icons"
import { AppleButton } from "@/components/modules/apple-button"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { HEADER_LINKS } from "@/constants/links"
import { useNormalizedPathname, useScrollLockWhen } from "@/hooks"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

export const Header = () => {
  const pathname = useNormalizedPathname()
  const isHome = pathname === "/"
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
  }

  useScrollLockWhen(menuOpen)

  return (
    <header
      className={cn(
        "container inset-x-0 top-0 flex h-[var(--header-height)] items-center justify-between",
        isHome ? "absolute z-[999] md:fixed" : "relative z-50",
      )}
    >
      <Link href="/">
        <Image alt="Site logo" src="/logo.svg" priority width={96} height={32} className="h-[32px] w-[96px]" />
      </Link>

      {/* Desktop menu */}
      <nav className="hidden md:block">
        <HeaderLinks />
      </nav>

      <AppleButton className="hidden md:block" />

      {/* Mobile burger */}
      <button onClick={() => toggleMenu()} className="text-white/90 md:hidden" aria-label="Toggle menu" type="button">
        <MenuMinimalIcon />
      </button>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-full bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out md:hidden",
          menuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <nav className="flex h-full flex-col justify-center">
          <Button variant="secondary" className="size-10 w-fit self-end rounded-full" onClick={toggleMenu}>
            <XIcon />
          </Button>
          <HeaderLinks onClick={() => toggleMenu()} />
          <AppleButton className="mx-auto" />
        </nav>
      </div>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fade-in fixed inset-0 z-30 animate-in bg-black/50 backdrop-blur-xs duration-300 md:hidden"
          onClick={() => toggleMenu()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault()
              toggleMenu()
            }
          }}
        />
      )}
    </header>
  )
}

const HeaderLinks = ({ onClick }: { onClick?: () => void } = {}) => {
  const pathname = usePathname()
  const locale = useLocale()
  const t = useTranslations("header.links")

  const normalizedPath = pathname.replace(`/${locale}`, "") || "/"

  const isLinkActive = (href: string, currentPath: string): boolean => {
    if (href === "/blog") {
      return currentPath === "/blog" || currentPath.startsWith("/blog/")
    }
    return currentPath === href
  }

  return (
    <ul className="flex grow flex-col items-center justify-center gap-4 md:flex-row md:gap-x-8">
      {HEADER_LINKS.map((link) => {
        const isActive = isLinkActive(link.href, normalizedPath)
        return (
          <li key={link.translationKey} className={cn("py-2")}>
            <Link href={link.href} onClick={onClick}>
              <Typography
                variant="menu"
                className={cn("font-medium transition-colors", isActive ? "text-white " : "text-white/40 hover:text-white")}
                as="span"
              >
                {t(link.translationKey)}
              </Typography>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
