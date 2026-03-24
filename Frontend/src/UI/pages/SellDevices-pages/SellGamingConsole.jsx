import React from "react";
import NavMenu from "../../components/Header/NavMenu";
import NavBar from "../../components/Header/NavBar";
import SellCard from "../../components/Card/SellCard";
import DealComponent from "../../components/Home-page/DealComponent";
import Brands from "../../components/Brands/Brands";
import Feedback from "../../components/Home-page/Feedback";
import FAQ from "../../components/Home-page/FAQ";
import DownloadAppBanner from "../../components/Home-page/DownloadAppBanner";
import Footer from "../../components/Home-page/Footer";
import HowPhonifyWorks from "../../components/Banners/HowPhonifyWorks";

const SellGamingConsole = () => {
  return (
    <>
      <NavMenu />
      <SellCard title="Sell old Gaming Console" />
      <HowPhonifyWorks />
      <DealComponent />
      <Brands />
      <Feedback />
      <FAQ />
      <DownloadAppBanner />
      <Footer />
    </>
  );
};

export default SellGamingConsole;
