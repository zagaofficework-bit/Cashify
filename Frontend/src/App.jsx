import Home from "./UI/pages/Home";
import NavBar from "./UI/components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SellPhones from "./UI/pages/SellDevices-pages/SellPhones";
import BuyPhone from "./UI/pages/Our-Services-pages/BuyPhone";
import BuyGadgets from "./UI/pages/Our-Services-pages/BuyGadgets";
import BuyLaptops from "./UI/pages/Our-Services-pages/BuyLaptops";
import FindNewPhone from "./UI/pages/Our-Services-pages/FindNewPhone"
import BuyWatches from "./UI/pages/Our-Services-pages/BuyWatches"
import BuyAccessories from "./UI/pages/Our-Services-pages/BuyAccessories"
import BuyCamera from "./UI/pages/Our-Services-pages/BuyCamera";
import BuyAudioDevices from "./UI/pages/Our-Services-pages/BuyAudioDevices";
import BuyTablets from "./UI/pages/Our-Services-pages/BuyTablets";
import BuyGamingConsole from "./UI/pages/Our-Services-pages/BuyGamingConsole"

import SellLaptops from "./UI/pages/SellDevices-pages/SellOldLaptops"
import SellTV from "./UI/pages/SellDevices-pages/SellTV"
import SellTablet from "./UI/pages/SellDevices-pages/SellTablet"
import SellGamingConsole from "./UI/pages/SellDevices-pages/SellGamingConsole"
import SellLSmartWatch from "./UI/pages/SellDevices-pages/SellSmartWatch"
import SellSmartSpeaker from "./UI/pages/SellDevices-pages/SellSmartSpeakers"
import Login from "./UI/pages/Login";
import Signup from "./UI/pages/Signup";
import OtpGeneration from "./UI/pages/OtpGeneration";
import ScrollToTop from "./UI/components/ScrollToTop";
import ProductDetails from "./UI/pages/ProductDetails";
import { refurbishedProducts } from "./res/Data/DevicesData";
import Test from "./UI/pages/test";
import ServiceSection from "./UI/components/Home-page/ServiceSection";
import BasePrice from "./UI/pages/SellUserProduct/BasePrice"
import YesNo from "./UI/pages/SellUserProduct/YesNo";
import ChooseVariant from "./UI/pages/SellUserProduct/ChooseVariant"
import DefectSelection from "./UI/pages/SellUserProduct/DefectSelection";
import Wishlist from "./UI/pages/Wishlist";
import Devices from "./UI/components/Devices";

function App() {
   
  return (
    <>
   <BrowserRouter>
   <NavBar/>
   <ScrollToTop/>
    
      <Routes>
        {/* Our Services Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/otp" element={<OtpGeneration/>}/>
        <Route path="/sell-phone" element={<SellPhones/>} />
        <Route path="/buy-gadgets" element={<BuyGadgets/>} />
        <Route path="/buy-phone" element={<BuyPhone/>} />
        <Route path="/buy-laptops" element={<BuyLaptops/>} />
        <Route path="/find-phone" element={<FindNewPhone/>} />
        <Route path="/buy-smartwatch" element={<BuyWatches/>} />
        <Route path="/accessories" element={<BuyAccessories/>} />
        <Route path="/buy-cam" element={<BuyCamera/>} />
        <Route path="/buy-audio" element={<BuyAudioDevices/>} />
        <Route path="/buy-tablet" element={<BuyTablets/>} />
        <Route path="/buy-gaming" element={<BuyGamingConsole/>} />
        <Route path="/yesno" element={<YesNo/>} />
        <Route path="/variant" element={<ChooseVariant/>} />
        <Route path="/base" element={<BasePrice/>} />
        <Route path="/defects" element={<DefectSelection/>} />
        
        




        

        {/* Sell Devices Routes */}
        <Route path="/sell-phone" element={<SellPhones/>} />
        <Route path="/sell-laptop" element={<SellLaptops/>} />
        <Route path="/sell-tv" element={<SellTV/>} />
        <Route path="/sell-tablet" element={<SellTablet/>} />
        <Route path="/sell-gaming" element={<SellGamingConsole/>} />
        <Route path="/sell-smartwatch" element={<SellLSmartWatch/>} />
        <Route path="/sell-speaker" element={<SellSmartSpeaker/>} />



        <Route path="/wishlist" element={<Wishlist/>} />

        
        <Route path="/:id" element={<Test/>} />
  
       
      </Routes> 
        
      </BrowserRouter>
     
  
    </>
    

  );
}

export default App;