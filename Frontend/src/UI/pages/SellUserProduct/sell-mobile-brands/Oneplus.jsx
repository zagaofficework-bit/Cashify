import React from 'react'

import { onePlus } from "../../../../res/Data/Sell-Devices-data/SellBrandData";
import SellDevices from '../../components/SellDevices'

const Oneplus = () => {
  return (
    <div>
      <SellDevices data={onePlus} brand="OnePlus"/>
    </div>
  )
}

export default Oneplus