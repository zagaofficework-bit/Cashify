import React from 'react'
import { samsung } from '../../../res/Data/SellBrandData'
import SellDevices from '../../components/SellDevices'

const Samsung = () => {
  return (
    <div>
      <SellDevices data={samsung} brand="Samsung" />
    </div>
  )
}

export default Samsung