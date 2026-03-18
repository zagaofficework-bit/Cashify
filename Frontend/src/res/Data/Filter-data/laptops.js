// ─────────────────────────────────────────────────────────────────────────────
// DeviceDetail.js
//
// All laptop data is split into per-brand arrays.
// You can pass a single brand, multiple brands, or all brands to the Filter component.
//
// Usage examples:
//
//   // All laptops
//   import { laptopsData } from "./DeviceDetail";
//   <Filter data={laptopsData} />
//
//   // Only Apple laptops
//   import { appleLaptopsData } from "./DeviceDetail";
//   <Filter data={appleLaptopsData} />
//
//   // Apple + Lenovo
//   import { buildLaptopsData, appleLaptops, lenovoLaptops } from "./DeviceDetail";
//   <Filter data={buildLaptopsData([...appleLaptops, ...lenovoLaptops])} />
// ─────────────────────────────────────────────────────────────────────────────

// ── Shared filterConfig & priceRange for all laptop pages ─────────────────────
const laptopsFilterConfig = [
  { key: "brand",        label: "Brand",        type: "checkbox", options: ["Apple", "Samsung", "Acer", "Lenovo", "Dell", "HP", "Asus", "Microsoft"] },
  { key: "deviceType",   label: "Type",         type: "checkbox", options: ["Ultrabook", "Gaming", "Business", "Budget", "Chromebook", "Refurbished"] },
  { key: "availability", label: "Availability", type: "checkbox", options: ["In Stock", "Out of Stock", "Pre-order"] },
  { key: "ram",          label: "RAM",          type: "pill",     options: ["8GB", "16GB", "24GB", "32GB", "64GB"] },
  { key: "storage",      label: "Storage",      type: "pill",     options: ["256GB SSD", "512GB SSD", "1TB SSD", "2TB SSD"] },
  { key: "processor",    label: "Processor",    type: "checkbox", options: ["Intel Core i5", "Intel Core i7", "Intel Core i9", "AMD Ryzen 5", "AMD Ryzen 7", "AMD Ryzen 9", "Apple M3", "Apple M4", "Apple M4 Pro"] },
  { key: "display",      label: "Display Size", type: "checkbox", options: ["13\"", "13.3\"", "14\"", "15.6\"", "16\"", "17\""] },
];

const laptopsPriceRange = { min: 0, max: 500000, step: 5000 };

// ── Helper: build a laptopsData object from any device array ──────────────────
// Use this when combining brands: buildLaptopsData([...appleLaptops, ...lenovoLaptops])
export const buildLaptopsData = (devices, pageTitle = "Laptops") => ({
  pageTitle,
  priceRange: laptopsPriceRange,
  filterConfig: laptopsFilterConfig,
  devices,
});

// ─────────────────────────────────────────────────────────────────────────────
// PER-BRAND DEVICE ARRAYS
// ─────────────────────────────────────────────────────────────────────────────

// ── APPLE ─────────────────────────────────────────────────────────────────────
export const appleLaptops = [
  {
    id: 1, name: "Apple MacBook Air 13\" M3", brand: "Apple", deviceType: "Ultrabook",
    price: 114900, originalPrice: 124900, discount: 8, tag: "HOT", available: true,
    rating: 4.8, reviews: 1243, ram: "8GB", storage: "256GB SSD", processor: "Apple M3", display: "13.3\"", img: null,
    description: "Supercharged by M3 chip. Up to 18-hour battery, fanless silent design, 13.6\" Liquid Retina display, and MagSafe charging. Starts at just 2.7 lbs."
  },
  {
    id: 2, name: "Apple MacBook Air 15\" M3", brand: "Apple", deviceType: "Ultrabook",
    price: 134900, originalPrice: 149900, discount: 10, tag: "SALE", available: true,
    rating: 4.7, reviews: 876, ram: "8GB", storage: "512GB SSD", processor: "Apple M3", display: "15.6\"", img: null,
    description: "The world's best 15-inch laptop. M3 chip, 15.3\" Liquid Retina display, 18-hour battery, and a fanless design that stays perfectly silent under any workload."
  },
  {
    id: 3, name: "Apple MacBook Pro 14\" M4", brand: "Apple", deviceType: "Ultrabook",
    price: 199900, originalPrice: 219900, discount: 9, tag: "NEW", available: true,
    rating: 4.9, reviews: 534, ram: "16GB", storage: "512GB SSD", processor: "Apple M4", display: "14\"", img: null,
    description: "M4 chip with 10-core CPU and 10-core GPU. Liquid Retina XDR display with ProMotion, up to 22-hour battery life, MagSafe 3 charging, and Thunderbolt 4 ports."
  },
  {
    id: 4, name: "Apple MacBook Pro 14\" M4 Pro", brand: "Apple", deviceType: "Ultrabook",
    price: 249900, originalPrice: 269900, discount: 7, tag: "NEW", available: true,
    rating: 4.9, reviews: 312, ram: "24GB", storage: "512GB SSD", processor: "Apple M4 Pro", display: "14\"", img: null,
    description: "M4 Pro chip with 14-core CPU and 20-core GPU for demanding creative workflows. 24GB unified memory, up to 24-hour battery, and stunning Liquid Retina XDR display."
  },
  {
    id: 5, name: "Apple MacBook Pro 16\" M4 Pro", brand: "Apple", deviceType: "Ultrabook",
    price: 299900, originalPrice: 329900, discount: 9, tag: "HOT", available: true,
    rating: 5.0, reviews: 198, ram: "24GB", storage: "1TB SSD", processor: "Apple M4 Pro", display: "16\"", img: null,
    description: "The ultimate pro laptop. M4 Pro chip, 16.2\" Liquid Retina XDR display, up to 24-hour battery, six-speaker sound system with spatial audio, and Thunderbolt 5."
  },
  {
    id: 6, name: "Apple MacBook Air 13\" M2", brand: "Apple", deviceType: "Ultrabook",
    price: 89900, originalPrice: 99900, discount: 10, tag: "SALE", available: true,
    rating: 4.7, reviews: 2145, ram: "8GB", storage: "256GB SSD", processor: "Apple M3", display: "13.3\"", img: null,
    description: "Redesigned with M2 chip and a fanless build. 13.6\" Liquid Retina display, MagSafe charging, two Thunderbolt ports, and all-day 18-hour battery life."
  },
];

// ── SAMSUNG ───────────────────────────────────────────────────────────────────
export const samsungLaptops = [
  {
    id: 7, name: "Samsung Galaxy Book4 Pro 360", brand: "Samsung", deviceType: "Ultrabook",
    price: 179990, originalPrice: 199990, discount: 10, tag: "NEW", available: true,
    rating: 4.6, reviews: 432, ram: "16GB", storage: "1TB SSD", processor: "Intel Core i7", display: "16\"", img: null,
    description: "2-in-1 AMOLED touchscreen laptop with S Pen included. Intel Core Ultra 7, 16\" Dynamic AMOLED 2X at 120Hz, Galaxy AI features, and up to 25-hour battery."
  },
  {
    id: 8, name: "Samsung Galaxy Book4 Pro", brand: "Samsung", deviceType: "Ultrabook",
    price: 159990, originalPrice: 174990, discount: 9, tag: "HOT", available: true,
    rating: 4.5, reviews: 287, ram: "16GB", storage: "512GB SSD", processor: "Intel Core i7", display: "14\"", img: null,
    description: "14\" Dynamic AMOLED 2X display at 120Hz in a slim 1.17 kg body. Intel Core Ultra 7, Wi-Fi 6E, and Galaxy AI that supercharges everyday productivity."
  },
  {
    id: 9, name: "Samsung Galaxy Book4 Edge", brand: "Samsung", deviceType: "Ultrabook",
    price: 134990, originalPrice: 149990, discount: 10, tag: "NEW", available: true,
    rating: 4.4, reviews: 156, ram: "16GB", storage: "512GB SSD", processor: "Intel Core i7", display: "14\"", img: null,
    description: "Snapdragon X Elite Copilot+ PC with incredible AI performance. Fanless design, 14\" AMOLED display, Wi-Fi 7, and all-day battery in an ultra-thin aluminum body."
  },
  {
    id: 10, name: "Samsung Galaxy Book3 Ultra", brand: "Samsung", deviceType: "Ultrabook",
    price: 249990, originalPrice: 274990, discount: 9, tag: "SALE", available: true,
    rating: 4.7, reviews: 98, ram: "32GB", storage: "1TB SSD", processor: "Intel Core i9", display: "16\"", img: null,
    description: "Creator-focused powerhouse with RTX 4070 graphics. 16\" AMOLED 2X at 120Hz, Intel Core i9 HX, and 76Whr battery for mobile content creation."
  },
  {
    id: 11, name: "Samsung Galaxy Book3 360", brand: "Samsung", deviceType: "Ultrabook",
    price: 89990, originalPrice: 99990, discount: 10, tag: "SALE", available: true,
    rating: 4.3, reviews: 341, ram: "16GB", storage: "512GB SSD", processor: "Intel Core i5", display: "13\"", img: null,
    description: "Lightweight 2-in-1 with S Pen support and 360° hinge. 13.3\" AMOLED FHD display, Intel Core i5, and thin 11.5mm body weighing just 1.66 kg."
  },
  {
    id: 12, name: "Samsung Galaxy Book3 Pro", brand: "Samsung", deviceType: "Ultrabook",
    price: 119990, originalPrice: 134990, discount: 11, tag: "HOT", available: false,
    rating: 4.5, reviews: 213, ram: "16GB", storage: "512GB SSD", processor: "Intel Core i7", display: "14\"", img: null,
    description: "Ultra-light 1.17 kg laptop with 14\" AMOLED display. Intel Core i7, 120Hz refresh rate, Wi-Fi 6E, and seamless Galaxy ecosystem connectivity."
  },
];

// ── ACER ──────────────────────────────────────────────────────────────────────
export const acerLaptops = [
  {
    id: 13, name: "Acer Swift X 14", brand: "Acer", deviceType: "Ultrabook",
    price: 89999, originalPrice: 99999, discount: 10, tag: "NEW", available: true,
    rating: 4.4, reviews: 567, ram: "16GB", storage: "512GB SSD", processor: "AMD Ryzen 7", display: "14\"", img: null,
    description: "14\" 2.8K OLED display with RTX 4050 graphics in a thin 1.4 kg chassis. AMD Ryzen 7, 76Whr battery, Wi-Fi 6E, and Thunderbolt 4 — premium value."
  },
  {
    id: 14, name: "Acer Predator Helios 16", brand: "Acer", deviceType: "Gaming",
    price: 149999, originalPrice: 169999, discount: 12, tag: "HOT", available: true,
    rating: 4.6, reviews: 389, ram: "16GB", storage: "1TB SSD", processor: "Intel Core i7", display: "16\"", img: null,
    description: "16\" WQXGA 240Hz IPS display with RTX 4070 Ti. Intel Core i7 HX, Killer Ethernet, dual-fan cooling with 5th gen AeroBlade fans, and MUX Switch."
  },
  {
    id: 15, name: "Acer Aspire 5 (2024)", brand: "Acer", deviceType: "Budget",
    price: 44999, originalPrice: 52999, discount: 15, tag: "SALE", available: true,
    rating: 4.1, reviews: 1892, ram: "8GB", storage: "512GB SSD", processor: "AMD Ryzen 5", display: "15.6\"", img: null,
    description: "Reliable everyday laptop with AMD Ryzen 5, Full HD IPS display, fast WiFi 6, and upgradeable RAM. Best-in-class value for students and professionals."
  },
  {
    id: 16, name: "Acer Swift Go 14", brand: "Acer", deviceType: "Ultrabook",
    price: 74999, originalPrice: 82999, discount: 10, tag: "NEW", available: true,
    rating: 4.3, reviews: 445, ram: "16GB", storage: "512GB SSD", processor: "Intel Core i7", display: "14\"", img: null,
    description: "14\" OLED WQXGA+ display at 90Hz in a 1.25 kg body. Intel Core Ultra 7, AI-powered features, Wi-Fi 6E, and USB4 Type-C — outstanding portability."
  },
  {
    id: 17, name: "Acer Nitro V 16", brand: "Acer", deviceType: "Gaming",
    price: 74999, originalPrice: 84999, discount: 12, tag: "SALE", available: true,
    rating: 4.2, reviews: 678, ram: "16GB", storage: "512GB SSD", processor: "AMD Ryzen 7", display: "16\"", img: null,
    description: "Entry-level gaming with RTX 4060 and AMD Ryzen 7. 16\" FHD IPS 165Hz display, dual-fan cooling, and killer gaming performance at an accessible price."
  },
  {
    id: 18, name: "Acer Chromebook Spin 714", brand: "Acer", deviceType: "Chromebook",
    price: 54999, originalPrice: 62999, discount: 13, tag: "NEW", available: true,
    rating: 4.3, reviews: 234, ram: "8GB", storage: "256GB SSD", processor: "Intel Core i5", display: "14\"", img: null,
    description: "Premium 2-in-1 Chromebook with 14\" QHD IPS touchscreen and USI stylus. Intel Core i5, backlit keyboard, Thunderbolt 4, and IPX2 spill resistance."
  },
];

// ── LENOVO ────────────────────────────────────────────────────────────────────
export const lenovoLaptops = [
  {
    id: 19, name: "Lenovo ThinkPad X1 Carbon Gen 12", brand: "Lenovo", deviceType: "Business",
    price: 139999, originalPrice: 154999, discount: 10, tag: "SALE", available: true,
    rating: 4.5, reviews: 321, ram: "16GB", storage: "512GB SSD", processor: "Intel Core i7", display: "14\"", img: null,
    description: "MIL-SPEC durability in a 2.48 lb ultra-light chassis. Best-in-class TrackPoint keyboard, 57Whr battery, Intel vPro, and Thunderbolt 4 ports."
  },
  {
    id: 20, name: "Lenovo IdeaPad Slim 5 Gen 9", brand: "Lenovo", deviceType: "Ultrabook",
    price: 69999, originalPrice: 79999, discount: 13, tag: "NEW", available: true,
    rating: 4.4, reviews: 756, ram: "16GB", storage: "512GB SSD", processor: "AMD Ryzen 7", display: "14\"", img: null,
    description: "14\" 2.8K OLED display with 90Hz in a slim 1.46 kg body. AMD Ryzen 7 8845HS, Wi-Fi 6E, USB4, and Lenovo AI Core 2.0 for smart everyday performance."
  },
  {
    id: 21, name: "Lenovo Legion Pro 5i Gen 9", brand: "Lenovo", deviceType: "Gaming",
    price: 139999, originalPrice: 154999, discount: 10, tag: "HOT", available: true,
    rating: 4.7, reviews: 543, ram: "16GB", storage: "1TB SSD", processor: "Intel Core i7", display: "16\"", img: null,
    description: "16\" 2560×1600 IPS 240Hz display with RTX 4070. Intel Core i7 HX, Coldfront 5.0 cooling, Legion TrueStrike keyboard, and Corsair iCUE lighting."
  },
  {
    id: 22, name: "Lenovo Yoga 9i Gen 9", brand: "Lenovo", deviceType: "Ultrabook",
    price: 159999, originalPrice: 174999, discount: 9, tag: "NEW", available: true,
    rating: 4.6, reviews: 234, ram: "16GB", storage: "1TB SSD", processor: "Intel Core i7", display: "14\"", img: null,
    description: "14\" OLED touchscreen 2-in-1 premium laptop. Bowers & Wilkins quad-speaker system, Intel Core Ultra 7, rotating sound bar hinge, and 360° yoga form factor."
  },
  {
    id: 23, name: "Lenovo ThinkBook 14 Gen 7", brand: "Lenovo", deviceType: "Business",
    price: 79999, originalPrice: 89999, discount: 11, tag: "SALE", available: true,
    rating: 4.3, reviews: 412, ram: "16GB", storage: "512GB SSD", processor: "AMD Ryzen 7", display: "14\"", img: null,
    description: "Modern business laptop with AI-powered features. AMD Ryzen 7 8845HS, 14\" IPS display, dual Thunderbolt 4, slim 15.9mm design at 1.38 kg."
  },
  {
    id: 24, name: "Lenovo IdeaPad Gaming 3i Gen 8", brand: "Lenovo", deviceType: "Gaming",
    price: 64999, originalPrice: 74999, discount: 13, tag: "SALE", available: true,
    rating: 4.2, reviews: 891, ram: "8GB", storage: "512GB SSD", processor: "Intel Core i5", display: "15.6\"", img: null,
    description: "15.6\" FHD IPS 144Hz display with RTX 3050. Intel Core i5 12th Gen, dual-fan cooling, 4-zone keyboard backlight, and effortless everyday gaming."
  },
];

// ── DELL ──────────────────────────────────────────────────────────────────────
export const dellLaptops = [
  {
    id: 25, name: "Dell XPS 15 9530", brand: "Dell", deviceType: "Ultrabook",
    price: 149999, originalPrice: 169999, discount: 12, tag: "HOT", available: true,
    rating: 4.6, reviews: 287, ram: "16GB", storage: "512GB SSD", processor: "Intel Core i7", display: "15.6\"", img: null,
    description: "Stunning 3.5K OLED touch display with RTX 4060. InfinityEdge design, 6-speaker Waves MaxxAudio system, and premium CNC aluminum chassis."
  },
  {
    id: 26, name: "Dell XPS 13 9340", brand: "Dell", deviceType: "Ultrabook",
    price: 119999, originalPrice: 134999, discount: 11, tag: "NEW", available: true,
    rating: 4.5, reviews: 432, ram: "16GB", storage: "512GB SSD", processor: "Intel Core i7", display: "13\"", img: null,
    description: "Redesigned XPS 13 with Intel Core Ultra. Compact 13.4\" FHD+ display, USB4, Thunderbolt 4, and impeccably thin 15.28mm chassis at 1.19 kg."
  },
  {
    id: 27, name: "Dell Alienware m16 R2", brand: "Dell", deviceType: "Gaming",
    price: 199999, originalPrice: 224999, discount: 11, tag: "HOT", available: true,
    rating: 4.7, reviews: 156, ram: "32GB", storage: "1TB SSD", processor: "Intel Core i9", display: "16\"", img: null,
    description: "16\" QHD+ 240Hz display with RTX 4080 and Intel Core i9 HX. Cherry MX ultra-low-profile keys and Alienware Command Center."
  },
  {
    id: 28, name: "Dell Inspiron 15 3530", brand: "Dell", deviceType: "Budget",
    price: 49999, originalPrice: 57999, discount: 14, tag: "SALE", available: true,
    rating: 4.0, reviews: 1234, ram: "8GB", storage: "512GB SSD", processor: "Intel Core i5", display: "15.6\"", img: null,
    description: "Affordable everyday laptop with Intel Core i5, 15.6\" FHD anti-glare display, fast Wi-Fi 6, and a full numeric keypad."
  },
];

// ── HP ────────────────────────────────────────────────────────────────────────
export const hpLaptops = [
  {
    id: 29, name: "HP Spectre x360 14", brand: "HP", deviceType: "Ultrabook",
    price: 129999, originalPrice: 144999, discount: 10, tag: "NEW", available: true,
    rating: 4.4, reviews: 176, ram: "16GB", storage: "1TB SSD", processor: "Intel Core i7", display: "14\"", img: null,
    description: "2-in-1 convertible with OLED touch display. Intel Evo certified, gem-cut design, 17-hour battery, and HP Privacy Camera with built-in kill switch."
  },
  {
    id: 30, name: "HP OMEN 16 (2024)", brand: "HP", deviceType: "Gaming",
    price: 124999, originalPrice: 139999, discount: 11, tag: "HOT", available: true,
    rating: 4.5, reviews: 312, ram: "16GB", storage: "1TB SSD", processor: "AMD Ryzen 7", display: "16\"", img: null,
    description: "16\" QHD 165Hz IPS with RTX 4070. AMD Ryzen 7 7745HX, OMEN Tempest cooling, 99.9Whr battery, and Killer Wi-Fi 6E for lag-free gaming."
  },
  {
    id: 31, name: "HP EliteBook 840 G11", brand: "HP", deviceType: "Business",
    price: 134999, originalPrice: 149999, discount: 10, tag: "NEW", available: true,
    rating: 4.5, reviews: 198, ram: "16GB", storage: "512GB SSD", processor: "Intel Core i7", display: "14\"", img: null,
    description: "Enterprise-class with HP Wolf Security. Intel Core Ultra 7 vPro, 14\" OLED option, MIL-STD-810H durability, and 5G connectivity."
  },
  {
    id: 32, name: "HP Pavilion 15 (2024)", brand: "HP", deviceType: "Budget",
    price: 54999, originalPrice: 62999, discount: 13, tag: "SALE", available: true,
    rating: 4.1, reviews: 876, ram: "8GB", storage: "512GB SSD", processor: "AMD Ryzen 5", display: "15.6\"", img: null,
    description: "15.6\" FHD micro-edge display with AMD Ryzen 5. HP Fast Charge (0→50% in 45 min), backlit keyboard, and Wi-Fi 6."
  },
];

// ── ASUS ──────────────────────────────────────────────────────────────────────
export const asusLaptops = [
  {
    id: 33, name: "ASUS ROG Zephyrus G16", brand: "Asus", deviceType: "Gaming",
    price: 189999, originalPrice: 209999, discount: 10, tag: "NEW", available: true,
    rating: 4.7, reviews: 198, ram: "32GB", storage: "1TB SSD", processor: "AMD Ryzen 7", display: "16\"", img: null,
    description: "RTX 4080 Laptop GPU with 240Hz QHD+ OLED display. AMD Ryzen 9, MUX Switch, whisper-quiet thermals, and ROG Nebula HDR screen."
  },
  {
    id: 34, name: "ASUS ZenBook 14 OLED", brand: "Asus", deviceType: "Ultrabook",
    price: 84999, originalPrice: 94999, discount: 11, tag: "HOT", available: true,
    rating: 4.5, reviews: 432, ram: "16GB", storage: "512GB SSD", processor: "AMD Ryzen 7", display: "14\"", img: null,
    description: "14\" OLED 2.8K 90Hz with AMD Ryzen 7 in a 1.2 kg chassis. ASUS Dial, Thunderbolt 4, Wi-Fi 6E, and AI-powered noise cancellation."
  },
  {
    id: 35, name: "ASUS TUF Gaming A15", brand: "Asus", deviceType: "Gaming",
    price: 79999, originalPrice: 89999, discount: 11, tag: "SALE", available: true,
    rating: 4.3, reviews: 765, ram: "16GB", storage: "512GB SSD", processor: "AMD Ryzen 7", display: "15.6\"", img: null,
    description: "Military-grade durability with RTX 4060. AMD Ryzen 7 7745HX, 15.6\" FHD 144Hz, 90Whr battery, and MUX Switch for peak gaming."
  },
];

// ── MICROSOFT ─────────────────────────────────────────────────────────────────
export const microsoftLaptops = [
  {
    id: 36, name: "Microsoft Surface Pro 11", brand: "Microsoft", deviceType: "Ultrabook",
    price: 109999, originalPrice: 124999, discount: 12, tag: "NEW", available: true,
    rating: 4.4, reviews: 287, ram: "16GB", storage: "256GB SSD", processor: "Intel Core i7", display: "13\"", img: null,
    description: "13\" PixelSense Flow 2-in-1 with Snapdragon X Elite. Copilot+ PC, 14-hour battery, Thunderbolt 4, optional Surface Slim Pen 2."
  },
  {
    id: 37, name: "Microsoft Surface Laptop 6", brand: "Microsoft", deviceType: "Ultrabook",
    price: 119999, originalPrice: 134999, discount: 11, tag: "HOT", available: true,
    rating: 4.6, reviews: 198, ram: "16GB", storage: "512GB SSD", processor: "Intel Core i7", display: "13\"", img: null,
    description: "Thinnest, lightest Surface Laptop ever. Intel Core Ultra 7, 13.8\" PixelSense touchscreen, Thunderbolt 4, Wi-Fi 6E, 19-hour battery."
  },
  {
    id: 38, name: "Microsoft Surface Laptop Studio 2", brand: "Microsoft", deviceType: "Ultrabook",
    price: 179999, originalPrice: 199999, discount: 10, tag: "NEW", available: false,
    rating: 4.5, reviews: 134, ram: "32GB", storage: "1TB SSD", processor: "Intel Core i7", display: "14\"", img: null,
    description: "Versatile creative laptop with RTX 4060. Pull-forward touchscreen for drawing, 14.4\" PixelSense Flow, Thunderbolt 4, Surface Slim Pen 2."
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// READY-TO-USE DATA OBJECTS (pass directly as `data` prop)
// ─────────────────────────────────────────────────────────────────────────────

// All laptops (all brands combined)
export const laptopsData = buildLaptopsData(
  [...appleLaptops, ...samsungLaptops, ...acerLaptops, ...lenovoLaptops,
   ...dellLaptops, ...hpLaptops, ...asusLaptops, ...microsoftLaptops],
  "Laptops"
);

// Single-brand pages
export const appleLaptopsData     = buildLaptopsData(appleLaptops,     "Apple Laptops");
export const samsungLaptopsData   = buildLaptopsData(samsungLaptops,   "Samsung Laptops");
export const acerLaptopsData      = buildLaptopsData(acerLaptops,      "Acer Laptops");
export const lenovoLaptopsData    = buildLaptopsData(lenovoLaptops,    "Lenovo Laptops");
export const dellLaptopsData      = buildLaptopsData(dellLaptops,      "Dell Laptops");
export const hpLaptopsData        = buildLaptopsData(hpLaptops,        "HP Laptops");
export const asusLaptopsData      = buildLaptopsData(asusLaptops,      "Asus Laptops");
export const microsoftLaptopsData = buildLaptopsData(microsoftLaptops, "Microsoft Laptops");


// ─────────────────────────────────────────────────────────────────────────────
// PHONES DATA
// ─────────────────────────────────────────────────────────────────────────────
export const phonesData = {
  pageTitle: "Phones",
  priceRange: { min: 0, max: 200000, step: 1000 },
  filterConfig: [
    { key: "brand",        label: "Brand",        type: "checkbox", options: ["Apple", "Samsung", "OnePlus", "Xiaomi", "Google", "Motorola"] },
    { key: "deviceType",   label: "Device Type",  type: "checkbox", options: ["Flagship", "Mid-Range", "Budget", "Refurbished"] },
    { key: "availability", label: "Availability", type: "checkbox", options: ["In Stock", "Out of Stock", "Pre-order"] },
    { key: "ram",          label: "RAM",          type: "pill",     options: ["4GB", "6GB", "8GB", "12GB", "16GB"] },
    { key: "storage",      label: "Storage",      type: "pill",     options: ["64GB", "128GB", "256GB", "512GB", "1TB"] },
    { key: "battery",      label: "Battery",      type: "checkbox", options: ["3000–4000mAh", "4000–5000mAh", "5000mAh+"] },
  ],
  devices: [
    { id: 101, name: "Apple iPhone 17e", brand: "Apple", deviceType: "Flagship", price: 64900, originalPrice: 72900, discount: 11, tag: "NEW", available: true, rating: 4.8, reviews: 342, ram: "8GB", storage: "128GB", battery: "3500mAh", img: null, description: "A16 Bionic chip, 48MP main camera, Dynamic Island, USB-C, and 6.1\" OLED display." },
    { id: 102, name: "Samsung Galaxy S26", brand: "Samsung", deviceType: "Flagship", price: 87999, originalPrice: 99999, discount: 12, tag: "HOT", available: true, rating: 4.6, reviews: 215, ram: "12GB", storage: "256GB", battery: "5000mAh", img: null, description: "Snapdragon 8 Elite, 200MP camera, 6.8\" Dynamic AMOLED 2X, IP68, Galaxy AI." },
    { id: 103, name: "OnePlus 14 Pro", brand: "OnePlus", deviceType: "Flagship", price: 72999, originalPrice: 79999, discount: 9, tag: "NEW", available: false, rating: 4.5, reviews: 189, ram: "12GB", storage: "256GB", battery: "5500mAh", img: null, description: "Hasselblad tri-camera, 100W SuperVOOC, Snapdragon 8 Gen 4, ceramic back." },
    { id: 104, name: "Google Pixel 9 Pro", brand: "Google", deviceType: "Flagship", price: 99999, originalPrice: 109999, discount: 9, tag: "SALE", available: true, rating: 4.7, reviews: 267, ram: "12GB", storage: "128GB", battery: "4700mAh", img: null, description: "Google Tensor G4, best AI photography, 7-year OS updates, real-time call translation." },
    { id: 105, name: "Xiaomi 15 Ultra", brand: "Xiaomi", deviceType: "Flagship", price: 59999, originalPrice: 64999, discount: 8, tag: "NEW", available: true, rating: 4.4, reviews: 156, ram: "16GB", storage: "512GB", battery: "5300mAh", img: null, description: "Leica 1\" periscope sensor, 90W wireless charging, HyperOS 2, IP68, 6.73\" LTPO AMOLED." },
    { id: 106, name: "Motorola Moto G85", brand: "Motorola", deviceType: "Mid-Range", price: 17999, originalPrice: 21999, discount: 18, tag: "SALE", available: true, rating: 4.2, reviews: 412, ram: "8GB", storage: "256GB", battery: "5000mAh", img: null, description: "6.67\" pOLED 144Hz, 50MP OIS camera, 33W TurboPower, Dolby Atmos stereo speakers." },
  ],
};