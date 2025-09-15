import type { Metadata } from "next"
import Image from "next/image"
import type { Locale } from "next-intl"
import { MDXRemote } from "next-mdx-remote/rsc"

import { PageLayout } from "@/components/layout"
import { mdxComponents } from "@/components/modules/mdx"
import { getAllSlugs, getPost, hasLocaleVersion, LOCALES } from "@/lib/blog"

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const post = await getPost(locale, slug)
  if (!post) return {}

  // hreflang (если есть обе версии)
  const other = LOCALES.find((l) => l !== locale) as Locale
  const hasOther = await hasLocaleVersion(slug, other)

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      images: post.cover ? [{ url: post.cover }] : undefined,
    },
    alternates: hasOther ? { languages: { [other]: `/${other}/blog/${slug}` } } : undefined,
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params
  const post = await getPost(locale, slug)
  if (!post) return <div className="mx-auto max-w-3xl p-8">Not found</div>

  return (
    <PageLayout>
      <section className="container">
        <article className="prose prose-neutral dark:prose-invert mx-auto max-w-3xl px-4 py-10">
          {post.cover && <Image src={post.cover} alt="" width={1200} height={630} className="mb-6 w-full rounded-2xl" />}
          <h1>{post.title}</h1>
          <p className="not-prose text-muted-foreground text-sm">{new Date(post.date).toISOString().slice(0, 10)}</p>
          <MDXRemote source={post.content} components={mdxComponents} />
        </article>
      </section>
    </PageLayout>
  )
}
