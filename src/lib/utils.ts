import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function getLocalizedContent<T>(
  path: "features" | "testimonials" | "faq",
  locale: "ru" | "en",
): Promise<T> {
  const mod = await import(`@/content/${path}/${locale}.ts`)
  return mod.default as T
}
