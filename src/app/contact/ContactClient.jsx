"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  FlaskConical,
  Headphones,
  Mail,
  MapPin,
  MessageCircleMore,
  PackageSearch,
  Send,
  ShieldCheck,
  Truck,
  AlertCircle,
} from "lucide-react";
import { SUPPORT_CONFIG } from "@/data/support-config";
import {
  Eyebrow,
  GradientCTA,
  SectionTitle,
} from "@/components/support/SupportUI";
import "../support-pages.css";

const topics = [
  "General question",
  "Product information",
  "Order support",
  "Shipping & tracking",
  "Documentation / COA",
  "Other",
];
const inputStyle =
  "w-full rounded-2xl border border-[#dce8f4] bg-[#f8fbff] px-4 py-3.5 text-[14px] text-[#0b1b3f] outline-none transition-all placeholder:text-[#9aadbf] focus:border-[#397fce] focus:bg-white focus:ring-4 focus:ring-[#397fce]/10";

function ContactCard({
  icon: Icon,
  title,
  description,
  children,
  accent = false,
}) {
  return (
    <article
      className={`group rounded-[26px] border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_-20px_rgba(11,27,63,.17)] ${accent ? "border-[#b9d7f5] bg-[#eaf5ff]" : "border-[#e2ecf5] bg-white"}`}
    >
      <span className="mb-7 grid size-12 place-items-center rounded-2xl bg-[#e0f0ff] text-[#397fce] transition-transform group-hover:rotate-[-7deg]">
        <Icon size={22} strokeWidth={1.7} />
      </span>
      <h3 className="font-heading text-[23px] font-semibold tracking-[-.04em] text-[#0b1b3f]">
        {title}
      </h3>
      <p className="mt-2 min-h-12 text-[13px] leading-[1.75] text-[#69829b]">
        {description}
      </p>
      <div className="mt-5">{children}</div>
    </article>
  );
}

function DistributionMap() {
  return (
    <div className="relative min-h-[325px] overflow-hidden rounded-[28px] border border-[#d5e6f6] bg-[#eaf5ff] p-6 sm:min-h-[380px] sm:p-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,#fff_0%,transparent_44%)]" />
      <div className="relative z-10 flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold tracking-[.2em] text-[#397fce] uppercase">
            Logistics overview
          </span>
          <h3 className="font-heading mt-2 text-[27px] font-semibold tracking-[-.04em] text-[#0b1b3f]">
            Across the United States.
          </h3>
          <p className="mt-1 max-w-sm text-[12px] leading-relaxed text-[#69829b]">
            Illustrative shipping-region map. Not an office location or live
            shipment tracker.
          </p>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-[#c8dfef] bg-white/80 px-3 py-2 text-[11px] font-semibold text-[#285d92]">
          <span className="size-2 rounded-full bg-[#397fce]" /> U.S.
          distribution
        </span>
      </div>
      <svg
        viewBox="0 0 700 285"
        className="absolute bottom-0 left-1/2 w-[112%] max-w-[830px] -translate-x-1/2"
        role="img"
        aria-label="Illustrated United States shipping region with a Dallas marker"
      >
        <defs>
          <linearGradient id="usMap" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#a4cdf3" />
            <stop offset="1" stopColor="#cee7fc" />
          </linearGradient>
        </defs>
        <path
          d="M89 54 L133 46 L184 55 L226 53 L255 67 L299 59 L326 68 L365 61 L399 63 L441 47 L470 65 L511 51 L548 73 L572 77 L585 98 L608 97 L613 123 L632 138 L616 152 L627 171 L598 182 L584 206 L566 214 L548 237 L520 224 L508 197 L481 184 L466 192 L444 177 L405 182 L382 203 L356 196 L338 218 L300 203 L280 183 L244 193 L226 178 L202 181 L175 163 L148 167 L133 149 L109 140 L109 113 L88 102 Z"
          fill="url(#usMap)"
          stroke="#8dbce7"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M242 160 Q355 70 540 126"
          fill="none"
          stroke="#397fce"
          strokeWidth="2.5"
          className="support-mapline"
        />
        <path
          d="M242 160 Q370 220 566 170"
          fill="none"
          stroke="#397fce"
          strokeWidth="2.5"
          className="support-mapline"
        />
        <circle cx="242" cy="160" r="23" fill="#397fce" fillOpacity=".12" />
        <circle
          cx="242"
          cy="160"
          r="10"
          fill="#397fce"
          stroke="white"
          strokeWidth="5"
        />
        <circle cx="540" cy="126" r="5" fill="#397fce" />
        <circle cx="566" cy="170" r="5" fill="#397fce" />
        <rect x="202" y="180" width="87" height="28" rx="14" fill="white" />
        <text
          x="245"
          y="198"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="#174677"
        >
          Dallas, TX
        </text>
      </svg>
    </div>
  );
}

export default function ContactClient() {
  const [status, setStatus] = useState({ type: "", message: "" });
  const [sending, setSending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setSending(true);
    setStatus({ type: "", message: "" });
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok)
        throw new Error(
          result.error || "Your message could not be sent. Please try again.",
        );
      setStatus({
        type: "success",
        message: "Message sent successfully. Thank you for contacting us.",
      });
      form.reset();
    } catch (error) {
      setStatus({ type: "error", message: error.message });
    } finally {
      setSending(false);
    }
  }

  return (
    <main className="min-h-svh overflow-hidden px-4 pt-28 pb-20 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <section className="support-entrance relative isolate min-h-[520px] overflow-hidden rounded-3xl bg-[#0b1b3f] sm:min-h-[580px] lg:min-h-[620px]">
          {/* BACKGROUND IMAGE */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-0 bg-[url('/assets/contact-banner.png')] bg-cover bg-right bg-no-repeat"
          />

          {/* DARK GRADIENT — LEFT SIDE ONLY */}
          <div
            aria-hidden="true"
            className="absolute inset-0 z-10 bg-gradient-to-r from-[#07152f]/90 via-[#07152f]/65 to-transparent"
          />

          {/* CONTENT */}
          <div className="relative z-20 flex min-h-[520px] items-center px-6 py-16 sm:min-h-[580px] sm:px-12 lg:min-h-[620px] lg:px-16">
            <div className="max-w-[720px]">
              <Eyebrow light>Let's connect</Eyebrow>

              <h1 className="font-heading mt-7 text-[clamp(50px,7vw,100px)] leading-[0.96] font-semibold tracking-[-0.075em] text-white">
                Questions?
                <br />
                <span className="text-[#83c7ff]">We're here.</span>
              </h1>

              <p className="mt-7 max-w-[490px] text-[15px] leading-[1.9] text-white/75">
                From product information to order questions, get the details you
                need without the guesswork.
              </p>

              <Link
                href="#contact-form"
                className="mt-9 inline-flex min-h-12 items-center gap-2 rounded-full bg-white px-6 text-[13px] font-bold text-[#0b1b3f] transition-all duration-300 hover:-translate-y-1 hover:bg-[#dcefff]"
              >
                Send a message
                <ArrowUpRight size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section
          className="mt-12 grid gap-4 md:grid-cols-3"
          aria-label="Support contact options"
        >
          <ContactCard
            icon={Mail}
            title="Email the team"
            description="General questions, research product information, or existing orders."
          >
            <span className="text-[12px] font-semibold text-[#397fce]">
              {SUPPORT_CONFIG.email ? (
                <a
                  className="inline-flex items-center gap-2 hover:underline"
                  href={`mailto:${SUPPORT_CONFIG.email}`}
                >
                  {SUPPORT_CONFIG.email}
                  <ArrowUpRight size={14} />
                </a>
              ) : (
                "Use the message form below"
              )}
            </span>
          </ContactCard>
          <ContactCard
            icon={PackageSearch}
            title="Order assistance"
            description="Need shipment information or help with a recent order?"
          >
            <Link
              href="/track-order"
              className="inline-flex items-center gap-2 text-[12px] font-bold text-[#397fce] hover:underline"
            >
              Track an order <ArrowUpRight size={14} />
            </Link>
          </ContactCard>
          <ContactCard
            icon={Clock3}
            title="Support availability"
            description={SUPPORT_CONFIG.hours}
            accent
          >
            <span className="text-[12px] font-semibold text-[#397fce]">
              {SUPPORT_CONFIG.responseTime}
            </span>
          </ContactCard>
        </section>

        <section
          className="mt-20 grid items-start gap-8 lg:grid-cols-[.86fr_1.14fr] lg:gap-14"
          id="contact-form"
        >
          <div className="lg:sticky lg:top-28">
            <SectionTitle
              eyebrow="A direct line"
              title={
                <>
                  Let's start a{" "}
                  <span className="text-[#397fce]">conversation.</span>
                </>
              }
              description="Send us a message and include any order reference if you're contacting us about a purchase. Please don't share payment card details."
            />
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#e6f2ff] text-[#397fce]">
                  <MessageCircleMore size={20} />
                </span>
                <div>
                  <h3 className="text-[13px] font-bold">
                    One message, clear next steps
                  </h3>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#738aa1]">
                    Choose a topic and tell us what you need help with.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#e6f2ff] text-[#397fce]">
                  <ShieldCheck size={20} />
                </span>
                <div>
                  <h3 className="text-[13px] font-bold">
                    Privacy-minded support
                  </h3>
                  <p className="mt-1 text-[12px] leading-relaxed text-[#738aa1]">
                    Only provide the information necessary for your request.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit}
            className="rounded-[30px] border border-[#deebf6] bg-white p-5 shadow-[0_25px_80px_-45px_rgba(11,27,63,.2)] sm:p-8"
            aria-label="Contact form"
          >
            <div className="flex items-center justify-between gap-3 border-b border-[#edf2f8] pb-6">
              <div>
                <span className="text-[10px] font-bold tracking-[.18em] text-[#397fce] uppercase">
                  Support request
                </span>
                <h3 className="font-heading mt-1 text-[27px] font-semibold tracking-[-.04em]">
                  Send a message
                </h3>
              </div>
              <span className="grid size-12 place-items-center rounded-2xl bg-[#e9f4ff] text-[#397fce]">
                <Send size={22} />
              </span>
            </div>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <label className="block text-[12px] font-bold text-[#34526f]">
                Full name <span className="text-[#397fce]">*</span>
                <input
                  className={`${inputStyle} mt-2`}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  maxLength={100}
                  required
                />
              </label>
              <label className="block text-[12px] font-bold text-[#34526f]">
                Email address <span className="text-[#397fce]">*</span>
                <input
                  className={`${inputStyle} mt-2`}
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  maxLength={180}
                  required
                />
              </label>
            </div>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <label className="block text-[12px] font-bold text-[#34526f]">
                What can we help with? <span className="text-[#397fce]">*</span>
                <select
                  className={`${inputStyle} mt-2`}
                  name="topic"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Choose a topic
                  </option>
                  {topics.map((topic) => (
                    <option value={topic} key={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block text-[12px] font-bold text-[#34526f]">
                Order number{" "}
                <span className="font-normal text-[#96a6b7]">(optional)</span>
                <input
                  className={`${inputStyle} mt-2`}
                  name="orderNumber"
                  type="text"
                  placeholder="e.g. #10025"
                  maxLength={64}
                />
              </label>
            </div>
            <label className="mt-5 block text-[12px] font-bold text-[#34526f]">
              Your message <span className="text-[#397fce]">*</span>
              <textarea
                className={`${inputStyle} mt-2 min-h-[155px] resize-y`}
                name="message"
                placeholder="Tell us how we can help..."
                minLength={10}
                maxLength={4000}
                required
              />
            </label>
            <label className="sr-only" aria-hidden="true">
              Leave blank
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
            {status.message && (
              <div
                role="status"
                className={`mt-5 flex items-start gap-2 rounded-xl p-3 text-[12px] font-medium ${status.type === "success" ? "bg-emerald-50 text-emerald-800" : "bg-rose-50 text-rose-800"}`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 size={18} className="shrink-0" />
                ) : (
                  <AlertCircle size={18} className="shrink-0" />
                )}
                {status.message}
              </div>
            )}
            <button
              type="submit"
              disabled={sending}
              className="group mt-6 flex min-h-[54px] w-full items-center justify-between rounded-full bg-[#0b1b3f] px-6 text-[13px] font-bold text-white transition-all hover:bg-[#234b8c] disabled:cursor-wait disabled:opacity-60"
            >
              <span>
                {sending ? "Sending message..." : "Send your message"}
              </span>
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
            <p className="mt-4 text-center text-[11px] leading-relaxed text-[#8194a7]">
              Messages are only sent once the email integration is configured.
            </p>
          </form>
        </section>

        <section className="mt-20 grid gap-5 lg:grid-cols-[1.25fr_.75fr]">
          {/* GOOGLE MAP */}
          <div className="group relative min-h-80 overflow-hidden rounded-[28px] border border-[#deebf7] bg-[#eaf4ff] lg:min-h-100">
            {/* MAP */}
            <iframe
              title="Google Maps — Dallas, Texas"
              src="https://maps.google.com/maps?q=Dallas%2C%20Texas&t=&z=11&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 h-full w-full border-0 grayscale-[15%] transition-all duration-700 group-hover:grayscale-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />

            {/* LOCATION BADGE */}
            <div className="pointer-events-none absolute top-5 left-5 z-10 flex items-center gap-3 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-[0_10px_30px_rgba(11,27,63,0.12)] backdrop-blur-xl">
              <span className="grid size-10 place-items-center rounded-xl bg-[#e8f3ff] text-[#397fce]">
                <MapPin size={20} />
              </span>

              <div>
                <p className="text-[10px] font-bold tracking-[0.12em] text-[#7890a8] uppercase">
                  Shipping Region
                </p>

                <p className="mt-0.5 text-[13px] font-bold text-[#0b1b3f]">
                  Dallas, Texas, USA
                </p>
              </div>
            </div>

            {/* BOTTOM MAP LABEL */}
            <div className="pointer-events-none absolute right-5 bottom-5 z-10 rounded-full border border-white/70 bg-white/90 px-4 py-2 text-[11px] font-semibold text-[#0b1b3f] shadow-md backdrop-blur-lg">
              Interactive Google Maps
            </div>
          </div>

          {/* SHIPPING INFORMATION CARD */}
          <div className="flex flex-col justify-between rounded-[28px] bg-[#0b1b3f] p-8 text-white">
            <span className="grid size-14 place-items-center rounded-2xl border border-white/15 bg-white/10 text-sky-200">
              <MapPin size={28} />
            </span>

            <div className="mt-12">
              <span className="text-[10px] font-bold tracking-[0.21em] text-[#89c7ff] uppercase">
                Shipping information
              </span>

              <h3 className="font-heading mt-3 text-[35px] leading-[1.09] font-semibold tracking-[-0.055em]">
                From selection
                <br />
                to shipment.
              </h3>

              <p className="mt-4 text-[13px] leading-[1.8] text-slate-300">
                View available delivery options during checkout. Shipping status
                is provided by the carrier once an order is dispatched.
              </p>

              <Link
                href="/track-order"
                className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold text-white transition-colors hover:text-sky-200"
              >
                Explore order tracking
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <div className="mt-20">
          <GradientCTA
            title="Maybe the answer is already here."
            description="Browse frequently asked questions about research products, orders, and shipping."
            primaryLabel="Explore FAQs"
            primaryHref="/faqs"
            secondaryLabel="Shop collection"
            secondaryHref="/shop"
          />
        </div>
      </div>
    </main>
  );
}
