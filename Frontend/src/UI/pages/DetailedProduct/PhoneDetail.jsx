import React from 'react'
import ProductDetails from '../ProductDetails'
import { refurbishedProducts } from '../../../res/Data/DevicesData'
import { useParams } from 'react-router-dom'

const BuyPhone = () => {

  const { id }= useParams();

  const product = refurbishedProducts.find((p)=>p.id === id)
  return (
    <div>
      <ProductDetails 
      data={product}
      />
    </div>
  )
}

export default BuyPhone
