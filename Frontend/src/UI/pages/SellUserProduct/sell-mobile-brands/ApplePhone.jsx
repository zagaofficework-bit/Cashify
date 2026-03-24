import React from "react";
import { apple } from "../../../../res/Data/Sell-Devices-data/SellBrandData";
import NavMenu from "../../../components/Header/NavMenu";


import Brands from "../../../components/Brands/Brands";
import DownloadAppBanner from "../../../components/Home-page/DownloadAppBanner";
import Footer from "../../../components/Home-page/Footer";
import SellDevices from "../../../components/Card/SellDevices";

const ApplePhone = () => {
  
  return (
    <div>
      <NavMenu />
      <SellDevices data={apple} brand="Apple" />
    

      <Brands/>
      <DownloadAppBanner />
      <Footer/>
    </div>
  );
};

export default ApplePhone;
