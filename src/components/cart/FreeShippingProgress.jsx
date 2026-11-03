"use client";

import { Truck, Check } from "lucide-react";
import { CART_SETTINGS, formatCartMoney, useCart } from "@/context/CartContext";

export default function FreeShippingProgress({ compact = false }) {
  const { remaining, freeShippingProgress, qualifiesForFreeShipping } = useCart();
  return (
    <div className={`rounded-2xl bg-[#0b1b3f] text-white ${compact ? "p-4" : "p-5"}`}>
      <div className="flex items-center gap-3">
        <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-[#8dc9ff]">
          {qualifiesForFreeShipping ? <Check size={17} /> : <Truck size={17} />}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold leading-relaxed sm:text-xs">
            {qualifiesForFreeShipping
              ? "You've unlocked free shipping!"
              : <>You're <strong className="text-[#8ec9ff]">{formatCartMoney(remaining)}</strong> away from free shipping</>}
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/20" role="progressbar" aria-label="Free shipping progress" aria-valuenow={Math.round(freeShippingProgress)} aria-valuemin={0} aria-valuemax={100}>
            <div className="h-full rounded-full bg-gradient-to-r from-[#4b9feb] to-[#a1d8ff] transition-[width] duration-500" style={{ width: `${freeShippingProgress}%` }} />
          </div>
          <p className="mt-1.5 text-[10px] text-[#adc1dc]">Free shipping over {formatCartMoney(CART_SETTINGS.freeShippingThreshold)} · before taxes</p>
        </div>
      </div>
    </div>
  );
}
