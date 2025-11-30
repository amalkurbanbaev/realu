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
    id: "breath",
    particles: [
      {
        src: `/particles/breath/${locale}/1.png`,
        width: 357,
        height: 230,
        position: "left-1/2 -translate-x-[480px] top-[35%] slide-in-from-right-40",
      },
      {
        src: `/particles/breath/${locale}/2.png`,
        width: 384,
        height: 228,
        position: "left-1/2 translate-x-[50px] bottom-[36%] slide-in-from-left-20",
      },
      {
        src: `/particles/breath/ru/3.png`, // одинаковая картинка для всех локалей
        width: 231,
        height: 92,
        position: "left-1/2 translate-x-[180px] bottom-[30%] slide-in-from-left-20",
      },
    ],
  },
  {
    id: "meditation",
    particles: [
      {
        src: `/particles/meditation/${locale}/1.svg`,
        width: 308,
        height: 507,
        position: "left-1/2 scale-125 -translate-x-[480px] top-[30%] slide-in-from-right-40",
      },
      {
        src: `/particles/meditation/${locale}/2.png`,
        width: 390,
        height: 249,
        position: "left-1/2 translate-x-[170px] top-[22%] slide-in-from-left-20",
      },
      {
        src: `/particles/meditation/${locale}/3.svg`,
        width: 411,
        height: 228,
        position: "left-1/2 translate-x-[190px] bottom-[22%] slide-in-from-left-20",
      },
    ],
  },
  {
    id: "tests",
    particles: [
      {
        src: `/particles/tests/${locale}/1.svg`,
        width: 354,
        height: 186,
        position: "left-1/2 scale-125 -translate-x-[390px] top-[18%] slide-in-from-right-40",
      },
      {
        src: `/particles/tests/${locale}/2.svg`,
        width: 334,
        height: 180,
        position: "left-1/2 scale-125 -translate-x-[420px] top-[29%] slide-in-from-right-40",
      },
      {
        src: `/particles/tests/${locale}/3.svg`,
        width: 309,
        height: 181,
        position: "left-1/2 scale-125 -translate-x-[420px] top-[40%] slide-in-from-right-40",
      },
      {
        src: `/particles/tests/${locale}/4.svg`,
        width: 335,
        height: 205,
        position: "left-1/2 scale-125 -translate-x-[400px] top-[51%] slide-in-from-right-40",
      },
      {
        src: `/particles/tests/${locale}/5.svg`,
        width: 354,
        height: 186,
        position: "left-1/2 scale-125 translate-x-[190px] top-[12%] slide-in-from-left-40",
      },
      {
        src: `/particles/tests/${locale}/6.svg`,
        width: 334,
        height: 180,
        position: "left-1/2 scale-125 translate-x-[210px] top-[25%] slide-in-from-left-40",
      },
      {
        src: `/particles/tests/${locale}/7.svg`,
        width: 394,
        height: 178,
        position: "left-1/2 scale-125 translate-x-[190px] top-[40%] slide-in-from-left-40",
      },
      {
        src: `/particles/tests/${locale}/8.svg`,
        width: 335,
        height: 205,
        position: "left-1/2 scale-125 translate-x-[210px] top-[56%] slide-in-from-left-40",
      },
    ],
  },
  {
    id: "yoga",
    particles: [
      {
        src: `/particles/yoga-1.png`,
        width: 307,
        height: 132,
        position: "left-1/2 -translate-x-1/2 top-0 -translate-y-full",
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
