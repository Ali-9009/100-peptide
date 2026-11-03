"use client";

import { useEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  Atom,
  BadgeCheck,
  Beaker,
  Check,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  FileSearch,
  FileText,
  FlaskConical,
  Info,
  Microscope,
  Package,
  Search,
  ShieldCheck,
  Sparkles,
  TestTube2,
  X,
} from "lucide-react";

/* ============================================
   FORMATTING
============================================ */

const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(Number(value) || 0);

/* ============================================
   SECTION HEADING
============================================ */

function SectionHeading({
  eyebrow,
  title,
  highlight,
  description,
  centered = false,
}) {
  return (
    <header
      className={
        centered ? "mx-auto max-w-[750px] text-center" : "max-w-[750px]"
      }
    >
      <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.19em] text-[#397fce] uppercase">
        <span className="size-1.5 rounded-full bg-[#397fce]" />
        {eyebrow}
      </span>

      <h2 className="font-heading mt-4 text-[clamp(32px,4.3vw,56px)] leading-[1.08] font-semibold tracking-[-0.06em] text-[#0b1b3f]">
        {title}
        {highlight && (
          <>
            <br />
            <span className="text-[#397fce]">{highlight}</span>
          </>
        )}
      </h2>

      {description && (
        <p className="mt-5 text-[14px] leading-[1.85] text-[#71869d] sm:text-[15px]">
          {description}
        </p>
      )}
    </header>
  );
}

/* ============================================
   PRODUCT COA CARD
============================================ */

function COAProductCard({ product, onView }) {
  const variants = product.variants || [];

  const prices = variants
    .map((variant) => Number(variant.price))
    .filter((price) => Number.isFinite(price));

  const startingPrice = prices.length ? Math.min(...prices) : null;

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[26px] border border-[#dfebf7] bg-white p-3 transition-all duration-500 hover:-translate-y-1.5 hover:border-[#a7cdec] hover:shadow-[0_24px_65px_rgba(11,27,63,0.09)]">
      {/* PRODUCT IMAGE */}
      <Link
        href={`/products/${product.slug}`}
        aria-label={`View ${product.name} details`}
        className="relative block aspect-[4/4.3] overflow-hidden rounded-[20px] bg-[#eaf4ff]"
      >
        {/* BACKGROUND */}
        <div
          aria-hidden="true"
          className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
          style={{
            background: `radial-gradient(
              circle at 50% 45%,
              #ffffff 0%,
              ${product.tint || "#e6f2ff"} 72%,
              #dceafa 100%
            )`,
          }}
        />

        {/* CIRCLE */}
        <div
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70"
        />

        {/* IMAGE */}
        <div className="absolute inset-[10%] transition-transform duration-700 group-hover:-translate-y-2 group-hover:scale-105">
          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
              className="object-contain drop-shadow-[0_22px_25px_rgba(11,27,63,0.15)]"
            />
          )}
        </div>
      </Link>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col px-3 pt-6 pb-3">
        <span className="text-[10px] font-bold tracking-[0.15em] text-[#397fce] uppercase">
          {product.category}
        </span>

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-heading mt-2 text-[25px] font-semibold tracking-[-0.045em] text-[#0b1b3f] transition-colors hover:text-[#397fce]">
            {product.name}
          </h3>
        </Link>

        <p className="mt-3 line-clamp-2 min-h-[42px] text-[12px] leading-[1.8] text-[#71869d]">
          {product.description}
        </p>

        {/* PRICE */}
        <div className="mt-auto flex items-center justify-between border-t border-[#edf2f8] pt-5">
          <div>
            <p className="font-heading mt-1 text-[23px] font-bold tracking-[-0.04em] text-[#0b1b3f]">
              {startingPrice == null ? "Unavailable" : money(startingPrice)}
            </p>
          </div>

          <span className="grid size-11 place-items-center rounded-full bg-[#eef6ff] text-[#397fce]">
            <FileCheck2 size={20} />
          </span>
        </div>

        <Link
          href={`/coa/${product.slug}`}
          className="mt-5 flex min-h-[52px] w-full items-center justify-between rounded-full bg-[#0b1b3f] px-5 text-[13px] font-semibold text-white transition-all duration-300 hover:bg-[#397fce]"
        >
          <span className="flex items-center gap-2">
            <FileSearch size={17} />
            View COA
          </span>

          <ArrowUpRight size={18} />
        </Link>
      </div>
    </article>
  );
}

/* ============================================
   COA MODAL
============================================ */

/* ============================================
   TESTING METHODS
============================================ */

const testingMethods = [
  {
    number: "01",
    icon: Atom,
    title: "Compound Identity",
    method: "LC-MS",
    description:
      "Liquid chromatography–mass spectrometry can help characterize a sample by separating components and measuring mass-related signals.",
  },
  {
    number: "02",
    icon: Beaker,
    title: "Analytical Purity",
    method: "HPLC-UV",
    description:
      "High-performance liquid chromatography can measure a sample's chromatographic profile. Reported purity depends on the validated method.",
  },
  {
    number: "03",
    icon: Microscope,
    title: "Contaminant Screening",
    method: "Assay-dependent",
    description:
      "Specific methods may assess microbial markers, endotoxins, elemental impurities, or other defined characteristics.",
  },
  {
    number: "04",
    icon: TestTube2,
    title: "Content Assessment",
    method: "Method-dependent",
    description:
      "An appropriate analytical method may be used to assess the quantity of a specified substance in a sample.",
  },
];

/* ============================================
   MAIN PAGE
============================================ */

export default function COAClient({ products = [] }) {
  const [search, setSearch] = useState("");
  const [activeProduct, setActiveProduct] = useState(null);

  const filteredProducts = products.filter((product) => {
    const query = search.trim().toLowerCase();

    return (
      product.name.toLowerCase().includes(query) ||
      product.category?.toLowerCase().includes(query) ||
      product.slug?.toLowerCase().includes(query)
    );
  });

  return (
    <main className="min-h-svh px-4 pt-28 pb-20 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        {/* =====================================
            HERO
        ===================================== */}
        <section className="relative isolate overflow-hidden rounded-[30px] bg-[linear-gradient(115deg,#07152f_0%,#0b1b3f_47%,#24548c_100%)] px-6 py-14 text-white sm:rounded-[36px] sm:px-12 sm:py-20 lg:px-16">
          {/* GLOW */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -right-20 size-[500px] rounded-full bg-[#61b8ff]/20 blur-[100px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-52 left-[20%] size-[400px] rounded-full bg-[#397fce]/15 blur-[100px]"
          />

          <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.1fr_.9fr]">
            {/* LEFT */}
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold tracking-[0.15em] text-[#acd9ff] uppercase">
                <FlaskConical size={15} />
                Research Documentation
              </span>

              <h1 className="font-heading mt-7 text-[clamp(43px,6vw,78px)] leading-[1.02] font-semibold tracking-[-0.065em]">
                Behind every
                <br />
                <span className="text-[#83c7ff]">analytical result.</span>
              </h1>

              <p className="mt-6 max-w-[540px] text-[14px] leading-[1.9] text-[#c2d3e5]">
                Explore research compounds and learn how analytical
                documentation communicates sample identity, composition, and
                laboratory findings.
              </p>

              <a
                href="#coa-library"
                className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-[13px] font-bold text-[#0b1b3f] transition-transform duration-300 hover:-translate-y-1"
              >
                Explore COA Library
                <ArrowUpRight size={17} />
              </a>
            </div>

            {/* RIGHT — VISUAL */}
            <div className="relative hidden h-[350px] lg:block">
              <div
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 size-[310px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
              />

              <div
                aria-hidden="true"
                className="absolute top-1/2 left-1/2 size-[230px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15"
              />

              {/* DOCUMENT */}
              <div className="absolute top-[5%] left-[16%] flex h-[290px] w-[235px] rotate-[-12deg] flex-col rounded-[24px] border border-white/60 bg-white p-6 shadow-[0_35px_70px_rgba(0,0,0,0.2)]">
                <div className="flex items-center justify-between">
                  <span className="grid size-10 place-items-center rounded-xl bg-[#eaf4ff] text-[#397fce]">
                    <FileCheck2 size={22} />
                  </span>

                  <span className="text-[9px] font-bold tracking-widest text-[#9baec0]">
                    SAMPLE
                  </span>
                </div>

                <div className="mt-7">
                  <div className="h-3 w-[90%] rounded bg-[#dbeaf8]" />
                  <div className="mt-3 h-2 w-[70%] rounded bg-[#e8f2fb]" />
                  <div className="mt-3 h-2 w-[82%] rounded bg-[#e8f2fb]" />
                </div>

                <div className="mt-8 space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="flex items-center justify-between"
                    >
                      <div className="h-2 w-[65px] rounded bg-[#deebf8]" />

                      <div className="h-2 w-[40px] rounded bg-[#b9d9f2]" />
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-2 text-[10px] font-bold text-[#397fce]">
                  <ClipboardCheck size={16} />
                  Example Report
                </div>
              </div>

              {/* FLOATING BOTTLE */}
              <div className="absolute top-[4%] right-[4%] h-[340px] w-[240px] rotate-[13deg]">
                <Image
                  src="/assets/bpc-157.png"
                  alt="BPC-157 research peptide vial"
                  fill
                  sizes="240px"
                  className="object-contain drop-shadow-[0_30px_30px_rgba(0,0,0,0.3)]"
                />
              </div>

              {/* SMALL FLOATING BADGE */}
              <div className="absolute right-[1%] bottom-[4%] flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-[11px] font-semibold backdrop-blur-md">
                <Microscope size={16} className="text-[#9bd4ff]" />
                Analytical Reference
              </div>
            </div>
          </div>
        </section>

        {/* =====================================
            LIBRARY
        ===================================== */}
        <section id="coa-library" className="scroll-mt-28 pt-20 lg:pt-28">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Explore Documentation"
              title="Certificate of Analysis"
              highlight="Library."
              description="Browse products and preview the structure of analytical documentation. The current report values are examples and not verified batch results."
            />

            {/* SEARCH */}
            <div className="relative w-full lg:max-w-[340px]">
              <Search
                size={19}
                className="absolute top-1/2 left-4 -translate-y-1/2 text-[#8da4ba]"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search compounds..."
                aria-label="Search compounds"
                className="min-h-[54px] w-full rounded-full border border-[#dce9f5] bg-white pr-5 pl-12 text-[13px] text-[#0b1b3f] transition-all outline-none focus:border-[#397fce] focus:ring-4 focus:ring-[#397fce]/10"
              />
            </div>
          </div>

          {/* RESULT COUNT */}
          <div className="mt-10 flex items-center justify-between border-b border-[#e1eaf3] pb-5">
            <p className="text-[12px] font-medium text-[#7890a7]">
              Showing{" "}
              <span className="font-bold text-[#0b1b3f]">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>
          </div>

          {/* PRODUCT GRID */}
          {filteredProducts.length > 0 ? (
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((product) => (
                <COAProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="mt-7 rounded-[26px] border border-[#dce9f5] bg-white p-14 text-center">
              <Search size={30} className="mx-auto text-[#397fce]" />

              <h3 className="font-heading mt-4 text-[24px] font-semibold text-[#0b1b3f]">
                No products found
              </h3>

              <p className="mt-2 text-[13px] text-[#71869d]">
                Try another compound name or category.
              </p>

              <button
                type="button"
                onClick={() => setSearch("")}
                className="mt-5 text-[13px] font-bold text-[#397fce]"
              >
                Clear Search
              </button>
            </div>
          )}
        </section>

        {/* =====================================
            SECTION 2 — TESTING METHODS
        ===================================== */}
        <section className="pt-24 lg:pt-32">
          <SectionHeading
            eyebrow="Analytical Methods"
            title="Understanding the"
            highlight="Testing Process."
            description="Different analytical methods answer different questions. The methods listed below are educational examples, not a claim that every product has undergone each test."
            centered
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {testingMethods.map((item) => {
              const Icon = item.icon;

              return (
                <article
                  key={item.number}
                  className="group relative flex h-full flex-col rounded-[26px] border border-[#deebf6] bg-white p-7 transition-all duration-500 hover:-translate-y-2 hover:border-[#a8cfef] hover:shadow-[0_25px_55px_rgba(11,27,63,0.08)]"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid size-14 place-items-center rounded-2xl bg-[#eaf4ff] text-[#397fce] transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-[#0b1b3f] group-hover:text-white">
                      <Icon size={27} strokeWidth={1.6} />
                    </span>
                  </div>

                  <h3 className="font-heading mt-7 text-[22px] font-semibold tracking-[-0.04em] text-[#0b1b3f]">
                    {item.title}
                  </h3>

                  <span className="mt-3 inline-flex w-fit rounded-full bg-[#eaf4ff] px-3 py-1.5 text-[10px] font-bold tracking-[0.08em] text-[#397fce]">
                    {item.method}
                  </span>

                  <p className="mt-5 text-[13px] leading-[1.85] text-[#71869d]">
                    {item.description}
                  </p>

                  <div className="mt-auto pt-7">
                    <div className="h-px w-full bg-[#e1ebf5]" />
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* =====================================
            SECTION 3 — HOW TO READ A COA
        ===================================== */}
        <section className="pt-24 lg:pt-32">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            {/* LEFT — DARK PANEL */}
            <div className="relative isolate overflow-hidden rounded-[30px] bg-[linear-gradient(145deg,#081630_0%,#0b1b3f_55%,#23548d_100%)] p-9 text-white sm:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-28 -bottom-28 size-[350px] rounded-full bg-[#61b4ff]/20 blur-[80px]"
              />

              <span className="inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.17em] text-[#91d0ff] uppercase">
                <Sparkles size={15} />
                Research Education
              </span>

              <h2 className="font-heading mt-6 text-[clamp(34px,4vw,52px)] leading-[1.08] font-semibold tracking-[-0.06em]">
                Read beyond
                <br />
                <span className="text-[#83c7ff]">the percentage.</span>
              </h2>

              <p className="mt-6 max-w-[420px] text-[14px] leading-[1.9] text-[#bfd0e4]">
                A certificate is more than a single purity number. Understanding
                the sample identity, testing method, reported units, and
                laboratory documentation helps put analytical results into
                context.
              </p>

              <div className="relative mt-10 flex items-center gap-3 rounded-[18px] border border-white/15 bg-white/10 p-4 backdrop-blur-md">
                <span className="grid size-11 place-items-center rounded-xl bg-white/10 text-[#a4d9ff]">
                  <FileCheck2 size={22} />
                </span>

                <div>
                  <p className="text-[12px] font-bold text-white">
                    Lot-specific documentation
                  </p>

                  <p className="mt-1 text-[11px] text-[#adc4dc]">
                    Always review the actual analytical report.
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT — STEPS */}
            <div className="space-y-5">
              {[
                {
                  number: "01",
                  title: "Match the product and batch",
                  description:
                    "Confirm the compound name, sample identifier, lot number, and report date correspond to the material being evaluated.",
                },
                {
                  number: "02",
                  title: "Review analytical methods",
                  description:
                    "Check which testing techniques were used, what they measure, and whether the report states suitable acceptance criteria.",
                },
                {
                  number: "03",
                  title: "Interpret the actual findings",
                  description:
                    "Review measured results, units, detection limits, conclusions, and any laboratory notes. One reported percentage does not establish every quality characteristic.",
                },
              ].map((step, index) => (
                <article
                  key={step.number}
                  className="group flex gap-5 rounded-[24px] border border-[#deebf6] bg-white p-6 transition-all duration-300 hover:border-[#a7cfef] hover:shadow-[0_15px_35px_rgba(11,27,63,0.06)] sm:p-7"
                >
                  <span className="font-heading shrink-0 text-[40px] leading-none font-bold tracking-[-0.07em] text-[#b8d9f2]">
                    {step.number}
                  </span>

                  <div>
                    <h3 className="font-heading text-[21px] font-semibold tracking-[-0.04em] text-[#0b1b3f]">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-[13px] leading-[1.85] text-[#71869d]">
                      {step.description}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={18}
                    className="ml-auto hidden shrink-0 text-[#9bbad7] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 sm:block"
                  />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================
            BOTTOM CTA
        ===================================== */}
        <section className="relative mt-24 overflow-hidden rounded-[28px] bg-[#dfefff] px-6 py-12 sm:px-10 lg:mt-32 lg:px-14 lg:py-14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-20 size-[360px] rounded-full bg-white/70 blur-[70px]"
          />

          <div className="relative z-10 flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-[650px]">
              <span className="text-[11px] font-bold tracking-[0.17em] text-[#397fce] uppercase">
                Need More Information?
              </span>

              <h2 className="font-heading mt-3 text-[clamp(30px,4vw,48px)] leading-[1.1] font-semibold tracking-[-0.055em] text-[#0b1b3f]">
                Questions about
                <br />
                research documentation?
              </h2>

              <p className="mt-4 text-[13px] leading-[1.8] text-[#6684a1]">
                Contact our team to ask about available product information and
                batch-specific documentation.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex min-h-[52px] shrink-0 items-center justify-center gap-3 rounded-full bg-[#0b1b3f] px-7 text-[13px] font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#397fce]"
            >
              Contact Our Team
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}