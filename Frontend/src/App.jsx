import Brands from "./UI/components/Brands";
import Home from "./UI/pages/Home";
import SellGamingConsole from "./UI/pages/SellGamingConsole";
import SellOldLaptops from "./UI/pages/SellOldLaptops";
import SellPhones from "./UI/pages/SellPhones";
import SellSmartSpeakers from "./UI/pages/SellSmartSpeakers";
import SellSmartWatch from "./UI/pages/SellSmartWatch";
import SellTablet from "./UI/pages/SellTablet";
import SellTV from "./UI/pages/SellTV";
import ProductDetails from "./UI/pages/ProductDetails";
import BuyAccessories from "./UI/services/NewAccessories";
import Recycle from "./UI/services/Recycle";
import FindNewPhone from "./UI/pages/FindNewPhone";
import { ThemeProvider } from "@material-tailwind/react";

function App() {
  return (
    <>
    
     {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
      </BrowserRouter> */}
     {/* // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<Signup />} />
    //     <Route path="/otp" element={<OtpGeneration />} />
    //   </Routes>
    // </BrowserRouter> */}
  {/* <SellOldLaptops/> */}
  {/* <SellTablet/> */}
  {/* <SellGamingConsole/> */}
  {/* <SellSmartWatch/> */}
  {/* <SellSmartSpeakers/> */}
   {/* <SellTV/>  */}
   {/* <SellPhones/> */}
{/* <ProductDetails/> */}
   {/* <BuyAccessories/> */}
   {/* <Recycle /> */}
   <ThemeProvider>
   <FindNewPhone/>
   </ThemeProvider>
    </>
   
  );
}

export default App;