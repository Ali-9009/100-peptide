"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  Fingerprint,
  ShieldCheck,
  Scale,
  ScanSearch,
  Dna,
  Activity,
  ArrowUpRight,
  Check,
  FlaskConical,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const standards = [
  {
    id: "01",
    title: "Identification",
    method: "HPLC + LC-MS",
    description:
      "Analytical techniques used to assess compound identity and characterize the material under investigation.",
    icon: Fingerprint,
  },
  {
    id: "02",
    title: "Purity",
    method: "Chromatographic analysis",
    description:
      "Chromatographic methods help assess sample purity and distinguish the principal compound from detectable impurities.",
    icon: ShieldCheck,
  },
  {
    id: "03",
    title: "Net Content",
    method: "Measured mass per vial",
    description:
      "Measurement of the material contained in each vial using an appropriate analytical procedure.",
    icon: Scale,
  },
  {
    id: "04",
    title: "Endotoxins",
    method: "Bacterial endotoxin screen",
    description:
      "Screening methods used to investigate bacterial endotoxin contamination in a sample.",
    icon: ScanSearch,
  },
  {
    id: "05",
    title: "Sterility",
    method: "PCR screen",
    description:
      "PCR-based screening can investigate specified microbial genetic material. It does not independently establish sterility.",
    icon: Dna,
  },
];

const positions = [
  "top-[8%] left-[0%]",
  "top-[8%] right-[0%]",
  "bottom-[22%] left-[0%]",
  "bottom-[22%] right-[0%]",
  "bottom-[0%] left-1/2 -translate-x-1/2",
];

export default function ResearchStandards() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);

  const productRef = useRef(null);
  const orbitRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);

  const active = standards[activeIndex];
  const ActiveIcon = active.icon;

  const selectStep = (index) => {
    setActiveIndex((index + standards.length) % standards.length);
  };

  // ============================================
  // GSAP
  // ============================================

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Entrance animations
        const entrance = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        });

        entrance
          .fromTo(
            "[data-reveal='heading']",
            {
              opacity: 0,
              y: -35,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
            },
          )
          .fromTo(
            productRef.current,
            {
              opacity: 0,
              y: 90,
              scale: 0.75,
              rotation: -10,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 1.15,
              ease: "back.out(1.5)",
            },
            "-=0.45",
          )
          .fromTo(
            "[data-research-point]",
            {
              opacity: 0,
              y: 25,
              scale: 0.8,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.65,
              stagger: 0.1,
              ease: "back.out(1.7)",
            },
            "-=0.7",
          )
          .fromTo(
            "[data-reveal='panel']",
            {
              opacity: 0,
              x: 45,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.65",
          );

        // Rotating orbit
        gsap.to(orbitRef.current, {
          rotation: 360,
          duration: 65,
          repeat: -1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            toggleActions: "play pause resume pause",
          },
        });

        // LEFT BOTTLE — MOVES UP AND DOWN
        gsap.to("[data-bottle='left']", {
          y: -18,
          x: -4,
          duration: 2.8,
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

        // RIGHT BOTTLE — MOVES INDEPENDENTLY
        gsap.fromTo(
          "[data-bottle='right']",
          {
            y: -14,
            x: 4,
          },
          {
            y: 12,
            x: -3,
            duration: 3.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              toggleActions: "play pause resume pause",
            },
          },
        );

        // Subtle checkpoint movement
        gsap.utils.toArray("[data-point-inner]").forEach((element, index) => {
          gsap.to(element, {
            y: index % 2 === 0 ? -6 : 6,
            duration: 3 + index * 0.35,
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
        });

        return () => {};
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ============================================
  // CURSOR LIGHT
  // ============================================

  const handlePointerMove = (event) => {
    if (
      event.pointerType !== "mouse" ||
      !sectionRef.current ||
      !glowRef.current
    ) {
      return;
    }

    const rect = sectionRef.current.getBoundingClientRect();

    gsap.to(glowRef.current, {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      duration: 0.8,
      ease: "power3.out",
      overwrite: true,
    });
  };

  return (
    <section
      ref={sectionRef}
      id="research-standards"
      aria-labelledby="research-standards-title"
      onPointerMove={handlePointerMove}
      className="relative isolate mx-auto flex min-h-svh max-w-7xl items-center overflow-hidden rounded-3xl bg-[#050e22] px-4 py-16 text-white sm:px-8 md:py-12"
    >
      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_48%_45%,#193976_0%,#091834_52%,#050e22_88%)]"
      />

      {/* GRID */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] [background-size:65px_65px] opacity-[0.05]"
      />

      {/* INTERACTIVE GLOW */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 -z-10 size-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#438bff]/10 blur-[90px]"
      />

      <div className="relative mx-auto w-full max-w-[1320px]">
        {/* ============================================
            COMPACT HEADING
        ============================================ */}

        <header
          data-reveal="heading"
          className="mx-auto mb-7 max-w-[780px] text-center sm:mb-9 lg:mb-5"
        >
          <h2
            id="research-standards-title"
            className="font-heading text-[clamp(32px,4vw,52px)] leading-[1.05] font-semibold tracking-[-0.05em]"
          >
            A Closer Look at{" "}
            <span className="text-[#8dbfff]">Research Standards.</span>
          </h2>

          <p className="mx-auto mt-3 max-w-[540px] font-sans text-[13px] leading-relaxed text-[#9cb2d2] sm:text-[15px]">
            Explore five analytical considerations associated with research
            compounds.
          </p>
        </header>

        {/* ============================================
            MAIN LAYOUT
        ============================================ */}

        <div className="grid min-w-0 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,320px)] xl:grid-cols-[minmax(0,1fr)_350px] xl:gap-8">
          {/* ============================================
              LEFT VISUAL
          ============================================ */}

          <div className="relative mx-auto h-[330px] w-full max-w-[790px] min-w-0 sm:h-[430px] md:h-[490px] lg:h-[min(65svh,560px)] xl:h-[min(67svh,600px)]">
            {/* CENTERED ORBIT WRAPPER */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              {/* INNER RING */}
              <div className="absolute size-[210px] rounded-full border border-[#8dbfff]/10 sm:size-[300px] md:size-[350px] lg:size-[min(37vw,400px)]" />

              {/* ROTATING RING POSITION WRAPPER */}
              <div className="absolute size-[260px] sm:size-[370px] md:size-[420px] lg:size-[min(43vw,480px)]">
                <div
                  ref={orbitRef}
                  className="relative h-full w-full rounded-full border border-dashed border-[#8dbfff]/20"
                >
                  <span className="absolute top-1/2 -left-1 size-2.5 -translate-y-1/2 rounded-full bg-[#8dbfff] shadow-[0_0_20px_#8dbfff]" />
                </div>
              </div>

              {/* CENTER GLOW */}
              <div className="absolute size-[220px] rounded-full bg-[#438bff]/15 blur-[65px] sm:size-[320px]" />
            </div>

            {/* ============================================
                PRODUCT — CENTERED
            ============================================ */}

            {/* TWO INDEPENDENT FLOATING PRODUCTS */}
            <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
              <div
                ref={productRef}
                className="relative h-[260px] w-[290px] sm:h-[340px] sm:w-[420px] md:h-[390px] md:w-[480px] lg:h-[min(52svh,480px)] lg:w-[min(42vw,560px)]"
              >
                {/* LEFT PRODUCT — BPC-157 */}
                <div className="absolute top-[7%] left-[10%] z-10 h-[90%] w-[58%] origin-bottom-right -rotate-[18deg] sm:left-[13%]">
                  <div data-bottle="left" className="relative h-full w-full">
                    <Image
                      src="/assets/bpc-157.png"
                      alt="BPC-157 research peptide vial"
                      fill
                      sizes="(max-width: 640px) 170px, (max-width: 1024px) 260px, 320px"
                      className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.4)]"
                    />
                  </div>
                </div>

                {/* RIGHT PRODUCT — TB-500 */}
                <div className="absolute top-[4%] right-[10%] z-20 h-[95%] w-[58%] origin-bottom-left rotate-[18deg] sm:right-[13%]">
                  <div data-bottle="right" className="relative h-full w-full">
                    <Image
                      src="/assets/tb-500.png"
                      alt="TB-500 research peptide vial"
                      fill
                      sizes="(max-width: 640px) 170px, (max-width: 1024px) 260px, 320px"
                      className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.45)]"
                    />
                  </div>
                </div>

                {/* BACKGROUND GLOW */}
                <div
                  aria-hidden="true"
                  className="absolute top-1/2 left-1/2 -z-10 h-[65%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#65a7ff]/15 blur-[55px]"
                />
              </div>
            </div>

            {/* ============================================
                DESKTOP FLOATING CHECKPOINTS
            ============================================ */}

            <div className="hidden lg:block">
              {standards.map((item, index) => {
                const Icon = item.icon;
                const isActive = activeIndex === index;

                return (
                  <div
                    key={item.id}
                    data-research-point
                    className={`absolute z-20 ${positions[index]}`}
                  >
                    {/* INNER FLOAT ELEMENT */}
                    <div data-point-inner>
                      <button
                        type="button"
                        onClick={() => selectStep(index)}
                        onMouseEnter={() => selectStep(index)}
                        aria-pressed={isActive}
                        aria-label={`${item.title}: ${item.method}`}
                        className={`group flex w-[145px] items-center gap-2.5 rounded-2xl border px-3 py-3 text-left backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-300 xl:w-[185px] ${
                          isActive
                            ? "border-[#83b8ff] bg-[#2b579f]/95 shadow-[0_15px_35px_rgba(0,0,0,0.2)]"
                            : "border-white/15 bg-[#122448]/90 hover:border-[#83b8ff]/50 hover:bg-[#1c376a]"
                        } `}
                      >
                        <span
                          className={`grid size-9 shrink-0 place-items-center rounded-xl transition-all duration-300 group-hover:scale-110 ${
                            isActive
                              ? "text-primary bg-white"
                              : "bg-[#263f70] text-[#a3caff]"
                          } `}
                        >
                          <Icon size={19} strokeWidth={1.6} />
                        </span>

                        <span className="min-w-0">
                          <span className="font-heading block text-[13px] leading-tight font-semibold">
                            {item.title}
                          </span>

                          <span className="mt-1 block text-[10px] leading-snug text-[#b1c9e9]">
                            {item.method}
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ============================================
              MOBILE / TABLET SELECTORS
          ============================================ */}

          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:hidden">
            {standards.map((item, index) => {
              const Icon = item.icon;
              const selected = activeIndex === index;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectStep(index)}
                  aria-pressed={selected}
                  className={`flex min-h-[65px] items-center gap-2 rounded-xl border px-3 py-2 text-left transition-all duration-300 ${
                    selected
                      ? "border-[#82b7ff] bg-[#2b579f]"
                      : "border-white/10 bg-[#142749] hover:border-[#82b7ff]/40"
                  } `}
                >
                  <Icon
                    size={19}
                    className={
                      selected
                        ? "shrink-0 text-white"
                        : "shrink-0 text-[#91bcfa]"
                    }
                  />

                  <span className="min-w-0 text-[12px] leading-tight font-semibold">
                    {item.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ============================================
              INTERACTIVE DETAIL PANEL
          ============================================ */}

          <aside
            data-reveal="panel"
            className="relative min-w-0 overflow-hidden rounded-[24px] border border-[#7eaee8]/20 bg-[#10254b]/80 p-5 backdrop-blur-xl sm:p-6 lg:self-center"
          >
            {/* PANEL GLOW */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-24 -right-24 size-56 rounded-full bg-[#6ca9ff]/10 blur-[50px]"
            />

            {/* TOP */}
            <div className="relative flex items-center justify-between">
              <span className="text-[10px] font-semibold tracking-[0.16em] text-[#96b7e1] uppercase">
                Selected Checkpoint
              </span>
            </div>

            {/* CHANGING CONTENT */}
            <div key={active.id} className="relative mt-5" aria-live="polite">
              <div className="mb-4 grid size-[60px] place-items-center rounded-[17px] border border-[#8abfff]/25 bg-[#326bb8]/25 text-[#9fccff]">
                <ActiveIcon size={29} strokeWidth={1.5} />
              </div>

              <h3 className="font-heading text-[clamp(29px,3vw,38px)] leading-[1.1] font-semibold tracking-[-0.04em]">
                {active.title}
              </h3>

              <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-full border border-[#8cbfff]/20 bg-[#5a94e0]/10 px-3 py-2">
                <Check size={14} className="shrink-0 text-[#9ac9ff]" />

                <span className="text-[12px] font-semibold text-[#b9d9ff]">
                  {active.method}
                </span>
              </div>

              <p className="mt-5 min-h-[72px] font-sans text-[14px] leading-[1.75] text-[#acbfdc]">
                {active.description}
              </p>
            </div>

            {/* NAVIGATION */}
            <div className="relative mt-6 border-t border-white/10 pt-5">
              <div className="mb-4 flex items-center justify-between gap-2">
                <span className="text-[10px] font-semibold tracking-[0.15em] text-[#88a5cb] uppercase">
                  Explore Methods
                </span>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => selectStep(activeIndex - 1)}
                    aria-label="Previous checkpoint"
                    className="grid size-9 place-items-center rounded-full border border-white/15 text-white/75 transition-all hover:border-[#92c5ff] hover:text-white"
                  >
                    <ArrowLeft size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => selectStep(activeIndex + 1)}
                    aria-label="Next checkpoint"
                    className="grid size-9 place-items-center rounded-full border border-white/15 text-white/75 transition-all hover:border-[#92c5ff] hover:text-white"
                  >
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* PANEL FOOTER */}
            <div className="relative mt-5 flex items-center justify-between gap-3 border-t border-white/10 pt-5">
              <span className="text-[11px] text-[#8ca8cc]">
                Analytical Methods
              </span>

              <a
                href="#shop"
                className="group inline-flex items-center gap-2 text-[12px] font-semibold text-[#a5d0ff] transition-colors hover:text-white"
              >
                Explore Products
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}