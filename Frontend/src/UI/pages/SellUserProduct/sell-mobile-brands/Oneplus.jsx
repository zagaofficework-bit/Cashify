import React from 'react'
import SellMobileBrand from '../../components/SellMobileBrand'
import { onePlus } from '../../../res/Data/SellBrandData'

const Oneplus = () => {
  return (
    <div>
      <SellMobileBrand data={onePlus} brand="OnePlus"/>
    </div>
  )
}

export default Oneplus