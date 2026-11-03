"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ShoppingBag,
  ClipboardCheck,
  PackageCheck,
  Truck,
  MapPin,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Order Received",
    description: "Order and address captured.",
    icon: ShoppingBag,
  },
  {
    number: "02",
    title: "Details Reviewed",
    description: "Usually 1–3 business days.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    title: "Parcel Prepared",
    description: "Packed and batch-labelled.",
    icon: PackageCheck,
  },
  {
    number: "04",
    title: "Carrier Handoff",
    description: "Handed to UPS.",
    icon: Truck,
  },
  {
    number: "05",
    title: "Tracking Active",
    description: "Tracking sent by email.",
    icon: MapPin,
  },
];

export default function OrderProcess() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const shakeTween = useRef(null);

  const [activeStep, setActiveStep] = useState(0);

  // Scroll reveal
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          cardRefs.current.filter(Boolean),
          { opacity: 0, y: 50, scale: 0.94 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.1,
            ease: "back.out(1.6)",
            scrollTrigger: { trigger: section, start: "top 75%", once: true },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Shake the active card awake
  useEffect(() => {
    const card = cardRefs.current[activeStep];
    if (!card) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (shakeTween.current) shakeTween.current.kill();

    shakeTween.current = gsap.fromTo(
      card,
      { rotate: 0, x: 0, y: 0 },
      {
        keyframes: [
          { rotate: -1.2, x: -3, y: -2, duration: 0.08 },
          { rotate: 1.3, x: 3, y: 2, duration: 0.08 },
          { rotate: -0.9, x: -2, y: -1, duration: 0.08 },
          { rotate: 0.7, x: 2, y: 1, duration: 0.08 },
          { rotate: -0.4, x: -1, y: 0, duration: 0.08 },
          { rotate: 0, x: 0, y: 0, duration: 0.12 },
        ],
        ease: "none",
        repeat: -1,
        repeatDelay: 2.2,
      },
    );

    return () => {
      if (shakeTween.current) shakeTween.current.kill();
    };
  }, [activeStep]);

  // Auto-advance
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      setActiveStep((c) => (c + 1) % steps.length);
    }, 3400);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how"
      aria-labelledby="order-process-title"
      className="relative overflow-hidden px-5 py-24 sm:px-8 md:py-22"
    >
      <div className="relative mx-auto max-w-7xl">
        {/* HEADER */}
        <header className="mx-auto mb-16 max-w-7xl text-center">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-xs font-semibold tracking-wider text-sky-700 uppercase">
            <Sparkles size={15} />
            How It Works
          </span>

          <h2
            id="order-process-title"
            className="font-heading text-primary text-[clamp(32px,4vw,52px)] leading-[1.05] font-semibold tracking-[-0.05em]"
          >
            One step at a time,
            <br />
            <span className="text-[#5794d1]">coming to life.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-[500px] text-base leading-relaxed text-slate-600">
            Five stages of your order — each one wakes up as your parcel moves
            forward.
          </p>
        </header>

        {/* CARDS */}
        <ol className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {steps.map((step, index) => {
            const isActive = activeStep === index;
            const Icon = step.icon;

            return (
              <li key={step.number} className="flex min-w-0">
                <button
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  onMouseEnter={() => setActiveStep(index)}
                  aria-pressed={isActive}
                  className={`group relative flex w-full flex-col overflow-hidden rounded-[24px] border p-6 text-left transition-[background-color,border-color,box-shadow,filter] duration-700 ${
                    isActive
                      ? "border-[#8dbdf0] bg-[#eaf5ff] shadow-[0_20px_50px_rgba(57,127,206,0.18)]"
                      : "border-[#e2e8f0] bg-white grayscale"
                  }`}
                >
                  {/* ICON */}
                  <span
                    className={`grid size-[54px] place-items-center rounded-2xl border transition-all duration-700 ${
                      isActive
                        ? "border-[#397fce]/20 bg-[#397fce] text-white shadow-[0_10px_24px_rgba(57,127,206,0.3)]"
                        : "border-[#e2e8f0] bg-[#f4f6f9] text-slate-400"
                    }`}
                  >
                    <Icon size={25} strokeWidth={1.7} />
                  </span>

                  {/* NUMBER */}
                  <span
                    className={`font-heading absolute top-6 right-6 text-[20px] font-semibold transition-colors duration-700 ${
                      isActive ? "text-[#397fce]/50" : "text-slate-300"
                    }`}
                  >
                    {step.number}
                  </span>

                  {/* TITLE */}
                  <h3
                    className={`font-heading mt-6 text-[21px] leading-[1.15] font-semibold tracking-[-0.03em] transition-colors duration-700 ${
                      isActive ? "text-primary" : "text-slate-400"
                    }`}
                  >
                    {step.title}
                  </h3>

                  {/* DESCRIPTION */}
                  <p
                    className={`mt-3 mb-6 text-[13.5px] leading-[1.7] transition-colors duration-700 ${
                      isActive ? "text-slate-600" : "text-slate-400"
                    }`}
                  >
                    {step.description}
                  </p>

                  {/* ALIVE BOTTOM LINE */}
                  <span
                    aria-hidden="true"
                    className={`absolute right-6 bottom-0 left-6 h-[3px] origin-left rounded-t-full bg-gradient-to-r from-[#397fce] to-[#79b8ef] transition-transform duration-700 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </button>
              </li>
            );
          })}
        </ol>

        {/* BOTTOM NOTE */}
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-[#d9e5f2] pt-7 sm:flex-row sm:items-center">
          <p className="max-w-[650px] text-sm leading-relaxed text-slate-500">
            Processing and delivery times may vary depending on the order,
            destination, and shipping conditions.
          </p>

          <a
            href="#faq"
            className="group text-primary inline-flex items-center gap-2 text-sm font-semibold"
          >
            Shipping Questions?
            <ArrowUpRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </section>
  );
}
