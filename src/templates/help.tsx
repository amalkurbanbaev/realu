type HelpPageTemplate = {
  activeTab?: string
}

const DEFAULT_TAB = "about_app"

export async function HelpPageTemplate({
  activeTab = DEFAULT_TAB,
}: HelpPageTemplate) {
  // const t = await getTranslations("help-page")

  // const sections = t.raw("units") as Record<
  //   string,
  //   { title: string; questions: { title: string; text: string }[] }
  // >

  // const tabKeys = Object.keys(sections)

  // const section = sections[activeTab]

  return (
    <section className="container relative z-10 py-20 text-white">
      <div className="grid grid-cols-[220px_1fr] gap-12">
        {activeTab}
        {/* <nav className="flex flex-col gap-4">
          {tabKeys.map((key) => (
            <Link
              key={key}
              href={`?tab=${key}`}
              className={cn(
                "text-2xl transition-colors",
                key === activeTab
                  ? "font-bold text-white"
                  : "text-muted-foreground",
              )}
            >
              {sections[key].title}
            </Link>
          ))}
        </nav>

        <div className="ml-auto w-full max-w-4xl space-y-4">
          {section.questions.map((q, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <details key={i} className="group rounded-2xl bg-white/5">
              <summary className="flex cursor-pointer list-none items-center justify-between p-6 font-semibold text-white">
                <span>{q.title}</span>
                <ChevronDownIcon className="transition-transform duration-300 group-open:rotate-180" />
              </summary>

              <div className="px-6 pb-6">
                <p className="text-white/80 leading-relaxed">{q.text}</p>
              </div>
            </details>
          ))}
        </div> */}
      </div>
    </section>
  )
}
