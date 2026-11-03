import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  FlaskConical,
  ShieldCheck,
  Info,
} from "lucide-react";
import { policyNeedsReview, storePolicies } from "@/data/storePolicies";

export function PageShell({ children }) {
  return (
    <main className="min-h-svh overflow-x-clip px-4 pt-28 pb-24 text-[#0b1b3f] sm:px-7 sm:pt-32 lg:px-10">
      {children}
    </main>
  );
}

export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  icon: Icon,
  compact = false,
  children,
}) {
  return (
    <header
      className={`relative isolate overflow-hidden rounded-[30px] bg-[#0b1b3f] px-6 py-12 text-white sm:px-10 lg:px-14 ${compact ? "lg:py-14" : "lg:py-20"}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 -right-32 size-[550px] rounded-full border border-white/10 bg-[radial-gradient(circle,rgba(71,151,239,.32),transparent_68%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[18%] -bottom-48 size-[430px] rounded-full border border-white/10"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 right-[-70px] size-[320px] -translate-y-1/2 rounded-full border border-white/10 sm:right-[2%]"
      />
      <div className="relative z-10 flex flex-col justify-between gap-9 lg:flex-row lg:items-end">
        <div className="max-w-[780px]">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm">
            <FlaskConical size={14} className="text-[#93ccff]" />
            <span className="text-[10px] font-bold tracking-[.18em] text-[#d5eaff] uppercase">
              {eyebrow}
            </span>
          </div>
          <h1 className="font-heading mt-7 text-[clamp(45px,6.8vw,88px)] leading-[1.01] font-semibold tracking-[-.065em]">
            {title}
            {accent && (
              <>
                {" "}
                <span className="text-[#82c5ff]">{accent}</span>
              </>
            )}
          </h1>
          {description && (
            <p className="mt-6 max-w-[650px] text-[14px] leading-[1.9] text-[#c2d4e8] sm:text-[15px]">
              {description}
            </p>
          )}
          {children}
        </div>
        {Icon && (
          <div className="relative hidden size-[152px] shrink-0 place-items-center rounded-[38px] border border-white/20 bg-white/10 shadow-[0_20px_70px_rgba(0,0,0,.16)] backdrop-blur-lg lg:grid">
            <Icon size={68} strokeWidth={1.2} className="text-[#99d2ff]" />
            <span className="absolute -top-4 -right-4 size-9 rounded-full border border-white/20 bg-[#397fce]" />
          </div>
        )}
      </div>
    </header>
  );
}

export function Eyebrow({ children }) {
  return (
    <p className="text-[10px] font-bold tracking-[.2em] text-[#397fce] uppercase">
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  className = "",
}) {
  return (
    <div className={className}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-heading mt-3 text-[clamp(29px,3.6vw,47px)] leading-[1.08] font-semibold tracking-[-.05em]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-2xl text-[14px] leading-[1.85] text-[#6b829a]">
          {description}
        </p>
      )}
    </div>
  );
}

export function SupportCTA({
  heading = "Need a little more clarity?",
  description = "Questions about your order, a product, or a store policy? Reach our support team.",
  buttonText = "Contact support",
}) {
  return (
    <section className="relative mt-16 overflow-hidden rounded-[28px] border border-[#c5e2f9] bg-[linear-gradient(115deg,#e5f4ff_0%,#d5eafb_52%,#eff8ff_100%)] p-7 sm:p-10 lg:p-12">
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-14 size-72 rounded-full border border-[#8bc1f0]/50"
      />
      <div className="relative flex flex-col gap-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-[600px]">
          <Eyebrow>We're here to help</Eyebrow>
          <h2 className="font-heading mt-3 text-[30px] font-semibold tracking-[-.05em] sm:text-[40px]">
            {heading}
          </h2>
          <p className="mt-3 text-[13px] leading-[1.8] text-[#59758f]">
            {description}
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-full bg-[#0b1b3f] px-6 text-[13px] font-bold text-white transition hover:-translate-y-1 hover:bg-[#234b8c] sm:self-auto"
        >
          {buttonText}
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </section>
  );
}

export function DraftNotice() {
  if (!policyNeedsReview) return null;
  return (
    <aside
      role="note"
      className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-[12px] leading-[1.7] text-amber-900"
    >
      <Info size={19} className="mt-0.5 shrink-0" />
      <p>
        <strong>Policy draft — review before publishing.</strong> Complete the
        verified business identity, contact address, jurisdiction, effective
        date, and operational commitments in{" "}
        <code>src/data/storePolicies.js</code>. These pages are starting copy,
        not legal advice.
      </p>
    </aside>
  );
}

export function PolicyLayout({ sections, children }) {
  return (
    <div className="mt-10 grid items-start gap-7 lg:grid-cols-[235px_minmax(0,1fr)] xl:gap-10">
      <aside className="hidden lg:sticky lg:top-28 lg:block">
        <nav
          aria-label="On this page"
          className="rounded-[24px] border border-[#dce9f5] bg-white p-5"
        >
          <p className="mb-4 text-[10px] font-bold tracking-[.18em] text-[#8199b0] uppercase">
            On this page
          </p>
          <div className="space-y-1">
            {sections.map((section, index) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-start gap-3 rounded-xl px-3 py-3 text-[12px] font-semibold text-[#526e8c] transition hover:bg-[#edf6ff] hover:text-[#397fce]"
              >
                <span className="text-[10px] text-[#93adbf]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{section.title}</span>
              </a>
            ))}
          </div>
        </nav>
      </aside>
      <div className="min-w-0 space-y-5">{children}</div>
    </div>
  );
}

export function PolicySection({ id, number, title, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-32 rounded-[24px] border border-[#dce9f5] bg-white p-6 shadow-[0_14px_36px_rgba(25,76,120,.035)] sm:p-8"
    >
      <div className="mb-5 flex items-start gap-4">
        <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-[#ebf5ff] text-[12px] font-bold text-[#397fce]">
          {String(number).padStart(2, "0")}
        </span>
        <h2 className="font-heading pt-1 text-[24px] leading-tight font-semibold tracking-[-.04em] sm:text-[28px]">
          {title}
        </h2>
      </div>
      <div className="space-y-4 text-[13px] leading-[1.95] text-[#586e85] sm:text-[14px] [&_a]:font-semibold [&_a]:text-[#397fce] [&_strong]:font-bold [&_strong]:text-[#15365b] [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

export function PolicyFooter() {
  const contact = storePolicies.supportEmail || null;
  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#dce9f5] bg-white px-5 py-4">
      <span className="inline-flex items-center gap-2 text-[11px] font-semibold text-[#6c839b]">
        <ShieldCheck size={16} className="text-[#397fce]" />{" "}
        {storePolicies.effectiveDate
          ? `Effective ${storePolicies.effectiveDate}`
          : "Effective date pending review"}
      </span>
      {contact ? (
        <a
          href={`mailto:${contact}`}
          className="inline-flex items-center gap-1 text-[12px] font-bold text-[#397fce]"
        >
          {contact}
          <ArrowUpRight size={15} />
        </a>
      ) : (
        <Link
          href="/contact"
          className="inline-flex items-center gap-1 text-[12px] font-bold text-[#397fce]"
        >
          Contact us
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
