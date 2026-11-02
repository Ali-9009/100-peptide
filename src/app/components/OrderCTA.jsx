"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import {
  ArrowUpRight,
  ArrowRight,
  FlaskConical,
  ShieldCheck,
  PackageCheck,
  Sparkles,
  MoveUpRight,
} from "lucide-react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Button from "./Button";
import Image from "next/image";

export default function OrderCTA() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const visualRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const content = contentRef.current;
    const visual = visualRef.current;

    if (!section || !content || !visual) return;

    const leftBottle = visual.querySelector('[data-product="left"]');
    const rightBottle = visual.querySelector('[data-product="right"]');
    const floorBottle = visual.querySelector('[data-product="floor"]');

    if (!leftBottle || !rightBottle || !floorBottle) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // =====================================
        // 1. SECTION ENTRANCE
        // =====================================

        gsap.fromTo(
          section,
          {
            opacity: 0,
            y: 60,
            scale: 0.97,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              once: true,
            },
          },
        );

        // =====================================
        // 2. CONTENT ENTRANCE
        // =====================================

        gsap.fromTo(
          content.children,
          {
            y: 35,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              once: true,
            },
          },
        );

        // =====================================
        // 3. PRODUCT ENTRANCE
        // =====================================

        const entrance = gsap.timeline({
          paused: true,
          defaults: {
            ease: "power3.out",
          },
          onComplete: () => {
            floating.play();
          },
        });

        entrance
          .fromTo(
            leftBottle,
            {
              y: 120,
              x: -45,
              rotation: -25,
              opacity: 0,
            },
            {
              y: 0,
              x: 0,
              rotation: -10,
              opacity: 1,
              duration: 1.1,
            },
          )
          .fromTo(
            rightBottle,
            {
              y: 140,
              x: 50,
              rotation: 25,
              opacity: 0,
            },
            {
              y: 0,
              x: 0,
              rotation: 10,
              opacity: 1,
              duration: 1.1,
            },
            "-=0.85",
          )
          .fromTo(
            floorBottle,
            {
              x: 200,
              y: 65,
              rotation: -115,
              opacity: 0,
            },
            {
              x: 0,
              y: 0,
              rotation: -80,
              opacity: 1,
              duration: 1.2,
              ease: "power4.out",
            },
            "-=0.7",
          );

        // =====================================
        // 4. CONTINUOUS FLOATING ANIMATIONS
        // =====================================

        const floating = gsap.timeline({
          paused: true,
          repeat: -1,
          yoyo: true,
        });

        floating
          .to(
            leftBottle,
            {
              y: -12,
              rotation: -12,
              duration: 3.2,
              ease: "sine.inOut",
            },
            0,
          )
          .to(
            rightBottle,
            {
              y: 10,
              rotation: 12,
              duration: 3.8,
              ease: "sine.inOut",
            },
            0,
          )
          .to(
            floorBottle,
            {
              y: -7,
              rotation: -83,
              duration: 3.5,
              ease: "sine.inOut",
            },
            0,
          );

        // =====================================
        // 5. SCROLL VISIBILITY CONTROL
        // =====================================

        const visibilityTrigger = ScrollTrigger.create({
          trigger: visual,
          start: "top bottom",
          end: "bottom top",

          onEnter: () => {
            if (entrance.progress() === 0) {
              entrance.play();
            } else if (entrance.progress() === 1) {
              floating.play();
            }
          },

          onEnterBack: () => {
            if (entrance.progress() === 1) {
              floating.play();
            }
          },

          onLeave: () => floating.pause(),
          onLeaveBack: () => floating.pause(),
        });

        // =====================================
        // 6. MOUSE PARALLAX
        // =====================================

        const moveLeft = gsap.quickTo(leftBottle, "x", {
          duration: 0.8,
          ease: "power3.out",
        });

        const moveRight = gsap.quickTo(rightBottle, "x", {
          duration: 0.8,
          ease: "power3.out",
        });

        const moveFloor = gsap.quickTo(floorBottle, "x", {
          duration: 0.8,
          ease: "power3.out",
        });

        const handleMouseMove = (event) => {
          if (event.pointerType && event.pointerType !== "mouse") {
            return;
          }

          const rect = visual.getBoundingClientRect();

          const x = (event.clientX - rect.left) / rect.width - 0.5;

          moveLeft(x * 18);
          moveRight(x * -22);
          moveFloor(x * 12);
        };

        const handleMouseLeave = () => {
          moveLeft(0);
          moveRight(0);
          moveFloor(0);
        };

        // Mouse interaction only on hover-capable devices
        const hoverMedia = window.matchMedia(
          "(hover: hover) and (pointer: fine)",
        );

        if (hoverMedia.matches) {
          visual.addEventListener("pointermove", handleMouseMove);
          visual.addEventListener("pointerleave", handleMouseLeave);
        }

        // Cleanup
        return () => {
          visibilityTrigger.kill();

          entrance.kill();
          floating.kill();

          visual.removeEventListener("pointermove", handleMouseMove);

          visual.removeEventListener("pointerleave", handleMouseLeave);
        };
      });

      // =====================================
      // REDUCED MOTION
      // =====================================

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set([leftBottle, rightBottle, floorBottle], {
          opacity: 1,
          x: 0,
          y: 0,
        });
      });

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="order-cta"
      aria-labelledby="order-cta-title"
      className="relative bg-[#f8fbff] px-4 py-20 sm:px-8 lg:py-28"
    >
      <div className="mx-auto max-w-[1320px]">
        {/* MAIN CTA */}
        <div
          ref={sectionRef}
          className="bg-primary relative isolate overflow-hidden rounded-[28px] px-6 py-14 text-white sm:rounded-[36px] sm:px-10 sm:py-16 lg:min-h-[540px] lg:rounded-[44px] lg:px-16 lg:py-20"
        >
          {/* PREMIUM GRADIENT */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(120deg,#07152f_0%,#102c65_55%,#245ab6_100%)]"
          />

          {/* AMBIENT LIGHT */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-[200px] -right-[150px] -z-10 size-[650px] rounded-full bg-[#5b9bff]/25 blur-[110px]"
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-[300px] left-[10%] -z-10 size-[600px] rounded-full bg-[#2f70ce]/20 blur-[110px]"
          />

          {/* DECORATIVE GRID */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 [background-image:linear-gradient(rgba(255,255,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.3)_1px,transparent_1px)] [background-size:48px_48px] opacity-[0.08]"
          />

          {/* TOP LABEL */}
          <div className="relative mb-12 flex items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[11px] font-semibold tracking-[0.16em] text-[#c8dcff] uppercase backdrop-blur-md">
              <Sparkles size={15} />
              The Next Step
            </span>

            <span className="hidden items-center gap-2 text-[12px] font-medium text-white/50 sm:inline-flex">
              100 Peptides
              <ArrowUpRight size={16} />
            </span>
          </div>

          {/* MAIN CONTENT */}
          <div className="relative grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
            {/* LEFT CONTENT */}
            <div ref={contentRef} className="relative z-20">
              <h2
                id="order-cta-title"
                className="font-heading max-w-[760px] text-[clamp(42px,5.6vw,78px)] leading-[1.04] font-semibold tracking-[-0.06em]"
              >
                Precision at
                <br />
                Every Step.
                <br />
                <span className="text-[#91beff]">
                  Confidence in
                  <br />
                  Every Order.
                </span>
              </h2>

              <p className="mt-7 max-w-[500px] font-sans text-[16px] leading-[1.8] text-white/70 sm:text-[18px]">
                Explore our collection of research peptides and find the
                products that match your laboratory research needs.
              </p>

              {/* CTA BUTTONS */}
              <div className="mt-9 flex flex-wrap items-center gap-4">
                {/* WHITE PRIMARY BUTTON */}
                <Link
                  href="#shop"
                  className="group text-primary relative inline-flex min-h-[56px] items-center justify-center gap-4 overflow-hidden rounded-full bg-white px-6 py-3 font-sans text-[14px] font-semibold transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.2)]"
                >
                  <span className="absolute inset-0 translate-y-full rounded-t-[50%] bg-[#dcecff] transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:rounded-none" />

                  <span className="relative z-10">Explore Peptides</span>

                  <span className="bg-primary relative z-10 grid size-8 place-items-center rounded-full text-white transition-transform duration-500 group-hover:-rotate-45">
                    <ArrowRight size={17} strokeWidth={2} />
                  </span>
                </Link>

                {/* SECONDARY LINK */}
                <Link
                  href="#faq"
                  className="group inline-flex min-h-[52px] items-center gap-2 border-b border-white/30 px-2 font-sans text-[14px] font-semibold text-white transition-colors duration-300 hover:border-white"
                >
                  Have Questions?
                  <ArrowUpRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </Link>
              </div>
            </div>

            {/* RIGHT SCIENTIFIC VISUAL */}
            {/* PREMIUM THREE-PRODUCT SHOWCASE */}
            <div
              ref={visualRef}
              className="relative mx-auto h-[340px] w-full max-w-[520px] sm:h-[440px] lg:h-[500px]"
            >
              {/* BACKGROUND LIGHT */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-[12%] left-1/2 h-[75%] w-[85%] -translate-x-1/2 rounded-full bg-[#73b6ff]/15 blur-[65px]"
              />

              {/* FLOOR SHADOW */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[10%] bottom-[12%] left-[10%] h-[35px] rounded-[50%] bg-[#020c24]/40 blur-[22px]"
              />

              {/* PRODUCT 1 — UPRIGHT LEFT */}
              <div
                data-product="left"
                className="absolute bottom-[19%] left-[11%] z-10 h-[68%] w-[48%] origin-bottom -rotate-[10deg] sm:left-[13%]"
              >
                <Image
                  src="/assets/bpc-157.png"
                  alt="BPC-157 research peptide vial"
                  fill
                  sizes="(max-width: 640px) 180px, 250px"
                  className="object-contain drop-shadow-[12px_24px_18px_rgba(0,0,0,0.28)]"
                />
              </div>

              {/* PRODUCT 2 — UPRIGHT RIGHT */}
              <div
                data-product="right"
                className="absolute right-[10%] bottom-[20%] z-20 h-[72%] w-[48%] origin-bottom rotate-[10deg] sm:right-[12%]"
              >
                <Image
                  src="/assets/tb-500.png"
                  alt="TB-500 research peptide vial"
                  fill
                  sizes="(max-width: 640px) 180px, 250px"
                  className="object-contain drop-shadow-[12px_24px_18px_rgba(0,0,0,0.26)]"
                />
              </div>

              {/* PRODUCT 3 — LARGE HORIZONTAL BOTTLE IN FRONT */}
              <div
                data-product="floor"
                className="absolute bottom-[8%] left-1/2 z-30 h-[52%] w-[80%] origin-center -translate-x-1/2 -rotate-[80deg] sm:bottom-[10%] sm:h-[55%] sm:w-[85%]"
              >
                <Image
                  src="/assets/ghk-cu.png"
                  alt="GHK-Cu research peptide vial lying across the collection"
                  fill
                  sizes="(max-width: 640px) 300px, 440px"
                  className="object-contain drop-shadow-[0_20px_16px_rgba(0,0,0,0.4)]"
                />
              </div>
            </div>
          </div>

          {/* BOTTOM BORDER */}
          <div className="relative mt-12 flex flex-col gap-4 border-t border-white/15 pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-16">
            <span className="text-[12px] font-medium text-white/50">
              © 100 Peptides. Research-focused products.
            </span>

            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] text-[#b4d4ff] uppercase">
              <FlaskConical size={15} />
              For Laboratory Research Use Only
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
