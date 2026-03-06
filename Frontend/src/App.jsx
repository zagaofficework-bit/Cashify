import Brands from "./UI/components/Brands";
import Home from "./UI/pages/Home";
import SellGamingConsole from "./UI/pages/SellGamingConsole";
import SellOldLaptops from "./UI/pages/SellOldLaptops";
import SellSmartSpeakers from "./UI/pages/SellSmartSpeakers";
import SellSmartWatch from "./UI/pages/SellSmartWatch";
import SellTablet from "./UI/pages/SellTablet";

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
  <SellSmartSpeakers/>
  
    </>
   
  );
}

export default App;