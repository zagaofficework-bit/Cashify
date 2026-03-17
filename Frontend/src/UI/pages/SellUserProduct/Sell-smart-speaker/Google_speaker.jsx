
import { google} from '../../../../res/Data/Sell-Devices-data/Sell-smartspeaker'
import NavMenu from '../../../components/NavMenu';
import SellDevices from '../../../components/SellDevices';

import Brands from '../../../components/Brands';
import DownloadAppBanner from '../../../components/Home-page/DownloadAppBanner';
import Footer from '../../../components/Home-page/Footer';

import React from 'react'

const Google_speaker = () => {
    return (
        <div>
            <NavMenu />
            <SellDevices data={google} brand="Google Speakers" />
            <Brands />
            <DownloadAppBanner />
            <Footer />
        </div>
    )
}

export default Google_speaker