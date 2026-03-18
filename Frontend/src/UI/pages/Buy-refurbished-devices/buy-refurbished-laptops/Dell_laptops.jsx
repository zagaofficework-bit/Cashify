import React from 'react'

import Filter from '../../../components/Filter'
import { buildLaptopsData,dellLaptops } from '../../../../res/Data/Filter-data/laptops'
const Dell_laptops = () => {
  return (
    <div>
        <Filter data={buildLaptopsData([...dellLaptops], "DELL laptops")} />
    </div>
  )
}

export default Dell_laptops