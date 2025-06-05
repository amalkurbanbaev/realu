import { VideoPlayer } from "@/components/modules/video-player"
import { getTranslations } from "next-intl/server"
import Image from "next/image"
import { SlidesOverlay } from "./slides"

export async function HomePageTemplate() {
  const t = await getTranslations("home-page.layout")

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <section className="container flex h-full grow items-center justify-center rounded-b-3xl bg-black">
          <div className="h-[520px] w-[240px] overflow-hidden rounded-3xl border border-white/10 shadow-lg">
            <VideoPlayer src="/test-video.mp4" />
          </div>
        </section>

        <section className="container">
          <div className=" flex items-end gap-4 py-6">
            <h1 className="max-w-sm font-bold text-2xl">{t("title")}</h1>
            <h5 className="max-w-sm font-medium text-muted-foreground">
              {t("description")}
            </h5>

            <a
              className="ml-auto flex max-h-12 grow-0 items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm"
              href="https://www.apple.com"
              target="_blank"
              rel="noreferrer"
            >
              <Image
                src="/apple-logo.svg"
                alt="apple logo"
                width={20}
                height={24}
              />
              <span className="font-bold text-black">App Store</span>
            </a>
          </div>
        </section>
      </div>

      <SlidesOverlay />

      <section className="container">
        <div>Вы обретете</div>
        <div className="grid grid-cols-3 place-items-center gap-4">
          <div className="size-[300px] rounded bg-primary/50" />
          <div className="size-[300px] rounded bg-primary/50" />
          <div className="size-[300px] rounded bg-primary/50" />
          <div className="size-[300px] rounded bg-primary/50" />
          <div className="size-[300px] rounded bg-primary/50" />
          <div className="size-[300px] rounded bg-primary/50" />
          <div className="size-[300px] rounded bg-primary/50" />
          <div className="size-[300px] rounded bg-primary/50" />
          <div className="size-[300px] rounded bg-primary/50" />
        </div>
      </section>
    </>
  )
}
