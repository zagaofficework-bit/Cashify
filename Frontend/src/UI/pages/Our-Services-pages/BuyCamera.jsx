import NavBar from "../../components/Header/NavBar";
import NavMenu from "../../components/Header/NavMenu";
import SlidingAnimation from "../../components/Home-page/SlidingAnimation";
import Devices from "../../components/Devices";

import BuyRefurbishedDevices from "../../components/Home-page/BuyRefurbishedDevices";

import Footer from "../../components/Home-page/Footer";
import { cameras, gamingConsole } from "../../../res/Data/DevicesData";
const BuyCamera = () => {
  return (
    <div>
      <NavMenu />
      <Devices />
      <SlidingAnimation />
      <BuyRefurbishedDevices title="bestSellers" products={cameras} />
      <div className="m-12">
        <img src="https://s3ng.Phonify.in/estore/d601984619cc4ba0a3e07307f32a0597.webp" />
      </div>
      <Footer />
    </div>
  );
};

export default BuyCamera;
