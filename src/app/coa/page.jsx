import COAClient from "./COAClient";
import { getProducts } from "@/data/products";

export const metadata = {
  title: "Certificate of Analysis | 100 Peptides Research",
  description:
    "Explore the research compound catalog and learn about analytical testing, laboratory documentation, and certificates of analysis.",
};

export default function COAPage() {
  const products = getProducts();

  return <COAClient products={products} />;
}