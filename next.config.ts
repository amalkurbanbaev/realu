import type { NextConfig } from "next"
import createNextIntlPlugin from "next-intl/plugin"

const nextConfig: NextConfig = {
  // Разрешаем доступ с других устройств в локальной сети
  allowedDevOrigins: ["192.168.1.127", "localhost", "127.0.0.1"],
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)
