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
  const t = await getTranslations("home-page.layout")

  return (
    <section className="container">
      <h1>{t("title")}</h1>
    </section>
  )
}
