import { getTranslations } from "next-intl/server"

export async function AboutPageTemplate() {
  const t = await getTranslations("about-page.layout")

  return (
    <section className="container relative z-10 grid grid-cols-1 gap-y-4 py-8 md:grid-cols-3 md:py-14">
      <h1 className="font-bold text-xl md:text-2xl">{t("title")}</h1>

      <div className="whitespace-pre-line md:col-span-2 md:pr-14">
        <p className="font-normal text-base leading-6">
          {t.rich("description", {
            underline: (chunks) => <u className="underline">{chunks}</u>,
          })}
        </p>
      </div>
    </section>
  )
}
