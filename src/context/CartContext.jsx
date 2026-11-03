"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "100-peptides-cart-v1";
const CartContext = createContext(null);

// Keep these settings in one place. Match them to your actual store policy.
export const CART_SETTINGS = {
  currency: "USD",
  freeShippingThreshold: 150,
};

export function formatCartMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: CART_SETTINGS.currency,
  }).format(Number(value) || 0);
}

function normalizeCartItem(product, variant, quantity) {
  if (!product?.id || !variant?.id) throw new Error("A valid product and variant are required.");
  if (!variant.inStock || (variant.stock != null && variant.stock < 1)) {
    throw new Error("This variant is out of stock.");
  }
  return {
    key: `${product.id}:${variant.id}`,
    productId: product.id,
    variantId: variant.id,
    name: product.name,
    slug: product.slug,
    image: product.image,
    variantLabel: variant.label,
    price: Number(variant.price) || 0,
    maxStock: variant.stock == null ? null : Number(variant.stock),
    quantity: Math.max(1, Math.floor(Number(quantity) || 1)),
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || "[]");
      if (Array.isArray(saved)) {
        setItems(saved.filter((item) => item && typeof item.key === "string" && item.quantity > 0));
      }
    } catch {
      // Invalid/old cart data is ignored.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // The cart still works in memory if storage is blocked.
    }
  }, [items, hydrated]);

  const addItem = useCallback((product, variant, quantity = 1) => {
    const incoming = normalizeCartItem(product, variant, quantity);
    setItems((current) => {
      const exists = current.find((item) => item.key === incoming.key);
      if (!exists) return [...current, { ...incoming, quantity: Math.min(incoming.quantity, incoming.maxStock ?? Infinity) }];
      return current.map((item) => item.key === incoming.key
        ? { ...item, quantity: Math.min(item.quantity + incoming.quantity, incoming.maxStock ?? Infinity), price: incoming.price, maxStock: incoming.maxStock }
        : item);
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((key) => {
    setItems((current) => current.filter((item) => item.key !== key));
  }, []);

  const updateQuantity = useCallback((key, quantity) => {
    setItems((current) => current.flatMap((item) => {
      if (item.key !== key) return [item];
      const next = Math.floor(Number(quantity));
      if (!Number.isFinite(next)) return [item];
      if (next < 1) return [];
      return [{ ...item, quantity: Math.min(next, item.maxStock ?? Infinity) }];
    }));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const remaining = Math.max(0, CART_SETTINGS.freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / CART_SETTINGS.freeShippingThreshold) * 100);

  const value = useMemo(() => ({
    items, isOpen, hydrated, addItem, removeItem, updateQuantity, clearCart, openCart, closeCart,
    subtotal, itemCount, remaining, freeShippingProgress,
    qualifiesForFreeShipping: remaining <= 0,
  }), [items, isOpen, hydrated, addItem, removeItem, updateQuantity, clearCart, openCart, closeCart, subtotal, itemCount, remaining, freeShippingProgress]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside <CartProvider>.");
  return context;
}
