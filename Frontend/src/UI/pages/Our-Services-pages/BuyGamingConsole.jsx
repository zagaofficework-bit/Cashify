import NavBar from "../../components/Header/NavBar";
import NavMenu from "../../components/Header/NavMenu";
import SlidingAnimation from "../../components/Home-page/SlidingAnimation";
import Devices from "../../components/Devices";
import Shopbuy from "../../components/PriceUpto";
import BuyRefurbishedDevices from "../../components/Home-page/BuyRefurbishedDevices";

import BestSellingcomponent from "../../components/BestSellingcomponent";
import ConditionsExplained from "../../components/ConditionalExplained";
import Footer from "../../components/Home-page/Footer";
import { gamingConsole } from "../../../res/Data/DevicesData";
import { GamingConsole } from "../../../res/Data/Categorydata";
import Category from "../../components/Category";

const BuyGamingConsole = () => {
  return (
    <div>
      <NavMenu />
      <Devices />
      <SlidingAnimation />
      <BuyRefurbishedDevices title="bestSellers" products={gamingConsole} />
      <BestSellingcomponent bestSelling={GamingConsole} />
      <div className="m-12">
        <img src="https://s3ng.Phonify.in/estore/27e0a845304d4ecdba2ecd718b911ab3.webp" />
        <img src="https://s3ng.Phonify.in/estore/d601984619cc4ba0a3e07307f32a0597.webp" />
      </div>
      <Footer />
    </div>
  );
};

export default BuyGamingConsole;
