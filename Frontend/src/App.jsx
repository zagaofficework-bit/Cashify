import Home from "./UI/pages/Home";
import Login from "./UI/pages/Login";
import Signup from "./UI/pages/Signup";
import OtpGeneration from "./UI/pages/OtpGeneration"
import { BrowserRouter, Routes, Route, ServerRouter } from "react-router-dom";



function App() {
  return (
    <>

    

    

    
     <BrowserRouter>

      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
     
     
     <Route path="/signup" element={<Signup />} />
      <Route path="/otp" element={<OtpGeneration />} />
  </Routes>
  </BrowserRouter>
 
   </>
);
}

export default App;