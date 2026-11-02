// src/data/products.js

export const products = [
  {
    id: "bpc-157",
    slug: "bpc-157",
    name: "BPC-157",
    category: "Research Peptides",
    description: "BPC-157 peptide for laboratory research applications.",

    image: "/assets/bpc-157.png",
    gallery: [
      "/assets/bpc-157.png",
    ],

    badge: "Best seller",
    featured: true,

    variants: [
      {
        id: "bpc-157-5mg",
        label: "5 mg",
        strength: 5,
        unit: "mg",
        price: 39,
        compareAtPrice: null,
        inStock: true,
        stock: 25,
      },
      {
        id: "bpc-157-10mg",
        label: "10 mg",
        strength: 10,
        unit: "mg",
        price: 64,
        compareAtPrice: null,
        inStock: true,
        stock: 18,
      },
    ],

    defaultVariant: 1,

    rating: null,
    reviews: null,

    tint: "#e0f2fe",
    accent: "#a5dcf8",

    researchUseOnly: true,
    active: true,
  },

  {
    id: "tb-500",
    slug: "tb-500",
    name: "TB-500",
    category: "Research Peptides",
    description: "TB-500 peptide intended for laboratory research.",

    image: "/assets/tb-500.png",
    gallery: ["/assets/tb-500.png"],

    badge: "New",
    featured: true,

    variants: [
      {
        id: "tb-500-5mg",
        label: "5 mg",
        strength: 5,
        unit: "mg",
        price: 45,
        compareAtPrice: null,
        inStock: true,
        stock: 20,
      },
      {
        id: "tb-500-10mg",
        label: "10 mg",
        strength: 10,
        unit: "mg",
        price: 75,
        compareAtPrice: null,
        inStock: true,
        stock: 12,
      },
    ],

    defaultVariant: 0,

    rating: null,
    reviews: null,

    tint: "#e8efff",
    accent: "#bfd3ff",

    researchUseOnly: true,
    active: true,
  },

  {
    id: "ghk-cu",
    slug: "ghk-cu",
    name: "GHK-Cu",
    category: "Copper Peptides",
    description: "GHK-Cu copper peptide for laboratory research.",

    image: "/assets/ghk-cu.png",
    gallery: ["/assets/ghk-cu.png"],

    badge: null,
    featured: true,

    variants: [
      {
        id: "ghk-cu-50mg",
        label: "50 mg",
        strength: 50,
        unit: "mg",
        price: 49,
        compareAtPrice: null,
        inStock: true,
        stock: 15,
      },
      {
        id: "ghk-cu-100mg",
        label: "100 mg",
        strength: 100,
        unit: "mg",
        price: 85,
        compareAtPrice: null,
        inStock: true,
        stock: 10,
      },
    ],

    defaultVariant: 0,

    rating: null,
    reviews: null,

    tint: "#dbeafe",
    accent: "#93c5fd",

    researchUseOnly: true,
    active: true,
  },

  {
    id: "cjc-1295",
    slug: "cjc-1295",
    name: "CJC-1295",
    category: "Research Peptides",
    description: "CJC-1295 peptide for controlled laboratory research.",

    image: "/assets/cjc-1295.png",
    gallery: ["/assets/cjc-1295.png"],

    badge: null,
    featured: false,

    variants: [
      {
        id: "cjc-1295-2mg",
        label: "2 mg",
        strength: 2,
        unit: "mg",
        price: 42,
        compareAtPrice: null,
        inStock: true,
        stock: 20,
      },
      {
        id: "cjc-1295-5mg",
        label: "5 mg",
        strength: 5,
        unit: "mg",
        price: 69,
        compareAtPrice: null,
        inStock: true,
        stock: 15,
      },
    ],

    defaultVariant: 0,

    rating: null,
    reviews: null,

    tint: "#f0f5ff",
    accent: "#c7d9fa",

    researchUseOnly: true,
    active: true,
  },
];

// Get all active products
export const getProducts = () =>
  products.filter((product) => product.active);

// Get a single product by slug
export const getProductBySlug = (slug) =>
  products.find(
    (product) => product.slug === slug && product.active,
  );

// Get featured products
export const getFeaturedProducts = () =>
  products.filter(
    (product) => product.featured && product.active,
  );

// Get products by category
export const getProductsByCategory = (category) =>
  products.filter(
    (product) =>
      product.category === category && product.active,
  );