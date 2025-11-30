"use client"

import { ArrowUpIcon } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { FOOTER_LINKS } from "@/constants/links"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="container z-50 flex flex-col justify-between gap-4 py-8 lg:flex-row lg:gap-0 lg:py-6">
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
        "mx-auto max-w-[320px] text-center text-white/60 text-xs lg:mx-0 lg:text-left",
        locale === "ru" ? "max-w-[68ch]" : "max-w-[46ch]",
      )}
    >
      {FOOTER_LINKS.map((link) => (
        <span key={link.translationKey} className="mr-2 mb-2 inline-block whitespace-nowrap align-top">
          <Link href={link.href} className="hover:underline">
            {tFooter(link.translationKey)}
          </Link>
        </span>
      ))}
    </div>
  )
}

const FooterContact = () => {
  return (
    <div className="order-2 text-center lg:order-3 lg:text-right">
      <Link href="mailto:support@lotofus.co" className="font-medium text-foreground text-xs hover:underline lg:font-normal lg:text-white/60">
        support@lotofus.co
      </Link>
    </div>
  )
}

const FooterCopy = () => {
  const locale = useLocale()
  const currentYear = new Date().getFullYear()
  return (
    <div className="order-3 flex flex-col items-center gap-1 text-center text-white/80 text-xs lg:order-2">
      <div>Dubai, UAE. LOTOFUS L.L.C — FZ.</div>
      <div>
        {locale === "ru" ? "Все права защищены" : "All rights reserved"} © {currentYear}
      </div>
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
