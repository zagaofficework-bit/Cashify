// ─────────────────────────────────────────────────────────────────────────────
// ConsoleDetail.js
//
// All gaming console data is split into per-brand arrays.
// You can pass a single brand, multiple brands, or all brands to the Filter component.
//
// Usage examples:
//
//   // All consoles
//   import { consolesData } from "./ConsoleDetail";
//   <Filter data={consolesData} />
//
//   // Only Sony consoles
//   import { sonyConsolesData } from "./ConsoleDetail";
//   <Filter data={sonyConsolesData} />
//
//   // Sony + Microsoft
//   import { buildConsolesData, sonyConsoles, microsoftConsoles } from "./ConsoleDetail";
//   <Filter data={buildConsolesData([...sonyConsoles, ...microsoftConsoles])} />
// ─────────────────────────────────────────────────────────────────────────────

// ── Shared filterConfig & priceRange for all console pages ───────────────────
const consolesFilterConfig = [
  { key: "brand",        label: "Brand",        type: "checkbox", options: ["Sony", "Microsoft", "Nintendo", "Valve", "Asus"] },
  { key: "deviceType",   label: "Type",         type: "checkbox", options: ["Home Console", "Handheld", "Hybrid", "PC Gaming", "VR"] },
  { key: "availability", label: "Availability", type: "checkbox", options: ["In Stock", "Out of Stock", "Pre-order"] },
  { key: "storage",      label: "Storage",      type: "pill",     options: ["64GB", "256GB", "512GB", "1TB", "2TB"] },
  { key: "resolution",   label: "Resolution",   type: "pill",     options: ["1080p", "1440p", "4K", "4K 120fps", "8K"] },
  { key: "connectivity", label: "Connectivity", type: "checkbox", options: ["Wi-Fi 5", "Wi-Fi 6", "Wi-Fi 6E", "Bluetooth 5.1", "Bluetooth 5.2"] },
];

const consolesPriceRange = { min: 0, max: 100000, step: 500 };

// ── Helper: build a consolesData object from any device array ─────────────────
export const buildConsolesData = (devices, pageTitle = "Gaming Consoles") => ({
  pageTitle,
  priceRange: consolesPriceRange,
  filterConfig: consolesFilterConfig,
  devices,
});

// ─────────────────────────────────────────────────────────────────────────────
// PER-BRAND DEVICE ARRAYS
// ─────────────────────────────────────────────────────────────────────────────

// ── SONY ──────────────────────────────────────────────────────────────────────
export const sonyConsoles = [
  {
    id: 401, name: "Sony PlayStation 5", brand: "Sony", deviceType: "Home Console",
    price: 54990, originalPrice: 59990, discount: 8, tag: "HOT", available: true,
    rating: 4.9, reviews: 5432, storage: "825GB SSD", resolution: "4K 120fps",
    connectivity: "Wi-Fi 6", img: null,
    description: "Next-gen console with custom SSD for near-instant load times. 4K 120fps gaming, ray tracing, 3D audio via Tempest Engine, DualSense haptic feedback controller, and PS5 exclusive titles."
  },
  {
    id: 402, name: "Sony PlayStation 5 Slim", brand: "Sony", deviceType: "Home Console",
    price: 44990, originalPrice: 49990, discount: 10, tag: "NEW", available: true,
    rating: 4.8, reviews: 3210, storage: "1TB SSD", resolution: "4K 120fps",
    connectivity: "Wi-Fi 6", img: null,
    description: "30% smaller than original PS5 with same performance. 1TB SSD, detachable disc drive option, 4K 120fps, DualSense controller, and access to PlayStation's full game library."
  },
  {
    id: 403, name: "Sony PlayStation 5 Pro", brand: "Sony", deviceType: "Home Console",
    price: 74990, originalPrice: 79990, discount: 6, tag: "NEW", available: true,
    rating: 4.9, reviews: 1876, storage: "2TB SSD", resolution: "4K 120fps",
    connectivity: "Wi-Fi 6E", img: null,
    description: "45% faster GPU than standard PS5. PlayStation Spectral Super Resolution upscaling, 8K output support, 2TB SSD, enhanced ray tracing, and Wi-Fi 6E for ultra-fast online play."
  },
  {
    id: 404, name: "Sony PlayStation VR2", brand: "Sony", deviceType: "VR",
    price: 44990, originalPrice: 54990, discount: 18, tag: "SALE", available: true,
    rating: 4.6, reviews: 876, storage: "N/A", resolution: "4K",
    connectivity: "Bluetooth 5.1", img: null,
    description: "4K HDR OLED display per eye, 110° FOV, eye tracking, adaptive triggers in Sense controllers, 3D audio, and single USB-C cable connection to PS5."
  },
  {
    id: 405, name: "Sony PlayStation 4 Pro", brand: "Sony", deviceType: "Home Console",
    price: 29990, originalPrice: 37990, discount: 21, tag: "SALE", available: true,
    rating: 4.6, reviews: 8765, storage: "1TB", resolution: "4K",
    connectivity: "Wi-Fi 5", img: null,
    description: "4K HDR gaming with massive PS4 game library. 1TB storage, boost mode for faster frame rates, 4K streaming, and backwards compatible with thousands of PS4 titles."
  },
];

// ── MICROSOFT ─────────────────────────────────────────────────────────────────
export const microsoftConsoles = [
  {
    id: 406, name: "Microsoft Xbox Series X", brand: "Microsoft", deviceType: "Home Console",
    price: 52990, originalPrice: 57990, discount: 9, tag: "HOT", available: true,
    rating: 4.8, reviews: 4321, storage: "1TB SSD", resolution: "4K 120fps",
    connectivity: "Wi-Fi 6", img: null,
    description: "12 teraflops of processing power. 4K 120fps gaming, DirectStorage, Quick Resume for multiple games, 1TB custom NVMe SSD, and Game Pass Ultimate access to hundreds of titles."
  },
  {
    id: 407, name: "Microsoft Xbox Series S", brand: "Microsoft", deviceType: "Home Console",
    price: 34990, originalPrice: 39990, discount: 13, tag: "SALE", available: true,
    rating: 4.6, reviews: 5678, storage: "512GB SSD", resolution: "1440p",
    connectivity: "Wi-Fi 5", img: null,
    description: "The smallest Xbox ever. All-digital next-gen gaming at 1440p / 60fps (up to 120fps), 512GB SSD, Quick Resume, Game Pass ready, and compact disc-free design."
  },
  {
    id: 408, name: "Microsoft Xbox Series X 2TB", brand: "Microsoft", deviceType: "Home Console",
    price: 64990, originalPrice: 69990, discount: 7, tag: "NEW", available: true,
    rating: 4.8, reviews: 1234, storage: "2TB SSD", resolution: "4K 120fps",
    connectivity: "Wi-Fi 6E", img: null,
    description: "2TB storage and Wi-Fi 6E in the Galaxy Black special edition. 4K 120fps gaming, 12 teraflops GPU, Quick Resume, DirectStorage, and Xbox Game Pass Ultimate."
  },
  {
    id: 409, name: "Microsoft Xbox One X", brand: "Microsoft", deviceType: "Home Console",
    price: 24990, originalPrice: 31990, discount: 22, tag: "SALE", available: true,
    rating: 4.5, reviews: 6543, storage: "1TB", resolution: "4K",
    connectivity: "Wi-Fi 5", img: null,
    description: "True 4K gaming at an accessible price. 6 teraflops, HDR, 4K Blu-ray, massive Xbox One game library, and backwards compatibility with thousands of older Xbox titles."
  },
];

// ── NINTENDO ──────────────────────────────────────────────────────────────────
export const nintendoConsoles = [
  {
    id: 410, name: "Nintendo Switch 2", brand: "Nintendo", deviceType: "Hybrid",
    price: 39990, originalPrice: 44990, discount: 11, tag: "NEW", available: true,
    rating: 4.9, reviews: 2345, storage: "256GB", resolution: "1080p",
    connectivity: "Wi-Fi 6", img: null,
    description: "Bigger 7.9\" HDR display, improved Joy-Con 2 with mouse-click support, 4K docked output, Nintendo GameChat, and backwards compatibility with most Nintendo Switch games."
  },
  {
    id: 411, name: "Nintendo Switch OLED", brand: "Nintendo", deviceType: "Hybrid",
    price: 29990, originalPrice: 34990, discount: 14, tag: "HOT", available: true,
    rating: 4.8, reviews: 7654, storage: "64GB", resolution: "1080p",
    connectivity: "Wi-Fi 5", img: null,
    description: "7\" OLED screen with vivid colors and wide viewing angles. Enhanced audio, 64GB internal storage, LAN port in dock, and all the versatility of Nintendo Switch."
  },
  {
    id: 412, name: "Nintendo Switch Lite", brand: "Nintendo", deviceType: "Handheld",
    price: 19990, originalPrice: 22990, discount: 13, tag: "SALE", available: true,
    rating: 4.7, reviews: 8901, storage: "32GB", resolution: "720p",
    connectivity: "Wi-Fi 5", img: null,
    description: "Dedicated handheld gaming at an affordable price. 5.5\" touchscreen, built-in controls, 3–7 hour battery, light 275g body, and compatible with all handheld Nintendo Switch titles."
  },
  {
    id: 413, name: "Nintendo Switch V2", brand: "Nintendo", deviceType: "Hybrid",
    price: 24990, originalPrice: 28990, discount: 14, tag: "SALE", available: true,
    rating: 4.7, reviews: 6543, storage: "32GB", resolution: "1080p",
    connectivity: "Wi-Fi 5", img: null,
    description: "Play at home or on the go. 6.2\" touchscreen, detachable Joy-Con, TV dock included, up to 9-hour battery, and access to Nintendo's entire Switch game library."
  },
];

// ── VALVE ─────────────────────────────────────────────────────────────────────
export const valveConsoles = [
  {
    id: 414, name: "Valve Steam Deck OLED 1TB", brand: "Valve", deviceType: "Handheld",
    price: 69990, originalPrice: 79990, discount: 13, tag: "HOT", available: true,
    rating: 4.8, reviews: 3456, storage: "1TB", resolution: "1080p",
    connectivity: "Wi-Fi 6E", img: null,
    description: "7.4\" HDR OLED display, Steam library access, AMD APU, Wi-Fi 6E, 50Whr battery (30–50% longer than LCD), anti-glare etched glass, and access to your full Steam library."
  },
  {
    id: 415, name: "Valve Steam Deck OLED 512GB", brand: "Valve", deviceType: "Handheld",
    price: 54990, originalPrice: 62990, discount: 13, tag: "NEW", available: true,
    rating: 4.7, reviews: 2109, storage: "512GB", resolution: "1080p",
    connectivity: "Wi-Fi 6E", img: null,
    description: "HDR OLED display, AMD custom APU, 512GB NVMe SSD, Wi-Fi 6E, SteamOS with full desktop mode, expandable storage via microSD, and verified Steam game compatibility."
  },
  {
    id: 416, name: "Valve Steam Deck LCD 256GB", brand: "Valve", deviceType: "Handheld",
    price: 39990, originalPrice: 47990, discount: 17, tag: "SALE", available: true,
    rating: 4.6, reviews: 4321, storage: "256GB", resolution: "720p",
    connectivity: "Wi-Fi 5", img: null,
    description: "7\" 800p LCD touchscreen, AMD APU, 256GB SSD, 40Whr battery, MicroSD slot, gyro controls, and SteamOS — the most affordable way to play your Steam library on the go."
  },
];

// ── ASUS ROG ──────────────────────────────────────────────────────────────────
export const asusConsoles = [
  {
    id: 417, name: "Asus ROG Ally X", brand: "Asus", deviceType: "Handheld",
    price: 89990, originalPrice: 99990, discount: 10, tag: "HOT", available: true,
    rating: 4.7, reviews: 1234, storage: "1TB", resolution: "1080p",
    connectivity: "Wi-Fi 6E", img: null,
    description: "AMD Ryzen Z1 Extreme, 7\" FHD 120Hz display, 1TB SSD, 80Whr battery (double ROG Ally), USB-C with Thunderbolt 4, Windows 11, and full Xbox Game Pass compatibility."
  },
  {
    id: 418, name: "Asus ROG Ally (2023)", brand: "Asus", deviceType: "Handheld",
    price: 64990, originalPrice: 74990, discount: 13, tag: "SALE", available: true,
    rating: 4.5, reviews: 2345, storage: "512GB", resolution: "1080p",
    connectivity: "Wi-Fi 6E", img: null,
    description: "AMD Ryzen Z1 Extreme, 7\" FHD 120Hz IPS display, 512GB SSD, Windows 11, ROG XG Mobile external GPU support, and access to all PC game stores including Steam and Xbox."
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// READY-TO-USE DATA OBJECTS (pass directly as `data` prop)
// ─────────────────────────────────────────────────────────────────────────────

// All consoles (all brands combined)
export const consolesData = buildConsolesData(
  [...sonyConsoles, ...microsoftConsoles, ...nintendoConsoles,
   ...valveConsoles, ...asusConsoles],
  "Gaming Consoles"
);

// Single-brand pages
export const sonyConsolesData      = buildConsolesData(sonyConsoles,      "Sony PlayStation");
export const microsoftConsolesData = buildConsolesData(microsoftConsoles, "Microsoft Xbox");
export const nintendoConsolesData  = buildConsolesData(nintendoConsoles,  "Nintendo Consoles");
export const valveConsolesData     = buildConsolesData(valveConsoles,     "Valve Steam Deck");
export const asusConsolesData      = buildConsolesData(asusConsoles,      "Asus ROG Handheld");