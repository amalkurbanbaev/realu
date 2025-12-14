"use client"

import { ArrowUpIcon } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { AppleButton } from "@/components/modules/apple-button"
import { Button } from "@/components/ui/button"
import { Typography } from "@/components/ui/typography"
import { FOOTER_LINKS } from "@/constants/links"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="container z-50 flex flex-col justify-between gap-4 bg-background py-8 lg:flex-row lg:items-start lg:gap-0 lg:bg-transparent lg:py-6">
      <AppleButton className="mx-auto mb-4 md:hidden" />
      <FooterLinks />
      <FooterContact />
      <FooterCopy />

      <Button variant="secondary" className="order-4 size-10 self-end rounded-full" onClick={scrollToTop}>
        <ArrowUpIcon className="size-4" />
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
        "mx-auto max-w-[320px] text-center max-sm:flex max-sm:flex-col max-sm:gap-y-4 md:text-xs lg:mx-0 lg:text-left",
        locale === "ru" ? "max-w-[68ch]" : "max-w-[46ch]",
      )}
    >
      {FOOTER_LINKS.map((link) => (
        <Typography
          variant="caption"
          as="span"
          key={link.translationKey}
          className="mr-2 mb-2 inline-block whitespace-nowrap align-top font-semibold text-base text-white/60 md:font-normal lg:text-[12px] lg:text-white"
        >
          <Link href={link.href} className="hover:underline">
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
        <Link href="mailto:support@lotofus.co" className="hover:underline">
          support@lotofus.co
        </Link>
      </Typography>
    </div>
  )
}

const FooterCopy = () => {
  const locale = useLocale()
  const currentYear = new Date().getFullYear()
  return (
    <div className="order-3 flex flex-col items-center gap-1 text-center text-xs max-md:mt-2 lg:order-2 lg:items-start">
      <Typography variant="caption" as="span" className="font-normal text-white/60">
        Dubai, UAE. LOTOFUS L.L.C — FZ.
      </Typography>

      <Typography variant="caption" as="span" className="font-normal text-white/60">
        {locale === "ru" ? "Все права защищены" : "All rights reserved"} © {currentYear}
      </Typography>
    </div>
  )
}

// const FooterNavLinks = () => {
//   const pathname = usePathname()
//   const locale = useLocale()
//   const tNav = useTranslations("header.links")
//   const normalizedPath = pathname.replace(`/${locale}`, "") || "/"

//   return (
//     <nav className="flex items-center gap-4 sm:justify-end">
//       {HEADER_LINKS.filter((link) => link.href !== "/" && normalizedPath !== link.href).map((link) => {
//         return (
//           <Button key={link.href} asChild variant="secondary" className="min-w-fit max-w-36">
//             <Link href={link.href}>
//               {tNav(link.translationKey)}
//               <ArrowRightIcon className="ml-1 size-4" />
//             </Link>
//           </Button>
//         )
//       })}
//     </nav>
//   )
// }
