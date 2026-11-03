import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Atom,
  Check,
  CircleDot,
  FlaskConical,
  Layers3,
  Microscope,
  PackageCheck,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  BottleShowcase,
  Eyebrow,
  GradientCTA,
  ResearchNote,
  SectionTitle,
} from "@/components/support/SupportUI";
import "../support-pages.css";
export const metadata = {
  title: "About Us | 100 Peptides Research",
  description:
    "Learn about the research-focused product catalog and our approach to clear product information.",
};

const principles = [
  {
    index: "01",
    icon: Microscope,
    title: "Research-led information",
    description:
      "Product pages are structured around clear variant information, technical references, and available documentation rather than exaggerated promises.",
  },
  {
    index: "02",
    icon: ScanLine,
    title: "Details you can inspect",
    description:
      "Find product presentations, listed strengths, and certificate links when supporting lot documentation is available.",
  },
  {
    index: "03",
    icon: Layers3,
    title: "A considered collection",
    description:
      "Individual compounds and curated catalog combinations are organized to make browsing and comparing straightforward.",
  },
];

export default function AboutUsPage() {
  return (
    <main className="min-h-svh overflow-hidden px-4 pt-28 pb-20 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <section className="support-entrance relative isolate min-h-[520px] overflow-hidden rounded-3xl bg-[#0b1b3f] sm:min-h-[580px] lg:min-h-[620px]">
          {/* BACKGROUND IMAGE */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 bg-[url('/assets/about-banner.jpg')] bg-cover bg-right bg-no-repeat"
          />

          {/* DARK GRADIENT — LEFT SIDE ONLY */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-10 bg-gradient-to-r from-[#07152f]/90 via-[#07152f]/65 to-transparent"
          />

          {/* CONTENT */}
          <div className="relative z-20 flex min-h-[520px] items-center px-6 py-16 sm:min-h-[580px] sm:px-12 lg:min-h-[620px] lg:px-16">
            <div className="max-w-[720px]">
              <Eyebrow light>Our perspective</Eyebrow>

              <h1 className="font-heading mt-7 text-[clamp(50px,7vw,100px)] leading-[0.96] font-semibold tracking-[-0.075em] text-white">
                Driven by
                <br />
                <span className="text-[#83c7ff]">discovery.</span>
              </h1>

              <p className="mt-7 max-w-[490px] text-[15px] leading-[1.9] text-white/75">
                100 Peptides Research brings a considered approach to exploring
                research compounds, pairing a carefully organized catalog with
                practical product information.
              </p>

              <Link
                href="/shop"
                className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-[13px] font-bold text-[#0b1b3f] transition-all duration-300 hover:-translate-y-1 hover:bg-[#dcefff]"
              >
                Explore the collection
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section className="mt-20 grid items-center gap-10 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
          <BottleShowcase className="min-h-[390px] rounded-[32px] sm:min-h-[490px]" />
          <div>
            <SectionTitle
              eyebrow="Who we are"
              title={
                <>
                  A more considered{" "}
                  <span className="text-[#397fce]">approach.</span>
                </>
              }
              description="Research deserves clarity. We believe catalog design should make it easier to understand exactly what is being presented, compare available options, and find supporting information without unnecessary clutter."
            />
            <p className="mt-5 text-[14px] leading-[1.9] text-[#69829b]">
              From product detail pages to support resources, our focus is on
              thoughtful organization, accessible information, and a polished
              purchasing experience for laboratory researchers.
            </p>
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                "Product-focused information",
                "Clearly displayed variants",
                "Available lot documentation",
                "Research-use transparency",
              ].map((text) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-[12px] font-semibold text-[#365b7e]"
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-[#e0f0ff] text-[#397fce]">
                    <Check size={14} />
                  </span>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-24">
          <SectionTitle
            eyebrow="Our principles"
            title={
              <>
                Less noise.{" "}
                <span className="text-[#397fce]">More clarity.</span>
              </>
            }
            description="A consistent experience across the collection, from the first browse to the technical details."
          />
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {principles.map(({ index, icon: Icon, title, description }) => (
              <article
                key={index}
                className="group relative overflow-hidden rounded-[28px] border border-[#e0ebf5] bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#b7d5f0] hover:shadow-[0_22px_55px_-35px_rgba(11,27,63,.25)]"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl bg-[#e9f5ff] text-[#397fce]">
                    <Icon size={27} strokeWidth={1.5} />
                  </span>
                </div>
                <h3 className="font-heading mt-6 text-[25px] leading-tight font-semibold tracking-[-.04em] text-[#0b1b3f]">
                  {title}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.9] text-[#6e839b]">
                  {description}
                </p>
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[#397fce] transition-all duration-500 group-hover:w-full" />
              </article>
            ))}
          </div>
        </section>

        <section className="mt-24 grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <SectionTitle
              eyebrow="Product transparency"
              title={
                <>
                  Information that{" "}
                  <span className="text-[#397fce]">stays useful.</span>
                </>
              }
              description="We present product-specific information where available. Analytical results should always be checked against the relevant lot documentation, not assumed from general product descriptions."
            />
            <div className="mt-7">
              <ResearchNote />
            </div>
            <Link
              href="/faqs"
              className="mt-7 inline-flex items-center gap-2 text-[13px] font-bold text-[#397fce]"
            >
              Read frequently asked questions <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-[27px] bg-[#0b1b3f] p-6 text-white sm:p-8">
              <Atom className="text-[#90d0ff]" size={31} />
              <h3 className="font-heading mt-12 text-[24px] font-semibold">
                Compound info
              </h3>
              <p className="mt-2 text-[12px] leading-[1.8] text-slate-300">
                Technical information presented only when available.
              </p>
            </div>
            <div className="translate-y-7 rounded-[27px] border border-[#dcebf7] bg-white p-6 sm:p-8">
              <FlaskConical className="text-[#397fce]" size={31} />
              <h3 className="font-heading mt-12 text-[24px] font-semibold text-[#0b1b3f]">
                Clear variants
              </h3>
              <p className="mt-2 text-[12px] leading-[1.8] text-[#6b8198]">
                Strengths and purchase options listed consistently.
              </p>
            </div>
            <div className="rounded-[27px] border border-[#dcebf7] bg-white p-6 sm:p-8">
              <PackageCheck className="text-[#397fce]" size={31} />
              <h3 className="font-heading mt-12 text-[24px] font-semibold text-[#0b1b3f]">
                Order visibility
              </h3>
              <p className="mt-2 text-[12px] leading-[1.8] text-[#6b8198]">
                Support resources for shipping and order questions.
              </p>
            </div>
            <div className="translate-y-7 rounded-[27px] bg-[#397fce] p-6 text-white sm:p-8">
              <ShieldCheck className="text-[#e0f2ff]" size={31} />
              <h3 className="font-heading mt-12 text-[24px] font-semibold">
                Research only
              </h3>
              <p className="mt-2 text-[12px] leading-[1.8] text-blue-100">
                A clear research-use notice throughout the experience.
              </p>
            </div>
          </div>
        </section>
        <div className="mt-20">
          <GradientCTA
            title="Where curiosity meets clarity."
            description="Explore the research collection and find the information you need to make an informed catalog selection."
            primaryLabel="Shop research collection"
            primaryHref="/shop"
            secondaryLabel="Talk to our team"
            secondaryHref="/contact"
          />
        </div>
      </div>
    </main>
  );
}
