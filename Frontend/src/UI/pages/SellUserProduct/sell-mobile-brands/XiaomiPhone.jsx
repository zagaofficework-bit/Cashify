import React from 'react'

import { xiaomi } from "../../../../res/Data/Sell-Devices-data/SellBrandData";
import SellDevices from '../../../components/Card/SellDevices'

const XiaomiPhone = () => {
  return (
    <div>
      <SellDevices data={xiaomi} brand="Xiaomi" />
    </div>
  )
}

export default XiaomiPhone
