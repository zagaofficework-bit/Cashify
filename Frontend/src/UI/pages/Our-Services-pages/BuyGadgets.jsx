import React from "react";

import NavBar from "../../components/NavBar";
import NavMenu from "../../components/NavMenu";
import SlidingAnimation from "../../components/Home-page/SlidingAnimation";
import Devices from "../../components/Devices";
import FavouriteBrands from "../../components/FavouriteBrands";
import VideoComponent from "../../components/VideoComponent";
import BestSellingcomponent from "../../components/BestSellingcomponent";
import OfferSection from "../../components/OfferSection";

import Category from "../../components/Category";
import Feedback from "../../components/Home-page/Feedback";
import Footer from "../../components/Home-page/Footer";
import { bestSelling, Mobilecategories } from "../../../res/Data/Categorydata";
import Shopbuy from "../../components/Shopbuy";
import LaptopSection from "../../components/LaptopSection";
import BuyRefurbishedDevices from "../../components/Home-page/BuyRefurbishedDevices";
import RefurbishedLaptops from "../../components/Home-page/RefurbishedLaptops";
import {
  refurbishedProducts,
  cameras,
  tablets,
  smartwatches,
  gamingConsole,
} from "../../../res/Data/DevicesData";

const BuyGadgets = () => {
  return (
    <div>
      <NavMenu />
      <SlidingAnimation />
      <Devices />
      <VideoComponent />
      <OfferSection />
      <VideoComponent />
      <LaptopSection />
      <BestSellingcomponent bestSelling={bestSelling} />
      <div className="mt-4 mx-20">
        <img src="https://s3ng.Phonify.in/estore/d99e292909da415ea14150565758c2bb.webp" />
      </div>
      <BestSellingcomponent bestSelling={bestSelling} />
      <RefurbishedLaptops />
      <BestSellingcomponent bestSelling={bestSelling} />
      <BuyRefurbishedDevices
        title="In-Demand SmartWatches"
        products={smartwatches}
      />
      <BuyRefurbishedDevices title="Most Brought Tablets" products={tablets} />
      <BuyRefurbishedDevices title="Best Selling Cameras" products={cameras} />
      <BuyRefurbishedDevices
        title="Best selling Gaming Console"
        products={gamingConsole}
      />
      <div className="m-12 mx-20">
        <img src="https://s3ng.Phonify.in/estore/1904efec8933435e87edb8f8bf07d374.webp" />
        <img src="https://s3ng.Phonify.in/estore/56c8430107cf4f308eebd0cc2d321ce5.webp" />
        <img src="https://s3ng.Phonify.in/estore/d601984619cc4ba0a3e07307f32a0597.webp" />
      </div>
      <Feedback />
      <Footer />
    </div>
  );
};

export default BuyGadgets;
