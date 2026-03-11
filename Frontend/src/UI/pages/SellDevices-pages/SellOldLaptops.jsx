import React from "react";
import NavMenu from "../../components/NavMenu";
import NavBar from "../../components/NavBar";
import SellCard from "../../components/Card/SellCard";
import DealComponent from "../../components/Home-page/DealComponent";
import Brands from "../../components/Brands";
import Feedback from "../../components/Home-page/Feedback";
import FAQ from "../../components/Home-page/FAQ";
import DownloadAppBanner from "../../components/Home-page/DownloadAppBanner";
import Footer from "../../components/Home-page/Footer";
import HowPhonifyWorks from "../../components/HowPhonifyWorks";

const SellOldLaptops = () => {
  return (
    <div>
      <NavMenu />
      <SellCard title="Sell old laptops" />
      <HowPhonifyWorks />
      <Brands />
      <Feedback />
      <FAQ />
      <DownloadAppBanner />
      <Footer />
    </div>
  );
};

export default SellOldLaptops;
