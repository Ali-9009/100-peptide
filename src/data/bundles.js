export const bundles = [
  {
    id: "research-bundle-01",
    slug: "essential-research-bundle",
    name: "Essential Research Bundle",
    category: "Research Bundles",

    description: "A curated selection of peptides for laboratory research.",

    image: "/assets/essential-bundle.png",

    badge: "Popular",
    featured: true,

    products: [
      { productId: "bpc-157", variantId: "bpc-157-5mg", quantity: 1 },
      { productId: "tb-500", variantId: "tb-500-5mg", quantity: 1 },
    ],

    variants: [
      {
        id: "essential-bundle-01",
        label: "2 Vials",
        price: 75,
        compareAtPrice: 84,
        inStock: true,
      },
    ],

    defaultVariant: 0,

    rating: null,
    reviews: null,

    tint: "#e0f2fe",
    accent: "#a5dcf8",

    active: true,
  },

  {
    id: "research-bundle-02",
    slug: "advanced-research-bundle",
    name: "Advanced Research Bundle",
    category: "Research Bundles",

    description:
      "A three-product collection designed for advanced laboratory research.",

    image: "/assets/advanced-bundle.png",

    badge: "Best Value",
    featured: true,

    products: [
      { productId: "bpc-157", variantId: "bpc-157-10mg", quantity: 1 },
      { productId: "tb-500", variantId: "tb-500-10mg", quantity: 1 },
      { productId: "ghk-cu", variantId: "ghk-cu-50mg", quantity: 1 },
    ],

    variants: [
      {
        id: "advanced-bundle-01",
        label: "3 Vials",
        price: 159,
        compareAtPrice: 188,
        inStock: true,
      },
    ],

    defaultVariant: 0,

    rating: null,
    reviews: null,

    tint: "#e8efff",
    accent: "#bfd3ff",

    active: true,
  },

  {
    id: "research-bundle-03",
    slug: "complete-research-bundle",
    name: "Complete Research Bundle",
    category: "Research Bundles",

    description:
      "A comprehensive four-product selection for laboratory research.",

    image: "/assets/complete-bundle.png",

    badge: "Premium",
    featured: true,

    products: [
      { productId: "bpc-157", variantId: "bpc-157-10mg", quantity: 1 },
      { productId: "cjc-1295", variantId: "cjc-1295-5mg", quantity: 1 },
    ],

    variants: [
      {
        id: "complete-bundle-01",
        label: "4 Vials",
        price: 219,
        compareAtPrice: 257,
        inStock: true,
      },
    ],

    defaultVariant: 0,

    rating: null,
    reviews: null,

    tint: "#dbeafe",
    accent: "#93c5fd",

    active: true,
  },
];

// Get all active bundles
export const getBundles = () => bundles.filter((bundle) => bundle.active);

// Get bundle by slug
export const getBundleBySlug = (slug) =>
  bundles.find((bundle) => bundle.slug === slug && bundle.active);
