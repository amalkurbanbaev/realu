import { getTranslations } from "next-intl/server"

export async function AboutPageTemplate() {
  const t = await getTranslations("about-page.layout")

  return (
    <section className="container grid grid-cols-1 gap-y-4 py-8 md:grid-cols-3 md:py-14">
      <h1 className="font-bold text-xl md:text-2xl">{t("title")}</h1>

      <div className="whitespace-pre-line md:col-span-2 md:pr-14">
        <p>
          {t.rich("description", {
            underline: (chunks) => <u className="underline">{chunks}</u>,
          })}
        </p>
      </div>
    </section>
  )
}
