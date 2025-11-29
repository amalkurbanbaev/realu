import { useLocale, useTranslations } from "next-intl"

import { getRawSlides } from "@/constants/slides"
import type { Slide } from "@/types/entities"

export const useSlides = (): Slide[] => {
  const t = useTranslations("home-page.layout")
  const locale = useLocale()

  const slides = getRawSlides(locale).map((el, i) => ({
    ...el,
    title: t(`slides.${i}.title`),
    description: t(`slides.${i}.description`),
    image: `/screenshots/${locale}/${el.id}.png`,
  }))

  return slides
}
