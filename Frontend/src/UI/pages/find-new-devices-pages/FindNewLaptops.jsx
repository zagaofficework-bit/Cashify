import React, { useState } from 'react';

import SlidingAnimations from '../../components/Home-page/SlidingAnimation';
import NavMenu           from '../../components/Header/NavMenu';
import SearchByModel     from '../../components/SearchByModel';
import Filter            from '../../components/Filter';
import Recents           from '../../components/Home-page/Recents';
import Footer            from '../../components/Home-page/Footer';

// ── SearchFilterData → drives the SearchByModel widget (brands/usage/price UI)
import { laptopsFilterData } from '../../../res/Data/SearchFilter';

// ── DeviceDetail → actual device arrays passed to Filter
import {
  laptopsData,
  appleLaptopsData,
  samsungLaptopsData,
  acerLaptopsData,
  lenovoLaptopsData,
  dellLaptopsData,
  hpLaptopsData,
  asusLaptopsData,
  microsoftLaptopsData,
  buildLaptopsData,
  appleLaptops,
  samsungLaptops,
  acerLaptops,
  lenovoLaptops,
  dellLaptops,
  hpLaptops,
  asusLaptops,
  microsoftLaptops,
} from '../../../res/Data/Filter-data/laptops';

// ─────────────────────────────────────────────────────────────────────────────
// Maps brand.id (from SearchFilterData) → ready-made data object (for Filter)
// brand.id values: "apple" | "samsung" | "acer" | "lenovo" |
//                  "dell"  | "hp"      | "asus" | "microsoft"
// ─────────────────────────────────────────────────────────────────────────────
const BRAND_DATA_MAP = {
  apple:     appleLaptopsData,
  samsung:   samsungLaptopsData,
  acer:      acerLaptopsData,
  lenovo:    lenovoLaptopsData,
  dell:      dellLaptopsData,
  hp:        hpLaptopsData,
  asus:      asusLaptopsData,
  microsoft: microsoftLaptopsData,
};

// Device arrays — used when combining multiple brands
const BRAND_DEVICES_MAP = {
  apple:     appleLaptops,
  samsung:   samsungLaptops,
  acer:      acerLaptops,
  lenovo:    lenovoLaptops,
  dell:      dellLaptops,
  hp:        hpLaptops,
  asus:      asusLaptops,
  microsoft: microsoftLaptops,
};

// ─────────────────────────────────────────────────────────────────────────────
const videos = [
  {
    title: "How to sell your phone on Phonify?",
    description: "Sell your old phone at Phonify. Check your old phone's value in just 60 seconds",
  },
  {
    title: "How to Change iPhone 7 Battery at Home",
    description: "Phone broke down? Now get repaired at your doorstep using Phonify Repair",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FindNewLaptops
//
// State machine:
//   filterData = null   →  show normal page (SearchByModel + Recents + videos)
//   filterData = {...}  →  show Filter with that brand's data + Back button
// ─────────────────────────────────────────────────────────────────────────────
const FindNewLaptops = () => {
  const [filterData, setFilterData] = useState(null);

  // Called by SearchByModel on every brand / usage / price / search interaction
  // filters = { query, priceMin, priceMax, selectedBrands[], selectedUsage[] }
  const handleOpenFilter = (filters) => {
    const { selectedBrands = [] } = filters;

    let data;

    if (selectedBrands.length === 0) {
      // No brand selected → show all laptops
      data = laptopsData;

    } else if (selectedBrands.length === 1) {
      // Single brand → use its dedicated data object
      data = BRAND_DATA_MAP[selectedBrands[0]] ?? laptopsData;

    } else {
      // Multiple brands → merge device arrays on the fly
      const combined = selectedBrands.flatMap(
        (id) => BRAND_DEVICES_MAP[id] ?? []
      );
      const title = selectedBrands
        .map((id) => id.charAt(0).toUpperCase() + id.slice(1))
        .join(' & ') + ' Laptops';
      data = buildLaptopsData(combined, title);
    }

    setFilterData(data);
  };

  // ── Filter view ─────────────────────────────────────────────────────────────
  if (filterData) {
    return (
      <div>
        <NavMenu />

        {/* Back bar */}
        <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-3 sticky top-0 z-30 shadow-sm">
          <button
            onClick={() => setFilterData(null)}
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-teal-600 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none" viewBox="0 0 24 24"
              stroke="currentColor" strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Search
          </button>

          <span className="text-gray-200">|</span>

          {/* Breadcrumb: Laptops › Apple Laptops */}
          <span className="text-sm text-gray-400">Laptops</span>
          <svg className="w-3 h-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span className="text-sm font-bold text-gray-800">{filterData.pageTitle}</span>
        </div>

        {/* Filter component receives the brand-specific data */}
        <Filter data={filterData} />

        <Footer />
      </div>
    );
  }

  // ── Normal page view ────────────────────────────────────────────────────────
  return (
    <div>
      <NavMenu />
      <SlidingAnimations />

      {/* SearchByModel calls onOpenFilter when user clicks brand/price/usage/search */}
      <SearchByModel
        data={laptopsFilterData}
        onOpenFilter={handleOpenFilter}
        category='laptops'
      />

      <Recents />

      {/* Just For You section */}
      <section className="bg-gray-50 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Just For You</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {videos.map((video, index) => (
              <div key={index} className="bg-white rounded-lg shadow p-4">
                <div className="aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/zG3hNL08Dro"
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <h3 className="font-semibold text-lg mb-2">{video.title}</h3>
                <p className="text-gray-600 text-sm">{video.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FindNewLaptops;