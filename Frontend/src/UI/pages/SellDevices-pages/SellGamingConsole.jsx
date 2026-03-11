import React from 'react'
import NavMenu from '../../components/NavMenu'
import NavBar from "../../components/NavBar";
import SellCard from "../../components/Card/SellCard"
import DealComponent from '../../components/Home-page/DealComponent';
import Brands from '../../components/Brands';
import Feedback from '../../components/Home-page/Feedback';
import FAQ from '../../components/Home-page/FAQ';
import DownloadAppBanner from '../../components/Home-page/DownloadAppBanner';
import Footer from '../../components/Home-page/Footer';
import HowCashifyWorks from '../../components/HowCashifyWorks';


const SellGamingConsole = () => {
   return (
    <>
   
        <NavMenu/>
        <SellCard title="Sell old Gaming Console"/>
        <HowCashifyWorks />
        <DealComponent/>
        <Brands/>
        <Feedback/>
        <FAQ/>
        <DownloadAppBanner/>
        <Footer/>

    </>
  )
}

export default SellGamingConsole