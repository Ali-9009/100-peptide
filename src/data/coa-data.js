export const coaData = {
  "bpc-157": {
    sampleId: "DEMO-BPC-001",
    lot: "EXAMPLE-2026-001",
    laboratory: "Example Analytical Laboratory",
    testDate: null,

    verified: false,
    certificateUrl: null,

    results: [
      {
        label: "Identity",
        method: "LC-MS",
        value: "Example identity match",
      },
      {
        label: "Purity",
        method: "HPLC-UV",
        value: "99.91%",
      },
      {
        label: "Net content",
        method: "Gravimetric",
        value: "5.08 mg",
      },
      {
        label: "Endotoxin",
        method: "LAL",
        value: "Example: Pass",
      },
      {
        label: "Microbial screening",
        method: "PCR",
        value: "Example: Not detected",
      },
      {
        label: "Heavy metals",
        method: "ICP-MS",
        value: "Example: Not detected",
      },
    ],
  },
};

export const getCOABySlug = (slug) => coaData[slug] ?? null;