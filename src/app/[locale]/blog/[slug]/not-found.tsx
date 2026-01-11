import { ArrowLeft } from "lucide-react"
import { useTranslations } from "next-intl"

import { PageLayout } from "@/components/layout"
import { Link } from "@/i18n/navigation"

export default function BlogPostNotFound() {
  const t = useTranslations("blog")

  return (
    <PageLayout>
      <div className="container z-10 flex min-h-full flex-1 flex-col items-center justify-center py-16">
        <div className="m-auto max-w-2xl text-center">
          <h1 className="mb-4 font-bold text-8xl text-muted-foreground">404</h1>
          <h2 className="mb-6 font-semibold text-2xl">{t("postNotFound")}</h2>
          <p className="mb-8 text-muted-foreground">{t("postNotFoundDescription")}</p>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToBlog")}
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
