import React from 'react'
import NavMenu from '../../components/NavMenu'

import { hp } from '../../../res/Data/SellLaptop'
import Brands from '../../components/Brands'
import DownloadAppBanner from '../../components/Home-page/DownloadAppBanner'
import Footer from '../../components/Home-page/Footer'
import SellDevices from '../../components/SellDevices'

const HP = () => {
  return (
    <div>
        <NavMenu/>
        <SellDevices data={hp} brand="Oneplus" />
         <Brands/>
         <DownloadAppBanner/>
        <Footer/>
    </div>
  )
}

export default HP