// Product-page content and presentation settings.
// The catalogue in src/data/products.js remains the source of prices and stock.
// Do not publish batch test results without matching lot documentation.
export const PACK_OPTIONS = [
  // { quantity: 1, discountPercent: 0, label: "1 Vial", caption: "Single vial" },
  { quantity: 2, discountPercent: 5, label: "2 Vials", caption: "Save 5%" },
  { quantity: 5, discountPercent: 9, label: "5 Vials", caption: "Save 9%" },
  { quantity: 10, discountPercent: 15, label: "10 Vials", caption: "Save 15%" },
];

export function roundMoney(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function getPackPrice(unitPrice, count, discountPercent) {
  return roundMoney(Number(unitPrice) * count * (1 - discountPercent / 100));
}

// User supplied no product-specific, lot-verified technical measurements.
// Fields stay empty until verified for each exact compound/lot.
export const PRODUCT_DETAILS = {
  "bpc-157": {
    overview: "BPC-157 peptide for laboratory research applications.",
    specifications: {
      sequence: null,
      molecularFormula: null,
      molecularWeight: null,
      casNumber: null,
      purity: null,
      presentation: null,
      storage: null,
      solubility: null,
      appearance: null,
      endotoxin: null,
    },
    coaUrl: null,
  },
  "tb-500": {
    overview: "TB-500 peptide intended for laboratory research.",
    specifications: {
      sequence: null,
      molecularFormula: null,
      molecularWeight: null,
      casNumber: null,
      purity: null,
      presentation: null,
      storage: null,
      solubility: null,
      appearance: null,
      endotoxin: null,
    },
    coaUrl: null,
  },
  "ghk-cu": {
    overview: "GHK-Cu copper peptide for laboratory research.",
    specifications: {
      sequence: null,
      molecularFormula: null,
      molecularWeight: null,
      casNumber: null,
      purity: null,
      presentation: null,
      storage: null,
      solubility: null,
      appearance: null,
      endotoxin: null,
    },
    coaUrl: null,
  },
  "cjc-1295": {
    overview: "CJC-1295 peptide for controlled laboratory research.",
    specifications: {
      sequence: null,
      molecularFormula: null,
      molecularWeight: null,
      casNumber: null,
      purity: null,
      presentation: null,
      storage: null,
      solubility: null,
      appearance: null,
      endotoxin: null,
    },
    coaUrl: null,
  },
};

export const SPEC_LABELS = [
  ["sequence", "Sequence"],
  ["molecularFormula", "Molecular formula"],
  ["molecularWeight", "Molecular weight"],
  ["casNumber", "CAS number"],
  ["purity", "Purity (HPLC)"],
  ["presentation", "Presentation"],
  ["storage", "Storage"],
  ["solubility", "Solubility"],
  ["appearance", "Appearance"],
  ["endotoxin", "Endotoxin"],
];
