import React from 'react'
import NavMenu from '../../components/NavMenu';
import SellDevices from '../../components/SellDevices';
import {lenovo} from "../../../res/Data/Sell-tablets"
import Brands from '../../components/Brands';
import DownloadAppBanner from '../../components/Home-page/DownloadAppBanner';
import Footer from '../../components/Home-page/Footer';

const Lenovo = () => {
  return (
    <div>
        <NavMenu/>
        <SellDevices data={lenovo} brand="lenovo Tablet"/>
        <Brands/>
        <DownloadAppBanner />
        <Footer/>
        </div>
  )
}

export default Lenovo