"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Eye,
  EyeOff,
  FileCheck2,
  FlaskConical,
  LockKeyhole,
  PackageCheck,
  ShieldCheck,
  UserRound,
  Mail,
  Info,
} from "lucide-react";

const inputClass =
  "h-12 w-full rounded-2xl border border-[#d8e6f3] bg-[#f8fbff] px-4 text-[13px] text-[#0b1b3f] outline-none transition focus:border-[#3984cf] focus:ring-4 focus:ring-[#3984cf]/10";

function Field({
  label,
  name,
  type = "text",
  autoComplete,
  required = true,
  placeholder,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-semibold text-[#263d5c]">
        {label}
      </span>
      <input
        className={inputClass}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
      />
    </label>
  );
}

function PasswordField({ label = "Password", name, autoComplete }) {
  const [visible, setVisible] = useState(false);
  return (
    <label className="block">
      <span className="mb-2 block text-[12px] font-semibold text-[#263d5c]">
        {label}
      </span>
      <span className="relative block">
        <input
          name={name}
          required
          minLength={8}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          className={`${inputClass} pr-12`}
          placeholder="At least 8 characters"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-2 grid w-10 place-items-center text-[#6e879f] hover:text-[#0b1b3f]"
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </span>
    </label>
  );
}

const benefits = [
  {
    icon: PackageCheck,
    title: "Order history",
    text: "Keep purchase references in one place.",
  },
  {
    icon: FileCheck2,
    title: "Batch documents",
    text: "Find relevant product certificates.",
  },
  {
    icon: UserRound,
    title: "Your details",
    text: "Keep contact and delivery details organized.",
  },
];

export default function AccountAccess() {
  const [tab, setTab] = useState("signin");
  const [notice, setNotice] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    setNotice(
      "Authentication is not connected yet. This form is a UI preview and did not create an account or sign you in.",
    );
  };

  const changeTab = (value) => {
    setTab(value);
    setNotice("");
  };

  return (
    <main className="min-h-svh bg-[linear-gradient(180deg,#f1f8ff_0%,#ffffff_100%)] px-4 pt-28 pb-20 text-[#0b1b3f] sm:px-7 sm:pt-32">
      <div className="mx-auto max-w-[1320px]">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex items-center gap-2 text-[12px] text-[#7890a7]"
        >
          <Link href="/" className="hover:text-[#397fce]">
            Home
          </Link>
          <ChevronRight size={14} />
          <span className="font-semibold text-[#0b1b3f]">Account access</span>
        </nav>
        <div className="grid overflow-hidden rounded-[30px] border border-[#dce8f4] bg-white shadow-[0_24px_85px_rgba(18,50,90,0.08)] lg:grid-cols-[0.95fr_1.05fr]">
          <section
            className="relative isolate overflow-hidden bg-[linear-gradient(145deg,#07152f_0%,#10264f_54%,#2869ae_100%)] p-7 text-white sm:p-12 lg:min-h-[740px] lg:p-14"
            aria-labelledby="account-intro-title"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-40 -right-40 size-[500px] rounded-full bg-[#6db5ff]/25 blur-[110px]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-32 -left-28 size-[420px] rounded-full bg-[#5fb6fd]/20 blur-[95px]"
            />
            <div className="relative z-10">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-bold tracking-[0.18em] text-[#b5ddff] uppercase">
                <FlaskConical size={15} /> Your research account
              </span>
              <h1
                id="account-intro-title"
                className="font-heading mt-8 max-w-[540px] text-[clamp(39px,4.4vw,66px)] leading-[1.05] font-semibold tracking-[-0.065em]"
              >
                Every detail,
                <br />
                <span className="text-[#93ceff]">in one place.</span>
              </h1>
              <p className="mt-6 max-w-[470px] text-[14px] leading-[1.9] text-[#c5d8ed]">
                Orders, batch certificates, and addresses, organized in one
                account. Your basket stays with you whether you sign in or
                continue as a guest.
              </p>
              <div className="mt-10 grid gap-3">
                {benefits.map(({ icon: Icon, title, text }) => (
                  <div
                    key={title}
                    className="flex gap-4 rounded-[20px] border border-white/15 bg-white/[0.07] p-4 backdrop-blur-sm"
                  >
                    <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-white/10 text-[#a5d7ff]">
                      <Icon size={21} />
                    </span>
                    <div>
                      <h2 className="text-[13px] font-bold">{title}</h2>
                      <p className="mt-1 text-[12px] leading-relaxed text-[#c2d2e5]">
                        {text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap items-center gap-3 text-[11px] text-[#c1d4e9]">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={17} /> Research-use information
                </span>
                <span className="text-white/30">/</span>
                <span>No account required to browse</span>
              </div>
            </div>
          </section>

          <section className="p-6 sm:p-10 lg:p-12" aria-labelledby="form-title">
            <h2
              id="form-title"
              className="font-heading text-[clamp(28px,3vw,39px)] font-semibold tracking-[-0.055em]"
            >
              Welcome to your account.
            </h2>
            <p className="mt-2 text-sm leading-[1.8] text-[#71869b]">
              Sign in to access your records, or create an account with the
              email you order with.
            </p>

            <Link
              href="/checkout?guest=1"
              className="group mt-7 flex min-h-[58px] items-center justify-between rounded-2xl border border-[#bfddf4] bg-[#ecf6ff] px-5 text-[13px] font-bold text-[#0b1b3f] transition hover:border-[#397fce] hover:bg-[#e0f0ff]"
            >
              <span className="flex items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-white text-[#397fce]">
                  <ArrowRight size={18} />
                </span>{" "}
                Continue as guest
              </span>
              <ArrowUpRight
                size={17}
                className="text-[#397fce] transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>

            <div className="my-7 flex items-center gap-3 text-[11px] text-[#99aabd]">
              <span className="h-px flex-1 bg-[#e2eaf3]" /> OR USE YOUR ACCOUNT{" "}
              <span className="h-px flex-1 bg-[#e2eaf3]" />
            </div>

            <div
              className="grid grid-cols-2 rounded-2xl bg-[#eef5fc] p-1.5"
              role="tablist"
              aria-label="Account actions"
            >
              <button
                type="button"
                role="tab"
                aria-selected={tab === "signin"}
                onClick={() => changeTab("signin")}
                className={`min-h-11 rounded-xl text-sm font-semibold transition ${tab === "signin" ? "bg-white text-[#0b1b3f] shadow-sm" : "text-[#718ba4] hover:text-[#0b1b3f]"}`}
              >
                Sign in
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={tab === "create"}
                onClick={() => changeTab("create")}
                className={`min-h-11 rounded-xl text-sm font-semibold transition ${tab === "create" ? "bg-white text-[#0b1b3f] shadow-sm" : "text-[#718ba4] hover:text-[#0b1b3f]"}`}
              >
                Create account
              </button>
            </div>

            <div className="mt-7" role="tabpanel">
              <h3 className="font-heading text-[24px] font-semibold tracking-[-0.04em]">
                {tab === "signin"
                  ? "Sign in to your account"
                  : "Create your account"}
              </h3>
              <p className="mt-2 text-sm leading-[1.8] text-[#7c91a7]">
                {tab === "signin"
                  ? "Use the email address associated with your orders."
                  : "Keep your order history and batch documents together under one email address."}
              </p>
              <form key={tab} onSubmit={onSubmit} className="mt-6 space-y-4">
                {tab === "create" && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="First name"
                      name="firstName"
                      autoComplete="given-name"
                    />
                    <Field
                      label="Last name"
                      name="lastName"
                      autoComplete="family-name"
                    />
                  </div>
                )}
                <Field
                  label="Email address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                />
                <PasswordField
                  name="password"
                  autoComplete={
                    tab === "signin" ? "current-password" : "new-password"
                  }
                />
                {tab === "create" ? (
                  <p className="flex items-center gap-2 text-[11px] text-[#7f91a6]">
                    <LockKeyhole size={14} /> Use at least 8 characters.
                  </p>
                ) : (
                  <div className="flex justify-end">
                    <Link
                      href="/contact"
                      className="text-[12px] font-semibold text-[#397fce] hover:underline"
                    >
                      Forgot password? Contact support
                    </Link>
                  </div>
                )}
                <button
                  type="submit"
                  className="group flex min-h-[54px] w-full items-center justify-between rounded-full bg-[#0b1b3f] px-6 text-[13px] font-bold text-white transition hover:bg-[#285b97]"
                >
                  <span>{tab === "signin" ? "Sign in" : "Create account"}</span>
                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
                  />
                </button>
              </form>
              {notice && (
                <p
                  role="status"
                  className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-[12px] leading-[1.75] text-amber-900"
                >
                  <Info size={17} className="mr-2 inline" />
                  {notice}
                </p>
              )}
              <div className="mt-6 rounded-2xl border border-[#e0ebf5] bg-[#f8fbff] p-4">
                <p className="text-sm text-[#71869b]">
                  <Info size={15} className="mr-1 inline text-[#397fce]" /> UI
                  preview: sign-in, registration, password resets, and account
                  storage require a connected authentication service.{" "}
                  <Link
                    href="/admin"
                    className="font-bold text-[#397fce] hover:underline"
                  >
                    Preview dashboard{" "}
                    <ArrowUpRight size={13} className="inline" />
                  </Link>
                </p>
              </div>
              <p className="mt-6 text-sm text-[#8a9bad]">
                Materials are intended for laboratory research only, not human
                or veterinary use. Creating an account does not obligate you to
                place an order.{" "}
                <Link href="/contact" className="font-bold text-[#397fce]">
                  Ask us a question.
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
