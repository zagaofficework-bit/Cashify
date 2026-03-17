import React from 'react'
import { sony } from "../../../../res/Data/Sell-Devices-data/Sell-gamingConsole";

import NavMenu from "../../../components/NavMenu";


import Brands from "../../../components/Brands";
import DownloadAppBanner from "../../../components/Home-page/DownloadAppBanner";
import Footer from "../../../components/Home-page/Footer";
import SellDevices from "../../../components/SellDevices";

const Sony_game = () => {
    return (
        <div>

            <NavMenu />
            <SellDevices data={sony} brand="Sony Gaming console" />


            <Brands />
            <DownloadAppBanner />
            <Footer />
        </div>
    )
}

export default Sony_game