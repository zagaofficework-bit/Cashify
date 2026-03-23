// ─────────────────────────────────────────────────────────────────────────────
// PhoneDetail.js
//
// All phone data is split into per-brand arrays.
// You can pass a single brand, multiple brands, or all brands to the Filter component.
//
// Usage examples:
//
//   // All phones
//   import { phonesData } from "./PhoneDetail";
//   <Filter data={phonesData} />
//
//   // Only Apple phones
//   import { applePhoneData } from "./PhoneDetail";
//   <Filter data={applePhoneData} />
//
//   // Apple + Samsung
//   import { buildPhonesData, applePhones, samsungPhones } from "./PhoneDetail";
//   <Filter data={buildPhonesData([...applePhones, ...samsungPhones])} />
// ─────────────────────────────────────────────────────────────────────────────

// ── Shared filterConfig & priceRange for all phone pages ──────────────────────
const phonesFilterConfig = [
  { key: "brand",        label: "Brand",        type: "checkbox", options: ["Apple", "Samsung", "OnePlus", "Google", "Xiaomi", "Motorola", "Nothing", "Vivo"] },
  { key: "deviceType",   label: "Type",         type: "checkbox", options: ["Flagship", "Mid-Range", "Budget", "Foldable", "Refurbished"] },
  { key: "availability", label: "Availability", type: "checkbox", options: ["In Stock", "Out of Stock", "Pre-order"] },
  { key: "ram",          label: "RAM",          type: "pill",     options: ["4GB", "6GB", "8GB", "12GB", "16GB"] },
  { key: "storage",      label: "Storage",      type: "pill",     options: ["64GB", "128GB", "256GB", "512GB", "1TB"] },
  { key: "battery",      label: "Battery",      type: "checkbox", options: ["3000–4000mAh", "4000–5000mAh", "5000mAh+"] },
  { key: "display",      label: "Display",      type: "checkbox", options: ["6.1\"", "6.3\"", "6.5\"", "6.7\"", "6.8\"", "7.6\""] },
];

const phonesPriceRange = { min: 0, max: 200000, step: 1000 };

// ── Helper: build a phonesData object from any device array ───────────────────
// Use this when combining brands: buildPhonesData([...applePhones, ...samsungPhones])
export const buildPhonesData = (devices, pageTitle = "Phones") => ({
  pageTitle,
  priceRange: phonesPriceRange,
  filterConfig: phonesFilterConfig,
  devices,
});

// ─────────────────────────────────────────────────────────────────────────────
// PER-BRAND DEVICE ARRAYS
// ─────────────────────────────────────────────────────────────────────────────

// ── APPLE ─────────────────────────────────────────────────────────────────────
export const applePhones = [
  {
    id: 301, name: "Apple iPhone 16 Pro Max", brand: "Apple", deviceType: "Flagship",
    price: 159900, originalPrice: 174900, discount: 9, tag: "HOT", available: true,
    rating: 4.9, reviews: 2341, ram: "8GB", storage: "256GB", battery: "4685mAh",
    display: "6.7\"", img: null,
    description: "A18 Pro chip, 48MP triple camera with 5x tetraprism zoom, 4K 120fps video, titanium design, Action Button, USB 3 speeds, and the biggest iPhone battery ever."
  },
  {
    id: 302, name: "Apple iPhone 16 Pro", brand: "Apple", deviceType: "Flagship",
    price: 134900, originalPrice: 149900, discount: 10, tag: "HOT", available: true,
    rating: 4.8, reviews: 1876, ram: "8GB", storage: "128GB", battery: "3582mAh",
    display: "6.3\"", img: null,
    description: "A18 Pro chip, 48MP triple camera system, 4K 120fps Dolby Vision, titanium frame, new Camera Control button, and the thinnest bezels ever on an iPhone."
  },
  {
    id: 303, name: "Apple iPhone 16", brand: "Apple", deviceType: "Flagship",
    price: 79900, originalPrice: 89900, discount: 11, tag: "NEW", available: true,
    rating: 4.7, reviews: 3421, ram: "8GB", storage: "128GB", battery: "3561mAh",
    display: "6.1\"", img: null,
    description: "A18 chip, 48MP dual camera with 2x telephoto, 4K 60fps video, Camera Control button, Action Button, Apple Intelligence, and USB-C with USB 3 speeds."
  },
  {
    id: 304, name: "Apple iPhone 16 Plus", brand: "Apple", deviceType: "Flagship",
    price: 89900, originalPrice: 99900, discount: 10, tag: "SALE", available: true,
    rating: 4.7, reviews: 987, ram: "8GB", storage: "128GB", battery: "4674mAh",
    display: "6.7\"", img: null,
    description: "A18 chip in a big-screen body. 48MP dual camera, 4K 60fps, longest iPhone battery life in the standard lineup, Camera Control, and Apple Intelligence features."
  },
  {
    id: 305, name: "Apple iPhone 15", brand: "Apple", deviceType: "Flagship",
    price: 59900, originalPrice: 69900, discount: 14, tag: "SALE", available: true,
    rating: 4.6, reviews: 4532, ram: "6GB", storage: "128GB", battery: "3349mAh",
    display: "6.1\"", img: null,
    description: "A16 Bionic chip, 48MP main camera with 2x telephoto, Dynamic Island, USB-C, Ceramic Shield front, and all-day battery — now at an accessible price."
  },
  {
    id: 306, name: "Apple iPhone 14", brand: "Apple", deviceType: "Mid-Range",
    price: 49900, originalPrice: 59900, discount: 17, tag: "SALE", available: true,
    rating: 4.5, reviews: 5678, ram: "6GB", storage: "128GB", battery: "3279mAh",
    display: "6.1\"", img: null,
    description: "A15 Bionic chip, 12MP dual camera with Photonic Engine, Crash Detection, Emergency SOS via satellite, and all-day battery in the proven iPhone 14 design."
  },
];

// ── SAMSUNG ───────────────────────────────────────────────────────────────────
export const samsungPhones = [
  {
    id: 307, name: "Samsung Galaxy S25 Ultra", brand: "Samsung", deviceType: "Flagship",
    price: 134999, originalPrice: 149999, discount: 10, tag: "NEW", available: true,
    rating: 4.9, reviews: 1876, ram: "12GB", storage: "256GB", battery: "5000mAh",
    display: "6.8\"", img: null,
    description: "200MP camera, built-in S Pen, Snapdragon 8 Elite, 45W fast charging, 7-year OS updates, titanium frame, and Galaxy AI for next-level productivity."
  },
  {
    id: 308, name: "Samsung Galaxy S25+", brand: "Samsung", deviceType: "Flagship",
    price: 99999, originalPrice: 109999, discount: 9, tag: "NEW", available: true,
    rating: 4.8, reviews: 1234, ram: "12GB", storage: "256GB", battery: "4900mAh",
    display: "6.7\"", img: null,
    description: "Snapdragon 8 Elite, 50MP triple camera with 3x zoom, 45W charging, 6.7\" Dynamic AMOLED 2X, Galaxy AI, and 7 years of OS and security updates."
  },
  {
    id: 309, name: "Samsung Galaxy S25", brand: "Samsung", deviceType: "Flagship",
    price: 79999, originalPrice: 89999, discount: 11, tag: "HOT", available: true,
    rating: 4.7, reviews: 2345, ram: "12GB", storage: "128GB", battery: "4000mAh",
    display: "6.2\"", img: null,
    description: "Snapdragon 8 Elite, 50MP triple camera, 6.2\" Dynamic AMOLED 2X at 120Hz, 25W charging, Galaxy AI, compact form factor, and 7-year software support."
  },
  {
    id: 310, name: "Samsung Galaxy Z Fold 6", brand: "Samsung", deviceType: "Foldable",
    price: 164999, originalPrice: 184999, discount: 11, tag: "HOT", available: true,
    rating: 4.7, reviews: 654, ram: "12GB", storage: "256GB", battery: "4400mAh",
    display: "7.6\"", img: null,
    description: "7.6\" inner foldable display + 6.3\" cover screen. Snapdragon 8 Gen 3, 50MP triple camera, S Pen support, Galaxy AI, IPX8, and the thinnest Galaxy Z Fold ever."
  },
  {
    id: 311, name: "Samsung Galaxy Z Flip 6", brand: "Samsung", deviceType: "Foldable",
    price: 109999, originalPrice: 119999, discount: 8, tag: "NEW", available: true,
    rating: 4.6, reviews: 876, ram: "12GB", storage: "256GB", battery: "4000mAh",
    display: "6.7\"", img: null,
    description: "Flip form factor with 3.4\" FlexWindow cover screen. Snapdragon 8 Gen 3, 50MP dual camera, 25W charging, IPX8, Galaxy AI, and compact pocket-sized design."
  },
  {
    id: 312, name: "Samsung Galaxy A55 5G", brand: "Samsung", deviceType: "Mid-Range",
    price: 34999, originalPrice: 41999, discount: 17, tag: "SALE", available: true,
    rating: 4.4, reviews: 3210, ram: "8GB", storage: "128GB", battery: "5000mAh",
    display: "6.6\"", img: null,
    description: "50MP OIS triple camera, 6.6\" Super AMOLED 120Hz, Exynos 1480, IP67, Gorilla Glass Victus+, 25W charging, and 4 years of OS updates."
  },
];

// ── ONEPLUS ───────────────────────────────────────────────────────────────────
export const onePlusPhones = [
  {
    id: 313, name: "OnePlus 13", brand: "OnePlus", deviceType: "Flagship",
    price: 69999, originalPrice: 79999, discount: 13, tag: "HOT", available: true,
    rating: 4.8, reviews: 1432, ram: "12GB", storage: "256GB", battery: "6000mAh",
    display: "6.8\"", img: null,
    description: "Snapdragon 8 Elite, Hasselblad 50MP triple camera with periscope zoom, 100W SUPERVOOC + 50W wireless, 6000mAh battery, IP65, and alert slider."
  },
  {
    id: 314, name: "OnePlus 13R", brand: "OnePlus", deviceType: "Mid-Range",
    price: 42999, originalPrice: 49999, discount: 14, tag: "NEW", available: true,
    rating: 4.6, reviews: 876, ram: "8GB", storage: "128GB", battery: "5500mAh",
    display: "6.7\"", img: null,
    description: "Snapdragon 8 Gen 2, 50MP triple Hasselblad camera, 80W SUPERVOOC, 6.78\" 120Hz AMOLED, alert slider, and 5500mAh massive battery."
  },
  {
    id: 315, name: "OnePlus Nord 4", brand: "OnePlus", deviceType: "Mid-Range",
    price: 29999, originalPrice: 35999, discount: 17, tag: "SALE", available: true,
    rating: 4.4, reviews: 1543, ram: "8GB", storage: "128GB", battery: "5500mAh",
    display: "6.7\"", img: null,
    description: "Snapdragon 7+ Gen 3, 50MP Sony sensor, 100W SUPERVOOC, 6.74\" AMOLED 120Hz, unibody metal design, 5500mAh, and OxygenOS 14."
  },
  {
    id: 316, name: "OnePlus Open", brand: "OnePlus", deviceType: "Foldable",
    price: 139999, originalPrice: 154999, discount: 10, tag: "HOT", available: true,
    rating: 4.7, reviews: 543, ram: "16GB", storage: "512GB", battery: "4805mAh",
    display: "7.8\"", img: null,
    description: "7.82\" inner display + 6.31\" cover. Snapdragon 8 Gen 2, Hasselblad triple 64MP camera, 67W SUPERVOOC, lightest open foldable at 245g, IPX4."
  },
  {
    id: 317, name: "OnePlus Nord CE 4", brand: "OnePlus", deviceType: "Budget",
    price: 24999, originalPrice: 29999, discount: 17, tag: "SALE", available: true,
    rating: 4.2, reviews: 2109, ram: "8GB", storage: "128GB", battery: "5500mAh",
    display: "6.7\"", img: null,
    description: "Snapdragon 7 Gen 3, 50MP Sony OIS camera, 100W SUPERVOOC fast charging, 6.7\" AMOLED 120Hz, and all-day 5500mAh battery at an unbeatable price."
  },
];

// ── GOOGLE ────────────────────────────────────────────────────────────────────
export const googlePhones = [
  {
    id: 318, name: "Google Pixel 9 Pro XL", brand: "Google", deviceType: "Flagship",
    price: 129999, originalPrice: 144999, discount: 10, tag: "HOT", available: true,
    rating: 4.8, reviews: 876, ram: "16GB", storage: "256GB", battery: "5060mAh",
    display: "6.8\"", img: null,
    description: "Google Tensor G4, 50MP triple camera with 5x zoom, 4K 60fps video, 6.8\" LTPO OLED, 30W charging, 7 years OS updates, and best-in-class Google AI features."
  },
  {
    id: 319, name: "Google Pixel 9 Pro", brand: "Google", deviceType: "Flagship",
    price: 109999, originalPrice: 119999, discount: 8, tag: "NEW", available: true,
    rating: 4.8, reviews: 1123, ram: "16GB", storage: "128GB", battery: "4700mAh",
    display: "6.3\"", img: null,
    description: "Google Tensor G4, 50MP triple camera, 4K video, 6.3\" LTPO OLED, Gemini AI, real-time call screening, 7-year updates, and polished matte glass design."
  },
  {
    id: 320, name: "Google Pixel 9", brand: "Google", deviceType: "Flagship",
    price: 79999, originalPrice: 89999, discount: 11, tag: "NEW", available: true,
    rating: 4.7, reviews: 1654, ram: "12GB", storage: "128GB", battery: "4700mAh",
    display: "6.3\"", img: null,
    description: "Google Tensor G4, 50MP dual camera with magic eraser and best take, 4K video, 6.3\" Actua OLED, Gemini AI, 7 years of OS updates, and weather resistance."
  },
  {
    id: 321, name: "Google Pixel 9 Pro Fold", brand: "Google", deviceType: "Foldable",
    price: 179999, originalPrice: 199999, discount: 10, tag: "NEW", available: false,
    rating: 4.7, reviews: 432, ram: "16GB", storage: "256GB", battery: "4650mAh",
    display: "8.0\"", img: null,
    description: "8\" inner foldable OLED + 6.3\" cover screen. Google Tensor G4, 50MP triple camera, 4K video, Gemini AI on inner display, IPX8, and thinnest Pixel Fold ever."
  },
  {
    id: 322, name: "Google Pixel 8a", brand: "Google", deviceType: "Mid-Range",
    price: 52999, originalPrice: 59999, discount: 12, tag: "SALE", available: true,
    rating: 4.6, reviews: 2341, ram: "8GB", storage: "128GB", battery: "4492mAh",
    display: "6.1\"", img: null,
    description: "Google Tensor G3, 64MP dual camera with astrophotography, 6.1\" Actua OLED 120Hz, IP67, 18W charging, Google AI features, and 7 years of software updates."
  },
];

// ── XIAOMI ────────────────────────────────────────────────────────────────────
export const xiaomiPhones = [
  {
    id: 323, name: "Xiaomi 14 Ultra", brand: "Xiaomi", deviceType: "Flagship",
    price: 99999, originalPrice: 109999, discount: 9, tag: "HOT", available: true,
    rating: 4.8, reviews: 876, ram: "16GB", storage: "512GB", battery: "5000mAh",
    display: "6.7\"", img: null,
    description: "Leica 1\" sensor with variable aperture, Snapdragon 8 Gen 3, 4K 120fps video, 90W wired + 80W wireless charging, 6.73\" LTPO AMOLED, and titanium frame."
  },
  {
    id: 324, name: "Xiaomi 14", brand: "Xiaomi", deviceType: "Flagship",
    price: 69999, originalPrice: 79999, discount: 13, tag: "NEW", available: true,
    rating: 4.7, reviews: 1234, ram: "12GB", storage: "256GB", battery: "4610mAh",
    display: "6.4\"", img: null,
    description: "Snapdragon 8 Gen 3, Leica 50MP triple camera, compact 6.36\" LTPO OLED 120Hz, 90W HyperCharge, IP68, and lightweight 193g ceramic or glass body."
  },
  {
    id: 325, name: "Xiaomi Redmi Note 13 Pro+", brand: "Xiaomi", deviceType: "Mid-Range",
    price: 31999, originalPrice: 37999, discount: 16, tag: "SALE", available: true,
    rating: 4.5, reviews: 3456, ram: "8GB", storage: "256GB", battery: "5000mAh",
    display: "6.7\"", img: null,
    description: "200MP main camera, Dimensity 7200 Ultra, 120W HyperCharge (full in 19 min), 6.67\" AMOLED 120Hz, IP68, and Gorilla Glass Victus."
  },
  {
    id: 326, name: "Xiaomi POCO F6 Pro", brand: "Xiaomi", deviceType: "Flagship",
    price: 49999, originalPrice: 59999, discount: 17, tag: "HOT", available: true,
    rating: 4.6, reviews: 1876, ram: "12GB", storage: "256GB", battery: "5000mAh",
    display: "6.7\"", img: null,
    description: "Snapdragon 8 Gen 2, 50MP triple camera, 6.67\" WQHD+ AMOLED 144Hz, 120W HyperCharge, flagship specs at a mid-range price."
  },
  {
    id: 327, name: "Xiaomi Redmi 13C", brand: "Xiaomi", deviceType: "Budget",
    price: 10999, originalPrice: 13999, discount: 21, tag: "SALE", available: true,
    rating: 4.1, reviews: 5432, ram: "4GB", storage: "128GB", battery: "5000mAh",
    display: "6.7\"", img: null,
    description: "MediaTek Helio G85, 50MP AI triple camera, 6.74\" HD+ 90Hz display, 18W charging, side fingerprint sensor, and 3.5mm headphone jack."
  },
];

// ── MOTOROLA ──────────────────────────────────────────────────────────────────
export const motorolaPhones = [
  {
    id: 328, name: "Motorola Edge 50 Pro", brand: "Motorola", deviceType: "Flagship",
    price: 31999, originalPrice: 37999, discount: 16, tag: "HOT", available: true,
    rating: 4.5, reviews: 1234, ram: "12GB", storage: "256GB", battery: "4500mAh",
    display: "6.7\"", img: null,
    description: "Snapdragon 7 Gen 3, 50MP triple camera, 6.7\" pOLED 144Hz, 125W TurboPower charging (full in 32 min), IP68, wireless charging, and stock Android."
  },
  {
    id: 329, name: "Motorola Razr 50 Ultra", brand: "Motorola", deviceType: "Foldable",
    price: 99999, originalPrice: 109999, discount: 9, tag: "NEW", available: true,
    rating: 4.6, reviews: 543, ram: "12GB", storage: "256GB", battery: "3800mAh",
    display: "6.9\"", img: null,
    description: "4\" cover LTPO AMOLED + 6.9\" inner pOLED. Snapdragon 8s Gen 3, 50MP camera, Flex View AI for cover screen, 45W TurboPower, and IPX8 rating."
  },
  {
    id: 330, name: "Motorola Moto G85 5G", brand: "Motorola", deviceType: "Mid-Range",
    price: 17999, originalPrice: 21999, discount: 18, tag: "SALE", available: true,
    rating: 4.3, reviews: 2109, ram: "8GB", storage: "256GB", battery: "5000mAh",
    display: "6.7\"", img: null,
    description: "Snapdragon 6s Gen 3, 50MP OIS camera, 6.67\" pOLED 144Hz, 33W TurboPower, Dolby Atmos stereo speakers, and IP52 splash resistance."
  },
  {
    id: 331, name: "Motorola Moto G34 5G", brand: "Motorola", deviceType: "Budget",
    price: 10999, originalPrice: 13999, discount: 21, tag: "SALE", available: true,
    rating: 4.1, reviews: 3210, ram: "4GB", storage: "128GB", battery: "5000mAh",
    display: "6.5\"", img: null,
    description: "Snapdragon 695, 50MP main camera, 6.5\" IPS LCD 120Hz, 18W charging, 5G connectivity, stock Android 14, and 2 years of OS updates."
  },
];

// ── NOTHING ───────────────────────────────────────────────────────────────────
export const nothingPhones = [
  {
    id: 332, name: "Nothing Phone (2a) Plus", brand: "Nothing", deviceType: "Mid-Range",
    price: 27999, originalPrice: 31999, discount: 13, tag: "NEW", available: true,
    rating: 4.6, reviews: 1098, ram: "12GB", storage: "256GB", battery: "5000mAh",
    display: "6.7\"", img: null,
    description: "Dimensity 7350 Pro, 50MP Sony OIS dual camera, 6.7\" AMOLED 120Hz, 50W charging, iconic Glyph Interface with custom lighting zones, and 3 years of OS updates."
  },
  {
    id: 333, name: "Nothing Phone (2)", brand: "Nothing", deviceType: "Flagship",
    price: 44999, originalPrice: 49999, discount: 10, tag: "SALE", available: true,
    rating: 4.6, reviews: 2134, ram: "12GB", storage: "256GB", battery: "4700mAh",
    display: "6.7\"", img: null,
    description: "Snapdragon 8+ Gen 1, 50MP OIS dual camera, 6.7\" LTPO OLED 120Hz, 45W charging, advanced Glyph Interface, IP54, and transparent glass back design."
  },
];

// ── VIVO ──────────────────────────────────────────────────────────────────────
export const vivoPhones = [
  {
    id: 334, name: "Vivo X100 Pro", brand: "Vivo", deviceType: "Flagship",
    price: 89999, originalPrice: 99999, discount: 10, tag: "HOT", available: true,
    rating: 4.7, reviews: 765, ram: "16GB", storage: "256GB", battery: "5400mAh",
    display: "6.8\"", img: null,
    description: "ZEISS 50MP 1\" sensor with periscope zoom, Dimensity 9300, 4K 60fps video, 6.78\" AMOLED 120Hz, 100W FlashCharge + 50W wireless, IP68."
  },
  {
    id: 335, name: "Vivo V30 Pro", brand: "Vivo", deviceType: "Mid-Range",
    price: 39999, originalPrice: 46999, discount: 15, tag: "NEW", available: true,
    rating: 4.5, reviews: 1123, ram: "12GB", storage: "256GB", battery: "5000mAh",
    display: "6.8\"", img: null,
    description: "ZEISS 50MP dual front cameras, Snapdragon 7 Gen 3, 6.78\" curved AMOLED 120Hz, 80W FlashCharge, IP64, and 5000mAh battery with wireless charging."
  },
  {
    id: 336, name: "Vivo Y200 5G", brand: "Vivo", deviceType: "Budget",
    price: 22999, originalPrice: 26999, discount: 15, tag: "SALE", available: true,
    rating: 4.2, reviews: 1876, ram: "8GB", storage: "128GB", battery: "5000mAh",
    display: "6.7\"", img: null,
    description: "Snapdragon 695, 64MP OIS main camera, 6.67\" AMOLED 120Hz, 44W FlashCharge, 5G connectivity, and a slim 7.79mm profile."
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// READY-TO-USE DATA OBJECTS (pass directly as `data` prop)
// ─────────────────────────────────────────────────────────────────────────────

// All phones (all brands combined)
export const phonesData = buildPhonesData(
  [...applePhones, ...samsungPhones, ...onePlusPhones, ...googlePhones,
   ...xiaomiPhones, ...motorolaPhones, ...nothingPhones, ...vivoPhones],
  "Phones"
);

// Single-brand pages
export const applePhoneData    = buildPhonesData(applePhones,    "Apple iPhones");
export const samsungPhoneData  = buildPhonesData(samsungPhones,  "Samsung Phones");
export const onePlugPhoneData  = buildPhonesData(onePlusPhones,  "OnePlus Phones");
export const googlePhoneData   = buildPhonesData(googlePhones,   "Google Pixel Phones");
export const xiaomiPhoneData   = buildPhonesData(xiaomiPhones,   "Xiaomi Phones");
export const motorolaPhoneData = buildPhonesData(motorolaPhones, "Motorola Phones");
export const nothingPhoneData  = buildPhonesData(nothingPhones,  "Nothing Phones");
export const vivoPhoneData     = buildPhonesData(vivoPhones,     "Vivo Phones");