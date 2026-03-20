import React from 'react'
import { acerLaptops, buildLaptopsData } from '../../../../res/Data/Filter-data/laptops'
import Filter from '../../../components/Filter'


const Acer_laptops = () => {
  return (
    <div>
         <Filter data={buildLaptopsData([...acerLaptops], "Acer Laptops")} />
    </div>
  )
}

export default Acer_laptops