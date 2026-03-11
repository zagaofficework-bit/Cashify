
import NavBar from "../../components/NavBar";
import NavMenu from '../../components/NavMenu';
import SlidingAnimation from '../../components/SlidingAnimation';
import Devices from '../../components/Devices';
import Shopbuy from '../../components/Shopbuy';
import BuyRefurbishedDevices from '../../components/BuyRefurbishedDevices';

import BestSellingcomponent from '../../components/BestSellingcomponent';
import ConditionsExplained from '../../components/ConditionalExplained';
import Footer from '../../components/Footer';
import { gamingConsole } from '../../../res/js/DevicesData';
import { GamingConsole } from "../../../res/js/Categorydata";
import Category from '../../components/Category';

const BuyGamingConsole = () => {
    return (
        <div>
            <NavBar />
            <NavMenu />
            <Devices />
            <SlidingAnimation />
            <BuyRefurbishedDevices title="bestSellers" products={gamingConsole} />
            <BestSellingcomponent bestSelling={GamingConsole} />
            <div className="m-12">
                <img src="https://s3ng.cashify.in/estore/27e0a845304d4ecdba2ecd718b911ab3.webp"/>
                <img src="https://s3ng.cashify.in/estore/d601984619cc4ba0a3e07307f32a0597.webp"/>
            </div>
            <Footer/>
        </div>
    )
}

export default BuyGamingConsole