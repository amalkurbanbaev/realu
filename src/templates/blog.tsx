import type { ComponentPropsWithoutRef } from "react"
import { useTranslations } from "next-intl"

import { ProgressiveImage } from "@/components/ui/progressive-image"
import { Typography } from "@/components/ui/typography"
import { EMAIL_SUPPORT_LINK } from "@/constants/links"
import { Link } from "@/i18n/navigation"
import type { PostMeta } from "@/lib/blog"
import { cn } from "@/lib/utils"

interface BlogTemplateProps {
  posts: PostMeta[]
}

export function BlogTemplate({ posts }: BlogTemplateProps) {
  const t = useTranslations("blog")

  if (posts.length === 0) {
    return (
      <section className="container pb-6 md:py-6">
        <div className="text-center">
          <div className="flex flex-col justify-between">
            <Typography variant="headline-1" className="mb-4">
              {t("title")}
            </Typography>

            <BlogFeedback />
          </div>
          <Typography className="text-muted-foreground">{t("noPosts")}</Typography>
        </div>
      </section>
    )
  }

  return (
    <section className="container flex min-h-full flex-1 flex-col gap-4 pb-6 md:py-6 lg:flex-row lg:gap-10">
      <div className="flex flex-col justify-between">
        <Typography variant="headline-1">{t("title")}</Typography>

        <BlogFeedback className="hidden max-w-xs lg:block" />
      </div>

      <div className="grid w-full grid-cols-1 items-start gap-6 self-start sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      <BlogFeedback className="mx-auto max-w-[250px] text-center lg:hidden" />
    </section>
  )
}

function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group relative h-full">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="flex size-full flex-col gap-3">
          {post.cover && (
            <ProgressiveImage
              src={post.cover}
              alt={post.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              containerClassName="relative aspect-square size-full overflow-clip rounded-4xl"
              skeletonClassName="rounded-4xl"
              className="object-cover"
            />
          )}

          <Typography
            variant="headline-2"
            className="mb-3 text-balance text-center leading-tight transition-colors group-hover:text-primary sm:line-clamp-2 sm:min-h-12"
          >
            {post.title}
          </Typography>
        </div>
      </Link>
    </article>
  )
}

const BlogFeedback = ({ className, ...props }: ComponentPropsWithoutRef<"div">) => {
  const t = useTranslations("blog")

  return (
    <Typography variant="body-1" className={cn("text-muted-foreground", className)} {...props}>
      {t.rich("feedback", {
        EMAIL_SUPPORT_LINK,
        a: (chunks) => (
          <Link href={`mailto:${EMAIL_SUPPORT_LINK}`} className="text-white hover:underline">
            {chunks}
          </Link>
        ),
      })}
    </Typography>
  )
}
