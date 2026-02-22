import type * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const typographyVariants = cva("text-foreground", {
  variants: {
    variant: {
      // Headline 1: D 24/32, M 20/24
      "headline-1": "font-medium text-[20px] leading-[24px] md:font-bold md:text-[24px] md:leading-[32px]",
      // Headline 2: D 20/24, M 16/24
      "headline-2": "font-bold text-[16px] leading-[24px] md:font-medium md:text-[20px] md:leading-[24px]",
      // Headline 3: D 16/24, M 14/20
      "headline-3": "font-bold text-[14px] leading-[20px] md:text-[16px] md:leading-[24px]",
      // Menu: 20/24
      menu: "font-semibold text-[20px] leading-[24px]",
      // Tabs: 16/24
      tabs: "font-semibold text-[16px] leading-[24px]",
      // Button: 16/24
      button: "font-medium text-[16px] leading-[24px]",
      // Body 1: D 16/24, M 14/20
      "body-1": "font-light text-[14px] text-white/80 leading-[20px] md:text-[16px] md:leading-[24px]",
      // Body 2: D 14/20, M 12/16
      "body-2": "font-light text-[12px] text-white/80 leading-[16px] md:text-[14px] md:leading-[20px]",
      // Caption: D 12/16, M 12/16
      caption: "font-medium text-[12px] leading-[16px]",
    },
  },
  defaultVariants: {
    variant: "body-1",
  },
})

type TypographyAs = "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "div"

interface TypographyProps extends React.PropsWithChildren, VariantProps<typeof typographyVariants> {
  className?: string
  as?: TypographyAs
}

export const Typography = ({ variant, as = "p", className, children, ...props }: TypographyProps) => {
  const Component = as as React.ElementType

  return (
    <Component className={cn(typographyVariants({ variant, className }))} {...props}>
      {children}
    </Component>
  )
}
