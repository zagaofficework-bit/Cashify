import React from 'react'
import NavMenu from '../../components/NavMenu'
import NavBar from "../../components/NavBar";
import SellCard from '../../components/SellCard';
import DealComponent from '../../components/DealComponent';
import Brands from '../../components/Brands';
import Feedback from '../../components/Feedback';
import FAQ from '../../components/FAQ';
import DownloadAppBanner from '../../components/DownloadAppBanner';
import Footer from '../../components/Footer';
import HowCashifyWorks from '../../components/HowCashifyWorks';

const SellOldLaptops = () => {
  return (
    <div>
        <NavBar/>
        <NavMenu/>
        <SellCard title="Sell old laptops"/>
        <HowCashifyWorks />
        <Brands/>
        <Feedback/>
        <FAQ/>
        <DownloadAppBanner/>
        <Footer/>

    </div>
  )
}

export default SellOldLaptops