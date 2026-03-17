import React from 'react'
import { boat } from '../../../../res/Data/Sell-Devices-data/Sell-smartwatches'
import NavMenu from '../../../components/NavMenu';
import SellDevices from '../../../components/SellDevices';

import Brands from '../../../components/Brands';
import DownloadAppBanner from '../../../components/Home-page/DownloadAppBanner';
import Footer from '../../../components/Home-page/Footer';



const Boat_watches = () => {
    return (
        <div>

            <NavMenu />
            <SellDevices data={boat} brand="samsung Watches" />
            <Brands />
            <DownloadAppBanner />
            <Footer />
        </div>
    )
}

export default Boat_watches