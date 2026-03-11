import React from 'react'
import SellMobileBrand from '../../components/SellMobileBrand'
import { xiaomi } from '../../../res/Data/SellBrandData'

const Xiaomi = () => {
  return (
    <div>
      <SellMobileBrand data={xiaomi} brand="Xiaomi" />
    </div>
  )
}

export default Xiaomi
