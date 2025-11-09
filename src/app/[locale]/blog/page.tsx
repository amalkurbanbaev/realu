import type { Metadata } from "next"
import type { Locale } from "next-intl"
import { getTranslations } from "next-intl/server"

import { PageLayout } from "@/components/layout"
import { getAllPosts } from "@/lib/blog"
import { BlogTemplate } from "@/templates/blog"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: "blog" })

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
  }
}

export default async function BlogPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const posts = await getAllPosts(locale)

  return (
    <PageLayout>
      <BlogTemplate posts={posts} locale={locale} />
    </PageLayout>
  )
}
