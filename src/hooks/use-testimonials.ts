import { useLocale } from "next-intl"

export function useTestimonials() {
  const locale = useLocale()

  const data =
    locale === "ru"
      ? require("@/constants/testimonials/ru").testimonials
      : require("@/constants/testimonials/en").testimonials

  return data
}
