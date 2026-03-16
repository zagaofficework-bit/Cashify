import React from 'react'
import NavMenu from '../../components/NavMenu';
import SellDevices from '../../components/SellDevices';
import {apple} from "../../../res/Data/Sell-tablets";
import Brands from '../../components/Brands';
import DownloadAppBanner from '../../components/Home-page/DownloadAppBanner';
import Footer from '../../components/Home-page/Footer';

const Apple = () => {
  return (
    <div>
        <NavMenu/>
        <SellDevices data={apple} brand="Apple Tablet"/>
        <Brands/>
        <DownloadAppBanner />
        <Footer/>
        </div>
  )
}

export default Apple