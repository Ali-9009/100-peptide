"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { ArrowUpRight, Sparkles } from "lucide-react";

const words = ["Research.", "Discoveries.", "Innovation."];

export default function Newsletter() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const contentRef = useRef(null);
  const wordRef = useRef(null);

  const productEntranceRef = useRef(null);
  const productFloatRef = useRef(null);

  const [activeWord, setActiveWord] = useState(0);

  // ==========================================
  // SCROLL ENTRANCE + PRODUCT FLOAT
  // ==========================================
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        });

        tl.fromTo(
          headingRef.current,
          {
            y: 65,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
          },
        )
          .fromTo(
            productEntranceRef.current,
            {
              y: 130,
              opacity: 0,
              scale: 0.7,
              rotation: -12,
            },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1.35,
              ease: "back.out(1.4)",
            },
            "-=0.65",
          )
          .fromTo(
            contentRef.current,
            {
              x: 60,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.9",
          );

        // Continuous gentle floating.
        // The rotation is on the OUTER wrapper,
        // so this animation doesn't break the tilt.
        gsap.to(productFloatRef.current, {
          y: -17,
          rotation: 3,
          duration: 3.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
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

  // ==========================================
  // ROTATING HEADING WORD
  // ==========================================
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (motionQuery.matches) return;

    let alive = true;
    let tween;

    const interval = window.setInterval(() => {
      const word = wordRef.current;

      if (!word) return;

      tween = gsap.to(word, {
        y: -25,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",

        onComplete: () => {
          if (!alive) return;

          setActiveWord((current) => (current + 1) % words.length);

          tween = gsap.fromTo(
            word,
            {
              y: 25,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power3.out",
            },
          );
        },
      });
    }, 3000);

    return () => {
      alive = false;
      window.clearInterval(interval);
      tween?.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="newsletter"
      aria-labelledby="newsletter-title"
      className="relative isolate mx-auto mb-20 max-w-7xl overflow-hidden rounded-3xl bg-[#eaf5ff] px-5 py-12 sm:px-8 md:py-16"
    >
      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_55%_50%,#ffffff_0%,#e8f4ff_55%,#cfe7ff_100%)]"
      />

      {/* LARGE AMBIENT LIGHT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#83c2ff]/15 blur-[100px]"
      />

      {/* MAIN BANNER CONTAINER */}
      <div className="relative mx-auto grid min-h-[410px] max-w-7xl grid-cols-1 items-center gap-8 lg:min-h-[470px] lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* ==================================
            LEFT — ANIMATED TEXT
        ================================== */}

        <div ref={headingRef} className="relative z-20 min-w-0">
          {/* HEADING */}
          <h2
            id="newsletter-title"
            className="font-heading text-primary text-[clamp(42px,5.4vw,76px)] leading-[1.07] font-semibold tracking-[-0.06em]"
          >
            Stay Curious.
            <br />
            Stay Ahead of
            <br />
            <span className="block overflow-hidden pb-2 text-[#397fce]">
              <span ref={wordRef} className="inline-block">
                {words[activeWord]}
              </span>
            </span>
          </h2>
        </div>

        {/* ==================================
            CENTER — FLOATING PRODUCT
            NOT A GRID COLUMN
        ================================== */}

        <div
          className="pointer-events-none relative z-10 mx-auto h-[290px] w-[270px] sm:h-[360px] sm:w-[320px] lg:absolute lg:top-1/2 lg:left-[51%] lg:h-[520px] lg:w-[390px] lg:-translate-x-1/2 lg:-translate-y-1/2 xl:left-[51%] xl:h-[570px] xl:w-[430px]"
          aria-hidden="true"
        >
          {/* SOFT PRODUCT GLOW */}
          <div className="absolute top-1/2 left-1/2 h-[65%] w-[65%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#76b8ff]/25 blur-[65px]" />

          {/* STATIC TILT WRAPPER */}
          <div className="relative h-full w-full -rotate-[18deg]">
            {/* GSAP ENTRANCE WRAPPER */}
            <div ref={productEntranceRef} className="h-full w-full">
              {/* GSAP FLOAT WRAPPER */}
              <div ref={productFloatRef} className="relative h-full w-full">
                <Image
                  src="/assets/bpc-157.png"
                  alt=""
                  fill
                  sizes="(max-width: 639px) 270px, (max-width: 1023px) 320px, 430px"
                  className="object-contain drop-shadow-[25px_35px_35px_rgba(11,27,63,0.23)]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ==================================
            RIGHT — CTA CONTENT
        ================================== */}

        <div
          ref={contentRef}
          className="relative z-20 min-w-0 lg:pl-12 xl:pl-16"
        >
          {/* DESCRIPTION */}
          <p className="max-w-[460px] font-sans text-[17px] leading-[1.9] text-[#52677e] sm:text-[19px]">
            Be the first to hear about new research products, collection
            updates, and the latest announcements from 100 Peptides.
          </p>

          {/* CTA BUTTON */}
          <Link
            href="/newsletter"
            className="group bg-primary relative mt-9 inline-flex min-h-[60px] items-center justify-between gap-9 overflow-hidden rounded-full px-6 py-3 font-sans text-[14px] font-semibold text-white shadow-[0_15px_35px_rgba(11,27,63,0.15)] transition-all duration-500 hover:shadow-[0_20px_45px_rgba(11,27,63,0.23)]"
          >
            {/* HOVER FILL */}
            <span className="absolute inset-0 translate-y-full rounded-t-[50%] bg-[#234b8c] transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:rounded-none" />

            <span className="relative z-10">Join Our Newsletter</span>

            <span className="relative z-10 grid size-9 place-items-center rounded-full bg-white/15 transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight size={19} />
            </span>
          </Link>

          {/* SMALL DETAIL */}
          <div className="mt-7 flex items-center gap-2">
            <span className="size-2 shrink-0 rounded-full bg-[#397fce]" />

            <span className="font-sans text-sm text-[#52677c]">
              Research insights. Product news. No unnecessary noise.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
