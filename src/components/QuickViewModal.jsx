"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  X,
  Plus,
  Minus,
  Check,
  ShoppingBag,
  ArrowRight,
  FlaskConical,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { PACK_OPTIONS, getPackPrice } from "@/data/product-detail-config";

const money = (value) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

export default function QuickViewModal({ product, open, onClose }) {
  const { addItem } = useCart();

  const variants = product?.variants || [];

  const [selectedVariant, setSelectedVariant] = useState(
    product?.defaultVariant ?? 0,
  );

  const [selectedPackSize, setSelectedPackSize] = useState(1);
  const [quantity, setQuantity] = useState(1);

  const currentVariant = variants[selectedVariant] || variants[0];

  const selectedPack =
    PACK_OPTIONS.find((pack) => pack.quantity === selectedPackSize) ||
    PACK_OPTIONS[0];

  const unitPrice = Number(currentVariant?.price || 0);

  const packPrice = getPackPrice(
    unitPrice,
    selectedPack.quantity,
    selectedPack.discountPercent,
  );

  const totalPrice = packPrice * quantity;

  const availableStock = Number(currentVariant?.stock ?? Infinity);

  const maxPacks = Math.floor(availableStock / selectedPack.quantity);

  const isAvailable =
    Boolean(currentVariant) &&
    currentVariant.inStock !== false &&
    maxPacks >= quantity;

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  useEffect(() => {
    setQuantity(1);
  }, [selectedVariant, selectedPackSize]);

  if (!open || !product) return null;

  const handleAddToCart = () => {
    if (!isAvailable) return;

    const cartVariant =
      selectedPack.quantity === 1
        ? currentVariant
        : {
            ...currentVariant,
            id: `${currentVariant.id}-pack-${selectedPack.quantity}`,
            label: `${currentVariant.label} · ${selectedPack.quantity} Vials · Save ${selectedPack.discountPercent}%`,
            price: packPrice,
            stock: maxPacks,
            inStock: maxPacks > 0,
          };

    addItem(product, cartVariant, quantity);

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#07152f]/65 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${product.name} Quick View`}
        className="relative max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl"
      >
        {/* CLOSE */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Quick View"
          className="text-primary hover:bg-primary absolute top-4 right-4 z-30 grid size-11 place-items-center rounded-full bg-white shadow-md transition-all duration-300 hover:rotate-90 hover:text-white"
        >
          <X size={21} />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT — PRODUCT IMAGE */}
          <div className="relative flex min-h-[280px] flex-col items-center justify-center bg-gradient-to-b from-[#e0f2fe] via-[#f0f9ff] to-white p-8 sm:min-h-[400px] lg:col-span-4 lg:min-h-full">
            <div className="relative h-[240px] w-full max-w-[300px] sm:h-[340px]">
              {product.image && (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 260px, 340px"
                  className="object-contain drop-shadow-[0_25px_25px_rgba(11,27,63,0.15)]"
                />
              )}
            </div>

            <div className="text-primary mt-5 flex items-center gap-2 rounded-full border border-sky-200 bg-white/80 px-4 py-2 text-sm font-medium">
              <FlaskConical size={17} />
              For Laboratory Research
            </div>
          </div>

          {/* RIGHT — PRODUCT DETAILS */}
          <div className="min-w-0 p-5 sm:p-8 lg:col-span-8 lg:p-10">
            <span className="text-xs font-bold tracking-[0.15em] text-sky-700 uppercase">
              {product.category}
            </span>

            <h2 className="font-heading text-primary mt-2 text-[32px] leading-[1.1] font-semibold sm:text-[42px]">
              {product.name}
            </h2>

            {product.description && (
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base">
                {product.description}
              </p>
            )}

            {/* STRENGTH SELECTION */}
            <div className="mt-7">
              <span className="text-primary mb-3 block text-xs font-bold tracking-wider uppercase">
                Select Strength
              </span>

              <div className="flex flex-wrap gap-2">
                {variants.map((variant, index) => (
                  <button
                    key={variant.id}
                    type="button"
                    onClick={() => setSelectedVariant(index)}
                    aria-pressed={selectedVariant === index}
                    className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                      selectedVariant === index
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

            {/* MULTIPACK SELECTION */}
            <section className="mt-8">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="font-heading text-primary text-lg font-semibold">
                  Bundle & Save
                </h3>

                <span className="rounded-full bg-sky-50 px-3 py-1.5 text-xs font-semibold text-sky-700">
                  Up to 15% OFF
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
                {PACK_OPTIONS.map((pack) => {
                  const selected = selectedPackSize === pack.quantity;

                  const price = getPackPrice(
                    unitPrice,
                    pack.quantity,
                    pack.discountPercent,
                  );

                  return (
                    <button
                      key={pack.quantity}
                      type="button"
                      onClick={() => setSelectedPackSize(pack.quantity)}
                      aria-pressed={selected}
                      className={`group/pack relative flex min-h-[150px] flex-col items-center justify-between overflow-hidden rounded-2xl border px-2 pt-7 pb-3 text-center transition-all duration-300 ${
                        selected
                          ? "border-primary bg-[#edf6ff] shadow-[0_0_0_2px_rgba(11,27,63,0.08)]"
                          : "hover:border-primary/50 border-slate-200 bg-white hover:bg-sky-50"
                      }`}
                    >
                      {/* DISCOUNT BADGE */}
                      {pack.discountPercent > 0 && (
                        <span className="absolute top-0 right-3 rounded-b-md bg-sky-100 px-2.5 py-1 text-[9px] font-bold tracking-wide text-sky-700 uppercase">
                          Save {pack.discountPercent}%
                        </span>
                      )}

                      {/* PRODUCT IMAGES */}
                      <div className="relative mt-2 flex h-11 w-full items-center justify-center">
                        {Array.from({
                          length: Math.min(pack.quantity, 3),
                        }).map((_, index, array) => (
                          <div
                            key={index}
                            className="relative h-[55px] w-[37px] shrink-0 first:ml-0 sm:h-[65px] sm:w-[45px] [&:not(:first-child)]:-ml-2"
                            style={{
                              zIndex: array.length - index,
                            }}
                          >
                            {product.image && (
                              <Image
                                src={product.image}
                                alt=""
                                fill
                                sizes="45px"
                                className="object-contain drop-shadow-[0_4px_4px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover/pack:-translate-y-1"
                              />
                            )}
                          </div>
                        ))}
                      </div>

                      {/* PACK INFO */}
                      <div className="mt-3">
                        <h4 className="font-heading text-primary text-[13px] font-bold sm:text-[15px]">
                          {pack.label}
                        </h4>

                        <span className="mt-1 block text-xs font-semibold text-sky-700">
                          {money(price)}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* FOOTER */}
            <div className="mt-8 border-t border-slate-100 pt-6">
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

                  <span className="text-primary text-sm font-semibold">
                    {quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setQuantity((q) => Math.min(maxPacks, q + 1))
                    }
                    disabled={quantity >= maxPacks}
                    aria-label="Increase quantity"
                    className="text-primary grid size-10 place-items-center rounded-full transition hover:bg-white disabled:opacity-40"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                {/* ADD TO CART */}
                <button
                  type="button"
                  disabled={!isAvailable}
                  onClick={handleAddToCart}
                  className="group/btn bg-primary flex min-h-[54px] flex-1 items-center justify-between gap-4 rounded-full px-6 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#234b8c] disabled:cursor-not-allowed disabled:opacity-50"
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
  );
}
