import React from 'react'
import { samsung } from "../../../../res/Data/Sell-Devices-data/SellBrandData";
import SellDevices from '../../../components/SellDevices'

const SamsungPhone = () => {
  return (
    <div>
      <SellDevices data={samsung} brand="Samsung" />
    </div>
  )
}

export default SamsungPhone