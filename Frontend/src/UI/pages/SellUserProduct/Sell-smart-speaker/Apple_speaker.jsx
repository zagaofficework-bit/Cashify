import React from 'react'
import { apple } from '../../../../res/Data/Sell-Devices-data/Sell-smartspeaker'
import NavMenu from '../../../components/NavMenu';
import SellDevices from '../../../components/SellDevices';

import Brands from '../../../components/Brands';
import DownloadAppBanner from '../../../components/Home-page/DownloadAppBanner';
import Footer from '../../../components/Home-page/Footer';



const Apple_speaker = () => {
    return (
        <div>
            <NavMenu />
            <SellDevices data={apple} brand="Apple Speakers" />
            <Brands />
            <DownloadAppBanner />
            <Footer />
        </div>
    )
}

export default Apple_speaker