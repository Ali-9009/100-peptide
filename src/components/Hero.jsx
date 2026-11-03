"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  FlaskConical,
  Pause,
  Play,
} from "lucide-react";

import Button from "./Button";

import { getProductBySlug } from "@/data/products";

// ============================================
// SLIDER DATA
// ============================================

const slides = [
  {
    id: "bpc-157",
    eyebrow: "The Art of Precision",
    title: "Driven by Discovery.",
    description:
      "Explore our research-focused peptide collection, with clear product information and carefully selected compounds for laboratory applications.",
    image: "/assets/bpc-157.png",
    imageAlt: "BPC-157 research peptide vial",
    productName: "BPC-157",
    productLabel: "Research Peptide",
    href: `/products/${getProductBySlug("bpc-157")?.slug}`,

    gradient:
      "linear-gradient(115deg, #4F8FD9 0%, #68A5E8 40%, #86BAF0 75%, #A2CEFA 100%)",
  },
  {
    id: "tb-500",
    eyebrow: "Explore the Collection",
    title: "Research, Refined.",
    description:
      "Discover TB-500 and explore detailed product information, available strengths, and options for your laboratory research.",
    image: "/assets/tb-500.png",
    imageAlt: "TB-500 research peptide vial",
    productName: "TB-500",
    productLabel: "Laboratory Research",
    href: `/products/${getProductBySlug("tb-500")?.slug}`,

    gradient:
      "linear-gradient(115deg, #326BB5 0%, #4D89CE 40%, #71A5E2 75%, #94C0F0 100%)",
  },
  {
    id: "ghk-cu",
    eyebrow: "The Research Collection",
    title: "Discover More.",
    description:
      "Explore GHK-Cu, a copper peptide of interest in laboratory research, alongside our wider collection of research compounds.",
    image: "/assets/ghk-cu.png",
    imageAlt: "GHK-Cu copper peptide vial",
    productName: "GHK-Cu",
    productLabel: "Copper Peptide",
    href: `/products/${getProductBySlug("ghk-cu")?.slug}`,

    gradient:
      "linear-gradient(115deg, #4384C7 0%, #5D9DDF 40%, #7BB4EC 75%, #9BC9F5 100%)",
  },
];

const researchers = [
  {
    name: "Researcher 1",
    image: "/assets/profile-1.jpeg",
  },
  {
    name: "Researcher 2",
    image: "/assets/profile-2.jpeg",
  },
  {
    name: "Researcher 3",
    image: "/assets/profile-3.avif",
  },  
];

const AUTOPLAY_DELAY = 4000;

export default function Hero() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const eyebrowRef = useRef(null);
  const descriptionRef = useRef(null);
  const buttonRef = useRef(null);
  const socialRef = useRef(null);
  const desktopProductRef = useRef(null);
  const mobileProductRef = useRef(null);
  const touchStartX = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const activeSlide = slides[activeIndex];

  // Visibility and reduced-motion preferences
  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const handleMotionChange = () => {
      setReducedMotion(motionQuery.matches);
    };

    const handleVisibilityChange = () => {
      setPageVisible(!document.hidden);
    };

    handleMotionChange();
    handleVisibilityChange();

    motionQuery.addEventListener("change", handleMotionChange);

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);

      document.removeEventListener("visibilitychange", handleVisibilityChange);

      observer.disconnect();
    };
  }, []);

  // GSAP slide entrance animations
  useEffect(() => {
    if (reducedMotion) return;

    const targets = [
      headingRef.current,
      desktopProductRef.current,
      mobileProductRef.current,
      eyebrowRef.current,
      descriptionRef.current,
      buttonRef.current,
      socialRef.current,
    ];

    if (targets.some((target) => !target)) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Heading enters from above
      tl.fromTo(
        headingRef.current,
        { y: -110, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power4.out",
        },
        0,
      );

      // Products rise from below
      tl.fromTo(
        [desktopProductRef.current, mobileProductRef.current],
        {
          y: 180,
          scale: 0.65,
          opacity: 0,
          rotation: -8,
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1.35,
          ease: "back.out(1.4)",
        },
        0.15,
      );

      // Eyebrow enters from left
      tl.fromTo(
        eyebrowRef.current,
        { x: -70, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
        },
        0.35,
      );

      // Description rises
      tl.fromTo(
        descriptionRef.current,
        { y: 65, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
        },
        0.45,
      );

      // CTA pops in
      tl.fromTo(
        buttonRef.current,
        {
          y: 40,
          scale: 0.85,
          opacity: 0,
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 0.75,
          ease: "back.out(1.8)",
        },
        0.55,
      );

      // Social card enters from right
      tl.fromTo(
        socialRef.current,
        {
          x: 90,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.9,
        },
        0.55,
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [activeIndex, reducedMotion]);

  // Autoplay — no mouse-hover pause
  const shouldAutoplay = !paused && visible && pageVisible && !reducedMotion;

  useEffect(() => {
    if (!shouldAutoplay) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTOPLAY_DELAY);

    return () => window.clearTimeout(timer);
  }, [activeIndex, shouldAutoplay]);

  // Navigation
  const goToSlide = (index) => {
    setActiveIndex((index + slides.length) % slides.length);
  };

  const nextSlide = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const previousSlide = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  // Mobile swipe
  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const distance = touchStartX.current - event.changedTouches[0].clientX;

    if (Math.abs(distance) > 50) {
      if (distance > 0) {
        nextSlide();
      } else {
        previousSlide();
      }
    }

    touchStartX.current = null;
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="hero-title"
      aria-roledescription="carousel"
      aria-label="Featured research peptides"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
      onKeyDown={(event) => {
        if (event.target.closest("a, button, input")) return;

        if (event.key === "ArrowRight") {
          event.preventDefault();
          nextSlide();
        }

        if (event.key === "ArrowLeft") {
          event.preventDefault();
          previousSlide();
        }
      }}
      tabIndex={0}
      className="relative isolate min-h-svh overflow-hidden text-slate-900 outline-none"
    >
      {/* ============================================
          ANIMATED BACKGROUND GRADIENTS
      ============================================ */}

      {slides.map((slide, index) => (
        <div
          key={slide.id}
          aria-hidden="true"
          style={{ background: slide.gradient }}
          className={`pointer-events-none absolute inset-0 transition-opacity duration-[1100ms] ${
            activeIndex === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* AMBIENT LIGHT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[35%] right-[-15%] h-[850px] w-[850px] rounded-full bg-white/30 blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-45%] left-[20%] h-[700px] w-[700px] rounded-full bg-sky-100/60 blur-[120px]"
      />

      {/* ============================================
          HERO CONTAINER
      ============================================ */}

      <div className="relative mx-auto flex min-h-svh w-full max-w-7xl flex-col px-5 pt-36 pb-8 sm:px-8 sm:pt-40 lg:px-12 lg:pt-32 lg:pb-12 xl:px-16">
        {/* ============================================
            LARGE ANIMATED HEADING
        ============================================ */}

        <div ref={headingRef} className="relative z-10 w-full">
          <div className="relative">
            <h1
              id="hero-title"
              className="font-heading text-center text-[clamp(43px,8.5vw,138px)] leading-[0.95] font-semibold tracking-[-0.045em] text-white lg:whitespace-nowrap"
            >
              {activeSlide.title}
            </h1>
          </div>
        </div>

        {/* ============================================
            PRODUCT IMAGE - DESKTOP
        ============================================ */}

        <div className="icon-float pointer-events-none absolute left-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:top-[70%] lg:block lg:h-[550px] lg:w-[550px] xl:top-[68%] xl:h-[620px] xl:w-[620px]">
          <div ref={desktopProductRef} className="relative h-full w-full">
            <Image
              src={activeSlide.image}
              alt=""
              fill
              priority={activeIndex === 0}
              sizes="(min-width: 1280px) 620px, 550px"
              className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.2)]"
            />
          </div>
        </div>

        {/* ============================================
            PRODUCT IMAGE - MOBILE / TABLET
        ============================================ */}

        <div className="icon-float pointer-events-none relative z-20 mx-auto mt-4 h-[300px] w-[min(100%,300px)] sm:mt-5 sm:h-[420px] sm:w-[420px] lg:hidden">
          <div ref={mobileProductRef} className="relative h-full w-full">
            <Image
              src={activeSlide.image}
              alt=""
              fill
              priority={activeIndex === 0}
              sizes="(max-width: 639px) 300px, 420px"
              className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
            />
          </div>
        </div>

        {/* ============================================
            BOTTOM CONTENT
        ============================================ */}

        <div className="relative z-30 mt-auto flex w-full flex-col items-start justify-between gap-8 pt-6 sm:flex-row sm:items-end lg:pt-0">
          {/* LEFT CONTENT */}
          <div className="w-full max-w-[425px]">
            {/* EYEBROW */}
            <div ref={eyebrowRef} className="mb-4 flex items-center gap-2">
              <Sparkles size={17} className="text-primary shrink-0" />

              <span className="font-sans text-xs font-semibold tracking-[0.16em] text-white/70 uppercase">
                {activeSlide.eyebrow}
              </span>
            </div>

            {/* DESCRIPTION */}
            <p
              ref={descriptionRef}
              className="max-w-[425px] font-sans text-[16px] leading-[1.65] font-medium text-white sm:text-[18px] lg:text-[20px]"
            >
              {activeSlide.description}
            </p>

            {/* CTA */}
            <div
              ref={buttonRef}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <Button href={activeSlide.href} variant="primary">
                Shop the Catalog
              </Button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex w-full flex-col items-start gap-5 sm:w-auto sm:items-end">
            {/* RESEARCH COMMUNITY CARD */}
            <div
              ref={socialRef}
              className="icon-float flex items-center gap-3 rounded-2xl border border-white/70 bg-white/95 px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.12)] sm:gap-4 sm:px-5 sm:py-4"
            >
              {/* PROFILE IMAGES */}
              <div className="flex -space-x-3">
                {researchers.map((person) => (
                  <div
                    key={person.name}
                    className="relative h-10 w-10 overflow-hidden rounded-full border-[3px] border-white bg-[#edf2fa] sm:h-12 sm:w-12"
                  >
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* CARD TEXT */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading text-primary text-[20px] leading-none font-bold sm:text-[23px]">
                    Research
                  </span>

                  <ShieldCheck size={19} className="text-[#2a5cff]" />
                </div>

                <p className="mt-1 text-xs font-medium text-[#667085]">
                  Focused Collection
                </p>
              </div>
            </div>

            {/* ============================================
                SLIDER NAVIGATION
            ============================================ */}

            <div className="flex w-full items-center justify-between gap-5 sm:w-auto sm:justify-end">
              {/* ARROWS */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={previousSlide}
                  aria-label="Previous slide"
                  className="group border-primary/20 text-primary hover:border-primary hover:bg-primary grid size-12 place-items-center rounded-full border bg-white/75 transition-all duration-300 hover:text-white active:scale-95"
                >
                  <ArrowLeft
                    size={19}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:-translate-x-0.5"
                  />
                </button>

                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next slide"
                  className="group bg-primary grid size-12 place-items-center rounded-full text-white transition-all duration-300 hover:bg-[#234b8c] active:scale-95"
                >
                  <ArrowRight
                    size={19}
                    strokeWidth={1.8}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </button>

                {/* PAUSE / PLAY */}
                <button
                  type="button"
                  onClick={() => setPaused((current) => !current)}
                  aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                  className="border-primary/20 text-primary hover:border-primary grid size-12 place-items-center rounded-full border bg-white/75 transition-all duration-300 hover:bg-white"
                >
                  {paused ? (
                    <Play size={17} fill="currentColor" />
                  ) : (
                    <Pause size={17} fill="currentColor" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
