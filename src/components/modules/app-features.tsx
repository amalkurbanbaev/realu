import Image from "next/image"
import { getTranslations } from "next-intl/server"

import type { AppFeature } from "@/types/entities"

import { Typography } from "../ui/typography"
import { GlowCard } from "./glow-card"

type FeatureCarouselProps = {
  features: AppFeature[]
  locale: "ru" | "en"
}

export async function AppFeatures({ features, locale }: FeatureCarouselProps) {
  const t = await getTranslations({ locale, namespace: "home-page" })

  return (
    <div className="container max-md:mb-24">
      <Typography variant="headline-1" as="div" className="relative z-10 mb-8 text-center">
        {t("layout.features.title")}
      </Typography>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <GlowCard key={f.title}>
            <Image width={64} height={64} src="/icons/star.svg" alt={f.title} className="mx-auto size-14 scale-200 pb-1" />
            <Typography variant="headline-3" as="h4" className="mt-auto">
              {f.title}
            </Typography>

            <Typography variant="body-2" as="p" className="mt-2">
              {f.description}
            </Typography>
          </GlowCard>
        ))}
      </div>
    </div>
  )
}
