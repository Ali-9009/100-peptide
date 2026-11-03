"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartButton({ className = "" }) {
  const { openCart, itemCount, hydrated } = useCart();
  return (
    <button type="button" onClick={openCart} aria-label={`Open cart, ${hydrated ? itemCount : 0} items`} className={`relative inline-flex size-11 items-center justify-center rounded-full text-[#0b1b3f] hover:bg-[#ecf5ff] ${className}`}>
      <ShoppingBag size={21} strokeWidth={1.8} />
      {hydrated && itemCount > 0 && <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full bg-[#397fce] text-[10px] font-bold text-white">{itemCount > 99 ? "99+" : itemCount}</span>}
    </button>
  );
}
