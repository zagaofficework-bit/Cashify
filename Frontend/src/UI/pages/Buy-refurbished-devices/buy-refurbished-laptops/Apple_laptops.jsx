import React from 'react'
import Filter from '../../../components/Filter'
import { appleLaptops, buildLaptopsData, samsungLaptops } from '../../../../res/Data/Filter-data/laptops'

const Apple_laptops = () => {
  return (
    <div>
        <Filter data={buildLaptopsData([...appleLaptops], "Apple laptops")} />
    </div>
  )
}

export default Apple_laptops