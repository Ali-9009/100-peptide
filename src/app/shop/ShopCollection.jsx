"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

import { Eye } from "lucide-react";
import QuickViewModal from "@/components/QuickViewModal";

import { ShoppingBag, LoaderCircle } from "lucide-react";

import gsap from "gsap";

import { useCart } from "@/context/CartContext";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  FlaskConical,
  PackageSearch,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { getProducts } from "@/data/products";

const allProducts = getProducts();

const sortOptions = [
  {
    value: "featured",
    label: "Featured",
  },
  {
    value: "name-asc",
    label: "Name: A to Z",
  },
  {
    value: "name-desc",
    label: "Name: Z to A",
  },
  {
    value: "price-low",
    label: "Price: Low to High",
  },
  {
    value: "price-high",
    label: "Price: High to Low",
  },
];

function getDefaultVariant(product) {
  return (
    product.variants?.[product.defaultVariant] || product.variants?.[0] || null
  );
}

function getStartingPrice(product) {
  if (!product.variants?.length) return 0;

  return Math.min(...product.variants.map((variant) => variant.price));
}

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(price);
}

// ============================================
// PRODUCT CARD
// ============================================

function ShopProductCard({ product, onAddToCart }) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(
    product.defaultVariant ?? 0,
  );

  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const selectedVariant =
    product.variants?.[selectedVariantIndex] || product.variants?.[0];

  const price = selectedVariant?.price ?? 0;

  const available =
    selectedVariant?.inStock === true &&
    (selectedVariant.stock == null || selectedVariant.stock > 0);

  useEffect(() => {
    if (!added) return;

    const timeout = setTimeout(() => setAdded(false), 2000);

    return () => clearTimeout(timeout);
  }, [added]);

  const handleVariantChange = (index) => {
    setSelectedVariantIndex(index);
    setAdded(false);
  };

  const handleAddToCart = async () => {
    if (!available || adding || !selectedVariant) return;

    setAdding(true);
    setAdded(false);

    try {
      await onAddToCart(product, selectedVariant);
      setAdded(true);
    } catch (error) {
      console.error("Unable to add product to cart:", error);
    } finally {
      setAdding(false);
    }
  };

  return (
    <article className="group relative flex h-full min-w-0 flex-col">
      {/* PRODUCT IMAGE */}
      <div className="group relative">
        {/* PRODUCT IMAGE LINK */}
        <Link
          href={`/products/${product.slug}`}
          aria-label={`View ${product.name}`}
          className="relative block aspect-[4/4.7] overflow-hidden rounded-[22px] border border-[#e4edf7] bg-[#f1f7fd] transition-all duration-500 hover:border-[#b9d5ee] sm:rounded-[26px]"
        >
          {/* BACKGROUND GRADIENT */}
          <div
            className="absolute inset-0 transition-transform duration-700 group-hover:scale-110"
            style={{
              background: `radial-gradient(
          circle at 50% 45%,
          #ffffff 0%,
          ${product.tint || "#e8f3ff"} 75%,
          #d8e8f8 100%
        )`,
            }}
          />

          {/* DECORATIVE CIRCLES */}
          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70"
          />

          <div
            aria-hidden="true"
            className="absolute top-1/2 left-1/2 size-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50"
          />

          {/* PRODUCT IMAGE */}
          <div className="absolute inset-[12%] z-10 transition-transform duration-700 ease-out group-hover:-translate-y-3 group-hover:scale-[1.06]">
            <Image
              src={product.image}
              alt={`${product.name} research peptide`}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
              className="object-contain drop-shadow-[0_20px_22px_rgba(20,58,103,0.14)]"
            />
          </div>
        </Link>

        {/* QUICK VIEW EYE BUTTON */}
        <button
          type="button"
          onClick={() => setIsQuickViewOpen(true)}
          aria-label={`Quick view ${product.name}`}
          title={`Quick view ${product.name}`}
          className="text-primary hover:bg-primary absolute top-4 right-4 z-20 grid size-11 place-items-center rounded-full border border-white/70 bg-white/90 shadow-[0_8px_25px_rgba(20,58,103,0.12)] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:text-white"
        >
          <Eye size={20} strokeWidth={1.8} />
        </button>

        {/* REUSABLE QUICK VIEW */}
        <QuickViewModal
          product={product}
          open={isQuickViewOpen}
          onClose={() => setIsQuickViewOpen(false)}
        />
      </div>

      {/* PRODUCT DETAILS */}
      <div className="flex flex-1 flex-col px-1 pt-5">
        {/* PRODUCT TITLE */}
        <Link
          href={`/products/${product.slug}`}
          className="mt-2 inline-block w-fit"
        >
          <h3 className="font-heading text-primary text-[23px] leading-tight font-semibold tracking-[-0.045em] transition-colors duration-300 hover:text-[#397fce]">
            {product.name}
          </h3>
        </Link>

        {/* VARIANT SELECTION */}
        <fieldset className="mt-auto pt-5">
          <div className="flex flex-wrap gap-2">
            {product.variants?.map((variant, index) => {
              const selected = selectedVariantIndex === index;

              const inStock =
                variant.inStock && (variant.stock == null || variant.stock > 0);

              return (
                <label
                  key={variant.id}
                  className={`relative inline-flex min-h-[38px] cursor-pointer items-center justify-center gap-1.5 rounded-xl border px-4 text-[12px] font-semibold transition-all duration-300 ${
                    selected
                      ? "border-primary bg-primary text-white shadow-[0_5px_15px_rgba(11,27,63,0.15)]"
                      : "border-[#dce8f5] bg-[#f7fbff] text-[#58738f] hover:border-[#91bde8] hover:bg-[#edf6ff]"
                  } ${!inStock ? "cursor-not-allowed opacity-40" : ""}`}
                >
                  <input
                    type="radio"
                    name={`variant-${product.id}`}
                    value={variant.id}
                    checked={selected}
                    onChange={() => handleVariantChange(index)}
                    disabled={!inStock || adding}
                    className="sr-only"
                  />

                  {variant.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* PRICE */}
        <div className="mt-3 flex items-center justify-between gap-4 border-t border-[#e2ebf5] pt-4">
          <div>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-heading text-primary text-[28px] leading-none font-semibold tracking-[-0.05em]">
                {formatPrice(price)}
              </span>

              {selectedVariant?.compareAtPrice > price && (
                <span className="text-[13px] text-[#a1adba] line-through">
                  {formatPrice(selectedVariant.compareAtPrice)}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ADD TO CART */}
        <button
          type="button"
          onClick={handleAddToCart}
          disabled={!available || adding || added}
          className={`mt-3 flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full px-5 text-[13px] font-semibold transition-all duration-300 ${
            added
              ? "bg-[#e8f5ee] text-[#348255]"
              : available
                ? "bg-primary text-white hover:bg-[#28558f]"
                : "cursor-not-allowed bg-[#e8edf3] text-[#9aa9bb]"
          }`}
        >
          {adding ? (
            <>
              <LoaderCircle size={18} className="animate-spin" />
              Adding...
            </>
          ) : added ? (
            <>
              <Check size={18} />
              Added to Cart
            </>
          ) : available ? (
            <>
              <ShoppingBag
                size={18}
                strokeWidth={1.8}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
              Add to Cart
            </>
          ) : (
            "Out of Stock"
          )}
        </button>
      </div>
    </article>
  );
}

// ============================================
// SEARCH + SORT BAR
// ============================================

function ShopToolbar({
  search,
  setSearch,
  sortBy,
  setSortBy,
  resultCount,
  totalCount,
}) {
  return (
    <div className="mb-8">
      {/* TOP INFORMATION */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="mb-2 inline-block text-[10px] font-bold tracking-[0.17em] text-[#397fce] uppercase">
            Browse Collection
          </span>

          <h2 className="font-heading text-primary text-[clamp(27px,3vw,38px)] leading-tight font-semibold tracking-[-0.045em]">
            All Research Products
          </h2>
        </div>

        <span className="text-[12px] font-medium text-[#7c8ca0]">
          Showing <span className="text-primary font-bold">{resultCount}</span>{" "}
          of {totalCount} products
        </span>
      </div>

      {/* SEARCH + SORT TOOLBAR */}
      <div className="flex flex-col gap-3 rounded-[22px] border border-[#e2eaf4] bg-white p-3 shadow-[0_10px_40px_rgba(11,27,63,0.035)] sm:flex-row sm:items-center">
        {/* SEARCH */}
        <div className="relative flex min-h-[52px] flex-1 items-center rounded-[15px] bg-[#f4f8fd]">
          <Search
            size={19}
            strokeWidth={1.8}
            className="absolute left-4 text-[#6687a9]"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search research compounds..."
            aria-label="Search products"
            className="text-primary h-[52px] w-full bg-transparent pr-12 pl-12 font-sans text-[13px] outline-none placeholder:text-[#94a6bb]"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="hover:text-primary absolute right-3 grid size-8 place-items-center rounded-full text-[#8297ad] transition-colors hover:bg-white"
            >
              <X size={17} />
            </button>
          )}
        </div>

        {/* DIVIDER */}
        <div className="hidden h-9 w-px bg-[#e3eaf3] sm:block" />

        {/* SORT */}
        <div className="flex items-center gap-3 px-2 sm:min-w-[240px]">
          <span className="shrink-0 text-[12px] font-medium text-[#8393a7]">
            Sort by
          </span>

          <div className="relative min-w-0 flex-1">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="Sort products"
              className="text-primary h-[48px] w-full cursor-pointer appearance-none rounded-xl bg-[#f4f8fd] pr-10 pl-4 font-sans text-[12px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#86b9e8]"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <ChevronDown
              size={15}
              className="text-primary pointer-events-none absolute top-1/2 right-3 -translate-y-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================
// EMPTY SEARCH STATE
// ============================================

function EmptyProducts({ search, clearSearch }) {
  return (
    <div className="flex min-h-[360px] flex-col items-center justify-center rounded-[28px] border border-[#e1eaf5] bg-[#f7fbff] px-6 py-14 text-center">
      <span className="grid size-[74px] place-items-center rounded-[24px] bg-[#e9f3ff] text-[#397fce]">
        <PackageSearch size={32} strokeWidth={1.4} />
      </span>

      <h3 className="font-heading text-primary mt-6 text-[29px] font-semibold tracking-[-0.04em]">
        No Products Found
      </h3>

      <p className="mt-3 max-w-[390px] text-[14px] leading-relaxed text-[#71859d]">
        No research compounds match{" "}
        <span className="text-primary font-semibold">"{search}"</span>. Try
        searching for another product name.
      </p>

      <button
        type="button"
        onClick={clearSearch}
        className="bg-primary mt-7 inline-flex min-h-[48px] items-center gap-3 rounded-full px-6 text-[13px] font-semibold text-white transition-colors hover:bg-[#28558f]"
      >
        Clear Search
        <ArrowRight size={17} />
      </button>
    </div>
  );
}

// ============================================
// SHOP COLLECTION
// ============================================

export default function ShopCollection() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const { addItem } = useCart();
  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();

    let result = allProducts.filter((product) => {
      if (!query) return true;

      const searchableText = [
        product.name,
        product.category,
        product.description,
        product.slug,
        ...(product.variants?.map((variant) => variant.label) || []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });

    result = [...result];

    switch (sortBy) {
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "price-low":
        result.sort((a, b) => getStartingPrice(a) - getStartingPrice(b));
        break;

      case "price-high":
        result.sort((a, b) => getStartingPrice(b) - getStartingPrice(a));
        break;

      case "featured":
      default:
        result.sort((a, b) => Number(b.featured) - Number(a.featured));
        break;
    }

    return result;
  }, [search, sortBy]);

  const heroRef = useRef(null);
  const standingBottleRef = useRef(null);
  const lyingBottleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Standing bottle enters from above
      timeline.fromTo(
        standingBottleRef.current,
        {
          y: -100,
          opacity: 0,
          scale: 0.75,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "back.out(1.4)",
        },
      );

      // Lying bottle enters from the right
      timeline.fromTo(
        lyingBottleRef.current,
        {
          x: 130,
          y: 70,
          opacity: 0,
          scale: 0.8,
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        "-=0.8",
      );

      // Standing bottle floats
      gsap.to(standingBottleRef.current, {
        y: -15,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.2,
      });

      // Lying bottle floats independently
      gsap.to(lyingBottleRef.current, {
        y: 12,
        x: -8,
        duration: 3.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen">
      {/* SHOP HERO */}
      <section
        aria-labelledby="shop-heading"
        className="relative isolate overflow-hidden bg-[#d4e9fa] px-5 pt-28 pb-16 sm:px-8 lg:pt-34 lg:pb-20"
      >
        {/* GRADIENT */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(115deg,#e4f1ff_0%,#c8e3fa_45%,#a7cff2_100%)]"
        />

        {/* BACKGROUND CIRCLES */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-36 -right-28 size-[430px] rounded-full border border-white/35 sm:size-[570px]"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-8 -bottom-72 size-[480px] rounded-full border border-white/30 sm:size-[700px]"
        />

        {/* CONTENT */}
        <div className="relative mx-auto max-w-7xl">
          {/* BREADCRUMB */}
          <nav
            aria-label="Breadcrumb"
            className="mb-9 flex items-center gap-2 text-[12px] font-medium text-[#476d98]"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>

            <span className="text-[#8bb6db]">/</span>

            <span className="text-primary font-semibold">Shop All</span>
          </nav>

          <div
            ref={heroRef}
            className="relative grid min-h-[350px] grid-cols-1 items-center gap-8 lg:min-h-[420px] lg:grid-cols-[1.1fr_0.9fr]"
          >
            {/* LEFT — HEADING */}
            <div className="relative z-20 max-w-[750px]">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/65 bg-white/45 px-4 py-2 backdrop-blur-md">
                <FlaskConical size={15} className="text-[#397fce]" />

                <span className="text-primary text-[10px] font-bold tracking-[0.17em] uppercase">
                  100 Peptides Research
                </span>
              </div>

              <h1
                id="shop-heading"
                className="font-heading text-primary text-[clamp(43px,6.5vw,85px)] leading-[1.02] font-semibold tracking-[-0.065em]"
              >
                Explore the
                <br />
                <span className="text-[#397fce]">Research Collection.</span>
              </h1>
            </div>

            {/* RIGHT — ANIMATED PRODUCT SHOWCASE */}
            <div className="relative mx-auto h-[290px] w-full max-w-[460px] sm:h-[370px] lg:h-[420px] lg:max-w-none">
              {/* BACKGROUND GLOW */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 h-[70%] w-[75%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#69aaf5]/25 blur-[65px]"
              />

              {/* DECORATIVE RING */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 size-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 sm:size-[340px]"
              />

              {/* STANDING PRODUCT — BPC-157 */}
              <div className="absolute top-[2%] right-[12%] z-10 h-[90%] w-[48%] -rotate-[9deg]">
                <div ref={standingBottleRef} className="relative h-full w-full">
                  <Image
                    src="/assets/bpc-157.png"
                    alt="BPC-157 research peptide vial"
                    fill
                    priority
                    sizes="(max-width: 640px) 170px, 260px"
                    className="object-contain drop-shadow-[0_26px_30px_rgba(11,27,63,0.22)]"
                  />
                </div>
              </div>

              {/* LYING PRODUCT — TB-500 */}
              <div className="absolute bottom-[5%] left-[5%] z-20 h-[65%] w-[60%] -rotate-[68deg]">
                <div ref={lyingBottleRef} className="relative h-full w-full">
                  <Image
                    src="/assets/tb-500.png"
                    alt="TB-500 research peptide vial"
                    fill
                    priority
                    sizes="(max-width: 640px) 190px, 290px"
                    className="object-contain drop-shadow-[0_24px_25px_rgba(11,27,63,0.25)]"
                  />
                </div>
              </div>

              {/* SOFT GROUND SHADOW */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute right-[10%] bottom-[5%] left-[12%] h-[30px] rounded-full bg-[#3775b7]/15 blur-[20px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCT COLLECTION */}
      <section
        id="shop-products"
        aria-label="Research products"
        className="px-5 py-16 sm:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          {/* SEARCH + SORT ABOVE PRODUCTS */}
          <ShopToolbar
            search={search}
            setSearch={setSearch}
            sortBy={sortBy}
            setSortBy={setSortBy}
            resultCount={filteredProducts.length}
            totalCount={allProducts.length}
          />

          {/* PRODUCTS */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product, index) => (
                <ShopProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={(product, variant) =>
                    addItem(product, variant, 1)
                  }
                />
              ))}
            </div>
          ) : (
            <EmptyProducts search={search} clearSearch={() => setSearch("")} />
          )}
        </div>
      </section>
    </main>
  );
}
