"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";

import { getProducts } from "@/data/products";

const carouselProducts = getProducts().slice(0, 4);

const AUTO_DELAY = 3500;
const SLIDE_DURATION = 850;

const getVariant = (product) =>
  product.variants?.[product.defaultVariant] || product.variants?.[0] || null;

export default function ProductOrbit() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const touchStartRef = useRef(null);
  const timerRef = useRef(null);
  const resetFrameRef = useRef(null);
  const lockedRef = useRef(false);

  const count = carouselProducts.length;

  // Three copies allow seamless movement in both directions.
  const slides = [
    ...carouselProducts,
    ...carouselProducts,
    ...carouselProducts,
  ];

  const [currentIndex, setCurrentIndex] = useState(count);
  const [animate, setAnimate] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [perView, setPerView] = useState(4);

  const normalizedIndex = (((currentIndex - count) % count) + count) % count;

  // ------------------------------------
  // Responsive slide count
  // ------------------------------------
  useEffect(() => {
    const tablet = window.matchMedia("(max-width: 1023px)");
    const mobile = window.matchMedia("(max-width: 639px)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () => {
      setPerView(mobile.matches ? 1 : tablet.matches ? 2 : 4);
      setReducedMotion(motion.matches);
    };

    update();

    tablet.addEventListener("change", update);
    mobile.addEventListener("change", update);
    motion.addEventListener("change", update);

    return () => {
      tablet.removeEventListener("change", update);
      mobile.removeEventListener("change", update);
      motion.removeEventListener("change", update);
    };
  }, []);

  // ------------------------------------
  // Observe section visibility
  // ------------------------------------
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.15 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    const handleVisibility = () => {
      setPageVisible(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // ------------------------------------
  // Slide navigation
  // ------------------------------------
  const move = (direction) => {
    if (lockedRef.current || count < 2) return;

    lockedRef.current = true;
    setAnimate(true);

    if (reducedMotion) {
      setCurrentIndex((index) => {
        const next = (((index - count + direction) % count) + count) % count;
        return count + next;
      });
      lockedRef.current = false;
      return;
    }

    setCurrentIndex((index) => index + direction);
  };

  const nextSlide = () => move(1);
  const previousSlide = () => move(-1);

  // ------------------------------------
  // Seamless loop reset
  // ------------------------------------
  const handleTransitionEnd = (event) => {
    if (
      event.target !== trackRef.current ||
      event.propertyName !== "transform"
    ) {
      return;
    }

    lockedRef.current = false;

    if (currentIndex < count || currentIndex >= count * 2) {
      const correctedIndex =
        count + ((((currentIndex - count) % count) + count) % count);

      setAnimate(false);
      setCurrentIndex(correctedIndex);

      resetFrameRef.current = requestAnimationFrame(() => {
        resetFrameRef.current = requestAnimationFrame(() => {
          setAnimate(true);
        });
      });
    }
  };

  // ------------------------------------
  // Autoplay
  // ------------------------------------
  useEffect(() => {
    if (
      !playing ||
      hovering ||
      focused ||
      !visible ||
      !pageVisible ||
      reducedMotion ||
      count < 2
    ) {
      return;
    }

    timerRef.current = window.setInterval(() => {
      move(1);
    }, AUTO_DELAY);

    return () => {
      window.clearInterval(timerRef.current);
    };
  }, [playing, hovering, focused, visible, pageVisible, reducedMotion, count]);

  // ------------------------------------
  // Scroll entrance animation
  // ------------------------------------
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            once: true,
          },
        });

        tl.fromTo(
          "[data-orbit-header]",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        ).fromTo(
          "[data-orbit-showcase]",
          { opacity: 0, y: 40, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: "power3.out" },
          "-=0.5",
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ------------------------------------
  // Swipe controls
  // ------------------------------------
  const handleTouchStart = (event) => {
    touchStartRef.current = event.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (event) => {
    if (touchStartRef.current === null) return;
    const endX = event.changedTouches[0]?.clientX;
    if (endX === undefined) return;
    const difference = touchStartRef.current - endX;
    if (Math.abs(difference) > 45) {
      move(difference > 0 ? 1 : -1);
    }
    touchStartRef.current = null;
  };

  useEffect(() => {
    return () => {
      window.clearInterval(timerRef.current);
      if (resetFrameRef.current) {
        cancelAnimationFrame(resetFrameRef.current);
      }
    };
  }, []);

  if (!count) return null;

  return (
    <section
      ref={sectionRef}
      id="product-orbit"
      aria-labelledby="product-orbit-title"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false);
        }
      }}
      // Changed to min-h-[100svh] so it doesn't cut off on short screens
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#f2f7fd] px-4 py-16 sm:px-8 lg:py-20"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_50%_55%,#ffffff_0%,#f1f7ff_55%,#e4effb_100%)]"
      />

      {/* REDUCED TO max-w-7xl */}
      <div className="relative mx-auto w-full max-w-7xl">
        {/* HEADER */}
        <header
          data-orbit-header
          className="relative z-20 mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-[550px]">
            <span className="mb-3 inline-flex items-center gap-2 text-[11px] font-bold tracking-[0.17em] text-[#397fce] uppercase">
              <span className="size-2 rounded-full bg-[#397fce]" />
              Our Research Collection
            </span>

            <h2
              id="product-orbit-title"
              className="font-heading text-primary text-[clamp(32px,4vw,52px)] leading-[1.05] font-semibold tracking-[-0.05em]"
            >
              Made for <br />
              <span className="text-[#397fce]">Curious Minds.</span>
            </h2>
          </div>

          {/* CONTROLS */}
          <nav
            aria-label="Product carousel controls"
            className="flex items-center gap-2"
          >
            <button
              type="button"
              onClick={previousSlide}
              aria-label="Previous product"
              className="text-primary hover:border-primary hover:bg-primary grid size-10 place-items-center rounded-full border border-[#cbdff1] bg-white transition-all duration-300 hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next product"
              className="bg-primary grid size-10 place-items-center rounded-full text-white transition-colors duration-300 hover:bg-[#234b8c]"
            >
              <ChevronRight size={18} />
            </button>

            <button
              type="button"
              onClick={() => setPlaying((current) => !current)}
              aria-label={playing ? "Pause" : "Play"}
              className="text-primary hover:border-primary grid size-10 place-items-center rounded-full border border-[#cbdff1] bg-white transition-all duration-300"
            >
              {playing ? (
                <Pause size={14} fill="currentColor" />
              ) : (
                <Play size={14} fill="currentColor" />
              )}
            </button>
          </nav>
        </header>

        {/* PRODUCT SHOWCASE */}
        <div data-orbit-showcase className="relative w-full">
          <div
            className="relative z-10 w-full overflow-hidden py-4"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* MOVING TRACK */}
            <div
              ref={trackRef}
              onTransitionEnd={handleTransitionEnd}
              className="flex items-center"
              style={{
                transform: `translate3d(-${currentIndex * (100 / perView)}%, 0, 0)`,
                transition:
                  animate && !reducedMotion
                    ? `transform ${SLIDE_DURATION}ms cubic-bezier(0.22, 1, 0.36, 1)`
                    : "none",
                willChange: "transform",
              }}
            >
              {slides.map((product, index) => {
                const variant = getVariant(product);

                return (
                  <article
                    key={`${product.id}-${index}`}
                    className="relative min-w-0 shrink-0 px-2 sm:px-4"
                    style={{ flexBasis: `${100 / perView}%` }}
                  >
                    {/* IMAGE CONTAINER - REDUCED HEIGHT */}
                    <div className="relative flex h-[220px] items-center justify-center sm:h-[280px] lg:h-[320px]">
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute top-[45%] left-1/2 h-[50%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b4d7f8]/20 blur-[30px]"
                      />

                      {/* BOTTLE CURVE LOGIC */}
                      <div className="relative z-10 h-full w-full max-w-[180px] sm:max-w-[200px]">
                        <div
                          className={`relative h-full w-full origin-bottom ${
                            reducedMotion
                              ? ""
                              : "animate-[curvedFloat_4s_ease-in-out_infinite]"
                          }`}
                          style={{
                            transform: `rotate(${(index - (currentIndex + perView / 2 - 0.5)) * 5}deg) translateY(${Math.abs(index - (currentIndex + perView / 2 - 0.5)) * 8}px)`,
                            animationDelay: `${(index % count) * -0.7}s`,
                          }}
                        >
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            draggable={false}
                            sizes="(max-width: 639px) 180px, 200px"
                            className="object-contain drop-shadow-[4px_15px_15px_rgba(20,58,103,0.2)]"
                          />
                        </div>
                      </div>

                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute bottom-[4px] left-1/2 h-[12px] w-[35%] -translate-x-1/2 rounded-full bg-[#244f7f]/20 blur-[10px] transition-all duration-500"
                        style={{
                          transform: `translateX(-50%) scale(${1 - Math.abs(index - (currentIndex + perView / 2 - 0.5)) * 0.1})`,
                        }}
                      />
                    </div>

                    {/* PRODUCT INFO */}
                    <div className="relative z-20 mt-4 text-center">
                      <span className="block font-sans text-[11px] font-semibold text-[#397fce]">
                        {variant?.label || "Research Compound"}
                      </span>

                      <div className="mt-1 flex items-center justify-center gap-2">
                        <h3 className="font-heading text-primary text-[18px] leading-tight font-semibold tracking-[-0.03em]">
                          {product.name}
                        </h3>

                        <Link
                          href={`/products/${product.slug}`}
                          className="group hover:bg-primary grid size-7 shrink-0 place-items-center rounded-full bg-[#4a9fdf] text-white transition-all duration-300"
                        >
                          <ArrowUpRight
                            size={14}
                            className="transition-transform duration-300 group-hover:rotate-45"
                          />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM DOTS ONLY (CTA Removed) */}
        <div className="mt-8 flex items-center justify-center gap-2">
          {carouselProducts.map((product, index) => (
            <button
              key={product.id}
              type="button"
              onClick={() => {
                if (lockedRef.current) return;
                lockedRef.current = true;
                setAnimate(true);
                setCurrentIndex(count + index);
              }}
              aria-label={`Go to ${product.name}`}
              className="flex min-h-8 min-w-6 items-center justify-center"
            >
              <span
                className={`block h-[4px] rounded-full transition-all duration-500 ${
                  normalizedIndex === index
                    ? "bg-primary w-8"
                    : "w-2.5 bg-[#b8cfe6] hover:bg-[#397fce]"
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes curvedFloat {
          0%,
          100% {
            margin-top: 0px;
          }
          50% {
            margin-top: -12px;
          }
        }
      `}</style>
    </section>
  );
}
