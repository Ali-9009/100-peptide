"use client";

import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  FlaskConical,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

export function Eyebrow({ children, light = false }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[10px] font-bold tracking-[0.19em] uppercase ${light ? "border-white/20 bg-white/10 text-blue-100" : "border-[#d4e6f9] bg-white/75 text-[#397fce]"}`}
    >
      <Sparkles size={13} aria-hidden="true" />
      {children}
    </span>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  centered = false,
  light = false,
}) {
  return (
    <div
      className={`${centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}
    >
      {eyebrow && (
        <span
          className={`text-[11px] font-bold tracking-[0.22em] uppercase ${light ? "text-sky-200" : "text-[#397fce]"}`}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={`font-heading mt-3 text-[clamp(32px,4.4vw,58px)] leading-[1.05] font-semibold tracking-[-0.06em] ${light ? "text-white" : "text-[#0b1b3f]"}`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-[14px] leading-[1.85] sm:text-[15px] ${light ? "text-slate-300" : "text-[#69829b]"}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function GradientCTA({
  title,
  description,
  primaryLabel = "Explore products",
  primaryHref = "/shop",
  secondaryLabel = "Contact us",
  secondaryHref = "/contact",
}) {
  return (
    <section className="relative isolate rounded-3xl bg-[linear-gradient(115deg,#07142e_0%,#0b1b3f_38%,#15386c_72%,#2869ad_100%)] px-6 py-12 text-white sm:px-10 lg:mt-52 lg:mb-12 lg:px-16 lg:py-12">
      {/* BACKGROUND EFFECTS — CLIPPED INSIDE BANNER */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
      >
        {/* Subtle blue glow behind product */}
        <div className="absolute top-1/2 right-[3%] size-[350px] -translate-y-1/2 rounded-full bg-[#5bafff]/20 blur-[85px]" />

        {/* Soft lower glow */}
        <div className="absolute -bottom-44 left-[28%] size-[350px] rounded-full bg-[#397fce]/10 blur-[95px]" />

        {/* Decorative background circle */}
        <div className="absolute top-1/2 right-[6%] hidden size-[330px] -translate-y-1/2 rounded-full border border-white/10 lg:block" />
      </div>

      {/* MAIN CONTENT — VERTICALLY CENTERED */}
      <div className="relative z-10 flex min-h-[210px] items-center lg:min-h-[240px]">
        {/* LEFT — HEADING + BUTTONS */}
        <div className="relative z-20 w-full max-w-[650px] lg:w-[62%]">
          <h2 className="font-heading text-[clamp(34px,4.5vw,58px)] leading-[1.05] font-semibold tracking-[-0.06em]">
            {title}
          </h2>

          {/* BUTTONS UNDER HEADING */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href={primaryHref}
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-[13px] font-bold text-[#0b1b3f] transition-all duration-300 hover:-translate-y-1 hover:bg-[#dcefff]"
            >
              {primaryLabel}
              <ArrowUpRight size={16} />
            </Link>

            <Link
              href={secondaryHref}
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/30 bg-white/5 px-6 text-[13px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/10"
            >
              {secondaryLabel}
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* DESKTOP — TILTED PRODUCT OVERLAPPING BANNER */}
      <div className="pointer-events-none absolute top-1/2 right-[7%] z-30 hidden h-[490px] w-[34%] -translate-y-1/2 lg:block xl:right-[9%] xl:h-[530px]">
        {/* Fixed rotation wrapper */}
        <div className="relative h-full w-full -rotate-[14deg]">
          {/* Independent floating animation */}
          <div className="cta-product-float relative h-full w-full">
            <Image
              src="/assets/bpc-157.png"
              alt="BPC-157 research peptide vial"
              fill
              sizes="(max-width: 1280px) 34vw, 450px"
              className="icon-float object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.35)]"
              priority={false}
            />
          </div>
        </div>
      </div>

      {/* MOBILE — TILTED PRODUCT */}
      <div className="relative mx-auto mt-8 h-[270px] w-[230px] -rotate-[12deg] sm:h-[320px] sm:w-[280px] lg:hidden">
        <Image
          src="/assets/bpc-157.png"
          alt="BPC-157 research peptide vial"
          fill
          sizes="(max-width: 640px) 230px, 280px"
          className="icon-float object-contain drop-shadow-[0_25px_25px_rgba(0,0,0,0.35)]"
        />
      </div>
    </section>
  );
}

export function ResearchNote() {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-[#cee4f8] bg-[#eaf5ff] p-4 text-[12px] leading-[1.7] text-[#476b8c]">
      <ShieldCheck
        size={18}
        className="mt-0.5 shrink-0 text-[#397fce]"
        aria-hidden="true"
      />
      <span>
        <strong className="text-[#0b1b3f]">Research use only.</strong> Products
        are not for human, veterinary, or food use. Information is educational,
        not medical advice or a therapeutic claim.
      </span>
    </div>
  );
}


export function BottleShowcase({ className = "" }) {
  return (
    <div
      className={`
        relative isolate flex min-h-[380px] items-center justify-center
        overflow-visible
        sm:min-h-[460px] lg:min-h-[520px]
        ${className}
      `}
      aria-label="GHK-Cu research peptide product presentation"
    >
      {/* ======================================
          BACKGROUND — SOFT RADIAL GLOW
      ====================================== */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute inset-0 -z-10
          rounded-[30px]
          bg-[radial-gradient(ellipse_at_50%_50%,#ffffff_0%,#f3f9ff_52%,#e7f3ff_100%)]
        "
      />

      {/* ======================================
          MAIN SQUARE — BEHIND PRODUCT
      ====================================== */}
      <div
        aria-hidden="true"
        className="
          absolute top-1/2 left-1/2
          h-[245px] w-[245px]
          -translate-x-1/2 -translate-y-1/2
          rounded-[24px]
          bg-[linear-gradient(145deg,#c9e7ff_0%,#83bdf0_55%,#4b94d4_100%)]
          shadow-[0_30px_65px_rgba(57,127,206,0.16)]
          sm:h-[310px] sm:w-[310px]
          lg:h-[350px] lg:w-[350px]
        "
      >
        {/* SOFT INNER LIGHT */}
        <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
          <div className="absolute -top-20 -right-20 size-[240px] rounded-full bg-white/40 blur-[60px]" />

          <div className="absolute -bottom-28 -left-20 size-[220px] rounded-full bg-[#1762ae]/20 blur-[60px]" />
        </div>

        {/* SUBTLE BORDER */}
        <div className="absolute inset-3 rounded-[17px] border border-white/20" />
      </div>

      {/* ======================================
          CIRCULAR BADGE — TOP LEFT
      ====================================== */}
      <div
        className="
          showcase-badge-float
          absolute top-[8%] left-[6%] z-30
          flex size-[96px] flex-col items-center justify-center
          rounded-full border-[5px] border-[#f5faff]
          bg-[#0b1b3f] text-center text-white
          shadow-[0_15px_35px_rgba(11,27,63,0.20)]
          sm:top-[7%] sm:left-[10%] sm:size-[120px]
          lg:top-[8%] lg:left-[13%] lg:size-[132px]
        "
      >
        <FlaskConical
          size={22}
          strokeWidth={1.5}
          className="mb-2 text-[#91d0ff]"
        />

        <span className="text-[9px] font-bold tracking-[0.15em] uppercase sm:text-[10px]">
          Research
        </span>

        <span className="font-heading mt-1 text-[15px] leading-none font-semibold tracking-[-0.03em] sm:text-[18px]">
          GHK-Cu
        </span>
      </div>

      {/* ======================================
          MAIN PRODUCT — CENTERED
      ====================================== */}
      <div
        className="
          pointer-events-none absolute inset-0 z-20
          flex items-center justify-center
        "
      >
        <div
          className="
            showcase-bottle-float
            relative h-[300px] w-[230px]
            sm:h-[380px] sm:w-[290px]
            lg:h-[420px] lg:w-[320px]
          "
        >
          <Image
            src="/assets/ghk-cu.png"
            alt="GHK-Cu research peptide vial"
            fill
            sizes="(max-width: 640px) 230px, (max-width: 1024px) 290px, 320px"
            className="
              object-contain
              drop-shadow-[0_28px_22px_rgba(11,27,63,0.28)]
            "
          />
        </div>
      </div>

      {/* ======================================
          PRODUCT DETAIL CARD — BOTTOM RIGHT
      ====================================== */}
      <div
        className="
          absolute right-[3%] bottom-[6%] z-30
          w-[165px]
          rounded-[20px]
          border border-white/20
          bg-[#0b1b3f]
          p-4 text-white
          shadow-[0_20px_45px_rgba(11,27,63,0.22)]
          sm:right-[7%] sm:bottom-[9%] sm:w-[205px] sm:p-5
          lg:right-[10%] lg:bottom-[9%] lg:w-[225px]
        "
      >
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-bold tracking-[0.15em] text-[#8bcaff] uppercase">
            Featured Compound
          </span>

          <ShieldCheck
            size={17}
            className="shrink-0 text-[#8bcaff]"
          />
        </div>

        <h3 className="font-heading mt-3 text-[21px] font-semibold tracking-[-0.04em] sm:text-[25px]">
          GHK-Cu
        </h3>

        <p className="mt-2 text-[11px] leading-[1.7] text-[#bdd0e7] sm:text-[12px]">
          Copper peptide for laboratory research.
        </p>

        <Link
          href="/products/ghk-cu"
          className="
            mt-4 inline-flex items-center gap-2
            text-[11px] font-bold text-[#9bd4ff]
            transition-colors hover:text-white
          "
        >
          Explore Product
          <ArrowUpRight size={15} />
        </Link>
      </div>

      {/* ======================================
          SMALL DECORATIVE ACCENT
      ====================================== */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute right-[15%] top-[14%] z-10
          hidden size-3 rounded-full bg-[#397fce]/50
          sm:block
        "
      />
    </div>
  );
}