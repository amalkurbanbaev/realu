"use client"

import { useLocale, useTranslations } from "next-intl"

import { ArrowDownIcon } from "@/components/icons"
import { AppleButton } from "@/components/modules/apple-button"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { EMAIL_SUPPORT_LINK, FOOTER_LINKS } from "@/constants/links"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="container relative z-40 flex flex-col justify-between gap-4 bg-background py-8 lg:flex-row lg:items-start lg:gap-0 lg:bg-transparent lg:py-6">
      <AppleButton className="mx-auto mb-4 md:hidden" />
      <FooterLinks />
      <FooterContact />
      <FooterCopy />

      <Button
        type="button"
        variant="secondary"
        size="icon"
        className="absolute right-4 bottom-4 z-40 order-4 rotate-180 self-end lg:static"
        onClick={scrollToTop}
        aria-label="scroll-to-top"
      >
        <ArrowDownIcon className="shrink-0" />
      </Button>
    </footer>
  )
}
// TODO: добавить ссылку на App Store (кнопка)

const FooterLinks = () => {
  const tFooter = useTranslations("footer.links")
  const locale = useLocale()

  return (
    <div
      className={cn(
        "mx-auto max-w-[320px] text-center max-sm:flex max-sm:flex-col max-sm:gap-y-6 md:text-xs lg:mx-0 lg:text-left",
        locale === "ru" ? "max-w-[68ch]" : "max-w-[46ch]",
      )}
    >
      {FOOTER_LINKS.map((link, index) => (
        <Typography
          variant="caption"
          as="span"
          key={link.translationKey}
          className={cn(
            "mr-2 mb-2 inline-block whitespace-nowrap align-top font-semibold text-base text-white/60 leading-[16px] md:font-normal md:text-[12px] lg:text-white [nth-child(n+4)]:mb-0",
            index === 2 && "lg:mb-0",
            index === 3 && "lg:mb-0",
          )}
        >
          <Link href={link.href} className="hover:underline" download>
            {tFooter(link.translationKey)}
          </Link>
        </Typography>
      ))}
    </div>
  )
}

const FooterContact = () => {
  return (
    <div className="order-2 flex items-start justify-center text-center lg:order-3 lg:justify-end lg:text-right">
      <Typography variant="caption" as="span" className="font-semibold text-base md:font-normal md:text-white/60 md:text-xs">
        <Link href={`mailto:${EMAIL_SUPPORT_LINK}`} className="hover:underline">
          {EMAIL_SUPPORT_LINK}
        </Link>
      </Typography>
    </div>
  )
}

const FooterCopy = () => {
  const locale = useLocale()
  const currentYear = new Date().getFullYear()

  return (
    <div className="order-3 flex flex-col items-center gap-1 text-center text-xs max-md:mt-4 lg:order-2 lg:items-start">
      <Typography variant="caption" as="span" className="font-normal text-white/60">
        Dubai, UAE. LOTofUS L.L.C — FZ.
      </Typography>

      <Typography variant="caption" as="span" className="font-normal text-white/60">
        {locale === "ru" ? "Все права защищены" : "All rights reserved"} © {currentYear}
      </Typography>
    </div>
  )
}
