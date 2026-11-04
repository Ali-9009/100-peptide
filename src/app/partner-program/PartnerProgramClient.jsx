"use client";

import { useId, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  ChartNoAxesCombined,
  Check,
  ChevronDown,
  CircleHelp,
  ClipboardCheck,
  Copy,
  FileCheck2,
  FlaskConical,
  Handshake,
  LockKeyhole,
  Mail,
  MousePointerClick,
  PackageCheck,
  Search,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { partnerProgram as program } from "@/data/partnerProgram";

const usd = (number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(number || 0);
const compact = (number) => (number === Infinity ? "+" : usd(number));
const steps = [
  {
    icon: ClipboardCheck,
    number: "01",
    label: "Introduce yourself",
    body: "Tell us about your audience, content channels, or laboratory organization.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    label: "Program review",
    body: "We review fit, promotional methods, and research-use compliance before approval.",
  },
  {
    icon: MousePointerClick,
    number: "03",
    label: "Share responsibly",
    body: "Use approved links and materials, and disclose any financial relationship.",
  },
  {
    icon: Wallet,
    number: "04",
    label: "Review earnings",
    body: "Once an actual program is active, eligible referrals can be tracked and reconciled.",
  },
];
const benefits = [
  {
    icon: ChartNoAxesCombined,
    title: "A clear performance view",
    body: "Concept dashboard with referral traffic, eligible orders, and commission calculations.",
    className: "lg:col-span-2",
    dark: true,
    number: "01",
  },
  {
    icon: FileCheck2,
    title: "Document-first content",
    body: "Reference the original batch reports that are actually available for each compound.",
    className: "",
    number: "02",
  },
  {
    icon: Copy,
    title: "Creative, without the guesswork",
    body: "A proposed library of product renders, labels, and pre-reviewed research-use language.",
    className: "",
    number: "03",
  },
  {
    icon: Users,
    title: "A real partnership",
    body: "Straightforward application review and a channel for account questions.",
    className: "",
    number: "04",
  },
  {
    icon: TrendingUp,
    title: "Room to grow",
    body: "Illustrative revenue-based tiers that show how commission rates could scale.",
    className: "lg:col-span-2",
    number: "05",
  },
];
const faqItems = [
  {
    q: "Who can apply?",
    a: "Research-focused publishers, educators, and eligible organizations may express interest. Final eligibility and approval criteria must be confirmed before the program launches.",
  },
  {
    q: "How would referral tracking work?",
    a: "The example model uses last-click attribution and a 45-day window. A live implementation requires a working tracking platform, consent-aware measurement, and validated reporting.",
  },
  {
    q: "Are the commission figures guaranteed?",
    a: "No. This page is a designed program proposal. The rates, durations, tiers, and earnings estimates are examples until the business publishes final terms and enables an affiliate system.",
  },
  {
    q: "What can partners publish?",
    a: "Partners must follow applicable advertising and disclosure laws, avoid unsubstantiated product or laboratory claims, and never promote research compounds for human or veterinary use, dosing, or medical outcomes.",
  },
  {
    q: "When would I get paid?",
    a: "The illustrated schedule is net-30 with monthly payouts and a $50 minimum, but payment rails, country availability, reversals, and final terms need operational confirmation.",
  },
];

function Eyebrow({ children, light = false }) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-[10px] font-bold tracking-[.22em] uppercase ${light ? "text-[#a2d7ff]" : "text-[#347fc2]"}`}
    >
      <span
        className={`size-1.5 rounded-full ${light ? "bg-[#90d0ff]" : "bg-[#347fc2]"}`}
      />
      {children}
    </span>
  );
}

function Heading({ eyebrow, title, accent, description, center = false }) {
  return (
    <header className={`${center ? "mx-auto text-center" : ""} max-w-[740px]`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="font-heading mt-4 text-[clamp(35px,4.2vw,58px)] leading-[1.07] font-semibold tracking-[-.065em] text-[#0b1b3f]">
        {title} {accent && <span className="text-[#418fce]">{accent}</span>}
      </h2>
      {description && (
        <p className="text-md mt-5 max-w-[590px] leading-[1.9] text-[#67819a]">
          {description}
        </p>
      )}
    </header>
  );
}

function ProductSelector({ product, selected, onToggle }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onToggle}
      className={`group relative flex min-w-0 items-center gap-3 rounded-[16px] border p-3 text-left transition-all duration-200 ${selected ? "border-[#367fc4] bg-[#edf7ff] shadow-[0_5px_15px_rgba(41,117,192,.09)]" : "border-[#e2ebf5] bg-white hover:border-[#a8d2ee]"}`}
    >
      <span className="relative size-12 shrink-0 rounded-xl bg-[#e8f3ff]">
        {product.image && (
          <Image
            src={product.image}
            alt=""
            fill
            sizes="48px"
            className="object-contain p-1.5"
          />
        )}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[12px] font-bold text-[#0b1b3f]">
          {product.name}
        </span>
        <span className="mt-1 block text-[10px] text-[#7190a9]">
          {usd(product.selectedPrice)} / item
        </span>
      </span>
      <span
        className={`grid size-5 shrink-0 place-items-center rounded-full border ${selected ? "border-[#367fc4] bg-[#367fc4] text-white" : "border-[#b6cadd] text-transparent"}`}
      >
        <Check size={12} strokeWidth={3} />
      </span>
    </button>
  );
}

function Estimator({ products }) {
  const eligible = useMemo(
    () =>
      products
        .map((product) => {
          const options = (product.variants || []).filter(
            (v) =>
              v.inStock !== false &&
              Number.isFinite(Number(v.price)) &&
              Number(v.price) > 0,
          );
          const variant = options[product.defaultVariant] || options[0];
          return {
            ...product,
            selectedPrice: Number(variant?.price || 0),
            selectedVariant: variant?.label || "",
          };
        })
        .filter((p) => p.selectedPrice > 0),
    [products],
  );
  const [selected, setSelected] = useState([]);
  const [orders, setOrders] = useState(12);
  const [tierIndex, setTierIndex] = useState(0);
  const [query, setQuery] = useState("");
  const visible = eligible
    .filter((p) =>
      `${p.name} ${p.category || ""}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    )
    .slice(0, 12);
  const activeIds = selected.length
    ? selected
    : eligible.slice(0, 2).map((p) => p.id);
  const chosen = eligible.filter((p) => activeIds.includes(p.id));
  const orderValue = chosen.reduce((sum, p) => sum + p.selectedPrice, 0);
  const revenue = orderValue * orders;
  const tier = program.tiers[tierIndex];
  const monthly = (revenue * tier.commission) / 100;
  const toggle = (id) => {
    setSelected((previous) => {
      const next = previous.length
        ? [...previous]
        : eligible.slice(0, 2).map((p) => p.id);
      return next.includes(id) ? next.filter((v) => v !== id) : [...next, id];
    });
  };
  return (
    <section id="estimator" className="scroll-mt-28 py-20 sm:py-24 lg:py-28">
      <div className="mb-10 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <Heading
          eyebrow="Interactive earnings studio"
          title="See the numbers."
          accent="Your way."
          description="Build an example research basket and explore how commission could change with volume and tier. Prices come from your current catalog."
        />
      </div>
      <div className="grid overflow-hidden rounded-[30px] border border-[#dce9f5] bg-white shadow-[0_20px_65px_rgba(11,27,63,.05)] lg:grid-cols-[1.14fr_.86fr]">
        <div className="p-6 sm:p-9 lg:p-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="font-heading text-[26px] font-semibold tracking-[-.05em] text-[#0b1b3f]">
                Your referral order
              </h3>
              <p className="mt-1 text-sm text-[#7690a9]">
                Select a sample basket, then adjust volume.
              </p>
            </div>
            <span className="rounded-full bg-[#edf7ff] px-4 py-2 text-[11px] font-semibold text-[#397fce]">
              {chosen.length} selected
            </span>
          </div>
          <div className="relative mt-6">
            <Search
              size={16}
              className="absolute top-1/2 left-4 -translate-y-1/2 text-[#819bb0]"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Find compounds"
              aria-label="Filter estimator products"
              className="h-11 w-full rounded-full border border-[#e1ebf5] bg-[#f9fcff] pr-4 pl-11 text-[12px] outline-none focus:border-[#397fce]"
            />
          </div>
          <div className="mt-4 grid max-h-[280px] grid-cols-1 gap-2 overflow-y-auto pr-1 sm:grid-cols-2">
            {visible.length ? (
              visible.map((p) => (
                <ProductSelector
                  key={p.id}
                  product={p}
                  selected={activeIds.includes(p.id)}
                  onToggle={() => toggle(p.id)}
                />
              ))
            ) : (
              <p className="col-span-2 p-4 text-[12px] text-[#728aa2]">
                No matching priced products.
              </p>
            )}
          </div>
          <div className="mt-7 border-t border-[#edf2f7] pt-7">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-sm font-semibold text-[#8095ab]">
                  Example order value
                </p>
                <p className="font-heading mt-1 text-[29px] font-bold tracking-[-.06em] text-[#0b1b3f]">
                  {usd(orderValue)}
                </p>
              </div>
              <div className="text-right">
                <label
                  htmlFor="partner-orders"
                  className="text-sm font-semibold text-[#8095ab]"
                >
                  Referred orders / month
                </label>
                <p className="font-heading text-[29px] font-bold tracking-[-.06em] text-[#367fc4]">
                  {orders}
                </p>
              </div>
            </div>
            <input
              id="partner-orders"
              type="range"
              min="1"
              max="100"
              value={orders}
              onChange={(e) => setOrders(Number(e.target.value))}
              className="mt-4 w-full cursor-pointer accent-[#367fc4]"
            />
          </div>
        </div>
        <aside className="relative isolate flex flex-col overflow-hidden bg-[linear-gradient(150deg,#0b1b3f_0%,#113563_55%,#27679d_100%)] p-7 text-white sm:p-10">
          <div
            className="pointer-events-none absolute -top-24 -right-28 size-[340px] rounded-full bg-[#7fcaff]/20 blur-[75px]"
            aria-hidden="true"
          />
          <div className="relative">
            <h3 className="font-heading mt-2 text-[26px] font-semibold tracking-[-.05em]">
              Choose your tier
            </h3>
            <div className="relative mt-5">
              <select
                aria-label="Commission tier"
                value={tierIndex}
                onChange={(e) => setTierIndex(Number(e.target.value))}
                className="w-full appearance-none rounded-2xl border border-white/20 bg-[#1a426e] px-5 py-4 text-[13px] font-semibold text-white outline-none focus:border-[#98d7ff]"
              >
                {program.tiers.map((item, i) => (
                  <option key={item.id} value={i}>
                    {item.name} · {item.commission}% example
                  </option>
                ))}
              </select>
              <ChevronDown
                size={17}
                className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-[#b7d7ee]"
              />
            </div>
          </div>
          <div className="relative mt-8 border-b border-white/15 pb-8">
            <p className="text-[12px] text-[#c2d8eb]">
              Estimated monthly commission
            </p>
            <div className="mt-2 flex items-end gap-3">
              <strong className="font-heading text-[clamp(58px,7vw,94px)] leading-none font-semibold tracking-[-.085em]">
                {usd(monthly)}
              </strong>
              <TrendingUp size={24} className="mb-3 text-[#a2deff]" />
            </div>
            <span className="mt-4 inline-block rounded-full border border-[#9edaff]/25 bg-white/10 px-4 py-2 text-[11px] text-[#d0e9fb]">
              {tier.commission}% of {usd(revenue)} sample revenue
            </span>
          </div>
          <div className="relative mt-auto grid grid-cols-2 gap-4 pt-8">
            <div>
              <p className="text-sm text-[#b5cee3]">Annual projection</p>
              <p className="font-heading mt-2 text-[28px] font-semibold tracking-[-.05em]">
                {usd(monthly * 12)}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#b5cee3]">Per referred order</p>
              <p className="font-heading mt-2 text-[28px] font-semibold tracking-[-.05em]">
                {usd((orderValue * tier.commission) / 100)}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Application({ onClose }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [channel, setChannel] = useState("");
  const [notes, setNotes] = useState("");
  const formId = useId();
  const destination = program.contactEmail;
  const subject = encodeURIComponent(
    "100 Peptides Research — partner program inquiry",
  );
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nChannel / organization: ${channel}\n\nAbout my audience:\n${notes}`,
  );
  const mailto = `mailto:${destination}?subject=${subject}&body=${body}`;
  const submit = (e) => {
    e.preventDefault();
    if (!destination) return;
    window.location.href = mailto;
  };
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-[#06132c]/75 p-4 backdrop-blur-sm"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={`${formId}-title`}
        className="relative w-full max-w-[590px] rounded-[28px] bg-white p-6 shadow-2xl sm:p-9"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close application"
          className="absolute top-5 right-5 grid size-10 place-items-center rounded-full bg-[#edf5fc] text-[#17395f] hover:bg-[#d9eafa]"
        >
          <X size={19} />
        </button>
        <Eyebrow>Partnership inquiries</Eyebrow>
        <h2
          id={`${formId}-title`}
          className="font-heading mt-4 text-[34px] font-semibold tracking-[-.06em] text-[#0b1b3f]"
        >
          Start a conversation.
        </h2>
        <p className="mt-3 text-[13px] leading-[1.8] text-[#6b849b]">
          This is an inquiry form, not a live affiliate enrollment or approval.
        </p>
        <form className="mt-7 space-y-4" onSubmit={submit}>
          {[
            {
              label: "Your name",
              value: name,
              setter: setName,
              type: "text",
              required: true,
            },
            {
              label: "Email address",
              value: email,
              setter: setEmail,
              type: "email",
              required: true,
            },
            {
              label: "Website / channel / laboratory",
              value: channel,
              setter: setChannel,
              type: "text",
              required: true,
            },
          ].map((field, i) => (
            <label
              key={field.label}
              className="block text-[12px] font-semibold text-[#284769]"
            >
              {field.label}
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                required={field.required}
                autoComplete={i === 0 ? "name" : i === 1 ? "email" : "off"}
                className="mt-2 h-12 w-full rounded-[13px] border border-[#dce9f5] px-4 text-[13px] font-normal text-[#0b1b3f] outline-none focus:border-[#367fc4]"
              />
            </label>
          ))}
          <label className="block text-[12px] font-semibold text-[#284769]">
            Tell us about your work
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="mt-2 w-full rounded-[13px] border border-[#dce9f5] p-4 text-[13px] font-normal text-[#0b1b3f] outline-none focus:border-[#367fc4]"
            />
          </label>
          {!destination && (
            <p
              role="status"
              className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-[12px] leading-relaxed text-amber-800"
            >
              Configure <code>contactEmail</code> in{" "}
              <code>src/data/partnerProgram.js</code> to enable sending
              inquiries. No message will be submitted until then.
            </p>
          )}
          <button
            type="submit"
            disabled={!destination}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#0b1b3f] text-[13px] font-bold text-white hover:bg-[#367fc4] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Mail size={17} /> Open email to send inquiry{" "}
            <ArrowUpRight size={16} />
          </button>
          <p className="text-[11px] leading-[1.7] text-[#8299ae]">
            This opens your email app with the information filled in. No website
            database or application backend is connected.
          </p>
        </form>
      </section>
    </div>
  );
}

export default function PartnerProgramClient({ products = [] }) {
  const [appOpen, setAppOpen] = useState(false);
  return (
    <main className="overflow-x-clip text-[#0b1b3f]">
      <div className="px-4 pt-28 sm:px-7 sm:pt-32">
        <div className="mx-auto max-w-7xl">

          <section className="support-entrance relative isolate overflow-hidden bg-[linear-gradient(115deg,#07152f_0%,#0b1b3f_47%,#24548c_100%)] px-6 py-14 text-white rounded-3xl sm:px-12 sm:py-20 lg:px-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-36 -right-44 size-[590px] rounded-full bg-[#5bb6ff]/20 blur-[95px]"
            />
            <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1.08fr_.92fr]">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold tracking-[.18em] text-[#b2dcfb] uppercase">
                  <Handshake size={15} /> The Partner Collective
                </span>
                <h1 className="font-heading mt-7 text-[clamp(43px,6vw,78px)] leading-[1.02] font-semibold tracking-[-0.065em]">
                  Good research.
                  <br />
                  <span className="text-[#93d3ff]">Shared further.</span>
                </h1>
                <p className="mt-7 max-w-[520px] text-[14px] leading-[1.95] text-[#c4d7e8]">
                  A proposed partner experience for research-focused creators
                  and organizations. Explore how referral earnings, product
                  documentation, and transparent terms could work together.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => setAppOpen(true)}
                    className="inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-sm font-bold text-[#0b1b3f] transition-transform hover:-translate-y-1"
                  >
                    Partner inquiry <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>

              <div className="relative mx-auto h-[350px] w-full max-w-[480px] sm:h-[420px] lg:h-[460px]">
                <div
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 size-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/15 sm:size-[390px]"
                />
                <div className="absolute top-[11%] left-[5%] w-[67%] rotate-[-11deg] rounded-[24px] border border-white/20 bg-white/[.14] p-6 shadow-[0_28px_60px_rgba(0,0,0,.12)] backdrop-blur-xl sm:p-8">
                  <div className="flex justify-between text-[10px] font-bold tracking-[.13em] text-[#a8d8ff] uppercase">
                    <span>Partner dashboard</span>
                    <ChartNoAxesCombined size={17} />
                  </div>
                  <p className="mt-7 text-[12px] text-white/75">
                    Example commission
                  </p>
                  <strong className="font-heading mt-1 block text-[48px] leading-none tracking-[-.07em] sm:text-[60px]">
                    12.5%
                  </strong>
                  <div className="mt-8 flex h-16 items-end gap-2">
                    {[35, 60, 40, 78, 53, 90, 70, 100].map((h, i) => (
                      <span
                        key={i}
                        className="flex-1 rounded-t bg-[#94d6ff]/65"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute right-[2%] bottom-[8%] w-[64%] rotate-[8deg] rounded-[23px] border border-[#d1eaff] bg-white p-6 text-[#0b1b3f] shadow-[0_30px_70px_rgba(0,0,0,.26)] sm:p-8">
                  <div className="flex justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-[#e9f4ff] text-[#397fce]">
                      <FileCheck2 size={23} />
                    </span>
                  </div>
                  <p className="font-heading mt-5 text-[27px] leading-tight font-semibold tracking-[-.05em]">
                    Designed for
                    <br />
                    accountability.
                  </p>
                  <div className="mt-4 space-y-2 text-[11px] font-semibold text-[#5c7b98]">
                    <p className="flex items-center gap-2">
                      <Check size={14} className="text-[#397fce]" />{" "}
                      Research-use messaging
                    </p>
                    <p className="flex items-center gap-2">
                      <Check size={14} className="text-[#397fce]" /> Clear
                      attribution model
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-7">
        <Estimator products={products} />

        <section id="tiers" className="scroll-mt-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Heading
              eyebrow="Proposed progression"
              title="Four levels."
              accent="One direction."
              description="An illustrative tier model based on referred monthly revenue. Final qualification, review periods, and commission terms require approval."
            />
          </div>
          <div className="mt-11 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {program.tiers.map((tier, index) => (
              <article
                key={tier.id}
                className={`relative flex min-h-[385px] flex-col rounded-[26px] border p-7 transition-transform duration-300 hover:-translate-y-2 ${index === 1 ? "border-[#306eaf] bg-[#0b1b3f] text-white shadow-[0_20px_50px_rgba(11,27,63,.15)]" : "border-[#ddeaf5] bg-white text-[#0b1b3f]"}`}
              >
                {tier.badge && (
                  <span className="absolute -top-3 left-7 rounded-full bg-[#70bdff] px-4 py-1.5 text-sm font-bold text-[#071a34]">
                    {tier.badge}
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <p className="text-xl font-semibold">{tier.name}</p>
                  <span
                    className={`grid size-10 place-items-center rounded-xl ${index === 1 ? "bg-white/10 text-[#9ed8ff]" : "bg-[#ebf5ff] text-[#347fc2]"}`}
                  >
                    <BadgeCheck size={20} />
                  </span>
                </div>
                <p className="font-heading mt-7 text-[60px] leading-none font-semibold tracking-[-.085em]">
                  {tier.commission} <span className="text-[25px]">%</span>
                </p>
                <p
                  className={`mt-3 text-sm ${index === 1 ? "text-[#bed4e8]" : "text-[#7892a9]"}`}
                >
                  {index === 0 ? "Below" : "From"} {compact(tier.min)}
                  {tier.max !== Infinity ? ` – ${compact(tier.max)}` : "+"}{" "}
                  referred / month
                </p>
                <div
                  className={`mt-7 border-t pt-6 ${index === 1 ? "border-white/20" : "border-[#e4eef6]"}`}
                >
                  <p className="mb-4 text-xs font-bold uppercase opacity-70">
                    Illustrative access
                  </p>
                  <ul className="space-y-3">
                    {tier.perks.map((perk) => (
                      <li
                        key={perk}
                        className="flex items-start gap-2 text-sm leading-[1.55]"
                      >
                        <Check
                          size={15}
                          className={`mt-0.5 shrink-0 ${index === 1 ? "text-[#a4ddff]" : "text-[#397fce]"}`}
                        />
                        {perk}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#estimator"
                  className={`mt-auto inline-flex items-center gap-2 pt-8 text-[12px] font-bold ${index === 1 ? "text-[#a4ddff]" : "text-[#397fce]"}`}
                >
                  Try this tier <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-28 py-16 lg:py-24">
          <Heading
            eyebrow="The path to partnership"
            title="Simple steps."
            accent="Clear expectations."
            description="A practical example of how a research-focused partner onboarding process could work."
          />
          <div className="relative mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {steps.map(({ icon: Icon, number, label, body }) => (
              <article
                key={number}
                className="relative rounded-[25px] border border-[#dfebf5] bg-white p-7"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-13 place-items-center rounded-2xl bg-[#eaf5ff] text-[#387fc1]">
                    <Icon size={24} />
                  </span>
                </div>
                <h3 className="font-heading mt-7 text-[23px] font-semibold tracking-[-.04em]">
                  {label}
                </h3>
                <p className="mt-3 text-[13px] leading-[1.8] text-[#6f879f]">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="terms" className="scroll-mt-28">
          <div className="grid overflow-hidden rounded-[30px] border border-[#dbe8f4] bg-white lg:grid-cols-[.9fr_1.1fr]">
            <div className="relative isolate overflow-hidden bg-[linear-gradient(155deg,#08162e,#153c6b)] p-8 text-white sm:p-12 lg:p-14">
              <div
                className="pointer-events-none absolute -right-32 -bottom-28 size-[380px] rounded-full bg-[#4aa4ed]/15 blur-[70px]"
                aria-hidden="true"
              />
              <Eyebrow light>Commercial clarity</Eyebrow>
              <h2 className="font-heading mt-5 text-[clamp(35px,4vw,55px)] leading-[1.08] font-semibold tracking-[-.065em]">
                The terms.
                <br />
                <span className="text-[#92d4ff]">In plain view.</span>
              </h2>
              <p className="mt-6 max-w-[420px] text-sm leading-[1.95] text-[#c3d6e9]">
                Treat every number here as a proposal until final terms are
                approved, a tracking system is deployed, and the program is
                formally opened.
              </p>
              <div className="relative mt-9 rounded-[20px] border border-white/15 bg-white/10 p-5">
                <div className="text-md flex items-center gap-3 font-bold">
                  <ShieldCheck size={21} className="text-[#a2d7ff]" />{" "}
                  Research-use compliance
                </div>
                <p className="mt-3 text-sm leading-[1.8] text-[#c9dbea]">
                  No dosing, therapeutic, human-use, or veterinary-use
                  promotion. Clearly disclose affiliate relationships and avoid
                  claiming tests or certificates that are not verified.
                </p>
              </div>
            </div>
            <div className="p-7 sm:p-10 lg:p-12">
              <p className="text-md mb-6 font-semibold text-[#397fce] uppercase">
                Illustrative program conditions
              </p>
              <dl className="divide-y divide-[#e5eef7]">
                {program.terms.map(([label, value]) => (
                  <div
                    key={label}
                    className="grid gap-2 py-4 sm:grid-cols-[.9fr_1.1fr] sm:items-center"
                  >
                    <dt className="text-sm font-bold text-[#213d5a]">
                      {label}
                    </dt>
                    <dd className="text-sm leading-[1.65] text-[#72899f]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-28 py-16 lg:py-24">
          <div className="grid gap-9 lg:grid-cols-[.82fr_1.18fr] lg:gap-16">
            <div>
              <Heading
                eyebrow="Questions and answers"
                title="The important"
                accent="details."
                description="A few things to know about this proposed program before asking to join."
              />
              <button
                type="button"
                onClick={() => setAppOpen(true)}
                className="mt-7 inline-flex items-center gap-2 text-[13px] font-bold text-[#397fce]"
              >
                Ask the partner desk <ArrowUpRight size={17} />
              </button>
            </div>
            <div className="divide-y divide-[#dce9f5] overflow-hidden rounded-[25px] border border-[#dce9f5] bg-white px-6 sm:px-8">
              {faqItems.map(({ q, a }, i) => (
                <details key={q} className="group py-6">
                  <summary className="font-heading flex cursor-pointer list-none items-center justify-between gap-5 text-[18px] font-semibold tracking-[-.03em] text-[#0b1b3f] [&::-webkit-details-marker]:hidden">
                    <span>
                      {String(i + 1).padStart(2, "0")}. {q}
                    </span>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-[#edf6ff] text-[#397fce] transition-transform group-open:rotate-180">
                      <ChevronDown size={18} />
                    </span>
                  </summary>
                  <p className="max-w-[650px] pt-4 text-[13px] leading-[1.9] text-[#6f879e]">
                    {a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </div>
      {appOpen && <Application onClose={() => setAppOpen(false)} />}
    </main>
  );
}
