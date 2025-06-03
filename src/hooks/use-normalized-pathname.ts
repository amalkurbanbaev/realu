import { useLocale } from "next-intl"
import { usePathname } from "next/navigation"

export function useNormalizedPathname() {
  const pathname = usePathname()
  const locale = useLocale()

  const normalizedPath = pathname.replace(`/${locale}`, "") || "/"
  return normalizedPath
}
