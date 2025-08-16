import { getTranslations } from "next-intl/server"

import { PageLayout } from "@/components/layout"
import { AboutPageTemplate } from "@/templates/about"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "ru" | "en" }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "about-page.meta" })

  return {
    title: t("title"),
    description: t("description"),
  }
}

export default function AboutPage() {
  return (
    <PageLayout>
      <AboutPageTemplate />
    </PageLayout>
  )
}
