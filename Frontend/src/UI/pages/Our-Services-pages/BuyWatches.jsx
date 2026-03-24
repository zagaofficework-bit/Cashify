import React from 'react'
import NavBar from "../../components/Header/NavBar";
import NavMenu from '../../components/Header/NavMenu';
import SlidingAnimation from '../../components/Home-page/SlidingAnimation';
import Devices from '../../components/Devices';
import Shopbuy from '../../components/PriceUpto';
import BuyRefurbishedDevices from '../../components/Home-page/BuyRefurbishedDevices';
import { bestSelling, Mobilecategories } from '../../../res/Data/Categorydata';
import BestSellingcomponent from '../../components/BestSellingcomponent';
import ConditionsExplained from '../../components/Banners/ConditionalExplained';
import Footer from '../../components/Home-page/Footer';
import {smartwatches } from '../../../res/Data/DevicesData';

const BuyWatches = () => {
  return (
    <div>
        <NavMenu/>
        <Devices/>
        <SlidingAnimation/>
        <Shopbuy title="Shop buy series"/>
        <BuyRefurbishedDevices title="BestSeller Devices" products={smartwatches}/>
        <BestSellingcomponent bestSelling={bestSelling}/>
        <BuyRefurbishedDevices title="Limited Stock" products={smartwatches}/>
        <BestSellingcomponent bestSelling={bestSelling}/>
        <ConditionsExplained/>
        <div className='m-12'>
             <img src="https://s3ng.Phonify.in/estore/dda211268d134db59793803c70488dae.webp"/>
             <img src="https://s3ng.Phonify.in/estore/a5e70db4d8c34f25979cb2395f25c117.webp"/>
        </div>
       <div className="max-w-7xl mx-auto px-6 py-10 text-gray-800">

  <h2 className="text-3xl font-bold mb-4">
    Refurbished Smartwatches: A Smart Choice
  </h2>

  <p className="mb-6 leading-relaxed">
    If you get a smartwatch, it will help you stay fit, connected, and organised every day. 
    But buying a brand-new smartwatch can be expensive. That’s why refurbished smartwatches 
    from Phonify are becoming very popular. They offer great quality at a much lower price 
    and are also better for the environment.
  </p>

  <h3 className="text-2xl font-semibold mb-3">
    What Are Refurbished Smartwatches?
  </h3>

  <p className="mb-6 leading-relaxed">
    Refurbished smartwatches are pre-owned devices that are carefully checked, tested, 
    and repaired if needed. At Phonify, every smartwatch goes through a 32-point quality 
    check to make sure everything works properly. Because of these checks, you get a 
    fully functional smartwatch with advanced features for health, fitness, and daily use 
    at a much lower cost.
  </p>

  <h3 className="text-2xl font-semibold mb-3">
    Good for You and the Environment
  </h3>

  <p className="mb-6 leading-relaxed">
    Buying refurbished smartwatches helps reduce electronic waste. When old devices are 
    reused, fewer new products need to be manufactured. This helps save natural resources 
    and energy. So when you buy a refurbished smartwatch from Phonify, you save money 
    and help the environment at the same time.
  </p>

  <h3 className="text-2xl font-semibold mb-3">
    Huge Range of Brands and Models
  </h3>

  <p className="mb-6 leading-relaxed">
    Phonify offers many smartwatch brands like Apple and Samsung. You can find popular 
    models such as Apple Watch Series 6, Series 7, Series 8, Series 9, Series 10, and 
    Apple Watch SE (2nd Gen). These smartwatches come in different sizes, styles, and 
    features to match your needs.
  </p>

  <p className="mb-6 leading-relaxed">
    There are also bestseller models and limited stock deals available. Many smartwatches 
    come with discounts of up to 70% to 80%, making them very affordable.
  </p>

  <h3 className="text-2xl font-semibold mb-3">
    Refurbished Conditions Explained
  </h3>

  <ul className="list-disc pl-6 mb-6 space-y-2">
    <li><strong>Superb:</strong> Looks almost new with very few or no marks.</li>
    <li><strong>Good:</strong> Has small signs of use but works perfectly.</li>
    <li><strong>Fair:</strong> Has visible marks but still works well.</li>
  </ul>

  <h3 className="text-2xl font-semibold mb-3">
    Affordable and Trustworthy
  </h3>

  <p className="leading-relaxed">
    All refurbished smartwatches on Phonify come with free shipping and exciting 
    offers. These include UPI discounts, card discounts, No Cost EMI options, and 
    Phonify Gold Membership offers. Buy refurbished smartwatches from Phonify and 
    enjoy advanced features, a huge collection, and great prices.
  </p>

</div>
<Footer/>
        </div>
  )
}

export default BuyWatches