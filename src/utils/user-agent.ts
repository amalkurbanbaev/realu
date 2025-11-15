import { headers } from "next/headers"

const IOS_WEB_VIEW_USER_AGENT = "real-u-web-view"

export async function isIOSWebView(): Promise<boolean> {
  const headersList = await headers()
  const userAgent = headersList.get("user-agent") || ""
  return userAgent.toLowerCase().includes(IOS_WEB_VIEW_USER_AGENT.toLowerCase())
}
