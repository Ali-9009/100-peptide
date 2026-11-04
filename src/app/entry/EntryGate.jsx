"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  FlaskConical,
  ShieldCheck,
  Microscope,
} from "lucide-react";

const conditions = [
  {
    number: "01",
    title: "21 years of age or older",
    description: "Access is intended for adults aged 21 and over.",
  },
  {
    number: "02",
    title: "Laboratory research only",
    description:
      "Materials are supplied for in-vitro research and analytical reference.",
  },
  {
    number: "03",
    title: "No human or veterinary use",
    description:
      "Not for consumption, administration, food, or drug manufacture.",
  },
  {
    number: "04",
    title: "No medical purpose",
    description:
      "Not intended to diagnose, treat, cure, or prevent any condition.",
  },
];

export default function EntryGate({ next = "/", error = "" }) {
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [researchConfirmed, setResearchConfirmed] = useState(false);

  const canEnter = ageConfirmed && researchConfirmed;

  return (
    <main className="entry-gate fixed inset-0 z-[9999] h-dvh w-full overflow-hidden bg-[#f7faff]">
      <div className="grid h-full min-h-0 w-full lg:grid-cols-[46%_54%]">
        {/* ============================================
            LEFT — MOUNTAIN / BRAND
        ============================================ */}

        <section className="relative isolate hidden h-full min-h-0 flex-col justify-between overflow-hidden bg-[#07152f] p-8 text-white lg:flex xl:p-10">
          {/* MOUNTAIN BACKGROUND */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,16,36,0.44)_0%,rgba(5,19,42,0.12)_45%,rgba(4,13,31,0.86)_100%),url('/assets/entry.jpg')] bg-cover bg-right"
          />

          {/* SUBTLE GLOW */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-40 -right-40 size-[500px] rounded-full bg-[#397fce]/15 blur-[110px]"
          />

          {/* BRAND */}
          <div className="relative z-10 flex items-center gap-3">
            <span className="grid size-12 place-items-center rounded-2xl border border-white/25 bg-white/10 backdrop-blur-md">
              <FlaskConical size={25} strokeWidth={1.5} />
            </span>

            <div>
              <span className="font-heading block text-[27px] leading-none font-bold tracking-[-0.06em]">
                100 PEPTIDES
              </span>

              <span className="mt-1.5 block text-[9px] font-bold tracking-[0.3em] text-[#acd9ff] uppercase">
                Research
              </span>
            </div>
          </div>

          {/* BOTTOM LABEL */}
          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <span className="size-2 rotate-45 bg-[#77c2ff]" />

            <span className="text-[9px] font-bold tracking-[0.17em] text-[#d1e6f8] uppercase">
              Research Materials
            </span>

            <span className="size-1 rounded-full bg-white/40" />

            <span className="text-[9px] font-bold tracking-[0.17em] text-[#d1e6f8] uppercase">
              Responsible Access
            </span>
          </div>
        </section>

        {/* ============================================
            RIGHT — ENTRY CONFIRMATION
        ============================================ */}

        <section
          aria-labelledby="entry-title"
          className="entry-panel relative flex h-full min-h-0 items-center overflow-hidden bg-[linear-gradient(145deg,#ffffff_0%,#f8fbff_55%,#edf5ff_100%)] px-5 sm:px-8 lg:px-10 xl:px-16"
        >
          <div className="entry-content mx-auto w-full max-w-[680px]">
            {/* MOBILE BRAND */}
            <div className="entry-mobile-brand mb-5 flex items-center gap-2.5 lg:hidden">
              <span className="grid size-9 place-items-center rounded-xl bg-[#0b1b3f] text-white">
                <FlaskConical size={19} />
              </span>

              <div>
                <span className="font-heading block text-[19px] leading-none font-bold tracking-[-0.05em] text-[#0b1b3f]">
                  100 PEPTIDES
                </span>

                <span className="mt-1 block text-[8px] font-bold tracking-[0.22em] text-[#397fce] uppercase">
                  Research
                </span>
              </div>
            </div>

            {/* TOP LABEL */}
            <div className="entry-top-label mb-5 flex lg:justify-end">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#c6def2] bg-[#eaf4ff] px-3.5 py-2 text-[9px] font-bold tracking-[0.13em] text-[#397fce] uppercase">
                <ShieldCheck size={14} />
                Confirmation Required
              </span>
            </div>

            {/* HEADING */}
            <header>
              <h1
                id="entry-title"
                className="entry-heading font-heading text-[clamp(36px,5vw,72px)] leading-[0.99] font-bold tracking-[-0.075em] text-[#0b1b3f]"
              >
                The boundary
                <br />
                is <span className="text-[#397fce]">non-negotiable.</span>
              </h1>

              <p className="entry-description mt-4 max-w-[570px] text-[13px] leading-[1.7] text-[#607b97] sm:text-[14px]">
                100 Peptides Research compounds are supplied for laboratory
                research use only. Review and confirm the conditions below to
                enter.
              </p>
            </header>

            {/* ============================================
                CONDITIONS
            ============================================ */}

            <div className="entry-conditions mt-6 border-t border-[#d6e4f1]">
              {conditions.map((condition) => (
                <article
                  key={condition.number}
                  className="entry-condition grid grid-cols-[24px_minmax(0,1fr)_18px] items-center gap-3 border-b border-[#d6e4f1] py-3 sm:grid-cols-[32px_minmax(0,1fr)_20px] sm:gap-4 lg:py-3.5"
                >
                  {/* NUMBER */}
                  <span className="text-[10px] font-extrabold tracking-[0.08em] text-[#397fce]">
                    {condition.number}
                  </span>

                  {/* CONTENT */}
                  <div className="min-w-0">
                    <h2 className="font-heading entry-condition-title text-[15px] leading-[1.2] font-semibold tracking-[-0.035em] text-[#0b1b3f] sm:text-[17px] lg:text-[18px]">
                      {condition.title}
                    </h2>

                    <p className="entry-condition-description mt-1 text-[10px] leading-[1.5] text-[#71869d] sm:text-[11px]">
                      {condition.description}
                    </p>
                  </div>

                  <Check
                    size={17}
                    strokeWidth={1.8}
                    className="text-[#397fce]"
                    aria-hidden="true"
                  />
                </article>
              ))}
            </div>

            {/* ============================================
                CONFIRMATION FORM
            ============================================ */}

            <form action="/api/entry" method="POST" className="entry-form mt-5">
              <input type="hidden" name="next" value={next} />

              {/* CHECKBOXES */}
              <div className="entry-checkboxes space-y-3">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="ageConfirmed"
                    value="yes"
                    checked={ageConfirmed}
                    onChange={(event) => setAgeConfirmed(event.target.checked)}
                    className="mt-0.5 size-[18px] shrink-0 cursor-pointer accent-[#397fce]"
                    required
                  />

                  <span className="text-[11px] leading-[1.6] text-[#45627f]">
                    I confirm that I am{" "}
                    <strong className="text-[#0b1b3f]">
                      21 years of age or older.
                    </strong>
                  </span>
                </label>

                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    name="researchConfirmed"
                    value="yes"
                    checked={researchConfirmed}
                    onChange={(event) =>
                      setResearchConfirmed(event.target.checked)
                    }
                    className="mt-0.5 size-[18px] shrink-0 cursor-pointer accent-[#397fce]"
                    required
                  />

                  <span className="text-[11px] leading-[1.6] text-[#45627f]">
                    I understand that these materials are for{" "}
                    <strong className="text-[#0b1b3f]">
                      laboratory research use only
                    </strong>{" "}
                    and are not intended for human or veterinary use.
                  </span>
                </label>
              </div>

              {/* ERROR */}
              {error && (
                <p
                  role="alert"
                  className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-[11px] font-medium text-red-700"
                >
                  Both confirmations are required before entering.
                </p>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={!canEnter}
                className="entry-button mt-5 inline-flex min-h-11 items-center justify-center gap-3 rounded-full bg-[#0b1b3f] px-7 text-[12px] font-bold text-white transition-all duration-300 hover:bg-[#397fce] disabled:cursor-not-allowed disabled:bg-[#aebdcc]"
              >
                Accept & Enter
                <ArrowUpRight size={17} />
              </button>

              {/* DISCLAIMER */}
              <p className="entry-disclaimer mt-4 max-w-[570px] text-[10px] leading-[1.6] text-[#7890a8]">
                By continuing, you acknowledge these research-use conditions.
                This does not establish eligibility to purchase any particular
                material.
              </p>
            </form>

            {/* FOOTER */}
            <div className="entry-footer mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-[#dbe7f2] pt-4">
              <span className="inline-flex items-center gap-2 text-[9px] font-bold tracking-[0.08em] text-[#607d9b] uppercase">
                <Microscope size={14} className="text-[#397fce]" />
                Laboratory Research Only
              </span>

              <span className="inline-flex items-center gap-2 text-[9px] font-bold tracking-[0.08em] text-[#607d9b] uppercase">
                <ShieldCheck size={14} className="text-[#397fce]" />
                Responsible Research
              </span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
