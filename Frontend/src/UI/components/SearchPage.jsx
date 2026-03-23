import { useSearchParams, useNavigate } from "react-router-dom";

import NavMenu from "./Header/NavMenu";
import Filter from "./Filter";
import Footer from "./Home-page/Footer";

// ── Laptops ──────────────────────────────────────────────────────────────────
import {
  laptopsData,
  appleLaptopsData, samsungLaptopsData, acerLaptopsData, lenovoLaptopsData,
  dellLaptopsData,  hpLaptopsData,      asusLaptopsData,  microsoftLaptopsData,
  buildLaptopsData,
  appleLaptops,     samsungLaptops,     acerLaptops,     lenovoLaptops,
  dellLaptops,      hpLaptops,          asusLaptops,     microsoftLaptops,
} from "../../res/Data/Filter-data/laptops";

// ── Cameras ───────────────────────────────────────────────────────────────────
// 👇 Replace these imports with your real camera data file paths
import {
  camerasData,
  canonCamerasData, sonymCamerasData,  nikonCamerasData,  fujifilmCamerasData,
  panasonicCamerasData, olympusCamerasData,
  buildCamerasData,
  canonCameras,    sonyCameras,       nikonCameras,      fujifilmCameras,
  panasonicCameras, olympusCameras,
} from "../../res/Data/Filter-data/cameras";

// ── Phones ────────────────────────────────────────────────────────────────────
// 👇 Replace these imports with your real phones data file paths
import {
  phonesData,
  applePhoneData,   samsungPhoneData,  onePlugPhoneData,  googlePhoneData,
  buildPhonesData,
  applePhones,      samsungPhones,     onePlusPhones,     googlePhones,
} from "../../res/Data/Filter-data/phones";

// ─────────────────────────────────────────────────────────────────────────────
// CATEGORY REGISTRY
//
// Add a new category here whenever you create a new "Find a ___" page.
// Each entry needs:
//   defaultData   — shown when no ?bids= filter is active
//   brandDataMap  — brand id → filter data object (single brand selected)
//   brandDevices  — brand id → raw device array (for multi-brand merge)
//   buildFn       — function(devices, title) → filter data object
//   label         — human-readable category name (used in breadcrumb)
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORY_REGISTRY = {
  laptops: {
    label:        "Laptops",
    defaultData:  laptopsData,
    buildFn:      buildLaptopsData,
    brandDataMap: {
      apple:     appleLaptopsData,
      samsung:   samsungLaptopsData,
      acer:      acerLaptopsData,
      lenovo:    lenovoLaptopsData,
      dell:      dellLaptopsData,
      hp:        hpLaptopsData,
      asus:      asusLaptopsData,
      microsoft: microsoftLaptopsData,
    },
    brandDevices: {
      apple:     appleLaptops,
      samsung:   samsungLaptops,
      acer:      acerLaptops,
      lenovo:    lenovoLaptops,
      dell:      dellLaptops,
      hp:        hpLaptops,
      asus:      asusLaptops,
      microsoft: microsoftLaptops,
    },
  },

  cameras: {
    label:        "Cameras",
    defaultData:  camerasData,
    buildFn:      buildCamerasData,
    brandDataMap: {
      canon:     canonCamerasData,
      sony:      sonymCamerasData,
      nikon:     nikonCamerasData,
      fujifilm:  fujifilmCamerasData,
      panasonic: panasonicCamerasData,
      olympus:   olympusCamerasData,
    },
    brandDevices: {
      canon:     canonCameras,
      sony:      sonyCameras,
      nikon:     nikonCameras,
      fujifilm:  fujifilmCameras,
      panasonic: panasonicCameras,
      olympus:   olympusCameras,
    },
  },

  phones: {
    label:        "Phones",
    defaultData:  phonesData,
    buildFn:      buildPhonesData,
    brandDataMap: {
      apple:   applePhoneData,
      samsung: samsungPhoneData,
      oneplus: onePlugPhoneData,
      google:  googlePhoneData,
    },
    brandDevices: {
      apple:   applePhones,
      samsung: samsungPhones,
      oneplus: onePlusPhones,
      google:  googlePhones,
    },
  },

  // ── ADD MORE CATEGORIES HERE ─────────────────────────────────────────────
  // tablets: { label: "Tablets", defaultData: tabletsData, buildFn: buildTabletsData, brandDataMap: {...}, brandDevices: {...} },
  // tvs:     { label: "TVs",     defaultData: tvsData,     buildFn: buildTvsData,     brandDataMap: {...}, brandDevices: {...} },
};

// ─────────────────────────────────────────────────────────────────────────────
// Resolve which Filter data to pass to <Filter /> based on URL params
// ─────────────────────────────────────────────────────────────────────────────
function resolveFilterData(searchParams) {
  const cat  = searchParams.get("cat") ?? "laptops";
  const bids = searchParams.get("bids")?.split(",").filter(Boolean) ?? [];

  // Fall back to laptops if unknown category
  const registry = CATEGORY_REGISTRY[cat] ?? CATEGORY_REGISTRY.laptops;

  if (bids.length === 0) return { data: registry.defaultData, registry };
  if (bids.length === 1) return { data: registry.brandDataMap[bids[0]] ?? registry.defaultData, registry };

  // Multiple brands — merge on the fly
  const combined = bids.flatMap((id) => registry.brandDevices[id] ?? []);
  const title    = bids.map((id) => id.charAt(0).toUpperCase() + id.slice(1)).join(" & ")
                   + ` ${registry.label}`;
  return { data: registry.buildFn(combined, title), registry };
}

// ─────────────────────────────────────────────────────────────────────────────
// SearchPage  — mounted at <Route path="/search" element={<SearchPage />} />
// ─────────────────────────────────────────────────────────────────────────────
export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const navigate       = useNavigate();

  const { data: filterData, registry } = resolveFilterData(searchParams);

  const bids        = searchParams.get("bids")?.split(",").filter(Boolean) ?? [];
  const brandLabels = bids.map((id) => id.charAt(0).toUpperCase() + id.slice(1));

  return (
    <div>
      <NavMenu />

      {/* ── Top bar: back + breadcrumb ── */}
      <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center gap-3 sticky top-0 z-30 shadow-sm">

        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-teal-600 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <span className="text-gray-200">|</span>

        {/* Breadcrumb — shows the category label (Laptops / Cameras / Phones …) */}
        <span className="text-sm text-gray-400">{registry.label}</span>
        {brandLabels.length > 0 && (
          <>
            <svg className="w-3 h-3 text-gray-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-sm font-bold text-gray-800">{filterData.pageTitle}</span>
          </>
        )}

        {/* Active filter pills */}
        <div className="flex gap-1.5 ml-2 flex-wrap">
          {brandLabels.map((label) => (
            <span key={label} className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200">
              {label}
            </span>
          ))}
          {searchParams.get("priceMax") && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Under ₹{Number(searchParams.get("priceMax")).toLocaleString("en-IN")}
            </span>
          )}
          {searchParams.get("usage") && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200">
              {searchParams.get("usage")}
            </span>
          )}
          {searchParams.get("q") && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
              "{searchParams.get("q")}"
            </span>
          )}
        </div>
      </div>

      {/* ── Filter component with resolved brand + category data ── */}
      <Filter data={filterData} />

      <Footer />
    </div>
  );
}