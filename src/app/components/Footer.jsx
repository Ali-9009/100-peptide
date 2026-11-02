"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  Mail,
  MapPin,
  FlaskConical,
  ShieldCheck,
  Truck,
  Check,
  ArrowUp,
} from "lucide-react";

import {
  RiInstagramLine,
  RiFacebookFill,
  RiTwitterXLine,
  RiYoutubeLine,
} from "@remixicon/react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Shop All Peptides", href: "#shop" },
      { label: "Research Bundles", href: "#bundles" },
      { label: "Why Choose Us", href: "#why" },
      { label: "How It Works", href: "#how" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "#brand" },
      { label: "Research Standards", href: "#research-standards" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping Information", href: "#map" },
      { label: "Frequently Asked Questions", href: "#faq" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

export default function Footer() {
  const footerRef = useRef(null);
  const headingRef = useRef(null);
  const columnsRef = useRef(null);
  const brandRef = useRef(null);

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          headingRef.current,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 80%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          columnsRef.current.children,
          {
            y: 45,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: columnsRef.current,
              start: "top 90%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          brandRef.current,
          {
            y: 90,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1.3,
            ease: "power3.out",
            scrollTrigger: {
              trigger: brandRef.current,
              start: "top 95%",
              once: true,
            },
          },
        );
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!email.trim()) return;

    // Connect newsletter API here.
    // Don't display success until the API confirms subscription.
    console.log("Newsletter signup requested:", email);
  };

  return (
    <footer
      ref={footerRef}
      className="bg-primary relative isolate overflow-hidden text-white"
    >
      {/* BACKGROUND GRADIENT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(135deg,#07132b_0%,#0b1b3f_55%,#153875_100%)]"
      />

      {/* AMBIENT LIGHT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-[350px] right-[-200px] -z-10 size-[800px] rounded-full bg-[#4383db]/15 blur-[140px]"
      />

      {/* TOP EDITORIAL SECTION */}
      <div className="mx-auto max-w-[1440px] px-5 pt-20 sm:px-8 lg:px-12">
        {/* MIDDLE FOOTER */}
        <div
          ref={columnsRef}
          className="grid grid-cols-2 gap-x-6 gap-y-12 py-16 sm:grid-cols-3 lg:grid-cols-[1.2fr_1fr_1fr_1fr_1.3fr] lg:gap-10"
        >
          {/* BRAND */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="font-heading text-[48px] leading-none font-bold tracking-[-0.08em] italic">
                100
              </span>

              <span className="flex flex-col">
                <span className="text-[14px] font-bold tracking-[0.2em]">
                  PEPTIDES
                </span>

                <span className="mt-1 text-[9px] font-semibold tracking-[0.32em] text-[#9bb8e3]">
                  RESEARCH
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-[270px] text-[14px] leading-[1.8] text-white/50">
              Precision-driven products for laboratory research.
            </p>

            {/* SOCIAL MEDIA */}
            <div className="mt-7 flex items-center gap-2">
              <SocialLink
                label="Instagram"
                href="https://www.instagram.com/"
                icon={RiInstagramLine}
              />

              <SocialLink
                label="Facebook"
                href="https://www.facebook.com/"
                icon={RiFacebookFill}
              />

              <SocialLink
                label="X (Twitter)"
                href="https://x.com/"
                icon={RiTwitterXLine}
              />

              <SocialLink
                label="YouTube"
                href="https://www.youtube.com/"
                icon={RiYoutubeLine}
              />
            </div>
          </div>

          {/* NAVIGATION COLUMNS */}
          {footerLinks.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h3 className="mb-7 text-[12px] font-semibold tracking-[0.16em] text-[#9ec5ff] uppercase">
                {column.title}
              </h3>

              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-[14px] text-white/60 transition-colors duration-300 hover:text-white"
                    >
                      <span>{link.label}</span>

                      <ArrowUpRight
                        size={13}
                        className="-translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* CONTACT */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <h3 className="mb-7 text-[12px] font-semibold tracking-[0.16em] text-[#9ec5ff] uppercase">
              Get in Touch
            </h3>

            <p className="text-[14px] leading-[1.8] text-white/55">
              Have a question about our collection or your order? We're here to
              help.
            </p>

            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-3 border-b border-white/35 pb-2 text-[15px] font-semibold text-white transition-colors hover:border-white"
            >
              Contact Our Team
              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </div>
        </div>

        {/* TRUST STRIP */}
        <div className="flex flex-wrap items-center justify-between gap-6 border-t border-white/15 py-7">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <span className="inline-flex items-center gap-2 text-[12px] font-medium text-white/55">
              <FlaskConical size={17} className="text-[#9fc7ff]" />
              Research Focused
            </span>

            <span className="inline-flex items-center gap-2 text-[12px] font-medium text-white/55">
              <ShieldCheck size={17} className="text-[#9fc7ff]" />
              Quality Documentation
            </span>

            <span className="inline-flex items-center gap-2 text-[12px] font-medium text-white/55">
              <Truck size={17} className="text-[#9fc7ff]" />
              Shipping Information
            </span>
          </div>

          {/* BACK TO TOP */}
          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              })
            }
            className="group inline-flex items-center gap-2 text-[12px] font-semibold tracking-wide text-white/70 transition-colors hover:text-white"
          >
            Back to Top
            <span className="group-hover:text-primary grid size-10 place-items-center rounded-full border border-white/20 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-white/50 group-hover:bg-white">
              <ArrowUp size={17} />
            </span>
          </button>
        </div>

        {/* COPYRIGHT */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-7 text-[12px] text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} 100 Peptides. All rights reserved.
          </span>

          <span>Products intended for laboratory research use only.</span>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ label, href, icon: Icon }) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-primary grid size-11 place-items-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white"
    >
      <Icon size={18} strokeWidth={1.7} />
    </a>
  );
}
