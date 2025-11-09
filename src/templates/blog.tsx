import Image from "next/image"
import type { Locale } from "next-intl"
import { useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"
import type { PostMeta } from "@/lib/blog"
import { formatDate } from "@/utils/format-date"

interface BlogTemplateProps {
  posts: PostMeta[]
  locale: Locale
}

export function BlogTemplate({ posts, locale }: BlogTemplateProps) {
  const t = useTranslations("blog")

  if (posts.length === 0) {
    return (
      <section className="container py-16">
        <div className="text-center">
          <h1 className="mb-4 font-bold text-4xl">{t("title")}</h1>
          <p className="text-lg text-muted-foreground">{t("noPosts")}</p>
        </div>
      </section>
    )
  }

  return (
    <section className="container py-16">
      <div className="mb-12 text-center">
        <h1 className="mb-4 font-bold text-4xl">{t("title")}</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">{t("description")}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} locale={locale} />
        ))}
      </div>
    </section>
  )
}

function PostCard({ post, locale }: { post: PostMeta; locale: Locale }) {
  return (
    <article className="group h-full">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-200 hover:shadow-lg">
          {post.cover && (
            <div className="relative aspect-[16/9] overflow-hidden">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-200 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}

          <div className="flex flex-1 flex-col p-6">
            <div className="mb-3 flex items-center gap-2 text-muted-foreground text-sm">
              <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
              <span>•</span>
              <span>
                {post.readingTime} {locale === "ru" ? "мин чтения" : "min read"}
              </span>
            </div>

            <h2 className="mb-3 font-semibold text-xl leading-tight transition-colors group-hover:text-primary">{post.title}</h2>

            <p className="flex-1 text-muted-foreground leading-relaxed">{post.summary}</p>

            {post.tags && post.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}
