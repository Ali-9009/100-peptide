"use client";

import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { formatCartMoney, useCart } from "@/context/CartContext";
import CartLineItem from "@/components/cart/CartLineItem";
import FreeShippingProgress from "@/components/cart/FreeShippingProgress";

export default function CartPageClient() {
  const { items, itemCount, subtotal, hydrated } = useCart();
  return (
    <main className="min-h-svh bg-[linear-gradient(to_bottom,#f7faff_0%,#ffffff_100%)] px-4 pt-28 pb-20 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb" className="mb-7 text-xs text-[#7d8fa7]">
          <Link href="/" className="hover:text-[#397fce]">
            Home
          </Link>{" "}
          <span className="mx-2">/</span> Research cart
        </nav>
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading mt-2 text-4xl font-bold tracking-tight text-[#0b1b3f] sm:text-5xl">
              Research cart<span className="text-[#6d95bd]">.</span>
            </h1>
            <p className="mt-2 text-sm text-[#7d8fa7]">
              {hydrated
                ? `${itemCount} ${itemCount === 1 ? "item" : "items"} selected`
                : "Loading your cart..."}
            </p>
          </div>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b1b3f] hover:text-[#397fce]"
          >
            <ArrowLeft size={16} /> Continue shopping
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_350px]">
          <section
            aria-label="Cart items"
            className="min-w-0 rounded-3xl border border-[#e1eaf4] bg-white p-5 sm:p-7"
          >
            {!hydrated ? (
              <p className="text-sm text-[#8292a6]">Loading items...</p>
            ) : items.length ? (
              items.map((item) => <CartLineItem key={item.key} item={item} />)
            ) : (
              <div className="flex min-h-72 flex-col items-center justify-center text-center">
                <ShoppingBag size={36} className="text-[#75aee3]" />
                <h2 className="font-heading mt-5 text-2xl font-bold text-[#0b1b3f]">
                  Your cart is empty
                </h2>
                <Link
                  href="/shop"
                  className="mt-5 rounded-full bg-[#0b1b3f] px-6 py-3 text-sm font-semibold text-white"
                >
                  Browse the collection
                </Link>
              </div>
            )}
          </section>
          <aside
            aria-label="Order summary"
            className="h-fit space-y-5 rounded-3xl border border-[#e1eaf4] bg-white p-5 sm:p-6 lg:sticky lg:top-24"
          >
            <h2 className="font-heading text-xl font-bold text-[#0b1b3f]">
              Order summary
            </h2>
            <FreeShippingProgress />
            <div className="space-y-3 border-b border-[#e5edf5] pb-4 text-sm">
              <div className="flex justify-between text-[#71849b]">
                <span>Subtotal</span>
                <strong className="text-[#0b1b3f]">
                  {formatCartMoney(subtotal)}
                </strong>
              </div>
              <div className="flex justify-between text-[#71849b]">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-[#0b1b3f]">
                Total before shipping & tax
              </span>
              <strong className="font-heading text-xl text-[#0b1b3f]">
                {formatCartMoney(subtotal)}
              </strong>
            </div>
            <Link
              href="/checkout"
              className="flex h-12 items-center justify-center rounded-full bg-[#0b1b3f] text-sm font-semibold text-white hover:bg-[#264f84]"
            >
              Continue shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
