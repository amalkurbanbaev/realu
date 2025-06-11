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
          <div className="flex flex-col items-end gap-6 py-6 lg:flex-row">
            <h1 className="max-w-xs font-bold text-2xl">{t("title")}</h1>
            <h5 className="max-w-sm font-light">{t("description")}</h5>

            <AppleButton className="ml-auto grow-0" />
          </div>
        </section>
      </div>

      <SlidesOverlay />

      <section className="container space-y-12 py-10">
        <h3 className="mb-6 font-bold text-2xl">Вы найдете</h3>
        <div className="grid grid-cols-3 place-items-start gap-4">
          <div className="size-[300px] h-[244px] w-[384px] rounded-2xl border-3 border-primary" />
          <div className="size-[300px] h-[244px] w-[384px] rounded-2xl border-3 border-primary" />
          <div className="size-[300px] h-[244px] w-[384px] rounded-2xl border-3 border-primary" />
        </div>

        <h3 className="mb-6 font-bold text-2xl">Люди говорят</h3>
        <div className="grid grid-cols-3 place-items-start gap-4">
          <div className="size-[300px] h-[244px] w-[384px] rounded-2xl border-3 border-primary" />
          <div className="size-[300px] h-[244px] w-[384px] rounded-2xl border-3 border-primary" />
          <div className="size-[300px] h-[244px] w-[384px] rounded-2xl border-3 border-primary" />
        </div>
      </section>

      <section className="container mt-12 mb-20">
        <div className="flex flex-col items-end gap-12 py-6 lg:flex-row">
          <h1 className="max-w-sm font-bold text-2xl">{t("title2")}</h1>
          <h5 className="max-w-lg font-medium text-muted-foreground">
            {t("description2")}
          </h5>

          <AppleButton className="ml-auto grow-0" />
        </div>
      </section>
    </>
  )
}
