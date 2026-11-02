"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import {
  Activity,
  Atom,
  Scale,
  ShieldCheck,
  FileCheck2,
  ScanLine,
  FlaskConical,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

import gsap from "gsap";
import AOS from "aos";
import "aos/dist/aos.css";

// ==========================================
// DATA  (replace with your own `standards`)
// Required: id, number, title, short, description, method, icon
// Optional: output (what the report shows), trace (signal peaks [x, height, width])
// ==========================================

const standards = [
  {
    id: "purity",
    number: "01",
    title: "Purity Analysis",
    short: "How much of the sample is the target compound.",
    description:
      "Chromatographic analysis separates the sample into its components so the main compound can be compared against everything else detected.",
    method: "HPLC chromatography",
    output: "Purity percentage and chromatogram",
    icon: Activity,
    trace: [
      [55, 8, 5],
      [140, 38, 6],
      [205, 12, 5],
      [250, 6, 4],
    ],
  },
  {
    id: "identity",
    number: "02",
    title: "Identity Confirmation",
    short: "Does the molecule match what the label says.",
    description:
      "Mass spectrometry measures molecular weight so the detected compound can be compared with the expected value for the labeled material.",
    method: "Mass spectrometry",
    output: "Measured vs. expected mass",
    icon: Atom,
    trace: [
      [40, 5, 3],
      [95, 14, 3],
      [150, 40, 3],
      [200, 20, 3],
      [255, 9, 3],
    ],
  },
  {
    id: "content",
    number: "03",
    title: "Quantity Verification",
    short: "How much compound is in each vial.",
    description:
      "Content testing checks the amount of material in a vial against the labeled amount, which is separate from purity.",
    method: "Quantitative assay",
    output: "Measured amount per vial",
    icon: Scale,
    trace: [
      [90, 18, 14],
      [160, 34, 12],
      [225, 22, 14],
    ],
  },
  {
    id: "safety",
    number: "04",
    title: "Contaminant Screening",
    short: "Checks for unwanted residues and impurities.",
    description:
      "Screening looks for substances that should not be present, such as residual solvents or endotoxin, depending on the test scope.",
    method: "Targeted screening panels",
    output: "Pass / fail against limits",
    icon: ShieldCheck,
    trace: [
      [60, 10, 8],
      [120, 6, 6],
      [190, 26, 9],
      [250, 8, 6],
    ],
  },
  {
    id: "docs",
    number: "05",
    title: "Report Documentation",
    short: "Understanding what a report actually states.",
    description:
      "A certificate of analysis records the methods, batch details and results so each figure can be traced back to a specific test.",
    method: "Certificate of analysis",
    output: "Batch-linked test summary",
    icon: FileCheck2,
    trace: [
      [70, 22, 16],
      [150, 30, 16],
      [230, 18, 16],
    ],
  },
];

const AUTOPLAY_MS = 6500;
const BASE = 50;

const buildTrace = (peaks) => {
  let d = "";
  for (let x = 0; x <= 300; x += 2) {
    let y = 0;
    peaks.forEach(([c, h, w]) => {
      y += h * Math.exp(-(((x - c) / w) ** 2));
    });
    d += `${x === 0 ? "M" : "L"}${x},${(BASE - y).toFixed(1)} `;
  }
  return d;
};

export default function ResearchStandards() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);

  const gridRef = useRef(null);
  const consoleRef = useRef(null);
  const infoRef = useRef(null);
  const iconRef = useRef(null);
  const itemRefs = useRef([]);
  const firstRun = useRef(true);

  const active = standards[activeIndex];
  const ActiveIcon = active.icon;

  const tracePath = useMemo(
    () =>
      buildTrace(
        active.trace || [
          [60, 14, 6],
          [150, 34, 5],
          [220, 20, 7],
        ],
      ),
    [active],
  );

  const next = () => setActiveIndex((i) => (i + 1) % standards.length);

  // ==========================================
  // AOS + reduced motion + in-view detection
  // ==========================================

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduced(rm);

    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 60,
      disable: () => rm,
    });
    AOS.refresh();

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    if (gridRef.current) io.observe(gridRef.current);

    return () => io.disconnect();
  }, []);

  // ==========================================
  // 3D TILT ON THE CONSOLE (mouse only)
  // ==========================================

  useEffect(() => {
    const el = consoleRef.current;
    if (!el) return;

    const ok = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;
    if (!ok) return;

    gsap.set(el, { transformPerspective: 1100 });

    const rx = gsap.quickTo(el, "rotationX", {
      duration: 0.7,
      ease: "power3.out",
    });
    const ry = gsap.quickTo(el, "rotationY", {
      duration: 0.7,
      ease: "power3.out",
    });

    const move = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      ry(px * 9);
      rx(-py * 9);
      el.style.setProperty("--gx", `${(px + 0.5) * 100}%`);
      el.style.setProperty("--gy", `${(py + 0.5) * 100}%`);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };

    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
    };
  }, []);

  // ==========================================
  // CONTENT TRANSITION ON CHANGE
  // ==========================================

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    if (reduced) return;

    if (infoRef.current) {
      gsap.fromTo(
        infoRef.current.children,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          overwrite: true,
        },
      );
    }

    if (iconRef.current) {
      gsap.fromTo(
        iconRef.current,
        { rotationY: -140, scale: 0.6, opacity: 0, transformPerspective: 700 },
        {
          rotationY: 0,
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
          overwrite: true,
        },
      );
    }
  }, [activeIndex, reduced]);

  // ==========================================
  // KEYBOARD NAVIGATION
  // ==========================================

  const onKeyDown = (e) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const dir = e.key === "ArrowDown" ? 1 : -1;
    const i = (activeIndex + dir + standards.length) % standards.length;
    setActiveIndex(i);
    itemRefs.current[i]?.focus();
  };

  const running = !reduced && inView && !paused;

  return (
    <section
      id="research-standards"
      aria-labelledby="standards-heading"
      className="relative isolate overflow-hidden bg-[#f7f9fc] px-5 py-20 sm:px-8 lg:py-28"
    >
      <style>{`
        @keyframes rs-fill{from{width:0}to{width:100%}}
        @keyframes rs-draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}
        @keyframes rs-scan{0%{top:6%}100%{top:94%}}
        @keyframes rs-float{0%,100%{translate:0 0}50%{translate:0 -8px}}
        @keyframes rs-fade{from{opacity:0}to{opacity:1}}
      `}</style>

      {/* BACKGROUND DETAILS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-60 right-[-15%] -z-10 h-[650px] w-[650px] rounded-full bg-[#dcecff]/60 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-10%] left-[-10%] -z-10 size-[420px] rounded-full bg-[#cfe3fb]/40 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* SECTION INTRO */}
        <div
          data-aos="fade-up"
          className="mb-12 flex flex-col justify-between gap-7 lg:mb-16 lg:flex-row lg:items-end"
        >
          <div className="max-w-[900px]">
            <h2
              id="standards-heading"
              className="font-heading text-primary text-[clamp(40px,5.5vw,76px)] leading-[1.06] font-semibold tracking-[-0.055em]"
            >
              Precision isn&rsquo;t
              <br />a promise.
              <span className="text-[#5794d1]"> It&rsquo;s a process.</span>
            </h2>
          </div>

          <p
            data-aos="fade-up"
            data-aos-delay="150"
            className="max-w-[360px] font-sans text-base leading-[1.8] text-[#64748b] sm:text-lg"
          >
            Explore five important analytical checkpoints used to understand
            research peptide quality and documentation.
          </p>
        </div>

        {/* MAIN INTERACTIVE AREA */}
        <div
          ref={gridRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          className="grid grid-cols-1 gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6"
        >
          {/* =====================================
              LEFT: CHECKPOINT LIST
          ===================================== */}
          <div
            role="group"
            aria-label="Research checkpoints"
            onKeyDown={onKeyDown}
            className="order-2 flex flex-col gap-3 lg:order-1"
          >
            {standards.map((item, index) => {
              const Icon = item.icon;
              const isActive = activeIndex === index;

              return (
                <div
                  key={item.id}
                  data-aos="fade-right"
                  data-aos-delay={index * 90}
                >
                  <button
                    ref={(el) => {
                      itemRefs.current[index] = el;
                    }}
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    onPointerMove={(e) => {
                      const r = e.currentTarget.getBoundingClientRect();
                      e.currentTarget.style.setProperty(
                        "--mx",
                        `${e.clientX - r.left}px`,
                      );
                      e.currentTarget.style.setProperty(
                        "--my",
                        `${e.clientY - r.top}px`,
                      );
                    }}
                    aria-pressed={isActive}
                    className={`group relative flex min-h-[112px] w-full items-center gap-4 overflow-hidden rounded-[22px] border px-5 py-5 text-left transition-[background-color,border-color,box-shadow,translate,scale] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:ring-2 focus-visible:ring-[#5794d1] focus-visible:ring-offset-2 focus-visible:outline-none sm:gap-5 sm:px-7 ${
                      isActive
                        ? "border-primary bg-primary scale-[1.02] text-white shadow-[0_24px_50px_-22px_rgba(11,27,63,0.55)]"
                        : "text-primary border-[#e0e8f2] bg-white hover:-translate-y-0.5 hover:border-[#a9c5e5] hover:shadow-[0_14px_30px_-20px_rgba(11,27,63,0.3)]"
                    }`}
                  >
                    {/* CURSOR SPOTLIGHT */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute inset-0 transition-opacity duration-300 group-hover:opacity-100 ${
                        isActive ? "opacity-0" : "opacity-0"
                      } bg-[radial-gradient(260px_circle_at_var(--mx,50%)_var(--my,50%),rgba(87,148,209,0.16),transparent_70%)]`}
                    />

                    {/* BACKGROUND ACCENT */}
                    <div
                      aria-hidden="true"
                      className={`pointer-events-none absolute -right-16 -bottom-28 size-56 rounded-full blur-[50px] transition-opacity duration-500 ${
                        isActive
                          ? "bg-[#4579c9]/25 opacity-100"
                          : "bg-[#b7d9ff]/30 opacity-0 group-hover:opacity-100"
                      }`}
                    />

                    {/* NUMBER */}
                    <span
                      className={`font-heading relative z-10 w-9 shrink-0 text-[20px] font-semibold transition-colors duration-500 sm:w-11 sm:text-[24px] ${
                        isActive ? "text-[#91b9f5]" : "text-[#a3b6cb]"
                      }`}
                    >
                      {item.number}
                    </span>

                    {/* ICON */}
                    <div
                      className={`relative z-10 grid size-[50px] shrink-0 place-items-center rounded-2xl border transition-all duration-500 sm:size-[58px] ${
                        isActive
                          ? "border-white/15 bg-white/10 text-white"
                          : "text-primary border-[#e2eaf4] bg-[#f2f7fd]"
                      }`}
                    >
                      <Icon
                        size={25}
                        strokeWidth={1.5}
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="relative z-10 min-w-0 flex-1">
                      <h3 className="font-heading text-[20px] leading-tight font-semibold tracking-tight sm:text-[23px]">
                        {item.title}
                      </h3>

                      <p
                        className={`mt-1.5 font-sans text-[13px] leading-relaxed transition-colors duration-500 sm:text-[14px] ${
                          isActive ? "text-white/65" : "text-[#8290a3]"
                        }`}
                      >
                        {item.short}
                      </p>
                    </div>

                    {/* ARROW */}
                    <div
                      className={`relative z-10 hidden size-10 shrink-0 place-items-center rounded-full transition-all duration-500 sm:grid ${
                        isActive
                          ? "text-primary bg-white"
                          : "text-primary group-hover:bg-primary bg-[#f1f6fc] group-hover:text-white"
                      }`}
                    >
                      <ArrowUpRight
                        size={19}
                        strokeWidth={1.7}
                        className={`transition-transform duration-500 ${isActive ? "rotate-45" : ""}`}
                      />
                    </div>

                    {/* AUTOPLAY PROGRESS */}
                    {isActive && !reduced && (
                      <span
                        key={activeIndex}
                        aria-hidden="true"
                        onAnimationEnd={next}
                        className="absolute bottom-0 left-0 z-10 h-[3px] rounded-r-full bg-gradient-to-r from-[#5794d1] to-[#9fd0ff]"
                        style={{
                          animation: `rs-fill ${AUTOPLAY_MS}ms linear forwards`,
                          animationPlayState: running ? "running" : "paused",
                        }}
                      />
                    )}
                  </button>
                </div>
              );
            })}
          </div>

          {/* =====================================
              RIGHT: VERIFICATION CONSOLE (3D)
          ===================================== */}
          <div
            data-aos="fade-left"
            className="order-1 lg:order-2 lg:min-h-full"
          >
            <div
              ref={consoleRef}
              className="relative flex min-h-[600px] flex-col p-6 text-white will-change-transform [transform-style:preserve-3d] sm:min-h-[680px] sm:p-9 lg:h-full lg:min-h-full lg:p-10"
            >
              {/* BACKDROP (clipped layer; kept apart from the 3D children) */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px] shadow-[0_40px_80px_-30px_rgba(7,21,47,0.7)] lg:rounded-[32px]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(145deg,#07152f_0%,#102d66_58%,#1f57a2_100%)]" />
                <div className="absolute top-[15%] right-[-25%] size-[450px] rounded-full bg-[#4b91ff]/25 blur-[100px]" />
                <div className="absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:42px_42px] opacity-[0.12]" />
                {/* cursor light */}
                <div className="absolute inset-0 bg-[radial-gradient(380px_circle_at_var(--gx,70%)_var(--gy,30%),rgba(140,188,255,0.22),transparent_65%)]" />
                {/* glass edge */}
                <div className="absolute inset-0 rounded-[inherit] border border-white/15" />
              </div>

              {/* TOP BAR */}
              <div className="relative flex [transform:translateZ(30px)] items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-sky-300 opacity-40" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-sky-300" />
                  </span>

                  <span className="font-sans text-[11px] font-semibold tracking-[0.16em] text-white/70 uppercase sm:text-xs">
                    Research Checkpoints
                  </span>
                </div>

                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-2 font-sans text-[11px] font-semibold tracking-wider text-white/80">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(standards.length).padStart(2, "0")}
                </span>
              </div>

              {/* CENTRAL SCIENTIFIC VISUAL */}
              <div className="relative flex min-h-[290px] flex-1 items-center justify-center py-8 sm:min-h-[330px]">
                <div className="absolute size-[260px] rounded-full border border-white/10 sm:size-[330px]" />
                <div className="absolute size-[220px] animate-[spin_35s_linear_infinite] rounded-full border border-dashed border-[#8cbcff]/30 sm:size-[285px]" />
                <div className="absolute size-[175px] rounded-full border border-white/15 sm:size-[220px]" />

                {/* SCAN SWEEP (clipped to inner ring) */}
                {!reduced && (
                  <div className="absolute size-[175px] overflow-hidden rounded-full sm:size-[220px]">
                    <span
                      className="absolute left-0 h-px w-full bg-gradient-to-r from-transparent via-sky-300 to-transparent shadow-[0_0_14px_#7cc5ff]"
                      style={{
                        animation:
                          "rs-scan 3.2s ease-in-out infinite alternate",
                      }}
                    />
                  </div>
                )}

                {/* ORBIT POINTS */}
                <div className="absolute size-[260px] animate-[spin_25s_linear_infinite] sm:size-[330px]">
                  <span className="absolute top-1/2 -left-1 size-2.5 -translate-y-1/2 rounded-full bg-[#8bc5ff] shadow-[0_0_20px_#8bc5ff]" />
                  <span className="absolute top-0 left-1/2 size-2 -translate-x-1/2 rounded-full bg-white/70" />
                </div>

                {/* CENTER ICON (floats forward in 3D) */}
                <div
                  className="relative [transform:translateZ(70px)]"
                  style={
                    reduced
                      ? undefined
                      : { animation: "rs-float 5s ease-in-out infinite" }
                  }
                >
                  <div className="grid size-[130px] place-items-center rounded-full border border-white/20 bg-white/10 shadow-[0_0_70px_rgba(92,160,255,0.25)] backdrop-blur-lg sm:size-[160px]">
                    <div className="absolute inset-3 rounded-full border border-white/10" />

                    <div ref={iconRef} className="grid place-items-center">
                      <ActiveIcon
                        size={58}
                        strokeWidth={1}
                        className="text-white sm:size-[70px]"
                      />
                    </div>
                  </div>
                </div>

                {/* FLOATING LABEL */}
                <span className="absolute top-3 right-0 [transform:translateZ(40px)] font-sans text-[10px] tracking-[0.16em] text-[#8db8ee] uppercase sm:right-5">
                  Analytical Framework
                </span>
              </div>

              {/* SIGNAL TRACE */}
              <div className="relative mb-6 [transform:translateZ(35px)]">
                <div className="mb-2 flex items-center justify-between font-sans text-[10px] tracking-[0.15em] text-white/45 uppercase">
                  <span>Signal Trace</span>
                  <span className="text-[#8cbcff]">Illustrative</span>
                </div>

                <svg
                  viewBox="0 0 300 56"
                  preserveAspectRatio="none"
                  className="h-14 w-full overflow-visible"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id="rs-area" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="0%"
                        stopColor="#8cbcff"
                        stopOpacity="0.35"
                      />
                      <stop offset="100%" stopColor="#8cbcff" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  <line
                    x1="0"
                    x2="300"
                    y1={BASE}
                    y2={BASE}
                    stroke="rgba(255,255,255,0.18)"
                    strokeWidth="0.6"
                  />

                  <path
                    key={`a-${activeIndex}`}
                    d={`${tracePath} L300,56 L0,56 Z`}
                    fill="url(#rs-area)"
                    style={
                      reduced
                        ? undefined
                        : { animation: "rs-fade 1.2s ease-out 0.5s both" }
                    }
                  />

                  <path
                    key={`l-${activeIndex}`}
                    d={tracePath}
                    fill="none"
                    stroke="#9fd0ff"
                    strokeWidth="1.6"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    pathLength="1"
                    style={
                      reduced
                        ? undefined
                        : {
                            strokeDasharray: 1,
                            strokeDashoffset: 1,
                            animation:
                              "rs-draw 1.4s cubic-bezier(0.22,1,0.36,1) forwards",
                          }
                    }
                  />
                </svg>
              </div>

              {/* DYNAMIC INFORMATION */}
              <div
                aria-live="polite"
                className="relative [transform:translateZ(45px)]"
              >
                <div ref={infoRef}>
                  <h3 className="font-heading text-[clamp(32px,3.5vw,52px)] leading-[1.08] font-semibold tracking-[-0.04em]">
                    {active.title}
                  </h3>

                  <p className="mt-4 max-w-[510px] font-sans text-[15px] leading-[1.8] text-[#c5d7ef] sm:text-[16px]">
                    {active.description}
                  </p>

                  <div className="mt-7 grid gap-3 border-t border-white/15 pt-6 sm:grid-cols-2">
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                      <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/10">
                        <ScanLine size={20} strokeWidth={1.5} />
                      </div>

                      <div className="min-w-0">
                        <span className="block font-sans text-[10px] tracking-[0.15em] text-white/45 uppercase">
                          Analytical Approach
                        </span>
                        <span className="mt-1 block font-sans text-[14px] font-medium text-white">
                          {active.method}
                        </span>
                      </div>
                    </div>

                    {active.output && (
                      <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.06] p-3">
                        <div className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/10">
                          <FileCheck2 size={20} strokeWidth={1.5} />
                        </div>

                        <div className="min-w-0">
                          <span className="block font-sans text-[10px] tracking-[0.15em] text-white/45 uppercase">
                            What The Report Shows
                          </span>
                          <span className="mt-1 block font-sans text-[14px] font-medium text-white">
                            {active.output}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM STATEMENT */}
        <div
          data-aos="fade-up"
          className="mt-10 flex flex-col items-start justify-between gap-5 border-t border-[#dce5ef] pt-7 sm:flex-row sm:items-center"
        >
          <div className="flex items-center gap-3">
            <div className="text-primary grid size-10 shrink-0 place-items-center rounded-full bg-[#e7f1fc]">
              <FlaskConical size={19} strokeWidth={1.6} />
            </div>

            <p className="max-w-[620px] font-sans text-[14px] leading-relaxed text-[#64748b] sm:text-[15px]">
              Understanding what a laboratory report measures is just as
              important as understanding its results.
            </p>
          </div>

          <span className="text-primary inline-flex items-center gap-2 font-sans text-[12px] font-semibold tracking-[0.1em] whitespace-nowrap uppercase">
            Research Use Only
            <ArrowRight size={17} />
          </span>
        </div>
      </div>
    </section>
  );
}
