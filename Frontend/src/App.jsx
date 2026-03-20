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
import PhoneDetail from './UI/pages/DetailedProduct/PhoneDetail'
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
import CompareDevices from "./UI/components/CompareDevice/CompareDevice";

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
        
        <Route path="/compare" element={<CompareDevices/>} />
        <Route path="/comp" element={<PhoneDetail/>} />
      


          <Route path="/wishlist" element={<Wishlist />} />


          {/* <Route path="/:id" element={<PhoneDetail />} /> */}

          {/* Sell-watches-brands
          <Route path="/apple-watch" element={<Apple_watch />} />
          <Route path="/samsung-watch" element={<Samsung_watch />} />
          <Route path="/boat-watch" element={<Boat_watches />} />
          <Route path="/noise-watch" element={<Noise_watches />} />


          {/* Sell-watches-brands */}
          {/* <Route path="/apple-speakers" element={<Apple_speaker />} />
          <Route path="/google-speakers" element={<Google_speaker />} />
          <Route path="/sony-speakers" element={<Sony_speaker />} />
          <Route path="/amazon-speakers" element={<Amazon_speaker />} /> */}

          {/* Sell-Gaming-console-brands */}
          {/* <Route path="/microsoft-game" element={<Microsoft_game />} />
          <Route path="/sony-game" element={<Sony_game />} /> */}

          {/* Buy-mobile-brands */}
          {/* <Route path="/buy-apple-mobile" element={<Apple />} />
          <Route path="/google-speakers" element={<Google_speaker />} />
          <Route path="/sony-speakers" element={<Sony_speaker />} />
          <Route path="/amazon-speakers" element={<Amazon_speaker />} />

          <Route path="/choose-variant" element={<ChooseVariant />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/serachbymodel" element={<SearchByModel />} />  */}

        </Routes>

      </BrowserRouter>


    </>


  );
}

export default App;