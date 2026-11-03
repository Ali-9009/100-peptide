"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  ShoppingBag,
  Menu,
  X,
  Sparkles,
  ChevronRight,
  Truck,
  FlaskConical,
} from "lucide-react";

import CartButton from "@/components/cart/CartButton";

const LINKS = [
  { label: "Shop", href: "/shop" },
  { label: "COA", href: "/coa" },
  { label: "About", href: "/about" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
  { label: "Partner Program", href: "/partner-program" },
  { label: "Track Order", href: "/track-order" },
];

const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

export default function Header({
  cartCount = 0,
  wishCount = 0,
  onCartClick,
  onWishClick,
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const closeButtonRef = useRef(null);
  const menuButtonRef = useRef(null);
  const wasOpen = useRef(false);

  // Smooth compact header without hiding or jumping
  useEffect(() => {
    let ticking = false;

    const updateScroll = () => {
      if (ticking) return;

      ticking = true;

      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        ticking = false;
      });
    };

    updateScroll();

    window.addEventListener("scroll", updateScroll, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  // Lock scrolling, handle Escape, and manage focus
  useEffect(() => {
    if (!menuOpen) {
      if (wasOpen.current) {
        menuButtonRef.current?.focus();
        wasOpen.current = false;
      }
      return;
    }

    wasOpen.current = true;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    const focusTimer = setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 100);

    return () => {
      clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* FLOATING HEADER */}
      <header
        className={`fixed left-1/2 z-50 w-[calc(100%-24px)] max-w-[1320px] -translate-x-1/2 rounded-full border border-[#e8ecf2] bg-white/95 backdrop-blur-xl transition-[top,padding,box-shadow] duration-500 ${ease} sm:w-[calc(100%-40px)] ${
          scrolled
            ? "top-3 px-3 py-2 shadow-[0_10px_40px_rgba(11,27,63,0.10)] sm:px-5"
            : "top-3 px-3 py-3 shadow-[0_8px_30px_rgba(11,27,63,0.06)] sm:px-5"
        } `}
      >
        <div className="grid grid-cols-[1fr_auto] items-center gap-3 lg:grid-cols-[1fr_auto_1fr]">
          {/* LOGO */}
          <Link
            href="/"
            onClick={closeMenu}
            aria-label="100 Peptides Research - Home"
            className="flex w-fit items-center gap-2.5"
          >
            <span className="font-heading text-primary text-[38px] leading-none font-semibold tracking-tight italic sm:text-[43px]">
              100
            </span>

            <span className="flex flex-col">
              <span className="text-primary text-[12px] leading-tight font-bold tracking-[0.18em] sm:text-[14px]">
                PEPTIDES
              </span>

              <span className="mt-0.5 text-[8px] font-semibold tracking-[0.3em] text-slate-500 sm:text-[9px]">
                RESEARCH
              </span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-0.5 lg:flex xl:gap-1"
          >
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-text rounded-full px-3 py-2.5 text-[13px] font-medium transition-[background-color,color] duration-300 ${ease} hover:text-primary hover:bg-[#eef2f8] xl:px-4`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center justify-end gap-1.5 sm:gap-2">
            <IconButton
              label="Open wishlist"
              count={wishCount}
              onClick={onWishClick}
              className="hidden sm:grid"
              icon={Heart}
            />


            <CartButton />

            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className={`text-primary grid h-10 w-10 place-items-center rounded-full bg-[#eef2f8] transition-[background-color,color,transform] duration-300 ${ease} hover:bg-primary hover:text-white active:scale-95 sm:h-11 sm:w-11 lg:hidden`}
            >
              <Menu size={21} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE BACKDROP */}
      <div
        aria-hidden="true"
        onClick={closeMenu}
        className={`fixed inset-0 z-[80] bg-[#07132b]/55 transition-[opacity,visibility] duration-500 ${ease} lg:hidden ${
          menuOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        } `}
      />

      {/* MOBILE SIDEBAR */}
      <aside
        id="mobile-navigation"
        role="dialog"
        aria-modal={menuOpen ? "true" : undefined}
        aria-label="Mobile navigation"
        inert={!menuOpen}
        className={`fixed top-0 right-0 z-[90] flex h-dvh w-full max-w-[390px] flex-col overflow-hidden bg-white shadow-[-20px_0_60px_rgba(0,0,0,0.12)] transition-transform duration-[650ms] ${ease} will-change-transform lg:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"} `}
      >
        {/* SIDEBAR HEADER */}
        <div className="flex shrink-0 items-center justify-between border-b border-[#edf0f4] px-6 py-5">
          <Link
            href="/"
            onClick={closeMenu}
            className="flex items-center gap-2"
          >
            <span className="font-heading text-primary text-[38px] leading-none font-semibold italic">
              100
            </span>

            <span>
              <span className="text-primary block text-[12px] font-bold tracking-[0.18em]">
                PEPTIDES
              </span>
              <span className="block text-[8px] font-semibold tracking-[0.28em] text-slate-500">
                RESEARCH
              </span>
            </span>
          </Link>

          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
            className={`text-primary grid h-10 w-10 place-items-center rounded-full bg-[#f0f4fa] transition-all duration-300 ${ease} hover:bg-primary hover:rotate-90 hover:text-white`}
          >
            <X size={20} strokeWidth={1.8} />
          </button>
        </div>

        {/* SIDEBAR BODY */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-7">
          <p className="mb-4 text-[10px] font-bold tracking-[0.22em] text-slate-400 uppercase">
            Explore
          </p>

          <nav aria-label="Mobile navigation" className="flex flex-col">
            {LINKS.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                style={{
                  transitionDelay: menuOpen ? `${120 + index * 55}ms` : "0ms",
                }}
                className={`group text-text flex items-center justify-between border-b border-[#edf0f4] py-4 text-[17px] font-medium transition-[opacity,transform,color] duration-500 ${ease} hover:text-primary ${
                  menuOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-5 opacity-0"
                } `}
              >
                <span>{link.label}</span>

                <ChevronRight
                  size={18}
                  strokeWidth={1.6}
                  className="group-hover:text-primary text-slate-400 transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            ))}
          </nav>

          {/* QUICK ACTIONS */}
          <div className="mt-7 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                closeMenu();
                onWishClick?.();
              }}
              className="text-primary flex items-center justify-center gap-2 rounded-xl border border-[#e6eaf1] px-3 py-3.5 text-xs font-semibold transition-colors duration-300 hover:bg-[#f0f4fa]"
            >
              <Heart size={17} strokeWidth={1.7} />
              Wishlist ({wishCount})
            </button>

            <CartButton />
          </div>

          {/* PROMOTION */}
          <div className="bg-primary relative mt-7 overflow-hidden rounded-2xl p-6 text-white">
            <div className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full border border-white/15" />
            <div className="pointer-events-none absolute -top-6 -right-6 h-24 w-24 rounded-full border border-white/10" />

            <span className="relative inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.15em] text-[#c6d8ff] uppercase">
              <FlaskConical size={14} />
              Research Collection
            </span>

            <h3 className="font-heading relative mt-3 max-w-[250px] text-[32px] leading-[1.1] font-medium">
              Precision in every peptide.
            </h3>

            <Link
              href="#shop"
              onClick={closeMenu}
              className="group text-primary relative mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[12px] font-semibold transition-colors duration-300 hover:bg-[#e8efff]"
            >
              Explore Collection
              <ArrowRight
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* SIDEBAR FOOTER */}
        <div className="flex shrink-0 items-center justify-center gap-2 border-t border-[#edf0f4] bg-[#fafbfc] px-6 py-5">
          <Truck size={15} className="text-primary" />
          <p className="text-[11px] font-medium text-slate-500">
            Reliable shipping across the US
          </p>
        </div>
      </aside>
    </>
  );
}

function IconButton({ label, count = 0, onClick, icon: Icon, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${label}${count > 0 ? `, ${count} items` : ""}`}
      className={`text-primary relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#eef2f8] transition-[background-color,color,transform] duration-300 ${ease} hover:bg-primary hover:text-white active:scale-95 sm:h-11 sm:w-11 ${className} `}
    >
      <Icon size={19} strokeWidth={1.7} />

      {count > 0 && (
        <span className="bg-primary absolute -top-1 -right-1 grid h-[19px] min-w-[19px] place-items-center rounded-full border-2 border-white px-0.5 text-[9px] font-bold text-white">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </button>
  );
}
