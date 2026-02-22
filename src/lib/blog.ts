import fs from "node:fs/promises"
import path from "node:path"
import { cache } from "react"
import matter from "gray-matter"
import type { Locale } from "next-intl"

export const SUPPORTED_LOCALES = ["en", "ru"] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

const POSTS_DIRECTORY = path.join(process.cwd(), "src", "content", "posts")

// Строгая типизация для frontmatter
export interface PostFrontmatter {
  title: string
  summary: string
  date: string
  cover?: string
  draft?: boolean
  tags?: string[]
  author?: string
}

export interface PostMeta extends PostFrontmatter {
  slug: string
  locale: SupportedLocale
  readingTime: number
}

export interface Post extends PostMeta {
  content: string
}

// Утилиты
function normalizeLocale(locale: string): SupportedLocale {
  const normalized = locale.toLowerCase().split("-")[0]
  return SUPPORTED_LOCALES.includes(normalized as SupportedLocale) ? (normalized as SupportedLocale) : "en"
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200
  const words = content.trim().split(/\s+/).length
  return Math.ceil(words / wordsPerMinute)
}

function validateFrontmatter(data: unknown): data is PostFrontmatter {
  return (
    data !== null &&
    typeof data === "object" &&
    "title" in data &&
    "summary" in data &&
    "date" in data &&
    typeof data.title === "string" &&
    typeof data.summary === "string" &&
    typeof data.date === "string" &&
    data.title.trim().length > 0 &&
    data.summary.trim().length > 0 &&
    data.date.trim().length > 0 &&
    (!("draft" in data) || !data.draft)
  )
}

// Кешированные функции для оптимизации
export const getAllSlugs = cache(async (): Promise<string[]> => {
  try {
    const entries = await fs.readdir(POSTS_DIRECTORY, { withFileTypes: true })
    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort()
  } catch (error) {
    console.warn("Не удалось прочитать директорию постов:", error)
    return []
  }
})

export const getPostBySlug = cache(async (slug: string, locale: Locale): Promise<Post | null> => {
  const normalizedLocale = normalizeLocale(locale)
  const filePath = path.join(POSTS_DIRECTORY, slug, `${normalizedLocale}.mdx`)

  try {
    const fileContent = await fs.readFile(filePath, "utf8")
    const { data, content } = matter(fileContent)

    if (!validateFrontmatter(data)) {
      console.warn(`Невалидный frontmatter в посте: ${slug}/${normalizedLocale}.mdx`)
      return null
    }

    const readingTime = calculateReadingTime(content)

    return {
      slug,
      locale: normalizedLocale,
      readingTime,
      content,
      ...data,
    }
  } catch {
    // Пробуем fallback на английский, если текущая локаль не найдена
    if (normalizedLocale !== "en") {
      return getPostBySlug(slug, "en")
    }
    return null
  }
})

export const getAllPosts = cache(async (locale: Locale): Promise<PostMeta[]> => {
  const slugs = await getAllSlugs()
  const normalizedLocale = normalizeLocale(locale)

  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug, normalizedLocale)
      if (!post) return null

      // Возвращаем только метаданные без контента
      const { content: _, ...meta } = post
      return meta
    }),
  )

  return posts.filter((post): post is PostMeta => post !== null).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
})

export const getPostsByTag = cache(async (tag: string, locale: Locale): Promise<PostMeta[]> => {
  const allPosts = await getAllPosts(locale)
  return allPosts.filter((post) => post.tags?.includes(tag))
})

export const getAllTags = cache(async (locale: Locale): Promise<string[]> => {
  const posts = await getAllPosts(locale)
  const tags = new Set<string>()

  for (const post of posts) {
    for (const tag of post.tags ?? []) {
      tags.add(tag)
    }
  }

  return Array.from(tags).sort()
})

export async function checkPostExists(slug: string, locale: Locale): Promise<boolean> {
  const post = await getPostBySlug(slug, locale)
  return post !== null
}

export async function getAdjacentPosts(currentSlug: string, locale: Locale): Promise<{ previous?: PostMeta; next?: PostMeta }> {
  const posts = await getAllPosts(locale)
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug)

  if (currentIndex === -1) {
    return {}
  }

  return {
    previous: currentIndex > 0 ? posts[currentIndex - 1] : undefined,
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : undefined,
  }
}

// Генерация статических параметров для Next.js
export async function generateStaticParams(): Promise<Array<{ locale: string; slug: string }>> {
  const slugs = await getAllSlugs()
  const params: Array<{ locale: string; slug: string }> = []

  for (const slug of slugs) {
    for (const locale of SUPPORTED_LOCALES) {
      // Проверяем, существует ли пост для данной локали
      const post = await getPostBySlug(slug, locale)
      if (post) {
        params.push({ locale, slug })
      }
    }
  }

  return params
}
