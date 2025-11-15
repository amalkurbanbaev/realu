"use client"

import { useLocale, useTranslations } from "next-intl"

import { FOOTER_LINKS } from "@/constants/links"
import { Link } from "@/i18n/navigation"

export const Footer = () => {
  return (
    <footer className="container z-50 grid grid-cols-1 gap-4 py-8 sm:gap-6 md:grid-cols-3 md:gap-0 md:py-6">
      <FooterLinks />
      <FooterCopy />
      <FooterContact />
    </footer>
  )
}
// TODO: добавить ссылку на App Store (кнопка)

const FooterLinks = () => {
  const tFooter = useTranslations("footer.links")
  return (
    <ul className="flex flex-col items-center gap-2 text-center text-muted-foreground text-xs sm:gap-3 md:max-w-[280px] md:flex-row md:flex-wrap md:justify-start md:gap-2">
      {FOOTER_LINKS.map((link) => (
        <li key={link.translationKey}>
          <Link href={link.href} className="hover:underline">
            {tFooter(link.translationKey)}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const FooterContact = () => {
  return (
    <div className="text-center md:text-right">
      <Link
        href="mailto:support@lotofus.co"
        className="font-medium text-muted-foreground text-sm hover:underline sm:text-base md:font-normal md:text-xs"
      >
        support@lotofus.co
      </Link>
    </div>
  )
}

const FooterCopy = () => {
  const locale = useLocale()
  const currentYear = new Date().getFullYear()
  return (
    <div className="flex flex-col items-center gap-1 text-center text-muted-foreground text-xs md:items-center">
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
//     <nav className="flex items-center gap-4 md:justify-end">
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
