import React, { useState } from 'react'
import Login from './component/Login.js' 
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Customer from './component/Customer.js';
import Navbar from './component/Navbar.js';
import Audience from './component/Audience.js';
import Campaign from './component/Campaign.js';

const App = () => {
 
  
  

  return (
    <div className="">
       
    <Router>
    <Navbar/>
    <Routes>

    <Route path="/customer" element={<Customer/> } />
    <Route path="/" element={<Login />} />
    <Route path="/audience" element={<Audience />} />
    <Route path="/campaign" element={ <Campaign/>} />
    </Routes>
    </Router>
    </div>
  );
};

export default App;
