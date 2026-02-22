"use client"

import type { ComponentPropsWithoutRef } from "react"
import { useTranslations } from "next-intl"

import { Typography } from "@/components/ui/typography"
import { EMAIL_CONTACT_LINK } from "@/constants/links"
import { Link } from "@/i18n/navigation"
import { cn } from "@/lib/utils"

export const AboutFeedback = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => {
  const t = useTranslations("about-page.layout")

  return (
    <Typography variant="body-1" className={cn("max-w-5/6 whitespace-pre-line text-muted-foreground", className)} {...props}>
      {t.rich("contact", {
        EMAIL_CONTACT_LINK,
        a: (chunks) => (
          <Link href={`mailto:${EMAIL_CONTACT_LINK}`} className="text-white hover:underline">
            {chunks}
          </Link>
        ),
      })}
    </Typography>
  )
}
