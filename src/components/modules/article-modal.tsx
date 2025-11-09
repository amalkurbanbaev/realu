"use client"

import { Calendar, Clock, User } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import type { Locale } from "next-intl"
import { useMediaQuery } from "usehooks-ts"

import { useLenisControl } from "@/hooks"
import type { Post } from "@/lib/blog"
import { ArticleModalDesktop } from "@/templates/article-modal-desktop"
import { formatDate } from "@/utils/format-date"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "../ui/drawer"
import { ScrollArea } from "../ui/scroll-area"

interface ArticleModalProps {
  post: Post
  locale: Locale
  children: React.ReactNode
}

export function ArticleModal({ post, locale, children }: ArticleModalProps) {
  const router = useRouter()

  const isDesktop = useMediaQuery("(min-width: 768px)")

  // Управляем Lenis при открытии/закрытии модального окна
  useLenisControl()

  const handleClose = () => {
    router.back()
  }

  if (isDesktop) {
    return (
      <Dialog open onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="size-full" data-lenis-prevent>
          <DialogHeader>
            <DialogTitle className="sr-only">Post title</DialogTitle>
            <DialogDescription className="sr-only">Post summary</DialogDescription>
          </DialogHeader>

          <ArticleModalDesktop post={post} locale={locale}>
            {children}
          </ArticleModalDesktop>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open onOpenChange={(open) => !open && handleClose()} dismissible preventScrollRestoration={false}>
      <DrawerContent className="flex h-[85vh] flex-col" data-lenis-prevent>
        <div className="mx-auto flex w-full max-w-5xl flex-col overflow-hidden">
          <DrawerHeader className="shrink-0">
            <DrawerTitle className="sr-only">{post.title}</DrawerTitle>
            <DrawerDescription className="sr-only">{post.summary}</DrawerDescription>
          </DrawerHeader>

          <ScrollArea className="flex-1 select-text overflow-y-auto overscroll-contain" data-lenis-prevent>
            <div className="px-4 pb-8 md:px-6">
              <article className="mx-auto max-w-none">
                <ArticleHeader post={post} locale={locale} />
                <div>{children}</div>
              </article>
            </div>
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function ArticleHeader({ post, locale }: { post: Post; locale: Locale }) {
  return (
    <header className="mb-8 md:mb-12">
      {post.cover && (
        <div className="relative mb-6 aspect-[16/9] overflow-hidden rounded-xl md:mb-8 md:aspect-[2/1] md:rounded-2xl">
          <Image src={post.cover} alt={post.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 768px" />
        </div>
      )}

      <div className="space-y-3 md:space-y-4">
        <h1 className="font-bold text-2xl leading-tight md:text-4xl lg:text-5xl">{post.title}</h1>

        <p className="text-lg text-muted-foreground leading-relaxed md:text-xl">{post.summary}</p>

        <div className="flex flex-wrap items-center gap-4 text-muted-foreground text-sm md:gap-6">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>
              {post.readingTime} {locale === "ru" ? "мин чтения" : "min read"}
            </span>
          </div>

          {post.author && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
