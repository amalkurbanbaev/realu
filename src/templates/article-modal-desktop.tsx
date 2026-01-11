import { ArrowLeft } from "lucide-react"
import type { Locale } from "next-intl"

import { CloseButton } from "@/components/modules/close-button"
import { ProgressiveImage } from "@/components/ui/progressive-image"
import { Typography } from "@/components/ui/typography"
import { Link } from "@/i18n/navigation"
import type { Post } from "@/lib/blog"

interface ArticleModalDesktopProps {
  post: Post
  locale: Locale
  children: React.ReactNode
  showCloseButton?: boolean
}

export const ArticleModalDesktop = ({ post, locale, children, showCloseButton = true }: ArticleModalDesktopProps) => {
  // data-lenis-prevent - отключает scroll на этом элементе, чтобы не было конфликта с Lenis
  return (
    <section className="relative mx-auto max-w-4xl flex-1 select-text overflow-y-auto px-4 pb-6 sm:px-6 sm:py-8 md:px-10 md:py-12">
      {showCloseButton ? (
        <CloseButton useHistory fallbackHref="/blog" />
      ) : (
        <Link href="/blog" className="mb-4 inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          {locale === "ru" ? "Ко всем статьям" : "To all articles"}
        </Link>
      )}

      <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:gap-16">
        {post.cover && (
          <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-4xl sm:rounded-3xl md:sticky md:top-0 md:mx-0 md:h-[264px] md:w-[264px] md:shrink-0 md:rounded-4xl">
            <ProgressiveImage src={post.cover} alt={post.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 264px" />
          </div>
        )}

        <article className="flex-1">
          <section>
            <Typography variant="body-2" className="mb-2">
              {locale === "en" && "By "}
              {post.author} • {post.readingTime} {locale === "ru" ? "мин читать" : "minutes to read"}
            </Typography>

            <Typography variant="headline-1" className="mb-6">
              {post.title}
            </Typography>
            <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">{children}</div>
          </section>
        </article>
      </div>
    </section>
  )
}
