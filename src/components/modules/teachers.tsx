import Image from "next/image"
import { useLocale, useTranslations } from "next-intl"

import { cn } from "@/lib/utils"

import { Typography } from "../ui/typography"

type TeachersProps = {
  isActive?: boolean
  animEnabled?: boolean
}

// В русской версии только 1 учитель, в английской 2
export function Teachers({ isActive = true, animEnabled = true }: TeachersProps) {
  const locale = useLocale()
  const t = useTranslations("home-page.layout")

  if (locale === "en") {
    return (
      <div className="container flex gap-x-8">
        <div
          className={cn(
            "-rotate-[1.5deg] relative flex-1 overflow-clip rounded-4xl bg-primary/20",
            animEnabled ? "opacity-100" : "opacity-0",
            isActive && animEnabled && "fade-in slide-in-from-left-10 animate-in duration-1000 ease-in-out",
          )}
        >
          <Image src="/teachers/tati-frost.png" alt="Tati Frost" width={596} height={530} className="pointer-events-none select-none" />
          <Image src="/teachers/noise.png" alt="Noise" fill className="pointer-events-none select-none" />
          <Typography variant="body-2" as="p" className="absolute right-8 bottom-14 max-w-[291px] text-center text-white">
            {t("teachers.teacher1")}
          </Typography>
        </div>

        <div
          className={cn(
            "relative flex-1 rotate-[1.5deg] overflow-clip rounded-4xl bg-primary/20",
            animEnabled ? "opacity-100" : "opacity-0",
            isActive && animEnabled && "fade-in slide-in-from-right-10 animate-in duration-1000 ease-in-out",
          )}
        >
          <Image src="/teachers/matthew-wright.png" alt="Matthew Wright" width={596} height={530} className="pointer-events-none select-none" />
          <Image src="/teachers/noise.png" alt="Noise" fill className="pointer-events-none select-none" />
          <Typography variant="body-2" as="p" className="absolute bottom-14 left-8 max-w-[291px] text-center text-white">
            {t("teachers.teacher2")}
          </Typography>
        </div>
      </div>
    )
  }
  return (
    <div
      className={cn(
        "container",
        animEnabled ? "opacity-100" : "opacity-0",
        isActive && animEnabled && "fade-in zoom-in-90 animate-in duration-[1.5s] ease-in-out",
      )}
    >
      <Image src="/teachers/tati-frost.png" alt="Tati Frost" width={596} height={530} className="pointer-events-none select-none" />
      <Typography variant="body-2" as="p">
        {t("teachers.teacher1")}
      </Typography>
    </div>
  )
}
