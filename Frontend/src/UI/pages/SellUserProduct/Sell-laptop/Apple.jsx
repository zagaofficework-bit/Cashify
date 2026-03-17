import React from 'react'
import { apple } from '../../../../res/Data/Sell-Devices-data/SellLaptop'

import NavMenu from '../../../components/NavMenu'

import Brands from '../../../components/Brands'
import DownloadAppBanner from '../../../components/Home-page/DownloadAppBanner'
import Footer from '../../../components/Home-page/Footer'

import SellDevices from '../../../components/SellDevices';

const Apple = () => {
     
  return (
    <div>
        <NavMenu/>
      <SellDevices data={apple} brand="Mac book" />
       <Brands/>
      <DownloadAppBanner/>
      <Footer/>

    </div>
  )
}

export default Apple