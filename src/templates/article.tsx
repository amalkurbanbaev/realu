import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import Image from "next/image"
import type { Locale } from "next-intl"
import { MDXRemote } from "next-mdx-remote/rsc"

import { mdxComponents } from "@/components/modules/mdx"
import { Link } from "@/i18n/navigation"
import type { Post } from "@/lib/blog"
import { formatDate } from "@/utils/format-date"

interface ArticleTemplateProps {
  post: Post
  locale: Locale
}

export function ArticleTemplate({ post, locale }: ArticleTemplateProps) {
  return (
    <div className="container py-16">
      <article className="mx-auto max-w-4xl">
        <header className="mb-12">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            {locale === "ru" ? "Назад к блогу" : "Back to blog"}
          </Link>

          <div className="flex flex-col gap-8 md:flex-row">
            {post.cover && (
              <div className="relative h-[264px] w-[264px] shrink-0 overflow-hidden rounded-2xl">
                <Image src={post.cover} alt={post.title} fill className="object-cover" priority sizes="264px" />
              </div>
            )}

            <div className="flex flex-1 flex-col justify-center space-y-4">
              <h1 className="font-bold text-4xl leading-tight md:text-5xl">{post.title}</h1>

              <p className="text-muted-foreground text-xl leading-relaxed">{post.summary}</p>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {post.readingTime} {locale === "ru" ? "мин чтения" : "minutes to read"}
                  </span>
                </div>

                {post.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                )}
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="prose prose-neutral dark:prose-invert mx-auto max-w-none prose-headings:scroll-mt-20 prose-img:rounded-xl">
          {post.content ? (
            <MDXRemote source={post.content} components={mdxComponents} />
          ) : (
            <p className="text-muted-foreground">{locale === "ru" ? "Контент статьи недоступен" : "Article content is not available"}</p>
          )}
        </div>

        <footer className="pt-8">
          <div className="flex items-center justify-between">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-secondary-foreground transition-colors hover:bg-secondary/80"
            >
              <ArrowLeft className="h-4 w-4" />
              {locale === "ru" ? "Все статьи" : "All articles"}
            </Link>

            <div className="text-muted-foreground text-sm">
              {locale === "ru" ? "Опубликовано" : "Published"} <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            </div>
          </div>
        </footer>
      </article>
    </div>
  )
}
