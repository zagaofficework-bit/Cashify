import React from 'react'
import NavBar from "../../components/NavBar";
import NavMenu from '../../components/NavMenu';
import SlidingAnimation from '../../components/Home-page/SlidingAnimation';
import Devices from '../../components/Devices';
import FavouriteBrands from '../../components/FavouriteBrands';
import VideoComponent from '../../components/VideoComponent';
import BestSellingcomponent from '../../components/BestSellingcomponent';
import OfferSection from '../../components/OfferSection';

import Category from '../../components/Category';
import Feedback from "../../components/Home-page/Feedback";
import Footer from "../../components/Home-page/Footer";
import { bestSelling, Mobilecategories } from '../../../res/Data/Categorydata';
import Shopbuy from '../../components/Shopbuy';

const BuyPhone = () => {
  return (
    <div>
        <NavBar/>
        <NavMenu/>
        <Devices/>
        <SlidingAnimation/>
        <FavouriteBrands/>
        <VideoComponent/>
        <OfferSection/>
        <BestSellingcomponent bestSelling={bestSelling}/>
         <VideoComponent/>
         <SlidingAnimation/>
         <Shopbuy title="shop by price"/>
   <Category data={Mobilecategories}/>
<VideoComponent/>
<div className='m-12'>
    <img src="https://s3ng.cashify.in/estore/1904efec8933435e87edb8f8bf07d374.webp"/>
    <img src="https://s3ng.cashify.in/estore/56c8430107cf4f308eebd0cc2d321ce5.webp"/>
</div>
<Feedback/>
<Footer/>
    </div>
  )
}

export default BuyPhone