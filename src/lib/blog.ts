// lib/blog.ts
import fs from "node:fs/promises"
import path from "node:path"
import matter from "gray-matter"
import type { Locale } from "next-intl"

export const LOCALES: readonly Locale[] = ["en", "ru"]

const ROOT = path.join(process.cwd(), "src", "content", "posts") // у тебя так

function normalizeLocale(input: string): Locale {
  const base = input.split("-")[0].toLowerCase()
  return (base === "ru" ? "ru" : "en") as Locale
}

export type PostMeta = {
  slug: string
  title: string
  summary: string
  date: string // ISO
  cover?: string
  draft?: boolean
}

export type Post = PostMeta & { content: string }

async function readPostFile(slug: string, baseLocale: Locale): Promise<Post | null> {
  const file = path.join(ROOT, slug, `${baseLocale}.mdx`)
  try {
    const raw = await fs.readFile(file, "utf8")
    const { data, content } = matter(raw)
    const title = data?.title ? String(data.title) : ""
    const summary = data?.summary ? String(data.summary) : ""
    const date = data?.date ? String(data.date) : ""
    const draft = Boolean(data?.draft)

    if (!title || !summary || !date || draft) return null

    const meta: PostMeta = {
      slug,
      title,
      summary,
      date,
      cover: data?.cover ? String(data.cover) : undefined,
      draft,
    }
    return { ...meta, content }
  } catch {
    return null
  }
}

export async function getAllSlugs(): Promise<string[]> {
  const dirents = await fs.readdir(ROOT, { withFileTypes: true })
  return dirents.filter((d) => d.isDirectory()).map((d) => d.name)
}

export async function getAllPosts(locale: Locale) {
  const base = normalizeLocale(locale)
  const slugs = await getAllSlugs()
  const posts: PostMeta[] = []

  for (const slug of slugs) {
    const p = await readPostFile(slug, base)
    if (p) posts.push(p)
  }

  // если на текущей локали пусто — показать en
  if (posts.length === 0 && base !== "en") {
    for (const slug of slugs) {
      const p = await readPostFile(slug, "en")
      if (p) posts.push(p)
    }
  }

  posts.sort((a, b) => +new Date(b.date) - +new Date(a.date))
  return posts
}

// 3) getPost: мягкий fallback на en
export async function getPost(locale: Locale, slug: string, fallbackEn = true) {
  const base = normalizeLocale(locale)
  const p = await readPostFile(slug, base)
  if (p) return p
  if (fallbackEn && base !== "en") return readPostFile(slug, "en")
  return null
}
export async function hasLocaleVersion(slug: string, locale: Locale): Promise<boolean> {
  const base = normalizeLocale(locale)
  const p = await readPostFile(slug, base)
  return Boolean(p)
}
