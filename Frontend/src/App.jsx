import Home from "./UI/pages/Home";
import NavBar from "./UI/components/Header/NavBar";
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

import SellOldLaptops from "./UI/pages/SellDevices-pages/SellOldLaptops"
import SellSmartWatch from "./UI/pages/SellDevices-pages/SellSmartWatch"
import SellGamingConsole from "./UI/pages/SellDevices-pages/SellGamingConsole"
import SellTablet from "./UI/pages/SellDevices-pages/SellTablet"
import SellSmartSpeaker from "./UI/pages/SellDevices-pages/SellSmartSpeakers"
import SellTV from "./UI/pages/SellDevices-pages/SellTV"

import Login from "./UI/pages/Login";
import Signup from "./UI/pages/Signup";
import OtpGeneration from "./UI/pages/OtpGeneration";
import ScrollToTop from "./UI/components/ScrollToTop";

import BasePrice from "./UI/pages/SellUserProduct/BasePrice"
import YesNo from "./UI/pages/SellUserProduct/YesNo";
import ChooseVariant from "./UI/pages/SellUserProduct/ChooseVariant"
import DefectSelection from "./UI/pages/SellUserProduct/DefectSelection";
import Wishlist from "./UI/pages/Wishlist";
import PhoneDetail from "./UI/pages/DetailedProduct/PhoneDetail";
import Apple from "./UI/pages/Buy-Devices/Buy-Mobile-Brands(Offer-pages)/Apple"
import SearchByModel from "./UI/components/SearchByModel";
import { phonesFilterData } from "./res/Data/SearchFilter";
import Filter from "./UI/components/Filter";
import { laptopsData } from "./res/Data/DeviceDetail"
import Apple_laptops from "./UI/pages/Buy-refurbished-devices/buy-refurbished-laptops/Apple_laptops";
import Lenovo_laptops from "./UI/pages/Buy-refurbished-devices/buy-refurbished-laptops/Lenovo_laptops";
<<<<<<< HEAD
import Acer_laptops from "./UI/pages/Buy-refurbished-devices/buy-refurbished-laptops/Acer_laptops";
import Dell_laptops from "./UI/pages/Buy-refurbished-devices/buy-refurbished-laptops/Dell_laptops";
import FindNewLaptops from "./UI/pages/find-new-devices/findNewLaptops";
import FindNewCamera from "./UI/pages/find-new-devices/FindNewCamera";
import FindNewSmartwatch from "./UI/pages/find-new-devices/FindNewSmartwatch";
import FindNewTablet from "./UI/pages/find-new-devices/FindNewTablet";
import FindNewSpeakers from "./UI/pages/find-new-devices/FindNewSpeakers";
=======
import PhoneDetail from "./UI/pages/DetailedProduct/PhoneDetail"
import Category from "./UI/components/Category";
import Shopbuy from "./UI/components/PriceUpto";

>>>>>>> e7ac4db530f5c874355fbfcea11e61e6d569e7c2
function App() {

  return (
    <>
      <BrowserRouter>
        <NavBar />
        <ScrollToTop />

        <Routes>
          {/* Our Services Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<OtpGeneration />} />

          {/* Sell-gadgets */}
          <Route path="/sell-old-phone" element={<SellPhones />} />
          <Route path="/sell-old-laptop" element={<SellOldLaptops />} />
          <Route path="/sell-old-smartwatch" element={<SellSmartWatch />} />
          <Route path="/sell-old-tablet" element={<SellTablet />} />
          <Route path="/sell-old-gaming" element={<SellGamingConsole />} />
          <Route path="/sell-old-speaker" element={<SellSmartSpeaker />} />
          <Route path="/sell-old-tv" element={<SellTV />} />

          {/* buy-gadgets */}
          <Route path="/buy-refurbished-gadgets" element={<BuyGadgets />} />
          <Route path="/buy-refurbished-phone" element={<BuyPhone />} />
          <Route path="/buy-refurbished-laptop" element={<BuyLaptops />} />
          <Route path="/buy-refurbished-smartwatch" element={<BuyWatches />} />
          <Route path="/buy-refurbished-cam" element={<BuyCamera />} />
          <Route path="/buy-refurbished-tablet" element={<BuyTablets />} />
          <Route path="/buy-refurbished-gaming" element={<BuyGamingConsole />} />

          <Route path="/find-new-phone" element={<FindNewPhone />} />
          <Route path="/accessories" element={<BuyAccessories />} />
          <Route path="/buy-audio" element={<BuyAudioDevices />} />

          <Route path="/yesno" element={<YesNo />} />
          <Route path="/variant" element={<ChooseVariant />} />
          <Route path="/base" element={<BasePrice />} />
          <Route path="/defects" element={<DefectSelection />} />
          <Route path="/wishlist" element={<Wishlist />} />
         


<<<<<<< HEAD
          <Route path="/:id" element={<PhoneDetail />} />

=======
>>>>>>> e7ac4db530f5c874355fbfcea11e61e6d569e7c2
          {/* Sell-watches-brands */}
          {/* <Route path="/apple-watch" element={<Apple_watch />} />
          <Route path="/samsung-watch" element={<Samsung_watch />} />
          <Route path="/boat-watch" element={<Boat_watches />} />
          <Route path="/noise-watch" element={<Noise_watches />} /> */}


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
          <Route path="/amazon-speakers" element={<Amazon_speaker />} />*/}

          {/* Buy Refurbished laptops brands */}
          <Route path="/buy-refurbished-laptop/apple-laptops" element={<Apple_laptops />} />
          <Route path="/buy-refurbished-laptop/lenovo-laptops" element={<Lenovo_laptops />} />
          <Route path="/buy-refurbished-laptop/acer-laptops" element={<Acer_laptops />} />
          <Route path="/buy-refurbished-laptop/dell-laptops" element={<Dell_laptops/>} />

          {/* <Route path="/choose-variant" element={<ChooseVariant />} />
          <Route path="/add-product" element={<AddProduct />} /> */}

          <Route path="/by-mobile-brand-apple" element={<Apple />} />
          <Route path="/searchbymodel" element={<SearchByModel data={phonesFilterData} />} />
          <Route path="/filter" element={<Filter data={laptopsData} />} />

            {/* find new devices */}
           <Route path="/find-new-laptops" element={<FindNewLaptops />} />
          <Route path="/find-new-cameras" element={<FindNewCamera />} />
           <Route path="/find-new-tablets" element={<FindNewTablet />} />
          <Route path="/find-new-smartwatches" element={<FindNewSmartwatch />} />
          <Route path="/find-new-gamingconsoles" element={<FindNewSpeakers />} />
          <Route path="/find-new-speakers" element={<FindNewSpeakers />} />

        </Routes>

      </BrowserRouter>


    </>


  );
}

export default App;