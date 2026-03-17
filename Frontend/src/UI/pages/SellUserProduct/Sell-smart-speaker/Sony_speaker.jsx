import React from 'react'
import { sony } from '../../../../res/Data/Sell-Devices-data/Sell-smartspeaker'
import NavMenu from '../../../components/NavMenu';
import SellDevices from '../../../components/SellDevices';

import Brands from '../../../components/Brands';
import DownloadAppBanner from '../../../components/Home-page/DownloadAppBanner';
import Footer from '../../../components/Home-page/Footer';

const Sony_speaker = () => {
    return (
        <div>

            <NavMenu />
            <SellDevices data={sony} brand="Sony Smart Speakers" />
            <Brands />
            <DownloadAppBanner />
            <Footer />
        </div>
    )
}

export default Sony_speaker