import Image from "next/image"
import Link from "next/link"
import type { Locale } from "next-intl"

import { PageLayout } from "@/components/layout"
import { getAllPosts } from "@/lib/blog"

export default async function BlogIndex({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const posts = await getAllPosts(locale)

  return (
    <PageLayout>
      <section className="container">
        <h1 className="font-bold text-3xl">{locale.startsWith("ru") ? "Блог" : "Blog"}</h1>
        <ul className="space-y-6">
          {posts.map((p) => (
            <li key={`${p.slug}`} className="group">
              <Link href={`/${locale}/blog/${p.slug}`} className="block">
                {p.cover && (
                  <Image
                    src={p.cover}
                    alt=""
                    width={1200}
                    height={630}
                    className="mb-3 aspect-[16/9] w-full rounded-2xl object-cover"
                    loading="lazy"
                  />
                )}
                <h2 className="font-semibold text-xl group-hover:underline">{p.title}</h2>
                <p className="text-muted-foreground text-sm">{new Date(p.date).toISOString().slice(0, 10)}</p>
                <p className="mt-2 text-base text-foreground/80">{p.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </PageLayout>
  )
}
