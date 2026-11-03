"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import Link from "next/link";
import QuickViewModal from "@/components/QuickViewModal";
import { useCart } from "@/context/CartContext";

import { ShoppingBag, Star, Eye } from "lucide-react";

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

  const { addItem } = useCart();

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
          {/* QUICK VIEW BUTTON */}
          <button
            type="button"
            onClick={openQuickView}
            aria-label={`Quick view ${name}`}
            title={`Quick view ${name}`}
            className="text-primary hover:bg-primary absolute top-3 right-3 z-20 grid size-10 place-items-center rounded-full bg-white shadow-sm transition-all duration-300 hover:scale-110 hover:text-white"
          >
            <Eye size={20} strokeWidth={1.8} />
          </button>

          {/* PRODUCT DETAIL PAGE LINK */}
          <Link
            href={`/products/${product.slug}`}
            aria-label={`View ${name} product details`}
            className="absolute inset-0 z-10 block"
          >
            {image && (
              <Image
                src={image}
                alt={name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 350px"
                className="object-contain p-5 transition-transform duration-700 group-hover:scale-105 sm:p-6"
              />
            )}
          </Link>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="flex flex-1 flex-col px-1 pt-5 pb-1">
          <span className="font-sans text-xs font-semibold tracking-[0.12em] text-sky-700 uppercase">
            {category}
          </span>

          <h3 className="font-heading text-primary mt-2 text-[23px] leading-tight font-semibold">
            <Link
              href={`/products/${product.slug}`}
              className="transition-colors duration-300 hover:text-[#397fce]"
            >
              {name}
            </Link>
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
                disabled={
                  !currentVariant ||
                  currentVariant.inStock === false ||
                  currentVariant.stock === 0
                }
                onClick={() => addItem(product, currentVariant, 1)}
                className="bg-primary flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[#234b8c] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ShoppingBag size={17} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </article>

      <QuickViewModal
        product={product}
        open={isQuickViewOpen}
        onClose={closeQuickView}
      />
    </>
  );
}
