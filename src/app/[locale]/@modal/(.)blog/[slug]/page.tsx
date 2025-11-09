import { notFound } from "next/navigation"
import type { Locale } from "next-intl"
import { MDXRemote } from "next-mdx-remote/rsc"

import { ArticleModal } from "@/components/modules/article-modal"
import { mdxComponents } from "@/components/modules/mdx"
import { getPostBySlug } from "@/lib/blog"

export default async function BlogPostModal({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params
  const post = await getPostBySlug(slug, locale)

  if (!post) {
    notFound()
  }

  return (
    <ArticleModal post={post} locale={locale}>
      <div className="prose prose-neutral dark:prose-invert mx-auto max-w-none prose-headings:scroll-mt-20 prose-img:rounded-xl">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </ArticleModal>
  )
}
