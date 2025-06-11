import { PageLayout } from "@/components/layout"
import { HomePageTemplate } from "@/templates/home"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: "ru" | "en" }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "home-page.meta" })

  return {
    title: t("title"),
    description: t("description"),
  }
}

export default async function Home() {
  return (
    <PageLayout withGradient={false}>
      <HomePageTemplate />
    </PageLayout>
  )
}
