"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Navigation, Truck, CheckCircle2 } from "lucide-react";

const ORIGIN = [32.7767, -96.797]; // Dallas
const DESTINATION = [39.7392, -104.9903]; // Denver

const ANIMATION_DURATION = 26000;
const FOLLOW_ZOOM = 7;
const ARRIVAL_ZOOM = 12;

const money = (number) => Math.round(number);

function getRoutePosition(points, distances, progress) {
  const totalDistance = distances[distances.length - 1];
  const targetDistance = totalDistance * progress;

  let low = 0;
  let high = distances.length - 1;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);

    if (distances[mid] < targetDistance) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  const nextIndex = Math.max(1, low);
  const previousIndex = nextIndex - 1;

  const segmentDistance = distances[nextIndex] - distances[previousIndex];

  const fraction =
    segmentDistance === 0
      ? 0
      : (targetDistance - distances[previousIndex]) / segmentDistance;

  const start = points[previousIndex];
  const end = points[nextIndex];

  return {
    position: [
      start[0] + (end[0] - start[0]) * fraction,
      start[1] + (end[1] - start[1]) * fraction,
    ],
    index: nextIndex,
  };
}

export default function JourneyMap({ demo = false }) {
  const mapElementRef = useRef(null);
  const progressTextRef = useRef(null);

  const [status, setStatus] = useState("idle");
  const [routeError, setRouteError] = useState("");

  useEffect(() => {
    if (!mapElementRef.current) return;

    let map = null;
    let animationFrame = null;
    let cancelled = false;

    const controller = new AbortController();

    async function initializeMap() {
      const leafletModule = await import("leaflet");

      if (cancelled || !mapElementRef.current) return;

      const L = leafletModule.default || leafletModule;

      map = L.map(mapElementRef.current, {
        zoomControl: false,
        scrollWheelZoom: false,
        attributionControl: true,
        zoomAnimation: true,
        fadeAnimation: true,
        markerZoomAnimation: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.control
        .zoom({
          position: "bottomright",
        })
        .addTo(map);

      // Initial map.
      map.setView([37.5, -99], 5);

      if (!demo) {
        setStatus("idle");
        return;
      }

      setStatus("loading");
      setRouteError("");

      try {
        // IMPORTANT:
        // OSRM expects longitude,latitude.
        const routeUrl =
          "https://router.project-osrm.org/route/v1/driving/" +
          `${ORIGIN[1]},${ORIGIN[0]};` +
          `${DESTINATION[1]},${DESTINATION[0]}` +
          "?overview=full&geometries=geojson&steps=false";

        const response = await fetch(routeUrl, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Routing service unavailable.");
        }

        const data = await response.json();

        if (
          data.code !== "Ok" ||
          !data.routes?.[0]?.geometry?.coordinates?.length
        ) {
          throw new Error("No driving route was returned.");
        }

        if (cancelled || !map) return;

        // GeoJSON uses [longitude, latitude].
        // Leaflet uses [latitude, longitude].
        const routePoints = data.routes[0].geometry.coordinates.map(
          ([longitude, latitude]) => [latitude, longitude],
        );

        if (routePoints.length < 2) {
          throw new Error("The route does not contain enough points.");
        }

        // Build cumulative distances.
        // This ensures the truck moves at a consistent
        // geographical speed rather than jumping between points.
        const distances = [0];

        for (let index = 1; index < routePoints.length; index++) {
          const segmentDistance = map.distance(
            routePoints[index - 1],
            routePoints[index],
          );

          distances.push(distances[index - 1] + segmentDistance);
        }

        const start = routePoints[0];
        const end = routePoints[routePoints.length - 1];

        // Draw the complete route.
        L.polyline(routePoints, {
          color: "#ffffff",
          weight: 10,
          opacity: 0.95,
          lineCap: "round",
          lineJoin: "round",
        }).addTo(map);

        L.polyline(routePoints, {
          color: "#8bbdf1",
          weight: 5,
          opacity: 0.9,
          lineCap: "round",
          lineJoin: "round",
        }).addTo(map);

        // The traveled portion.
        const traveledLine = L.polyline([start], {
          color: "#1675df",
          weight: 5,
          opacity: 1,
          lineCap: "round",
          lineJoin: "round",
        }).addTo(map);

        // Start marker.
        L.circleMarker(start, {
          radius: 8,
          color: "#ffffff",
          weight: 3,
          fillColor: "#397fce",
          fillOpacity: 1,
        })
          .addTo(map)
          .bindPopup(
            "<strong>Dallas, Texas</strong><br/>Example starting point",
          );

        // Destination marker.
        const destinationMarker = L.circleMarker(end, {
          radius: 10,
          color: "#ffffff",
          weight: 4,
          fillColor: "#0b1b3f",
          fillOpacity: 1,
        })
          .addTo(map)
          .bindPopup(
            "<strong>Denver, Colorado</strong><br/>Example delivery destination",
          );

        // Animated dot.
        const trackingDot = L.circleMarker(start, {
          radius: 8,
          color: "#ffffff",
          weight: 3,
          fillColor: "#1675df",
          fillOpacity: 1,
        }).addTo(map);

        // Truck icon.
        const truckIcon = L.divIcon({
          className: "tracking-truck-icon",
          html: `
            <div class="tracking-truck-marker">
              <span>🚚</span>
            </div>
          `,
          iconSize: [52, 52],
          iconAnchor: [26, 26],
        });

        const truck = L.marker(start, {
          icon: truckIcon,
          interactive: false,
          zIndexOffset: 1000,
        }).addTo(map);

        // Zoom into the origin first.
        map.setView(start, FOLLOW_ZOOM, {
          animate: false,
        });

        setStatus("moving");

        let startTime = null;
        let lastCameraUpdate = 0;
        let lastRouteUpdate = 0;

        function animate(timestamp) {
          if (cancelled || !map) return;

          if (startTime === null) {
            startTime = timestamp;
          }

          const elapsed = timestamp - startTime;

          const progress = Math.min(elapsed / ANIMATION_DURATION, 1);

          // Distance-based interpolation.
          const { position, index } = getRoutePosition(
            routePoints,
            distances,
            progress,
          );

          // Move truck and dot.
          truck.setLatLng(position);
          trackingDot.setLatLng(position);

          // Update progress without rerendering the React component.
          if (progressTextRef.current) {
            progressTextRef.current.textContent = `${money(progress * 100)}%`;
          }

          // Redraw traveled road periodically.
          if (timestamp - lastRouteUpdate > 80 || progress === 1) {
            const traveledPoints = [...routePoints.slice(0, index), position];

            traveledLine.setLatLngs(traveledPoints);
            lastRouteUpdate = timestamp;
          }

          // Camera follows the truck.
          if (timestamp - lastCameraUpdate > 100 && progress < 1) {
            map.panTo(position, {
              animate: false,
            });

            lastCameraUpdate = timestamp;
          }

          if (progress < 1) {
            animationFrame = requestAnimationFrame(animate);
            return;
          }

          // ARRIVAL: force the exact final road position.
          truck.setLatLng(end);
          trackingDot.setLatLng(end);
          traveledLine.setLatLngs(routePoints);

          if (progressTextRef.current) {
            progressTextRef.current.textContent = "100%";
          }

          // Zoom into the destination.
          map.flyTo(end, ARRIVAL_ZOOM, {
            animate: true,
            duration: 2.5,
          });

          setStatus("arrived");

          // Show the destination popup after zooming.
          window.setTimeout(() => {
            if (!cancelled && map) {
              destinationMarker.openPopup();
            }
          }, 2600);
        }

        animationFrame = requestAnimationFrame(animate);
      } catch (error) {
        if (cancelled || error.name === "AbortError") {
          return;
        }

        console.error("Route loading error:", error);

        setStatus("error");
        setRouteError(
          "The example driving route couldn't be loaded. Please try the demo again.",
        );
      }
    }

    initializeMap();

    return () => {
      cancelled = true;
      controller.abort();

      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }

      if (map) {
        map.remove();
      }
    };
  }, [demo]);

  return (
    <section className="relative flex min-h-[560px] flex-col overflow-hidden rounded-[28px] border border-[#c7e0f5] bg-[#eaf4ff]">
      {/* HEADER */}
      <div className="relative z-20 flex flex-wrap items-start justify-between gap-4 border-b border-[#dce9f4] bg-white px-5 py-5 sm:px-7">
        <div>
          <span className="flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-[#397fce] uppercase">
            <Navigation size={13} />
            Shipment Journey
          </span>

          <h3 className="font-heading mt-2 text-[26px] font-semibold tracking-[-0.05em] text-[#0b1b3f] sm:text-[30px]">
            {status === "arrived"
              ? "Journey completed."
              : "From here to there."}
          </h3>

          <p className="mt-1 text-[12px] text-[#71869d]">
            {status === "arrived"
              ? "The example delivery has reached its destination."
              : demo
                ? "Following an example road route from Dallas to Denver."
                : "Explore the US shipping network."}
          </p>
        </div>

        <span
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-bold ${
            status === "arrived"
              ? "border-green-200 bg-green-50 text-green-700"
              : demo
                ? "border-blue-200 bg-blue-50 text-blue-700"
                : "border-slate-200 bg-slate-50 text-slate-600"
          }`}
        >
          <span
            className={`size-2 rounded-full ${
              status === "arrived"
                ? "bg-green-500"
                : demo
                  ? "animate-pulse bg-[#397fce]"
                  : "bg-slate-400"
            }`}
          />

          {status === "arrived"
            ? "Demo Arrived"
            : demo
              ? "Animated Demo"
              : "No Live Tracking"}
        </span>
      </div>

      {/* MAP */}
      <div className="relative min-h-100 flex-1">
        <div
          ref={mapElementRef}
          aria-label="Interactive map showing an illustrative road journey from Dallas to Denver"
          className="absolute inset-0 z-0"
        />

        {/* ROUTE STATUS */}
        {demo && (
          <div className="pointer-events-none absolute bottom-5 left-5 z-[500] flex items-center gap-3 rounded-2xl border border-white/80 bg-white/95 px-4 py-3 shadow-[0_12px_35px_rgba(11,27,63,0.15)] backdrop-blur-xl">
            <span
              className={`grid size-10 place-items-center rounded-xl ${
                status === "arrived"
                  ? "bg-green-50 text-green-600"
                  : "bg-[#e8f4ff] text-[#397fce]"
              }`}
            >
              {status === "arrived" ? (
                <CheckCircle2 size={21} />
              ) : (
                <Truck size={21} />
              )}
            </span>

            <div>
              <p className="text-[10px] font-bold tracking-wider text-[#71869d] uppercase">
                {status === "arrived"
                  ? "Example destination reached"
                  : "Example journey"}
              </p>

              <p className="text-[12px] font-bold text-[#0b1b3f]">
                {status === "arrived"
                  ? "Arrived at destination"
                  : "Dallas → Denver"}
              </p>
            </div>

            <span
              ref={progressTextRef}
              className="ml-2 text-[13px] font-bold text-[#397fce]"
            >
              0%
            </span>
          </div>
        )}

        {/* LOADING */}
        {status === "loading" && (
          <div className="pointer-events-none absolute top-5 left-5 z-[500] rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#397fce] shadow-md">
            Loading road route...
          </div>
        )}

        {/* ERROR */}
        {status === "error" && (
          <div
            role="alert"
            className="absolute top-5 right-5 left-5 z-[500] rounded-xl border border-amber-200 bg-white/95 p-4 text-xs font-medium text-amber-900 shadow-md"
          >
            {routeError}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-3 border-t border-[#dce9f4] bg-white px-5 py-4 sm:px-7">
        <span className="flex items-center gap-2 text-[11px] font-semibold text-[#607c98]">
          <Truck size={15} className="text-[#397fce]" />

          {demo
            ? "Illustrative road journey — not a live shipment"
            : "Enter your order details to check its status"}
        </span>

        <span className="flex items-center gap-1.5 text-[10px] font-bold tracking-[0.1em] text-[#397fce] uppercase">
          <MapPin size={13} />
          US Shipping Network
        </span>
      </div>
    </section>
  );
}
