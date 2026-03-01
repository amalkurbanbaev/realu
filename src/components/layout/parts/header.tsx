/** biome-ignore-all lint/a11y/useSemanticElements: ok */
"use client"

import { useEffect, useState } from "react"
import { XIcon } from "lucide-react"
import Image from "next/image"
import { useTranslations } from "next-intl"

import { MenuMinimalIcon } from "@/components/icons"
import { AppleButton } from "@/components/modules/apple-button"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { HEADER_LINKS } from "@/constants/links"
import { useNormalizedPathname, useScrollLockWhen } from "@/hooks"
import { Link, usePathname, useRouter } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

export const Header = () => {
  const pathname = useNormalizedPathname()
  const isHome = pathname === "/"
  const [menuOpen, setMenuOpen] = useState(false)

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname — намеренная зависимость для закрытия меню при навигации
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

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
          <HeaderLinks />
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

const HeaderLinks = () => {
  const pathname = usePathname()
  const router = useRouter()

  const t = useTranslations("header.links")
  const [pressedLink, setPressedLink] = useState<string | null>(null)

  const isLinkActive = (href: string, currentPath: string): boolean => {
    if (href === "/blog") {
      return currentPath === "/blog" || currentPath.startsWith("/blog/")
    }
    return currentPath === href
  }

  return (
    <ul className="flex grow flex-col items-center justify-center gap-4 md:flex-row md:gap-x-8">
      {HEADER_LINKS.map((link) => {
        const isActive = isLinkActive(link.href, pathname)
        const isPressed = pressedLink === link.href

        return (
          <li key={link.translationKey} className="w-full py-2 text-center">
            <Link
              href={link.href}
              onClick={(e) => {
                e.preventDefault()
                setPressedLink(link.href)
                setTimeout(() => {
                  setPressedLink(null)
                  router.push(link.href) // навигация после анимации
                }, 150)
              }}
              style={{
                transform: isPressed ? "scale(0.93)" : "scale(1)",
                opacity: isPressed ? 0.5 : 1,
                transition: "transform 200ms ease, opacity 200ms ease",
                display: "block",
              }}
            >
              <Typography
                variant="menu"
                className={cn("select-none font-medium", isActive ? "text-white" : "text-white/40 hover:text-white")}
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
