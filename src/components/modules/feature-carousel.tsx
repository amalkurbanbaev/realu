import type { AppFeature } from "@/types/entities"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "../ui/carousel"
import { GlowCard } from "./glow-card"

type FeatureCarouselProps = {
  features: AppFeature[]
}

export function FeatureCarousel({ features }: FeatureCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-6 ">
        {features.map((f) => (
          <CarouselItem
            key={f.title}
            className="pl-6 md:basis-1/2 lg:basis-1/3"
          >
            <GlowCard>
              <Image
                width={52}
                height={52}
                src={f.icon}
                alt={f.title}
                className="mb-4"
              />
              <h4 className="mt-auto font-medium text-lg">{f.title}</h4>
              <p className="mt-2 text-muted-foreground text-sm">
                {f.description}
              </p>
            </GlowCard>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselDots />
    </Carousel>
  )
}
