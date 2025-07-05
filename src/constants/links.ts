import type { Messages } from "next-intl"

export type LinkKey<
  T extends keyof Messages,
  U extends keyof Messages[T],
> = keyof Messages[T][U]

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
