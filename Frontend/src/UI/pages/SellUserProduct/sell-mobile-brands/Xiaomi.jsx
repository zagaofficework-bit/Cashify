import React from 'react'
import SellMobileBrand from '../../components/SellMobileBrand'
import { xiaomi } from "../../../../res/Data/Sell-Devices-data/SellBrandData";
import SellDevices from '../../components/SellDevices'

const Xiaomi = () => {
  return (
    <div>
      <SellDevices data={xiaomi} brand="Xiaomi" />
    </div>
  )
}

export default Xiaomi
