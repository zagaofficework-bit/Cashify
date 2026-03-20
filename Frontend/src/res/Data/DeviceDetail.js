// ─────────────────────────────────────────────────────────────────────────────
// deviceData.js
//
// Contains hardcoded demo data for every device category.
// When you connect a real backend, replace each category's `devices`,
// `filterConfig`, and `priceRange` with API responses.
//
// Usage:
//   import { phonesData, laptopsData, camerasData, speakersData, consolesData } from "./deviceData";
//   <SearchByModel {...phonesData} />
// ─────────────────────────────────────────────────────────────────────────────

// ── PHONES ───────────────────────────────────────────────────────────────────
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
    { id: 1, name: "Apple iPhone 17e", brand: "Apple", deviceType: "Flagship", price: 64900, originalPrice: 72900, discount: 11, tag: "NEW", available: true, rating: 4.8, reviews: 342, ram: "8GB", storage: "128GB", battery: "3500mAh", img: null, description: "A16 Bionic chip delivers console-class performance in a 6.1\" OLED frame. Features Dynamic Island, 48MP main camera with next-gen computational photography, and USB-C connectivity." },
    { id: 2, name: "Samsung Galaxy S26", brand: "Samsung", deviceType: "Flagship", price: 87999, originalPrice: 99999, discount: 12, tag: "HOT", available: true, rating: 4.6, reviews: 215, ram: "12GB", storage: "256GB", battery: "5000mAh", img: null, description: "Snapdragon 8 Elite powers a 200MP camera system with adaptive pixel technology. 6.8\" Dynamic AMOLED 2X display, IP68 water resistance, and Galaxy AI built right in." },
    { id: 3, name: "OnePlus 14 Pro", brand: "OnePlus", deviceType: "Flagship", price: 72999, originalPrice: 79999, discount: 9, tag: "NEW", available: false, rating: 4.5, reviews: 189, ram: "12GB", storage: "256GB", battery: "5500mAh", img: null, description: "Hasselblad-tuned triple camera with periscope zoom. 100W SuperVOOC charges from 0–100% in 23 minutes. Ceramic back and Snapdragon 8 Gen 4." },
    { id: 4, name: "Google Pixel 9 Pro", brand: "Google", deviceType: "Flagship", price: 99999, originalPrice: 109999, discount: 9, tag: "SALE", available: true, rating: 4.7, reviews: 267, ram: "12GB", storage: "128GB", battery: "4700mAh", img: null, description: "Google Tensor G4 chip with the most advanced on-device AI. Best-in-class night photography, 7-year OS updates, and real-time call translation built in." },
    { id: 5, name: "Xiaomi 15 Ultra", brand: "Xiaomi", deviceType: "Flagship", price: 59999, originalPrice: 64999, discount: 8, tag: "NEW", available: true, rating: 4.4, reviews: 156, ram: "16GB", storage: "512GB", battery: "5300mAh", img: null, description: "Leica-designed 1\" periscope sensor captures light like no other. 90W wireless charging, HyperOS 2, IP68 rating, and a 6.73\" LTPO AMOLED display." },
    { id: 6, name: "Motorola Moto G85", brand: "Motorola", deviceType: "Mid-Range", price: 17999, originalPrice: 21999, discount: 18, tag: "SALE", available: true, rating: 4.2, reviews: 412, ram: "8GB", storage: "256GB", battery: "5000mAh", img: null, description: "6.67\" pOLED at 144Hz with Dolby Vision support. 50MP OIS main camera, 33W TurboPower fast charging, and Dolby Atmos stereo speakers at a mid-range price." },
  ],
};

// ── LAPTOPS ──────────────────────────────────────────────────────────────────
export const laptopsData = {
  pageTitle: "Laptops",
  priceRange: { min: 0, max: 500000, step: 5000 },
  filterConfig: [
    { key: "brand",        label: "Brand",        type: "checkbox", options: ["Apple", "Dell", "HP", "Lenovo", "Asus", "Acer", "Microsoft"] },
    { key: "deviceType",   label: "Type",         type: "checkbox", options: ["Ultrabook", "Gaming", "Business", "Budget", "Chromebook", "Refurbished"] },
    { key: "availability", label: "Availability", type: "checkbox", options: ["In Stock", "Out of Stock", "Pre-order"] },
    { key: "ram",          label: "RAM",          type: "pill",     options: ["8GB", "16GB", "32GB", "64GB"] },
    { key: "storage",      label: "Storage",      type: "pill",     options: ["256GB SSD", "512GB SSD", "1TB SSD", "2TB SSD"] },
    { key: "processor",    label: "Processor",    type: "checkbox", options: ["Intel Core i5", "Intel Core i7", "Intel Core i9", "AMD Ryzen 5", "AMD Ryzen 7", "Apple M3", "Apple M4"] },
    { key: "display",      label: "Display Size", type: "checkbox", options: ["13\"", "14\"", "15.6\"", "16\"", "17\""] },
  ],
  devices: [
    { id: 1, name: "Apple MacBook Pro 14\" M4", brand: "Apple", deviceType: "Ultrabook", price: 199900, originalPrice: 219900, discount: 9, tag: "NEW", available: true, rating: 4.9, reviews: 534, ram: "16GB", storage: "512GB SSD", processor: "Apple M4", display: "14\"", img: null, description: "M4 chip with 10-core CPU and 10-core GPU. Liquid Retina XDR display with ProMotion, up to 22-hour battery life, MagSafe 3 charging, and Thunderbolt 4 ports." },
    { id: 2, name: "Dell XPS 15 9530", brand: "Dell", deviceType: "Ultrabook", price: 149999, originalPrice: 169999, discount: 12, tag: "HOT", available: true, rating: 4.6, reviews: 287, ram: "16GB", storage: "512GB SSD", processor: "Intel Core i7", display: "15.6\"", img: null, description: "Stunning 3.5K OLED touch display with RTX 4060 graphics. InfinityEdge design, 6-speaker Waves MaxxAudio system, and premium CNC aluminum chassis." },
    { id: 3, name: "ASUS ROG Zephyrus G16", brand: "Asus", deviceType: "Gaming", price: 189999, originalPrice: 209999, discount: 10, tag: "NEW", available: true, rating: 4.7, reviews: 198, ram: "32GB", storage: "1TB SSD", processor: "AMD Ryzen 7", display: "16\"", img: null, description: "RTX 4080 Laptop GPU with 240Hz QHD+ OLED display. AMD Ryzen 9 processor, MUX Switch for pure GPU rendering, and whisper-quiet thermals." },
    { id: 4, name: "Lenovo ThinkPad X1 Carbon", brand: "Lenovo", deviceType: "Business", price: 139999, originalPrice: 154999, discount: 10, tag: "SALE", available: true, rating: 4.5, reviews: 321, ram: "16GB", storage: "512GB SSD", processor: "Intel Core i7", display: "14\"", img: null, description: "MIL-SPEC durability in a 2.48 lb ultra-light chassis. Best-in-class TrackPoint keyboard, 57Whr battery, and enterprise-grade security features." },
    { id: 5, name: "HP Spectre x360 14", brand: "HP", deviceType: "Ultrabook", price: 129999, originalPrice: 144999, discount: 10, tag: "NEW", available: true, rating: 4.4, reviews: 176, ram: "16GB", storage: "1TB SSD", processor: "Intel Core i7", display: "14\"", img: null, description: "2-in-1 convertible with OLED touch display. Intel Evo certified, gem-cut design, 17-hour battery, and HP Privacy Camera with built-in kill switch." },
    { id: 6, name: "Acer Aspire 5", brand: "Acer", deviceType: "Budget", price: 44999, originalPrice: 52999, discount: 15, tag: "SALE", available: true, rating: 4.1, reviews: 892, ram: "8GB", storage: "512GB SSD", processor: "AMD Ryzen 5", display: "15.6\"", img: null, description: "Everyday performance with AMD Ryzen 5, Full HD IPS display, fast WiFi 6, and upgradeable RAM. Reliable, no-frills laptop for students and professionals." },
  ],
};

// ── CAMERAS ──────────────────────────────────────────────────────────────────
export const camerasData = {
  pageTitle: "Cameras",
  priceRange: { min: 0, max: 600000, step: 5000 },
  filterConfig: [
    { key: "brand",        label: "Brand",        type: "checkbox", options: ["Sony", "Canon", "Nikon", "Fujifilm", "Panasonic", "GoPro"] },
    { key: "deviceType",   label: "Type",         type: "checkbox", options: ["DSLR", "Mirrorless", "Point & Shoot", "Action Camera", "Instant Camera", "Refurbished"] },
    { key: "availability", label: "Availability", type: "checkbox", options: ["In Stock", "Out of Stock", "Pre-order"] },
    { key: "megapixels",   label: "Megapixels",   type: "pill",     options: ["12MP", "20MP", "24MP", "33MP", "45MP", "61MP+"] },
    { key: "sensor",       label: "Sensor Type",  type: "checkbox", options: ["Full Frame", "APS-C", "Micro 4/3", "1-inch", "Compact"] },
    { key: "video",        label: "Video",        type: "pill",     options: ["1080p", "4K", "6K", "8K"] },
  ],
  devices: [
    { id: 1, name: "Sony Alpha A7R V", brand: "Sony", deviceType: "Mirrorless", price: 339990, originalPrice: 369990, discount: 8, tag: "HOT", available: true, rating: 4.9, reviews: 145, megapixels: "61MP+", sensor: "Full Frame", video: "8K", img: null, description: "61MP BSI-CMOS sensor with 8K video and AI-powered subject recognition. Dual CFexpress Type A/SD slots, 5-axis IBIS, and 9.44M-dot EVF for professional imagery." },
    { id: 2, name: "Canon EOS R6 Mark III", brand: "Canon", deviceType: "Mirrorless", price: 249990, originalPrice: 274990, discount: 9, tag: "NEW", available: true, rating: 4.8, reviews: 203, megapixels: "24MP", sensor: "Full Frame", video: "6K", img: null, description: "24MP full-frame with 6K RAW video recording. 8-stop IBIS, 40fps burst shooting, Dual Pixel CMOS AF II covering 100% of frame." },
    { id: 3, name: "Fujifilm X-T5", brand: "Fujifilm", deviceType: "Mirrorless", price: 164990, originalPrice: 179990, discount: 8, tag: "SALE", available: true, rating: 4.7, reviews: 389, megapixels: "45MP", sensor: "APS-C", video: "6K", img: null, description: "40MP X-Trans CMOS 5 HR sensor with iconic retro design. 20 film simulations, 5-axis IBIS, weather-sealed body, and compact form factor." },
    { id: 4, name: "Nikon Z8", brand: "Nikon", deviceType: "Mirrorless", price: 299990, originalPrice: 334990, discount: 10, tag: "HOT", available: true, rating: 4.8, reviews: 167, megapixels: "45MP", sensor: "Full Frame", video: "8K", img: null, description: "45.7MP BSI stacked CMOS with 8K60 RAW video. 20fps blackout-free shooting, subject detection AF, and Z-mount ecosystem compatibility." },
    { id: 5, name: "GoPro Hero 13 Black", brand: "GoPro", deviceType: "Action Camera", price: 44999, originalPrice: 52999, discount: 15, tag: "NEW", available: true, rating: 4.6, reviews: 892, megapixels: "24MP", sensor: "1-inch", video: "4K", img: null, description: "5.3K60 video with HyperSmooth 7.0 stabilization. 27MP stills, Enduro battery for extreme conditions, magnetic mounting system, and waterproof to 10m." },
    { id: 6, name: "Canon EOS 850D", brand: "Canon", deviceType: "DSLR", price: 69990, originalPrice: 79990, discount: 13, tag: "SALE", available: true, rating: 4.3, reviews: 445, megapixels: "24MP", sensor: "APS-C", video: "4K", img: null, description: "24.1MP APS-C sensor DSLR with 4K video and Dual Pixel CMOS AF. Optical viewfinder, 7fps burst, and EF/EF-S lens compatibility for beginners to enthusiasts." },
  ],
};

// ── SPEAKERS ─────────────────────────────────────────────────────────────────
export const speakersData = {
  pageTitle: "Speakers",
  priceRange: { min: 0, max: 150000, step: 500 },
  filterConfig: [
    { key: "brand",        label: "Brand",        type: "checkbox", options: ["Sony", "JBL", "Bose", "Marshall", "Harman Kardon", "Sonos", "Apple", "Amazon"] },
    { key: "deviceType",   label: "Type",         type: "checkbox", options: ["Bluetooth", "Portable", "Smart Speaker", "Soundbar", "Home Theatre", "Refurbished"] },
    { key: "availability", label: "Availability", type: "checkbox", options: ["In Stock", "Out of Stock", "Pre-order"] },
    { key: "connectivity", label: "Connectivity", type: "pill",     options: ["Bluetooth 5.0+", "Wi-Fi", "NFC", "AUX", "USB-C"] },
    { key: "battery",      label: "Battery Life", type: "checkbox", options: ["Up to 10 hrs", "10–20 hrs", "20+ hrs", "Wired"] },
    { key: "waterproof",   label: "Waterproof",   type: "pill",     options: ["IPX4", "IPX5", "IPX7", "IP67", "IP68"] },
  ],
  devices: [
    { id: 1, name: "Bose SoundLink Max", brand: "Bose", deviceType: "Portable", price: 39999, originalPrice: 44999, discount: 11, tag: "NEW", available: true, rating: 4.8, reviews: 234, connectivity: "Bluetooth 5.0+", battery: "20+ hrs", waterproof: "IP67", img: null, description: "360° immersive sound with Bose's signature deep bass. 20-hour playtime, IP67 dust and water resistance, wireless charging, and premium woven fabric design." },
    { id: 2, name: "JBL Xtreme 4", brand: "JBL", deviceType: "Portable", price: 22999, originalPrice: 26999, discount: 15, tag: "HOT", available: true, rating: 4.6, reviews: 567, connectivity: "Bluetooth 5.0+", battery: "20+ hrs", waterproof: "IP67", img: null, description: "Powerful bass with dual passive radiators and 24-hour playtime. IP67 waterproof, USB-C charging, PartyBoost for multi-speaker sync, and shoulder strap included." },
    { id: 3, name: "Apple HomePod 2nd Gen", brand: "Apple", deviceType: "Smart Speaker", price: 32900, originalPrice: 32900, discount: 0, tag: "NEW", available: true, rating: 4.5, reviews: 312, connectivity: "Wi-Fi", battery: "Wired", waterproof: "IPX4", img: null, description: "S9 chip delivers breakthrough Spatial Audio with room sensing. Deep Siri integration, Home hub functionality, Matter support, and seamless Apple ecosystem handoff." },
    { id: 4, name: "Marshall Emberton III", brand: "Marshall", deviceType: "Portable", price: 14999, originalPrice: 17999, discount: 17, tag: "SALE", available: true, rating: 4.7, reviews: 445, connectivity: "Bluetooth 5.0+", battery: "20+ hrs", waterproof: "IP67", img: null, description: "Iconic rock-inspired design with 30-hour battery life. IP67 waterproof, 360° immersive sound field, Bluetooth 5.3 with multi-point connection." },
    { id: 5, name: "Sony HT-S40R Soundbar", brand: "Sony", deviceType: "Soundbar", price: 27999, originalPrice: 34999, discount: 20, tag: "SALE", available: true, rating: 4.4, reviews: 198, connectivity: "Bluetooth 5.0+", battery: "Wired", waterproof: "IPX4", img: null, description: "5.1ch real surround with wireless rear speakers. 600W total output, S-Force PRO Front Surround, HDMI ARC, and Dolby Digital / DTS support." },
    { id: 6, name: "Harman Kardon Onyx 8", brand: "Harman Kardon", deviceType: "Bluetooth", price: 34999, originalPrice: 41999, discount: 17, tag: "HOT", available: false, rating: 4.5, reviews: 156, connectivity: "Bluetooth 5.0+", battery: "10–20 hrs", waterproof: "IPX4", img: null, description: "Stunning backlit ring design with multi-host Bluetooth. 8-hour playtime, dual passive radiators for room-filling bass, and USB-C fast charging." },
  ],
};

// ── GAMING CONSOLES ───────────────────────────────────────────────────────────
export const consolesData = {
  pageTitle: "Gaming Consoles",
  priceRange: { min: 0, max: 100000, step: 500 },
  filterConfig: [
    { key: "brand",        label: "Brand",        type: "checkbox", options: ["Sony", "Microsoft", "Nintendo", "Valve", "Asus"] },
    { key: "deviceType",   label: "Type",         type: "checkbox", options: ["Home Console", "Handheld", "Hybrid", "Cloud Gaming", "Refurbished"] },
    { key: "availability", label: "Availability", type: "checkbox", options: ["In Stock", "Out of Stock", "Pre-order"] },
    { key: "storage",      label: "Storage",      type: "pill",     options: ["256GB", "512GB", "1TB", "2TB"] },
    { key: "resolution",   label: "Resolution",   type: "pill",     options: ["1080p", "1440p", "4K", "8K"] },
    { key: "connectivity", label: "Connectivity", type: "checkbox", options: ["Wi-Fi 6", "Wi-Fi 6E", "Ethernet", "Bluetooth 5.1+"] },
  ],
  devices: [
    { id: 1, name: "Sony PlayStation 5 Pro", brand: "Sony", deviceType: "Home Console", price: 62990, originalPrice: 69990, discount: 10, tag: "HOT", available: true, rating: 4.9, reviews: 1243, storage: "2TB", resolution: "8K", connectivity: "Wi-Fi 6E", img: null, description: "PlayStation Spectral Super Resolution upscaling for near-8K visuals. Custom AMD GPU with 33.5 TFLOPS, PlayStation 5's DualSense haptics, and 2TB NVMe SSD." },
    { id: 2, name: "Microsoft Xbox Series X", brand: "Microsoft", deviceType: "Home Console", price: 54990, originalPrice: 59990, discount: 8, tag: "NEW", available: true, rating: 4.7, reviews: 876, storage: "1TB", resolution: "4K", connectivity: "Wi-Fi 6", img: null, description: "12 TFLOPS GPU for true 4K gaming at 60fps. Xbox Velocity Architecture with DirectStorage, Quick Resume for multiple games, and Game Pass integration." },
    { id: 3, name: "Nintendo Switch 2", brand: "Nintendo", deviceType: "Hybrid", price: 34990, originalPrice: 39990, discount: 13, tag: "NEW", available: false, rating: 4.8, reviews: 2341, storage: "256GB", resolution: "1080p", connectivity: "Wi-Fi 6", img: null, description: "Play at home on TV or take it anywhere. Upgraded OLED display, magnetic Joy-Con controllers, mouse functionality, and backwards compatibility with Switch library." },
    { id: 4, name: "Valve Steam Deck OLED", brand: "Valve", deviceType: "Handheld", price: 44990, originalPrice: 49990, discount: 10, tag: "SALE", available: true, rating: 4.7, reviews: 654, storage: "512GB", resolution: "1440p", connectivity: "Bluetooth 5.1+", img: null, description: "7.4\" HDR OLED display with 1000 nit peak brightness. AMD APU, 50Whr battery for 12-hour sessions, and full access to your Steam library." },
    { id: 5, name: "Sony PlayStation 5 Slim", brand: "Sony", deviceType: "Home Console", price: 44990, originalPrice: 49990, discount: 10, tag: "SALE", available: true, rating: 4.6, reviews: 987, storage: "1TB", resolution: "4K", connectivity: "Wi-Fi 6", img: null, description: "30% slimmer than the original PS5 with detachable disc drive. 825GB expandable SSD, DualSense wireless controller, and full PS5 game library support." },
    { id: 6, name: "Asus ROG Ally X", brand: "Asus", deviceType: "Handheld", price: 79990, originalPrice: 89990, discount: 11, tag: "HOT", available: true, rating: 4.5, reviews: 312, storage: "1TB", resolution: "1080p", connectivity: "Wi-Fi 6E", img: null, description: "AMD Ryzen Z1 Extreme with 24GB LPDDR5X RAM. 7\" 120Hz FHD display, 80Whr battery, ROG XG Mobile eGPU support, and Windows 11 for full game compatibility." },
  ],
};