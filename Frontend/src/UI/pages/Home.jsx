import NavMenu from "../components/NavMenu";
import NavBar from "../components/NavBar";
import BuyRefurbishedDevices from "../components/BuyRefurbishedDevices";
import RefurbishedLaptops from "../components/RefurbishedLaptops";
import Feedback from "../components/Feedback";
import FAQ from "../components/FAQ";
import DownloadAppBanner from "../components/DownloadAppBanner";
import Info from "../components/Info";
// import { BrowserRouter, Routes, Route, ServerRouter } from "react-router-dom";
// import { Signup } from "./UI/pages/signup";
// import OtpGeneration from "./UI/pages/OtpGeneration";
import SlidingAnimation from "../components/SlidingAnimation";
import ServiceCard from "../components/ServiceCard";
import ServicesSection from "../components/ServiceSection";
import SellOldDevice from "../components/SellOldDevice";

import StoreSection from "../components/StoreSection";
import ArticleSection from "../components/ArticleSection";
import DealComponent from "../components/DealComponent";
import TrendingSection from "../components/TrendingSection";
import Recents from "../components/Recents";
import Footer from "../components/Footer";



export default function Home(){
    return (<>
    <NavBar/>
    <NavMenu/>
     <SlidingAnimation/>
      <ServicesSection/>
    <SellOldDevice/>

    <BuyRefurbishedDevices/>
    <RefurbishedLaptops/>
    <StoreSection/>
     
    <Feedback/>
    <ArticleSection/>
    <DealComponent/>
    <FAQ/>
     <TrendingSection/>
      <Recents/>
    <DownloadAppBanner/>
    <Info/>
   
   
    
   
   
   
    <Footer/>
    </>)
}


