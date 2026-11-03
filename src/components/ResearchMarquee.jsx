"use client";

import {
  FlaskConical,
  Microscope,
  Atom,
  Sparkles,
  AtomIcon,
} from "lucide-react";

const marqueeItems = [
  {
    id: "01",
    type: "badge",
    text: "RESEARCH COLLECTION",
    icon: FlaskConical,
  },
  {
    id: "02",
    type: "feature",
    title: "Explore",
    highlight: "The Science",
  },
  {
    id: "03",
    type: "italic",
    text: "made for curious minds",
  },
  {
    id: "04",
    type: "badge",
    text: "FOR LABORATORY RESEARCH",
    icon: Microscope,
  },
  {
    id: "05",
    type: "feature",
    title: "Discover",
    highlight: "What's Next",
  },
  {
    id: "06",
    type: "italic",
    text: "where curiosity begins",
  },
  {
    id: "07",
    type: "badge",
    text: "100 PEPTIDES RESEARCH",
    icon: Atom,
  },
  {
    id: "08",
    type: "feature",
    title: "Driven by",
    highlight: "Discovery",
  },
  {
    id: "09",
    type: "italic",
    text: "a new perspective on research",
  },
];

function MarqueeGroup({ duplicate = false }) {
  return (
    <div
      aria-hidden={duplicate ? "true" : undefined}
      className="flex shrink-0 items-center"
    >
      {marqueeItems.map((item) => {
        const Icon = item.icon;

        return (
          <div key={item.id} className="flex shrink-0 items-center">
            {/* RESEARCH BADGE */}
            {item.type === "badge" && (
              <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-[#90c3f0] bg-white/80 px-4 py-2 shadow-[0_3px_12px_rgba(35,112,192,0.06)]">
                <Icon size={14} strokeWidth={2} className="text-[#368dd3]" />

                <span className="font-sans text-[10px] font-bold tracking-[0.16em] whitespace-nowrap text-[#2368ad] uppercase sm:text-[11px]">
                  {item.text}
                </span>
              </span>
            )}

            {/* LARGE FEATURE TEXT */}
            {item.type === "feature" && (
              <span className="inline-flex shrink-0 items-baseline gap-2 whitespace-nowrap">
                <span className="font-heading text-[22px] font-bold tracking-[-0.055em] text-[#123c73] sm:text-[27px]">
                  {item.title}
                </span>

                <span className="font-heading text-[22px] font-bold tracking-[-0.055em] text-[#358bd0] sm:text-[27px]">
                  {item.highlight}
                </span>
              </span>
            )}

            {/* ITALIC EDITORIAL TEXT */}
            {item.type === "italic" && (
              <span className="shrink-0 font-serif text-[20px] whitespace-nowrap text-[#356b9f] italic sm:text-[25px]">
                {item.text}
              </span>
            )}

            {/* PREMIUM SPARKLE SEPARATOR */}
            <span
              aria-hidden="true"
              className="mx-7 flex shrink-0 items-center justify-center sm:mx-10"
            >
              <span className="grid size-9 place-items-center rounded-full border border-[#95c7ed]/70 bg-white/50 shadow-[0_3px_12px_rgba(35,112,192,0.06)]">
                <AtomIcon
                  size={17}
                  strokeWidth={1.6}
                  className="text-[#368dd3]"
                />
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function ResearchMarquee() {
  return (
    <section
      aria-label="100 Peptides Research highlights"
      className="relative isolate overflow-hidden border-y border-[#a4d0f3] bg-[#cce7fb] py-[14px] sm:py-[16px]"
    >
      {/* LIGHT BLUE GRADIENT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[linear-gradient(110deg,#d8edff_0%,#b9dcfa_45%,#cce7ff_100%)]"
      />

      {/* TOP HIGHLIGHT */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-white/80"
      />

      {/* INFINITE MARQUEE */}
      <div className="research-marquee-track relative z-10 flex w-max items-center">
        <MarqueeGroup />
        <MarqueeGroup duplicate />
      </div>

      {/* LEFT FADE */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-8 bg-gradient-to-r from-[#cce7fb] to-transparent sm:w-16"
      />

      {/* RIGHT FADE */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-8 bg-gradient-to-l from-[#cce7fb] to-transparent sm:w-16"
      />

      {/* BOTTOM BORDER */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-[#81b8e8]/40"
      />

      <style jsx global>{`
        @keyframes researchMarqueeScroll {
          from {
            transform: translate3d(0, 0, 0);
          }

          to {
            transform: translate3d(-50%, 0, 0);
          }
        }

        .research-marquee-track {
          animation: researchMarqueeScroll 42s linear infinite;
          will-change: transform;
        }

        .research-marquee-track:hover {
          animation-play-state: paused;
        }

        @media (max-width: 640px) {
          .research-marquee-track {
            animation-duration: 32s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .research-marquee-track {
            animation: none;
            transform: none;
            will-change: auto;
          }
        }
      `}</style>
    </section>
  );
}
