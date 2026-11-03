import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/data/products";
import ProductDetailClient from "@/components/product/ProductDetailClient";

export function generateStaticParams() {
  return getProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };
  return {
    title: `${product.name} | 100 Peptides Research`,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getProducts()
    .filter((item) => item.id !== product.id)
    .slice(0, 3);

  return <ProductDetailClient product={product} related={related} />;
}
