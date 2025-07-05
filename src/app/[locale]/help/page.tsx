import { PageLayout } from "@/components/layout"
import { HelpPageTemplate } from "@/templates/help"

type HelpPageProps = {
  searchParams?: Promise<{
    tab?: string
  }>
}

export default async function HelpPage(props: HelpPageProps) {
  const searchParams = await props.searchParams

  return (
    <PageLayout>
      <HelpPageTemplate activeTab={searchParams?.tab} />
    </PageLayout>
  )
}
