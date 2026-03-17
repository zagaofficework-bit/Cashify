import React from 'react'
import { microsoft } from "../../../../res/Data/Sell-Devices-data/Sell-gamingConsole";
import NavMenu from "../../../components/NavMenu";


import Brands from "../../../components/Brands";
import DownloadAppBanner from "../../../components/Home-page/DownloadAppBanner";
import Footer from "../../../components/Home-page/Footer";
import SellDevices from "../../../components/SellDevices";
const Microsoft_game = () => {
    return (
        <div>

            <NavMenu />
            <SellDevices data={microsoft} brand="Microsoft Gaming Console" />


            <Brands />
            <DownloadAppBanner />
            <Footer />
        </div>
    )
}

export default Microsoft_game