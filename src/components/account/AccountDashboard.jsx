"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  ClipboardList,
  CreditCard,
  FileCheck2,
  Info,
  KeyRound,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  UserRound,
  FlaskConical,
  CheckCircle2,
} from "lucide-react";

const sections = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "orders", label: "Orders", icon: ClipboardList },
  { id: "certificates", label: "Certificates", icon: FileCheck2 },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "details", label: "Details", icon: UserRound },
  { id: "password", label: "Password", icon: KeyRound },
  { id: "payment", label: "Payment", icon: CreditCard },
];

function Panel({ eyebrow, title, children, action }) {
  return (
    <section className="relative overflow-hidden rounded-[27px] border border-[#dde8f3] bg-white p-5 sm:p-8 lg:p-9">
      <div
        className="absolute top-0 left-9 h-[3px] w-14 rounded-b-full bg-[#3a9be6]"
        aria-hidden="true"
      />
      <header className="mb-6 border-b border-[#e2eaf2] pb-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold text-[#56728b]">
              {eyebrow}
            </span>
            <h2 className="font-heading mt-2 text-[24px] font-bold tracking-[-0.045em] text-[#222b3c] sm:text-[28px]">
              {title}
            </h2>
          </div>
          {action}
        </div>
      </header>
      {children}
    </section>
  );
}

function EmptyState({ icon: Icon, title, description, cta, href }) {
  return (
    <div className="flex min-h-[210px] flex-col items-center justify-center rounded-[20px] border border-dashed border-[#c7dff2] bg-[#f4f9fe] px-5 py-8 text-center">
      <span className="grid size-13 place-items-center rounded-2xl bg-white text-[#397fce] shadow-sm">
        <Icon size={24} />
      </span>
      <h3 className="font-heading mt-4 text-[19px] font-semibold text-[#233b57]">
        {title}
      </h3>
      <p className="mt-2 max-w-[420px] text-[13px] leading-[1.75] text-[#7a8da0]">
        {description}
      </p>
      {href && (
        <Link
          href={href}
          className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-[linear-gradient(100deg,#3388d0,#62b0ed)] px-6 text-[12px] font-bold text-white shadow-[0_10px_24px_rgba(57,141,211,0.16)] transition hover:-translate-y-0.5"
        >
          {cta}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}

function StatTile({ icon: Icon, label, value, hint }) {
  return (
    <div className="rounded-[22px] border border-[#dfebf6] bg-white p-5">
      <div className="flex items-center justify-between">
        <span className="grid size-11 place-items-center rounded-2xl bg-[#eaf5ff] text-[#397fce]">
          <Icon size={21} />
        </span>
        <ArrowUpRight size={16} className="text-[#a5bdd3]" />
      </div>
      <p className="font-heading mt-5 text-[30px] font-bold tracking-[-0.06em] text-[#0b1b3f]">
        {value}
      </p>
      <p className="mt-1 text-[12px] font-bold text-[#425c78]">{label}</p>
      <p className="mt-1 text-[11px] text-[#91a3b5]">{hint}</p>
    </div>
  );
}

function Overview({ changePage, products }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-3">
        <StatTile
          icon={Package}
          label="Orders"
          value="0"
          hint="No connected order records"
        />
        <StatTile
          icon={FileCheck2}
          label="Batch certificates"
          value="0"
          hint="Link purchases to their lots"
        />
        <StatTile
          icon={MapPin}
          label="Saved addresses"
          value="0"
          hint="No saved locations"
        />
      </div>
      <Panel
        eyebrow="Recent"
        title="Latest orders"
        action={
          <button
            type="button"
            onClick={() => changePage("orders")}
            className="inline-flex items-center gap-1 text-[12px] font-bold text-[#397fce]"
          >
            View all <ArrowUpRight size={15} />
          </button>
        }
      >
        <p className="mb-5 max-w-[650px] text-[14px] leading-[1.8] text-[#6b7e91]">
          The three most recent orders on this record. Everything filed against
          it stays available here when an order service is connected.
        </p>
        <EmptyState
          icon={Package}
          title="No orders on this record yet"
          description="Browse the collection when you're ready. Account-order synchronization will be enabled with your backend."
          href="/shop"
          cta="Browse the catalogue"
        />
      </Panel>
      {products.length > 0 && (
        <Panel eyebrow="Research collection" title="Explore the catalogue">
          <div className="grid gap-3 sm:grid-cols-3">
            {products.map((product) => (
              <Link
                href={`/products/${product.slug}`}
                key={product.id}
                className="group flex items-center gap-3 rounded-[18px] border border-[#e4edf6] p-3 transition hover:border-[#97c7ed] hover:bg-[#f7fbff]"
              >
                <div className="relative size-16 shrink-0 rounded-xl bg-[#edf6ff]">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt=""
                      fill
                      sizes="64px"
                      className="object-contain p-1"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[12px] font-bold text-[#0b1b3f]">
                    {product.name}
                  </p>
                  <p className="mt-1 text-[11px] text-[#8295a9]">
                    View details
                  </p>
                </div>
                <ArrowUpRight
                  size={15}
                  className="ml-auto shrink-0 text-[#a3bfd9]"
                />
              </Link>
            ))}
          </div>
        </Panel>
      )}
    </div>
  );
}

function InfoPanel({ title, description, icon: Icon, notes = [], cta, href }) {
  return (
    <Panel eyebrow="Account records" title={title}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-[690px]">
          <p className="text-[14px] leading-[1.9] text-[#6c8196]">
            {description}
          </p>
          <div className="mt-6 space-y-3">
            {notes.map((note) => (
              <p
                key={note}
                className="flex items-start gap-3 text-[13px] leading-[1.7] text-[#627a92]"
              >
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-[#397fce]"
                />
                {note}
              </p>
            ))}
          </div>
          {href && (
            <Link
              href={href}
              className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-[#0b1b3f] px-5 text-[12px] font-bold text-white hover:bg-[#285b97]"
            >
              {cta}
              <ArrowUpRight size={15} />
            </Link>
          )}
        </div>
        <span className="grid size-20 shrink-0 place-items-center rounded-[25px] bg-[#eaf5ff] text-[#397fce]">
          <Icon size={36} strokeWidth={1.5} />
        </span>
      </div>
    </Panel>
  );
}

export default function AccountDashboard({ products = [] }) {
  const [active, setActive] = useState("overview");
  const current =
    sections.find((section) => section.id === active) || sections[0];

  const panels = {
    orders: (
      <>
        <InfoPanel
          title="Order history"
          description="Your confirmed order records will appear here when an order backend is connected. You'll be able to view references, totals, and fulfillment updates."
          icon={ClipboardList}
          notes={[
            "Order confirmation and transaction reference",
            "Product line items, quantities, and totals",
            "Shipping details and order tracking where available",
          ]}
          cta="Explore products"
          href="/shop"
        />
        <div className="mt-5">
          <EmptyState
            icon={Package}
            title="No orders found"
            description="No real order data is connected to this dashboard preview."
          />
        </div>
      </>
    ),
    certificates: (
      <>
        <InfoPanel
          title="Your batch certificates"
          description="This area is intended for certificates associated with the lots in your actual orders. Public catalogue COA previews are available separately."
          icon={FileCheck2}
          notes={[
            "Match certificates to the purchased product and lot",
            "Review original laboratory documentation",
            "Keep batch records organized",
          ]}
          cta="Explore COA library"
          href="/coa"
        />
        <div className="mt-5">
          <EmptyState
            icon={FileCheck2}
            title="No linked certificates"
            description="Connect the order and lot records to display account-specific documents."
          />
        </div>
      </>
    ),
    addresses: (
      <>
        <InfoPanel
          title="Billing & shipping addresses"
          description="Saved addresses will help streamline checkout when account storage is connected. This preview deliberately does not store personal addresses."
          icon={MapPin}
          notes={[
            "Default shipping address",
            "Billing contact information",
            "Future address-management controls",
          ]}
        />
        <div className="mt-5">
          <EmptyState
            icon={MapPin}
            title="No saved addresses"
            description="Address management requires authenticated account storage."
          />
        </div>
      </>
    ),
    details: (
      <InfoPanel
        title="Account details"
        description="This section will let registered customers review and update personal details after authentication and profile storage are connected."
        icon={UserRound}
        notes={[
          "First and last name",
          "Account email",
          "Optional account preferences",
        ]}
      />
    ),
    password: (
      <InfoPanel
        title="Password & security"
        description="Password changes and recovery must be handled by your authentication provider. No password is requested or stored by this preview dashboard."
        icon={KeyRound}
        notes={[
          "Secure authenticated password updates",
          "Password reset email flows",
          "Session and sign-in protections",
        ]}
        cta="Contact support"
        href="/contact"
      />
    ),
    payment: (
      <InfoPanel
        title="Payment methods"
        description="Payment methods should only be displayed after you integrate a payment provider. Never collect or store card numbers directly in this interface."
        icon={CreditCard}
        notes={[
          "Provider-hosted payment method management",
          "Billing information linked to authenticated users",
          "Payment tokens rather than raw card data",
        ]}
      />
    ),
  };

  return (
    <main className="min-h-svh bg-[linear-gradient(180deg,#f7faff_0%,#ffffff_75%)] px-4 pt-28 pb-20 text-[#0b1b3f] sm:px-7 sm:pt-32">
      <div className="mx-auto max-w-7xl">
        <nav
          aria-label="Breadcrumb"
          className="mb-7 flex items-center gap-2 text-[12px] text-[#8294a8]"
        >
          <Link href="/" className="hover:text-[#397fce]">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="font-semibold text-[#0b1b3f]">
            Account dashboard preview
          </span>
        </nav>
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-heading text-[clamp(34px,4.5vw,54px)] font-semibold tracking-[-0.06em]">
              Your research account.
            </h1>
            <p className="mt-2 text-sm text-[#8294a6]">
              Orders, certificates, and account essentials organized together.
            </p>
          </div>
          <span className="rounded-full border border-amber-200 bg-amber-50 px-4 py-2 text-[11px] font-bold text-amber-800">
            UI preview · not signed in
          </span>
        </div>
        <div className="mb-7 flex items-start gap-3 rounded-[18px] border border-[#cde2f4] bg-[#eaf5ff] p-4">
          <Info size={19} className="mt-0.5 shrink-0 text-[#397fce]" />
          <p className="text-[12px] leading-[1.8] text-[#4b6986]">
            <strong>Dashboard preview only.</strong> This is not an
            authenticated admin area. No real order, profile, certificate, or
            payment records are loaded. Restrict this route with server-side
            authentication and authorization before connecting user data.
          </p>
        </div>
        <div className="grid items-start gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-8">
          <aside className="lg:sticky lg:top-28" aria-label="Account sections">
            <div className="rounded-[23px] border border-[#e0eaf4] bg-white p-3 shadow-[0_9px_32px_rgba(11,27,63,0.035)]">
              <div className="mb-3 flex items-center justify-between px-3 pt-2">
                <p className="text-[10px] font-bold tracking-[0.17em] text-[#829bb2] uppercase">
                  My account
                </p>
                <span className="grid size-8 place-items-center rounded-lg bg-[#eff7ff] text-[#397fce]">
                  <UserRound size={17} />
                </span>
              </div>
              <nav className="space-y-1" aria-label="Account navigation">
                {sections.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActive(id)}
                    aria-current={active === id ? "page" : undefined}
                    className={`group relative flex min-h-12 w-full items-center gap-3 rounded-[15px] px-3 text-left text-[13px] font-semibold transition ${active === id ? "bg-[#f0f6fc] text-[#0b1b3f]" : "text-[#62778d] hover:bg-[#f6faff] hover:text-[#0b1b3f]"}`}
                  >
                    <span
                      className={`absolute top-3 bottom-3 left-0 w-[2px] rounded-full ${active === id ? "bg-[#3e9ce6]" : "bg-[#cbddec]"}`}
                    />
                    <Icon
                      size={17}
                      className={
                        active === id ? "text-[#397fce]" : "text-[#9aacbb]"
                      }
                    />
                    <span>{label}</span>
                  </button>
                ))}
              </nav>
              <div className="my-3 h-px bg-[#e3eaf2]" />
              <Link
                href="/login"
                className="flex min-h-12 items-center gap-3 rounded-[15px] px-3 text-[13px] font-semibold text-[#62778d] transition hover:bg-[#f6faff]"
              >
                <LogOut size={17} className="text-[#9aacbb]" /> Back to login
              </Link>
            </div>
            <div className="mt-5 rounded-[20px] bg-[#eaf5ff] p-5">
              <FlaskConical size={22} className="text-[#397fce]" />
              <p className="mt-3 text-[12px] font-bold text-[#264969]">
                Research use only
              </p>
              <p className="mt-1 text-[11px] leading-[1.7] text-[#6a88a2]">
                Products are not intended for human or veterinary use.
              </p>
            </div>
          </aside>
          <div className="min-w-0">
            <div className="mb-5 flex items-center justify-between rounded-[18px] border border-[#dfeaf4] bg-white px-5 py-4">
              <div>
                <p className="text-[10px] font-bold tracking-[0.15em] text-[#95a6b7] uppercase">
                  Dashboard /{" "}
                  <span className="text-[#397fce]">{current.label}</span>
                </p>
                <h2 className="font-heading mt-1 text-[21px] font-semibold tracking-[-0.04em]">
                  {current.label}
                </h2>
              </div>
              <span className="grid size-11 place-items-center rounded-2xl bg-[#eaf5ff] text-[#397fce]">
                <current.icon size={21} />
              </span>
            </div>
            {active === "overview" ? (
              <Overview changePage={setActive} products={products} />
            ) : (
              panels[active]
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
