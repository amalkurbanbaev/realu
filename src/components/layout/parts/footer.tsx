"use client"

import { Button } from "@/components/ui/button"
import { FOOTER_LINKS, HEADER_LINKS } from "@/constants/links"
import { ArrowRightIcon } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { usePathname } from "next/navigation"

export const Footer = () => {
  return (
    <footer className="z-50">
      <section className="container flex flex-col-reverse gap-10 py-6 md:grid md:grid-cols-5 md:items-center md:gap-6">
        <FooterCopy />
        <FooterLinks />
        <FooterNavLinks />
      </section>
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
    <nav className="col-span-3">
      <ul className="flex h-full max-w-full flex-col flex-wrap items-start justify-center gap-x-4 gap-y-2 text-center text-muted-foreground text-xs md:flex-row md:items-center">
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
    <nav className="flex items-center gap-4 md:justify-end">
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
