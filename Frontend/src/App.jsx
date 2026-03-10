
import Signup from "./UI/pages/Signup";
import OtpGeneration from "./UI/pages/OtpGeneration"
import { BrowserRouter, Routes, Route, ServerRouter } from "react-router-dom";
import BuyLaptops from "./UI/pages/services/BuyLaptops";

import SellOldLaptops from "./UI/pages/SellOldLaptops";
import SellPhones from "./UI/pages/SellPhones";
import SellSmartSpeakers from "./UI/pages/SellSmartSpeakers";
import SellSmartWatch from "./UI/pages/SellSmartWatch";
import SellTablet from "./UI/pages/SellTablet";
import SellTV from "./UI/pages/SellTV";
import ProductDetails from "./UI/pages/ProductDetails";
import Home from "./UI/pages/Home";
import Recycle from "./UI/pages/services/Recycle";
import FindNewPhone from "./UI/pages/FindNewPhone";
import Login from "./UI/pages/Login";
import NavBar from "./UI/components/NavBar";
import BuyPhone from "./UI/pages/services/BuyPhone";
import BuyWatches from "./UI/pages/services/BuyWatches";
import BuyGadgets from "./UI/pages/services/BuyGadgets";
import BuyTablets from "./UI/pages/services/BuyTablets";
import BuyGamingConsole from "./UI/pages/services/BuyGamingConsole";
import BuyCamera from "./UI/pages/services/BuyCamera";
import BuyAudioDevices from "./UI/pages/services/BuyAudioDevices";
import SearchByModel from "./UI/components/SearchByModel";


function App() {
  return (
    <>


<BrowserRouter>
<Home/>

</BrowserRouter>


    </>
    

  );
}

export default App;