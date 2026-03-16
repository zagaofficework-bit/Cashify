
import React from 'react'
import NavMenu from '../../components/NavMenu';
import SellDevices from '../../components/SellDevices';
import {samsung} from "../../../res/Data/Sell-tablets";
import Brands from '../../components/Brands';
import DownloadAppBanner from '../../components/Home-page/DownloadAppBanner';
import Footer from '../../components/Home-page/Footer';

const Samsung = () => {
  return (
    <div>
        <NavMenu/>
        <SellDevices data={samsung} brand="samsung Tablet"/>
        <Brands/>
        <DownloadAppBanner />
        <Footer/>
        </div>
  )
}

export default Samsung