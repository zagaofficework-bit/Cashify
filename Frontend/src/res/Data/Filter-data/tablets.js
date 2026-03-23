// ─────────────────────────────────────────────────────────────────────────────
// TabletDetail.js
//
// All tablet data is split into per-brand arrays.
// You can pass a single brand, multiple brands, or all brands to the Filter component.
//
// Usage examples:
//
//   // All tablets
//   import { tabletsData } from "./TabletDetail";
//   <Filter data={tabletsData} />
//
//   // Only Apple tablets
//   import { appleTabletsData } from "./TabletDetail";
//   <Filter data={appleTabletsData} />
//
//   // Apple + Samsung
//   import { buildTabletsData, appleTablets, samsungTablets } from "./TabletDetail";
//   <Filter data={buildTabletsData([...appleTablets, ...samsungTablets])} />
// ─────────────────────────────────────────────────────────────────────────────

// ── Shared filterConfig & priceRange for all tablet pages ─────────────────────
const tabletsFilterConfig = [
  { key: "brand",        label: "Brand",        type: "checkbox", options: ["Apple", "Samsung", "Lenovo", "Xiaomi", "Realme", "OnePlus"] },
  { key: "deviceType",   label: "Type",         type: "checkbox", options: ["Pro", "Standard", "Budget", "Kids", "Drawing", "2-in-1"] },
  { key: "availability", label: "Availability", type: "checkbox", options: ["In Stock", "Out of Stock", "Pre-order"] },
  { key: "ram",          label: "RAM",          type: "pill",     options: ["4GB", "6GB", "8GB", "12GB", "16GB"] },
  { key: "storage",      label: "Storage",      type: "pill",     options: ["64GB", "128GB", "256GB", "512GB", "1TB"] },
  { key: "display",      label: "Display Size", type: "checkbox", options: ["8\"", "8.7\"", "10.4\"", "10.9\"", "11\"", "12.4\"", "13\""] },
  { key: "connectivity", label: "Connectivity", type: "checkbox", options: ["Wi-Fi", "Wi-Fi + 5G", "Wi-Fi + LTE"] },
];

const tabletsPriceRange = { min: 0, max: 150000, step: 500 };

// ── Helper: build a tabletsData object from any device array ──────────────────
export const buildTabletsData = (devices, pageTitle = "Tablets") => ({
  pageTitle,
  priceRange: tabletsPriceRange,
  filterConfig: tabletsFilterConfig,
  devices,
});

// ─────────────────────────────────────────────────────────────────────────────
// PER-BRAND DEVICE ARRAYS
// ─────────────────────────────────────────────────────────────────────────────

// ── APPLE ─────────────────────────────────────────────────────────────────────
export const appleTablets = [
  {
    id: 601, name: "Apple iPad Pro 13\" M4", brand: "Apple", deviceType: "Pro",
    price: 129900, originalPrice: 144900, discount: 10, tag: "NEW", available: true,
    rating: 4.9, reviews: 1234, ram: "8GB", storage: "256GB", display: "13\"",
    connectivity: "Wi-Fi", img: null,
    description: "Thinnest Apple product ever at 5.1mm. M4 chip, Ultra Retina XDR OLED tandem display, Apple Pencil Pro support, Magic Keyboard compatible, and nano-texture glass option."
  },
  {
    id: 602, name: "Apple iPad Pro 11\" M4", brand: "Apple", deviceType: "Pro",
    price: 99900, originalPrice: 109900, discount: 9, tag: "NEW", available: true,
    rating: 4.9, reviews: 2345, ram: "8GB", storage: "256GB", display: "11\"",
    connectivity: "Wi-Fi", img: null,
    description: "11\" Ultra Retina XDR OLED, M4 chip, Apple Pencil Pro, landscape front camera, Thunderbolt 4, Wi-Fi 6E, and the thinnest iPad ever at just 5.3mm."
  },
  {
    id: 603, name: "Apple iPad Air 13\" M2", brand: "Apple", deviceType: "Standard",
    price: 89900, originalPrice: 99900, discount: 10, tag: "HOT", available: true,
    rating: 4.8, reviews: 3456, ram: "8GB", storage: "128GB", display: "13\"",
    connectivity: "Wi-Fi", img: null,
    description: "Largest iPad Air ever with M2 chip. 13\" Liquid Retina display, Apple Pencil Pro support, Magic Keyboard compatible, Wi-Fi 6E, landscape front camera."
  },
  {
    id: 604, name: "Apple iPad Air 11\" M2", brand: "Apple", deviceType: "Standard",
    price: 69900, originalPrice: 79900, discount: 13, tag: "HOT", available: true,
    rating: 4.8, reviews: 4567, ram: "8GB", storage: "128GB", display: "11\"",
    connectivity: "Wi-Fi", img: null,
    description: "M2 chip, 11\" Liquid Retina display, Apple Pencil Pro and Magic Keyboard support, landscape front camera, Touch ID, Wi-Fi 6E, and USB-C with USB 3 speeds."
  },
  {
    id: 605, name: "Apple iPad 10th Gen", brand: "Apple", deviceType: "Standard",
    price: 44900, originalPrice: 54900, discount: 18, tag: "SALE", available: true,
    rating: 4.7, reviews: 6789, ram: "4GB", storage: "64GB", display: "10.9\"",
    connectivity: "Wi-Fi", img: null,
    description: "All-screen 10.9\" Liquid Retina display with A14 Bionic. Landscape front camera, USB-C, Wi-Fi 6, Apple Pencil (1st gen) compatible, and four vibrant colour options."
  },
  {
    id: 606, name: "Apple iPad Mini 7th Gen", brand: "Apple", deviceType: "Standard",
    price: 49900, originalPrice: 57900, discount: 14, tag: "NEW", available: true,
    rating: 4.8, reviews: 2109, ram: "8GB", storage: "128GB", display: "8.3\"",
    connectivity: "Wi-Fi", img: null,
    description: "8.3\" Liquid Retina display, A17 Pro chip, Apple Intelligence, Apple Pencil Pro support, landscape front camera, Wi-Fi 6E, and all-day battery in a compact 293g body."
  },
];

// ── SAMSUNG ───────────────────────────────────────────────────────────────────
export const samsungTablets = [
  {
    id: 607, name: "Samsung Galaxy Tab S10 Ultra", brand: "Samsung", deviceType: "Pro",
    price: 124999, originalPrice: 137999, discount: 10, tag: "HOT", available: true,
    rating: 4.8, reviews: 987, ram: "12GB", storage: "256GB", display: "14.6\"",
    connectivity: "Wi-Fi", img: null,
    description: "14.6\" Dynamic AMOLED 2X with S Pen included. Snapdragon 8 Gen 3, 11200mAh battery, DeX mode for desktop, Galaxy AI features, and IP68 weather resistance."
  },
  {
    id: 608, name: "Samsung Galaxy Tab S10+", brand: "Samsung", deviceType: "Pro",
    price: 99999, originalPrice: 109999, discount: 9, tag: "NEW", available: true,
    rating: 4.8, reviews: 1234, ram: "12GB", storage: "256GB", display: "12.4\"",
    connectivity: "Wi-Fi", img: null,
    description: "12.4\" Dynamic AMOLED 2X, Snapdragon 8 Gen 3, S Pen included, Galaxy AI, 10090mAh battery, DeX desktop mode, Wi-Fi 7, and IP68 dust and water resistance."
  },
  {
    id: 609, name: "Samsung Galaxy Tab S10 FE", brand: "Samsung", deviceType: "Standard",
    price: 59999, originalPrice: 67999, discount: 12, tag: "NEW", available: true,
    rating: 4.6, reviews: 2345, ram: "8GB", storage: "128GB", display: "10.9\"",
    connectivity: "Wi-Fi + LTE", img: null,
    description: "10.9\" LCD display with S Pen included. Exynos 1580, 10090mAh battery, Galaxy AI features, IP68, Knox security, and Samsung DeX desktop experience."
  },
  {
    id: 610, name: "Samsung Galaxy Tab A9+", brand: "Samsung", deviceType: "Budget",
    price: 29999, originalPrice: 35999, discount: 17, tag: "SALE", available: true,
    rating: 4.4, reviews: 4321, ram: "8GB", storage: "128GB", display: "11\"",
    connectivity: "Wi-Fi + 5G", img: null,
    description: "11\" 90Hz LCD display with quad speakers and Dolby Atmos. Snapdragon 695, 7040mAh battery, 5G connectivity, microSD slot, and Knox security."
  },
  {
    id: 611, name: "Samsung Galaxy Tab S6 Lite (2024)", brand: "Samsung", deviceType: "Standard",
    price: 26999, originalPrice: 31999, discount: 16, tag: "SALE", available: true,
    rating: 4.4, reviews: 5678, ram: "4GB", storage: "64GB", display: "10.4\"",
    connectivity: "Wi-Fi", img: null,
    description: "S Pen included, 10.4\" TFT display, Exynos 1280, 7040mAh battery, Book Cover Keyboard compatible, and ideal for students and light productivity tasks."
  },
];

// ── LENOVO ────────────────────────────────────────────────────────────────────
export const lenovoTablets = [
  {
    id: 612, name: "Lenovo Tab P12 Pro", brand: "Lenovo", deviceType: "Pro",
    price: 79999, originalPrice: 89999, discount: 11, tag: "HOT", available: true,
    rating: 4.6, reviews: 876, ram: "8GB", storage: "256GB", display: "12.6\"",
    connectivity: "Wi-Fi", img: null,
    description: "12.6\" Super AMOLED 2K display with 120Hz. Snapdragon 870, quad JBL speakers with Dolby Atmos, Lenovo Precision Pen 3 included, and 10200mAh battery."
  },
  {
    id: 613, name: "Lenovo Tab Extreme", brand: "Lenovo", deviceType: "Pro",
    price: 99999, originalPrice: 109999, discount: 9, tag: "NEW", available: true,
    rating: 4.7, reviews: 543, ram: "12GB", storage: "256GB", display: "14.5\"",
    connectivity: "Wi-Fi", img: null,
    description: "14.5\" 3K OLED at 120Hz, MediaTek Dimensity 9000, 12200mAh battery, productivity-focused with optional keyboard folio, and quad speaker Dolby Atmos sound."
  },
  {
    id: 614, name: "Lenovo Tab M10 Plus (3rd Gen)", brand: "Lenovo", deviceType: "Budget",
    price: 17999, originalPrice: 22999, discount: 22, tag: "SALE", available: true,
    rating: 4.3, reviews: 3456, ram: "4GB", storage: "128GB", display: "10.6\"",
    connectivity: "Wi-Fi", img: null,
    description: "10.61\" 2K display with quad stereo speakers and Dolby Atmos. Helio G80, 7500mAh battery, expandable storage, kids mode, and slim 7.5mm chassis."
  },
  {
    id: 615, name: "Lenovo Tab P11 (2nd Gen)", brand: "Lenovo", deviceType: "Standard",
    price: 24999, originalPrice: 29999, discount: 17, tag: "SALE", available: true,
    rating: 4.4, reviews: 2345, ram: "6GB", storage: "128GB", display: "11.5\"",
    connectivity: "Wi-Fi + LTE", img: null,
    description: "11.5\" 2K LCD display, MediaTek Helio G99, dual front stereo speakers, Lenovo Precision Pen 2 support, 7700mAh battery, and LTE connectivity option."
  },
];

// ── XIAOMI ────────────────────────────────────────────────────────────────────
export const xiaomiTablets = [
  {
    id: 616, name: "Xiaomi Pad 6S Pro 12.4", brand: "Xiaomi", deviceType: "Pro",
    price: 59999, originalPrice: 67999, discount: 12, tag: "HOT", available: true,
    rating: 4.7, reviews: 1234, ram: "8GB", storage: "256GB", display: "12.4\"",
    connectivity: "Wi-Fi", img: null,
    description: "12.4\" 3K LCD 144Hz display, Snapdragon 8 Gen 2, 10000mAh battery with 120W fast charging, Stylus Pen support, quad speakers, and HyperOS."
  },
  {
    id: 617, name: "Xiaomi Pad 6", brand: "Xiaomi", deviceType: "Standard",
    price: 34999, originalPrice: 41999, discount: 17, tag: "SALE", available: true,
    rating: 4.6, reviews: 2345, ram: "6GB", storage: "128GB", display: "11\"",
    connectivity: "Wi-Fi", img: null,
    description: "11\" 2.8K 144Hz LCD, Snapdragon 870, 8840mAh battery, quad speakers with Dolby Atmos, Xiaomi Smart Pen support, and MIUI 14 for Pad."
  },
  {
    id: 618, name: "Xiaomi Redmi Pad SE", brand: "Xiaomi", deviceType: "Budget",
    price: 15999, originalPrice: 19999, discount: 20, tag: "SALE", available: true,
    rating: 4.3, reviews: 4567, ram: "4GB", storage: "128GB", display: "11\"",
    connectivity: "Wi-Fi", img: null,
    description: "11\" FHD+ 90Hz display, Snapdragon 680, quad speakers with Dolby Atmos, 8000mAh battery, expandable storage via microSD, and MIUI Pad OS."
  },
];

// ── REALME ────────────────────────────────────────────────────────────────────
export const realmeTablets = [
  {
    id: 619, name: "Realme Pad 2", brand: "Realme", deviceType: "Standard",
    price: 19999, originalPrice: 24999, discount: 20, tag: "HOT", available: true,
    rating: 4.4, reviews: 2109, ram: "6GB", storage: "128GB", display: "11.5\"",
    connectivity: "Wi-Fi + LTE", img: null,
    description: "11.5\" 2K display at 120Hz, MediaTek Helio G99, quad speakers with Dolby Atmos, 8360mAh with 33W SUPERVOOC, stylus support, and slim 6.8mm design."
  },
  {
    id: 620, name: "Realme Pad X", brand: "Realme", deviceType: "Standard",
    price: 24999, originalPrice: 29999, discount: 17, tag: "SALE", available: true,
    rating: 4.3, reviews: 1876, ram: "6GB", storage: "128GB", display: "11\"",
    connectivity: "Wi-Fi + 5G", img: null,
    description: "11\" 2K IPS 120Hz, Snapdragon 695 5G, quad speakers with Dolby Atmos, 8340mAh with 33W, Realme Pencil support, and 5G connectivity for fast browsing."
  },
];

// ── ONEPLUS ───────────────────────────────────────────────────────────────────
export const onePlusTablets = [
  {
    id: 621, name: "OnePlus Pad 2", brand: "OnePlus", deviceType: "Pro",
    price: 49999, originalPrice: 57999, discount: 14, tag: "HOT", available: true,
    rating: 4.7, reviews: 1543, ram: "12GB", storage: "256GB", display: "12.1\"",
    connectivity: "Wi-Fi", img: null,
    description: "12.1\" 3K 144Hz LCD, Snapdragon 8 Gen 3, 9510mAh with 67W SUPERVOOC, quad speakers with Dolby Atmos, OxygenOS 14, and OnePlus Stylo 2 pen support."
  },
  {
    id: 622, name: "OnePlus Pad Go", brand: "OnePlus", deviceType: "Budget",
    price: 19999, originalPrice: 23999, discount: 17, tag: "SALE", available: true,
    rating: 4.4, reviews: 2876, ram: "8GB", storage: "128GB", display: "11.35\"",
    connectivity: "Wi-Fi + LTE", img: null,
    description: "11.35\" 2K 90Hz display, MediaTek Helio G99, quad speakers with Dolby Atmos, 8000mAh battery, stylus support, and OxygenOS with kids space."
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// READY-TO-USE DATA OBJECTS (pass directly as `data` prop)
// ─────────────────────────────────────────────────────────────────────────────

// All tablets (all brands combined)
export const tabletsData = buildTabletsData(
  [...appleTablets, ...samsungTablets, ...lenovoTablets,
   ...xiaomiTablets, ...realmeTablets, ...onePlusTablets],
  "Tablets"
);

// Single-brand pages
export const appleTabletsData   = buildTabletsData(appleTablets,   "Apple iPads");
export const samsungTabletsData = buildTabletsData(samsungTablets, "Samsung Tablets");
export const lenovoTabletsData  = buildTabletsData(lenovoTablets,  "Lenovo Tablets");
export const xiaomiTabletsData  = buildTabletsData(xiaomiTablets,  "Xiaomi Tablets");
export const realmeTabletsData  = buildTabletsData(realmeTablets,  "Realme Tablets");
export const onePlusTabletsData = buildTabletsData(onePlusTablets, "OnePlus Tablets");