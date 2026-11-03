"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  HelpCircle,
  Mail,
  PackageSearch,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { FAQS } from "@/data/support-config";
import {
  Eyebrow,
  GradientCTA,
  SectionTitle,
} from "@/components/support/SupportUI";
import "../support-pages.css";

const categories = [
  "All questions",
  "Ordering",
  "Shipping",
  "Products",
  "Support",
];
export default function FAQsClient() {
  const [activeCategory, setActiveCategory] = useState("All questions");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState("f1");
  const filtered = useMemo(
    () =>
      FAQS.filter(
        (faq) =>
          (activeCategory === "All questions" ||
            faq.category === activeCategory) &&
          `${faq.question} ${faq.answer} ${faq.category}`
            .toLowerCase()
            .includes(query.toLowerCase().trim()),
      ),
    [activeCategory, query],
  );
  return (
    <main className="min-h-svh px-4 pt-28 pb-20 sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <section className="grid gap-9 lg:grid-cols-[280px_1fr] lg:gap-14">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <SectionTitle
              eyebrow="Help center"
              title="Find your answer."
              description="Choose a topic or search across all questions."
            />
            <div
              className="mt-7 rounded-[22px] border border-[#deebf6] bg-white p-2"
              role="group"
              aria-label="FAQ categories"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category);
                    setOpenId(null);
                  }}
                  aria-pressed={activeCategory === category}
                  className={`flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-[13px] font-semibold transition-colors ${activeCategory === category ? "bg-[#0b1b3f] text-white" : "text-[#526c86] hover:bg-[#eef6fe] hover:text-[#0b1b3f]"}`}
                >
                  {category}
                  <span className="text-[11px] opacity-60">
                    {category === "All questions"
                      ? FAQS.length
                      : FAQS.filter((f) => f.category === category).length}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-5 rounded-[22px] border border-[#d5e7f8] bg-[#e7f3ff] p-5">
              <Mail size={23} className="text-[#397fce]" />
              <p className="mt-3 text-[13px] font-bold text-[#0b1b3f]">
                Still have a question?
              </p>
              <p className="mt-1 text-[12px] leading-relaxed text-[#6e88a1]">
                Send a message to our support team.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex items-center gap-2 text-[12px] font-bold text-[#397fce]"
              >
                Contact us <ArrowUpRight size={15} />
              </Link>
            </div>
          </aside>
          <div>
            <div className="relative">
              <Search
                className="absolute top-1/2 left-4 -translate-y-1/2 text-[#829db6]"
                size={20}
              />
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setOpenId(null);
                }}
                type="search"
                placeholder="Search questions, shipping, orders..."
                aria-label="Search frequently asked questions"
                className="min-h-14 w-full rounded-[18px] border border-[#d9e7f3] bg-white pr-12 pl-12 text-[14px] text-[#0b1b3f] transition-all outline-none placeholder:text-[#9aabba] focus:border-[#397fce] focus:ring-4 focus:ring-[#397fce]/10"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-4 -translate-y-1/2 text-[#6a8198]"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-[12px] font-bold tracking-[.15em] text-[#69829b] uppercase">
                {activeCategory}
              </span>
              <span className="text-[12px] text-[#8297aa]">
                {filtered.length} {filtered.length === 1 ? "answer" : "answers"}
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {filtered.map((faq, index) => {
                const open = openId === faq.id;
                const panelId = `answer-${faq.id}`;
                return (
                  <article
                    key={faq.id}
                    className={`overflow-hidden rounded-[22px] border bg-white transition-all duration-300 ${open ? "border-[#b8d5f2] shadow-[0_18px_40px_-30px_rgba(11,27,63,.27)]" : "border-[#e0ebf5] hover:border-[#bdd5ee]"}`}
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpenId(open ? null : faq.id)}
                        aria-expanded={open}
                        aria-controls={panelId}
                        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left sm:px-7 sm:py-6"
                      >
                        <span className="flex gap-4">
                          <span className="pt-1 text-[10px] font-bold text-[#96b1c9]">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="font-heading text-[17px] leading-snug font-semibold tracking-[-.025em] text-[#0b1b3f] sm:text-[19px]">
                            {faq.question}
                          </span>
                        </span>
                        <span
                          className={`grid size-9 shrink-0 place-items-center rounded-full transition-all ${open ? "rotate-180 bg-[#0b1b3f] text-white" : "bg-[#eff6fd] text-[#397fce]"}`}
                        >
                          <ChevronDown size={18} />
                        </span>
                      </button>
                    </h3>
                    <div id={panelId} hidden={!open}>
                      <p className="border-t border-[#eaf1f9] px-5 pt-4 pb-6 text-[13px] leading-[1.9] text-[#657e96] sm:px-7 sm:text-[14px]">
                        {faq.answer}
                      </p>
                    </div>
                  </article>
                );
              })}
              {filtered.length === 0 && (
                <div className="rounded-[24px] border border-[#deebf6] bg-white px-6 py-14 text-center">
                  <HelpCircle size={35} className="mx-auto text-[#397fce]" />
                  <h3 className="font-heading mt-3 text-[23px] font-semibold">
                    No matching questions
                  </h3>
                  <p className="mt-2 text-[13px] text-[#7389a1]">
                    Try a different search or ask our support team directly.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-5 inline-flex items-center gap-2 text-[13px] font-bold text-[#397fce]"
                  >
                    Contact support <ArrowRight size={15} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {[
            {
              icon: PackageSearch,
              title: "Tracking help",
              description: "Find shipment updates and learn about tracking.",
              href: "/track-order",
              label: "Track an order",
            },
            {
              icon: ShieldCheck,
              title: "Research information",
              description:
                "Understand the product-specific information available.",
              href: "/shop",
              label: "Explore collection",
            },
            {
              icon: Mail,
              title: "Direct support",
              description: "Can't find the answer you need? Send a message.",
              href: "/contact",
              label: "Get in touch",
            },
          ].map(({ icon: Icon, ...item }) => (
            <Link
              key={item.title}
              href={item.href}
              className="group rounded-[25px] border border-[#deebf6] bg-white p-6 transition-all hover:-translate-y-1 hover:border-[#b5d4f1] hover:shadow-xl"
            >
              <span className="grid size-12 place-items-center rounded-2xl bg-[#e8f4ff] text-[#397fce]">
                <Icon size={22} />
              </span>
              <h3 className="font-heading mt-5 text-[22px] font-semibold text-[#0b1b3f]">
                {item.title}
              </h3>
              <p className="mt-2 min-h-12 text-[12px] leading-relaxed text-[#71879e]">
                {item.description}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-[12px] font-bold text-[#397fce]">
                {item.label}
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-20">
          <GradientCTA
            title="The next discovery starts here."
            description="Explore the product catalog or reach out if you need help finding information."
            primaryLabel="Browse collection"
            primaryHref="/shop"
            secondaryLabel="Contact support"
            secondaryHref="/contact"
          />
        </div>
      </div>
    </main>
  );
}
