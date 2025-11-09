import { ArrowLeft } from "lucide-react"
import { useTranslations } from "next-intl"

import { PageLayout } from "@/components/layout"
import { Link } from "@/i18n/navigation"

export default function BlogPostNotFound() {
  const t = useTranslations("blog")

  return (
    <PageLayout>
      <div className="container py-16">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="mb-4 font-bold text-6xl text-muted-foreground">404</h1>
          <h2 className="mb-6 font-semibold text-2xl">{t("postNotFound") || "Статья не найдена"}</h2>
          <p className="mb-8 text-muted-foreground">{t("postNotFoundDescription") || "Возможно, статья была удалена или перемещена"}</p>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToBlog") || "Вернуться к блогу"}
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
