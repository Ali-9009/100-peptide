"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ClipboardList,
  FileCheck2,
  FlaskConical,
  Info,
  Minus,
  Plus,
  ShieldAlert,
  ShoppingBag,
  Truck,
  X,
  ZoomIn,
} from "lucide-react";
import { useCart, formatCartMoney } from "@/context/CartContext";
import {
  PACK_OPTIONS,
  PRODUCT_DETAILS,
  SPEC_LABELS,
  getPackPrice,
  roundMoney,
} from "@/data/product-detail-config";

function SectionEyebrow({ children }) {
  return (
    <span className="text-[10px] font-bold tracking-[0.19em] text-[#3985cb] uppercase">
      {children}
    </span>
  );
}

function Accordion({ label, children, defaultOpen = false }) {
  return (
    <details
      open={defaultOpen ? true : undefined}
      className="group border-b border-[#e1eaf3] py-4"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-[13px] font-semibold text-[#0b1b3f] [&::-webkit-details-marker]:hidden">
        {label}
        <ChevronDown
          size={17}
          className="text-[#6d8cab] transition-transform duration-200 group-open:rotate-180"
        />
      </summary>
      <div className="pt-3 text-[13px] leading-[1.75] text-[#697e97]">
        {children}
      </div>
    </details>
  );
}

function PackArtwork({ image, count }) {
  // 3 visual vials maximum, with the actual count clearly stated beneath.
  const visualCount = Math.min(count, 3);
  return (
    <div className="relative mx-auto mb-3 h-[56px] w-full max-w-[112px]">
      {Array.from({ length: visualCount }, (_, index) => {
        const spread = visualCount === 1 ? 0 : visualCount === 2 ? 25 : 19;
        const offset = index - (visualCount - 1) / 2;
        return (
          <div
            key={index}
            className="absolute top-0 h-[54px] w-[52px]"
            style={{
              left: `calc(50% - 26px + ${offset * spread}px)`,
              zIndex: index + 1,
              transform: `rotate(${offset * 7}deg)`,
            }}
          >
            <Image
              src={image}
              alt=""
              fill
              sizes="52px"
              className="object-contain drop-shadow-[0_7px_7px_rgba(11,27,63,0.12)]"
            />
          </div>
        );
      })}
    </div>
  );
}

function ProductGallery({ product }) {
  const images = useMemo(
    () => [
      ...new Set([product.image, ...(product.gallery || [])].filter(Boolean)),
    ],
    [product],
  );
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    if (!zoomOpen) return;
    const onEscape = (event) => {
      if (event.key === "Escape") setZoomOpen(false);
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [zoomOpen]);

  return (
    <div className="min-w-0">
      <div
        className="relative isolate aspect-[4/4.5] w-full overflow-hidden rounded-[28px] border border-[#deebf8] sm:aspect-[4/4.3] lg:aspect-[4/5]"
        style={{
          background: `radial-gradient(circle at 50% 36%, #ffffff 0%, ${product.tint || "#e8f4ff"} 65%, #c9dff5 100%)`,
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 size-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-1/2 size-[48%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/50"
        />
        {product.badge && (
          <span className="absolute top-5 left-5 z-10 rounded-full border border-white/80 bg-white/75 px-3 py-1.5 text-[10px] font-bold tracking-[0.12em] text-[#357abc] uppercase backdrop-blur-sm">
            {product.badge}
          </span>
        )}
        <button
          type="button"
          onClick={() => setZoomOpen(true)}
          aria-label={`Enlarge ${product.name} image`}
          className="group absolute inset-0 z-10 cursor-zoom-in"
        >
          <div className="absolute inset-[11%] transition-transform duration-700 group-hover:scale-[1.07]">
            <Image
              src={images[selectedImage]}
              alt={`${product.name} research vial`}
              fill
              priority
              sizes="(max-width: 1024px) 90vw, 42vw"
              className="object-contain drop-shadow-[0_32px_32px_rgba(11,27,63,0.16)]"
            />
          </div>
          <span className="absolute right-5 bottom-5 grid size-10 place-items-center rounded-full bg-white/85 text-[#0b1b3f] shadow-sm">
            <ZoomIn size={18} />
          </span>
        </button>
        <div className="pointer-events-none absolute inset-x-[25%] bottom-[9%] h-5 rounded-[50%] bg-[#234c8c]/15 blur-xl" />
      </div>

      {images.length > 1 && (
        <div
          className="mt-3 flex gap-3 overflow-x-auto pb-1"
          aria-label="Product gallery thumbnails"
        >
          {images.map((src, index) => (
            <button
              key={`${src}-${index}`}
              type="button"
              onClick={() => setSelectedImage(index)}
              aria-label={`View product image ${index + 1}`}
              aria-pressed={selectedImage === index}
              className={`relative size-[76px] shrink-0 overflow-hidden rounded-xl border-2 ${selectedImage === index ? "border-[#397fce]" : "border-[#e1eaf5]"}`}
            >
              <div className="absolute inset-0 bg-[#e9f3ff]" />
              <Image
                src={src}
                alt=""
                fill
                sizes="76px"
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      )}
      {zoomOpen && (
        <div
          className="fixed inset-0 z-[250] flex items-center justify-center bg-[#06152d]/85 p-5 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} enlarged image`}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setZoomOpen(false);
          }}
        >
          <button
            type="button"
            onClick={() => setZoomOpen(false)}
            className="absolute top-5 right-5 z-10 grid size-11 place-items-center rounded-full bg-white text-[#0b1b3f]"
            aria-label="Close image preview"
          >
            <X size={20} />
          </button>
          <div className="relative h-[82svh] w-full max-w-[750px]">
            <Image
              src={images[selectedImage]}
              alt={product.name}
              fill
              sizes="90vw"
              className="object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

function PurchasePanel({ product }) {
  const { addItem } = useCart();
  const [variantIndex, setVariantIndex] = useState(product.defaultVariant ?? 0);
  // null means the customer hasn't selected a bundle.
  const [packCount, setPackCount] = useState(null);
  const [packSets, setPackSets] = useState(1);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const variant = product.variants?.[variantIndex] || product.variants?.[0];

  // Only select a pack when the customer explicitly chooses one.
  const pack =
    packCount === null
      ? null
      : PACK_OPTIONS.find((option) => option.quantity === packCount) || null;

  // Default is always one vial.
  const vialCount = pack?.quantity ?? 1;

  const discountPercent = pack?.discountPercent ?? 0;

  const totalBeforeDiscount = roundMoney((variant?.price || 0) * vialCount);

  const pricePerPack = pack
    ? getPackPrice(variant?.price || 0, vialCount, discountPercent)
    : roundMoney(variant?.price || 0);

  const savings = roundMoney(totalBeforeDiscount - pricePerPack);

  const grandTotal = roundMoney(pricePerPack * packSets);

  const maxPacks =
    variant?.stock == null ? 99 : Math.floor(variant.stock / vialCount);

  const canBuy = Boolean(variant?.inStock) && maxPacks >= 1;

  useEffect(() => {
    setPackSets((prev) => Math.max(1, Math.min(prev, maxPacks || 1)));
    setMessage("");
  }, [packCount, variantIndex, maxPacks]);

  const addToCart = () => {
    if (!canBuy || busy) return;

    setBusy(true);
    setMessage("");

    try {
      // DEFAULT: Add normal individual vials.
      if (!pack) {
        addItem(product, variant, packSets);
        return;
      }

      // OPTIONAL: Customer explicitly selected a multi-vial pack.
      const packVariant = {
        ...variant,
        id: `${variant.id}-pack-${pack.quantity}`,
        label: `${variant.label} · ${pack.label}${
          pack.discountPercent ? ` · Save ${pack.discountPercent}%` : ""
        }`,
        price: pricePerPack,
        stock: maxPacks,
        inStock: canBuy,
      };

      // One cart line represents one selected pack.
      addItem(product, packVariant, packSets);
    } catch (error) {
      setMessage(error?.message || "Unable to add this item to the cart.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <aside className="min-w-0 lg:sticky lg:top-24 lg:self-start">
      <div className="rounded-[26px] border border-[#dde9f5] bg-white p-5 shadow-[0_18px_60px_rgba(11,27,63,0.04)] sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="font-heading mt-1 text-[clamp(29px,3vw,37px)] font-semibold tracking-[-0.06em] text-[#0b1b3f]">
              {formatCartMoney(grandTotal)}
            </div>
            {savings > 0 && (
              <p className="mt-1 text-[11px] font-semibold text-[#27825f]">
                You save {formatCartMoney(savings * packSets)}
              </p>
            )}
          </div>
          <span
            className={`rounded-full px-3 py-1.5 text-[11px] font-semibold ${canBuy ? "bg-[#e5f5ee] text-[#27825f]" : "bg-[#fff0ee] text-[#c25d4b]"}`}
          >
            {canBuy ? "In stock" : "Out of stock"}
          </span>
        </div>

        <fieldset className="mt-7">
          <legend className="mb-3 text-sm font-semibold text-[#0b1b3f]">
            Select strength
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {product.variants.map((option, index) => {
              const available =
                option.inStock && (option.stock == null || option.stock > 0);
              const selected = variant?.id === option.id;
              return (
                <label
                  key={option.id}
                  className={`relative flex min-h-14 cursor-pointer flex-col justify-center rounded-xl border px-3.5 transition-all ${selected ? "border-[#0b1b3f] bg-[#0b1b3f] text-white" : "border-[#dce7f2] bg-[#f8fbff] text-[#0b1b3f] hover:border-[#8dbbe8]"} ${!available ? "cursor-not-allowed opacity-40" : ""}`}
                >
                  <input
                    type="radio"
                    className="sr-only"
                    name={`pdp-variant-${product.id}`}
                    checked={selected}
                    disabled={!available}
                    onChange={() => {
                      setVariantIndex(index);
                      setPackSets(1);
                    }}
                  />
                  <span className="text-[13px] font-semibold">
                    {option.label}
                  </span>
                  <span
                    className={`mt-1 text-[11px] ${selected ? "text-white/70" : "text-[#7791aa]"}`}
                  >
                    {formatCartMoney(option.price)} / vial
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="mt-7">
          <legend className="mb-3 text-sm font-semibold text-[#0b1b3f]">
            Choose your pack
          </legend>
          <div className="grid grid-cols-2 gap-2.5">
            {PACK_OPTIONS.map((option) => {
              const selected = packCount === option.quantity;
              const affordable =
                variant?.stock == null || variant.stock >= option.quantity;
              return (
                <label
                  key={option.quantity}
                  className={`relative cursor-pointer overflow-hidden rounded-[16px] border-2 px-2 py-3 text-center transition-all ${selected ? "border-[#397fce] bg-[#edf6ff] shadow-[0_4px_12px_rgba(57,127,206,0.1)]" : "border-[#e1eaf4] bg-white hover:border-[#9ac6ef]"} ${!affordable || !variant?.inStock ? "cursor-not-allowed opacity-40" : ""}`}
                >
                  <input
                    type="radio"
                    name={`pdp-pack-${product.id}`}
                    checked={selected}
                    disabled={!affordable || !variant?.inStock}
                    onChange={() => {
                      setPackCount(option.quantity);
                      setPackSets(1);
                    }}
                    className="sr-only"
                  />
                  {option.discountPercent > 0 && (
                    <span className="absolute top-1.5 right-1.5 rounded-md bg-[#dceeff] px-1.5 py-1 text-[9px] font-extrabold text-[#2876bf]">
                      -{option.discountPercent}%
                    </span>
                  )}
                  <PackArtwork image={product.image} count={option.quantity} />
                  <span className="font-heading block text-[14px] font-bold text-[#0b1b3f]">
                    {option.label}
                  </span>
                  <span className="mt-1 block text-[11px] font-semibold text-[#357fc5]">
                    {formatCartMoney(
                      getPackPrice(
                        variant?.price || 0,
                        option.quantity,
                        option.discountPercent,
                      ),
                    )}
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#0b1b3f]">
              Number of packs
            </p>
            <p className="mt-0.5 text-sm text-[#899caf]">
              {packSets * vialCount} total{" "}
              {packSets * vialCount === 1 ? "vial" : "vials"}
            </p>
          </div>
          <div className="flex h-11 items-center overflow-hidden rounded-full border border-[#dce7f2] bg-white">
            <button
              type="button"
              onClick={() => setPackSets((n) => Math.max(1, n - 1))}
              disabled={packSets <= 1}
              className="grid size-10 place-items-center text-[#0b1b3f] hover:bg-[#f2f8ff] disabled:opacity-35"
              aria-label="Decrease number of packs"
            >
              <Minus size={15} />
            </button>
            <span className="w-7 text-center text-[13px] font-bold text-[#0b1b3f]">
              {packSets}
            </span>
            <button
              type="button"
              onClick={() => setPackSets((n) => Math.min(maxPacks, n + 1))}
              disabled={!canBuy || packSets >= maxPacks}
              className="grid size-10 place-items-center text-[#0b1b3f] hover:bg-[#f2f8ff] disabled:opacity-35"
              aria-label="Increase number of packs"
            >
              <Plus size={15} />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={addToCart}
          disabled={!canBuy || busy}
          className="mt-6 flex min-h-[54px] w-full items-center justify-center gap-3 rounded-full bg-[#0b1b3f] px-5 text-[13px] font-bold tracking-[0.08em] text-white uppercase transition-colors hover:bg-[#245393] disabled:cursor-not-allowed disabled:bg-[#b1c0d0]"
        >
          <ShoppingBag size={18} />{" "}
          {canBuy
            ? `Add to Cart · ${formatCartMoney(grandTotal)}`
            : "Unavailable"}
        </button>
        {message && (
          <p role="alert" className="mt-3 text-[12px] text-red-600">
            {message}
          </p>
        )}
        <div className="mt-4 flex items-center justify-center gap-2 text-[11px] font-medium text-[#788da5]">
          <ShieldAlert size={15} /> For laboratory research use only
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-[11px] text-[#6d819b]">
        <a
          href="#shipping-info"
          className="flex items-center gap-2 rounded-2xl border border-[#dde9f5] bg-white p-3 hover:text-[#397fce]"
        >
          <Truck size={18} className="shrink-0 text-[#397fce]" /> Shipping
          information
        </a>
        <a
          href="#certificate"
          className="flex items-center gap-2 rounded-2xl border border-[#dde9f5] bg-white p-3 hover:text-[#397fce]"
        >
          <FileCheck2 size={18} className="shrink-0 text-[#397fce]" /> Batch
          documents
        </a>
      </div>
    </aside>
  );
}

function Specifications({ product, details }) {
  const specs = details.specifications || {};
  const filled = SPEC_LABELS.filter(([key]) => specs[key]);
  return (
    <section
      id="specifications"
      className="scroll-mt-28 rounded-[28px] border border-[#deebf7] bg-white p-5 sm:p-8"
    >
      <SectionEyebrow>Technical information</SectionEyebrow>
      <h2 className="font-heading mt-2 text-[clamp(27px,3vw,38px)] font-semibold tracking-[-0.05em] text-[#0b1b3f]">
        Product specifications.
      </h2>
      <p className="mt-3 max-w-2xl text-[13px] leading-[1.75] text-[#71869d]">
        Declared details are shown only when verified for this specific
        compound. Measured batch findings should be checked against the
        applicable lot certificate.
      </p>
      <dl className="mt-6 divide-y divide-[#e7eef6] border-t border-[#e7eef6]">
        <div className="grid grid-cols-2 gap-4 py-3.5 text-[13px]">
          <dt className="font-semibold text-[#69809a]">Compound</dt>
          <dd className="text-right font-semibold text-[#0b1b3f]">
            {product.name}
          </dd>
        </div>
        <div className="grid grid-cols-2 gap-4 py-3.5 text-[13px]">
          <dt className="font-semibold text-[#69809a]">Category</dt>
          <dd className="text-right font-semibold text-[#0b1b3f]">
            {product.category}
          </dd>
        </div>
        <div className="grid grid-cols-2 gap-4 py-3.5 text-[13px]">
          <dt className="font-semibold text-[#69809a]">Available strengths</dt>
          <dd className="text-right font-semibold text-[#0b1b3f]">
            {product.variants.map((v) => v.label).join(" · ")}
          </dd>
        </div>
        {filled.map(([key, label]) => (
          <div key={key} className="grid grid-cols-2 gap-4 py-3.5 text-[13px]">
            <dt className="font-semibold text-[#69809a]">{label}</dt>
            <dd className="text-right font-semibold text-[#0b1b3f]">
              {specs[key]}
            </dd>
          </div>
        ))}
      </dl>
      {!filled.length && (
        <div className="mt-5 flex gap-3 rounded-2xl bg-[#f2f8ff] p-4 text-[12px] leading-relaxed text-[#55718f]">
          <Info size={18} className="mt-0.5 shrink-0 text-[#397fce]" />
          <span>
            Sequence, formula, CAS, analytical results and handling parameters
            have not been verified for this listing. Do not treat unrelated
            compound examples as this product's specifications.
          </span>
        </div>
      )}
    </section>
  );
}

function RelatedProducts({ related }) {
  if (!related.length) return null;
  return (
    <section aria-labelledby="related-products" className="mt-14">
      <SectionEyebrow>Continue exploring</SectionEyebrow>
      <h2
        id="related-products"
        className="font-heading mt-2 text-[clamp(28px,3vw,40px)] font-semibold tracking-[-0.05em] text-[#0b1b3f]"
      >
        You might also explore.
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {related.map((item) => (
          <Link
            href={`/products/${item.slug}`}
            key={item.id}
            className="group flex items-center gap-4 rounded-[22px] border border-[#e1eaf4] bg-white p-4 hover:border-[#a8cfef]"
          >
            <div
              className="relative size-[92px] shrink-0 overflow-hidden rounded-2xl"
              style={{ background: item.tint || "#eef6ff" }}
            >
              <Image
                src={item.image}
                alt=""
                fill
                sizes="92px"
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold tracking-widest text-[#397fce] uppercase">
                {item.category}
              </p>
              <h3 className="font-heading mt-1 text-[17px] font-bold text-[#0b1b3f]">
                {item.name}
              </h3>
              <p className="mt-1 text-[11px] text-[#7c8fa5]">
                From{" "}
                {formatCartMoney(
                  Math.min(...item.variants.map((v) => v.price)),
                )}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#397fce]">
                View compound <ArrowUpRight size={14} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function ProductDetailClient({ product, related = [] }) {
  const details = PRODUCT_DETAILS[product.slug] || {
    overview: product.description,
    specifications: {},
    coaUrl: null,
  };
  return (
    <main className="min-h-svh bg-[linear-gradient(to_bottom,#f7faff_0%,#ffffff_100%)] px-4 pt-28 pb-20 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex items-center gap-2 text-[12px] text-[#7690a9]"
        >
          <Link href="/" className="hover:text-[#397fce]">
            Home
          </Link>
          <ArrowRight size={13} />
          <Link href="/shop" className="hover:text-[#397fce]">
            Shop
          </Link>
          <ArrowRight size={13} />
          <span className="font-semibold text-[#0b1b3f]">{product.name}</span>
        </nav>
        <div className="grid min-w-0 items-start gap-6 lg:grid-cols-[minmax(220px,0.7fr)_minmax(330px,1.15fr)_minmax(330px,0.95fr)] lg:items-start lg:gap-6 xl:gap-9">
          {/* Mobile order: gallery, info, purchase. Desktop: info, gallery, purchase. */}
          <div className="order-2 min-w-0 lg:sticky lg:top-28 lg:order-1 lg:self-start lg:pt-4">
            <SectionEyebrow>{product.category}</SectionEyebrow>
            <h1 className="font-heading mt-3 text-[clamp(35px,4.2vw,60px)] leading-[1.04] font-semibold tracking-[-0.065em] text-[#0b1b3f]">
              {product.name}
            </h1>
            <p className="mt-4 text-[14px] leading-[1.8] text-[#71859d]">
              {details.overview || product.description}
            </p>
            <div className="mt-7 flex items-center gap-2.5 rounded-2xl border border-[#dbe9f7] bg-white p-3.5">
              <FlaskConical size={19} className="shrink-0 text-[#397fce]" />
              <span className="text-[12px] font-semibold text-[#2a507b]">
                For laboratory research use only
              </span>
            </div>
            <div className="mt-7 border-t border-[#e1eaf3]">
              <Accordion label="Compound information" defaultOpen>
                <p>{product.description}</p>
                <a
                  href="#specifications"
                  className="mt-2 inline-flex items-center gap-1 font-semibold text-[#397fce]"
                >
                  View technical specifications <ArrowUpRight size={14} />
                </a>
              </Accordion>
              <Accordion label="Specifications & storage">
                <p>
                  Product-specific handling and analytical parameters appear in
                  the specification section when verified.
                </p>
                <a
                  href="#specifications"
                  className="mt-2 inline-flex items-center gap-1 font-semibold text-[#397fce]"
                >
                  View specifications <ArrowUpRight size={14} />
                </a>
              </Accordion>
              <Accordion label="Certificate of Analysis">
                <p>
                  Check the corresponding lot certificate for measured results.
                  Availability is displayed below.
                </p>
                <a
                  href="#certificate"
                  className="mt-2 inline-flex items-center gap-1 font-semibold text-[#397fce]"
                >
                  View batch documentation <ArrowUpRight size={14} />
                </a>
              </Accordion>
              <Accordion label="Shipping & order support">
                <p>
                  Shipping estimates depend on destination and carrier. Tracking
                  details are provided when available for the order.
                </p>
                <a
                  href="#shipping-info"
                  className="mt-2 inline-flex items-center gap-1 font-semibold text-[#397fce]"
                >
                  Shipping and support <ArrowUpRight size={14} />
                </a>
              </Accordion>
            </div>
          </div>
          <div className="order-1 min-w-0 lg:sticky lg:top-28 lg:order-2 lg:self-start">
            <ProductGallery product={product} />
          </div>
          <div className="order-3 min-w-0 lg:sticky lg:top-28 lg:self-start">
            <PurchasePanel product={product} />
          </div>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
          <Specifications product={product} details={details} />
          <div className="grid gap-5">
            <section
              id="certificate"
              className="scroll-mt-28 rounded-[26px] border border-[#deebf7] bg-white p-5 sm:p-7"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-[#e9f4ff] text-[#397fce]">
                <FileCheck2 size={23} />
              </span>
              <h2 className="font-heading mt-4 text-[24px] font-bold tracking-[-0.04em] text-[#0b1b3f]">
                Certificate of Analysis
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#71869d]">
                Analytical results should be checked against the certificate for
                the specific product lot.
              </p>
              {details.coaUrl ? (
                <a
                  href={details.coaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 text-[13px] font-semibold text-[#397fce]"
                >
                  View lot certificate <ArrowUpRight size={16} />
                </a>
              ) : (
                <span className="mt-5 inline-flex rounded-full border border-[#dce7f3] bg-[#f4f8fc] px-3 py-2 text-[11px] font-semibold text-[#6d819a]">
                  Lot certificate not linked
                </span>
              )}
            </section>
            <section
              id="shipping-info"
              className="scroll-mt-28 rounded-[26px] border border-[#deebf7] bg-white p-5 sm:p-7"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-[#e9f4ff] text-[#397fce]">
                <Truck size={23} />
              </span>
              <h2 className="font-heading mt-4 text-[24px] font-bold tracking-[-0.04em] text-[#0b1b3f]">
                Shipping & order support
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[#71869d]">
                Delivery options and rates are calculated at checkout. Once
                dispatched, order tracking should be supplied through your
                store's fulfillment system.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/checkout"
                  className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#397fce]"
                >
                  Checkout <ArrowUpRight size={14} />
                </Link>
                <Link
                  href="/cart"
                  className="inline-flex items-center gap-1 text-[12px] font-semibold text-[#397fce]"
                >
                  View cart <ArrowUpRight size={14} />
                </Link>
              </div>
            </section>
          </div>
        </div>
        <section
          className="mt-6 rounded-[26px] border border-[#bfddf5] bg-[#eaf5ff] p-5 sm:p-7"
          aria-label="Important research notice"
        >
          <div className="flex items-start gap-4">
            <ShieldAlert size={23} className="mt-0.5 shrink-0 text-[#397fce]" />
            <div>
              <h2 className="font-heading text-[20px] font-bold text-[#0b1b3f]">
                Important research notice
              </h2>
              <p className="mt-2 max-w-4xl text-[13px] leading-[1.8] text-[#4a6584]">
                For laboratory research use only. Not for human, veterinary, or
                food use. This information is provided for research reference,
                not as medical advice or therapeutic claims. Purchasers are
                responsible for applicable laws, handling requirements, and
                institutional policies.
              </p>
            </div>
          </div>
        </section>
        <RelatedProducts related={related} />
      </div>
    </main>
  );
}
