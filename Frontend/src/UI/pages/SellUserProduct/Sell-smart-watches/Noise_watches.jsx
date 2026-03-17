import React from 'react'
import { noise } from '../../../../res/Data/Sell-Devices-data/Sell-smartwatches'
import NavMenu from '../../../components/NavMenu';
import SellDevices from '../../../components/SellDevices';

import Brands from '../../../components/Brands';
import DownloadAppBanner from '../../../components/Home-page/DownloadAppBanner';
import Footer from '../../../components/Home-page/Footer';



export const Noise_watches = () => {
    return (
        <div>

            <NavMenu />
            <SellDevices data={noise} brand="samsung Watches" />
            <Brands />
            <DownloadAppBanner />
            <Footer />
        </div>
    )
}
