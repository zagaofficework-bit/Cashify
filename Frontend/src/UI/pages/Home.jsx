import { useEffect, useRef } from "react";
import NavMenu from "../components/Header/NavMenu";
import ServiceSection from "../components/Home-page/ServiceSection";
import SlidingAnimation from "../components/Home-page/SlidingAnimation";
import Chatbot from "../components/ChatBot";
import SellOldDevices from "../components/Home-page/SellOldDevices";
import BuyRefurbishedDevices from "../components/Home-page/BuyRefurbishedDevices";
import { refurbishedlaptops, refurbishedProducts } from "../../res/Data/DevicesData";
import RefurbishedLaptops from "../components/Home-page/RefurbishedLaptops";
import StoreSection from "../components/Home-page/StoreSection";
import Feedback from "../components/Home-page/Feedback";
import Recents from "../components/Home-page/Recents";
import TrendingSection from "../components/Home-page/TrendingSection";
import DealComponent from "../components/Home-page/DealComponent";
import FAQ from "../components/Home-page/FAQ";
import DownloadAppBanner from "../components/Home-page/DownloadAppBanner";
import Info from "../components/Home-page/Info";
import Footer from "../components/Home-page/Footer";
import ArticleSection from "../components/Home-page/ArticleSection";

// Fade-up reveal wrapper
function RevealSection({ children }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("opacity-100", "translate-y-0");
          el.classList.remove("opacity-0", "translate-y-6");
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="opacity-0 translate-y-6 transition-all duration-700 ease-out">
      {children}
    </div>
  );
}

// Thin gradient divider
function Divider() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </div>
  );
}

export default function Home() {
  // Scroll-to-top button
  useEffect(() => {
    const btn = document.getElementById("scroll-top-btn");
    const onScroll = () => {
      if (btn) btn.style.opacity = window.scrollY > 500 ? "1" : "0";
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="overflow-x-hidden bg-gray-50">
        <NavMenu />
      

      {/* Hero — no reveal, loads instantly */}
      <SlidingAnimation />

      <Divider />
      <RevealSection><ServiceSection /></RevealSection>

      <Divider />
      <RevealSection><SellOldDevices /></RevealSection>

      <Divider />
      <RevealSection><BuyRefurbishedDevices products={refurbishedProducts} /></RevealSection>

      <Divider />
      <RevealSection><RefurbishedLaptops title="Refurbished Laptops" products={refurbishedlaptops} /></RevealSection>

      <Divider />
      <RevealSection><StoreSection /></RevealSection>

      <Divider />
      <RevealSection><DealComponent /></RevealSection>

      <Divider />
      <RevealSection><Feedback /></RevealSection>

      <Divider />
      <RevealSection><ArticleSection /></RevealSection>

      <Divider />
      <RevealSection><TrendingSection /></RevealSection>

      <Divider />
      <RevealSection><Recents /></RevealSection>

      <Divider />
      <RevealSection><FAQ /></RevealSection>

      <RevealSection><DownloadAppBanner /></RevealSection>

      <Divider />
      <RevealSection><Info /></RevealSection>

      <Footer />

      {/* Floating chatbot */}
      <Chatbot />

      {/* Scroll-to-top button */}
      <button
        id="scroll-top-btn"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ opacity: 0 }}
        className="fixed bottom-6 left-172 z-50 w-11 h-11 bg-teal-500 hover:bg-teal-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
      </button>

    </div>
  );
}