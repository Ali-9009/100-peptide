"use client";

import { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  ArrowUpRight,
  FlaskConical,
  ShieldCheck,
  Truck,
  Droplets,
  Headset,
  Microscope,
  FileCheck2,
  Sparkles,
  Zap,
  Globe2,
} from "lucide-react";

const features = [
  {
    id: "01",
    eyebrow: "CERTIFIED PURITY",
    title: "Lab-Tested Every Batch.",
    description:
      "Every single batch undergoes rigorous independent third-party laboratory testing, with live certificates available in our COA Vault.",
    icon: FlaskConical,
    size: "hero", // Spans more space with a majestic layout
    theme: "midnight-sky", // Ultra-premium dark sky theme
    link: "/coa-vault",
    linkText: "Explore Live COA Vault",
  },
  {
    id: "02",
    eyebrow: "PRECISION ASSAY",
    title: "High Purity Peptides.",
    description:
      "Advanced chromatography analysis ensures exact composition and structural stability for consistent research.",
    icon: ShieldCheck,
    size: "normal",
    theme: "crystal-glass",
  },
  {
    id: "03",
    eyebrow: "GLOBAL REACH",
    title: "Fast EU & Express Shipping.",
    description:
      "Dispatched in temperature-controlled packaging through trusted European logistics carriers.",
    icon: Truck,
    size: "normal",
    theme: "sky-vibrant-glow",
  },
  {
    id: "04",
    eyebrow: "COMPLIMENTARY ADD-ON",
    title: "Free Bacteriostatic Water.",
    description:
      "A pristine, medical-grade complimentary vial of bac water is packed with every single order.",
    icon: Droplets,
    size: "normal",
    theme: "crystal-glass",
  },
  {
    id: "05",
    eyebrow: "EXPERT ASSISTANCE",
    title: "Dedicated Support Desk.",
    description:
      "Our scientific support team is on standby from 08:00 to 20:00 to assist with technical specifications.",
    icon: Headset,
    size: "normal",
    theme: "crystal-glass",
  },
  {
    id: "06",
    eyebrow: "RESTRICTED PROTOCOL",
    title: "Strictly Research Use Only.",
    description:
      "Formulated exclusively for laboratory research environments. Not intended for human consumption or in-vivo trials.",
    icon: Microscope,
    size: "wide",
    theme: "sky-tinted-card",
  },
];

export default function WhyChooseUs() {
  useEffect(() => {
    AOS.init({
      duration: 950,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
      mirror: false,
      anchorPlacement: "top-bottom",
    });

    AOS.refresh();

    return () => {
      AOS.refreshHard();
    };
  }, []);

  const cardAnimations = [
    "zoom-in",
    "fade-left",
    "fade-right",
    "zoom-in-up",
    "fade-up-right",
    "zoom-in",
  ];

  return (
    <section
      id="why"
      aria-labelledby="why-heading"
      className="relative overflow-hidden bg-gradient-to-b from-sky-50/40 via-white to-sky-50/30 px-5 py-24 sm:px-8 lg:py-32"
    >
      {/* IMMERSIVE AMBIENT SKY BLOBS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 size-[550px] rounded-full bg-gradient-to-tr from-sky-300/30 to-blue-400/20 blur-[140px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 -right-40 size-[600px] rounded-full bg-gradient-to-br from-sky-400/25 to-cyan-200/30 blur-[150px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* =====================================
            SECTION HEADER (MAGNIFICENT LAYOUT)
        ===================================== */}
        <div
          data-aos="fade-up"
          className="mb-16 flex flex-col justify-between gap-8 lg:mb-20 lg:flex-row lg:items-end"
        >
          <div className="max-w-[820px]">
            {/* FLOATING PILL BADGE */}
            <div className="mb-5 inline-flex items-center gap-2.5 rounded-full border border-sky-300/80 bg-gradient-to-r from-sky-50 to-blue-50/80 px-4 py-1.5 shadow-sm backdrop-blur-md">
              <Sparkles className="size-4 animate-pulse text-sky-500" />
              <span className="text-xs font-bold tracking-wider text-sky-800 uppercase">
                Next-Generation Laboratory Standards
              </span>
            </div>

            {/* MAIN HEADLINE */}
            <h2
              id="why-heading"
              className="text-[clamp(42px,5.5vw,76px)] leading-[1.03] font-black tracking-tight text-slate-900"
            >
              Research deserves{" "}
              <span className="relative inline-block bg-gradient-to-r from-sky-600 via-sky-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-sm">
                a higher standard.
                <span className="absolute -bottom-2 left-0 h-1.5 w-full rounded-full bg-gradient-to-r from-sky-400/60 to-transparent blur-[1px]" />
              </span>
            </h2>
          </div>

          <p className="max-w-[380px] text-[17px] leading-relaxed font-normal text-slate-600">
            Impeccably documented, fully traceable, and engineered for
            high-precision scientific outcomes.
          </p>
        </div>

        {/* =====================================
            BENTO GRID LAYOUT
        ===================================== */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const isHero = feature.size === "hero";
            const isWide = feature.size === "wide";
            const isMidnight = feature.theme === "midnight-sky";
            const isVibrant = feature.theme === "sky-vibrant-glow";
            const isTinted = feature.theme === "sky-tinted-card";

            return (
              <article
                key={feature.id}
                data-aos={cardAnimations[index % cardAnimations.length]}
                data-aos-delay={Math.min(index * 100, 500)}
                data-aos-duration="1000"
                data-aos-easing="ease-out-back"
                className={`group relative isolate flex flex-col justify-between overflow-hidden rounded-[32px] border p-8 transition-all duration-500 ease-out hover:-translate-y-2.5 sm:p-9 ${
                  isHero
                    ? "min-h-[420px] sm:col-span-2 lg:col-span-2"
                    : "min-h-[350px]"
                } ${isWide ? "sm:col-span-2 lg:col-span-2" : ""} ${
                  isMidnight
                    ? "border-sky-950 bg-slate-950 text-white shadow-2xl shadow-sky-950/40 hover:border-sky-500/60 hover:shadow-sky-500/20"
                    : isVibrant
                      ? "border-sky-300 bg-gradient-to-br from-sky-400 via-sky-500 to-blue-600 text-white shadow-xl shadow-sky-500/30 hover:border-sky-200 hover:shadow-2xl hover:shadow-sky-500/40"
                      : isTinted
                        ? "border-sky-200/90 bg-gradient-to-br from-sky-50/90 via-sky-100/50 to-white text-slate-900 shadow-sm hover:border-sky-400 hover:shadow-xl hover:shadow-sky-400/15"
                        : "border-sky-100 bg-white/90 text-slate-900 shadow-md shadow-sky-900/5 backdrop-blur-xl hover:border-sky-300 hover:shadow-2xl hover:shadow-sky-500/10"
                }`}
              >
                {/* DYNAMIC SHINE SWEEP ON HOVER */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-sky-400/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
                />

                {/* AMBIENT GLOW BACKDROP */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute -top-32 -right-32 size-80 rounded-full opacity-0 blur-[70px] transition-opacity duration-700 group-hover:opacity-100 ${
                    isMidnight ? "bg-sky-500/40" : "bg-sky-300/50"
                  }`}
                />

                {/* CARD BACKGROUND DECORATION FOR MIDNIGHT CARD */}
                {isMidnight && (
                  <div className="pointer-events-none absolute -top-32 -right-32 size-[420px] rounded-full border border-sky-500/10" />
                )}

                {/* TOP HEADER ROW: ICON + ID BADGE */}
                <div className="relative z-10 flex items-start justify-between">
                  <div
                    className={`flex size-16 shrink-0 items-center justify-center rounded-2xl shadow-md transition-all duration-500 group-hover:scale-110 group-hover:rotate-[-8deg] ${
                      isMidnight
                        ? "border border-sky-400/30 bg-sky-950/90 text-sky-300 shadow-sky-950"
                        : isVibrant
                          ? "border border-white/40 bg-white/20 text-white backdrop-blur-md"
                          : "border border-sky-200/90 bg-gradient-to-br from-sky-50 to-sky-100 text-sky-600"
                    }`}
                  >
                    <Icon size={28} strokeWidth={1.7} aria-hidden="true" />
                  </div>
                </div>

                {/* BODY CONTENT */}
                <div className="relative z-10 mt-10">
                  <span
                    className={`text-[11px] font-extrabold tracking-[0.2em] uppercase ${
                      isMidnight
                        ? "text-sky-300/80"
                        : isVibrant
                          ? "text-sky-100"
                          : "text-sky-600"
                    }`}
                  >
                    {feature.eyebrow}
                  </span>

                  <h3
                    className={`mt-2.5 font-bold tracking-tight ${
                      isHero
                        ? "text-[clamp(30px,3.2vw,44px)] leading-[1.1]"
                        : "text-[26px] leading-[1.2] sm:text-[28px]"
                    }`}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className={`mt-3.5 max-w-[460px] text-[15px] leading-relaxed sm:text-[16px] ${
                      isMidnight
                        ? "text-slate-300"
                        : isVibrant
                          ? "text-sky-50"
                          : "text-slate-600"
                    }`}
                  >
                    {feature.description}
                  </p>

                  {/* ACTION LINK */}
                  {feature.link && (
                    <Link
                      href={feature.link}
                      className={`group/link mt-6 inline-flex items-center gap-2 border-b pb-1 text-[14px] font-bold transition-all ${
                        isMidnight
                          ? "border-sky-500/50 text-sky-300 hover:border-sky-400 hover:text-sky-200"
                          : isVibrant
                            ? "border-white/50 text-white hover:border-white"
                            : "border-sky-300 text-sky-600 hover:border-sky-700 hover:text-sky-800"
                      }`}
                    >
                      {feature.linkText}
                      <ArrowUpRight
                        size={17}
                        className="transition-transform duration-300 group-hover/link:translate-x-1.5 group-hover/link:-translate-y-1.5"
                      />
                    </Link>
                  )}
                </div>

                {/* HERO WATERMARK ICON */}
                {isHero && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-[-30px] bottom-[-45px] text-sky-400/10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-[-10deg]"
                  >
                    <FlaskConical size={280} strokeWidth={0.6} />
                  </div>
                )}

                {/* WIDE WATERMARK ICON */}
                {isWide && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-8 bottom-6 hidden text-sky-600/10 transition-transform duration-700 group-hover:scale-105 md:block"
                  >
                    <Microscope size={180} strokeWidth={0.65} />
                  </div>
                )}
              </article>
            );
          })}
        </div>

        {/* =====================================
            FLOATING PREMIUM TRUST BAR
        ===================================== */}
        <div
          data-aos="fade-up"
          className="mt-10 flex flex-col gap-6 rounded-3xl border border-sky-200/80 bg-white/90 px-7 py-6 shadow-xl shadow-sky-900/5 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:px-10"
        >
          <div className="flex items-center gap-4">
            <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 text-white shadow-md shadow-sky-500/30">
              <Zap size={24} strokeWidth={2} />
            </div>

            <div>
              <h4 className="text-[15px] font-bold text-slate-900">
                Verified Scientific Integrity
              </h4>
              <p className="text-[14px] text-slate-500">
                Uncompromising laboratory quality protocols for professional
                researchers.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-sky-100 pt-4 sm:border-t-0 sm:pt-0">
            <span className="inline-flex items-center gap-2 text-[13px] font-bold whitespace-nowrap text-sky-800">
              <FileCheck2 size={17} className="text-sky-500" />
              COA Vault Verified
            </span>

            <span className="inline-flex items-center gap-2 text-[13px] font-bold whitespace-nowrap text-sky-800">
              <Globe2 size={17} className="text-sky-500" />
              EU Compliance
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
