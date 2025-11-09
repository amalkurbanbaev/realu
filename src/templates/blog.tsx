import Image from "next/image"
import { useTranslations } from "next-intl"

import { Link } from "@/i18n/navigation"
import type { PostMeta } from "@/lib/blog"

interface BlogTemplateProps {
  posts: PostMeta[]
}

export function BlogTemplate({ posts }: BlogTemplateProps) {
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
    <section className="container flex flex-col gap-8 md:py-6 lg:flex-row lg:gap-12">
      <div className="w-full lg:w-[30%]">
        <h1 className="font-medium text-xl lg:font-bold lg:text-4xl">{t("title")}</h1>
      </div>

      <div className="grid w-full grid-cols-1 items-start gap-8 sm:grid-cols-2 md:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  )
}

function PostCard({ post }: { post: PostMeta }) {
  return (
    <article className="group h-full">
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className="flex size-full flex-col gap-3">
          {post.cover && (
            <div className="relative aspect-square size-full overflow-clip rounded-2xl">
              <Image src={post.cover} alt={post.title} fill className="object-cover" />
            </div>
          )}

          <h2 className="mb-3 line-clamp-2 min-h-14 text-balance text-center font-semibold text-xl leading-tight transition-colors group-hover:text-primary">
            {post.title}
          </h2>
        </div>
      </Link>
    </article>
  )
}
