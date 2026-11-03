"use client";

import { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  FlaskConical,
  ShieldCheck,
  Truck,
  Droplets,
  Headset,
  Microscope,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

const features = [
  {
    id: "01",
    title: "Lab-Tested Every Batch",
    description:
      "Every batch is independently tested by a third-party lab, with the certificate published in our...",
    icon: FlaskConical,
  },
  {
    id: "02",
    title: "High Purity Peptides",
    description:
      "Our peptides undergo professional laboratory analysis for purity and quality.",
    icon: ShieldCheck,
  },
  {
    id: "03",
    title: "Fast EU Shipping",
    description:
      "Quick, reliable deliveries across Europe with trusted logistics partners.",
    icon: Truck,
  },
  {
    id: "04",
    title: "Free Bac Water",
    description:
      "A complimentary vial of bacteriostatic water is included with every order.",
    icon: Droplets,
  },
  {
    id: "05",
    title: "Support 08:00 – 20:00",
    description:
      "Our support team is available to help with questions and order inquiries.",
    icon: Headset,
  },
  {
    id: "06",
    title: "Research Use Only",
    description:
      "All compounds are supplied exclusively for laboratory research, not for human consumption.",
    icon: Microscope,
  },
];

const scatteredPositions = [
  {
    left: "4%",
    top: "5%",
    rotate: -9,
    zIndex: 2,
  },
  {
    left: "27%",
    top: "0%",
    rotate: 7,
    zIndex: 4,
  },
  {
    left: "53%",
    top: "4%",
    rotate: -6,
    zIndex: 3,
  },
  {
    left: "12%",
    top: "39%",
    rotate: 8,
    zIndex: 5,
  },
  {
    left: "39%",
    top: "35%",
    rotate: -9,
    zIndex: 6,
  },
  {
    left: "65%",
    top: "37%",
    rotate: 7,
    zIndex: 4,
  },
];

function ScatteredCard({ feature, index }) {
  const Icon = feature.icon;

  return (
    <article className="group/card relative flex h-full min-h-[235px] flex-col overflow-hidden rounded-[24px] border border-[#d7e6f4] bg-white p-6 shadow-[0_15px_35px_rgba(11,27,63,0.10)] transition-[box-shadow,border-color] duration-500 hover:border-[#9ac7ef] hover:shadow-[0_30px_70px_rgba(11,27,63,0.20)] sm:p-7">
      {/* ICON */}
      <div className="relative z-10 grid size-14 place-items-center rounded-2xl bg-[#edf6ff] text-[#397fce] transition-all duration-500 group-hover/card:scale-110 group-hover/card:bg-[#0b1b3f] group-hover/card:text-white">
        <Icon size={27} strokeWidth={1.6} />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 mt-5">
        <h3 className="font-heading text-[21px] leading-[1.15] font-semibold tracking-[-0.035em] text-[#0b1b3f]">
          {feature.title}
        </h3>

        <p className="mt-3 text-[13px] leading-[1.8] text-[#687e96]">
          {feature.description}
        </p>
      </div>
    </article>
  );
}

export default function WhyChooseUs() {
  useEffect(() => {
    AOS.init({
      duration: 750,
      easing: "ease-out-cubic",
      once: true,
      offset: 70,
    });

    AOS.refresh();
  }, []);

  const scatteredRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".scattered-card");

      gsap.fromTo(
        cards,
        {
          y: -160,
          x: (index) => (index % 2 === 0 ? -90 : 90),
          rotation: (index) =>
            scatteredPositions[index % scatteredPositions.length].rotate +
            (index % 2 === 0 ? -18 : 18),
          opacity: 0,
          scale: 0.75,
        },
        {
          y: 0,
          x: 0,
          rotation: (index) =>
            scatteredPositions[index % scatteredPositions.length].rotate,
          opacity: 1,
          scale: 1,
          duration: 1.3,
          stagger: 0.13,
          ease: "back.out(1.5)",
          scrollTrigger: {
            trigger: scatteredRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, scatteredRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="why"
      ref={scatteredRef}
      aria-labelledby="why-title"
      className="relative bg-[#f8fbff] px-5 py-12 sm:px-8 lg:flex lg:min-h-svh lg:items-center lg:py-10"
    >
      <div className="mx-auto w-full max-w-7xl">
        {/* SECTION HEADER */}
        <header className="relative z-10 mx-auto mb-8 max-w-[800px] text-center lg:mb-7">
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-4 py-2 text-xs font-semibold tracking-wider text-sky-700 uppercase">
            <Sparkles size={15} />
            Why Choose 100 Peptides
          </span>

          <h2
            id="why-title"
            className="font-heading text-primary text-[clamp(32px,4vw,52px)] leading-[1.05] font-semibold tracking-[-0.05em]"
          >
            Research Deserves
            <br />
            <span className="text-[#5794d1]">a Higher Standard.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[680px] text-[14px] leading-relaxed text-slate-600">
            Discover the details that make your research ordering experience
            simple, reliable, and transparent.
          </p>
        </header>

        {/* DESKTOP — COMPACT SCATTERED CARDS */}
        <div className="relative hidden h-[490px] lg:block xl:h-[530px]">
          {features.map((feature, index) => {
            const position =
              scatteredPositions[index % scatteredPositions.length];

            return (
              <div
                key={feature.id}
                className="scattered-card absolute w-[31%] cursor-default"
                style={{
                  left: position.left,
                  top: position.top,
                  zIndex: position.zIndex,
                }}
                onMouseEnter={(event) => {
                  event.currentTarget.style.zIndex = 30;

                  gsap.to(event.currentTarget, {
                    rotation: 0,
                    y: -16,
                    scale: 1.04,
                    duration: 0.45,
                    ease: "power3.out",
                    overwrite: "auto",
                  });
                }}
                onMouseLeave={(event) => {
                  event.currentTarget.style.zIndex = position.zIndex;

                  gsap.to(event.currentTarget, {
                    rotation: position.rotate,
                    y: 0,
                    scale: 1,
                    duration: 0.5,
                    ease: "power3.out",
                    overwrite: "auto",
                  });
                }}
              >
                <ScatteredCard feature={feature} index={index} />
              </div>
            );
          })}
        </div>

        {/* MOBILE / TABLET — LOOSE STACK */}
        <div className="flex flex-col items-center gap-5 lg:hidden">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className="w-full max-w-[480px]"
              style={{
                transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
              }}
            >
              <ScatteredCard feature={feature} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
