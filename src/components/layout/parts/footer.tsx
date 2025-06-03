"use client"

import { Button } from "@/components/ui/button"
import { FOOTER_LINKS, HEADER_LINKS } from "@/constants/links"
import { ArrowRightIcon } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const Footer = () => {
  return (
    <footer className="container flex flex-col-reverse items-start gap-6 py-6 md:grid md:grid-cols-3">
      <FooterCopy />
      <FooterLinks />
      <FooterNavLinks />
    </footer>
  )
}

const FooterCopy = () => {
  const currentYear = new Date().getFullYear()
  return (
    <div className="space-y-1 text-muted-foreground text-xs">
      <div>Dubai, UAE. MEDITOLIFE - FZCO.</div>
      <div>All rights reserved © {currentYear}</div>
    </div>
  )
}

const FooterLinks = () => {
  const tFooter = useTranslations("footer.links")
  return (
    <nav>
      <ul className="flex max-w-md flex-col flex-wrap items-start gap-x-4 gap-y-2 text-center text-muted-foreground text-xs md:flex-row md:items-center">
        {FOOTER_LINKS.map((link) => (
          <li key={link.translationKey} className="hover:underline">
            <Link href={link.href}>{tFooter(link.translationKey)}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

const FooterNavLinks = () => {
  const pathname = usePathname()
  const locale = useLocale()
  const tNav = useTranslations("header.links")
  const normalizedPath = pathname.replace(`/${locale}`, "") || "/"

  return (
    <nav className="flex items-center justify-end gap-4">
      {HEADER_LINKS.filter(
        (link) => link.href !== "/" && normalizedPath !== link.href,
      ).map((link) => {
        return (
          <Button
            key={link.href}
            asChild
            variant="secondary"
            className="min-w-fit max-w-36"
          >
            <Link href={link.href}>
              {tNav(link.translationKey)}
              <ArrowRightIcon className="ml-1 size-4" />
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}
