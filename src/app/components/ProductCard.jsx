"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import {
  ShoppingBag,
  Star,
  Eye,
  X,
  Plus,
  Minus,
  FlaskConical,
  Sparkles,
  Check,
  ArrowRight,
} from "lucide-react";

const packOptions = [
  { bottles: 1, discount: 0 },
  { bottles: 2, discount: 5 },
  { bottles: 5, discount: 9 },
  { bottles: 10, discount: 15 },
];

export default function ProductCard({ product, onAddToCart }) {
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

  const [selectedVariant, setSelectedVariant] = useState(defaultVariant);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [modalVariant, setModalVariant] = useState(defaultVariant);
  const [selectedPackSize, setSelectedPackSize] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const currentVariant = variants[selectedVariant] ?? variants[0] ?? null;

  const activeVariant = variants[modalVariant] ?? variants[0] ?? null;

  const unitPrice = Number(activeVariant?.price ?? 0);

  const selectedPack =
    packOptions.find((pack) => pack.bottles === selectedPackSize) ??
    packOptions[0];

  const regularPackPrice = unitPrice * selectedPackSize;

  const discountedPackPrice =
    regularPackPrice * (1 - selectedPack.discount / 100);

  const totalPrice = discountedPackPrice * quantity;

  const totalBottles = selectedPackSize * quantity;

  const isAvailable = activeVariant != null && activeVariant.inStock !== false;

  const money = (value) => `$${Number(value).toFixed(2)}`;

  const openQuickView = () => {
    setModalVariant(selectedVariant);
    setSelectedPackSize(1);
    setQuantity(1);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
  };

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

  const handleAddToCart = () => {
    if (!isAvailable) return;

    // The fourth argument provides the pack discount details.
    // Your cart handler must apply this discount when calculating totals.
    onAddToCart?.(product, modalVariant, totalBottles, {
      packSize: selectedPackSize,
      packQuantity: quantity,
      discountPercent: selectedPack.discount,
      unitPrice,
      totalPrice,
    });

    closeQuickView();
  };

  return (
    <>
      {/* PRODUCT CARD */}
      <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-sky-100 bg-white p-3 transition-all duration-500 hover:-translate-y-1.5 hover:border-sky-300 hover:shadow-[0_20px_45px_-12px_rgba(14,165,233,0.18)] sm:p-4">
        <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-b from-sky-50 via-sky-100/40 to-white">
          {/* EYE ICON — REPLACES HEART AND QUICK VIEW BUTTON */}
          <button
            type="button"
            onClick={openQuickView}
            aria-label={`Quick view ${name}`}
            title={`Quick view ${name}`}
            className="text-primary hover:bg-primary absolute top-3 right-3 z-20 grid size-10 place-items-center rounded-full bg-white shadow-sm transition-all duration-300 hover:scale-110 hover:text-white"
          >
            <Eye size={20} strokeWidth={1.8} />
          </button>

          {image && (
            <Image
              src={image}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
              className="object-contain p-5 transition-transform duration-700 group-hover:scale-105 sm:p-6"
            />
          )}
        </div>

        {/* PRODUCT DETAILS */}
        <div className="flex flex-1 flex-col px-1 pt-5 pb-1">
          <span className="font-sans text-xs font-semibold tracking-[0.12em] text-sky-700 uppercase">
            {category}
          </span>

          <h3 className="font-heading text-primary mt-2 text-[23px] leading-tight font-semibold">
            {name}
          </h3>

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

            <div className="flex items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <div>
                <span className="block text-xs text-slate-500">Price</span>

                <span className="font-heading text-primary text-[26px] font-bold">
                  {currentVariant ? money(currentVariant.price) : "Unavailable"}
                </span>
              </div>

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

      {/* QUICK VIEW */}
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
            <button
              type="button"
              onClick={closeQuickView}
              aria-label="Close Quick View"
              className="text-primary hover:bg-primary absolute top-4 right-4 z-30 grid size-11 place-items-center rounded-full bg-white shadow-md transition-all duration-300 hover:rotate-90 hover:text-white"
            >
              <X size={21} />
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* MODAL LEFT */}
              <div className="relative flex min-h-[280px] flex-col items-center justify-center bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff] to-white p-8 sm:min-h-[400px] lg:col-span-4 lg:min-h-full">
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

              {/* MODAL RIGHT */}
              <div className="min-w-0 p-5 sm:p-8 lg:col-span-8 lg:p-10">
                <span className="font-sans text-xs font-bold tracking-[0.15em] text-sky-700 uppercase">
                  {category}
                </span>

                <h2 className="font-heading text-primary mt-2 text-[32px] leading-[1.1] font-semibold sm:text-[42px]">
                  {name}
                </h2>

                {description && (
                  <p className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-slate-600 sm:text-base">
                    {description}
                  </p>
                )}

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

                {/* STRENGTH */}
                <div className="mt-7">
                  <div className="flex flex-wrap gap-2">
                    {variants.map((variant, index) => (
                      <button
                        key={variant.id ?? index}
                        type="button"
                        onClick={() => setModalVariant(index)}
                        aria-pressed={modalVariant === index}
                        className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                          modalVariant === index
                            ? "border-primary bg-primary text-white"
                            : "text-primary hover:border-primary border-slate-200 bg-white"
                        }`}
                      >
                        {variant.label}

                        <span className="ml-2 opacity-75">
                          {money(variant.price)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* BUNDLE & SAVE */}
                <section
                  aria-labelledby={`bundle-title-${product.id}`}
                  className="mt-8"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3
                        id={`bundle-title-${product.id}`}
                        className="font-heading text-primary text-md mt-1 font-semibold"
                      >
                        Bundle & Save
                      </h3>
                    </div>

                    <span className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
                      Up to 15% OFF
                    </span>
                  </div>

                  {/* SAME PRODUCT BUNDLE CARDS */}
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    {packOptions.slice(1).map((pack) => {
                      const selected = selectedPackSize === pack.bottles;

                      const originalPrice = unitPrice * pack.bottles;

                      const packPrice =
                        originalPrice * (1 - pack.discount / 100);

                      return (
                        <button
                          key={pack.bottles}
                          type="button"
                          onClick={() => setSelectedPackSize(pack.bottles)}
                          aria-pressed={selected}
                          className={`group/pack relative flex min-h-[140px] flex-col items-center justify-between overflow-hidden rounded-2xl border px-2 pt-7 pb-3 text-center transition-all duration-300 sm:min-h-[155px] ${
                            selected
                              ? "border-primary bg-[#edf6ff] shadow-[0_0_0_2px_rgba(11,27,63,0.08)]"
                              : "hover:border-primary/50 border-rose-200 bg-white hover:bg-sky-50"
                          }`}
                        >
                          {/* DISCOUNT BADGE */}
                          <span className="absolute top-0 right-3 rounded-b-md bg-rose-100 px-2.5 py-1 text-[9px] font-bold tracking-wide text-rose-600 uppercase sm:right-4">
                            Save {pack.discount}%
                          </span>

                          {/* REPEATED IMAGES OF CURRENT PRODUCT */}
                          <div className="relative mt-2 flex h-[58px] w-full items-center justify-center">
                            {Array.from({
                              length: Math.min(pack.bottles, 3),
                            }).map((_, index, array) => (
                              <div
                                key={index}
                                className="relative h-[55px] w-[37px] shrink-0 first:ml-0 sm:h-[65px] sm:w-[45px] [&:not(:first-child)]:-ml-2"
                                style={{
                                  zIndex: array.length - index,
                                }}
                              >
                                {image && (
                                  <Image
                                    src={image}
                                    alt=""
                                    fill
                                    sizes="45px"
                                    className="object-contain drop-shadow-[0_4px_4px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover/pack:-translate-y-1"
                                  />
                                )}
                              </div>
                            ))}
                          </div>

                          <div className="mt-2">
                            <h4 className="font-heading text-primary text-[13px] font-bold sm:text-[15px]">
                              {pack.bottles} Bottles
                            </h4>
                          </div>

                          {selected && (
                            <span className="bg-primary absolute top-2 left-2 grid size-4 place-items-center rounded-full text-white">
                              <Check size={11} strokeWidth={3} />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* MODAL FOOTER */}
                <div className="mt-8 border-t border-slate-100 pt-6">
                  <div className="flex flex-col gap-3 sm:flex-row">
                    {/* PACK QUANTITY */}
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
                        {money(totalPrice)}

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
