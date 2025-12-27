import { useLocale, useTranslations } from "next-intl"

import { getRawSlides } from "@/constants/slides"
import type { Slide } from "@/types/entities"

export const useSlides = (): Slide[] => {
  const t = useTranslations("home-page.layout")
  const locale = useLocale()

  const slides = getRawSlides(locale).map((el, i) => {
    const slideType = el.type || (el.id === "teachers" ? "teachers" : el.useVideo ? "video" : "image")

    return {
      ...el,
      type: slideType,
      title: t(`slides.${i}.title`),
      description: t(`slides.${i}.description`),
      image: slideType === "image" ? `/screenshots/${locale}/${el.id}.png` : undefined,
      video: slideType === "video" ? `/video/${el.id}.mp4` : undefined,
      withGradient: slideType !== "video",
    }
  })

  return slides
}
