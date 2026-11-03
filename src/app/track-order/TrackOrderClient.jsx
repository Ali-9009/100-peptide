"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Headphones,
  MapPin,
  Navigation,
  Package,
  PackageCheck,
  PackageSearch,
  Search,
  ShieldCheck,
  Truck,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import {
  Eyebrow,
  GradientCTA,
  SectionTitle,
} from "@/components/support/SupportUI";

import "../support-pages.css";
import JourneyMap from "@/components/support/JourneyMap";

const stages = [
  {
    title: "Order confirmed",
    label: "We received your order",
    icon: CheckCircle2,
  },
  {
    title: "Preparing order",
    label: "Products are being prepared",
    icon: Package,
  },
  { title: "In transit", label: "Shipment with carrier", icon: Truck },
  { title: "Delivered", label: "Shipment received", icon: PackageCheck },
];
const example = {
  stage: 2,
  status: "In transit",
  carrier: "Demo carrier",
  trackingNumber: "DEMO-10025",
  eta: "Illustrative journey — no real ETA",
  origin: "Distribution center",
  destination: "Destination city",
  updatedAt: "Illustrative preview",
};

function OrderProgress({ result, preview }) {
  const step = Number.isInteger(result?.stage)
    ? Math.max(0, Math.min(3, result.stage))
    : -1;
  return (
    <section className="rounded-[28px] border border-[#dce9f5] bg-white p-5 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <span className="text-[10px] font-bold tracking-[.19em] text-[#397fce] uppercase">
            {preview ? "Example tracking preview" : "Order status"}
          </span>
          <h3 className="font-heading mt-2 text-[27px] font-semibold tracking-[-.04em] text-[#0b1b3f]">
            {result?.status || "No shipment selected"}
          </h3>
        </div>
        {preview && (
          <span className="rounded-full bg-amber-50 px-3 py-2 text-[10px] font-bold tracking-[.1em] text-amber-700 uppercase">
            Demo — not an actual order
          </span>
        )}
      </div>
      <div className="mt-8 grid grid-cols-4 gap-2">
        <div className="col-span-4 h-1.5 overflow-hidden rounded-full bg-[#e8f1f9]">
          <div
            className="h-full rounded-full bg-[#397fce] transition-all duration-700"
            style={{ width: `${step < 0 ? 0 : ((step + 1) / 4) * 100}%` }}
          />
        </div>
        {stages.map(({ title, label, icon: Icon }, i) => (
          <div key={title} className="pt-3">
            <span
              className={`grid size-10 place-items-center rounded-full ${i <= step ? "bg-[#0b1b3f] text-white" : "bg-[#eef5fc] text-[#9bb1c5]"}`}
            >
              <Icon size={18} />
            </span>
            <h4
              className={`mt-3 text-[10px] leading-snug font-bold sm:text-[12px] ${i <= step ? "text-[#0b1b3f]" : "text-[#95a7b9]"}`}
            >
              {title}
            </h4>
            <p className="mt-1 hidden text-[10px] leading-relaxed text-[#8296a9] sm:block">
              {label}
            </p>
          </div>
        ))}
      </div>
      {result && (
        <div className="mt-8 grid gap-3 rounded-[20px] bg-[#f4f9fe] p-5 sm:grid-cols-2">
          {[
            {
              label: "Tracking reference",
              value: result.trackingNumber || "Not assigned",
            },
            { label: "Carrier", value: result.carrier || "Not available" },
            { label: "From", value: result.origin || "Not available" },
            {
              label: "Estimated delivery",
              value: result.eta || "Not available",
            },
          ].map((x) => (
            <div key={x.label}>
              <span className="text-[10px] font-bold tracking-[.1em] text-[#94aabd] uppercase">
                {x.label}
              </span>
              <p className="mt-1 text-[12px] font-semibold break-all text-[#244768]">
                {x.value}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function TrackOrderClient() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const [demo, setDemo] = useState(false);
  const [demoKey, setDemoKey] = useState(0);

  const startDemo = () => {
    setDemo(true);
    setResult(null);
    setDemoKey((previous) => previous + 1);
  };
  async function lookup(event) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    setPending(true);
    setError("");
    setDemo(false);
    setResult(null);

    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/track-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await res.json().catch(() => ({}));

      // Order not found
      if (res.status === 404 || response.found === false) {
        setError(
          "We couldn't find an order matching those details. Please check your order number and email.",
        );

        // Start illustrative map animation
        startDemo();
        return;
      }

      // Other API errors
      if (!res.ok) {
        throw new Error(
          response.error || "Tracking is temporarily unavailable.",
        );
      }

      // Valid tracking result
      if (response.order) {
        setDemo(false);
        setResult(response.order);
      } else {
        setError("Tracking information is currently unavailable.");
      }
    } catch (error) {
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }
  const current = demo ? example : result;
  return (
    <main className="min-h-svh overflow-hidden px-4 pt-24 pb-20 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <section
          className="grid items-start gap-5 lg:grid-cols-[.77fr_1.23fr]"
          id="tracking-lookup"
        >
          <form
            onSubmit={lookup}
            className="rounded-[28px] border border-[#dde9f5] bg-white p-5 sm:p-8"
          >
            <span className="grid size-12 place-items-center rounded-2xl bg-[#e8f4ff] text-[#397fce]">
              <PackageSearch size={24} />
            </span>
            <h2 className="font-heading mt-5 text-[30px] font-semibold tracking-[-.04em] text-[#0b1b3f]">
              Track your order
            </h2>
            <p className="mt-2 text-[13px] leading-[1.8] text-[#71869d]">
              Enter the order reference and email used at checkout. Live results
              require an order fulfillment integration.
            </p>
            <label className="mt-6 block text-[12px] font-bold text-[#355675]">
              Order number
              <input
                name="orderNumber"
                placeholder="e.g. #10025"
                maxLength={80}
                required
                className="mt-2 min-h-13 w-full rounded-2xl border border-[#dbe8f4] bg-[#f8fbff] px-4 text-[14px] outline-none focus:border-[#397fce] focus:ring-4 focus:ring-[#397fce]/10"
              />
            </label>
            <label className="mt-4 block text-[12px] font-bold text-[#355675]">
              Email address
              <input
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                maxLength={180}
                required
                className="mt-2 min-h-13 w-full rounded-2xl border border-[#dbe8f4] bg-[#f8fbff] px-4 text-[14px] outline-none focus:border-[#397fce] focus:ring-4 focus:ring-[#397fce]/10"
              />
            </label>
            {error && (
              <p
                role="alert"
                className="mt-4 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-[12px] leading-[1.6] text-amber-900"
              >
                <AlertCircle size={18} className="shrink-0" />
                {error}
              </p>
            )}
            <button
              type="submit"
              disabled={pending}
              className="mt-6 flex min-h-13 w-full items-center justify-between rounded-full bg-[#0b1b3f] px-6 text-[13px] font-bold text-white transition-colors hover:bg-[#234b8c] disabled:opacity-50"
            >
              <span>{pending ? "Checking order..." : "Find my shipment"}</span>
              <ArrowRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => {
                setError("");
                startDemo();
              }}
              className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#c8dff4] bg-[#f0f8ff] text-[12px] font-bold text-[#397fce] transition-colors hover:bg-[#e2f1ff]"
            >
              <Sparkles size={16} />
              {demo ? "Replay animated demo" : "See animated demo"}
            </button>
            <p className="mt-4 text-center text-[11px] leading-relaxed text-[#8295aa]">
              Demo mode does not retrieve or display real customer information.
            </p>
          </form>

          <JourneyMap key={demoKey} demo={demo} />
        </section>

        <div className="mt-20">
          <OrderProgress result={current} preview={demo} />
        </div>

        <section className="mt-20">
          <SectionTitle
            eyebrow="The shipping process"
            title={
              <>
                From order to <span className="text-[#397fce]">arrival.</span>
              </>
            }
            description="An overview of the stages that may be reflected in a shipment's fulfillment history."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-4">
            {stages.map(({ title, label, icon: Icon }, i) => (
              <article
                key={title}
                className="relative rounded-[26px] border border-[#dde9f5] bg-white p-6"
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-[#e8f4ff] text-[#397fce]">
                  <Icon size={23} />
                </span>
                <h3 className="font-heading mt-9 text-[20px] font-semibold text-[#0b1b3f]">
                  {title}
                </h3>
                <p className="mt-2 text-[12px] leading-[1.8] text-[#70869d]">
                  {label}
                </p>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-20">
          <GradientCTA
            title="Need help with an order?"
            description="Our support page is the right place for order questions, shipping details, and further assistance."
            primaryLabel="Contact support"
            primaryHref="/contact"
            secondaryLabel="Browse FAQs"
            secondaryHref="/faqs"
          />
        </div>
      </div>
    </main>
  );
}
