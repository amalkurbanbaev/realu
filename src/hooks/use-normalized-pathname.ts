import { usePathname } from "next/navigation"
import { useLocale } from "next-intl"

export function useNormalizedPathname() {
  const pathname = usePathname()
  const locale = useLocale()

  const normalizedPath = pathname.replace(`/${locale}`, "") || "/"
  return normalizedPath
}
