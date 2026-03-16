import React from 'react'
import NavBar from "../../components/NavBar";
import NavMenu from '../../components/NavMenu';
import SlidingAnimation from '../../components/SlidingAnimation';

import Devices from '../../components/Devices';
import FavouriteBrands from '../../components/FavouriteBrands';
import VideoComponent from '../../components/VideoComponent';
import BestSellingcomponent from '../../components/BestSellingcomponent';
import OfferSection from '../../components/OfferSection';
import { FaArrowRight } from "react-icons/fa";
import Category from '../../components/Category';
import Feedback from "../../components/Feedback";
import Footer from "../../components/Footer";
import RefurbishedLaptops from "../../components/RefurbishedLaptops";
import ConditionsExplained from '../../components/ConditionalExplained';

const BuyLaptops = () => {
  return (
    <div>
       <NavBar/>
        <NavMenu/>
        <Devices/>
        <SlidingAnimation/>
        {/* <FavouriteBrands/> */}
        <RefurbishedLaptops/>
        <Category/>
         <RefurbishedLaptops/>
         <RefurbishedLaptops/>
         <ConditionsExplained/>
        
        </div>
  )
}

export default BuyLaptops