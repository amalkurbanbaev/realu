"use client"

import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"

import type { Testimonial } from "@/types/entities"

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "../ui/carousel"

type TestimonialCarouselProps = {
  testimonials: Testimonial[]
}

export function TestimonialCarousel({
  testimonials,
}: TestimonialCarouselProps) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      plugins={[Autoplay({ delay: 6000 })]}
      className="w-full"
    >
      <CarouselContent className="-ml-6 ">
        {testimonials.map((f) => (
          <CarouselItem
            key={f.author}
            className="pl-6 md:basis-1/2 lg:basis-1/3"
          >
            <div
              className="h-full rounded-3xl p-6"
              style={{
                background:
                  "linear-gradient(102.6deg, #252737 13.89%, #42366F 162.25%)",
              }}
            >
              <div className="flex flex-col gap-2 xl:flex-row xl:items-center">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: f.rating }).map((_, i) => (
                    <Image
                      // biome-ignore lint/suspicious/noArrayIndexKey: static render
                      key={i}
                      alt="star-icon"
                      src="/icons/star.svg"
                      width={24}
                      height={24}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-1.5 text-sm">
                  <h4 className="mt-auto font-semibold ">{f.author},</h4>
                  <span>{f.role}</span>
                </div>
              </div>

              <p className="mt-2.5 font-light">{f.text}</p>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselDots />
    </Carousel>
  )
}
