import NavMenu from "../components/NavMenu";
import ServiceSection from "../components/ServiceSection";

import SlidingAnimation from "../components/SlidingAnimation";
import SellPhones from "./sellDevice/SellPhones";
import Chatbot from "../components/ChatBot";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SellCard from "../components/SellCard";
import ServiceCard from "../components/ServiceCard";

export default function Home() {
  return (
    <>
      <NavMenu />
      <SlidingAnimation />
      <Chatbot />
     <ServiceSection />

          
          </>
  );
}
