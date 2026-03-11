import React from 'react'
import SellMobileBrand from '../../components/SellMobileBrand'
import { samsung } from '../../../res/Data/SellBrandData'

const Samsung = () => {
  return (
    <div>
      <SellMobileBrand data={samsung} brand="Samsung" />
    </div>
  )
}

export default Samsung