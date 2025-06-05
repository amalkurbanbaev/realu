import { AppleButton } from "@/components/modules/apple-button"
import { VideoPlayer } from "@/components/modules/video-player"
import { getTranslations } from "next-intl/server"
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
          <div className="flex flex-col items-end gap-4 py-6 lg:flex-row">
            <h1 className="max-w-sm font-bold text-2xl">{t("title")}</h1>
            <h5 className="max-w-sm font-medium text-muted-foreground">
              {t("description")}
            </h5>

            <AppleButton className="ml-auto grow-0" />
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
