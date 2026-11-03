"use client";

import { useEffect, useRef, useState } from "react";

import {
  ComposableMap,
  Geographies,
  Geography,
  Line,
  Marker,
} from "react-simple-maps";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  MapPin,
  Truck,
  PackageCheck,
  ArrowUpRight,
  Clock3,
  Navigation,
  Check,
  RotateCcw,
  MoveUpRight,
} from "lucide-react";

// US state TopoJSON
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

// Your existing delivery estimates
const stateData = {
  "01": { name: "Alabama", days: "3–5" },
  "02": { name: "Alaska", days: "5–7" },
  "04": { name: "Arizona", days: "3–5" },
  "05": { name: "Arkansas", days: "3–4" },
  "06": { name: "California", days: "3–5" },
  "08": { name: "Colorado", days: "3–5" },
  "09": { name: "Connecticut", days: "2–4" },
  10: { name: "Delaware", days: "2–4" },
  12: { name: "Florida", days: "3–5" },
  13: { name: "Georgia", days: "2–4" },
  15: { name: "Hawaii", days: "5–7" },
  16: { name: "Idaho", days: "4–6" },
  17: { name: "Illinois", days: "2–4" },
  18: { name: "Indiana", days: "2–4" },
  19: { name: "Iowa", days: "3–4" },
  20: { name: "Kansas", days: "2–4" },
  21: { name: "Kentucky", days: "2–4" },
  22: { name: "Louisiana", days: "2–4" },
  23: { name: "Maine", days: "3–5" },
  24: { name: "Maryland", days: "2–3" },
  25: { name: "Massachusetts", days: "2–3" },
  26: { name: "Michigan", days: "3–5" },
  27: { name: "Minnesota", days: "3–4" },
  28: { name: "Mississippi", days: "2–4" },
  29: { name: "Missouri", days: "2–4" },
  30: { name: "Montana", days: "4–6" },
  31: { name: "Nebraska", days: "3–4" },
  32: { name: "Nevada", days: "3–5" },
  33: { name: "New Hampshire", days: "2–4" },
  34: { name: "New Jersey", days: "2–3" },
  35: { name: "New Mexico", days: "3–5" },
  36: { name: "New York", days: "2–4" },
  37: { name: "North Carolina", days: "2–4" },
  38: { name: "North Dakota", days: "3–5" },
  39: { name: "Ohio", days: "2–4" },
  40: { name: "Oklahoma", days: "2–3" },
  41: { name: "Oregon", days: "4–6" },
  42: { name: "Pennsylvania", days: "2–4" },
  44: { name: "Rhode Island", days: "2–4" },
  45: { name: "South Carolina", days: "2–4" },
  46: { name: "South Dakota", days: "3–5" },
  47: { name: "Tennessee", days: "2–4" },
  48: { name: "Texas", days: "1–2" },
  49: { name: "Utah", days: "3–5" },
  50: { name: "Vermont", days: "2–4" },
  51: { name: "Virginia", days: "2–4" },
  53: { name: "Washington", days: "4–6" },
  54: { name: "West Virginia", days: "2–4" },
  55: { name: "Wisconsin", days: "3–4" },
  56: { name: "Wyoming", days: "3–5" },
};

const origin = [-96.797, 32.7767];

const cities = [
  {
    name: "Seattle",
    coordinates: [-122.33, 47.6],
  },
  {
    name: "Los Angeles",
    coordinates: [-118.24, 34.05],
  },
  {
    name: "Denver",
    coordinates: [-104.99, 39.73],
  },
  {
    name: "Chicago",
    coordinates: [-87.62, 41.87],
  },
  {
    name: "New York",
    coordinates: [-74.0, 40.71],
  },
  {
    name: "Miami",
    coordinates: [-80.19, 25.76],
  },
];

const STATE_DEFAULT = "#dbeafe";
const STATE_HOVER = "#93c5fd";
const STATE_SELECTED = "#397fce";
const STATE_BORDER = "#ffffff";

export default function ShippingMap() {
  const sectionRef = useRef(null);
  const mapRef = useRef(null);
  const cardRef = useRef(null);

  const [selectedState, setSelectedState] = useState(null);
  const [hoveredState, setHoveredState] = useState(null);
  const [motionAllowed, setMotionAllowed] = useState(false);

  const selectedInfo = selectedState ? stateData[selectedState] : null;

  const hoveredInfo = hoveredState ? stateData[hoveredState] : null;

  const activeInfo = selectedInfo || {
    name: "Dallas, Texas",
    days: "1–2",
  };

  // ==========================================
  // GSAP ANIMATIONS
  // ==========================================

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    setMotionAllowed(!motionQuery.matches);

    const updateMotion = () => {
      setMotionAllowed(!motionQuery.matches);
    };

    motionQuery.addEventListener("change", updateMotion);

    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        });

        tl.fromTo(
          "[data-shipping-heading]",
          {
            opacity: 0,
            y: 45,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
        )
          .fromTo(
            mapRef.current,
            {
              opacity: 0,
              y: 55,
              scale: 0.96,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.1,
              ease: "power3.out",
            },
            "-=0.55",
          )
          .fromTo(
            cardRef.current,
            {
              opacity: 0,
              x: 45,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: "power3.out",
            },
            "-=0.75",
          );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      motionQuery.removeEventListener("change", updateMotion);
    };
  }, []);

  // ==========================================
  // SELECT STATE
  // ==========================================

  const selectState = (geo) => {
    const id = String(geo.id).padStart(2, "0");

    setSelectedState(id);
  };

  const resetSelection = () => {
    setSelectedState(null);
    setHoveredState(null);
  };

  const handleStateEnter = (geo) => {
    setHoveredState(String(geo.id).padStart(2, "0"));
  };

  const handleStateLeave = () => {
    setHoveredState(null);
  };

  return (
    <section
      ref={sectionRef}
      id="shipping-map"
      aria-labelledby="shipping-map-title"
      className="relative isolate overflow-hidden px-5 py-16 sm:px-8 md:py-18"
    >
      {/* BACKGROUND */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 -z-10 size-[600px] rounded-full"
      />

      <div className="relative mx-auto max-w-7xl">
        {/* ==========================================
            SECTION HEADING
        ========================================== */}

        <header
          data-shipping-heading
          className="mb-8 flex flex-col justify-between gap-6 lg:mb-10 lg:flex-row lg:items-end"
        >
          <div className="max-w-220">
            {/* TITLE */}
            <h2
              id="shipping-map-title"
              className="font-heading text-primary text-[clamp(32px,4vw,52px)] leading-[1.05] font-semibold tracking-[-0.05em]"
            >
              From Our Hub <span className="text-[#397fce]">To Your Lab.</span>
            </h2>

            <p className="mt-5 font-sans text-[15px] leading-[1.85] text-slate-600 sm:text-[17px]">
              Explore estimated delivery windows across the United States.
              Select any state to view its shipping information.
            </p>
          </div>

          {/* TOP STATUS */}
          <div className="inline-flex items-center gap-3 self-start rounded-full border border-[#d8e7f6] bg-white px-5 py-3 lg:self-end">
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#397fce] opacity-25" />

              <span className="relative inline-flex size-3 rounded-full bg-[#397fce]" />
            </span>

            <span className="text-primary text-[12px] font-semibold">
              Interactive Delivery Map
            </span>
          </div>
        </header>

        {/* ==========================================
            MAIN LAYOUT
        ========================================== */}

        <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)] lg:gap-5">
          {/* ==========================================
      LEFT MAP PANEL
  ========================================== */}

          <div
            ref={mapRef}
            className="relative min-w-0 overflow-hidden rounded-[24px] border border-[#dce9f6] bg-white p-4 shadow-[0_15px_40px_rgba(11,27,63,0.04)] sm:p-5 lg:p-6"
          >
            {/* TOP BAR */}
            <div className="relative z-20 mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="grid size-9 place-items-center rounded-xl bg-[#ecf5ff] text-[#397fce]">
                  <Navigation size={16} />
                </span>

                <div>
                  <h3 className="font-heading text-primary text-[15px] font-semibold">
                    Shipping Coverage
                  </h3>
                  <p className="text-[10px] text-slate-500">
                    United States · Interactive map
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={resetSelection}
                className="group text-primary inline-flex min-h-[36px] items-center gap-1.5 rounded-full border border-[#dce9f6] bg-[#f8fbff] px-3 text-[11px] font-semibold transition-colors duration-300 hover:bg-[#eaf4ff]"
              >
                <RotateCcw
                  size={12}
                  className="transition-transform duration-500 group-hover:-rotate-90"
                />
                Reset
              </button>
            </div>

            {/* MAP BACKGROUND */}
            <div className="relative overflow-hidden rounded-[18px] bg-[radial-gradient(ellipse_at_50%_45%,#ffffff_0%,#f2f8ff_65%,#e8f3ff_100%)] px-1 py-2 sm:px-2">
              {/* SUBTLE GRID */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 [background-image:linear-gradient(#c7def5_1px,transparent_1px),linear-gradient(90deg,#c7def5_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.25]"
              />

              {/* MAP (Shrunk scale & viewport) */}
              <ComposableMap
                projection="geoAlbersUsa"
                projectionConfig={{
                  scale: 750,
                }}
                width={600}
                height={360}
                aria-label="Interactive map of United States shipping estimates"
                className="relative z-10 mx-auto h-auto w-full max-w-[600px]"
              >
                <defs>
                  <linearGradient
                    id="shipping-map-state"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#eaf5ff" />
                    <stop offset="100%" stopColor="#bfdbfe" />
                  </linearGradient>

                  <radialGradient id="shipping-dallas-glow">
                    <stop offset="0%" stopColor="#397fce" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#397fce" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* STATES */}
                <Geographies geography={geoUrl}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const id = String(geo.id).padStart(2, "0");
                      const selected = selectedState === id;
                      const hovered = hoveredState === id;
                      const fill = selected
                        ? STATE_SELECTED
                        : hovered
                          ? STATE_HOVER
                          : STATE_DEFAULT;

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={fill}
                          stroke={STATE_BORDER}
                          strokeWidth={1}
                          onMouseEnter={() => handleStateEnter(geo)}
                          onMouseLeave={handleStateLeave}
                          onClick={() => selectState(geo)}
                          onFocus={() => handleStateEnter(geo)}
                          onBlur={handleStateLeave}
                          onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                              event.preventDefault();
                              selectState(geo);
                            }
                          }}
                          role="button"
                          tabIndex={0}
                          aria-pressed={selected}
                          aria-label={`Shipping to ${stateData[id]?.name || geo.properties.name}`}
                          style={{
                            default: {
                              fill,
                              stroke: STATE_BORDER,
                              strokeWidth: 1,
                              outline: "none",
                              cursor: "pointer",
                              transition: "fill 250ms ease",
                            },
                            hover: {
                              fill: selected ? STATE_SELECTED : STATE_HOVER,
                              stroke: STATE_BORDER,
                              strokeWidth: 1,
                              outline: "none",
                              cursor: "pointer",
                            },
                            pressed: {
                              fill: STATE_SELECTED,
                              stroke: STATE_BORDER,
                              outline: "none",
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                {/* SHIPPING ROUTES */}
                <g
                  fill="none"
                  stroke="#397fce"
                  strokeWidth={1}
                  strokeDasharray="3 5"
                  opacity={0.5}
                  pointerEvents="none"
                >
                  {cities.map((city) => (
                    <Line
                      key={city.name}
                      from={origin}
                      to={city.coordinates}
                      stroke="#397fce"
                      strokeWidth={1}
                      strokeDasharray="3 5"
                      className={
                        motionAllowed ? "shipping-route-animation" : ""
                      }
                    />
                  ))}
                </g>

                {/* DESTINATION CITY MARKERS */}
                {cities.map((city) => (
                  <Marker key={city.name} coordinates={city.coordinates}>
                    <circle
                      r={3}
                      fill="#397fce"
                      stroke="#ffffff"
                      strokeWidth={1.5}
                    />
                    <text
                      textAnchor="middle"
                      y={-8}
                      fill="#0b1b3f"
                      fontSize={9}
                      fontWeight={700}
                      stroke="#ffffff"
                      strokeWidth={2.5}
                      strokeLinejoin="round"
                      paintOrder="stroke"
                      pointerEvents="none"
                    >
                      {city.name}
                    </text>
                  </Marker>
                ))}

                {/* DALLAS ORIGIN */}
                <Marker coordinates={origin}>
                  <circle
                    r={16}
                    fill="url(#shipping-dallas-glow)"
                    className={motionAllowed ? "shipping-hub-pulse" : ""}
                  />
                  <circle
                    r={5}
                    fill="#0b1b3f"
                    stroke="#ffffff"
                    strokeWidth={2}
                  />
                  <circle r={2} fill="#93c5fd" />

                  {/* LABEL */}
                  <g transform="translate(-45, 10)">
                    <rect width={90} height={28} rx={8} fill="#0b1b3f" />
                    <text
                      x={45}
                      y={12}
                      textAnchor="middle"
                      fill="#ffffff"
                      fontSize={9}
                      fontWeight={700}
                    >
                      Dallas, TX
                    </text>
                    <text
                      x={45}
                      y={21}
                      textAnchor="middle"
                      fill="#a5d0ff"
                      fontSize={7}
                    >
                      Dispatch Origin
                    </text>
                  </g>
                </Marker>
              </ComposableMap>

              {/* HOVER LABEL */}
              {hoveredInfo && (
                <div className="pointer-events-none absolute right-2 bottom-2 z-20 rounded-lg border border-[#dce9f6] bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-lg sm:right-3 sm:bottom-3">
                  <span className="text-[8px] font-semibold tracking-wider text-[#397fce] uppercase">
                    Hovered
                  </span>
                  <p className="text-primary text-[11px] font-semibold">
                    {hoveredInfo.name}
                  </p>
                  <p className="text-[9px] text-slate-500">
                    {hoveredInfo.days} business days
                  </p>
                </div>
              )}
            </div>

            {/* MAP LEGEND */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-[3px] bg-[#dbeafe]" />
                  <span className="text-[10px] text-slate-500">
                    Coverage area
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-[3px] bg-[#397fce]" />
                  <span className="text-[10px] text-slate-500">
                    Selected state
                  </span>
                </div>
              </div>
              <span className="text-[10px] text-[#8a9db4]">
                Click a state to explore
              </span>
            </div>
          </div>

          {/* ==========================================
      RIGHT INFORMATION PANEL
  ========================================== */}

          <aside
            ref={cardRef}
            className="relative flex min-w-0 flex-col overflow-hidden rounded-[24px] border border-[#dce9f6] bg-white p-5 shadow-[0_15px_40px_rgba(11,27,63,0.04)] sm:p-6 lg:p-7"
          >
            {/* TOP GRADIENT */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 right-0 left-0 h-[3px] bg-gradient-to-r from-[#397fce] via-[#93c5fd] to-transparent"
            />

            {/* DECORATIVE GLOW */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-[#b8dcff]/25 blur-[45px]"
            />

            {/* TOP STATUS */}
            <div className="relative flex items-start justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eaf5ff] px-2.5 py-1.5 text-[9px] font-bold tracking-[0.15em] text-[#397fce] uppercase">
                <MapPin size={11} />
                Nationwide
              </span>
              <span className="grid size-9 place-items-center rounded-xl border border-[#dce9f6] bg-[#f7fbff] text-[#397fce]">
                <Navigation size={16} />
              </span>
            </div>

            {/* MAIN STAT */}
            <div className="relative mt-1">
              <div className="flex items-baseline gap-1.5">
                <span className="font-heading text-primary text-[42px] leading-none font-semibold tracking-[-0.08em]">
                  50
                </span>
                <span className="text-[14px] font-medium text-slate-500">
                  states
                </span>
              </div>
              <p className="mt-2 text-[10px] font-semibold tracking-[0.13em] text-[#397fce] uppercase">
                Shipping Coverage
              </p>
            </div>

            {/* SELECTED STATE */}
            <div
              className="relative mt-6 border-t border-[#e5edf5] pt-6"
              aria-live="polite"
              aria-atomic="true"
            >
              <div className="flex items-start gap-2.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-[#eaf5ff] text-[#397fce]">
                  <MapPin size={17} />
                </span>
                <div className="min-w-0">
                  <span className="text-[9px] font-bold tracking-[0.15em] text-slate-400 uppercase">
                    {selectedInfo ? "Selected Destination" : "Dispatch Origin"}
                  </span>
                  <h3 className="font-heading text-primary mt-0.5 text-[clamp(20px,2.2vw,26px)] leading-tight font-semibold tracking-[-0.04em]">
                    {activeInfo.name}
                  </h3>
                </div>
              </div>

              <p className="mt-3 text-[13px] leading-[1.6] text-slate-600">
                {selectedInfo
                  ? `Estimated standard delivery to ${activeInfo.name}. Timelines are based on business days.`
                  : "Select a state on the map to explore its estimated shipping window."}
              </p>

              {/* DELIVERY TIME */}
              <div className="mt-5 rounded-[16px] border border-[#d8e9fa] bg-[#f0f7ff] p-4">
                <span className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.1em] text-[#397fce] uppercase">
                  <Clock3 size={12} />
                  Estimated Delivery
                </span>

                <div className="mt-2 flex items-end gap-1.5">
                  <span className="font-heading text-primary text-[clamp(32px,3vw,42px)] leading-none font-semibold tracking-[-0.055em]">
                    {activeInfo.days}
                  </span>
                  <span className="pb-0.5 text-[11px] text-slate-500">
                    business days
                  </span>
                </div>

                {/* DECORATIVE PROGRESS */}
                <div aria-hidden="true" className="mt-4 grid grid-cols-5 gap-1">
                  {[0, 1, 2, 3, 4].map((item) => (
                    <span
                      key={item}
                      className={`h-1 rounded-full ${item < 3 ? "bg-[#397fce]" : "bg-[#c5def6]"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* MAP ANIMATION */}
      <style jsx global>{`
        @keyframes shippingRouteMove {
          from {
            stroke-dashoffset: 0;
          }

          to {
            stroke-dashoffset: -48;
          }
        }

        .shipping-route-animation {
          animation: shippingRouteMove 6s linear infinite;
        }

        @keyframes shippingHubPulse {
          0%,
          100% {
            opacity: 0.5;
            transform: scale(1);
          }

          50% {
            opacity: 0.2;
            transform: scale(1.25);
          }
        }

        .shipping-hub-pulse {
          transform-box: fill-box;
          transform-origin: center;
          animation: shippingHubPulse 3s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .shipping-route-animation,
          .shipping-hub-pulse {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
