"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  FlaskConical,
  LockKeyhole,
  Mail,
  MapPin,
  Package,
  ShieldCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { CART_SETTINGS, formatCartMoney, useCart } from "@/context/CartContext";
import FreeShippingProgress from "@/components/cart/FreeShippingProgress";

// Replace these display estimates with actual carrier quotes before enabling checkout.
const STANDARD_SHIPPING_ESTIMATE = 9.95;
const US_STATES = [
  ["AL", "Alabama"],
  ["AK", "Alaska"],
  ["AZ", "Arizona"],
  ["AR", "Arkansas"],
  ["CA", "California"],
  ["CO", "Colorado"],
  ["CT", "Connecticut"],
  ["DE", "Delaware"],
  ["FL", "Florida"],
  ["GA", "Georgia"],
  ["HI", "Hawaii"],
  ["ID", "Idaho"],
  ["IL", "Illinois"],
  ["IN", "Indiana"],
  ["IA", "Iowa"],
  ["KS", "Kansas"],
  ["KY", "Kentucky"],
  ["LA", "Louisiana"],
  ["ME", "Maine"],
  ["MD", "Maryland"],
  ["MA", "Massachusetts"],
  ["MI", "Michigan"],
  ["MN", "Minnesota"],
  ["MS", "Mississippi"],
  ["MO", "Missouri"],
  ["MT", "Montana"],
  ["NE", "Nebraska"],
  ["NV", "Nevada"],
  ["NH", "New Hampshire"],
  ["NJ", "New Jersey"],
  ["NM", "New Mexico"],
  ["NY", "New York"],
  ["NC", "North Carolina"],
  ["ND", "North Dakota"],
  ["OH", "Ohio"],
  ["OK", "Oklahoma"],
  ["OR", "Oregon"],
  ["PA", "Pennsylvania"],
  ["RI", "Rhode Island"],
  ["SC", "South Carolina"],
  ["SD", "South Dakota"],
  ["TN", "Tennessee"],
  ["TX", "Texas"],
  ["UT", "Utah"],
  ["VT", "Vermont"],
  ["VA", "Virginia"],
  ["WA", "Washington"],
  ["WV", "West Virginia"],
  ["WI", "Wisconsin"],
  ["WY", "Wyoming"],
];

function Field({ id, label, error, className = "", ...props }) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-semibold text-[#243b60]"
      >
        {label}
      </label>
      <input
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`h-12 w-full rounded-xl border bg-[#f8fbff] px-4 text-sm text-[#0b1b3f] transition outline-none focus:border-[#539ae2] focus:ring-2 focus:ring-[#539ae2]/15 ${error ? "border-red-400" : "border-[#dce8f5]"}`}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

function SectionHeading({ icon: Icon, step, title, subtitle }) {
  return (
    <div className="mb-6 flex items-start gap-3">
      <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-[#ebf5ff] text-[#357fc5]">
        <Icon size={20} strokeWidth={1.7} />
      </span>
      <div>
        <span className="text-[10px] font-bold tracking-[0.16em] text-[#5c9bda] uppercase">
          Step {step}
        </span>
        <h2 className="font-heading mt-0.5 text-2xl font-semibold tracking-[-0.04em] text-[#0b1b3f]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-xs leading-relaxed text-[#8293aa]">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

export default function CheckoutClient() {
  const { items, hydrated, subtotal, itemCount, qualifiesForFreeShipping } =
    useCart();
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    company: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    phone: "",
    country: "US",
  });
  const [errors, setErrors] = useState({});
  const [consent, setConsent] = useState(false);
  const [reviewed, setReviewed] = useState(false);

  const shippingEstimate = qualifiesForFreeShipping
    ? 0
    : STANDARD_SHIPPING_ESTIMATE;
  const estimatedTotal = subtotal + shippingEstimate;
  const freeShipping = qualifiesForFreeShipping;
  const update = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: undefined }));
    setReviewed(false);
  };

  const validate = () => {
    const next = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      next.email = "Enter a valid email address.";
    for (const key of ["firstName", "lastName", "address", "city", "state"]) {
      if (!form[key].trim()) next[key] = "This field is required.";
    }
    if (!/^\d{5}(-\d{4})?$/.test(form.zip.trim()))
      next.zip = "Enter a valid US ZIP code.";
    if (form.phone && !/^[\d\s()+.-]{7,20}$/.test(form.phone))
      next.phone = "Enter a valid phone number.";
    if (!consent)
      next.consent = "Please confirm the research-use acknowledgement.";
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const id = Object.keys(next)[0];
      document.getElementById(id)?.focus();
      return;
    }
    setReviewed(true);
  };

  const canContinue = hydrated && items.length > 0;

  return (
    <main className="min-h-svh bg-[#f6faff] px-4 pt-24 pb-20 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 flex items-center gap-2 text-xs text-[#7188a4]"
        >
          <Link href="/" className="hover:text-[#397fce]">
            Home
          </Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-[#397fce]">
            Cart
          </Link>
          <span>/</span>
          <span className="font-semibold text-[#0b1b3f]">Checkout</span>
        </nav>

        <header className="mb-9 flex flex-col gap-4 border-b border-[#dce8f5] pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="font-heading text-[clamp(36px,5vw,60px)] leading-[1.05] font-semibold tracking-[-0.06em]">
              Research <span className="text-[#397fce]">checkout.</span>
            </h1>
            <p className="mt-3 text-sm text-[#7188a4]">
              Review your selection and enter delivery details.
            </p>
          </div>
          <Link
            href="/cart"
            className="inline-flex items-center gap-2 self-start text-sm font-semibold transition-colors hover:text-[#397fce]"
          >
            <ArrowLeft size={17} /> Return to cart
          </Link>
        </header>

        {!hydrated ? (
          <div className="rounded-3xl border border-[#dce8f5] bg-white p-10 text-center text-sm text-[#7188a4]">
            Loading your cart...
          </div>
        ) : items.length === 0 ? (
          <section className="flex min-h-[340px] flex-col items-center justify-center rounded-3xl border border-[#dce8f5] bg-white p-8 text-center">
            <ShoppingBag size={34} className="text-[#397fce]" />
            <h2 className="font-heading mt-5 text-3xl font-semibold">
              Your cart is empty
            </h2>
            <p className="mt-2 text-sm text-[#7188a4]">
              Add some research products before proceeding to checkout.
            </p>
            <Link
              href="/shop"
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-full bg-[#0b1b3f] px-6 text-sm font-semibold text-white"
            >
              Explore products <ArrowRight size={16} />
            </Link>
          </section>
        ) : (
          <div className="grid items-start gap-7 lg:grid-cols-[minmax(0,1fr)_390px] lg:gap-9">
            <div className="space-y-5">
              <section
                aria-labelledby="contact-title"
                className="rounded-[26px] border border-[#e0eaf5] bg-white p-5 shadow-[0_12px_40px_rgba(11,27,63,0.025)] sm:p-7"
              >
                <SectionHeading
                  icon={Mail}
                  step="01"
                  title="Contact information"
                  subtitle="We'll use this to contact you about your order."
                />
                <div id="contact-title" className="sr-only">
                  Contact information
                </div>
                <Field
                  id="email"
                  label="Email address *"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={update}
                  autoComplete="email"
                  placeholder="you@example.com"
                  error={errors.email}
                  required
                />
              </section>

              <section
                aria-label="Shipping address"
                className="rounded-[26px] border border-[#e0eaf5] bg-white p-5 shadow-[0_12px_40px_rgba(11,27,63,0.025)] sm:p-7"
              >
                <SectionHeading
                  icon={MapPin}
                  step="02"
                  title="Shipping address"
                  subtitle="Currently designed for US shipping addresses."
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    id="firstName"
                    label="First name *"
                    name="firstName"
                    value={form.firstName}
                    onChange={update}
                    autoComplete="given-name"
                    error={errors.firstName}
                    required
                  />
                  <Field
                    id="lastName"
                    label="Last name *"
                    name="lastName"
                    value={form.lastName}
                    onChange={update}
                    autoComplete="family-name"
                    error={errors.lastName}
                    required
                  />
                  <Field
                    id="company"
                    label="Company / laboratory (optional)"
                    name="company"
                    value={form.company}
                    onChange={update}
                    autoComplete="organization"
                    className="sm:col-span-2"
                  />
                  <Field
                    id="address"
                    label="Street address *"
                    name="address"
                    value={form.address}
                    onChange={update}
                    autoComplete="address-line1"
                    error={errors.address}
                    className="sm:col-span-2"
                    required
                  />
                  <Field
                    id="apartment"
                    label="Apartment, suite, etc. (optional)"
                    name="apartment"
                    value={form.apartment}
                    onChange={update}
                    autoComplete="address-line2"
                    className="sm:col-span-2"
                  />
                  <Field
                    id="city"
                    label="City *"
                    name="city"
                    value={form.city}
                    onChange={update}
                    autoComplete="address-level2"
                    error={errors.city}
                    required
                  />
                  <div>
                    <label
                      htmlFor="state"
                      className="mb-2 block text-xs font-semibold text-[#243b60]"
                    >
                      State *
                    </label>
                    <div className="relative">
                      <select
                        id="state"
                        name="state"
                        value={form.state}
                        onChange={update}
                        autoComplete="address-level1"
                        required
                        aria-invalid={Boolean(errors.state)}
                        className={`h-12 w-full appearance-none rounded-xl border bg-[#f8fbff] px-4 pr-10 text-sm text-[#0b1b3f] outline-none focus:border-[#539ae2] focus:ring-2 focus:ring-[#539ae2]/15 ${errors.state ? "border-red-400" : "border-[#dce8f5]"}`}
                      >
                        <option value="">Select state</option>
                        {US_STATES.map(([code, name]) => (
                          <option key={code} value={code}>
                            {name}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        size={16}
                        className="pointer-events-none absolute top-4 right-4 text-[#7188a4]"
                      />
                    </div>
                    {errors.state && (
                      <p className="mt-1.5 text-xs text-red-600">
                        {errors.state}
                      </p>
                    )}
                  </div>
                  <Field
                    id="zip"
                    label="ZIP code *"
                    name="zip"
                    value={form.zip}
                    onChange={update}
                    autoComplete="postal-code"
                    inputMode="numeric"
                    error={errors.zip}
                    required
                  />
                  <Field
                    id="phone"
                    label="Phone (optional)"
                    name="phone"
                    type="tel"
                    value={form.phone}
                    onChange={update}
                    autoComplete="tel"
                    error={errors.phone}
                  />
                </div>
              </section>

              <section
                aria-label="Shipping method"
                className="rounded-[26px] border border-[#e0eaf5] bg-white p-5 shadow-[0_12px_40px_rgba(11,27,63,0.025)] sm:p-7"
              >
                <SectionHeading
                  icon={Truck}
                  step="03"
                  title="Delivery method"
                  subtitle="Shipping costs are estimates until carrier rates are connected."
                />
                <div className="flex items-center gap-4 rounded-2xl border-2 border-[#5a9ddd] bg-[#f0f8ff] p-4">
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-[#397fce]">
                    <Package size={20} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">
                      Standard tracked shipping
                    </p>
                    <p className="mt-1 text-xs text-[#7188a4]">
                      US delivery · estimated rate
                    </p>
                  </div>
                  <strong className="text-sm">
                    {freeShipping ? "FREE" : formatCartMoney(shippingEstimate)}
                  </strong>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-[#8293aa]">
                  Free shipping applies when merchandise subtotal reaches{" "}
                  {formatCartMoney(CART_SETTINGS.freeShippingThreshold)}. Taxes
                  and final shipping rates are not yet calculated.
                </p>
              </section>

              <section
                aria-label="Research acknowledgement"
                className="rounded-[26px] border border-[#e0eaf5] bg-white p-5 sm:p-7"
              >
                <div className="flex items-start gap-3">
                  <input
                    id="consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(event) => {
                      setConsent(event.target.checked);
                      setErrors((old) => ({ ...old, consent: undefined }));
                      setReviewed(false);
                    }}
                    className="mt-1 size-4 accent-[#0b1b3f]"
                  />
                  <label
                    htmlFor="consent"
                    className="text-sm leading-relaxed text-[#506681]"
                  >
                    I understand that these products are intended for laboratory
                    research use only and are not for human or veterinary use.
                  </label>
                </div>
                {errors.consent && (
                  <p className="mt-2 text-xs text-red-600">{errors.consent}</p>
                )}
                <button
                  type="button"
                  onClick={validate}
                  disabled={!canContinue}
                  className="mt-6 flex h-13 min-h-[52px] w-full items-center justify-center gap-2 rounded-full bg-[#0b1b3f] px-5 text-sm font-semibold text-white transition hover:bg-[#24538f] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Review checkout details <ArrowRight size={17} />
                </button>
                {reviewed && (
                  <div
                    role="status"
                    className="mt-4 flex items-start gap-2 rounded-xl border border-[#bfe4d2] bg-[#edf9f3] p-3 text-xs leading-relaxed text-[#245d42]"
                  >
                    <Check size={17} className="shrink-0" /> Details validated
                    locally. Payment and order submission are not connected yet.
                  </div>
                )}
              </section>
            </div>

            <aside
              aria-label="Order summary"
              className="overflow-hidden rounded-[26px] border border-[#dce8f5] bg-white shadow-[0_18px_55px_rgba(11,27,63,0.05)] lg:sticky lg:top-24"
            >
              <div className="border-b border-[#e5edf6] px-6 py-5">
                <div className="flex items-center justify-between">
                  <h2 className="font-heading text-2xl font-semibold tracking-[-0.04em]">
                    Your order
                  </h2>
                  <span className="rounded-full bg-[#eaf5ff] px-3 py-1 text-xs font-semibold text-[#397fce]">
                    {itemCount} {itemCount === 1 ? "item" : "items"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#8193a9]">
                  Review products before payment.
                </p>
              </div>
              <div className="max-h-[350px] space-y-5 overflow-y-auto px-6 py-6">
                {items.map((item) => (
                  <div key={item.key} className="flex items-center gap-4">
                    <div className="relative size-[76px] shrink-0 rounded-2xl bg-[#eef6ff] p-2">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="76px"
                        className="object-contain p-2"
                      />
                      <span className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-[#0b1b3f] text-[10px] font-bold text-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-heading text-base font-semibold">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-[#7188a4]">
                        {item.variantLabel}
                      </p>
                      <p className="mt-1 text-[11px] text-[#8ca0b6]">
                        Qty {item.quantity} × {formatCartMoney(item.price)}
                      </p>
                    </div>
                    <strong className="shrink-0 text-sm">
                      {formatCartMoney(item.price * item.quantity)}
                    </strong>
                  </div>
                ))}
              </div>
              <div className="space-y-5 border-t border-[#e5edf6] px-6 py-6">
                <FreeShippingProgress compact />
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-[#6d819b]">
                    <span>Subtotal</span>
                    <strong className="text-[#0b1b3f]">
                      {formatCartMoney(subtotal)}
                    </strong>
                  </div>
                  <div className="flex justify-between text-[#6d819b]">
                    <span>Estimated shipping</span>
                    <strong
                      className={
                        freeShipping ? "text-[#27835c]" : "text-[#0b1b3f]"
                      }
                    >
                      {freeShipping
                        ? "FREE"
                        : formatCartMoney(shippingEstimate)}
                    </strong>
                  </div>
                  <div className="flex justify-between text-[#6d819b]">
                    <span>Taxes</span>
                    <span>Not calculated</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-[#e5edf6] pt-5">
                  <div>
                    <p className="font-heading text-lg font-semibold">
                      Estimated total
                    </p>
                    <span className="text-[11px] text-[#8293aa]">
                      Excluding taxes and final rates
                    </span>
                  </div>
                  <strong className="font-heading text-2xl font-semibold tracking-[-0.04em]">
                    {formatCartMoney(estimatedTotal)}
                  </strong>
                </div>

                <button
                  type="button"
                  disabled
                  className="flex min-h-[50px] w-full cursor-not-allowed items-center justify-center gap-2 rounded-full bg-[#aeb9c7] text-sm font-semibold text-white"
                >
                  <LockKeyhole size={17} /> Continue to secure payment
                </button>
                <div className="flex items-center justify-center gap-2 text-[11px] text-[#8293aa]">
                  <ShieldCheck size={15} /> No payment is collected on this page
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
