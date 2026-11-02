"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  Heart,
  ShoppingBag,
  Star,
  Eye,
  X,
  Plus,
  Minus,
  FlaskConical,
  Sparkles,
  Package,
  Check,
  ArrowRight,
} from "lucide-react";

import { bundles } from "@/data/bundles";
import { products } from "@/data/products";

export default function ProductCard({
  product,
  wished = false,
  onWishToggle,
  onAddToCart,
}) {
  const {
    name,
    category,
    description,
    image,
    badge,
    variants = [],
    rating = null,
    reviews = null,
    defaultVariant = 0,
  } = product;

  // Main product card
  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);

  // Quick View
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState(defaultVariant);
  const [selectedBundleId, setSelectedBundleId] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Detect whether the current card itself represents a bundle
  const isBundleProduct =
    Array.isArray(product.products) && product.products.length > 0;

  // Available bundles from your real data file
  const bundleOptions = bundles.filter((bundle) => bundle.active);

  const currentVariant = variants[selectedVariant] ?? variants[0] ?? null;

  const activeVariant = variants[modalVariant] ?? variants[0] ?? null;

  // Selected bundle
  const selectedBundle = bundleOptions.find(
    (bundle) => bundle.id === selectedBundleId,
  );

  const selectedBundleVariant =
    selectedBundle?.variants?.[selectedBundle.defaultVariant ?? 0];

  // Price calculation
  const basePrice = Number(activeVariant?.price ?? 0);

  const selectedPrice = selectedBundle
    ? Number(selectedBundleVariant?.price ?? 0)
    : basePrice;

  const totalPrice = (selectedPrice * quantity).toFixed(2);

  // Selected purchase availability
  const isAvailable = selectedBundle
    ? Boolean(selectedBundleVariant && selectedBundleVariant.inStock !== false)
    : Boolean(activeVariant && activeVariant.inStock !== false);

  // Open modal
  const openQuickView = () => {
    setModalVariant(selectedVariant);

    // Bundle cards start with their own bundle selected
    // Individual products start with the single product selected
    setSelectedBundleId(isBundleProduct ? product.id : null);

    setQuantity(1);
    setIsQuickViewOpen(true);
  };

  // Close modal
  const closeQuickView = () => {
    setIsQuickViewOpen(false);
  };

  // Prevent body scrolling while modal is open
  useEffect(() => {
    if (!isQuickViewOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsQuickViewOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isQuickViewOpen]);

  // Add selected product or bundle to cart
  const handleAddToCart = () => {
    if (!isAvailable) return;

    if (selectedBundle) {
      onAddToCart?.(
        selectedBundle,
        selectedBundle.defaultVariant ?? 0,
        quantity,
      );
    } else {
      onAddToCart?.(product, modalVariant, quantity);
    }

    closeQuickView();
  };

  return (
    <>
      {/* ==========================================
          PRODUCT CARD
      ========================================== */}

      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-sky-100 bg-white p-3 transition-all duration-500 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-[0_20px_45px_-12px_rgba(14,165,233,0.18)] sm:p-4">
        {/* IMAGE CONTAINER */}
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-b from-sky-50 via-sky-100/40 to-white">
          {/* BADGE */}
          {badge && (
            <span className="bg-primary absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-semibold text-white">
              <Sparkles size={13} />
              {badge}
            </span>
          )}

          {/* WISHLIST */}
          <button
            type="button"
            onClick={() => onWishToggle?.(product)}
            aria-label={
              wished
                ? `Remove ${name} from wishlist`
                : `Add ${name} to wishlist`
            }
            aria-pressed={wished}
            className="text-primary absolute top-3 right-3 z-20 grid size-10 place-items-center rounded-full bg-white shadow-sm transition-all duration-300 hover:scale-110"
          >
            <Heart
              size={19}
              strokeWidth={1.8}
              className={wished ? "fill-rose-500 text-rose-500" : ""}
            />
          </button>

          {/* PRODUCT IMAGE */}
          {image && (
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
              className="object-contain p-5 transition-transform duration-700 group-hover:scale-105 sm:p-6"
            />
          )}

          {/* QUICK VIEW BUTTON */}
          <div className="absolute inset-x-3 bottom-3 z-20 translate-y-0 opacity-100 transition-all duration-500 md:translate-y-4 md:opacity-0 md:group-focus-within:translate-y-0 md:group-focus-within:opacity-100 md:group-hover:translate-y-0 md:group-hover:opacity-100">
            <button
              type="button"
              onClick={openQuickView}
              className="bg-primary flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white shadow-lg transition-colors duration-300 hover:bg-[#234b8c]"
            >
              <Eye size={17} />
              Quick View
            </button>
          </div>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="flex flex-1 flex-col px-1 pt-5 pb-1">
          {/* CATEGORY */}
          <span className="font-sans text-xs font-semibold tracking-[0.12em] text-sky-700 uppercase">
            {category}
          </span>

          {/* PRODUCT NAME */}
          <h3 className="font-heading text-primary mt-2 text-[23px] leading-tight font-semibold">
            {name}
          </h3>

          {/* RATING */}
          {rating != null && (
            <div className="mt-2 flex items-center gap-2">
              <Star size={16} className="fill-amber-400 text-amber-400" />

              <span className="text-text text-sm font-semibold">
                {Number(rating).toFixed(1)}
              </span>

              {reviews != null && (
                <span className="text-sm text-slate-500">({reviews})</span>
              )}
            </div>
          )}

          {/* VARIANTS */}
          <div className="mt-auto pt-5">
            {variants.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {variants.map((variant, index) => (
                  <button
                    key={variant.id ?? index}
                    type="button"
                    onClick={() => setSelectedVariant(index)}
                    aria-pressed={selectedVariant === index}
                    className={`rounded-full border px-3.5 py-2 text-xs font-semibold transition-all duration-300 ${
                      selectedVariant === index
                        ? "border-primary bg-primary text-white"
                        : "text-text hover:border-primary border-slate-200 bg-slate-50"
                    }`}
                  >
                    {variant.label}
                  </button>
                ))}
              </div>
            )}

            {/* PRICE */}
            <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <div>
                <span className="block text-xs text-slate-500">Price</span>

                <span className="font-heading text-primary text-[26px] font-bold">
                  {currentVariant
                    ? `$${Number(currentVariant.price).toFixed(2)}`
                    : "Unavailable"}
                </span>
              </div>

              {/* ADD TO CART */}
              <button
                type="button"
                disabled={!currentVariant || currentVariant.inStock === false}
                onClick={() => onAddToCart?.(product, selectedVariant, 1)}
                className="bg-primary flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#234b8c] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingBag size={17} />
                Add
              </button>
            </div>
          </div>
        </div>
      </article>

      {/* ==========================================
          QUICK VIEW MODAL
      ========================================== */}

      {isQuickViewOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07152f]/65 p-3 backdrop-blur-sm sm:p-6"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeQuickView();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${name} Quick View`}
            className="relative max-h-[92dvh] w-full max-w-[1080px] overflow-y-auto rounded-[24px] bg-white shadow-2xl sm:rounded-[30px]"
          >
            {/* CLOSE */}
            <button
              type="button"
              onClick={closeQuickView}
              aria-label="Close Quick View"
              className="text-primary hover:bg-primary absolute top-4 right-4 z-30 grid size-11 place-items-center rounded-full bg-white shadow-md transition-all duration-300 hover:rotate-90 hover:text-white"
            >
              <X size={21} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* ==================================
                  MODAL LEFT
              ================================== */}

              <div className="relative flex min-h-[280px] flex-col items-center justify-center bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff] to-white p-8 sm:min-h-[400px] lg:col-span-4 lg:min-h-full">
                {/* PRODUCT IMAGE */}
                {image && (
                  <div className="relative h-[240px] w-full max-w-[300px] sm:h-[340px]">
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="(max-width: 640px) 260px, 340px"
                      className="object-contain drop-shadow-[0_25px_25px_rgba(11,27,63,0.15)]"
                    />
                  </div>
                )}

                <div className="text-primary mt-5 flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-medium">
                  <FlaskConical size={17} />
                  For Laboratory Research
                </div>
              </div>

              {/* ==================================
                  MODAL RIGHT
              ================================== */}

              <div className="min-w-0 p-5 sm:p-8 lg:col-span-8 lg:p-10">
                {/* CATEGORY */}
                <span className="font-sans text-xs font-bold tracking-[0.15em] text-sky-700 uppercase">
                  {category}
                </span>

                {/* TITLE */}
                <h2 className="font-heading text-primary mt-2 text-[32px] leading-[1.1] font-semibold sm:text-[42px]">
                  {name}
                </h2>

                {/* DESCRIPTION */}
                {description && (
                  <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-slate-600 sm:text-base">
                    {description}
                  </p>
                )}

                {/* RATING */}
                {rating != null && (
                  <div className="mt-4 flex items-center gap-2">
                    <Star size={17} className="fill-amber-400 text-amber-400" />

                    <span className="text-primary text-sm font-semibold">
                      {Number(rating).toFixed(1)}
                    </span>

                    {reviews != null && (
                      <span className="text-sm text-slate-500">
                        ({reviews} reviews)
                      </span>
                    )}
                  </div>
                )}

                {/* ==================================
                    PRODUCT VARIANTS
                ================================== */}

                <div className="mt-7">
                  <h3 className="text-primary mb-3 font-sans text-sm font-semibold">
                    {isBundleProduct
                      ? "Select Bundle Option"
                      : "Select Strength"}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {variants.map((variant, index) => (
                      <button
                        key={variant.id ?? index}
                        type="button"
                        onClick={() => {
                          setModalVariant(index);

                          if (!isBundleProduct) {
                            setSelectedBundleId(null);
                          }
                        }}
                        aria-pressed={modalVariant === index}
                        className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                          modalVariant === index
                            ? "border-primary bg-primary text-white"
                            : "text-primary hover:border-primary border-slate-200 bg-white"
                        }`}
                      >
                        <span>{variant.label}</span>

                        <span className="ml-2 opacity-75">
                          ${Number(variant.price).toFixed(2)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* ==================================
                    BUNDLES FROM DATA
                ================================== */}

                {!isBundleProduct && (
                  <section className="mt-8">
                    {/* HEADING */}
                    <div className="mb-5 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-xs font-semibold tracking-[0.14em] text-sky-700 uppercase">
                          Curated Collections
                        </span>

                        <h3 className="font-heading text-primary mt-1 text-[25px] font-semibold sm:text-[29px]">
                          Bundle & Save
                        </h3>
                      </div>

                      <Package
                        size={25}
                        strokeWidth={1.6}
                        className="text-primary shrink-0"
                      />
                    </div>

                    {/* SINGLE PRODUCT */}
                    <button
                      type="button"
                      onClick={() => setSelectedBundleId(null)}
                      aria-pressed={selectedBundleId === null}
                      className={`mb-4 flex w-full items-center justify-between gap-3 rounded-2xl border p-4 text-left transition-all duration-300 ${
                        selectedBundleId === null
                          ? "border-primary ring-primary/10 bg-[#f0f7ff] ring-2"
                          : "hover:border-primary/40 border-slate-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`grid size-6 shrink-0 place-items-center rounded-full border ${
                            selectedBundleId === null
                              ? "border-primary bg-primary text-white"
                              : "border-slate-300"
                          }`}
                        >
                          {selectedBundleId === null && <Check size={15} />}
                        </span>

                        <div>
                          <h4 className="text-primary font-sans text-sm font-semibold">
                            Single Product
                          </h4>

                          <p className="mt-1 text-xs text-slate-500">
                            {name} — {activeVariant?.label}
                          </p>
                        </div>
                      </div>

                      <span className="font-heading text-primary shrink-0 text-xl font-bold">
                        ${basePrice.toFixed(2)}
                      </span>
                    </button>

                    {/* THREE ACTUAL BUNDLES */}
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                      {bundleOptions.map((bundle) => {
                        const isSelected = selectedBundleId === bundle.id;

                        const bundleVariant =
                          bundle.variants?.[bundle.defaultVariant ?? 0];

                        const price = Number(bundleVariant?.price ?? 0);

                        const comparePrice = Number(
                          bundleVariant?.compareAtPrice ?? 0,
                        );

                        const savings =
                          comparePrice > price
                            ? Math.round(
                                ((comparePrice - price) / comparePrice) * 100,
                              )
                            : 0;

                        return (
                          <button
                            key={bundle.id}
                            type="button"
                            disabled={
                              !bundleVariant || bundleVariant.inStock === false
                            }
                            onClick={() => setSelectedBundleId(bundle.id)}
                            aria-pressed={isSelected}
                            className={`group/bundle relative flex flex-col overflow-hidden rounded-2xl border p-3 text-left transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${
                              isSelected
                                ? "border-primary ring-primary/10 bg-[#f0f7ff] ring-2"
                                : "hover:border-primary/40 border-slate-200 bg-white"
                            }`}
                          >
                            {/* BUNDLE IMAGE */}
                            <div className="relative mb-3 h-[135px] w-full overflow-hidden rounded-xl bg-gradient-to-b from-sky-50 to-sky-100/50">
                              {bundle.image && (
                                <Image
                                  src={bundle.image}
                                  alt={bundle.name}
                                  fill
                                  sizes="(max-width: 640px) 100vw, 300px"
                                  className="object-contain p-3 transition-transform duration-500 group-hover/bundle:scale-105"
                                />
                              )}

                              {/* SELECTED INDICATOR */}
                              <span
                                className={`absolute top-2 left-2 grid size-7 place-items-center rounded-full border ${
                                  isSelected
                                    ? "border-primary bg-primary text-white"
                                    : "border-slate-300 bg-white"
                                }`}
                              >
                                {isSelected && <Check size={16} />}
                              </span>

                              {/* SAVINGS */}
                              {savings > 0 && (
                                <span className="bg-primary absolute top-2 right-2 rounded-full px-2.5 py-1 text-xs font-semibold text-white">
                                  Save {savings}%
                                </span>
                              )}
                            </div>

                            {/* NAME */}
                            <h4 className="font-heading text-primary text-[18px] leading-tight font-semibold">
                              {bundle.name}
                            </h4>

                            {/* PRICE */}
                            <div className="mt-auto flex flex-wrap items-center gap-2 pt-5">
                              <span className="font-heading text-primary text-[23px] font-bold">
                                ${price.toFixed(2)}
                              </span>

                              {comparePrice > price && (
                                <span className="text-sm text-slate-400 line-through">
                                  ${comparePrice.toFixed(2)}
                                </span>
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* ==================================
                    INCLUDED PRODUCTS FOR BUNDLE CARD
                ================================== */}

                {isBundleProduct && (
                  <section className="mt-8">
                    <h3 className="font-heading text-primary mb-4 text-[25px] font-semibold">
                      What's Inside This Bundle?
                    </h3>

                    <div className="space-y-3">
                      {product.products.map((item) => {
                        const includedProduct = products.find(
                          (p) => p.id === item.productId,
                        );

                        const includedVariant = includedProduct?.variants?.find(
                          (v) => v.id === item.variantId,
                        );

                        return (
                          <div
                            key={`${item.productId}-${item.variantId}`}
                            className="flex items-center gap-4 rounded-xl border border-sky-100 bg-[#f4f9ff] p-3"
                          >
                            {/* IMAGE */}
                            <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-white">
                              {includedProduct?.image && (
                                <Image
                                  src={includedProduct.image}
                                  alt={includedProduct.name}
                                  fill
                                  sizes="64px"
                                  className="object-contain p-1"
                                />
                              )}
                            </div>

                            {/* INFORMATION */}
                            <div className="min-w-0 flex-1">
                              <h4 className="font-heading text-primary text-lg font-semibold">
                                {includedProduct?.name ?? item.productId}
                              </h4>

                              <p className="mt-1 text-sm text-slate-500">
                                {includedVariant?.label ?? item.variantId}
                              </p>
                            </div>

                            <span className="text-primary rounded-full bg-white px-3 py-1.5 text-sm font-semibold">
                              ×{item.quantity}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                )}

                {/* ==================================
                    MODAL FOOTER
                ================================== */}

                <div className="mt-8 border-t border-slate-100 pt-6">
                  {/* SELECTED ITEM */}
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <span className="text-xs font-medium text-slate-500">
                        Selected
                      </span>

                      <p className="text-primary font-sans text-sm font-semibold">
                        {selectedBundle ? selectedBundle.name : name}
                      </p>
                    </div>

                    <span className="font-heading text-primary text-[27px] font-bold">
                      ${selectedPrice.toFixed(2)}
                    </span>
                  </div>

                  {/* QUANTITY + ADD TO CART */}
                  <div className="flex flex-col gap-3 sm:flex-row">
                    {/* QUANTITY */}
                    <div className="flex h-[54px] items-center justify-between rounded-full border border-slate-200 bg-slate-50 px-2 sm:w-[150px]">
                      <button
                        type="button"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        aria-label="Decrease quantity"
                        className="text-primary grid size-10 place-items-center rounded-full transition hover:bg-white"
                      >
                        <Minus size={18} />
                      </button>

                      <span className="text-primary font-sans text-sm font-semibold">
                        {quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => setQuantity((q) => q + 1)}
                        aria-label="Increase quantity"
                        className="text-primary grid size-10 place-items-center rounded-full transition hover:bg-white"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    {/* ADD TO CART */}
                    <button
                      type="button"
                      disabled={!isAvailable}
                      onClick={handleAddToCart}
                      className="group/btn bg-primary flex min-h-[54px] flex-1 items-center justify-between gap-4 rounded-full px-6 py-3 font-sans text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#234b8c] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <span className="flex items-center gap-2">
                        <ShoppingBag size={18} />
                        {isAvailable ? "Add to Cart" : "Out of Stock"}
                      </span>

                      <span className="flex items-center gap-2">
                        ${totalPrice}
                        <ArrowRight
                          size={17}
                          className="transition-transform duration-300 group-hover/btn:translate-x-1"
                        />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
