import Brands from "./UI/components/Brands";
import Home from "./UI/pages/Home";

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
    <Brands/>
    </>
   
  );
}

export default App;