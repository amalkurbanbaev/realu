import type { Metadata } from "next"
import { notFound } from "next/navigation"
import type { Locale } from "next-intl"

import { PageLayout } from "@/components/layout"
import { checkPostExists, getAdjacentPosts, getPostBySlug, generateStaticParams as getStaticParams, SUPPORTED_LOCALES } from "@/lib/blog"
import { ArticleTemplate } from "@/templates/article"

export const generateStaticParams = getStaticParams

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug, locale)

  if (!post) {
    return {
      title: "Article not found",
      description: "The requested article does not exist",
    }
  }

  // Проверяем наличие альтернативных языков
  const alternateLanguages: Record<string, string> = {}

  for (const supportedLocale of SUPPORTED_LOCALES) {
    if (supportedLocale !== locale) {
      const hasAlternate = await checkPostExists(slug, supportedLocale)
      if (hasAlternate) {
        alternateLanguages[supportedLocale] = `/${supportedLocale}/blog/${slug}`
      }
    }
  }

  return {
    title: post.title,
    description: post.summary,
    authors: post.author ? [{ name: post.author }] : undefined,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      authors: post.author ? [post.author] : undefined,
      tags: post.tags,
      images: post.cover
        ? [
            {
              url: post.cover,
              alt: post.title,
              width: 1200,
              height: 630,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: post.cover ? [post.cover] : undefined,
    },
    alternates: Object.keys(alternateLanguages).length > 0 ? { languages: alternateLanguages } : undefined,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params
  const [post, adjacentPosts] = await Promise.all([getPostBySlug(slug, locale), getAdjacentPosts(slug, locale)])

  if (!post) {
    notFound()
  }

  return (
    <PageLayout>
      <ArticleTemplate post={post} locale={locale} previousPost={adjacentPosts.previous} nextPost={adjacentPosts.next} />
    </PageLayout>
  )
}
