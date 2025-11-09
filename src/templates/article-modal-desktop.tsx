import Image from "next/image"
import type { Locale } from "next-intl"

import { ScrollArea } from "@/components/ui/scroll-area"
import type { Post } from "@/lib/blog"
import { formatDate } from "@/utils/format-date"

interface ArticleModalDesktopProps {
  post: Post
  locale: Locale
  children: React.ReactNode
}

export const ArticleModalDesktop = ({ post, locale, children }: ArticleModalDesktopProps) => {
  return (
    <ScrollArea className="mx-auto max-w-4xl flex-1 select-text overflow-y-auto px-10" data-lenis-prevent>
      <article className="flex gap-16 py-16">
        {post.cover && (
          <div className="sticky top-16 h-[264px] w-[264px] shrink-0 overflow-hidden rounded-lg">
            <Image src={post.cover} alt={post.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 768px" />
          </div>
        )}

        <section>
          <div>
            {post.author} • {formatDate(post.date, locale)}
          </div>
          <h1 className="mb-8 font-bold text-2xl leading-tight">{post.title}</h1>
          <div>{children}</div>
        </section>
      </article>
    </ScrollArea>
  )
}
