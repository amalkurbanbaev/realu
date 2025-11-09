import Image from "next/image"

import type { AppFeature } from "@/types/entities"

import { GlowCard } from "./glow-card"

type FeatureCarouselProps = {
  features: AppFeature[]
}

export async function AppFeatures({ features }: FeatureCarouselProps) {
  return (
    <div className="container">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <GlowCard key={f.title}>
            <Image width={64} height={64} src="/icons/star.svg" alt={f.title} className="mx-auto size-14 scale-200 pb-1" />
            <h4 className="mt-auto font-bold text-base">{f.title}</h4>
            <p className="mt-2 text-muted-foreground text-sm">{f.description}</p>
          </GlowCard>
        ))}
      </div>
    </div>
  )
}
