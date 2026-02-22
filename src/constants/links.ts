import type { Messages } from "next-intl"

export type LinkKey<T extends keyof Messages, U extends keyof Messages[T]> = keyof Messages[T][U]

export type LinkType<T extends keyof Messages, U extends keyof Messages[T]> = {
  translationKey: LinkKey<T, U>
  href: string
}

export const HEADER_LINKS: LinkType<"header", "links">[] = [
  { translationKey: "app", href: "/" },
  { translationKey: "blog", href: "/blog" },
  { translationKey: "about", href: "/about" },
  { translationKey: "help", href: "/help" },
]

export const FOOTER_LINKS: LinkType<"footer", "links">[] = [
  { translationKey: "user-agreement", href: "/" },
  { translationKey: "privacy-policy", href: "/" },
  { translationKey: "email-subscription", href: "/" },
  { translationKey: "cookies", href: "/" },
]

export const EMAIL_SUPPORT_LINK = "support@lotofus.co"
export const EMAIL_CONTACT_LINK = "contact@lotofus.co"

export const APP_STORE_LINK = "https://apps.apple.com/" // todo: add app store link
export const GOOGLE_PLAY_LINK = "https://play.google.com/" // todo: add google play link
