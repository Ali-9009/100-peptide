import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import {
  ArrowLeft,
  ArrowUpRight,
  FileCheck2,
  FlaskConical,
  Info,
  Microscope,
  ShieldAlert,
} from "lucide-react";

import { getProducts, getProductBySlug } from "@/data/products";

import { getCOABySlug } from "@/data/coa-data";

export function generateStaticParams() {
  return getProducts().map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  return {
    title: product
      ? `${product.name} COA | 100 Peptides Research`
      : "Certificate Not Found",
    description: product
      ? `Certificate of Analysis information for ${product.name}.`
      : "Certificate information unavailable.",
  };
}

export default async function COADetailPage({ params }) {
  const { slug } = await params;

  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const coa = getCOABySlug(slug);

  return (
    <main className="min-h-svh bg-[linear-gradient(to_bottom,#f7faff_0%,#ffffff_100%)] px-4 pt-28 pb-20 sm:px-8 sm:pt-36">
      <div className="mx-auto max-w-7xl">
        {/* BACK LINK */}
        <Link
          href="/coa"
          className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#397fce] transition-colors hover:text-[#0b1b3f]"
        >
          <ArrowLeft size={17} />
          Back to COA Library
        </Link>

        {/* HERO */}
        <header className="mt-8 grid overflow-hidden rounded-[30px] border border-[#dce9f5] bg-white lg:grid-cols-[0.9fr_1.1fr]">
          {/* PRODUCT IMAGE */}
          <div className="relative flex min-h-[320px] items-center justify-center bg-[radial-gradient(circle_at_center,#ffffff_0%,#e0f2fe_75%,#c6e3fa_100%)] p-8 lg:min-h-[420px]">
            <div className="relative h-[290px] w-full max-w-[300px] lg:h-[350px]">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 300px, 350px"
                  className="object-contain drop-shadow-[0_25px_30px_rgba(11,27,63,0.18)]"
                />
              )}
            </div>
          </div>

          {/* PRODUCT DETAILS */}
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-12">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#eaf4ff] px-4 py-2 text-[10px] font-bold tracking-[0.12em] text-[#397fce] uppercase">
              <FlaskConical size={15} />
              Research Documentation
            </span>

            <h1 className="font-heading mt-6 text-[clamp(35px,4.5vw,60px)] leading-[1.05] font-semibold tracking-[-0.065em] text-[#0b1b3f]">
              {product.name}
              <br />
              <span className="text-[#397fce]">Certificate of Analysis.</span>
            </h1>

            <p className="mt-5 max-w-[500px] text-[14px] leading-[1.85] text-[#71869d]">
              Review available analytical documentation and laboratory
              information associated with this research compound.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/products/${product.slug}`}
                className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[#0b1b3f] px-6 text-[12px] font-bold text-white transition-colors hover:bg-[#397fce]"
              >
                View Product
                <ArrowUpRight size={16} />
              </Link>

              {coa?.certificateUrl && coa.verified && (
                <a
                  href={coa.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[#cfe1f0] px-6 text-[12px] font-bold text-[#0b1b3f]"
                >
                  View Original Certificate
                  <FileCheck2 size={16} />
                </a>
              )}
            </div>
          </div>
        </header>

        {/* DOCUMENTATION STATUS */}
        <section className="mt-8 rounded-[24px] border border-amber-200 bg-amber-50 p-6">
          <div className="flex items-start gap-3">
            <ShieldAlert size={22} className="mt-0.5 shrink-0 text-amber-700" />

            <div>
              <h2 className="font-heading text-[20px] font-semibold text-amber-950">
                {coa?.verified
                  ? "Certificate documentation"
                  : "Demonstration information"}
              </h2>

              <p className="mt-2 text-[13px] leading-[1.8] text-amber-900">
                {coa?.verified
                  ? "Review the original laboratory certificate for batch-specific results."
                  : "The values below are fictional examples provided to demonstrate this page layout. They are not verified laboratory results or evidence that this product has been tested."}
              </p>
            </div>
          </div>
        </section>

        {/* ANALYSIS */}
        <section className="mt-12">
          <div>
            <span className="text-[11px] font-bold tracking-[0.17em] text-[#397fce] uppercase">
              Product Documentation
            </span>

            <h2 className="font-heading mt-3 text-[clamp(29px,4vw,43px)] font-semibold tracking-[-0.055em] text-[#0b1b3f]">
              Analytical Overview.
            </h2>
          </div>

          {/* REPORT DETAILS */}
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                label: "Sample ID",
                value: coa?.sampleId || "Not available",
              },
              {
                label: "Lot Number",
                value: coa?.lot || "Not available",
              },
              {
                label: "Laboratory",
                value: coa?.laboratory || "Not available",
              },
              {
                label: "Analysis Date",
                value: coa?.testDate || "Not available",
              },
            ].map((item) => (
              <article
                key={item.label}
                className="rounded-[20px] border border-[#dce9f5] bg-white p-5"
              >
                <span className="text-[10px] font-bold tracking-[0.12em] text-[#8ca5ba] uppercase">
                  {item.label}
                </span>

                <p className="mt-3 text-[14px] font-bold text-[#0b1b3f]">
                  {item.value}
                </p>
              </article>
            ))}
          </div>

          {/* RESULTS TABLE */}
          <div className="mt-7 overflow-hidden rounded-[24px] border border-[#dce9f5] bg-white">
            <div className="hidden grid-cols-[1fr_180px_1fr] bg-[#eaf4ff] px-6 py-5 text-[11px] font-bold tracking-[0.12em] text-[#397fce] uppercase sm:grid">
              <span>Analysis</span>
              <span>Method</span>
              <span>Result</span>
            </div>

            {coa?.results?.length ? (
              coa.results.map((result, index) => (
                <div
                  key={`${result.label}-${index}`}
                  className="grid gap-2 border-t border-[#e8eef5] px-6 py-5 first:border-t-0 sm:grid-cols-[1fr_180px_1fr] sm:items-center"
                >
                  <span className="flex items-center gap-3 text-[13px] font-semibold text-[#0b1b3f]">
                    <span className="grid size-9 place-items-center rounded-xl bg-[#eaf4ff] text-[#397fce]">
                      <Microscope size={17} />
                    </span>

                    {result.label}
                  </span>

                  <span className="pl-12 text-[12px] text-[#8095a9] sm:pl-0">
                    {result.method}
                  </span>

                  <span className="pl-12 text-[13px] font-bold text-[#397fce] sm:pl-0">
                    {result.value}
                  </span>
                </div>
              ))
            ) : (
              <div className="p-10 text-center">
                <Info size={28} className="mx-auto text-[#397fce]" />

                <p className="mt-3 text-[13px] text-[#71869d]">
                  No certificate data is currently available for this product.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* BOTTOM NOTICE */}
        <aside className="mt-10 rounded-[22px] border border-[#cbe0f2] bg-[#eaf4ff] p-6">
          <div className="flex items-start gap-3">
            <Info size={20} className="mt-0.5 shrink-0 text-[#397fce]" />

            <p className="text-[13px] leading-[1.8] text-[#536f8b]">
              A Certificate of Analysis should be specific to the product batch
              being evaluated. Confirm sample identification, testing methods,
              reported units, and laboratory information using the original
              certificate.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}