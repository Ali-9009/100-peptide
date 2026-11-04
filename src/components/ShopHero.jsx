"use client";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowUpRight,
  ArrowRight,
  TrendingUp,
  ShoppingBag,
  Sparkles,
  Activity,
  BarChart3,
} from "lucide-react";

const chartPoints = [
  { x: 0, y: 145 },
  { x: 45, y: 125 },
  { x: 90, y: 137 },
  { x: 135, y: 95 },
  { x: 180, y: 107 },
  { x: 225, y: 70 },
  { x: 270, y: 79 },
  { x: 315, y: 38 },
  { x: 360, y: 50 },
  { x: 405, y: 15 },
];

const linePath = chartPoints
  .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
  .join(" ");

const areaPath = `${linePath} L 405 180 L 0 180 Z`;

function AnimatedSalesChart() {
  return (
    <div className="shop-chart-float relative w-full max-w-100">
      {/* CHART CARD */}
      <div className="relative overflow-hidden rounded-3xl border border-white/80 bg-white p-5 shadow-[0_35px_80px_rgba(0,0,0,0.23)] sm:p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.15em] text-[#8ba0b5] uppercase">
              Collection Insights
            </span>

            <h3 className="font-heading mt-1 text-[21px] font-bold tracking-[-0.04em] text-[#0b1b3f]">
              Research in motion.
            </h3>
          </div>

          <span className="grid size-11 place-items-center rounded-2xl bg-[#eaf4ff] text-[#397fce]">
            <BarChart3 size={22} />
          </span>
        </div>

        {/* SMALL TREND LABEL */}
        <div className="mt-6 flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-[#e7f7ed] px-3 py-1.5 text-[10px] font-bold text-[#27825f]">
            <TrendingUp size={13} />
            Explore the trend
          </span>

          <span className="text-[10px] text-[#98aabe]">
            Illustrative visualization
          </span>
        </div>

        {/* SVG CHART */}
        <div className="relative mt-6 h-40 w-full">
          <svg
            viewBox="0 0 405 180"
            preserveAspectRatio="none"
            className="h-full w-full overflow-visible"
            role="img"
            aria-label="Illustrative upward-trending line chart"
          >
            <defs>
              <linearGradient id="shop-chart-area" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#397fce" stopOpacity="0.25" />

                <stop offset="100%" stopColor="#397fce" stopOpacity="0" />
              </linearGradient>

              <linearGradient id="shop-chart-line" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7ac8ff" />
                <stop offset="100%" stopColor="#0b1b3f" />
              </linearGradient>
            </defs>

            {/* GRID LINES */}
            {[40, 85, 130, 175].map((y) => (
              <line
                key={y}
                x1="0"
                y1={y}
                x2="405"
                y2={y}
                stroke="#eaf0f7"
                strokeWidth="1"
                strokeDasharray="4 6"
              />
            ))}

            {/* AREA */}
            <path
              d={areaPath}
              fill="url(#shop-chart-area)"
              className="shop-chart-area"
            />

            {/* ANIMATED LINE */}
            <path
              d={linePath}
              fill="none"
              stroke="url(#shop-chart-line)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength="100"
              className="shop-chart-line"
            />

            {/* MOVING DOT */}
            <circle
              r="7"
              fill="#397fce"
              stroke="white"
              strokeWidth="3"
              className="shop-chart-dot"
            >
              <animateMotion
                dur="4s"
                repeatCount="indefinite"
                path={linePath}
                keyPoints="0;1"
                keyTimes="0;1"
                calcMode="linear"
              />
            </circle>
          </svg>
        </div>

        {/* CHART FOOTER */}
        <div className="mt-4 flex items-center justify-between border-t border-[#edf2f7] pt-4">
          <span className="flex items-center gap-2 text-[11px] font-semibold text-[#7e94ab]">
            <Activity size={15} className="text-[#397fce]" />
            Research Collection
          </span>

          <span className="text-[10px] font-bold tracking-[0.1em] text-[#397fce] uppercase">
            100 Peptides
          </span>
        </div>
      </div>
    </div>
  );
}

export default function ShopHero() {
  return (
    <section
      aria-labelledby="shop-hero-title"
      className="relative isolate overflow-hidden rounded-3xl bg-[linear-gradient(115deg,#07152f_0%,#0b1b3f_47%,#24548c_100%)] px-6 py-14 text-white sm:px-12 sm:py-20 lg:px-16"
    >
      {/* BACKGROUND GLOW */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-20 size-[500px] rounded-full bg-[#61b8ff]/20 blur-[100px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-52 left-[20%] size-[400px] rounded-full bg-[#397fce]/15 blur-[100px]"
      />

      {/* SAME GRID AS COA HERO */}
      <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
        {/* LEFT CONTENT */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold tracking-[0.15em] text-[#acd9ff] uppercase">
            <Sparkles size={15} />
            The Research Collection
          </span>

          <h1
            id="shop-hero-title"
            className="font-heading mt-7 text-[clamp(43px,6vw,78px)] leading-[1.02] font-semibold tracking-[-0.065em]"
          >
            Precision
            <br />
            <span className="text-[#83c7ff]">in every detail.</span>
          </h1>

          <p className="mt-6 max-w-[540px] text-[14px] leading-[1.9] text-[#c2d3e5]">
            Explore our research peptide collection, compare available
            strengths, and find detailed information for your laboratory
            research requirements.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#shop-products"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-[13px] font-bold text-[#0b1b3f] transition-transform duration-300 hover:-translate-y-1"
            >
              Shop Collection
              <ArrowUpRight size={17} />
            </a>

            <Link
              href="/coa"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 text-[13px] font-bold text-white transition-colors duration-300 hover:bg-white/20"
            >
              Explore COA
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* RIGHT VISUAL — SAME HEIGHT AS COA */}
        <div className="relative h-[300px] sm:h-[350px]">
          {/* ANIMATED SALES CHART */}
          <div className="absolute top-[5%] left-[3%] z-10 w-[78%] -rotate-[10deg] sm:left-[8%]">
            <AnimatedSalesChart />
          </div>

          {/* FLOATING PRODUCT */}
          <div className="shop-product-float pointer-events-none absolute top-[4%] right-[0%] z-20 h-[290px] w-[180px] rotate-[12deg] sm:h-[340px] sm:w-[240px]">
            <Image
              src="/assets/tb-500.png"
              alt="BPC-157 research peptide vial"
              fill
              sizes="(max-width: 640px) 180px, 240px"
              className="object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.3)]"
            />
          </div>

          {/* ANIMATED SALES BADGE */}
          <div className="absolute right-[1%] bottom-[4%] z-30 w-[200px] rotate-[5deg] overflow-hidden rounded-full border border-white/20 bg-white/10 py-3 shadow-[0_10px_30px_rgba(0,0,0,0.15)] backdrop-blur-md sm:w-[230px]">
            <div className="shop-sales-marquee flex w-max items-center gap-7 whitespace-nowrap">
              {[0, 1, 2, 3].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 pl-3 text-[11px] font-bold tracking-[0.1em] text-white uppercase"
                >
                  <ShoppingBag size={15} className="text-[#9bd4ff]" />
                  Explore Current Offers
                  <span className="text-[#9bd4ff]">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
