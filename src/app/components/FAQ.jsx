"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Plus,
  ArrowUpRight,
  HelpCircle,
  FlaskConical,
  Package,
  Truck,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const categories = [
  { id: "all", label: "All Questions", icon: HelpCircle },
  { id: "research", label: "Research", icon: FlaskConical },
  { id: "orders", label: "Orders", icon: Package },
  { id: "shipping", label: "Shipping", icon: Truck },
];

const faqs = [
  {
    id: 1,
    category: "research",
    question: 'What does "research use only" mean?',
    answer:
      "Our products are intended strictly for laboratory and in-vitro research purposes. They are not intended for human or veterinary use, consumption, or administration.",
  },
  {
    id: 2,
    category: "orders",
    question: "Who is allowed to order?",
    answer:
      "Purchasers must meet applicable legal and eligibility requirements. Please contact our support team if you need clarification before ordering.",
  },
  {
    id: 3,
    category: "orders",
    question: "Do you offer bulk or institutional pricing?",
    answer:
      "For bulk purchases or institutional research requirements, contact our team with your product and quantity requirements to discuss available options.",
  },
  {
    id: 4,
    category: "research",
    question: "How do you verify purity?",
    answer:
      "Analytical methods such as HPLC and LC-MS can be used to assess purity and identity. Refer to the applicable batch documentation for the tests performed and their results.",
  },
  {
    id: 5,
    category: "research",
    question: "How do I access my COAs?",
    answer:
      "Certificates of Analysis contain batch-specific testing information. Contact our support team with your product name and lot number to request available documentation.",
  },
  {
    id: 6,
    category: "shipping",
    question: "What is your shipping policy?",
    answer:
      "Shipping availability, processing times, and delivery estimates depend on your location and order details. Contact our team for current shipping information.",
  },
  {
    id: 7,
    category: "orders",
    question: "What is your returns policy?",
    answer:
      "Return eligibility depends on the product condition and applicable store policies. Please contact our support team before initiating a return.",
  },
];

export default function FAQ() {
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const orbitRef = useRef(null);
  const questionRef = useRef(null);
  const contentRefs = useRef({});

  const [category, setCategory] = useState("all");
  const [activeId, setActiveId] = useState(1);

  const filteredFaqs =
    category === "all" ? faqs : faqs.filter((faq) => faq.category === category);

  // =========================================
  // SECTION ENTRANCE + FLOATING ANIMATIONS
  // =========================================

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });

        // IMPORTANT:
        // Animate children of the sticky wrapper,
        // NOT the sticky wrapper itself.
        tl.fromTo(
          "[data-faq-heading]",
          {
            y: 45,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
          },
        )
          .fromTo(
            visualRef.current,
            {
              opacity: 0,
              scale: 0.75,
              rotation: -10,
            },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1,
              ease: "back.out(1.6)",
            },
            "-=0.5",
          )
          .fromTo(
            "[data-faq-right]",
            {
              opacity: 0,
              y: 45,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
            },
            "-=0.7",
          );

        // FLOATING QUESTION MARK
        gsap.to(questionRef.current, {
          y: -12,
          rotation: 4,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play pause resume pause",
          },
        });

        // ROTATING ORBIT
        gsap.to(orbitRef.current, {
          rotation: 360,
          duration: 50,
          repeat: -1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play pause resume pause",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // =========================================
  // CATEGORY FILTER ANIMATION
  // =========================================

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const items = sectionRef.current?.querySelectorAll("[data-faq-item]");

    if (!items?.length) return;

    const animation = gsap.fromTo(
      items,
      {
        opacity: 0,
        y: 18,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        stagger: 0.045,
        ease: "power3.out",
      },
    );

    return () => animation.kill();
  }, [category]);

  // =========================================
  // SMOOTH ACCORDION
  // =========================================

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const animations = [];

    filteredFaqs.forEach((faq) => {
      const element = contentRefs.current[faq.id];

      if (!element) return;

      const isOpen = activeId === faq.id;

      const animation = gsap.to(element, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: reducedMotion ? 0 : 0.45,
        ease: "power3.inOut",
        overwrite: true,
      });

      animations.push(animation);
    });

    return () => {
      animations.forEach((animation) => animation.kill());
    };
  }, [activeId, category, filteredFaqs]);

  // =========================================
  // HANDLERS
  // =========================================

  const selectCategory = (nextCategory) => {
    setCategory(nextCategory);

    const items =
      nextCategory === "all"
        ? faqs
        : faqs.filter((faq) => faq.category === nextCategory);

    setActiveId(items[0]?.id ?? null);
  };

  const toggleQuestion = (id) => {
    setActiveId((current) => (current === id ? null : id));
  };

  return (
    <section
      ref={sectionRef}
      id="faq"
      aria-labelledby="faq-title"
      className="relative isolate overflow-x-clip px-5 py-24 sm:px-8 lg:py-28"
    >
      {/* BACKGROUND GRADIENT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      />

      {/* BACKGROUND GLOW */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 -z-10 size-[600px] rounded-full bg-[#b9dcff]/20 blur-[110px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* =====================================
            MAIN TWO-COLUMN LAYOUT
        ===================================== */}

        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 xl:gap-20">
          {/* =====================================
              LEFT — STICKY CONTENT
          ===================================== */}

          <div className="relative self-start lg:sticky lg:top-[110px] lg:z-10">
            {/* EYEBROW */}
            <div
              data-faq-heading
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#c7def7] bg-white px-4 py-2"
            >
              <Sparkles size={15} className="text-[#397fce]" />

              <span className="text-primary text-[11px] font-bold tracking-[0.17em] uppercase">
                Need Some Clarity?
              </span>
            </div>

            {/* HEADING */}
            <div data-faq-heading>
              <h2
                id="faq-title"
                className="font-heading text-primary text-[clamp(32px,4vw,52px)] leading-[1.05] font-semibold tracking-[-0.05em]"
              >
                Questions?
                <br />
                We've Got
                <br />
                <span className="text-[#397fce]">Answers.</span>
              </h2>

              <p className="mt-5 max-w-[440px] font-sans text-[15px] leading-[1.8] text-slate-600 xl:text-[16px]">
                From research documentation to shipping and ordering, find the
                answers to your most common questions.
              </p>
            </div>

            {/* =====================================
                ANIMATED QUESTION MARK
            ===================================== */}

            <div
              ref={visualRef}
              aria-hidden="true"
              className="relative mt-6 hidden h-[210px] w-full max-w-[440px] items-center justify-center lg:flex xl:mt-8 xl:h-[245px]"
            >
              {/* SOFT GLOW */}
              <div className="absolute size-[220px] rounded-full bg-[radial-gradient(circle,#c9e5ff_0%,#eaf5ff_55%,transparent_75%)] blur-[10px]" />

              {/* OUTER ORBIT */}
              <div
                ref={orbitRef}
                className="absolute size-[200px] rounded-full border border-dashed border-[#85b9e7]/45 xl:size-[240px]"
              >
                <span className="absolute top-1/2 -left-1.5 size-3 rounded-full bg-[#397fce] shadow-[0_0_20px_rgba(57,127,206,0.55)]" />
              </div>

              {/* INNER ORBIT */}
              <div className="absolute size-[155px] rounded-full border border-[#9ccaf2]/35 xl:size-[190px]" />

              {/* FLOATING QUESTION MARK */}
              <div
                ref={questionRef}
                className="to-primary relative z-10 flex size-[125px] items-center justify-center rounded-[35px] bg-gradient-to-br from-[#173a78] shadow-[0_25px_65px_rgba(11,27,63,0.28)] xl:size-[150px] xl:rounded-[40px]"
              >
                <span className="font-heading text-[105px] leading-none font-bold tracking-[-0.08em] text-white xl:text-[125px]">
                  ?
                </span>

                {/* SMALL DOT */}
                <span className="absolute -top-2 -right-2 size-6 rounded-full border-[5px] border-[#edf6ff] bg-[#5ab1ff]" />
              </div>

              {/* FLOATING LABELS */}
              <div className="text-primary absolute top-2 left-3 rounded-full border border-[#d3e6f8] bg-white px-4 py-2 text-xs font-semibold shadow-[0_10px_30px_rgba(11,27,63,0.05)]">
                Research
              </div>

              <div className="text-primary absolute right-0 bottom-6 rounded-full border border-[#d3e6f8] bg-white px-4 py-2 text-xs font-semibold shadow-[0_10px_30px_rgba(11,27,63,0.05)]">
                Support
              </div>
            </div>

            {/* CONTACT LINK */}
            <div className="mt-6">
              <Link
                href="#contact"
                className="group text-primary inline-flex items-center gap-3 font-sans text-sm font-semibold"
              >
                <span className="group-hover:bg-primary grid size-11 place-items-center rounded-full border border-[#c8def5] bg-white transition-all duration-300 group-hover:text-white">
                  <MessageCircle size={19} />
                </span>
                Still have questions?
                <ArrowUpRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </Link>
            </div>
          </div>

          {/* =====================================
              RIGHT — SCROLLING FAQS
          ===================================== */}

          <div data-faq-right className="min-w-0">
            {/* CATEGORY FILTERS */}
            <div className="mb-7 flex flex-wrap items-center gap-2">
              {categories.map((item) => {
                const Icon = item.icon;
                const selected = category === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => selectCategory(item.id)}
                    aria-pressed={selected}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 py-2.5 font-sans text-[12px] font-semibold transition-all duration-300 ${
                      selected
                        ? "border-primary bg-primary text-white shadow-[0_8px_22px_rgba(11,27,63,0.14)]"
                        : "hover:text-primary border-[#d9e7f5] bg-white text-[#62758b] hover:border-[#9fc8ee]"
                    } `}
                  >
                    <Icon size={15} strokeWidth={1.8} />

                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* QUESTION COUNT */}
            <div className="mb-4 flex items-center justify-between gap-3">
              <span className="text-[11px] font-bold tracking-[0.16em] text-[#8494aa] uppercase">
                Frequently Asked Questions
              </span>

              <span className="font-heading shrink-0 text-[13px] font-semibold text-[#397fce]">
                {String(filteredFaqs.length).padStart(2, "0")} QUESTIONS
              </span>
            </div>

            {/* ACCORDION */}
            <div className="space-y-3">
              {filteredFaqs.map((faq) => {
                const open = activeId === faq.id;

                return (
                  <article
                    key={faq.id}
                    data-faq-item
                    className={`group relative overflow-hidden rounded-[22px] border transition-[background-color,border-color,box-shadow] duration-500 ${
                      open
                        ? "border-[#94c5f0] bg-white shadow-[0_18px_50px_rgba(57,127,206,0.1)]"
                        : "border-[#dfe9f4] bg-white/75 hover:border-[#b9d6ef] hover:bg-white"
                    } `}
                  >
                    {/* ACTIVE LEFT LINE */}
                    <span
                      aria-hidden="true"
                      className={`absolute top-0 bottom-0 left-0 w-[3px] bg-[#397fce] transition-transform duration-500 ${
                        open ? "scale-y-100" : "scale-y-0"
                      } `}
                    />

                    {/* QUESTION */}
                    <h3>
                      <button
                        type="button"
                        id={`faq-question-${faq.id}`}
                        aria-expanded={open}
                        aria-controls={`faq-answer-${faq.id}`}
                        onClick={() => toggleQuestion(faq.id)}
                        className="flex min-h-[88px] w-full items-center gap-4 px-5 py-5 text-left sm:gap-5 sm:px-6"
                      >
                        {/* NUMBER */}
                        <span
                          className={`font-heading shrink-0 text-[14px] font-semibold transition-colors duration-300 ${
                            open ? "text-[#397fce]" : "text-[#a3b2c4]"
                          }`}
                        >
                          {String(faq.id).padStart(2, "0")}
                        </span>

                        {/* QUESTION TEXT */}
                        <span
                          className={`font-heading min-w-0 flex-1 text-[17px] leading-[1.35] font-semibold tracking-[-0.025em] transition-colors duration-300 sm:text-[20px] ${
                            open ? "text-[#397fce]" : "text-primary"
                          } `}
                        >
                          {faq.question}
                        </span>

                        {/* PLUS ICON */}
                        <span
                          className={`grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                            open
                              ? "border-primary bg-primary rotate-45 text-white"
                              : "text-primary border-[#dfebf5] bg-[#f2f8fe] group-hover:border-[#9dc8f0]"
                          } `}
                        >
                          <Plus size={20} strokeWidth={1.7} />
                        </span>
                      </button>
                    </h3>

                    {/* ANSWER */}
                    <div
                      ref={(element) => {
                        contentRefs.current[faq.id] = element;
                      }}
                      id={`faq-answer-${faq.id}`}
                      role="region"
                      aria-labelledby={`faq-question-${faq.id}`}
                      inert={!open}
                      style={{
                        height: open ? "auto" : 0,
                        opacity: open ? 1 : 0,
                        overflow: "hidden",
                      }}
                    >
                      <div className="px-5 pb-7 sm:pr-16 sm:pl-[68px]">
                        <div className="mb-4 h-px w-full bg-[#e5eef7]" />

                        <p className="font-sans text-[14px] leading-[1.9] text-slate-600 sm:text-[15px]">
                          {faq.answer}
                        </p>

                        {/* CATEGORY TAG */}
                        <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#eef6ff] px-3 py-1.5 text-[10px] font-semibold tracking-[0.09em] text-[#397fce] uppercase">
                          <ShieldCheck size={13} />

                          {faq.category}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* CONTACT PANEL */}
            <div className="bg-primary relative mt-8 overflow-hidden rounded-[24px] p-6 text-white sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-20 -right-20 size-52 rounded-full bg-[#4b91e9]/25 blur-[50px]"
              />

              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <span className="mb-2 block text-[10px] font-semibold tracking-[0.16em] text-[#a6caff] uppercase">
                    Need More Assistance?
                  </span>

                  <h3 className="font-heading text-[25px] font-semibold tracking-[-0.035em]">
                    We're Here to Help.
                  </h3>

                  <p className="mt-2 max-w-[340px] text-[13px] leading-relaxed text-[#b4c7e1]">
                    Can't find the answer? Our support team can help with your
                    questions.
                  </p>
                </div>

                <Link
                  href="#contact"
                  className="group text-primary inline-flex min-h-[50px] shrink-0 items-center justify-center gap-3 self-start rounded-full bg-white px-5 text-[13px] font-semibold transition-all duration-300 hover:bg-[#e6f3ff]"
                >
                  Contact Us
                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
