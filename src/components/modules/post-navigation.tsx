import { ArrowLeft, ArrowRight } from "lucide-react"
import type { Locale } from "next-intl"

import { Link } from "@/i18n/navigation"
import type { PostMeta } from "@/lib/blog"

interface PostNavigationProps {
  previousPost?: PostMeta
  nextPost?: PostMeta
  locale: Locale
}

export function PostNavigation({ previousPost, nextPost, locale }: PostNavigationProps) {
  if (!previousPost && !nextPost) {
    return null
  }

  return (
    <nav className="mt-16 border-t pt-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
        {previousPost ? (
          <Link
            href={`/blog/${previousPost.slug}`}
            className="group flex flex-1 items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            <div className="text-left">
              <div className="text-muted-foreground text-sm">{locale === "ru" ? "Предыдущая статья" : "Previous post"}</div>
              <div className="font-medium group-hover:text-primary">{previousPost.title}</div>
            </div>
          </Link>
        ) : (
          <div className="flex-1" />
        )}

        {nextPost ? (
          <Link
            href={`/blog/${nextPost.slug}`}
            className="group flex flex-1 items-center justify-end gap-3 rounded-lg border p-4 text-right transition-colors hover:bg-muted"
          >
            <div>
              <div className="text-muted-foreground text-sm">{locale === "ru" ? "Следующая статья" : "Next post"}</div>
              <div className="font-medium group-hover:text-primary">{nextPost.title}</div>
            </div>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        ) : (
          <div className="flex-1" />
        )}
      </div>
    </nav>
  )
}
