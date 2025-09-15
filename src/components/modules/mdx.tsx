"use client"
import type { ComponentProps } from "react"
import Image from "next/image"

export const mdxComponents = {
  img: (props: ComponentProps<typeof Image>) => <Image {...props} width={1200} height={630} alt={props.alt ?? ""} />,
}
