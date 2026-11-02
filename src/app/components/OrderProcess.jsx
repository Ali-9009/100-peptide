"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import {
  ShoppingBag,
  ClipboardCheck,
  PackageCheck,
  Truck,
  MapPin,
  ArrowUpRight,
  Check,
  ArrowDown,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import AOS from "aos";
import "aos/dist/aos.css";

const steps = [
  {
    number: "01",
    eyebrow: "ORDER CONFIRMATION",
    title: "Order Placed.",
    description:
      "Your order is received, and your details are recorded for processing.",
    icon: ShoppingBag,
  },
  {
    number: "02",
    eyebrow: "DETAILS VERIFICATION",
    title: "Order Reviewed.",
    description:
      "Our team reviews your order details and prepares the next steps.",
    icon: ClipboardCheck,
  },
  {
    number: "03",
    eyebrow: "PREPARATION",
    title: "Carefully Prepared.",
    description:
      "Your research products are carefully packed and prepared for dispatch.",
    icon: PackageCheck,
  },
  {
    number: "04",
    eyebrow: "SHIPPING",
    title: "Carrier Handoff.",
    description:
      "Your package is handed over to the shipping partner for delivery.",
    icon: Truck,
  },
  {
    number: "05",
    eyebrow: "ORDER TRACKING",
    title: "Tracking Active.",
    description: "Shipment tracking information is provided when available.",
    icon: MapPin,
  },
];

// ==========================================
// 3D TILT CARD (mouse-driven depth + glare)
// ==========================================

function TiltCard({ children, className = "", active = false }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const canTilt = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;

    if (!canTilt) return;

    gsap.set(el, { transformPerspective: 900 });

    const rx = gsap.quickTo(el, "rotationX", {
      duration: 0.6,
      ease: "power3.out",
    });
    const ry = gsap.quickTo(el, "rotationY", {
      duration: 0.6,
      ease: "power3.out",
    });

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;

      ry((px - 0.5) * 16);
      rx(-(py - 0.5) * 16);

      el.style.setProperty("--mx", `${px * 100}%`);
      el.style.setProperty("--my", `${py * 100}%`);
    };

    const onLeave = () => {
      rx(0);
      ry(0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative will-change-transform [transform-style:preserve-3d] ${className}`}
    >
      {/* GLASS FACE (separate layer so blur does not flatten the 3D children) */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 rounded-[28px] border backdrop-blur-xl transition-[background-color,border-color,box-shadow] duration-500 ${
          active
            ? "border-[#bcd9f5] bg-white/85 shadow-[0_30px_70px_-20px_rgba(57,127,206,0.45)]"
            : "border-white/80 bg-white/55 shadow-[0_18px_45px_-22px_rgba(11,27,63,0.25)]"
        }`}
      />

      {/* GLARE FOLLOWING THE CURSOR */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx,50%) var(--my,50%), rgba(124,197,255,0.28), transparent 60%)",
        }}
      />

      {children}
    </div>
  );
}

export default function OrderProcess() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  const lineRef = useRef(null);
  const progressRef = useRef(null);
  const travelerRef = useRef(null);
  const travelerIconRef = useRef(null);

  const checkpointRefs = useRef([]);
  const activeRef = useRef(-1);

  const [activeStep, setActiveStep] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  const ActiveIcon = steps[activeStep].icon;

  // ==========================================
  // AOS INIT
  // ==========================================

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const sync = () => setIsDesktop(mq.matches);
    sync();
    mq.addEventListener("change", sync);

    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 90,
      disable: () =>
        window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });

    return () => mq.removeEventListener("change", sync);
  }, []);

  // Re-measure AOS once the layout type is known
  useEffect(() => {
    const t = setTimeout(() => AOS.refreshHard(), 60);
    return () => clearTimeout(t);
  }, [isDesktop]);

  // ==========================================
  // GSAP SCROLL ANIMATION
  // ==========================================

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const timeline = timelineRef.current;
      const line = lineRef.current;
      const progress = progressRef.current;
      const traveler = travelerRef.current;

      if (!timeline || !line || !progress || !traveler) return;

      const checkpoints = checkpointRefs.current.filter(Boolean);

      if (checkpoints.length !== steps.length) return;

      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        let positions = [];
        let startY = 0;
        let distance = 0;

        // Parallax background orbs (depth)
        gsap.utils.toArray(".orb").forEach((orb, i) => {
          gsap.to(orb, {
            y: i % 2 === 0 ? -220 : 180,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          });
        });

        // Big decorative numbers drift at a different speed (parallax depth)
        gsap.utils.toArray(".deco-number").forEach((num) => {
          gsap.fromTo(
            num,
            { yPercent: 18 },
            {
              yPercent: -18,
              ease: "none",
              scrollTrigger: {
                trigger: num,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        });

        const measure = () => {
          const timelineRect = timeline.getBoundingClientRect();

          positions = checkpoints.map((checkpoint) => {
            const rect = checkpoint.getBoundingClientRect();

            return rect.top + rect.height / 2 - timelineRect.top;
          });

          startY = positions[0];

          distance = positions[positions.length - 1] - startY;

          gsap.set(line, {
            top: startY,
            height: distance,
          });

          gsap.set(progress, {
            scaleY: 0,
            transformOrigin: "top center",
          });

          gsap.set(traveler, {
            y: startY,
          });
        };

        const update = (scrollProgress) => {
          const currentY = startY + distance * scrollProgress;

          gsap.set(progress, {
            scaleY: scrollProgress,
          });

          gsap.set(traveler, {
            y: currentY,
          });

          let currentIndex = 0;

          positions.forEach((position, index) => {
            if (currentY >= position - 1) {
              currentIndex = index;
            }
          });

          if (activeRef.current !== currentIndex) {
            activeRef.current = currentIndex;
            setActiveStep(currentIndex);
          }
        };

        measure();

        const trigger = ScrollTrigger.create({
          trigger: timeline,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 0.8,
          invalidateOnRefresh: true,

          onRefresh: (self) => {
            measure();
            update(self.progress);
          },

          onUpdate: (self) => {
            update(self.progress);
          },
        });

        update(trigger.progress);

        return () => {
          trigger.kill();
        };
      });

      // Accessibility: no scroll animation
      mm.add("(prefers-reduced-motion: reduce)", () => {
        const timelineRect = timeline.getBoundingClientRect();

        const positions = checkpoints.map((checkpoint) => {
          const rect = checkpoint.getBoundingClientRect();

          return rect.top + rect.height / 2 - timelineRect.top;
        });

        gsap.set(line, {
          top: positions[0],
          height: positions[positions.length - 1] - positions[0],
        });

        gsap.set(progress, {
          scaleY: 1,
          transformOrigin: "top center",
        });

        gsap.set(traveler, {
          y: positions[positions.length - 1],
        });

        activeRef.current = steps.length - 1;
        setActiveStep(steps.length - 1);
      });

      return () => mm.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ==========================================
  // ICON CHANGE: 3D COIN FLIP
  // ==========================================

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const icon = travelerIconRef.current;

    if (!icon) return;

    gsap.fromTo(
      icon,
      {
        scale: 0.55,
        rotationY: -180,
        transformPerspective: 600,
        opacity: 0.3,
      },
      {
        scale: 1,
        rotationY: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.8)",
        overwrite: true,
      },
    );
  }, [activeStep]);

  return (
    <section
      ref={sectionRef}
      id="how"
      aria-labelledby="process-title"
      className="relative isolate overflow-hidden bg-[#f8fbff] px-5 py-12 sm:px-8 lg:py-26"
    >
      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_35%,#ffffff_0%,#f1f7ff_60%,#e7f1fc_100%)]"
      />

      {/* PARALLAX DEPTH ORBS */}
      <div
        aria-hidden="true"
        className="orb pointer-events-none absolute top-[20%] -right-60 -z-10 size-[600px] rounded-full bg-[#c4e3ff]/30 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="orb pointer-events-none absolute top-[55%] -left-52 -z-10 size-[480px] rounded-full bg-[#b9d6ff]/30 blur-[110px]"
      />
      <div
        aria-hidden="true"
        className="orb pointer-events-none absolute top-[5%] left-[18%] -z-10 size-[260px] rounded-full bg-[#dbeeff]/60 blur-[90px]"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ==========================================
            SECTION HEADING
        ========================================== */}

        <header className="mx-auto mb-20 max-w-[850px] text-center lg:mb-28">
          <h2
            id="process-title"
            data-aos="zoom-out-up"
            className="font-heading text-primary text-[clamp(40px,5.5vw,76px)] leading-[1.06] font-semibold tracking-[-0.055em]"
          >
            Every Order.
            <br />
            <span className="text-[#5794d1]">Every Step.</span>
          </h2>

          <p
            data-aos="fade-up"
            data-aos-delay="150"
            className="mx-auto mt-6 max-w-xl font-sans text-base leading-[1.8] text-[#64748b] sm:text-lg"
          >
            Follow the journey of your research order, from confirmation to
            shipment tracking.
          </p>

          <div
            data-aos="fade-up"
            data-aos-delay="300"
            className="text-primary/60 mt-8 flex items-center justify-center gap-2 text-sm font-medium"
          >
            <span>Scroll to explore</span>

            <ArrowDown size={16} className="motion-safe:animate-bounce" />
          </div>
        </header>

        {/* ==========================================
            VERTICAL INTERACTIVE TIMELINE
        ========================================== */}

        <div ref={timelineRef} className="relative mx-auto max-w-[1050px]">
          {/* TIMELINE TRACK */}
          <div
            ref={lineRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-[36px] z-0 w-[3px] -translate-x-1/2 rounded-full bg-[#dce8f5] md:left-1/2"
          >
            <div
              ref={progressRef}
              className="from-primary h-full w-full origin-top rounded-full bg-gradient-to-b via-[#397fce] to-[#7cc5ff] shadow-[0_0_18px_rgba(57,127,206,0.35)]"
            />
          </div>

          {/* MOVING ICON */}
          <div
            ref={travelerRef}
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-[36px] z-30 will-change-transform md:left-1/2"
          >
            <div className="bg-primary relative flex size-[76px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[5px] border-white text-white shadow-[0_12px_40px_rgba(11,27,63,0.28)] sm:size-[86px]">
              {/* PULSING RINGS */}
              <div className="border-primary/15 pointer-events-none absolute -inset-3 rounded-full border" />
              <div className="pointer-events-none absolute -inset-3 rounded-full border border-[#397fce]/30 motion-safe:animate-ping" />

              {/* ANIMATED ICON */}
              <div
                ref={travelerIconRef}
                className="grid size-12 place-items-center"
              >
                <ActiveIcon
                  size={31}
                  strokeWidth={1.5}
                  className="sm:size-[35px]"
                />
              </div>

              <span className="bg-primary absolute -bottom-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 rounded-[2px]" />
            </div>
          </div>

          {/* TIMELINE STEPS */}
          <ol className="relative [perspective:1600px]">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;

              const isActive = activeStep === index;
              const isCompleted = activeStep > index;
              const isReached = activeStep >= index;

              // Desktop: cards flip in from their own side. Mobile: simple rise.
              const aosType = isDesktop
                ? isLeft
                  ? "flip-right"
                  : "flip-left"
                : "fade-up";

              return (
                <li
                  key={step.number}
                  className="relative grid min-h-[240px] grid-cols-1 items-center py-8 pr-1 pl-[100px] sm:pl-[120px] md:min-h-[270px] md:grid-cols-[1fr_112px_1fr] md:py-10 md:pr-0 md:pl-0"
                >
                  {/* FIXED CHECKPOINT NODE */}
                  <span
                    ref={(el) => {
                      checkpointRefs.current[index] = el;
                    }}
                    aria-hidden="true"
                    className={`absolute top-1/2 left-[36px] z-10 grid size-[22px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-[3px] border-white transition-[background-color,box-shadow,transform] duration-500 md:left-1/2 ${
                      isCompleted
                        ? "bg-[#397fce] shadow-[0_0_0_5px_rgba(57,127,206,0.12)]"
                        : isActive
                          ? "bg-primary scale-125 shadow-[0_0_0_8px_rgba(57,127,206,0.18)]"
                          : "bg-[#cbd9e9]"
                    } `}
                  >
                    {isCompleted && (
                      <Check size={12} strokeWidth={3} className="text-white" />
                    )}
                  </span>

                  {/* AOS WRAPPER (owns the entrance transform) */}
                  <div
                    data-aos={aosType}
                    data-aos-anchor-placement="top-center"
                    className={`min-w-0 ${
                      isLeft ? "md:col-start-1" : "md:col-start-3"
                    }`}
                  >
                    {/* STATE WRAPPER (reached / active) */}
                    <article
                      className={`relative min-w-0 transition-[opacity,translate,scale] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isReached
                          ? "translate-y-0 opacity-100"
                          : "translate-y-3 opacity-55"
                      } ${isActive ? "scale-[1.03]" : "scale-100"} ${
                        isLeft ? "md:mr-6 lg:mr-10" : "md:ml-6 lg:ml-10"
                      }`}
                    >
                      <TiltCard
                        active={isActive}
                        className={`p-6 sm:p-8 ${isLeft ? "md:text-right" : ""}`}
                      >
                        {/* EYEBROW */}
                        <div
                          className={`relative mb-4 flex [transform:translateZ(30px)] items-center gap-2 ${
                            isLeft ? "md:justify-end" : ""
                          }`}
                        >
                          <span
                            className={`size-2 rounded-full ${
                              isReached ? "bg-[#397fce]" : "bg-slate-300"
                            }`}
                          />

                          <span className="font-sans text-[11px] font-bold tracking-[0.17em] text-[#477eae] uppercase">
                            {step.eyebrow}
                          </span>
                        </div>

                        {/* TITLE */}
                        <h3
                          className={`font-heading relative [transform:translateZ(55px)] text-[clamp(27px,3vw,41px)] leading-[1.12] font-semibold tracking-[-0.045em] transition-colors duration-500 ${
                            isActive ? "text-[#367bce]" : "text-primary"
                          }`}
                        >
                          {step.title}
                        </h3>

                        {/* DESCRIPTION */}
                        <p className="relative mt-4 max-w-[380px] [transform:translateZ(28px)] font-sans text-[15px] leading-[1.8] text-[#64748b] sm:text-[16px] md:ml-auto">
                          {step.description}
                        </p>

                        {/* CURRENT STEP INDICATOR */}
                        <div
                          className={`relative mt-5 inline-flex [transform:translateZ(65px)] items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition-all duration-500 ${
                            isActive
                              ? "text-primary translate-y-0 border-[#c5dff8] bg-[#eaf5ff] opacity-100 shadow-[0_8px_20px_-6px_rgba(57,127,206,0.4)]"
                              : "translate-y-2 border-transparent opacity-0"
                          }`}
                        >
                          <span className="size-1.5 rounded-full bg-[#397fce] motion-safe:animate-pulse" />
                          Current Step
                        </div>
                      </TiltCard>
                    </article>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* ==========================================
            BOTTOM CTA
        ========================================== */}

        <footer
          data-aos="fade-up"
          data-aos-offset="40"
          className="mx-auto mt-20 max-w-[850px] border-t border-[#d9e5f2] pt-10 text-center"
        >
          <div
            data-aos="zoom-in"
            data-aos-delay="100"
            className="text-primary mx-auto mb-5 grid size-14 place-items-center rounded-full bg-[#e5f0fc]"
          >
            <PackageCheck size={26} strokeWidth={1.5} />
          </div>

          <h3
            data-aos="fade-up"
            data-aos-delay="200"
            className="font-heading text-primary text-[30px] font-semibold tracking-tight sm:text-[38px]"
          >
            Clear From Start to Finish.
          </h3>

          <p
            data-aos="fade-up"
            data-aos-delay="300"
            className="mx-auto mt-3 max-w-lg font-sans text-[15px] leading-[1.8] text-[#64748b]"
          >
            A straightforward process designed to keep your research orders
            organized and transparent.
          </p>

          <div data-aos="fade-up" data-aos-delay="400">
            <Link
              href="#faq"
              className="group text-primary mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold transition-colors hover:text-[#367bce]"
            >
              Have Questions?
              <ArrowUpRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </footer>
      </div>
    </section>
  );
}
