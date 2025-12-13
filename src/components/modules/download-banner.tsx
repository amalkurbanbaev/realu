import Image from "next/image"
import { getTranslations } from "next-intl/server"

import { cn } from "@/lib/utils"

import { Typography } from "../ui/typography"
import { AppleButton } from "./apple-button"

export async function DownloadBanner() {
  const t = await getTranslations("home-page.layout")

  return (
    <div className="container relative w-full text-center md:text-left">
      <div className="relative overflow-hidden rounded-3xl">
        <DownloadBannerBackground className="-z-10 absolute inset-0 hidden h-full w-full rounded-3xl md:block" />

        <Image
          src="/yog.png"
          fill
          alt="yoga"
          className={cn(
            "-z-10 absolute top-0 right-0 hidden object-cover md:block",
            "md:max-w-[370px] md:object-[0px_0px]",
            "lg:max-w-[500px] lg:object-[0%_15%]",
            "ml-auto xl:max-w-[600px] xl:object-[0%_35%]",
          )}
        />

        <div className="text-center md:p-12 md:text-left">
          <div className="mx-auto flex w-full max-w-md flex-col gap-2 md:mx-0 md:gap-4">
            <Typography variant="headline-1" as="h3">
              {t("title2")}
            </Typography>

            <div className="flex flex-col-reverse items-center gap-4 md:flex-row">
              <AppleButton className="shrink-0" />
              <Typography variant="body-1" as="p" className="max-w-[250px]">
                {t("description2")}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const DownloadBannerBackground = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg viewBox="0 0 1200 224" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" {...props}>
      <title>Download Banner Background</title>
      <g filter="url(#filter0_f_652_6743)">
        <path
          d="M1157.8 559.318C1197.7 511.081 1300.48 596.157 1312.09 547.275L1177.49 306.922V-158.832L518.277 354.877C460.962 268.793 450.047 200.944 438.172 159.059C383.637 -33.2891 419.283 -408.507 356.37 -320.958C316.015 -264.8 -613.385 -346.715 -265.5 387L209.5 595.5L518.277 354.877C520.191 357.752 522.157 360.647 524.177 363.562C574.174 435.74 711.198 509.588 777.421 521.258C896.87 542.307 1107.92 619.614 1157.8 559.318Z"
          fill="#292656"
        />
      </g>
      <g filter="url(#filter1_f_652_6743)">
        <path
          d="M1309.59 496.717C1364.36 461.834 1360.69 280.131 1372.3 231.249L1213.38 217.828L1148.01 533.549C1023.9 541.746 870.883 526.707 799.121 496.717C737.077 470.789 1195.56 -18.5367 1124.5 -139C1075.65 -221.824 730.5 81.6791 730.5 -45C730.5 -115.652 612.945 -560.786 522.814 -533.983C292.974 -465.632 -209.311 -162.49 51.9999 445L245.5 570.001L1091.5 806.5L1148.01 533.549C1217.23 528.978 1277.46 517.18 1309.59 496.717Z"
          fill="#413C8A"
        />
      </g>
      <g filter="url(#filter2_f_652_6743)">
        <path
          d="M1326.51 525.575C1366.42 477.338 1404.09 294.854 1415.7 245.972L1287.65 102.299V-288.345L152.905 -263.585C233.565 -373.772 326.724 -443.512 201.288 -340.272C190.371 -331.287 184.748 -327.363 182.136 -326.079C189.726 -338.112 175.148 -322.643 182.136 -326.079C178.69 -320.617 170.676 -309.486 154 -288.345L74.7229 -261.879L152.905 -263.585C100.639 -192.187 53.6217 -103.807 74.7229 -34.5C87.9021 8.78662 188 285 301 367C369.569 416.758 741.271 404.499 793.895 429.572C900.01 480.13 1276.63 585.871 1326.51 525.575Z"
          fill="#4C4794"
        />
      </g>
      <g opacity="0.8" filter="url(#filter3_f_652_6743)">
        <path
          d="M1282.77 501.489C1322.68 453.252 1290.9 8.71939 1302.51 -40.1624L1363.16 -53.5843V-444.229L470.693 -426.116L359.935 -345.532C275.514 -350.224 213.069 -350.251 219.5 -342.5C225.014 -335.854 238.091 -308.061 254.598 -268.893L142.208 -187.122L112.328 -146.448C133.396 -173.157 197.782 -194.062 278.2 -210.984C318.321 -109.639 365.778 24.0068 380 94C393.71 161.471 534.452 311.465 627.5 407C699.758 481.19 1232.89 561.785 1282.77 501.489Z"
          fill="#8686D0"
        />
      </g>
      <g filter="url(#filter4_f_652_6743)">
        <path
          d="M1314.92 284.26C1344.32 248.728 1306.37 96.1087 1314.92 60.1014L1256.71 48.364V-239.392L652.118 -227.122C840.389 -318.817 613.913 -314.006 555.533 -334.591C540.583 -339.863 527.623 -344.844 516.441 -349.53L506.339 -364.585C552.5 -423.106 359.59 -415.267 516.441 -349.53L599.299 -226.05L652.118 -227.122C639.293 -220.876 624.542 -214.181 607.682 -207C564.737 -188.708 573.856 55.8073 578.5 101C597.814 288.951 797.865 338.358 845.5 366.5C921.848 411.604 1278.18 328.675 1314.92 284.26Z"
          fill="#EF8B93"
        />
      </g>
      <g filter="url(#filter5_f_652_6743)">
        <path
          d="M1154.78 -69.308C1235.85 -133.926 1277.32 -33.3006 1285.87 -69.308L1330.55 -79.1948V-366.951L673.138 -353.609L621.896 -235.116C671.348 -297.809 755.239 -191.639 805.37 -191.639C806.053 -191.639 806.722 -191.642 807.379 -191.647C775.251 -181.682 740.498 -174.662 817.882 -192.009C827.822 -192.677 833.313 -194.187 836.039 -196.067C851.371 -199.483 869.915 -203.59 892.171 -208.481C955.537 -222.409 981.293 127.226 1005.56 126.678C1029.82 126.13 1108.59 -32.4965 1154.78 -69.308Z"
          fill="#FFD5B0"
        />
      </g>
      <g filter="url(#filter6_f_652_6743)" data-figma-bg-blur-radius="8.54757">
        <ellipse
          cx="1148.99"
          cy="-42.5504"
          rx="69.6135"
          ry="148.326"
          transform="rotate(105.063 1148.99 -42.5504)"
          fill="url(#paint0_linear_652_6743)"
          fillOpacity="0.3"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_652_6743"
          x="-615.958"
          y="-606.661"
          width="2200.71"
          height="1474.83"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="136.336" result="effect1_foregroundBlur_652_6743" />
        </filter>
        <filter
          id="filter1_f_652_6743"
          x="-294.125"
          y="-807.816"
          width="1939.1"
          height="1886.99"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="136.336" result="effect1_foregroundBlur_652_6743" />
        </filter>
        <filter
          id="filter2_f_652_6743"
          x="-203.114"
          y="-663.474"
          width="1891.49"
          height="1479.79"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="136.336" result="effect1_foregroundBlur_652_6743" />
        </filter>
        <filter
          id="filter3_f_652_6743"
          x="-160.344"
          y="-716.9"
          width="1796.18"
          height="1512.17"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="136.336" result="effect1_foregroundBlur_652_6743" />
        </filter>
        <filter
          id="filter4_f_652_6743"
          x="153.812"
          y="-704.049"
          width="1472.47"
          height="1383.58"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="150" result="effect1_foregroundBlur_652_6743" />
        </filter>
        <filter
          id="filter5_f_652_6743"
          x="436.223"
          y="-552.624"
          width="1080"
          height="864.975"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="92.8363" result="effect1_foregroundBlur_652_6743" />
        </filter>
        <filter
          id="filter6_f_652_6743"
          x="890.992"
          y="-233.667"
          width="515.992"
          height="382.233"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="56.8066" result="effect1_foregroundBlur_652_6743" />
        </filter>
        <clipPath id="bgblur_0_652_6743_clip_path" transform="translate(-890.992 233.667)">
          <ellipse cx="1148.99" cy="-42.5504" rx="69.6135" ry="148.326" transform="rotate(105.063 1148.99 -42.5504)" />
        </clipPath>
        <linearGradient id="paint0_linear_652_6743" x1="1148.99" y1="-190.876" x2="1148.99" y2="105.776" gradientUnits="userSpaceOnUse">
          <stop offset="0.324898" stopColor="#FFBFBE" />
          <stop offset="1" stopColor="#F9C66E" />
        </linearGradient>
      </defs>
    </svg>
  )
}
