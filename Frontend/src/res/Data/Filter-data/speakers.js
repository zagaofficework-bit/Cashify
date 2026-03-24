// ─────────────────────────────────────────────────────────────────────────────
// SpeakerDetail.js
//
// All speaker data is split into per-brand arrays.
// You can pass a single brand, multiple brands, or all brands to the Filter component.
//
// Usage examples:
//
//   // All speakers
//   import { speakersData } from "./SpeakerDetail";
//   <Filter data={speakersData} />
//
//   // Only JBL speakers
//   import { jblSpeakersData } from "./SpeakerDetail";
//   <Filter data={jblSpeakersData} />
//
//   // JBL + Bose
//   import { buildSpeakersData, jblSpeakers, boseSpeakers } from "./SpeakerDetail";
//   <Filter data={buildSpeakersData([...jblSpeakers, ...boseSpeakers])} />
// ─────────────────────────────────────────────────────────────────────────────

// ── Shared filterConfig & priceRange for all speaker pages ────────────────────
const speakersFilterConfig = [
  { key: "brand",        label: "Brand",        type: "checkbox", options: ["JBL", "Bose", "Sony", "Marshall", "Harman Kardon", "Apple"] },
  { key: "deviceType",   label: "Type",         type: "checkbox", options: ["Portable", "Soundbar", "Home Theater", "Smart Speaker", "Party Speaker"] },
  { key: "availability", label: "Availability", type: "checkbox", options: ["In Stock", "Out of Stock", "Pre-order"] },
  { key: "battery",      label: "Battery Life", type: "pill",     options: ["6–10 hrs", "12–15 hrs", "20–24 hrs", "30+ hrs", "Wired"] },
  { key: "waterproof",   label: "Waterproof",   type: "pill",     options: ["IPX4", "IPX5", "IP67", "IP68", "None"] },
  { key: "connectivity", label: "Connectivity", type: "checkbox", options: ["Bluetooth 5.0", "Bluetooth 5.3", "Wi-Fi", "AUX", "USB-C"] },
  { key: "channels",     label: "Channels",     type: "checkbox", options: ["Mono", "Stereo", "2.1", "3.1.2", "5.1", "7.1.4"] },
];

const speakersPriceRange = { min: 0, max: 150000, step: 500 };

// ── Helper: build a speakersData object from any device array ─────────────────
export const buildSpeakersData = (devices, pageTitle = "Speakers") => ({
  pageTitle,
  priceRange: speakersPriceRange,
  filterConfig: speakersFilterConfig,
  devices,
});

// ─────────────────────────────────────────────────────────────────────────────
// PER-BRAND DEVICE ARRAYS
// ─────────────────────────────────────────────────────────────────────────────

// ── JBL ───────────────────────────────────────────────────────────────────────
export const jblSpeakers = [
  {
    id: 701, name: "JBL Charge 5", brand: "JBL", deviceType: "Portable",
    price: 14999, originalPrice: 18999, discount: 21, tag: "HOT", available: true,
    rating: 4.7, reviews: 8765, battery: "20–24 hrs", waterproof: "IP67",
    connectivity: "Bluetooth 5.1", channels: "Stereo", img: null,
    description: "20-hour playtime with built-in USB power bank. IP67 waterproof, PartyBoost multi-speaker pairing, bold JBL Pro Sound, and full-range drivers with radiators."
  },
  {
    id: 702, name: "JBL Xtreme 4", brand: "JBL", deviceType: "Portable",
    price: 22999, originalPrice: 27999, discount: 18, tag: "NEW", available: true,
    rating: 4.8, reviews: 3456, battery: "20–24 hrs", waterproof: "IP67",
    connectivity: "Bluetooth 5.3", channels: "Stereo", img: null,
    description: "24-hour playtime with detachable shoulder strap. IP67, 4 transducers, built-in USB charger, PartyBoost pairing, and deep bass for outdoor adventures."
  },
  {
    id: 703, name: "JBL Flip 7", brand: "JBL", deviceType: "Portable",
    price: 12999, originalPrice: 15999, discount: 19, tag: "NEW", available: true,
    rating: 4.6, reviews: 6543, battery: "12–15 hrs", waterproof: "IP67",
    connectivity: "Bluetooth 5.3", channels: "Stereo", img: null,
    description: "12-hour playtime, AI-powered EQ adapts to surroundings. IP67 waterproof, dual radiators for punchy bass, PartyBoost, USB-C charging, and fabric + rubber design."
  },
  {
    id: 704, name: "JBL Bar 1300", brand: "JBL", deviceType: "Soundbar",
    price: 99999, originalPrice: 119999, discount: 17, tag: "HOT", available: true,
    rating: 4.7, reviews: 876, battery: "Wired", waterproof: "None",
    connectivity: "Wi-Fi", channels: "11.1.4", img: null,
    description: "11.1.4 Dolby Atmos and DTS:X soundbar with detachable surround speakers. 1170W total power, MultiBeam surround sound, AirPlay 2, Alexa/Google Assistant, and 4K HDMI eARC."
  },
  {
    id: 705, name: "JBL PartyBox 710", brand: "JBL", deviceType: "Party Speaker",
    price: 69999, originalPrice: 79999, discount: 13, tag: "HOT", available: true,
    rating: 4.7, reviews: 1234, battery: "12–15 hrs", waterproof: "IPX4",
    connectivity: "Bluetooth 5.1", channels: "Stereo", img: null,
    description: "800W party speaker with light shows synced to music. IPX4 splashproof, guitar and mic inputs, wired DJ support, PartyBoost pairing, and JBL Original Pro Sound."
  },
  {
    id: 706, name: "JBL Go 4", brand: "JBL", deviceType: "Portable",
    price: 3499, originalPrice: 4999, discount: 30, tag: "SALE", available: true,
    rating: 4.4, reviews: 12345, battery: "6–10 hrs", waterproof: "IP67",
    connectivity: "Bluetooth 5.3", channels: "Mono", img: null,
    description: "Ultraportable IP67 waterproof speaker fits in your pocket. 7-hour playtime, USB-C charging, bold JBL sound, and carabiner clip for on-the-go listening."
  },
];

// ── BOSE ──────────────────────────────────────────────────────────────────────
export const boseSpeakers = [
  {
    id: 707, name: "Bose SoundLink Max", brand: "Bose", deviceType: "Portable",
    price: 39999, originalPrice: 44999, discount: 11, tag: "NEW", available: true,
    rating: 4.8, reviews: 2345, battery: "20–24 hrs", waterproof: "IP67",
    connectivity: "Bluetooth 5.3", channels: "Stereo", img: null,
    description: "20-hour battery with premium fabric and aluminum design. IP67, USB-C passthrough charging for devices, Bose immersive audio, and Party Mode for pairing speakers."
  },
  {
    id: 708, name: "Bose SoundLink Flex 2", brand: "Bose", deviceType: "Portable",
    price: 14999, originalPrice: 17999, discount: 17, tag: "HOT", available: true,
    rating: 4.7, reviews: 4321, battery: "12–15 hrs", waterproof: "IP67",
    connectivity: "Bluetooth 5.3", channels: "Mono", img: null,
    description: "PositionIQ technology auto-optimizes sound. Floats in water, IP67, 12-hour battery, 360° sound modes, USB-C, and Bose SimpleSync for pairing multiple speakers."
  },
  {
    id: 709, name: "Bose Smart Soundbar 900", brand: "Bose", deviceType: "Soundbar",
    price: 99999, originalPrice: 109999, discount: 9, tag: "HOT", available: true,
    rating: 4.7, reviews: 1234, battery: "Wired", waterproof: "None",
    connectivity: "Wi-Fi", channels: "5.1", img: null,
    description: "Dolby Atmos with PhaseGuide beam steering technology. TrueSpace upmixing, AirPlay 2, Spotify Connect, Alexa and Google built-in, HDMI eARC, and Bose Music app."
  },
  {
    id: 710, name: "Bose Smart Speaker 500", brand: "Bose", deviceType: "Smart Speaker",
    price: 37999, originalPrice: 44999, discount: 16, tag: "SALE", available: true,
    rating: 4.6, reviews: 2109, battery: "Wired", waterproof: "None",
    connectivity: "Wi-Fi", channels: "Stereo", img: null,
    description: "Wide stereo sound, voice control with Alexa and Google, AirPlay 2, Bose app with EQ, Bluetooth backup, and premium aluminum design for home audio."
  },
  {
    id: 711, name: "Bose SoundLink Mini 3", brand: "Bose", deviceType: "Portable",
    price: 19999, originalPrice: 23999, discount: 17, tag: "NEW", available: true,
    rating: 4.6, reviews: 5678, battery: "12–15 hrs", waterproof: "IPX4",
    connectivity: "Bluetooth 5.3", channels: "Stereo", img: null,
    description: "Compact powerhouse with 360° sound. IPX4 splashproof, 12-hour battery, USB-C, voice prompts, Bose SimpleSync pairing, and signature aluminum cylinder design."
  },
];

// ── SONY ──────────────────────────────────────────────────────────────────────
export const sonySpeakers = [
  {
    id: 712, name: "Sony SRS-XB100", brand: "Sony", deviceType: "Portable",
    price: 3999, originalPrice: 5999, discount: 33, tag: "SALE", available: true,
    rating: 4.3, reviews: 9876, battery: "12–15 hrs", waterproof: "IP67",
    connectivity: "Bluetooth 5.3", channels: "Mono", img: null,
    description: "Compact ultraportable IP67 waterproof and dustproof. 16-hour battery, Clear Audio Plus, fabric strap for hanging, hands-free calling, USB-C charging."
  },
  {
    id: 713, name: "Sony SRS-XG500", brand: "Sony", deviceType: "Party Speaker",
    price: 34999, originalPrice: 39999, discount: 13, tag: "HOT", available: true,
    rating: 4.6, reviews: 2345, battery: "30+ hrs", waterproof: "IP66",
    connectivity: "Bluetooth 5.0", channels: "Stereo", img: null,
    description: "30-hour battery and guitar/mic inputs for live performance. MEGA BASS, light modes, Ambient Sound Mode, 30W continuous power, and party connect for 100 speakers."
  },
  {
    id: 714, name: "Sony HT-A7000", brand: "Sony", deviceType: "Soundbar",
    price: 119999, originalPrice: 134999, discount: 11, tag: "NEW", available: true,
    rating: 4.8, reviews: 876, battery: "Wired", waterproof: "None",
    connectivity: "Wi-Fi", channels: "7.1.2", img: null,
    description: "7.1.2ch Dolby Atmos soundbar with built-in 360 Spatial Sound Mapping. 500W, S-Force PRO front surround, AirPlay 2, Chromecast, Spotify Connect, and HDMI eARC."
  },
  {
    id: 715, name: "Sony SRS-XB43", brand: "Sony", deviceType: "Portable",
    price: 14999, originalPrice: 19999, discount: 25, tag: "SALE", available: true,
    rating: 4.5, reviews: 5432, battery: "20–24 hrs", waterproof: "IP67",
    connectivity: "Bluetooth 5.0", channels: "Stereo", img: null,
    description: "24-hour battery, IP67, EXTRA BASS with live sound effect, party connect for 100 speakers, built-in lighting, mic and guitar inputs, and USB-A pass-through charging."
  },
];

// ── MARSHALL ──────────────────────────────────────────────────────────────────
export const marshallSpeakers = [
  {
    id: 716, name: "Marshall Emberton III", brand: "Marshall", deviceType: "Portable",
    price: 14999, originalPrice: 17999, discount: 17, tag: "HOT", available: true,
    rating: 4.7, reviews: 3456, battery: "30+ hrs", waterproof: "IP67",
    connectivity: "Bluetooth 5.3", channels: "Stereo", img: null,
    description: "30-hour battery in iconic Marshall design. IP67 waterproof, 360° sound, True Wireless Stereo pairing, custom EQ in Marshall Bluetooth app, and USB-C charging."
  },
  {
    id: 717, name: "Marshall Stanmore III", brand: "Marshall", deviceType: "Home Theater",
    price: 39999, originalPrice: 44999, discount: 11, tag: "HOT", available: true,
    rating: 4.7, reviews: 1876, battery: "Wired", waterproof: "None",
    connectivity: "Wi-Fi", channels: "Stereo", img: null,
    description: "Home Bluetooth speaker with iconic Marshall look. AirPlay 2, Alexa built-in, custom bass and treble knobs, multi-host for two-device sharing, and Marshall app EQ."
  },
  {
    id: 718, name: "Marshall Kilburn III", brand: "Marshall", deviceType: "Portable",
    price: 24999, originalPrice: 29999, discount: 17, tag: "NEW", available: true,
    rating: 4.6, reviews: 2109, battery: "20–24 hrs", waterproof: "IPX2",
    connectivity: "Bluetooth 5.3", channels: "Stereo", img: null,
    description: "20-hour battery, bass and treble controls, True Wireless Stereo pairing, 3.5mm AUX in, USB-C charging, and the signature Marshall leather-textured design."
  },
  {
    id: 719, name: "Marshall Acton III", brand: "Marshall", deviceType: "Home Theater",
    price: 29999, originalPrice: 34999, discount: 14, tag: "SALE", available: true,
    rating: 4.6, reviews: 1543, battery: "Wired", waterproof: "None",
    connectivity: "Bluetooth 5.2", channels: "Stereo", img: null,
    description: "Powerful home speaker with analog tone controls and phono input. Bluetooth multi-host, 3.5mm AUX, RCA input for vinyl, and classic Marshall speaker grille design."
  },
];

// ── HARMAN KARDON ─────────────────────────────────────────────────────────────
export const harmanSpeakers = [
  {
    id: 720, name: "Harman Kardon Onyx Studio 8", brand: "Harman Kardon", deviceType: "Portable",
    price: 24999, originalPrice: 29999, discount: 17, tag: "HOT", available: true,
    rating: 4.6, reviews: 2345, battery: "6–10 hrs", waterproof: "IPX5",
    connectivity: "Bluetooth 5.0", channels: "Stereo", img: null,
    description: "8-hour playtime with premium transparent design. IPX5 splashproof, 50W output, dual passive radiators for deep bass, and Party Mode pairing for two devices."
  },
  {
    id: 721, name: "Harman Kardon Citation One MK3", brand: "Harman Kardon", deviceType: "Smart Speaker",
    price: 19999, originalPrice: 24999, discount: 20, tag: "SALE", available: true,
    rating: 4.5, reviews: 1234, battery: "Wired", waterproof: "None",
    connectivity: "Wi-Fi", channels: "Mono", img: null,
    description: "360° sound with Google Assistant built-in. Premium fabric finish, Chromecast built-in, AirPlay 2, Spotify Connect, and seamless multi-room audio setup."
  },
  {
    id: 722, name: "Harman Kardon Aura Studio 4", brand: "Harman Kardon", deviceType: "Home Theater",
    price: 34999, originalPrice: 39999, discount: 13, tag: "NEW", available: true,
    rating: 4.6, reviews: 876, battery: "Wired", waterproof: "None",
    connectivity: "Bluetooth 5.0", channels: "Stereo", img: null,
    description: "360° omnidirectional sound with LED ambient lighting. 100W total output, dome design with bass radiator, dual device pairing, and AUX input."
  },
];

// ── APPLE ─────────────────────────────────────────────────────────────────────
export const appleSpeakers = [
  {
    id: 723, name: "Apple HomePod (2nd Gen)", brand: "Apple", deviceType: "Smart Speaker",
    price: 32900, originalPrice: 36900, discount: 11, tag: "NEW", available: true,
    rating: 4.7, reviews: 2345, battery: "Wired", waterproof: "None",
    connectivity: "Wi-Fi", channels: "Stereo", img: null,
    description: "S7 chip, Spatial Audio with Dolby Atmos, room sensing for tuned sound, Siri, smart home hub, temperature and humidity sensors, and seamless Apple ecosystem integration."
  },
  {
    id: 724, name: "Apple HomePod Mini", brand: "Apple", deviceType: "Smart Speaker",
    price: 10900, originalPrice: 12900, discount: 16, tag: "SALE", available: true,
    rating: 4.5, reviews: 5678, battery: "Wired", waterproof: "None",
    connectivity: "Wi-Fi", channels: "Mono", img: null,
    description: "360° audio from a compact sphere. S5 chip, Siri, smart home hub, intercom via iPhone, Handoff for instant iPhone audio, and Temperature + Humidity sensor."
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// READY-TO-USE DATA OBJECTS (pass directly as `data` prop)
// ─────────────────────────────────────────────────────────────────────────────

// All speakers (all brands combined)
export const speakersData = buildSpeakersData(
  [...jblSpeakers, ...boseSpeakers, ...sonySpeakers,
   ...marshallSpeakers, ...harmanSpeakers, ...appleSpeakers],
  "Speakers"
);

// Single-brand pages
export const jblSpeakersData    = buildSpeakersData(jblSpeakers,     "JBL Speakers");
export const boseSpeakersData   = buildSpeakersData(boseSpeakers,    "Bose Speakers");
export const sonySpeakersData   = buildSpeakersData(sonySpeakers,    "Sony Speakers");
export const marshallSpeakersData = buildSpeakersData(marshallSpeakers, "Marshall Speakers");
export const harmanSpeakersData = buildSpeakersData(harmanSpeakers,  "Harman Kardon Speakers");
export const appleSpeakersData  = buildSpeakersData(appleSpeakers,   "Apple HomePod");