import React from 'react'
import Filter from '../../../components/Filter'
import {  buildLaptopsData, lenovoLaptops } from '../../../../res/Data/Filter-data/laptops'


const Lenovo_laptops = () => {
  return (
       <div>
           <Filter data={buildLaptopsData([...lenovoLaptops], "Apple laptops")} />
       </div>
  )
}

export default Lenovo_laptops