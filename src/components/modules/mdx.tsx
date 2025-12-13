import type { ComponentProps } from "react"
import Image from "next/image"

import { Typography } from "../ui/typography"

// Кастомные компоненты для MDX
function CustomImage(props: ComponentProps<typeof Image>) {
  return (
    <Image
      {...props}
      width={props.width || 1200}
      height={props.height || 630}
      alt={props.alt || ""}
      className="rounded-xl shadow-lg"
      sizes="(max-width: 768px) 100vw, 768px"
    />
  )
}

function CustomBlockquote({ children }: { children: React.ReactNode }) {
  return <blockquote className="border-primary border-l-4 bg-muted/50 p-4 italic">{children}</blockquote>
}

function CustomTable({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-border">{children}</table>
    </div>
  )
}

function CustomParagraph({ children }: { children: React.ReactNode }) {
  return (
    <Typography variant="body-1" className="font-medium">
      {children}
    </Typography>
  )
}

export const mdxComponents = {
  img: CustomImage,
  Image: CustomImage,
  blockquote: CustomBlockquote,
  table: CustomTable,
  th: ({ children }: { children: React.ReactNode }) => <th className="border border-border bg-muted p-2 text-left font-semibold">{children}</th>,
  td: ({ children }: { children: React.ReactNode }) => <td className="border border-border p-2">{children}</td>,
  p: CustomParagraph,
}
