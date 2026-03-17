import React from 'react'

import {onePlus} from "../../../../res/Data/Sell-Devices-data/Sell-tablets";

import NavMenu from '../../../components/NavMenu'

import Brands from '../../../components/Brands'
import DownloadAppBanner from '../../../components/Home-page/DownloadAppBanner'
import Footer from '../../../components/Home-page/Footer'

import SellDevices from '../../../components/SellDevices';
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