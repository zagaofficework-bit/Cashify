
import NavBar from "../../components/Header/NavBar";
import NavMenu from '../../components/Header/NavMenu';
import SlidingAnimation from "../../components/Home-page/SlidingAnimation";
import Devices from '../../components/Devices';
import Shopbuy from '../../components/PriceUpto';
import BuyRefurbishedDevices from '../../components/Home-page/BuyRefurbishedDevices';

import BestSellingcomponent from '../../components/BestSellingcomponent';
import ConditionsExplained from '../../components/Banners/ConditionalExplained';
import Footer from '../../components/Home-page/Footer';
import { tablets } from '../../../res/Data/DevicesData';
import { Tablets } from "../../../res/Data/Categorydata";
import Category from '../../components/Banners/Category';

const BuyTablets = () => {
    return (
        <div>
            <NavMenu />
            <Devices />
            <SlidingAnimation />
            <Category data={Tablets} />
            <BuyRefurbishedDevices title="bestSellers" products={tablets} />
            <div className="w-full py-10 px-6 bg-gray-100">

                {/* Title */}
                <h2 className="text-2xl font-semibold text-center mb-15 mx-5">
                    Shop by Brand
                </h2>

                {/* Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">

                    {/* Apple */}
                    <div className="relative overflow-visible">
                        <div className="bg-green-200 rounded-2xl h-32 flex items-center justify-end pr-10">
                            <span className="text-xl font-semibold">Apple</span>
                        </div>

                        <img
                            src="../assets/tablet1.png"
                            alt="Apple"
                            className="absolute -top-10 left-6 h-36 object-contain"
                        />
                    </div>

                    {/* Samsung */}
                    <div className="relative overflow-visible">
                        <div className="bg-green-200 rounded-2xl h-32 flex items-center justify-end pr-10">
                            <span className="text-xl font-semibold">Samsung</span>
                        </div>

                        <img
                            src="../assets/tablet1.png"
                            alt="Samsung"
                            className="absolute -top-10 left-6 h-36 object-contain"
                        />
                    </div>

                    {/* Other Brands */}
                    <div className="relative overflow-visible">
                        <div className="bg-green-200 rounded-2xl h-32 flex items-center justify-end pr-10">
                            <span className="text-xl font-semibold">Other Brands</span>
                        </div>

                        <img
                            src="../assets/tablet1.png"
                            alt="Other Brands"
                            className="absolute -top-10 left-6 h-36 object-contain"
                        />
                    </div>
                </div>
            </div>
            <div className="m-12" >
                <img src="https://s3ng.Phonify.in/estore/a5e70db4d8c34f25979cb2395f25c117.webp" />
            </div>
            <Footer/>
        </div>
    )
}

export default BuyTablets