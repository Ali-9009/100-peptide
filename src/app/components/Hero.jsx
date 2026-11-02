"use client";

import { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

import { ShieldCheck, Sparkles } from "lucide-react";

import Button from "./Button";

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

export default function Hero() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 20,
    });

    AOS.refresh();
  }, []);

  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate min-h-svh overflow-hidden bg-sky-100 text-slate-900"
    >
      {/* PREMIUM BLUE GRADIENT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(115deg,#e0f2fe_0%,#c7e9fc_42%,#a5dcf8_75%,#7dd3fc_100%)]"
      />

      {/* AMBIENT LIGHTS */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[35%] right-[-15%] -z-10 h-[850px] w-[850px] rounded-full bg-white/50 blur-[130px]"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-45%] left-[20%] -z-10 h-[700px] w-[700px] rounded-full bg-sky-100/40 blur-[120px]"
      />

      {/* MAIN HERO */}
      <div className="relative mx-auto flex min-h-svh w-full max-w-7xl flex-col px-5 pt-36 pb-8 sm:px-8 sm:pt-40 lg:px-12 lg:pt-32 lg:pb-14 xl:px-16">
        {/* HEADING */}
        <div data-aos="fade-down" className="relative z-10 w-full">
          <h1
            id="hero-title"
            className="font-heading text-center text-[clamp(43px,8.5vw,138px)] leading-[0.95] font-semibold tracking-[-0.045em] text-white lg:whitespace-nowrap"
          >
            Precision Peptides.
          </h1>
        </div>

        {/* DESKTOP PRODUCT IMAGE */}
        <div className="pointer-events-none absolute left-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:top-[70%] lg:block lg:h-[550px] lg:w-[550px] xl:top-[68%] xl:h-[620px] xl:w-[620px]">
          <div
            data-aos="zoom-in-up"
            data-aos-delay="200"
            data-aos-duration="1100"
            className="relative h-full w-full"
          >
            <Image
              src="/assets/bpc-157.png"
              alt="100 Peptides BPC-157 research product"
              fill
              priority
              sizes="(min-width: 1280px) 620px, 550px"
              className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.2)]"
            />
          </div>
        </div>

        {/* MOBILE / TABLET PRODUCT IMAGE */}
        <div className="pointer-events-none relative z-20 mx-auto mt-4 h-[300px] w-[300px] sm:mt-5 sm:h-[420px] sm:w-[420px] lg:hidden">
          <div
            data-aos="zoom-in-up"
            data-aos-delay="200"
            className="relative h-full w-full"
          >
            <Image
              src="/assets/bpc-157.png"
              alt="100 Peptides BPC-157 research product"
              fill
              priority
              sizes="(max-width: 639px) 300px, 420px"
              className="object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.18)]"
            />
          </div>
        </div>

        {/* BOTTOM CONTENT */}
        <div className="relative z-30 mt-auto flex w-full flex-col items-start justify-between gap-8 pt-6 sm:flex-row sm:items-end lg:pt-0">
          {/* BOTTOM LEFT DESCRIPTION */}
          <div
            data-aos="fade-up"
            data-aos-delay="350"
            className="max-w-[390px]"
          >
            <span className="text-primary mb-4 inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.16em] uppercase">
              <Sparkles size={16} />
              Research Excellence
            </span>

            <p className="text-text max-w-[390px] font-sans text-[16px] leading-[1.65] font-medium sm:text-[18px] lg:text-[20px]">
              Premium research peptides developed with precision, consistency,
              and a commitment to quality.
            </p>

            <div className="mt-6">
              <Button href="#shop" variant="primary">
                Shop the Catalog
              </Button>
            </div>
          </div>

          {/* BOTTOM RIGHT SOCIAL PROOF */}
          <div data-aos="fade-up" data-aos-delay="500" className="shrink-0">
            <div className="flex items-center gap-3 rounded-2xl border border-white/70 bg-white px-4 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.12)] sm:gap-4 sm:px-5 sm:py-4">
              {/* RESEARCHER IMAGES */}
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

              {/* SOCIAL PROOF TEXT */}
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading text-primary text-[23px] leading-none font-bold sm:text-[25px]">
                    10.2K+
                  </span>

                  <ShieldCheck size={19} className="text-[#2a5cff]" />
                </div>

                <p className="mt-1 text-[11px] font-medium text-[#667085] sm:text-[12px]">
                  Researchers worldwide
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
