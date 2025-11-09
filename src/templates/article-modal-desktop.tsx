import Image from "next/image"
import type { Locale } from "next-intl"

import { ScrollArea } from "@/components/ui/scroll-area"
import type { Post } from "@/lib/blog"

interface ArticleModalDesktopProps {
  post: Post
  locale: Locale
  children: React.ReactNode
}

export const ArticleModalDesktop = ({ post, locale, children }: ArticleModalDesktopProps) => {
  // data-lenis-prevent - отключает scroll на этом элементе, чтобы не было конфликта с Lenis
  return (
    <ScrollArea className="mx-auto max-w-4xl flex-1 select-text overflow-y-auto px-4 pb-6 sm:px-6 sm:py-8 md:px-10 md:py-16">
      <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:gap-16">
        {post.cover && (
          <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-2xl sm:rounded-3xl md:sticky md:top-0 md:mx-0 md:h-[264px] md:w-[264px] md:shrink-0 md:rounded-4xl">
            <Image src={post.cover} alt={post.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 264px" />
          </div>
        )}

        <article className="flex-1">
          <section>
            <div className="mb-3 text-muted-foreground text-xs sm:mb-4 sm:text-sm">
              {post.author} • {post.readingTime} {locale === "ru" ? "мин читать" : "min read"}
            </div>
            <h1 className="mb-6 font-bold text-xl leading-tight sm:mb-8 sm:text-2xl md:text-3xl">{post.title}</h1>
            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">{children}</div>
          </section>
        </article>
      </div>
    </ScrollArea>
  )
}
