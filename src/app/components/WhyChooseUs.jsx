"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

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

  return (
    <section
      id="why"
      aria-labelledby="why-title"
      className="bg-[#f8fbff] px-5 py-12 sm:px-8 lg:py-22"
    >
      <div className="mx-auto max-w-7xl">
        {/* SECTION HEADER */}
        <header
          data-aos="fade-up"
          className="mx-auto mb-8 max-w-200 text-center"
        >
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

          <p className="mx-auto mt-5 max-w-190 font-sans text-base leading-relaxed text-slate-600">
            Discover the details that make your research ordering experience
            simple, reliable, and transparent.
          </p>
        </header>

        {/* SIMPLE GRID */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                data-aos="zoom-in-up"
                data-aos-delay={index * 110}
                data-aos-duration="850"
                data-aos-easing="ease-out-back"
                className="h-full"
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[24px] border border-[#e1ebf5] bg-white p-7 transition-[transform,border-color,box-shadow] duration-500 hover:-translate-y-2 hover:border-[#9ac7ef] hover:shadow-[0_20px_50px_rgba(11,27,63,0.09)] sm:p-8">
                  {/* ICON */}
                  <div className="icon-float group-hover:bg-primary relative z-10 grid size-16 place-items-center rounded-2xl bg-[#edf6ff] text-[#397fce] transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 group-hover:text-white">
                    <Icon size={29} strokeWidth={1.7} />
                  </div>

                  {/* CONTENT */}
                  <div className="relative z-10 mt-4">
                    <h3 className="font-heading text-primary text-xl leading-[1.15] font-semibold tracking-[-0.035em]">
                      {feature.title}
                    </h3>

                    <p className="mt-3 font-sans text-[15px] leading-[1.8] text-slate-600">
                      {feature.description}
                    </p>
                  </div>

                  {/* BOTTOM ACCENT LINE */}
                  <div className="mt-auto pt-5">
                    <div className="h-[2px] w-full overflow-hidden rounded-full bg-sky-100">
                      <div className="h-full w-0 rounded-full bg-[#397fce] transition-all duration-700 group-hover:w-full" />
                    </div>
                  </div>

                  {/* HOVER GLOW */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-20 -bottom-20 size-56 rounded-full bg-sky-200/20 opacity-0 blur-[60px] transition-opacity duration-500 group-hover:opacity-100"
                  />
                </article>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
