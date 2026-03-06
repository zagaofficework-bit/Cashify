import React from 'react'
import Home from './UI/pages/Home'
import Login from './UI/pages/Login'
import Header from './UI/components/NavBar'
import {BrowserRouter, Routes, Route} from "react-router-dom"

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  )
}

export default App
