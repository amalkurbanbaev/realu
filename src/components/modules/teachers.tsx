import { useLocale, useTranslations } from "next-intl"

import { cn } from "@/lib/utils"

import { TeacherCard } from "./teacher-card"

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
      <div className={cn("flex flex-col gap-y-8 md:flex-row md:gap-x-8")}>
        <TeacherCard
          imageSrc="/teachers/tati-frost.png"
          alt="Tati Frost"
          text={t("teachers.teacher1")}
          variant="en"
          side="left"
          isActive={isActive}
          animEnabled={animEnabled}
        />
        <TeacherCard
          imageSrc="/teachers/matthew-wright.png"
          alt="Matthew Wright"
          text={t("teachers.teacher2")}
          variant="en"
          side="right"
          isActive={isActive}
          animEnabled={animEnabled}
        />
      </div>
    )
  }

  return <TeacherCard alt="Tati Frost" text={t("teachers.teacher1")} variant="ru" isActive={isActive} animEnabled={animEnabled} />
}
