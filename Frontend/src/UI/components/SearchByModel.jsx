import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─────────────────────────────────────────────────────────────────────────────
// SearchByModel
//
// Now accepts a `category` prop (e.g. "cameras", "laptops", "phones").
// This is encoded as ?cat= in the URL so SearchPage knows which data maps to use.
//
// URL examples produced:
//   /search?cat=cameras&bids=canon
//   /search?cat=laptops&bids=apple,dell&priceMax=80000
//   /search?cat=phones&usage=gaming
//
// Props:
//   data          — from your filter data file (e.g. camerasFilterData)
//   category      — string key, e.g. "cameras" | "laptops" | "phones"
//   onOpenFilter  — optional legacy callback
// ─────────────────────────────────────────────────────────────────────────────

const fmt = (v) => `Rs ${Number(v).toLocaleString("en-IN")}`;

export default function SearchByModel({ data = {}, category = "laptops", onOpenFilter }) {
  const navigate = useNavigate();

  const {
    priceRange   = { min: 0, max: 200000, step: 1000 },
    priceList    = [],
    brands       = [],
    usageFilters = [],
  } = data;

  const [query,          setQuery]          = useState("");
  const [priceMax,       setPriceMax]       = useState(priceRange.max);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedUsage,  setSelectedUsage]  = useState([]);

  // ── Core: build URL params and navigate ─────────────────────────────────────
  const goToSearch = (overrides = {}) => {
    const state = {
      query,
      priceMax,
      selectedBrands,
      selectedUsage,
      ...overrides,
    };

    onOpenFilter?.(state);

    const params = new URLSearchParams();

    // Always encode the category so SearchPage knows which data map to use
    params.set("cat", category);

    if (state.query?.trim())               params.set("q",        state.query.trim());
    if (state.priceMax !== priceRange.max) params.set("priceMax", state.priceMax);
    if (state.selectedBrands?.length)      params.set("bids",     state.selectedBrands.join(","));
    if (state.selectedUsage?.length)       params.set("usage",    state.selectedUsage.join(","));

    navigate(`/search?${params.toString()}`);
  };

  const handleBrandClick = (id) => {
    const next = selectedBrands.includes(id)
      ? selectedBrands.filter((x) => x !== id)
      : [...selectedBrands, id];
    setSelectedBrands(next);
    goToSearch({ selectedBrands: next });
  };

  const handleUsageClick = (id) => {
    const next = selectedUsage.includes(id)
      ? selectedUsage.filter((x) => x !== id)
      : [...selectedUsage, id];
    setSelectedUsage(next);
    goToSearch({ selectedUsage: next });
  };

  const handlePriceListClick = (max) => {
    setPriceMax(max);
    goToSearch({ priceMax: max });
  };

  const handleSliderChange  = (val) => setPriceMax(val);
  const handleSliderRelease = ()    => goToSearch();
  const handleSearch        = ()    => goToSearch();

  const handleReset = () => {
    setQuery("");
    setPriceMax(priceRange.max);
    setSelectedBrands([]);
    setSelectedUsage([]);
  };

  const fillPct = ((priceMax - priceRange.min) / (priceRange.max - priceRange.min)) * 100;

  return (
    <div className="w-[850px] border border-gray-100 my-13 mx-15 shadow-sm overflow-hidden bg-white">

      {/* ── Header ── */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <h2 className="text-base font-extrabold text-gray-900 tracking-tight">
          Search by Model Name
        </h2>
        <button
          onClick={handleReset}
          className="text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          + More Filters
        </button>
      </div>

      {/* ── Search input ── */}
      <div className="px-5 pb-4">
        <div className="relative">
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder="Search"
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 bg-gray-50 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
          />
        </div>
      </div>

      {/* ── Three column body ── */}
      <div className="flex border-t border-gray-100">

        {/* LEFT — Price */}
        <div className="w-[300px] border-r border-gray-100 px-5 py-4">
          <p className="text-xs font-bold text-gray-700 mb-4">Search by Price</p>

          <div className="mb-2 flex justify-between text-[11px] text-gray-500 font-medium">
            <span>{fmt(priceRange.min)}</span>
            <span>{fmt(priceMax)}{priceMax === priceRange.max ? " +" : ""}</span>
          </div>

          {/* Slider */}
          <div className="relative mb-5">
            <div className="h-1.5 rounded-full bg-gray-200 relative overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-teal-500 rounded-full transition-all duration-150"
                style={{ width: `${fillPct}%` }}
              />
            </div>
            <input
              type="range"
              min={priceRange.min} max={priceRange.max} step={priceRange.step}
              value={priceMax}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              onMouseUp={handleSliderRelease}
              onTouchEnd={handleSliderRelease}
              className="absolute inset-0 w-full opacity-0 cursor-pointer h-1.5"
              style={{ zIndex: 2 }}
            />
            <div className="absolute top-1/2 -translate-y-1/2 left-0 w-4 h-4 rounded-full bg-white border-2 border-teal-500 shadow -ml-2 pointer-events-none" />
            <div
              className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-teal-500 shadow -ml-2 pointer-events-none transition-all duration-150"
              style={{ left: `${fillPct}%` }}
            />
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="w-full bg-teal-500 hover:bg-teal-600 active:bg-teal-700 text-white font-bold text-sm py-2.5 rounded-xl transition-colors shadow-sm shadow-teal-500/25 mb-5"
          >
            Search
          </button>

          {/* Price list */}
          <p className="text-xs font-bold text-gray-700 mb-3">Search by Price List</p>
          <div className="grid grid-cols-2 gap-1.5">
            {priceList.map((item) => (
              <button
                key={item.label}
                onClick={() => handlePriceListClick(item.max)}
                className={`text-xs font-semibold py-2 px-3 rounded-lg border transition-all duration-150 text-left ${
                  priceMax === item.max
                    ? "bg-teal-50 border-teal-400 text-teal-700"
                    : "border-gray-200 text-gray-600 hover:border-teal-300 hover:text-teal-600 bg-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* MIDDLE — Brands */}
        <div className="w-[220px] border-r border-gray-100 px-4 py-4">
          <p className="text-xs font-bold text-gray-700 mb-3">Search by Brand</p>
          <div className="grid grid-cols-2 gap-2">
            {brands.map((brand) => {
              const sel = selectedBrands.includes(brand.id);
              return (
                <button
                  key={brand.id}
                  onClick={() => handleBrandClick(brand.id)}
                  className={`relative flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border-2 transition-all duration-150 aspect-square ${
                    sel
                      ? "border-teal-500 bg-teal-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-teal-300 hover:bg-gray-50"
                  }`}
                >
                  {sel && (
                    <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-teal-500 flex items-center justify-center">
                      <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                  <span className="text-xl leading-none">{brand.logo}</span>
                  <span className={`text-[9px] font-bold text-center leading-tight ${sel ? "text-teal-700" : "text-gray-500"}`}>
                    {brand.abbr}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT — Usage */}
        <div className="flex-1 px-4 py-4">
          <p className="text-xs font-bold text-gray-700 mb-3">Search by Usage</p>
          <div className="grid grid-cols-2 gap-2 w-[250px]">
            {usageFilters.map((usage) => {
              const sel = selectedUsage.includes(usage.id);
              return (
                <button
                  key={usage.id}
                  onClick={() => handleUsageClick(usage.id)}
                  className={`flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border-2 transition-all duration-150 aspect-square ${
                    sel
                      ? "border-teal-500 bg-teal-50 shadow-sm"
                      : "border-gray-200 bg-white hover:border-teal-300 hover:bg-gray-50"
                  }`}
                >
                  <span className="text-xl leading-none">{usage.icon}</span>
                  <span className={`text-[9px] font-bold text-center leading-tight ${sel ? "text-teal-700" : "text-gray-500"}`}>
                    {usage.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}