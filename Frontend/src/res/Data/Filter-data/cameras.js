// ─────────────────────────────────────────────────────────────────────────────
// CameraDetail.js
//
// All camera data is split into per-brand arrays.
// You can pass a single brand, multiple brands, or all brands to the Filter component.
//
// Usage examples:
//
//   // All cameras
//   import { camerasData } from "./CameraDetail";
//   <Filter data={camerasData} />
//
//   // Only Canon cameras
//   import { canonCamerasData } from "./CameraDetail";
//   <Filter data={canonCamerasData} />
//
//   // Canon + Sony
//   import { buildCamerasData, canonCameras, sonyCameras } from "./CameraDetail";
//   <Filter data={buildCamerasData([...canonCameras, ...sonyCameras])} />
// ─────────────────────────────────────────────────────────────────────────────

// ── Shared filterConfig & priceRange for all camera pages ─────────────────────
const camerasFilterConfig = [
  { key: "brand",        label: "Brand",        type: "checkbox", options: ["Canon", "Sony", "Nikon", "Fujifilm", "Panasonic", "Olympus"] },
  { key: "deviceType",   label: "Type",         type: "checkbox", options: ["DSLR", "Mirrorless", "Point & Shoot", "Action", "Cinema", "Instant"] },
  { key: "availability", label: "Availability", type: "checkbox", options: ["In Stock", "Out of Stock", "Pre-order"] },
  { key: "resolution",   label: "Resolution",   type: "pill",     options: ["12MP", "20MP", "24MP", "33MP", "45MP", "61MP"] },
  { key: "sensor",       label: "Sensor Size",  type: "pill",     options: ["1/2.3\"", "1\"", "Micro 4/3", "APS-C", "Full Frame"] },
  { key: "video",        label: "Video",        type: "checkbox", options: ["1080p", "4K", "4K 120fps", "6K", "8K"] },
  { key: "mount",        label: "Mount",        type: "checkbox", options: ["Canon EF", "Canon RF", "Sony E", "Nikon Z", "Nikon F", "Fujifilm X", "Micro 4/3"] },
];

const camerasPriceRange = { min: 0, max: 600000, step: 5000 };

// ── Helper: build a camerasData object from any device array ──────────────────
// Use this when combining brands: buildCamerasData([...canonCameras, ...sonyCameras])
export const buildCamerasData = (devices, pageTitle = "Cameras") => ({
  pageTitle,
  priceRange: camerasPriceRange,
  filterConfig: camerasFilterConfig,
  devices,
});

// ─────────────────────────────────────────────────────────────────────────────
// PER-BRAND DEVICE ARRAYS
// ─────────────────────────────────────────────────────────────────────────────

// ── CANON ─────────────────────────────────────────────────────────────────────
export const canonCameras = [
  {
    id: 201, name: "Canon EOS R6 Mark II", brand: "Canon", deviceType: "Mirrorless",
    price: 229999, originalPrice: 249999, discount: 8, tag: "HOT", available: true,
    rating: 4.8, reviews: 876, resolution: "24MP", sensor: "Full Frame", video: "4K 120fps",
    mount: "Canon RF", img: null,
    description: "24.2MP full-frame mirrorless with 40fps burst shooting. Dual Pixel CMOS AF II, in-body stabilization (8 stops), 4K 60p/FHD 180p video, weather-sealed body."
  },
  {
    id: 202, name: "Canon EOS R8", brand: "Canon", deviceType: "Mirrorless",
    price: 139999, originalPrice: 154999, discount: 10, tag: "NEW", available: true,
    rating: 4.5, reviews: 432, resolution: "24MP", sensor: "Full Frame", video: "4K",
    mount: "Canon RF", img: null,
    description: "Affordable full-frame entry with 40fps electronic shutter. Dual Pixel CMOS AF II, 6K oversampled 4K video, compact 461g body, and Canon RF lens compatibility."
  },
  {
    id: 203, name: "Canon EOS R5 Mark II", brand: "Canon", deviceType: "Mirrorless",
    price: 399999, originalPrice: 429999, discount: 7, tag: "NEW", available: true,
    rating: 4.9, reviews: 312, resolution: "45MP", sensor: "Full Frame", video: "8K",
    mount: "Canon RF", img: null,
    description: "45MP full-frame flagship with 8K RAW video at 60fps. AI-accelerated autofocus, 30fps RAW burst, 5-axis IBIS (8 stops), and dual card slots (CFexpress + SD)."
  },
  {
    id: 204, name: "Canon EOS R50", brand: "Canon", deviceType: "Mirrorless",
    price: 79999, originalPrice: 89999, discount: 11, tag: "SALE", available: true,
    rating: 4.4, reviews: 654, resolution: "24MP", sensor: "APS-C", video: "4K",
    mount: "Canon RF", img: null,
    description: "Compact APS-C mirrorless for beginners and creators. 24.2MP, Dual Pixel CMOS AF, 4K uncropped video, vertical video mode, Wi-Fi, Bluetooth, and lightweight 375g body."
  },
  {
    id: 205, name: "Canon EOS 90D", brand: "Canon", deviceType: "DSLR",
    price: 119999, originalPrice: 134999, discount: 11, tag: "SALE", available: true,
    rating: 4.6, reviews: 987, resolution: "33MP", sensor: "APS-C", video: "4K",
    mount: "Canon EF", img: null,
    description: "32.5MP APS-C DSLR with 45-point all cross-type AF. 10fps burst, uncropped 4K video, dual pixel AF in live view, optical viewfinder, and weather-sealed body."
  },
  {
    id: 206, name: "Canon PowerShot G7 X Mark III", brand: "Canon", deviceType: "Point & Shoot",
    price: 59999, originalPrice: 69999, discount: 14, tag: "HOT", available: true,
    rating: 4.3, reviews: 1123, resolution: "20MP", sensor: "1\"", video: "4K",
    mount: "Fixed", img: null,
    description: "1\" sensor compact with 4K video and live streaming. 20.1MP, f/1.8–2.8 lens, RAW shooting, pop-up flash, vertical video, and direct YouTube live streaming."
  },
];

// ── SONY ──────────────────────────────────────────────────────────────────────
export const sonyCameras = [
  {
    id: 207, name: "Sony Alpha A7 IV", brand: "Sony", deviceType: "Mirrorless",
    price: 259999, originalPrice: 284999, discount: 9, tag: "HOT", available: true,
    rating: 4.8, reviews: 1245, resolution: "33MP", sensor: "Full Frame", video: "4K",
    mount: "Sony E", img: null,
    description: "33MP full-frame hybrid for stills and video. Real-time tracking AF, 10fps burst, 4K 60p oversampled, 5-axis IBIS, dual SD slots, and weather-sealed magnesium alloy body."
  },
  {
    id: 208, name: "Sony Alpha A7R V", brand: "Sony", deviceType: "Mirrorless",
    price: 379999, originalPrice: 409999, discount: 7, tag: "NEW", available: true,
    rating: 4.9, reviews: 456, resolution: "61MP", sensor: "Full Frame", video: "4K",
    mount: "Sony E", img: null,
    description: "61MP resolution powerhouse with AI-based AF system. 8K time-lapse, 4K 60p, 8-step IBIS, 693-point phase detect AF, and dual CFexpress + SD card slots."
  },
  {
    id: 209, name: "Sony ZV-E10 II", brand: "Sony", deviceType: "Mirrorless",
    price: 74999, originalPrice: 84999, discount: 12, tag: "NEW", available: true,
    rating: 4.5, reviews: 789, resolution: "26MP", sensor: "APS-C", video: "4K",
    mount: "Sony E", img: null,
    description: "Creator-focused APS-C camera with vlog features. 26.1MP, 4K 60p, real-time eye AF, directional 3-capsule mic, flip screen, and compact 293g body."
  },
  {
    id: 210, name: "Sony Alpha A6700", brand: "Sony", deviceType: "Mirrorless",
    price: 149999, originalPrice: 164999, discount: 9, tag: "HOT", available: true,
    rating: 4.7, reviews: 543, resolution: "26MP", sensor: "APS-C", video: "4K 120fps",
    mount: "Sony E", img: null,
    description: "26MP APS-C flagship with AI autofocus. 4K 120p video, 11fps burst with pre-capture, 5-axis IBIS, 759-zone AF, and weather-sealed compact build."
  },
  {
    id: 211, name: "Sony RX100 VII", brand: "Sony", deviceType: "Point & Shoot",
    price: 89999, originalPrice: 99999, discount: 10, tag: "SALE", available: true,
    rating: 4.5, reviews: 678, resolution: "20MP", sensor: "1\"", video: "4K",
    mount: "Fixed", img: null,
    description: "Pocket powerhouse with 1\" sensor and 24-200mm zoom. 20MP, 4K HDR, 90fps tracking AF, 60fps continuous burst, and Sony's fastest AF in a compact body."
  },
  {
    id: 212, name: "Sony Alpha A1", brand: "Sony", deviceType: "Mirrorless",
    price: 549999, originalPrice: 589999, discount: 7, tag: "HOT", available: false,
    rating: 5.0, reviews: 187, resolution: "50MP", sensor: "Full Frame", video: "8K",
    mount: "Sony E", img: null,
    description: "50MP full-frame flagship. 30fps RAW burst, 8K 30p / 4K 120p video, 759-point phase detect AF, 9.44M-dot EVF, dual CFexpress slots, and blackout-free shooting."
  },
];

// ── NIKON ─────────────────────────────────────────────────────────────────────
export const nikonCameras = [
  {
    id: 213, name: "Nikon Z6 III", brand: "Nikon", deviceType: "Mirrorless",
    price: 249999, originalPrice: 274999, discount: 9, tag: "NEW", available: true,
    rating: 4.8, reviews: 543, resolution: "24MP", sensor: "Full Frame", video: "6K",
    mount: "Nikon Z", img: null,
    description: "24.5MP partially-stacked CMOS full-frame. 6K 60p RAW video, 20fps burst, 9-stop IBIS, 8.3MP/s blackout-free shooting, and improved Expeed 7 processor."
  },
  {
    id: 214, name: "Nikon Z8", brand: "Nikon", deviceType: "Mirrorless",
    price: 399999, originalPrice: 429999, discount: 7, tag: "HOT", available: true,
    rating: 4.9, reviews: 321, resolution: "45MP", sensor: "Full Frame", video: "8K",
    mount: "Nikon Z", img: null,
    description: "45.7MP stacked CMOS full-frame in a compact body. 8K 60p RAW, 20fps burst, 9-stop IBIS, vertical grip-free design, dual CFexpress B + SD slots."
  },
  {
    id: 215, name: "Nikon Z50 II", brand: "Nikon", deviceType: "Mirrorless",
    price: 84999, originalPrice: 94999, discount: 11, tag: "NEW", available: true,
    rating: 4.4, reviews: 412, resolution: "20MP", sensor: "APS-C", video: "4K",
    mount: "Nikon Z", img: null,
    description: "20.9MP APS-C mirrorless with vlogging enhancements. 4K 30p (uncropped), flip touchscreen, subject detection AF, USB-C charging, and compact 399g body."
  },
  {
    id: 216, name: "Nikon D7500", brand: "Nikon", deviceType: "DSLR",
    price: 94999, originalPrice: 109999, discount: 14, tag: "SALE", available: true,
    rating: 4.5, reviews: 876, resolution: "20MP", sensor: "APS-C", video: "4K",
    mount: "Nikon F", img: null,
    description: "20.9MP APS-C DSLR with 51-point AF system. 4K UHD video, 8fps burst, tilting touchscreen, weather-sealed body, and dual card slots (SD + XQD)."
  },
  {
    id: 217, name: "Nikon Z30", brand: "Nikon", deviceType: "Mirrorless",
    price: 64999, originalPrice: 74999, discount: 13, tag: "SALE", available: true,
    rating: 4.2, reviews: 567, resolution: "20MP", sensor: "APS-C", video: "4K",
    mount: "Nikon Z", img: null,
    description: "Dedicated content creator camera without EVF. 20.9MP, 4K 30p, 180° flip screen, 3-capsule mic, USB streaming, and eye AF — perfect for YouTube and Instagram."
  },
];

// ── FUJIFILM ──────────────────────────────────────────────────────────────────
export const fujifilmCameras = [
  {
    id: 218, name: "Fujifilm X-T5", brand: "Fujifilm", deviceType: "Mirrorless",
    price: 199999, originalPrice: 219999, discount: 9, tag: "HOT", available: true,
    rating: 4.8, reviews: 654, resolution: "40MP", sensor: "APS-C", video: "6K",
    mount: "Fujifilm X", img: null,
    description: "40.2MP APS-C flagship with 7-stop IBIS. 6K 30p video, 15fps burst, compact retro design with physical controls, 1.84M-dot rear screen, and dual SD slots."
  },
  {
    id: 219, name: "Fujifilm X100VI", brand: "Fujifilm", deviceType: "Point & Shoot",
    price: 149999, originalPrice: 164999, discount: 9, tag: "NEW", available: false,
    rating: 4.9, reviews: 987, resolution: "40MP", sensor: "APS-C", video: "4K",
    mount: "Fixed", img: null,
    description: "40.2MP fixed 23mm f/2 lens compact with 7-stop IBIS. 4K 60p video, hybrid OVF/EVF viewfinder, 20 film simulations, weather-sealed, and classic rangefinder design."
  },
  {
    id: 220, name: "Fujifilm X-S20", brand: "Fujifilm", deviceType: "Mirrorless",
    price: 109999, originalPrice: 124999, discount: 12, tag: "SALE", available: true,
    rating: 4.5, reviews: 432, resolution: "26MP", sensor: "APS-C", video: "6K",
    mount: "Fujifilm X", img: null,
    description: "26.1MP APS-C creator hybrid. 6.2K 30p / 4K 60p video, 7fps burst with pre-shoot, USB-C power delivery, vari-angle screen, and 20 Fujifilm film simulations."
  },
  {
    id: 221, name: "Fujifilm GFX 50S II", brand: "Fujifilm", deviceType: "Mirrorless",
    price: 449999, originalPrice: 489999, discount: 8, tag: "SALE", available: true,
    rating: 4.7, reviews: 198, resolution: "51MP", sensor: "Full Frame", video: "4K",
    mount: "Fujifilm G", img: null,
    description: "51.4MP medium-format sensor in a compact body. 6-stop IBIS, 4K video, weather-sealed, phase detect AF on medium format, delivering unmatched image quality."
  },
];

// ── PANASONIC ─────────────────────────────────────────────────────────────────
export const panasonicCameras = [
  {
    id: 222, name: "Panasonic Lumix S5 II", brand: "Panasonic", deviceType: "Mirrorless",
    price: 219999, originalPrice: 244999, discount: 10, tag: "HOT", available: true,
    rating: 4.7, reviews: 432, resolution: "24MP", sensor: "Full Frame", video: "6K",
    mount: "Micro 4/3", img: null,
    description: "24.2MP full-frame hybrid with phase-detect AF. 6K 30p / 4K 60p video, 5-axis IBIS (5 stops), unlimited 4K recording, dual SD slots, and weather-sealed body."
  },
  {
    id: 223, name: "Panasonic Lumix G9 II", brand: "Panasonic", deviceType: "Mirrorless",
    price: 189999, originalPrice: 209999, discount: 10, tag: "NEW", available: true,
    rating: 4.6, reviews: 287, resolution: "25MP", sensor: "Micro 4/3", video: "4K",
    mount: "Micro 4/3", img: null,
    description: "25MP Micro 4/3 flagship with phase-detect AF. 4K 120fps / C4K 60p video, 60fps burst, 7.5-stop IBIS, 779-point AF, and IP53 weather and dust sealing."
  },
  {
    id: 224, name: "Panasonic Lumix ZS200", brand: "Panasonic", deviceType: "Point & Shoot",
    price: 49999, originalPrice: 59999, discount: 17, tag: "SALE", available: true,
    rating: 4.2, reviews: 543, resolution: "20MP", sensor: "1\"", video: "4K",
    mount: "Fixed", img: null,
    description: "Travel zoom with 1\" sensor and 15x optical zoom. 20.1MP, 4K video, Leica DC Vario lens, raw shooting, 5-axis HYBRID O.I.S., and pocket-sized 271g body."
  },
];

// ── OLYMPUS / OM SYSTEM ───────────────────────────────────────────────────────
export const olympusCameras = [
  {
    id: 225, name: "OM System OM-5", brand: "Olympus", deviceType: "Mirrorless",
    price: 134999, originalPrice: 149999, discount: 10, tag: "NEW", available: true,
    rating: 4.5, reviews: 321, resolution: "20MP", sensor: "Micro 4/3", video: "4K",
    mount: "Micro 4/3", img: null,
    description: "20.4MP rugged Micro 4/3 with 7.5-stop IBIS. IP53 dust and splash proof, -10°C cold resistance, 4K 30p video, 30fps burst, and compact 387g weather-sealed body."
  },
  {
    id: 226, name: "OM System OM-1 Mark II", brand: "Olympus", deviceType: "Mirrorless",
    price: 224999, originalPrice: 249999, discount: 10, tag: "HOT", available: true,
    rating: 4.7, reviews: 234, resolution: "20MP", sensor: "Micro 4/3", video: "4K",
    mount: "Micro 4/3", img: null,
    description: "20.4MP stacked BSI sensor flagship. 120fps burst with pre-capture, AI subject detection, 8-stop IBIS, 4K 60p video, IPX1 waterproof rated body."
  },
  {
    id: 227, name: "Olympus TG-7", brand: "Olympus", deviceType: "Action",
    price: 44999, originalPrice: 52999, discount: 15, tag: "SALE", available: true,
    rating: 4.4, reviews: 765, resolution: "12MP", sensor: "1/2.3\"", video: "4K",
    mount: "Fixed", img: null,
    description: "Waterproof to 15m, shockproof from 2.1m, freeze proof to -10°C. 12MP, 4X optical zoom, 4K video, built-in ND filter, and microscope macro mode for extreme close-ups."
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// READY-TO-USE DATA OBJECTS (pass directly as `data` prop)
// ─────────────────────────────────────────────────────────────────────────────

// All cameras (all brands combined)
export const camerasData = buildCamerasData(
  [...canonCameras, ...sonyCameras, ...nikonCameras, ...fujifilmCameras,
   ...panasonicCameras, ...olympusCameras],
  "Cameras"
);

// Single-brand pages
export const canonCamerasData     = buildCamerasData(canonCameras,     "Canon Cameras");
export const sonymCamerasData     = buildCamerasData(sonyCameras,      "Sony Cameras");
export const nikonCamerasData     = buildCamerasData(nikonCameras,     "Nikon Cameras");
export const fujifilmCamerasData  = buildCamerasData(fujifilmCameras,  "Fujifilm Cameras");
export const panasonicCamerasData = buildCamerasData(panasonicCameras, "Panasonic Cameras");
export const olympusCamerasData   = buildCamerasData(olympusCameras,   "Olympus Cameras");