// Edit this file before publishing. Do not invent your business's legal information.
export const storePolicies = {
  brand: "100 Peptides Research",
  legalBusinessName: "", // REQUIRED: registered seller name
  supportEmail: "", // REQUIRED: verified support email
  businessAddress: "", // REQUIRED: contact/business address appropriate to your jurisdiction
  jurisdiction: "", // REQUIRED: jurisdiction governing your terms
  privacyContact: "", // Optional: if empty, supportEmail is used
  effectiveDate: "", // REQUIRED: e.g. "November 3, 2026" after approval
  shippingOrigin: "", // Only include a verified fulfillment origin
  processingTime: "", // e.g. "1–2 business days" only if confirmed
  freeShippingThreshold: null, // Only set to an approved amount; otherwise the cart controls the display
  supportedDestinations: "", // e.g. "contiguous United States" only after verification
  deliveryEstimate: "", // Never guarantee a delivery window without operations approval
  returnPolicyUrl: "", // Add real, published return/refund policy route if available
  paymentProcessors: "", // List actual processors after integrating payments
  analyticsProviders: "", // List tools actually installed
  contactFormProvider: "", // List actual messaging provider if one is connected
  orderTrackingProvider: "", // Name real fulfillment/carrier provider if connected
};

export const policyNeedsReview = [
  "legalBusinessName",
  "supportEmail",
  "businessAddress",
  "jurisdiction",
  "effectiveDate",
].some((key) => !storePolicies[key]);
