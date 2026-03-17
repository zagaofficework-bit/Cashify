import React from 'react'
import NavMenu from '../../../components/NavMenu'

import { samsung } from '../../../../../res/Data/SellLaptop'

import NavMenu from '../../../components/NavMenu'

import Brands from '../../../components/Brands'
import DownloadAppBanner from '../../../components/Home-page/DownloadAppBanner'
import Footer from '../../../components/Home-page/Footer'

import SellDevices from '../../../components/SellDevices';

const Samsung = () => {
  return (
    <div>
         <NavMenu/>
        <SellDevices data={samsung} brand="samsung" />
        <Brands/>
        <DownloadAppBanner/>
         <Footer/>
    </div>
  )
}

export default Samsung