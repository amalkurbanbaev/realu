import Image from "next/image"

export function GradientBackgroundTop() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-0 flex h-[calc(100vh/1.5)] w-full">
      <Image src="/gradients/header-gradient.svg" fill alt="gradient" />
    </div>
  )
}

export function GradientBackgroundBottom() {
  return (
    <svg
      className="-z-10 pointer-events-none absolute inset-x-0 bottom-0 w-full object-cover object-bottom"
      width="1280"
      viewBox="0 0 1280 832"
      height="832"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Gradient Background Bottom</title>
      <g filter="url(#filter0_f_652_6888)">
        <path
          d="M1208.12 1009.92C1228.96 970.714 1665.89 726.173 1684.91 722.009L1586.38 364.639L1074.01 -153.309L470.509 -372.896L-188.491 -645.396L-71.4907 -235.395C-27.9539 -170.231 -421.792 -60.6364 -221.491 -52.3936C-65.2016 -45.9619 -439.555 703.941 -389.491 672.618C-339.427 641.295 470.036 1050.2 437.509 1174.12C411.488 1273.25 783.615 1343.68 793.468 1374.72C900.165 1610.25 1094.86 1390.94 1144.26 1311.97C1186.94 1243.77 1182.08 1058.92 1208.12 1009.92Z"
          fill="#292656"
        />
      </g>
      <g filter="url(#filter1_f_652_6888)">
        <path
          d="M1604.42 559.854C1586.92 565.052 1479.37 861.041 1456.39 892.57C1427.66 931.982 1144.51 1045.66 1112.22 1105.2C1066.06 1190.31 895.21 1325.02 775.009 1247C733.306 1239.09 336.704 1132.74 345.94 924.62C350.601 819.622 31.8764 477.184 -2.49051 517.618C-36.8574 558.052 -117.312 141.86 -206.491 141.111C-273.03 140.552 -121.201 -9.18711 -126.293 -64.8903L-129.99 -75.3918C-127.846 -72.4422 -126.661 -68.9113 -126.293 -64.8903L-60.9905 120.607L591.036 229.928L1153.26 -25.7523L1555.44 304.166L1604.42 559.854Z"
          fill="#343072"
        />
      </g>
      <g filter="url(#filter2_f_652_6888)">
        <path
          d="M1436.39 779.069C1450.52 756.257 1578.24 449.855 1590.02 446.835L1326.6 233.653L1042.98 115.945L669.382 280.634L106.509 -80.3887L106.509 72.1122C130.82 107.253 -456.794 510.028 -244.491 400.614C-189.623 372.337 297.16 496.626 318.009 466.614C387.765 366.2 530.895 637.71 496.014 713.615C462.74 786.024 810.494 1053.55 838.177 1061.46C941.823 1140.93 1051.75 1039.02 1099.18 971.871C1126.67 932.956 1418.72 807.584 1436.39 779.069Z"
          fill="#5C56A9"
        />
        <path
          d="M1436.39 779.069C1450.52 756.257 1578.24 449.855 1590.02 446.835L1326.6 233.653L1042.98 115.945L669.382 280.634L106.509 -80.3887L106.509 72.1122C130.82 107.253 -456.794 510.028 -244.491 400.614C-189.623 372.337 297.16 496.626 318.009 466.614C387.765 366.2 530.895 637.71 496.014 713.615C462.74 786.024 810.494 1053.55 838.177 1061.46C941.823 1140.93 1051.75 1039.02 1099.18 971.871C1126.67 932.956 1418.72 807.584 1436.39 779.069Z"
          fill="black"
          fillOpacity="0.2"
        />
      </g>
      <g filter="url(#filter3_f_652_6888)">
        <path
          d="M1532.52 936.114C1546.65 913.302 1578.24 449.855 1590.02 446.835L1326.6 233.653L1042.98 115.945L669.382 280.634L106.509 -80.3879L106.509 72.1128C130.82 107.254 -456.794 510.029 -244.491 400.615C-189.622 372.338 297.16 496.626 318.009 466.614C387.765 366.2 804.39 390.709 769.509 466.614C736.235 539.022 502.516 838.114 782.514 991.115C886.16 1070.58 1051.75 1039.02 1099.18 971.871C1126.67 932.955 1514.85 964.629 1532.52 936.114Z"
          fill="#7B74D3"
        />
        <path
          d="M1532.52 936.114C1546.65 913.302 1578.24 449.855 1590.02 446.835L1326.6 233.653L1042.98 115.945L669.382 280.634L106.509 -80.3879L106.509 72.1128C130.82 107.254 -456.794 510.029 -244.491 400.615C-189.622 372.338 297.16 496.626 318.009 466.614C387.765 366.2 804.39 390.709 769.509 466.614C736.235 539.022 502.516 838.114 782.514 991.115C886.16 1070.58 1051.75 1039.02 1099.18 971.871C1126.67 932.955 1514.85 964.629 1532.52 936.114Z"
          fill="black"
          fillOpacity="0.2"
        />
      </g>
      <g filter="url(#filter4_f_652_6888)">
        <path
          d="M1907.96 576.196C1895.24 575.622 1810.89 846.48 1787.19 857.495C1757.56 871.265 1590.35 854.642 1557.19 883.495C1504.24 929.556 1104.89 913.718 1065.08 844.5C1046.83 826.264 954.33 793.095 1065.08 586.5C1096.38 528.098 1524.52 56.8178 1513.98 -19.2769L1502.29 -29.5639C1497.58 -29.9193 1491.4 -28.9353 1483.62 -26.4853C1447.83 -15.2152 1408.49 122.953 1351.43 107.053C1305.79 94.3338 1097.36 -204.238 1089.33 -230.66L1072.82 -331.72L1380.69 -136.559L1502.29 -29.5639C1509.37 -29.0287 1513.12 -25.4555 1513.98 -19.2769L1784.28 218.576L1949.01 445.846L1907.96 576.196Z"
          fill="#CE6C74"
        />
      </g>
      <defs>
        <filter
          id="filter0_f_652_6888"
          x="-636.652"
          y="-887.91"
          width="2564.08"
          height="2611.11"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="121.257" result="effect1_foregroundBlur_652_6888" />
        </filter>
        <filter
          id="filter1_f_652_6888"
          x="-723.385"
          y="-575.392"
          width="2827.81"
          height="2345.83"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_652_6888" />
        </filter>
        <filter
          id="filter2_f_652_6888"
          x="-790.82"
          y="-580.389"
          width="2880.84"
          height="2170.85"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_652_6888" />
        </filter>
        <filter
          id="filter3_f_652_6888"
          x="-790.819"
          y="-580.388"
          width="2880.84"
          height="2118.47"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="250" result="effect1_foregroundBlur_652_6888" />
        </filter>
        <filter
          id="filter4_f_652_6888"
          x="11.5454"
          y="-1331.72"
          width="2937.46"
          height="3241.38"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="500" result="effect1_foregroundBlur_652_6888" />
        </filter>
      </defs>
    </svg>
  )
}
