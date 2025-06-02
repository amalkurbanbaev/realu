"use client"

import { Button } from "@/components/ui/button"
import { FOOTER_LINKS } from "@/constants/links"
import { ArrowRightIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import Link from "next/link"

export const Footer = () => {
  const t = useTranslations("footer.links")

  return (
    <footer className="container flex flex-col gap-6 py-6 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1 text-muted-foreground text-xs">
        <div>Dubai, UAE. MEDITOLIFE - FZCO.</div>
        <div>All rights reserved © 2025</div>
      </div>

      <FooterLinks />

      <nav className="flex items-center justify-center gap-4">
        <Button asChild variant="outline">
          <Link href="/about">
            {t("about")} <ArrowRightIcon className="ml-1 size-4" />
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/help">
            {t("help")} <ArrowRightIcon className="ml-1 size-4" />
          </Link>
        </Button>
      </nav>
    </footer>
  )
}

const FooterLinks = () => {
  const t = useTranslations("footer.links")

  return (
    <nav>
      <ul className="grid grid-cols-2 gap-4 text-center text-muted-foreground text-xs">
        {FOOTER_LINKS.map((link) => (
          <li key={link.translationKey} className="hover:underline">
            <Link href={link.href}>{t(link.translationKey)}</Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
