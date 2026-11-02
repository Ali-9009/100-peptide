import Link from "next/link";
import Hero from "./components/Hero";
import ProductCard from "./components/ProductCard";
import { products } from "@/data/products";
import WhyChooseUs from "./components/WhyChooseUs";
import ResearchStandards from "./components/ResearchStandards";
import OrderProcess from "./components/OrderProcess";
import OrderCTA from "./components/OrderCTA";
export default function HomePage() {
  return (
    <>
      <Hero />

      <section id="shop" className="bg-white px-5 py-20 sm:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          {/* SECTION HEADING */}
          <div className="mb-12 text-center" data-aos="fade-up">
            {/* HEADING */}
            <h2 className="font-heading text-primary text-[clamp(36px,5vw,68px)] leading-[1.1] font-semibold tracking-[-0.045em]">
              Precision in Every Peptide.
            </h2>

            {/* DESCRIPTION */}
            <p className="text-text/75 mx-auto mt-5 max-w-2xl font-sans text-base leading-relaxed sm:text-lg">
              Discover our curated selection of research peptides, developed
              with a focus on quality, consistency, and precision.
            </p>
          </div>

          {/* PRODUCT GRID */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <ResearchStandards />

      <OrderProcess />

      <OrderCTA />
    </>
  );
}
