"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ArrowRight,
  ArrowUpRight,
  Search,
  X,
  PackageSearch,
} from "lucide-react";

import { getProducts } from "@/data/products";

const money = (price) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);

export default function HeaderSearch() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const products = useMemo(() => getProducts(), []);

  const searchResults = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) return [];

    return products
      .filter((product) => {
        const searchableText = [
          product.name,
          product.slug,
          product.category,
          product.description,
          ...(product.variants || []).map((variant) => variant.label),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(search);
      })
      .slice(0, 5);
  }, [query, products]);

  const closeSearch = () => {
    setOpen(false);
    setQuery("");
  };

  // Focus search input when opened
  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);

      return () => clearTimeout(timeout);
    }
  }, [open]);

  // Close when clicking outside
  useEffect(() => {
    if (!open) return;

    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        closeSearch();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeSearch();
      }
    };

    document.addEventListener("pointerdown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);

      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      {/* SEARCH TRIGGER */}
      <button
        type="button"
        onClick={() => {
          if (open) {
            closeSearch();
          } else {
            setOpen(true);
          }
        }}
        aria-label={open ? "Close search" : "Search products"}
        aria-expanded={open}
        aria-controls="header-search-panel"
        className="flex size-11 items-center justify-center rounded-full border border-[#b9dcd9] bg-white text-[#0b1b3f] transition-all duration-300 hover:border-[#00bfa5] hover:bg-[#f0fffc]"
      >
        {open ? (
          <X size={19} strokeWidth={1.6} />
        ) : (
          <Search size={19} strokeWidth={1.6} />
        )}
      </button>

      {/* SEARCH PANEL */}
      {open && (
        <div
          id="header-search-panel"
          role="search"
          className="animate-in fade-in slide-in-from-top-2 fixed top-[76px] right-3 left-3 z-[100] w-auto rounded-[18px] border border-[#e1e9ed] bg-white p-2.5 shadow-[0_15px_45px_rgba(11,27,63,0.13)] duration-200 lg:absolute lg:top-[calc(100%+18px)] lg:right-0 lg:left-auto lg:w-[min(560px,calc(100vw-24px))]"
        >
          {/* SEARCH INPUT */}
          <div className="relative flex h-[49px] items-center rounded-[16px] border border-[#00bfa5] bg-white">
            <Search
              size={18}
              strokeWidth={1.7}
              className="ml-4 shrink-0 text-[#00bfa5]"
            />

            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search research compounds..."
              aria-label="Search products"
              className="h-full min-w-0 flex-1 bg-transparent px-3 text-[14px] font-medium text-[#172b3c] outline-none placeholder:text-[#94a5b3] [&::-webkit-search-cancel-button]:hidden"
            />

            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
                className="mr-3 grid size-8 place-items-center rounded-full text-[#687988] transition hover:bg-[#eef6f6] hover:text-[#0b1b3f]"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* RESULTS */}
          {query.trim() && (
            <div className="max-h-[360px] overflow-y-auto pt-2">
              {searchResults.length > 0 ? (
                <>
                  {searchResults.map((product) => {
                    const variants = product.variants || [];

                    const defaultVariant =
                      variants[product.defaultVariant || 0] || variants[0];

                    const price = defaultVariant?.price;

                    const inStock = defaultVariant?.inStock;

                    return (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        onClick={closeSearch}
                        className="group flex items-center gap-2 rounded-[12px] px-2 py-2 transition-colors duration-200 hover:bg-[#f1f8ff] sm:gap-3"
                      >
                        {/* PRODUCT IMAGE */}
                        <div className="relative size-[46px] shrink-0 overflow-hidden rounded-[9px] border border-[#e7edf4] bg-[#f5faff] sm:size-[54px]">
                          {product.image && (
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              sizes="54px"
                              className="object-contain p-1"
                            />
                          )}
                        </div>

                        {/* PRODUCT INFO */}
                        <div className="min-w-0 flex-1">
                          <h3 className="line-clamp-1 font-sans text-[12px] font-extrabold tracking-[0.015em] text-[#111820] uppercase sm:text-[13px]">
                            {product.name}
                          </h3>

                          <div className="mt-1 flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-bold tracking-[0.07em] text-[#6c7c84] uppercase">
                              {defaultVariant?.label || product.category}
                            </span>

                            <span className="size-[3px] rounded-full bg-[#9aafb9]" />

                            <span
                              className={`text-[10px] font-bold tracking-[0.09em] uppercase ${
                                inStock ? "text-[#008da0]" : "text-[#b66a48]"
                              }`}
                            >
                              {inStock ? "In Stock" : "Check Availability"}
                            </span>
                          </div>
                        </div>

                        {/* PRICE */}
                        {price != null && (
                          <span className="shrink-0 text-[13px] font-extrabold text-[#111820]">
                            {money(price)}
                          </span>
                        )}

                        <ArrowRight
                          size={17}
                          className="shrink-0 text-[#a5cbd0] transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#00a891]"
                        />
                      </Link>
                    );
                  })}
                </>
              ) : (
                /* NO RESULTS */
                <div className="flex flex-col items-center justify-center px-5 py-9 text-center">
                  <span className="grid size-12 place-items-center rounded-full bg-[#edf8fa] text-[#008f9b]">
                    <PackageSearch size={23} />
                  </span>

                  <h3 className="font-heading mt-4 text-[19px] font-semibold text-[#0b1b3f]">
                    No products found
                  </h3>

                  <p className="mt-2 text-[12px] leading-relaxed text-[#8293a2]">
                    Try another product name or strength.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
