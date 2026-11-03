"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import {
  ArrowUpRight,
  Mail,
  FlaskConical,
  ShieldCheck,
  Truck,
  ArrowUp,
  Sparkles,
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
      { label: "Shop All Peptides", href: "/shop" },
      { label: "COA", href: "/coa" },
      { label: "Partner Program", href: "/partner-program" },
      { label: "Track Order", href: "/track-order" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "FAQs", href: "/faqs" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping Information", href: "/shipping-information" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

export default function Footer() {
  const footerRef = useRef(null);
  const columnsRef = useRef(null);
  const brandRef = useRef(null);
  const ctaRef = useRef(null);

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ctaRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerRef.current,
              start: "top 85%",
              once: true,
            },
          },
        );

        gsap.fromTo(
          columnsRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
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
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
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
    console.log("Newsletter signup requested:", email);
    setSubmitted(true);
    setEmail("");

    // Reset success state after a few seconds
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <footer
      ref={footerRef}
      className="relative isolate mx-auto my-16 max-w-7xl overflow-hidden rounded-3xl bg-[#f8fbff] text-slate-800"
    >
      {/* --- BACKGROUND MAGIC --- */}
      {/* Subtle grid pattern */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,#000_20%,transparent_100%)] bg-[size:4rem_4rem] opacity-50"
      />

      {/* Floating color orbs */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/4 -z-10 size-[500px] rounded-full bg-[#bfdbfe] opacity-40 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 -z-10 size-[400px] rounded-full bg-[#e0e7ff] opacity-40 blur-[100px]"
      />

      {/* Top glowing border */}
      <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-[#397fce]/30 to-transparent" />

      <div className="mx-auto max-w-[1440px] px-5 pt-16 sm:px-8 lg:px-12">
        {/* --- TOP CTA / NEWSLETTER --- */}
        <div
          ref={ctaRef}
          className="mb-20 flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end"
        >
          <div className="max-w-xl">
            <h2 className="font-heading text-primary mt-6 text-[clamp(32px,4vw,48px)] leading-[1.05] font-semibold tracking-[-0.03em]">
              Ready to elevate your <br className="hidden sm:block" />
              <span className="text-[#5794d1]">research standards?</span>
            </h2>
          </div>

          <form onSubmit={handleSubscribe} className="w-full max-w-md">
            <div className="relative flex items-center rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-shadow focus-within:border-[#8dbdf0] focus-within:shadow-[0_8px_30px_rgba(57,127,206,0.15)]">
              <Mail size={18} className="ml-3 text-slate-400" />
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent px-3 py-2 text-[14px] text-slate-800 outline-none placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="bg-primary shrink-0 rounded-xl px-5 py-2.5 text-[14px] font-semibold text-white transition-all hover:bg-[#397fce] hover:shadow-lg"
              >
                {submitted ? "Subscribed!" : "Subscribe"}
              </button>
            </div>
            <p className="mt-2 ml-2 text-[11px] text-slate-400">
              Join our newsletter for research updates and exclusive drops.
            </p>
          </form>
        </div>

        {/* --- MAIN FOOTER GRID --- */}
        <div
          ref={columnsRef}
          className="grid grid-cols-2 gap-x-6 gap-y-12 pb-16 sm:grid-cols-3 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-10"
        >
          {/* BRAND COLUMN */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="font-heading text-primary text-[42px] leading-none font-bold tracking-[-0.08em] italic">
                100
              </span>
              <span className="flex flex-col">
                <span className="text-primary text-[14px] font-bold tracking-[0.2em]">
                  PEPTIDES
                </span>
                <span className="mt-1 text-[9px] font-semibold tracking-[0.32em] text-[#5794d1]">
                  RESEARCH
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-[280px] text-[14px] leading-[1.8] text-slate-500">
              Precision-driven products for laboratory research. Delivering
              quality and consistency to scientists worldwide.
            </p>

            {/* SOCIAL MEDIA */}
            <div className="mt-8 flex items-center gap-2">
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
              <h3 className="mb-6 text-[12px] font-bold tracking-[0.16em] text-slate-400 uppercase">
                {column.title}
              </h3>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group hover:text-primary inline-flex items-center gap-2 text-[14px] font-medium text-slate-600 transition-colors duration-300"
                    >
                      <span>{link.label}</span>
                      <ArrowUpRight
                        size={14}
                        className="-translate-x-2 text-[#397fce] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* --- TRUST STRIP --- */}
        <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-slate-200/60 bg-white/50 px-6 py-4 backdrop-blur-md">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-600">
              <FlaskConical size={16} className="text-[#397fce]" />
              Research Focused
            </span>
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-600">
              <ShieldCheck size={16} className="text-[#397fce]" />
              Quality Documentation
            </span>
            <span className="inline-flex items-center gap-2 text-[13px] font-medium text-slate-600">
              <Truck size={16} className="text-[#397fce]" />
              Shipping Information
            </span>
          </div>

          {/* BACK TO TOP */}
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group hover:text-primary inline-flex items-center gap-2 text-[13px] font-bold tracking-wide text-slate-500 transition-colors"
          >
            Back to Top
            <span className="grid size-9 place-items-center rounded-full border border-slate-200 bg-white transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#397fce]/30 group-hover:shadow-md">
              <ArrowUp
                size={16}
                className="group-hover:text-primary transition-colors"
              />
            </span>
          </button>
        </div>

        {/* --- COPYRIGHT --- */}
        <div className="flex flex-col gap-3 py-7 text-[12px] font-medium text-slate-400 sm:flex-row sm:items-center sm:justify-between">
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
      className="grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#397fce]/30 hover:text-[#397fce] hover:shadow-md"
    >
      <Icon size={17} />
    </a>
  );
}
