/**
 * The MCP-USE × Next.js starter page, rendered from a shared component.
 *
 * The Next.js home page (`src/app/page.tsx`) and the MCP widget at
 * `src/mcp/resources/demo_page/widget.tsx` both render this. Edit the
 * starter once and the change shows up in the web app AND in the MCP
 * widget served to Inspector / ChatGPT / Claude — the "drop-in MCP for
 * Next.js" story in one file.
 *
 * SVG logos are inlined so the component renders identically from a
 * Next.js request (where `/next.svg` resolves via the `public/` folder)
 * and from the widget iframe (which has a different origin).
 */

function NextLogo({
  width = 100,
  height = 20,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 394 80"
      width={width}
      height={height}
      className={className}
      aria-label="Next.js logo"
    >
      <path
        fill="currentColor"
        d="M262 0h68.5v12.7h-27.2v66.6h-13.6V12.7H262V0ZM149 0v12.7H94v20.4h44.3v12.6H94v21h55v12.6H80.5V0h68.7zm34.3 0h-17.8l63.8 79.4h17.9l-32-39.7 32-39.6h-17.9l-23 28.6-23-28.6zm18.3 56.7-9-11-27.1 33.7h17.8l18.3-22.7z"
      />
      <path
        fill="currentColor"
        d="M81 79.3 17 0H0v79.3h13.6V17l50.2 62.3H81Zm252.6-.4c-1 0-1.8-.4-2.5-1s-1.1-1.6-1.1-2.6.3-1.8 1-2.5 1.6-1 2.6-1 1.8.3 2.5 1a3.4 3.4 0 0 1 .6 4.3 3.7 3.7 0 0 1-3 1.8zm23.2-33.5h6v23.3c0 2.1-.4 4-1.3 5.5a9.1 9.1 0 0 1-3.8 3.5c-1.6.8-3.5 1.3-5.7 1.3-2 0-3.7-.4-5.3-1s-2.8-1.8-3.7-3.2c-.9-1.3-1.4-3-1.4-5h6c.1.8.3 1.6.7 2.2s1 1.2 1.6 1.5c.7.4 1.5.5 2.4.5 1 0 1.8-.2 2.4-.6a4 4 0 0 0 1.6-1.8c.3-.8.5-1.8.5-3V45.5zm30.9 9.1a4.4 4.4 0 0 0-2-3.3 7.5 7.5 0 0 0-4.3-1.1c-1.3 0-2.4.2-3.3.5-.9.4-1.6 1-2 1.6a3.5 3.5 0 0 0-.3 4c.3.5.7.9 1.3 1.2l1.8 1 2 .5 3.2.8c1.3.3 2.5.7 3.7 1.2a13 13 0 0 1 3.2 1.8 8.1 8.1 0 0 1 3 6.5c0 2-.5 3.7-1.5 5.1a10 10 0 0 1-4.4 3.5c-1.8.8-4.1 1.2-6.8 1.2-2.6 0-4.9-.4-6.8-1.2-2-.8-3.4-2-4.5-3.5a10 10 0 0 1-1.7-5.6h6a5 5 0 0 0 3.5 4.6c1 .4 2.2.6 3.4.6 1.3 0 2.5-.2 3.5-.6 1-.4 1.8-1 2.4-1.7a4 4 0 0 0 .8-2.4c0-.9-.2-1.6-.7-2.2a11 11 0 0 0-2.1-1.4l-3.2-1-3.8-1c-2.8-.7-5-1.7-6.6-3.2a7.2 7.2 0 0 1-2.4-5.7 8 8 0 0 1 1.7-5 10 10 0 0 1 4.3-3.5c2-.8 4-1.2 6.4-1.2 2.3 0 4.4.4 6.2 1.2 1.8.8 3.2 2 4.3 3.4 1 1.4 1.5 3 1.5 5h-5.8z"
      />
    </svg>
  );
}

function ManufactSymbol({
  width = 16,
  height = 16,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 500 500"
      fill="none"
      width={width}
      height={height}
      className={className}
      aria-label="Manufact symbol"
    >
      <path
        fill="currentColor"
        d="M105.933 0C164.437 0.000116002 211.865 47.607 211.865 106.333C211.865 131.829 210.493 158.403 221.068 181.602L228.975 198.947C243.584 230.997 269.265 256.7 301.303 271.336L316.155 278.121C340.142 289.079 367.694 287.335 394.066 287.335C452.571 287.335 499.999 334.942 499.999 393.668C499.999 452.394 452.571 500.001 394.066 500.001C335.562 500.001 288.134 452.394 288.134 393.668C288.134 368.974 289.24 343.275 278.992 320.807L270.586 302.38C255.948 270.29 230.214 244.565 198.118 229.939L180.164 221.758C157.282 211.331 131.078 212.666 105.933 212.666C47.4278 212.666 4.86252e-05 165.059 0 106.333C0 47.607 47.4278 0 105.933 0Z"
      />
      <circle fill="currentColor" cx="100.426" cy="399.575" r="100.426" />
      <path
        fill="currentColor"
        d="M500 100.426C500 155.889 455.037 200.851 399.574 200.851C344.11 200.851 299.148 155.889 299.148 100.426C299.148 44.962 344.11 0 399.574 0C455.037 0 500 44.962 500 100.426Z"
      />
    </svg>
  );
}

function McpUseWordmark({
  width = 103,
  height = 20,
  className,
}: {
  width?: number;
  height?: number;
  className?: string;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2476 480"
      fill="none"
      width={width}
      height={height}
      className={className}
      aria-label="mcp-use wordmark"
    >
      <path
        fill="currentColor"
        d="M793.5 245.5C793.5 218.167 790 198.5 783 186.5C776.333 174.167 763.667 168 745 168C738.333 168 731 168.5 723 169.5C715 170.5 709 171.333 705 172V383H644.5V130C656.167 126.667 671.333 123.5 690 120.5C709 117.5 729 116 750 116C768 116 782.667 118.333 794 123C805.667 127.667 815.333 133.833 823 141.5C826.667 138.833 831.333 136 837 133C842.667 130 849 127.333 856 125C863 122.333 870.333 120.167 878 118.5C886 116.833 894 116 902 116C922.333 116 939 119 952 125C965.333 130.667 975.667 138.833 983 149.5C990.667 159.833 995.833 172.5 998.5 187.5C1001.5 202.167 1003 218.333 1003 236V383H942.5V245.5C942.5 218.167 939.167 198.5 932.5 186.5C925.833 174.167 913 168 894 168C884.333 168 875.167 169.667 866.5 173C857.833 176 851.333 179 847 182C849.667 190.333 851.5 199.167 852.5 208.5C853.5 217.833 854 227.833 854 238.5V383H793.5V245.5ZM1052.62 252.5C1052.62 233.167 1055.62 215.167 1061.62 198.5C1067.62 181.5 1076.12 166.833 1087.12 154.5C1098.45 142.167 1112.12 132.5 1128.12 125.5C1144.12 118.5 1162.12 115 1182.12 115C1206.78 115 1230.12 119.5 1252.12 128.5L1239.12 178C1232.12 175 1224.12 172.5 1215.12 170.5C1206.45 168.5 1197.12 167.5 1187.12 167.5C1163.45 167.5 1145.45 175 1133.12 190C1120.78 204.667 1114.62 225.5 1114.62 252.5C1114.62 278.5 1120.45 299.167 1132.12 314.5C1143.78 329.5 1163.45 337 1191.12 337C1201.45 337 1211.62 336 1221.62 334C1231.62 332 1240.28 329.5 1247.62 326.5L1256.12 376.5C1249.45 379.833 1239.28 382.833 1225.62 385.5C1212.28 388.167 1198.45 389.5 1184.12 389.5C1161.78 389.5 1142.28 386.167 1125.62 379.5C1109.28 372.5 1095.62 363 1084.62 351C1073.95 338.667 1065.95 324.167 1060.62 307.5C1055.28 290.5 1052.62 272.167 1052.62 252.5ZM1466.46 253.5C1466.46 226.5 1460.29 205.5 1447.96 190.5C1435.96 175.5 1416.46 168 1389.46 168C1383.79 168 1377.79 168.333 1371.46 169C1365.46 169.333 1359.46 170.333 1353.46 172V321.5C1358.79 325.167 1365.79 328.667 1374.46 332C1383.46 335 1392.96 336.5 1402.96 336.5C1424.96 336.5 1440.96 329 1450.96 314C1461.29 299 1466.46 278.833 1466.46 253.5ZM1528.46 252.5C1528.46 272.5 1525.79 290.833 1520.46 307.5C1515.46 324.167 1508.12 338.5 1498.46 350.5C1488.79 362.5 1476.62 371.833 1461.96 378.5C1447.62 385.167 1431.29 388.5 1412.96 388.5C1400.62 388.5 1389.29 387 1378.96 384C1368.62 381 1360.12 377.667 1353.46 374V475.5H1292.96V130C1305.29 126.667 1320.46 123.5 1338.46 120.5C1356.46 117.5 1375.46 116 1395.46 116C1416.12 116 1434.62 119.167 1450.96 125.5C1467.29 131.833 1481.12 141 1492.46 153C1504.12 164.667 1512.96 179 1518.96 196C1525.29 212.667 1528.46 231.5 1528.46 252.5ZM1553.81 212.5H1688.31V268H1553.81V212.5ZM1943.02 375C1931.36 378 1916.19 381 1897.52 384C1878.86 387.333 1858.36 389 1836.02 389C1815.02 389 1797.36 386 1783.02 380C1769.02 374 1757.69 365.667 1749.02 355C1740.69 344.333 1734.69 331.667 1731.02 317C1727.36 302 1725.52 285.667 1725.52 268V121.5H1786.02V258.5C1786.02 286.5 1790.02 306.5 1798.02 318.5C1806.36 330.5 1820.69 336.5 1841.02 336.5C1848.36 336.5 1856.02 336.167 1864.02 335.5C1872.36 334.833 1878.52 334 1882.52 333V121.5H1943.02V375ZM2075.53 339.5C2091.53 339.5 2103.19 337.667 2110.53 334C2117.86 330 2121.53 323.333 2121.53 314C2121.53 305.333 2117.53 298.167 2109.53 292.5C2101.86 286.833 2089.03 280.667 2071.03 274C2060.03 270 2049.86 265.833 2040.53 261.5C2031.53 256.833 2023.69 251.5 2017.03 245.5C2010.36 239.5 2005.03 232.333 2001.03 224C1997.36 215.333 1995.53 204.833 1995.53 192.5C1995.53 168.5 2004.36 149.667 2022.03 136C2039.69 122 2063.69 115 2094.03 115C2109.36 115 2124.03 116.5 2138.03 119.5C2152.03 122.167 2162.53 124.833 2169.53 127.5L2158.53 176.5C2151.86 173.5 2143.36 170.833 2133.03 168.5C2122.69 165.833 2110.69 164.5 2097.03 164.5C2084.69 164.5 2074.69 166.667 2067.03 171C2059.36 175 2055.53 181.333 2055.53 190C2055.53 194.333 2056.19 198.167 2057.53 201.5C2059.19 204.833 2061.86 208 2065.53 211C2069.19 213.667 2074.03 216.5 2080.03 219.5C2086.03 222.167 2093.36 225 2102.03 228C2116.36 233.333 2128.53 238.667 2138.53 244C2148.53 249 2156.69 254.833 2163.03 261.5C2169.69 267.833 2174.53 275.167 2177.53 283.5C2180.53 291.833 2182.03 301.833 2182.03 313.5C2182.03 338.5 2172.69 357.5 2154.03 370.5C2135.69 383.167 2109.36 389.5 2075.03 389.5C2052.03 389.5 2033.53 387.5 2019.53 383.5C2005.53 379.833 1995.69 376.833 1990.03 374.5L2000.53 324C2009.53 327.667 2020.19 331.167 2032.53 334.5C2045.19 337.833 2059.53 339.5 2075.53 339.5ZM2214.04 253.5C2214.04 230.5 2217.38 210.333 2224.04 193C2231.04 175.667 2240.21 161.333 2251.54 150C2262.88 138.333 2275.88 129.667 2290.54 124C2305.21 118 2320.21 115 2335.54 115C2371.54 115 2399.54 126.167 2419.54 148.5C2439.88 170.833 2450.04 204.167 2450.04 248.5C2450.04 251.833 2449.88 255.667 2449.54 260C2449.54 264 2449.38 267.667 2449.04 271H2276.54C2278.21 292 2285.54 308.333 2298.54 320C2311.88 331.333 2331.04 337 2356.04 337C2370.71 337 2384.04 335.667 2396.04 333C2408.38 330.333 2418.04 327.5 2425.04 324.5L2433.04 374C2429.71 375.667 2425.04 377.5 2419.04 379.5C2413.38 381.167 2406.71 382.667 2399.04 384C2391.71 385.667 2383.71 387 2375.04 388C2366.38 389 2357.54 389.5 2348.54 389.5C2325.54 389.5 2305.54 386.167 2288.54 379.5C2271.54 372.5 2257.54 363 2246.54 351C2235.54 338.667 2227.38 324.333 2222.04 308C2216.71 291.333 2214.04 273.167 2214.04 253.5ZM2389.54 226.5C2389.54 218.167 2388.38 210.333 2386.04 203C2383.71 195.333 2380.21 188.833 2375.54 183.5C2371.21 177.833 2365.71 173.5 2359.04 170.5C2352.71 167.167 2345.04 165.5 2336.04 165.5C2326.71 165.5 2318.54 167.333 2311.54 171C2304.54 174.333 2298.54 178.833 2293.54 184.5C2288.88 190.167 2285.21 196.667 2282.54 204C2279.88 211.333 2278.04 218.833 2277.04 226.5H2389.54Z"
      />
      <path
        fill="currentColor"
        d="M101.695 0C157.859 0 203.389 45.7023 203.39 102.079C203.39 126.557 202.073 152.071 212.226 174.344L219.814 190.989C233.838 221.756 258.492 246.431 289.248 260.482L303.509 266.996C326.537 277.516 352.987 275.841 378.305 275.841C434.47 275.841 480 321.544 480 377.921C480 434.297 434.47 480 378.305 480C322.141 480 276.611 434.297 276.61 377.921C276.61 354.218 277.672 329.551 267.834 307.986L259.76 290.284C245.708 259.478 221.002 234.782 190.19 220.742L172.955 212.888C150.989 202.878 125.834 204.159 101.695 204.159C45.5304 204.159 0 158.456 0 102.079C0.000190044 45.7023 45.5304 3.62652e-05 101.695 0Z"
      />
      <circle
        fill="currentColor"
        cx="96.4085"
        cy="383.593"
        r="96.4085"
      />
      <path
        fill="currentColor"
        d="M480 96.4085C480 149.653 436.836 192.817 383.592 192.817C330.347 192.817 287.184 149.653 287.184 96.4085C287.184 43.1635 330.347 0 383.592 0C436.836 0 480 43.1635 480 96.4085Z"
      />
    </svg>
  );
}

function FileIcon({ width = 16, height = 16 }: { width?: number; height?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      width={width}
      height={height}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5 13.5V5.41a1 1 0 0 0-.3-.7L9.8.29A1 1 0 0 0 9.08 0H1.5v13.5A2.5 2.5 0 0 0 4 16h8a2.5 2.5 0 0 0 2.5-2.5m-1.5 0v-7H8v-5H3v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1M9.5 5V2.12L12.38 5zM5.13 5h-.62v1.25h2.12V5zm-.62 3h7.12v1.25H4.5zm.62 3h-.62v1.25h7.12V11z"
      />
    </svg>
  );
}

function WindowIcon({ width = 16, height = 16 }: { width?: number; height?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      width={width}
      height={height}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.5 2.5h13v10a1 1 0 0 1-1 1h-11a1 1 0 0 1-1-1zM0 1h16v11.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 12.5zm3.75 4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5M7 4.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0m1.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5"
      />
    </svg>
  );
}

function GlobeIcon({ width = 16, height = 16 }: { width?: number; height?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 16 16"
      width={width}
      height={height}
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.27 14.1a6.5 6.5 0 0 0 3.67-3.45q-1.24.21-2.7.34-.31 1.83-.97 3.1M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.48-1.52a7 7 0 0 1-.96 0H7.5a4 4 0 0 1-.84-1.32q-.38-.89-.63-2.08a40 40 0 0 0 3.92 0q-.25 1.2-.63 2.08a4 4 0 0 1-.84 1.31zm2.94-4.76q1.66-.15 2.95-.43a7 7 0 0 0 0-2.58q-1.3-.27-2.95-.43a18 18 0 0 1 0 3.44m-1.27-3.54a17 17 0 0 1 0 3.64 39 39 0 0 1-4.3 0 17 17 0 0 1 0-3.64 39 39 0 0 1 4.3 0m1.1-1.17q1.45.13 2.69.34a6.5 6.5 0 0 0-3.67-3.44q.65 1.26.98 3.1M8.48 1.5l.01.02q.41.37.84 1.31.38.89.63 2.08a40 40 0 0 0-3.92 0q.25-1.2.63-2.08a4 4 0 0 1 .85-1.32 7 7 0 0 1 .96 0m-2.75.4a6.5 6.5 0 0 0-3.67 3.44 29 29 0 0 1 2.7-.34q.31-1.83.97-3.1M4.58 6.28q-1.66.16-2.95.43a7 7 0 0 0 0 2.58q1.3.27 2.95.43a18 18 0 0 1 0-3.44m.17 4.71q-1.45-.12-2.69-.34a6.5 6.5 0 0 0 3.67 3.44q-.65-1.27-.98-3.1"
      />
    </svg>
  );
}

function BrandLockup({ className }: { className?: string }) {
  return (
    <div className={"flex items-center gap-3" + (className ? " " + className : "")}>
      <NextLogo className="text-black dark:text-white" width={80} height={16} />
      <span
        className="block h-6 w-px bg-zinc-300 dark:bg-zinc-700"
        aria-hidden="true"
      />
      <McpUseWordmark className="text-black dark:text-white" />
    </div>
  );
}

export function NextStarter({ theme }: { theme?: "light" | "dark" } = {}) {
  // The web app leaves `theme` unset and renders in light mode. The MCP
  // widget wires `theme` to `useWidgetTheme()` so the same component
  // follows the host's light/dark switch. Tailwind's `dark:` variants are
  // gated on the `.dark` class (see `src/app/globals.css`).
  const wrapperClass =
    "grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen gap-16 p-8 pb-20 font-sans sm:p-20 bg-white text-black dark:bg-black dark:text-white" +
    (theme === "dark" ? " dark" : "");

  return (
    <div className={wrapperClass}>
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <BrandLockup />
        <ol className="list-inside list-decimal text-center font-mono text-sm/6 sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="rounded bg-black/[.05] px-1 py-0.5 font-mono font-semibold dark:bg-white/[.06]">
              app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            className="flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap rounded-full border border-solid border-transparent bg-foreground px-4 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] sm:h-12 sm:w-auto sm:px-5 sm:text-base"
            href="https://manufact.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ManufactSymbol width={16} height={16} />
            Deploy now
          </a>
          <a
            className="flex h-10 w-full items-center justify-center whitespace-nowrap rounded-full border border-solid border-black/[.08] px-4 text-sm font-medium transition-colors hover:border-transparent hover:bg-[#f2f2f2] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] sm:h-12 sm:w-auto sm:min-w-[158px] sm:px-5 sm:text-base"
            href="https://docs.mcp-use.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <a
          className="flex items-center gap-2 text-sm hover:underline hover:underline-offset-4"
          href="https://docs.mcp-use.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FileIcon />
          Learn
        </a>
        <a
          className="flex items-center gap-2 text-sm hover:underline hover:underline-offset-4"
          href="https://github.com/mcp-use/next-js-mcp-app-template"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WindowIcon />
          Examples
        </a>
        <a
          className="flex items-center gap-2 text-sm hover:underline hover:underline-offset-4"
          href="https://manufact.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GlobeIcon />
          Go to manufact.com →
        </a>
      </footer>
    </div>
  );
}
