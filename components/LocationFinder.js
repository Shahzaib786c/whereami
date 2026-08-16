"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { reverseGeocode } from "@/lib/geocode";
import CompassMark from "./CompassMark";

const MapView = dynamic(() => import("./MapView"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full flex items-center justify-center bg-paper-dim">
      <span className="text-sm text-ink-soft">Loading map…</span>
    </div>
  ),
});

export default function LocationFinder() {
  const { status, coords, error, locate, isLocating, isSuccess, isError } =
    useGeolocation();
  const [address, setAddress] = useState(null);
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState(null);

  useEffect(() => {
    if (!isSuccess || !coords) return;

    let cancelled = false;
    setAddressLoading(true);
    setAddressError(null);

    reverseGeocode(coords.lat, coords.lng)
      .then((result) => {
        if (!cancelled) setAddress(result);
      })
      .catch(() => {
        if (!cancelled) setAddressError("Couldn't fetch city/province details.");
      })
      .finally(() => {
        if (!cancelled) setAddressLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isSuccess, coords]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
        <button
          onClick={locate}
          disabled={isLocating}
          className="inline-flex items-center gap-3 bg-ink text-paper font-medium rounded-md pl-4 pr-5 py-3 hover:bg-ink-soft transition-colors disabled:opacity-70"
        >
          <CompassMark size={22} spinning={isLocating} />
          {isLocating ? "Locating…" : "Find my location"}
        </button>

        {status === "idle" && (
          <p className="text-sm text-ink-soft">
            Your browser will ask permission before sharing your location.
          </p>
        )}
      </div>

      {isError && (
        <p className="text-sm text-rust bg-rust-light border border-rust/20 rounded-md px-4 py-3 max-w-xl">
          {error}
        </p>
      )}

      {isSuccess && coords && (
        <div className="grid md:grid-cols-5 gap-5">
          <div className="md:col-span-3 rounded-lg overflow-hidden border border-line h-72 sm:h-96">
            <MapView lat={coords.lat} lng={coords.lng} accuracy={coords.accuracy} />
          </div>

          <div className="md:col-span-2 space-y-4">
            <div className="bg-white border border-line rounded-lg p-5">
              <p className="text-xs uppercase tracking-wide text-brass font-medium mb-3">
                Coordinates
              </p>
              <dl className="space-y-2 font-mono-coord text-sm">
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Latitude</dt>
                  <dd>{coords.lat.toFixed(6)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Longitude</dt>
                  <dd>{coords.lng.toFixed(6)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-ink-soft">Accuracy</dt>
                  <dd>±{Math.round(coords.accuracy)} m</dd>
                </div>
              </dl>
            </div>

            <div className="bg-white border border-line rounded-lg p-5">
              <p className="text-xs uppercase tracking-wide text-brass font-medium mb-3">
                Place
              </p>
              {addressLoading && (
                <p className="text-sm text-ink-soft">Looking up address…</p>
              )}
              {addressError && <p className="text-sm text-rust">{addressError}</p>}
              {address && !addressLoading && (
                <dl className="space-y-2 text-sm">
                  <Row label="City" value={address.city} />
                  <Row label="Province / State" value={address.province} />
                  <Row label="Country" value={address.country} />
                  {address.suburb && <Row label="Area" value={address.suburb} />}
                </dl>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="text-right font-medium">{value}</dd>
    </div>
  );
}
