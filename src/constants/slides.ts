import type { RawSlide } from "@/types/entities"

export const getRawSlides = (locale: string): RawSlide[] => [
  {
    id: "learn",
    particles: [
      // Слева вверху (вылетает из центра влево)
      {
        src: `/particles/learn/${locale}/1.png`,
        width: 322,
        height: 184,
        position: "left-1/2 -translate-x-[320px] top-[22%] slide-in-from-right-40",
      },
      // Слева посередине (вылетает из центра влево)
      {
        src: `/particles/learn/${locale}/2.png`,
        width: 338,
        height: 226,
        position: "left-1/2 scale-150 -translate-x-[400px] top-[40%] slide-in-from-right-20",
      },
      // Слева внизу (вылетает из центра влево)
      {
        src: `/particles/learn/${locale}/3.png`,
        width: 389,
        height: 227,
        position: "left-1/2 -translate-x-[370px] bottom-[17%] slide-in-from-right-20",
      },
      // Справа вверху (вылетает из центра вправо)
      {
        src: `/particles/learn/${locale}/4.png`,
        width: 273,
        height: 326,
        position: "left-1/2 translate-x-[140px] top-[30%] slide-in-from-left-40",
      },
      // Справа внизу (вылетает из центра вправо)
      {
        src: `/particles/learn/${locale}/5.png`,
        width: 322,
        height: 184,
        position: "left-1/2 translate-x-[180px] bottom-[20%] slide-in-from-left-20",
      },
    ],
  },

  {
    id: "meditation",
    particles: [
      {
        src: `/particles/meditation-1.svg`,
        width: 414,
        height: 192,
        position: "left-1/2 -translate-x-1/2 top-0 -translate-y-full",
      },
      {
        src: `/particles/meditation-2.svg`,
        width: 411,
        height: 228,
        position: "left-1/2 -translate-x-1/2 bottom-0 translate-y-full",
      },
    ],
  },
  {
    id: "breath",
    particles: [
      {
        src: `/particles/breath-1.png`,
        width: 357,
        height: 230,
        position: "left-1/4 top-0 -translate-y-full",
      },
      {
        src: `/particles/breath-2.svg`,
        width: 384,
        height: 228,
        position: "left-1/2 -translate-x-1/2 bottom-0 translate-y-full",
      },
    ],
  },
  {
    id: "yoga",
    particles: [
      {
        src: `/particles/yoga-1.svg`,
        width: 307,
        height: 132,
        position: "left-1/2 -translate-x-1/2 top-0 -translate-y-full",
      },
    ],
  },
  {
    id: "tests",
    particles: [
      {
        src: `/particles/tests-1.png`,
        width: 362,
        height: 231,
        position: "left-1/2 -translate-x-1/2 top-0 -translate-y-3/4",
      },
      {
        src: `/particles/tests-2.png`,
        width: 361,
        height: 171,
        position: "left-[10%] bottom-0 translate-y-10/12",
      },
      {
        src: `/particles/tests-3.png`,
        width: 375,
        height: 197,
        position: "left-[20%] -bottom-10 translate-y-full",
      },
    ],
  },
  {
    id: "diary",
    particles: [
      {
        src: `/particles/diary-1.png`,
        width: 402,
        height: 290,
        position: "left-1/2 -translate-x-1/2 top-0 -translate-y-full",
      },
      {
        src: `/particles/diary-2.png`,
        width: 317,
        height: 192,
        position: "left-1/2 -translate-x-1/2 bottom-0 translate-y-full",
      },
    ],
  },
  {
    id: "warmup",
    particles: [
      {
        src: `/particles/warmup-1.png`,
        width: 395,
        height: 183,
        position: "left-1/2 -translate-x-1/2 top-0 -translate-y-full",
      },
      {
        src: `/particles/warmup-2.png`,
        width: 358,
        height: 165,
        position: "left-1/2 -translate-x-1/2 -bottom-20 translate-y-full",
      },
    ],
  },
]
