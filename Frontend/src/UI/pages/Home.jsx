import NavMenu from "../components/NavMenu";
import ServiceSection from "../components/Home-page/ServiceSection";

import SlidingAnimation from "../components/Home-page/SlidingAnimation";
import Chatbot from "../components/ChatBot";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SellCard from "../components/Card/SellCard";
import ServiceCard from "../components/Card/ServiceCard";
import SellOldDevices from "../components/Home-page/SellOldDevice";
import BuyRefurbishedDevices from "../components/Home-page/BuyRefurbishedDevices";
import {
  refurbishedlaptops,
  refurbishedProducts,
} from "../../res/Data/DevicesData";
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
import ProductDetails from "./ProductDetails";
import MobileBrand from "../components/MobileBrand";
import { google } from "../../res/Data/PromoCards";

import Apple from "./SellUserProduct/Sell-laptop/Apple";



export default function Home() {
  return (
    <>
    <NavMenu/></>
  );
}
