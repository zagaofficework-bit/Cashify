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
        <BestSellingcomponent/>
         <VideoComponent/>
         <SlidingAnimation/>
          <div className="max-w-7xl mx-auto px-6 py-10">

      <h2 className="text-2xl font-semibold mb-6">
        Shop By Price
      </h2>

      <div className="flex gap-5 overflow-x-auto">

        {/* Card */}
        <div className="min-w-[140px] bg-gray-200 rounded-xl p-4">
          <p className="text-sm">UNDER</p>
          <h3 className="font-bold text-lg">₹9,999</h3>

          <button className="mt-3 bg-black text-white w-8 h-5 rounded-full flex items-center justify-center">
            <FaArrowRight size={10}/>
          </button>
        </div>

        <div className="min-w-[140px] bg-gray-200 rounded-xl p-4">
          <p className="text-sm">UNDER</p>
          <h3 className="font-bold text-lg">₹14,999</h3>

          <button className="mt-3 bg-black text-white w-8 h-5 rounded-full flex items-center justify-center">
            <FaArrowRight size={10}/>
          </button>
        </div>

        <div className="min-w-[140px] bg-gray-200 rounded-xl p-4">
          <p className="text-sm">UNDER</p>
          <h3 className="font-bold text-lg">₹19,999</h3>

          <button className="mt-3 bg-black text-white w-8 h-5 rounded-full flex items-center justify-center">
            <FaArrowRight size={10}/>
          </button>
        </div>

        <div className="min-w-[140px] bg-gray-200 rounded-xl p-4">
          <p className="text-sm">UNDER</p>
          <h3 className="font-bold text-lg">₹24,999</h3>

          <button className="mt-3 bg-black text-white w-8 h-5 rounded-full flex items-center justify-center">
            <FaArrowRight size={10}/>
          </button>
        </div>

        <div className="min-w-[140px] bg-gray-200 rounded-xl p-4">
          <p className="text-sm">UNDER</p>
          <h3 className="font-bold text-lg">₹29,999</h3>

          <button className="mt-3 bg-black text-white w-8 h-5 rounded-full flex items-center justify-center">
            <FaArrowRight size={10}/>
          </button>
        </div>

      </div>

    </div>
    <Category/>
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