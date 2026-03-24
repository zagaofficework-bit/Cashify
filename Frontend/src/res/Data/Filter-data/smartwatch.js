// ─────────────────────────────────────────────────────────────────────────────
// SmartwatchDetail.js
//
// All smartwatch data is split into per-brand arrays.
// You can pass a single brand, multiple brands, or all brands to the Filter component.
//
// Usage examples:
//
//   // All smartwatches
//   import { smartwatchesData } from "./SmartwatchDetail";
//   <Filter data={smartwatchesData} />
//
//   // Only Apple watches
//   import { appleWatchData } from "./SmartwatchDetail";
//   <Filter data={appleWatchData} />
//
//   // Apple + Samsung
//   import { buildSmartwatchesData, appleWatches, samsungWatches } from "./SmartwatchDetail";
//   <Filter data={buildSmartwatchesData([...appleWatches, ...samsungWatches])} />
// ─────────────────────────────────────────────────────────────────────────────

// ── Shared filterConfig & priceRange for all smartwatch pages ─────────────────
const smartwatchesFilterConfig = [
  { key: "brand",        label: "Brand",        type: "checkbox", options: ["Apple", "Samsung", "Noise", "boAt", "Amazfit", "Garmin", "Fitbit"] },
  { key: "deviceType",   label: "Type",         type: "checkbox", options: ["Fitness", "Luxury", "Sports", "Budget", "Kids"] },
  { key: "availability", label: "Availability", type: "checkbox", options: ["In Stock", "Out of Stock", "Pre-order"] },
  { key: "display",      label: "Display",      type: "pill",     options: ["LCD", "AMOLED", "OLED", "Retina LTPO", "MIP"] },
  { key: "battery",      label: "Battery Life", type: "pill",     options: ["1–2 Days", "3–5 Days", "7 Days", "14 Days", "30+ Days"] },
  { key: "health",       label: "Health",       type: "checkbox", options: ["Heart Rate", "SpO2", "ECG", "Sleep", "Temperature", "GPS"] },
  { key: "compatibility",label: "Compatible",   type: "checkbox", options: ["iOS", "Android", "Both"] },
];

const smartwatchesPriceRange = { min: 0, max: 100000, step: 500 };

// ── Helper: build a smartwatchesData object from any device array ──────────────
export const buildSmartwatchesData = (devices, pageTitle = "Smartwatches") => ({
  pageTitle,
  priceRange: smartwatchesPriceRange,
  filterConfig: smartwatchesFilterConfig,
  devices,
});

// ─────────────────────────────────────────────────────────────────────────────
// PER-BRAND DEVICE ARRAYS
// ─────────────────────────────────────────────────────────────────────────────

// ── APPLE ─────────────────────────────────────────────────────────────────────
export const appleWatches = [
  {
    id: 501, name: "Apple Watch Ultra 2", brand: "Apple", deviceType: "Sports",
    price: 89900, originalPrice: 99900, discount: 10, tag: "HOT", available: true,
    rating: 4.9, reviews: 1234, display: "Retina LTPO", battery: "3–5 Days",
    health: "Heart Rate, SpO2, ECG, Temperature, GPS", compatibility: "iOS", img: null,
    description: "49mm titanium case with brightest Apple Watch display (3000 nits). Precision GPS with dual-frequency, 100m water resistance, Action Button, Siren, and 60-hour battery in low power mode."
  },
  {
    id: 502, name: "Apple Watch Series 10", brand: "Apple", deviceType: "Fitness",
    price: 46900, originalPrice: 52900, discount: 11, tag: "NEW", available: true,
    rating: 4.8, reviews: 3456, display: "Retina LTPO", battery: "1–2 Days",
    health: "Heart Rate, SpO2, ECG, Sleep, Temperature, GPS", compatibility: "iOS", img: null,
    description: "Thinnest Apple Watch ever at 9.7mm. Larger display, faster charging (80% in 30 min), swim-proof, sleep apnea detection, crash detection, and Apple Intelligence health features."
  },
  {
    id: 503, name: "Apple Watch SE (2nd Gen)", brand: "Apple", deviceType: "Budget",
    price: 29900, originalPrice: 34900, discount: 14, tag: "SALE", available: true,
    rating: 4.7, reviews: 5678, display: "Retina LTPO", battery: "1–2 Days",
    health: "Heart Rate, SpO2, Sleep, GPS", compatibility: "iOS", img: null,
    description: "Essential Apple Watch features at the best price. Crash detection, Emergency SOS, fall detection, Family Setup for kids, water resistance, and the full Apple Watch ecosystem."
  },
  {
    id: 504, name: "Apple Watch Series 9", brand: "Apple", deviceType: "Fitness",
    price: 41900, originalPrice: 48900, discount: 14, tag: "SALE", available: true,
    rating: 4.8, reviews: 4321, display: "Retina LTPO", battery: "1–2 Days",
    health: "Heart Rate, SpO2, ECG, Sleep, Temperature, GPS", compatibility: "iOS", img: null,
    description: "Double Tap gesture, 2000 nit always-on display, S9 chip for faster Siri, precision finding for iPhone, and comprehensive health suite including blood oxygen and ECG."
  },
];

// ── SAMSUNG ───────────────────────────────────────────────────────────────────
export const samsungWatches = [
  {
    id: 505, name: "Samsung Galaxy Watch 7", brand: "Samsung", deviceType: "Fitness",
    price: 32999, originalPrice: 37999, discount: 13, tag: "NEW", available: true,
    rating: 4.7, reviews: 2345, display: "AMOLED", battery: "3–5 Days",
    health: "Heart Rate, SpO2, ECG, Sleep, Temperature, GPS", compatibility: "Android", img: null,
    description: "Advanced Health Monitor with BioActive sensor for body composition analysis. Galaxy AI sleep coaching, double pinch gesture, Exynos W1000, and 40hr battery life."
  },
  {
    id: 506, name: "Samsung Galaxy Watch Ultra", brand: "Samsung", deviceType: "Sports",
    price: 74999, originalPrice: 84999, discount: 12, tag: "HOT", available: true,
    rating: 4.8, reviews: 987, display: "AMOLED", battery: "3–5 Days",
    health: "Heart Rate, SpO2, ECG, Sleep, Temperature, GPS", compatibility: "Android", img: null,
    description: "Titanium frame with 10ATM water resistance. Galaxy AI, 3000 nit display, Energy Score for recovery, dual GPS, Quick Button, and 48hr battery in power saving mode."
  },
  {
    id: 507, name: "Samsung Galaxy Watch 6 Classic", brand: "Samsung", deviceType: "Luxury",
    price: 39999, originalPrice: 46999, discount: 15, tag: "SALE", available: true,
    rating: 4.6, reviews: 1876, display: "AMOLED", battery: "3–5 Days",
    health: "Heart Rate, SpO2, ECG, Sleep, GPS", compatibility: "Android", img: null,
    description: "Rotating physical bezel for intuitive navigation. Sapphire crystal glass, BioActive health sensor, 5ATM + IP68, advanced sleep tracking, and premium stainless steel design."
  },
  {
    id: 508, name: "Samsung Galaxy Watch FE", brand: "Samsung", deviceType: "Budget",
    price: 19999, originalPrice: 24999, discount: 20, tag: "SALE", available: true,
    rating: 4.4, reviews: 3210, display: "AMOLED", battery: "3–5 Days",
    health: "Heart Rate, SpO2, ECG, Sleep, GPS", compatibility: "Android", img: null,
    description: "Samsung health features at an accessible price. BioActive sensor, 1.2\" Super AMOLED, 5ATM water resistance, 40hr battery, and Galaxy Watch ecosystem."
  },
];

// ── NOISE ─────────────────────────────────────────────────────────────────────
export const noiseWatches = [
  {
    id: 509, name: "Noise ColorFit Ultra 3", brand: "Noise", deviceType: "Fitness",
    price: 4999, originalPrice: 7999, discount: 38, tag: "HOT", available: true,
    rating: 4.3, reviews: 8765, display: "AMOLED", battery: "7 Days",
    health: "Heart Rate, SpO2, Sleep, GPS", compatibility: "Both", img: null,
    description: "1.96\" AMOLED display with Bluetooth calling. Built-in GPS, AI voice assistant, 100+ sports modes, 7-day battery, IP68 water resistance, and health suite."
  },
  {
    id: 510, name: "Noise Pulse Go Buzz", brand: "Noise", deviceType: "Budget",
    price: 1999, originalPrice: 3499, discount: 43, tag: "SALE", available: true,
    rating: 4.1, reviews: 12345, display: "LCD", battery: "7 Days",
    health: "Heart Rate, SpO2, Sleep", compatibility: "Both", img: null,
    description: "Budget smartwatch with Bluetooth calling, 1.69\" display, heart rate and SpO2 monitoring, 60+ watch faces, 10+ sport modes, and IP68 water resistance."
  },
  {
    id: 511, name: "Noise ColorFit Pro 5", brand: "Noise", deviceType: "Fitness",
    price: 3499, originalPrice: 5999, discount: 42, tag: "NEW", available: true,
    rating: 4.2, reviews: 6543, display: "AMOLED", battery: "7 Days",
    health: "Heart Rate, SpO2, ECG, Sleep, Temperature", compatibility: "Both", img: null,
    description: "1.85\" AMOLED, ECG + stress monitoring, Bluetooth calling, built-in Alexa, 100+ sport modes, customizable watch faces, and 7-day battery life."
  },
];

// ── BOAT ──────────────────────────────────────────────────────────────────────
export const boatWatches = [
  {
    id: 512, name: "boAt Wave Prime", brand: "boAt", deviceType: "Budget",
    price: 1799, originalPrice: 3990, discount: 55, tag: "HOT", available: true,
    rating: 4.1, reviews: 15678, display: "LCD", battery: "7 Days",
    health: "Heart Rate, SpO2, Sleep", compatibility: "Both", img: null,
    description: "1.69\" HD display with DIY watch faces. Bluetooth calling, heart rate and SpO2 tracking, 10+ sport modes, and 7-day battery at India's most affordable price."
  },
  {
    id: 513, name: "boAt Storm Pro", brand: "boAt", deviceType: "Fitness",
    price: 3499, originalPrice: 6990, discount: 50, tag: "SALE", available: true,
    rating: 4.2, reviews: 9876, display: "AMOLED", battery: "7 Days",
    health: "Heart Rate, SpO2, Sleep, Temperature", compatibility: "Both", img: null,
    description: "1.85\" AMOLED with Bluetooth calling. Built-in mic and speaker, health suite, 100+ sports modes, IP68 water resistance, and always-on display support."
  },
  {
    id: 514, name: "boAt Lunar Connect Pro", brand: "boAt", deviceType: "Fitness",
    price: 4999, originalPrice: 9990, discount: 50, tag: "NEW", available: true,
    rating: 4.3, reviews: 4321, display: "AMOLED", battery: "7 Days",
    health: "Heart Rate, SpO2, ECG, Sleep, GPS", compatibility: "Both", img: null,
    description: "GPS smartwatch with 1.96\" AMOLED, ECG + HRV monitoring, Bluetooth calling, 100+ sport modes, music storage, and IP68 waterproofing."
  },
];

// ── AMAZFIT ───────────────────────────────────────────────────────────────────
export const amazfitWatches = [
  {
    id: 515, name: "Amazfit Balance", brand: "Amazfit", deviceType: "Fitness",
    price: 19999, originalPrice: 24999, discount: 20, tag: "HOT", available: true,
    rating: 4.5, reviews: 2345, display: "AMOLED", battery: "14 Days",
    health: "Heart Rate, SpO2, ECG, Sleep, Temperature, GPS", compatibility: "Both", img: null,
    description: "1.5\" AMOLED, Zepp OS 3.0 with AI personal fitness coach, 14-day battery, dual-band GPS, body composition, stress and sleep tracking, and offline maps."
  },
  {
    id: 516, name: "Amazfit GTR 4", brand: "Amazfit", deviceType: "Sports",
    price: 14999, originalPrice: 18999, discount: 21, tag: "SALE", available: true,
    rating: 4.4, reviews: 3456, display: "AMOLED", battery: "14 Days",
    health: "Heart Rate, SpO2, ECG, Sleep, Temperature, GPS", compatibility: "Both", img: null,
    description: "Dual-band GPS and Alexa built-in. 1.43\" AMOLED, 150+ sports modes, 14-day battery, Wi-Fi connectivity, 4GB offline music storage, and comprehensive health tracking."
  },
  {
    id: 517, name: "Amazfit Bip 5", brand: "Amazfit", deviceType: "Budget",
    price: 7999, originalPrice: 10999, discount: 27, tag: "NEW", available: true,
    rating: 4.3, reviews: 4567, display: "LCD", battery: "14 Days",
    health: "Heart Rate, SpO2, Sleep, GPS", compatibility: "Both", img: null,
    description: "Large 1.91\" display with Bluetooth calling. GPS, 10-day battery, heart rate and SpO2, 120+ sports modes, and lightweight 26g body for all-day comfort."
  },
];

// ── GARMIN ────────────────────────────────────────────────────────────────────
export const garminWatches = [
  {
    id: 518, name: "Garmin Fenix 7 Pro", brand: "Garmin", deviceType: "Sports",
    price: 89990, originalPrice: 99990, discount: 10, tag: "HOT", available: true,
    rating: 4.8, reviews: 1234, display: "MIP", battery: "14 Days",
    health: "Heart Rate, SpO2, Sleep, Temperature, GPS", compatibility: "Both", img: null,
    description: "Multi-band GPS, solar charging, 37-day battery in smartwatch mode, topographic maps, ski and dive modes, training readiness score, and sapphire crystal lens."
  },
  {
    id: 519, name: "Garmin Forerunner 265", brand: "Garmin", deviceType: "Sports",
    price: 39990, originalPrice: 44990, discount: 11, tag: "NEW", available: true,
    rating: 4.7, reviews: 876, display: "AMOLED", battery: "14 Days",
    health: "Heart Rate, SpO2, Sleep, GPS", compatibility: "Both", img: null,
    description: "Running dynamics with AMOLED display. Daily suggested workouts, HRV status, training readiness, race predictor, multi-band GPS, and 13-day battery life."
  },
  {
    id: 520, name: "Garmin Venu 3", brand: "Garmin", deviceType: "Fitness",
    price: 49990, originalPrice: 54990, discount: 9, tag: "NEW", available: true,
    rating: 4.7, reviews: 987, display: "AMOLED", battery: "14 Days",
    health: "Heart Rate, SpO2, ECG, Sleep, Temperature, GPS", compatibility: "Both", img: null,
    description: "1.4\" AMOLED with sleep coaching and nap detection. Wheelchair activity profiles, Body Battery energy monitoring, animated on-screen workouts, and 14-day battery."
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// READY-TO-USE DATA OBJECTS (pass directly as `data` prop)
// ─────────────────────────────────────────────────────────────────────────────

// All smartwatches (all brands combined)
export const smartwatchesData = buildSmartwatchesData(
  [...appleWatches, ...samsungWatches, ...noiseWatches,
   ...boatWatches, ...amazfitWatches, ...garminWatches],
  "Smartwatches"
);

// Single-brand pages
export const appleWatchData   = buildSmartwatchesData(appleWatches,   "Apple Watch");
export const samsungWatchData = buildSmartwatchesData(samsungWatches, "Samsung Galaxy Watch");
export const noiseWatchData   = buildSmartwatchesData(noiseWatches,   "Noise Smartwatches");
export const boatWatchData    = buildSmartwatchesData(boatWatches,    "boAt Smartwatches");
export const amazfitWatchData = buildSmartwatchesData(amazfitWatches, "Amazfit Smartwatches");
export const garminWatchData  = buildSmartwatchesData(garminWatches,  "Garmin Smartwatches");