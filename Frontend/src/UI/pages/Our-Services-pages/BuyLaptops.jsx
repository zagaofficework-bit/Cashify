import React from 'react'
import NavBar from "../../components/NavBar";
import NavMenu from '../../components/NavMenu';
import SlidingAnimation from '../../components/Home-page/SlidingAnimation';

import Devices from '../../components/Devices';
import FavouriteBrands from '../../components/FavouriteBrands';
import VideoComponent from '../../components/VideoComponent';
import BestSellingcomponent from '../../components/BestSellingcomponent';
import OfferSection from '../../components/OfferSection';
import { FaArrowRight } from "react-icons/fa";
import Category from '../../components/Category';
import Feedback from "../../components/Home-page/Feedback";
import Footer from "../../components/Home-page/Footer";
import RefurbishedLaptops from "../../components/Home-page/RefurbishedLaptops";
import ConditionsExplained from '../../components/ConditionalExplained';
import LaptopSection from '../../components/LaptopSection';

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
          <Category/>
           <Category/>
           <BestSellingcomponent/>
           <LaptopSection/>
           <Category/>
         <ConditionsExplained/>
         <div className='m-12'>
    <img src="https://s3ng.cashify.in/estore/d826a39ef9c043248bb22378b414e82a.png"/>
  </div>
        <div className="max-w-6xl mx-auto px-6 py-10 text-gray-800">
      
      {/* Title */}
      <h2 className="text-3xl font-bold mb-4">
        Refurbished Laptops: What Makes Them Great?
      </h2>

      {/* Paragraph */}
      <p className="mb-6 leading-relaxed">
        Refurbished laptops are getting really popular because you can get
        high-quality laptops at much lower prices. You can enjoy all the
        features of a new laptop like fast performance, good battery life,
        and large displays without paying full price. In fact, many
        refurbished laptops are available at almost half of their original
        MRP. You can find top brands like Apple MacBook, Dell, Lenovo, HP,
        and many more. This makes refurbished laptops a smart and
        budget-friendly choice.
      </p>

      {/* Section Title */}
      <h3 className="text-2xl font-semibold mb-4">
        Why Cashify Is A Great Place To Buy?
      </h3>

      {/* Feature List */}
      <div className="space-y-6">

        <div>
          <h4 className="font-semibold text-lg mb-1">
            32-Step Quality Check
          </h4>
          <p className="text-gray-600">
            Every laptop goes through a 32-step quality check covering the
            battery, keyboard, screen, ports, and storage. Experts test the
            performance and replace or repair anything that does not meet
            quality standards so the laptop works like new.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-1">Three Conditions</h4>
          <ul className="list-disc pl-6 text-gray-600 space-y-1">
            <li>Fair condition – Works perfectly but may have a few scratches.</li>
            <li>Good condition – Light wear but performs very well.</li>
            <li>Superb condition – Looks and works almost like a brand-new device.</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-1">
            Free Shipping & Easy Refunds
          </h4>
          <p className="text-gray-600">
            Cashify offers free shipping and a 15-day refund policy so you
            can shop with confidence.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-1">
            Warranty & Extra Protection
          </h4>
          <p className="text-gray-600">
            All laptops come with a 6-month warranty. Some models also allow
            you to extend the warranty for an additional six months at a
            small cost.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-1">Lots of Brands</h4>
          <p className="text-gray-600">
            Choose from a wide range of brands including Apple MacBook, Dell,
            Lenovo, HP, and many more.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-1">
            Save Money & Help the Planet
          </h4>
          <p className="text-gray-600">
            Buying refurbished laptops helps reduce electronic waste while
            also saving money, making it an eco-friendly choice.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-lg mb-1">
            Multiple Discount Options
          </h4>
          <p className="text-gray-600">
            Cashify offers several discount options such as UPI discounts,
            Cashify Gold membership benefits, card offers, and No-Cost EMI
            options.
          </p>
        </div>

      </div>

      {/* Conclusion */}
      <p className="mt-8 text-gray-700 font-medium">
        In short, refurbished laptops are becoming popular because they are
        affordable and reliable. With Cashify, you get tested and trusted
        laptops without spending too much.
      </p>

    </div>
    <Footer/>
        </div>
  )
}

export default BuyLaptops