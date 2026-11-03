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
      className={`relative isolate overflow-hidden ${className}`}
      aria-label="Research peptide product presentation"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_34%,#ffffff_0%,#d9edff_50%,#a7d3f4_100%)]" />
      <div
        className="absolute top-1/2 left-1/2 size-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 size-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50"
        aria-hidden="true"
      />
      <img
        src="/assets/bpc-157.png"
        alt="BPC-157 research peptide vial"
        className="support-bottle-float absolute top-[13%] left-[14%] z-10 h-[72%] w-[50%] object-contain drop-shadow-[0_30px_23px_rgba(10,46,95,0.2)]"
      />
      <img
        src="/assets/tb-500.png"
        alt="TB-500 research peptide vial"
        className="support-bottle-float-alt absolute top-[23%] right-[10%] z-20 h-[65%] w-[45%] rotate-[14deg] object-contain drop-shadow-[0_30px_23px_rgba(10,46,95,0.19)]"
      />
      <span className="absolute bottom-5 left-6 z-20 rounded-full border border-white/60 bg-white/70 px-3 py-1.5 text-[10px] font-semibold tracking-[0.16em] text-[#285d92] uppercase backdrop-blur">
        Precision-led catalog
      </span>
    </div>
  );
}
