import React from 'react'
<<<<<<< HEAD:Frontend/src/UI/pages/sell-mobile-brands/Xiaomi.jsx
import SellMobileBrand from '../../components/SellMobileBrand'
import { xiaomi } from '../../../res/Data/SellBrandData'
import SellDevices from '../../components/SellDevices'
=======
import SellMobileBrand from '../../../components/SellMobileBrand'
import { xiaomi } from '../../../../res/Data/SellBrandData'
>>>>>>> d4183f1c40a159fad29b25a448e9eb5f7a6a13e3:Frontend/src/UI/pages/SellUserProduct/sell-mobile-brands/Xiaomi.jsx

const Xiaomi = () => {
  return (
    <div>
      <SellDevices data={xiaomi} brand="Xiaomi" />
    </div>
  )
}

export default Xiaomi
