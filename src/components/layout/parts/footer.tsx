"use client"

import { useTranslations } from "next-intl"

import { FOOTER_LINKS } from "@/constants/links"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

export const Footer = () => {
  return (
    <footer className="container z-50 grid grid-cols-3 gap-0 py-6">
      <FooterLinks />
      <FooterCopy />
      <FooterContact />
    </footer>
  )
}

const FooterCopy = () => {
  const currentYear = new Date().getFullYear()
  return (
    <div className="space-y-1 text-center text-muted-foreground text-xs">
      <div>Dubai, UAE. LOTofUS L.L.C — FZ.</div>
      <div>All rights reserved © {currentYear}</div>
    </div>
  )
}

const FooterLinks = () => {
  const tFooter = useTranslations("footer.links")
  return (
    <ul className={cn("text-center text-xs", "flex w-full max-w-[280px] flex-wrap gap-2")}>
      {FOOTER_LINKS.map((link) => (
        <li key={link.translationKey} className="hover:underline">
          <Link href={link.href}>{tFooter(link.translationKey)}</Link>
        </li>
      ))}
    </ul>
  )
}

const FooterContact = () => {
  return (
    <div className="text-right text-muted-foreground text-xs">
      <Link href="mailto:support@lotofus.co">support@lotofus.co</Link>
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
