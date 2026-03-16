import React from 'react'
import NavMenu from '../../components/NavMenu';
import SellDevices from '../../components/SellDevices';
import {onePlus} from "../../../res/Data/Sell-tablets"
import Brands from '../../components/Brands';
import DownloadAppBanner from '../../components/Home-page/DownloadAppBanner';
import Footer from '../../components/Home-page/Footer';

const Oneplus = () => {
  return (
    <div>
        <NavMenu/>
        <SellDevices data={onePlus} brand="Oneplus Tablet"/>
        <Brands/>
        <DownloadAppBanner />
        <Footer/>
        </div>
  )
}

export default Oneplus