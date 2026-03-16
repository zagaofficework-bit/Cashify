import React from "react";
import NavMenu from "../../components/NavMenu";
import SlidingAnimation from "../../components/Home-page/SlidingAnimation";
import Devices from "../../components/Devices";
import BestSellingcomponent from "../../components/BestSellingcomponent";
import BuyRefurbishedDevices from "../../components/Home-page/BuyRefurbishedDevices";
import Footer from "../../components/Home-page/Footer";
import { audioDevices } from "../../../res/Data/DevicesData";
import { AudioDevices } from "../../../res/Data/Categorydata";
import Feedback from "../../components/Home-page/Feedback";

const BuyAudioDevices = () => {
  return (
    <div>
      <NavMenu />
      <Devices />
      <SlidingAnimation />
      <BuyRefurbishedDevices title="bestSellers" products={audioDevices} />
      <BestSellingcomponent bestSelling={AudioDevices} />
      <div className="m-12">
        <img src="https://s3ng.Phonify.in/estore/0c629d99f0364a13be9fc5fdd95e1b1f.webp" />
      </div>
      <Feedback />
      <div className="m-12">
        <img
          src="https://s3ng.Phonify.in/estore/d601984619cc4ba0a3e07307f32a0597.webp"
          alt=""
        />
      </div>
      <Footer />
    </div>
  );
};

export default BuyAudioDevices;
