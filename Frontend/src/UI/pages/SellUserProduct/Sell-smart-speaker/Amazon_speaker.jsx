import React from 'react'
import { amazon } from '../../../../res/Data/Sell-Devices-data/Sell-smartspeaker'
import NavMenu from '../../../components/NavMenu';
import SellDevices from '../../../components/SellDevices';

import Brands from '../../../components/Brands';
import DownloadAppBanner from '../../../components/Home-page/DownloadAppBanner';
import Footer from '../../../components/Home-page/Footer';



const Amazon_speaker = () => {
    return (
        <div>
            <NavMenu />
            <SellDevices data={amazon} brand=" Amazon Speakers" />
            <Brands />
            <DownloadAppBanner />
            <Footer />
        </div>
    )
}

export default Amazon_speaker