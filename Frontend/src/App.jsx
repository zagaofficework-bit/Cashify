import React from 'react'
import Home from './UI/pages/Home'
import Login from './UI/pages/Login'
import Header from './UI/components/NavBar'
import {BrowserRouter, Routes, Route} from "react-router-dom"

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
import { BrowserRouter, Routes, Route, ServerRouter } from "react-router-dom";
import { Signup } from "./UI/pages/signup";
import OtpGeneration from "./UI/pages/OtpGeneration";
import SlidingAnimation from "./UI/components/SlidingAnimation";
import ServiceCard from "./UI/components/ServiceCard";
import ServicesSection from "./UI/components/ServiceSection";
import SellOldDevice from "./UI/components/SellOldDevice";

import StoreSection from "./UI/components/StoreSection";
import ArticleSection from "./UI/components/ArticleSection";
import DealComponent from "./UI/components/DealComponent";
import TrendingSection from "./UI/components/TrendingSection";
import Recents from "./UI/components/Recents";
import Footer from "./UI/components/Footer";

function App() {
  return (
    <>
     {/* // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Signup />} />
    //     <Route path="/otp" element={<OtpGeneration />} />
    //   </Routes>
    // </BrowserRouter> */}
    <SlidingAnimation/>
    <ServicesSection/>
    <SellOldDevice/>
    <StoreSection/>
    <ArticleSection/>
    <DealComponent/>
    <TrendingSection/>
    <Recents/>
    <Footer/>
    </>
   
  );
}

