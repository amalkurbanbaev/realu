import * as React from "react"

export const MenuMinimalIcon = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(({ color = "currentColor", ...props }, ref) => (
  <svg
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    viewBox="0 0 28 28"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <title>Menu Icon</title>
    {/* Центрированные линии */}
    <line x1="4" y1="10" x2="24" y2="10" />
    <line x1="4" y1="18" x2="24" y2="18" />
  </svg>
))

MenuMinimalIcon.displayName = "MenuMinimalIcon"
