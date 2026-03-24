import React from 'react'
import { google } from '../../../../res/Data/PromoCards';
import MobileBrand from "../../../components/Brands/MobileBrand"

const Google = () => {
  return (
    <div>
        <MobileBrand brands={google}/>
    </div>
  )
}

export default Google