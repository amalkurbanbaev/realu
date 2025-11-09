import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { Locale } from "next-intl"

import { PageLayout } from "@/components/layout"
import { getPostBySlug, generateStaticParams as getStaticParams } from "@/lib/blog"
import { ArticleTemplate } from "@/templates/article"

export const generateStaticParams = getStaticParams

export async function generateMetadata(props: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const params = await props.params
  const { locale, slug } = params

  try {
    const post = await getPostBySlug(slug, locale)

    if (!post) {
      return {
        title: "Article not found",
        description: "The requested article does not exist",
      }
    }

    return {
      title: post.title,
      description: post.summary,
    }
  } catch (error) {
    console.error("Error in generateMetadata:", error)
    return {
      title: "Error loading article",
      description: "There was an error loading this article",
    }
  }
}

export default async function BlogPostPage(props: { params: Promise<{ locale: Locale; slug: string }> }) {
  const params = await props.params
  const { locale, slug } = params

  const post = await getPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  return (
    <PageLayout>
      <ArticleTemplate post={post} locale={locale} />
    </PageLayout>
  )
}
