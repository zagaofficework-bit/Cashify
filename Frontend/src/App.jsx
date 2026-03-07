// import Brands from "./UI/components/Brands";
import Home from "./UI/pages/Home";
// import SellGamingConsole from "./UI/pages/SellGamingConsole";
// import SellOldLaptops from "./UI/pages/SellOldLaptops";
// import SellPhones from "./UI/pages/SellPhones";
// import SellSmartSpeakers from "./UI/pages/SellSmartSpeakers";
// import SellSmartWatch from "./UI/pages/SellSmartWatch";
// import SellTablet from "./UI/pages/SellTablet";
// import SellTV from "./UI/pages/SellTV";
// import ProductDetails from "./UI/pages/ProductDetails";
import BuyPhone from "./UI/pages/services/BuyPhone";
// import SellOldDevice from "./UI/components/SellOldDevice";
import NavBar from "./UI/components/NavBar";
import Login from "./UI/pages/Login";
import Signup from "./UI/pages/Signup";
import OtpGeneration from "./UI/pages/OtpGeneration"
import { BrowserRouter, Routes, Route, ServerRouter } from "react-router-dom";
import BuyLaptops from "./UI/pages/services/BuyLaptops";

function App() {
  return (
    <>
    {/* <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
     
     
     <Route path="/signup" element={<Signup />} />
      <Route path="/otp" element={<OtpGeneration />} />
  </Routes>
  </BrowserRouter> */}
    {/* <NavBar/>
  {/* <SellOldLaptops/> */}
  {/* <SellTablet/> */}
  {/* <SellGamingConsole/> */}
  {/* <SellSmartWatch/> */}
  {/* <SellSmartSpeakers/> */}
   {/* <SellTV/>  */}
   {/* <SellPhones/> */}
{/* <ProductDetails/> */}
<BuyLaptops/>

    {/* <BrowserRouter>

      {/* Global Navbar */}
    

      {/* <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/otp" element={<OtpGeneration />} />
      </Routes> */}
{/* 
    </BrowserRouter> */}
  


    </>
   
  );
}

export default App;