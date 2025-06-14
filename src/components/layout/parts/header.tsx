"use client"

import { AppleButton } from "@/components/modules/apple-button"
import { Button } from "@/components/ui/button"
import { HEADER_LINKS } from "@/constants/links"
import { useNormalizedPathname } from "@/hooks"
import { cn } from "@/lib/utils"
import { Menu, XIcon } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"

export const Header = () => {
  const pathname = useNormalizedPathname()
  const isHome = pathname === "/"
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
  }

  // useEffect(() => {
  //   if (menuOpen) document.body.classList.add("overflow-hidden!")

  //   return () => {
  //     document.body.classList.add("overflow-hidden!")
  //   }
  // }, [menuOpen])

  return (
    <header
      className={cn(
        "container inset-x-0 top-0 flex items-center justify-between py-6",
        isHome ? "fixed z-10" : "relative z-50",
      )}
    >
      <Link href="/" onClick={() => toggleMenu()}>
        <Image
          alt="Site logo"
          src="/logo.svg"
          priority
          width={119}
          height={40}
        />
      </Link>

      {/* Desktop menu */}
      <nav className="hidden md:block">
        <HeaderLinks />
      </nav>

      {/* Mobile burger */}
      <button
        onClick={() => toggleMenu()}
        className="md:hidden"
        aria-label="Toggle menu"
        type="button"
      >
        <Menu size={28} />
      </button>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-40 w-3/4 max-w-xs bg-background p-6 shadow-lg transition-transform duration-300 ease-in-out md:hidden",
          menuOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        <nav className="flex h-full flex-col justify-between">
          <Button
            variant="secondary"
            className="w-fit self-end"
            onClick={toggleMenu}
          >
            <XIcon />
          </Button>
          <HeaderLinks onClick={() => toggleMenu()} />
          <AppleButton className="mx-auto grow-0 text-center" />
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

  return (
    <ul className="flex grow flex-col items-center justify-center gap-4 font-semibold text-xl md:flex-row md:gap-x-8">
      {HEADER_LINKS.map((link) => {
        const isActive = normalizedPath === link.href
        return (
          <li
            key={link.translationKey}
            className={cn(
              "py-2 transition-opacity",
              isActive ? "opacity-50" : "opacity-100 hover:opacity-80",
            )}
          >
            <Link href={link.href} onClick={onClick}>
              {t(link.translationKey)}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
