import { useLocale, useTranslations } from "next-intl"

import { RAW_SLIDES } from "@/constants/slides"

export const useSlides = () => {
  const t = useTranslations("home-page.layout")
  const locale = useLocale()

  const slides = RAW_SLIDES.map((el, i) => ({
    ...el,
    title: t(`slides.${i}.title`),
    description: t(`slides.${i}.description`),
    image: `/screenshots/${locale}/${el.id}.png`,
  }))

  return slides
}
