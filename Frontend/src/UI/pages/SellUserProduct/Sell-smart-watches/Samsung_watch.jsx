import React from 'react'
import { samsung } from '../../../../res/Data/Sell-Devices-data/Sell-smartwatches'
import NavMenu from '../../../components/NavMenu';
import SellDevices from '../../../components/SellDevices';

import Brands from '../../../components/Brands';
import DownloadAppBanner from '../../../components/Home-page/DownloadAppBanner';
import Footer from '../../../components/Home-page/Footer';

const Samsung_watch = () => {
    return (
        <div>
            <NavMenu />
            <SellDevices data={samsung} brand="samsung Watches" />
            <Brands />
            <DownloadAppBanner />
            <Footer />
        </div>
    )
}

export default Samsung_watch