import React from "react";
<<<<<<< HEAD:Frontend/src/UI/pages/sell-mobile-brands/Apple.jsx
import { apple } from "../../../res/Data/SellBrandData";

import NavMenu from "../../components/NavMenu";


import Brands from "../../components/Brands";
import DownloadAppBanner from "../../components/Home-page/DownloadAppBanner";
import Footer from "../../components/Home-page/Footer";
import SellDevices from "../../components/SellDevices";
=======
import { apple } from "../../../../res/Data/SellBrandData";
import SellMobileBrand from "../../../components/SellMobileBrand";
import NavMenu from "../../../components/NavMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShieldAlt,
  faBolt,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import Brands from "../../../components/Brands";
import DownloadAppBanner from "../../../components/Home-page/DownloadAppBanner";
import Footer from "../../../components/Home-page/Footer";
>>>>>>> d4183f1c40a159fad29b25a448e9eb5f7a6a13e3:Frontend/src/UI/pages/SellUserProduct/sell-mobile-brands/Apple.jsx

const Apple = () => {
  
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

export default Apple;
