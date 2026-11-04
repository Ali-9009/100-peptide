"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Truck, Info } from "lucide-react";

// Illustrative locations only: replace with actual shipment locations when available.
const ORIGIN = [32.7767, -96.797]; // Dallas, TX
const DESTINATION = [39.7392, -104.9903]; // Denver, CO
const DEMO_PROGRESS = 0.5;
const TRAVEL_DURATION = 12000;

function pointAlongRoute(points, lengths, fraction) {
  const total = lengths[lengths.length - 1];
  const target = total * fraction;
  let low = 1;
  let high = lengths.length - 1;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (lengths[mid] < target) low = mid + 1;
    else high = mid;
  }
  const index = low;
  const previous = index - 1;
  const segment = lengths[index] - lengths[previous];
  const portion = segment > 0 ? (target - lengths[previous]) / segment : 0;
  const start = points[previous];
  const end = points[index];
  return {
    point: [
      start[0] + (end[0] - start[0]) * portion,
      start[1] + (end[1] - start[1]) * portion,
    ],
    index,
  };
}

export default function JourneyMap({ demo = false }) {
  const mapElementRef = useRef(null);
  const progressRef = useRef(null);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!mapElementRef.current) return;

    let map;
    let frame;
    let startTimer;
    let cancelled = false;
    const controller = new AbortController();

    async function initialize() {
      try {
        const leaflet = await import("leaflet");
        if (cancelled || !mapElementRef.current) return;
        const L = leaflet.default ?? leaflet;

        map = L.map(mapElementRef.current, {
          zoomControl: false,
          scrollWheelZoom: false,
          zoomAnimation: true,
          fadeAnimation: true,
        });
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);
        L.control.zoom({ position: "bottomright" }).addTo(map);

        // Initial experience: regular map with origin/destination pins only.
        map.fitBounds(L.latLngBounds([ORIGIN, DESTINATION]), {
          padding: [55, 55],
          animate: false,
        });
        const pin = (coordinate, color, label) =>
          L.circleMarker(coordinate, {
            radius: 9,
            color: "#ffffff",
            weight: 3,
            fillColor: color,
            fillOpacity: 1,
          })
            .addTo(map)
            .bindTooltip(label, { direction: "top", offset: [0, -8] });
        pin(ORIGIN, "#397fce", "Example pickup: Dallas");
        pin(DESTINATION, "#0b1b3f", "Example destination: Denver");

        if (!demo) {
          setStatus("idle");
          return;
        }

        setStatus("loading");
        setError("");

        // OSRM expects longitude,latitude. This service is suitable for demos,
        // not an authenticated order-tracking data source.
        const url = `https://router.project-osrm.org/route/v1/driving/${ORIGIN[1]},${ORIGIN[0]};${DESTINATION[1]},${DESTINATION[0]}?overview=full&geometries=geojson&steps=false`;
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) throw new Error("Road routing is unavailable.");
        const data = await response.json();
        const coordinates = data.routes?.[0]?.geometry?.coordinates;
        if (!Array.isArray(coordinates) || coordinates.length < 2)
          throw new Error("No road route was returned.");
        if (cancelled || !map) return;

        const points = coordinates.map(([lng, lat]) => [lat, lng]);
        const lengths = [0];
        for (let i = 1; i < points.length; i++) {
          lengths.push(lengths[i - 1] + map.distance(points[i - 1], points[i]));
        }

        // Light full route + progressively revealed traveled segment.
        L.polyline(points, {
          color: "#ffffff",
          weight: 10,
          opacity: 0.95,
          lineCap: "round",
          lineJoin: "round",
        }).addTo(map);
        L.polyline(points, {
          color: "#9bc5ec",
          weight: 5,
          opacity: 0.9,
          lineCap: "round",
          lineJoin: "round",
        }).addTo(map);
        const traveled = L.polyline([points[0]], {
          color: "#126bd4",
          weight: 6,
          lineCap: "round",
          lineJoin: "round",
        }).addTo(map);

        const truckIcon = L.divIcon({
          className: "tracking-truck-icon",
          html: '<div class="tracking-truck-marker"><span>🚚</span></div>',
          iconSize: [52, 52],
          iconAnchor: [26, 26],
        });
        const truck = L.marker(points[0], {
          icon: truckIcon,
          interactive: false,
          zIndexOffset: 1000,
        }).addTo(map);

        setStatus("zooming");
        map.flyTo(points[0], 7, { animate: true, duration: 1.45 });

        // Begin only after the camera gets close to pickup.
        startTimer = window.setTimeout(() => {
          if (cancelled || !map) return;
          setStatus("moving");
          let startTime;
          let lastPan = 0;
          let lastLine = 0;

          const draw = (timestamp) => {
            if (cancelled || !map) return;
            startTime ??= timestamp;
            const t = Math.min((timestamp - startTime) / TRAVEL_DURATION, 1);
            const progress = t * DEMO_PROGRESS;
            const { point, index } = pointAlongRoute(points, lengths, progress);

            truck.setLatLng(point);
            if (progressRef.current)
              progressRef.current.textContent = `${Math.round(progress * 100)}%`;

            if (timestamp - lastLine >= 65 || t === 1) {
              traveled.setLatLngs([...points.slice(0, index), point]);
              lastLine = timestamp;
            }
            if (timestamp - lastPan >= 180 && t < 1) {
              map.panTo(point, { animate: false });
              lastPan = timestamp;
            }

            if (t < 1) {
              frame = requestAnimationFrame(draw);
              return;
            }

            // Freeze at the illustrative midpoint; never mark the parcel delivered.
            map.panTo(point, { animate: true, duration: 0.7 });
            if (progressRef.current) progressRef.current.textContent = "50%";
            setStatus("midpoint");
          };
          frame = requestAnimationFrame(draw);
        }, 1600);
      } catch (cause) {
        if (cancelled || cause.name === "AbortError") return;
        setStatus("error");
        setError("The example road route is unavailable right now.");
      }
    }

    initialize();
    return () => {
      cancelled = true;
      controller.abort();
      window.clearTimeout(startTimer);
      if (frame) cancelAnimationFrame(frame);
      if (map) map.remove();
    };
  }, [demo]);

  const active = demo && status !== "idle";
  return (
    <section className="relative flex min-h-[560px] flex-col overflow-hidden rounded-[28px] border border-[#c7e0f5] bg-[#eaf4ff]">
      <header className="relative z-20 flex flex-wrap items-start justify-between gap-4 border-b border-[#dce9f4] bg-white px-5 py-5 sm:px-7">
        <div>
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-[#397fce] uppercase">
            <Navigation size={13} /> Shipment Journey
          </span>
          <h2 className="font-heading mt-2 text-[26px] font-semibold tracking-[-0.05em] text-[#0b1b3f] sm:text-[30px]">
            {status === "midpoint"
              ? "Journey preview paused."
              : "From here to there."}
          </h2>
          <p className="mt-1 text-[12px] text-[#71869d]">
            {active
              ? "Illustrative Dallas to Denver route — not an actual order location."
              : "Enter tracking details to check an order. The map shows example locations."}
          </p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-3 py-2 text-[10px] font-bold text-blue-700">
          <span
            className={`size-2 rounded-full bg-[#397fce] ${status === "moving" ? "animate-pulse" : ""}`}
          />
          {status === "midpoint"
            ? "Demo stopped at 50%"
            : active
              ? "Route preview"
              : "Map preview"}
        </span>
      </header>

      <div className="relative min-h-[400px] flex-1">
        <div
          ref={mapElementRef}
          aria-label="Example map between Dallas and Denver"
          className="absolute inset-0 z-0"
        />

        {active && status !== "error" && (
          <div className="pointer-events-none absolute bottom-5 left-5 z-[500] flex max-w-[calc(100%-40px)] items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-[0_12px_35px_rgba(11,27,63,0.15)] backdrop-blur-xl">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#e8f4ff] text-[#397fce]">
              <Truck size={21} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold tracking-wider text-[#71869d] uppercase">
                Example route progress
              </p>
              <p className="text-[12px] font-bold text-[#0b1b3f]">
                {status === "midpoint"
                  ? "Preview stopped halfway"
                  : "Dallas → Denver"}
              </p>
            </div>
            <span
              ref={progressRef}
              className="ml-2 text-[13px] font-bold text-[#397fce]"
            >
              0%
            </span>
          </div>
        )}
        {(status === "loading" || status === "zooming") && (
          <span className="pointer-events-none absolute top-4 left-4 z-[500] rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#397fce] shadow-sm">
            {status === "loading"
              ? "Preparing road route..."
              : "Zooming to pickup..."}
          </span>
        )}
        {status === "error" && (
          <p
            role="alert"
            className="absolute top-4 right-4 left-4 z-[500] rounded-xl bg-white p-4 text-xs text-amber-800"
          >
            {error}
          </p>
        )}
      </div>
      <footer className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-t border-[#dce9f4] bg-white px-5 py-4 sm:px-7">
        <span className="flex items-center gap-2 text-[11px] font-semibold text-[#607c98]">
          <Info size={15} className="text-[#397fce]" /> Demonstration only —
          shipment status requires verified tracking data
        </span>
        <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] text-[#397fce] uppercase">
          <MapPin size={13} /> US route preview
        </span>
      </footer>
    </section>
  );
}
