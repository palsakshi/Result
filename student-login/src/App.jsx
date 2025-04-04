import React from "react";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import UserInfo from "./components/UserInfo";

const App=()=>{
  return(
    <>
    <Router>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Search/>}/>
      <Route path="/user" element={<UserInfo/>}/>
      
      
      </Routes>

    
    </Router>
      {/* <Navbar/>
      <Search/>
      <UserInfo/> */}
     
    </>
  )
}

export default App;