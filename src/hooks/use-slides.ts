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
    image: el.useVideo ? undefined : `/screenshots/${locale}/${el.id}.png`,
    video: el.useVideo ? `/video/${el.id}.mp4` : undefined,
    withGradient: !el.useVideo,
  }))

  return slides
}
