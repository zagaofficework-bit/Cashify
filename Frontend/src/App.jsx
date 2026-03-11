import Home from "./UI/pages/Home";
import NavBar from "./UI/components/NavBar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SellPhones from "./UI/pages/sellDevice/SellPhones";
import BuyPhone from "./UI/pages/services/BuyPhone";
import BuyGadgets from "./UI/pages/services/BuyGadgets";
import BuyLaptops from "./UI/pages/services/BuyLaptops";

function App() {
  return (
    <>
     <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sell-phone" element={<SellPhones/>} />
        <Route path="/buy-gadgets" element={<BuyGadgets/>} />
        <Route path="/buy-phone" element={<BuyPhone/>} />
        <Route path="/buy-laptops" element={<BuyLaptops/>} />
      </Routes>
        
      </BrowserRouter>
    

    
    </>
    

  );
}

export default App;