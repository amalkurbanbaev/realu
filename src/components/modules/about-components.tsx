"use client"

import type { ComponentPropsWithoutRef, CSSProperties } from "react"
import Image from "next/image"
import { useTranslations } from "use-intl"

import { cn } from "@/lib/utils"
import type { AboutExpert, AboutSection } from "@/types/entities"

import { Typography } from "../ui/typography"

type AboutContentProps = {
  sections?: AboutSection
}

export const AboutContent = ({ sections }: AboutContentProps) => {
  const t = useTranslations("about-page.layout")
  return (
    <div className="flex max-w-[720px] flex-col gap-8 pb-10 lg:gap-12">
      <Typography variant="headline-2" className="font-medium text-xl lg:hidden">
        {t("title")}
      </Typography>

      {sections?.map((section) => {
        if (section.id === "approach") {
          return <ApproachContent key={section.id} section={section} />
        }

        if (section.id === "experts") {
          return <ExpertsContent key={section.id} section={section} />
        }
      })}
    </div>
  )
}

const ApproachContent = ({ section }: { section: AboutSection[0] }) => {
  return (
    <div className="[&_p]:text-white" id="approach">
      <Typography variant="headline-2" className="mb-6 max-lg:text-sm lg:mb-8 lg:font-medium">
        {section.title}
      </Typography>

      <Typography variant="body-1" className="mb-6 lg:font-medium">
        {section["text-1"]}
      </Typography>

      <div className="mb-8 flex flex-col gap-2">
        {section["cards-1"].map((card) => (
          <div
            key={card.title}
            className="flex flex-col items-start justify-start gap-6 rounded-3xl bg-white/5 px-6 py-8 lg:flex-row lg:items-center lg:gap-7 lg:p-7"
          >
            <Image src={card.icon} alt={card.title.slice(0, 32)} width={64} height={64} className="size-12 lg:h-14" />
            <Typography variant="body-1" className="max-w-[532px] max-lg:whitespace-pre-line lg:font-medium">
              {card.title}
            </Typography>
          </div>
        ))}
      </div>

      <Typography variant="body-1" className="mb-6 lg:font-medium">
        {section["text-2"]}
      </Typography>

      <Typography variant="body-1" className="mb-6 lg:font-medium">
        {section["text-3"]}
      </Typography>

      <div className="mb-6 grid w-full grid-cols-2 gap-2 md:grid-cols-3">
        {section["cards-2"].map((card, i) => (
          <div
            key={card.title}
            className={cn("flex w-full flex-col items-center justify-center gap-2 rounded-3xl bg-white/5 p-6 lg:p-4", i === 2 && "max-md:col-span-2")}
          >
            <Image src={card.icon} alt={card.title.slice(0, 32)} width={40} height={40} />
            <Typography variant="body-1" className="max-w-[532px] text-center lg:font-medium">
              {card.title}
            </Typography>
          </div>
        ))}
      </div>

      <ul className="mb-8 list-disc space-y-6 pl-4">
        {section.points.map((point) => (
          <li key={point}>
            <Typography variant="body-1" className="lg:font-medium">
              {point}
            </Typography>
          </li>
        ))}
      </ul>

      <div className="flex w-full flex-col items-start justify-start gap-7 rounded-3xl bg-white/5 px-6 py-8 lg:flex-row lg:items-center lg:p-7">
        <Image src={section["cards-3"][0].icon} alt={section["cards-3"][0].title.slice(0, 32)} width={64} height={64} />
        <Typography variant="body-1" className="max-w-[576px] lg:font-medium">
          {section["cards-3"][0].title}
        </Typography>
      </div>
    </div>
  )
}

const ExpertsContent = ({ section }: { section: AboutSection[1] }) => {
  return (
    <div className="[&_p]:text-white" id="experts">
      <Typography variant="headline-2" className="mb-8 max-lg:text-sm lg:font-medium">
        {section.title}
      </Typography>

      <div>
        {section.experts.map((expert, index) => (
          <div key={expert.name} className="space-y-6">
            <ExpertCard expert={expert} index={index} className="mb-6" />

            <Typography variant="body-1" className=" lg:font-medium">
              {expert["text-1"]}
            </Typography>

            {expert["text-2"] && (
              <Typography variant="body-1" className="lg:font-medium">
                {expert["text-2"]}
              </Typography>
            )}
            {expert["text-3"] && (
              <Typography variant="body-1" className="mb-6 lg:font-medium">
                {expert["text-3"]}
              </Typography>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const ExpertCard = ({
  expert,
  index,
  className,
  ...props
}: { expert: AboutExpert; index: number; className?: string } & ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className={cn(
        "relative h-[var(--card-height)] w-[320px] overflow-hidden rounded-4xl bg-primary/20",
        "lg:h-[408px] lg:w-auto lg:bg-white/5",
        className,
      )}
      style={{ "--card-height": `${expert.cardHeight}px` } as CSSProperties}
      {...props}
    >
      <div className="absolute inset-y-0 h-[400px] w-full lg:h-full">
        <Image
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          src={expert.image}
          alt={expert.name}
          className={cn("object-cover lg:object-contain", index % 2 === 0 ? "object-left-top" : "object-top-right")}
        />
      </div>

      <div className={cn("absolute bottom-6 w-full px-5 lg:max-w-[450px] lg:pr-2", index % 2 === 0 ? "lg:right-6" : "lg:left-6")}>
        <Typography variant="headline-3" className="mb-4 font-bold">
          {expert.name}
        </Typography>
        <Typography variant="body-1" className="lg:font-medium">
          {expert.description}
        </Typography>
      </div>
    </div>
  )
}
