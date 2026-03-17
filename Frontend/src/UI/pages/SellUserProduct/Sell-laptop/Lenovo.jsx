import React from 'react'
import NavMenu from '../../components/NavMenu'

import { lenovo } from '../../../../res/Data/SellLaptop'

import NavMenu from '../../../components/NavMenu'

import Brands from '../../../components/Brands'
import DownloadAppBanner from '../../../components/Home-page/DownloadAppBanner'
import Footer from '../../../components/Home-page/Footer'

import SellDevices from '../../../components/SellDevices';

const Lenovo = () => {
  return (
    <div>
        <NavMenu/>
      <SellDevices data={lenovo} brand="Lenovo" />
               <Brands/>
              <DownloadAppBanner/>
              <Footer/>
    </div>
  )
}

export default Lenovo