import React from "react";
import {Route,BrowserRouter as Router, Routes, useLocation,} from "react-router-dom";

import "./App.css";
// import Navbar from "./components/Navbar";
import Search from "./components/admin/Search";
import UserInfo from "./components/UserInfo";
import Login from "./components/admin/login";
import Dashboard from "./components/admin/Dashboard/DashboardHome";
import StudentForm from "./components/admin/Dashboard/studentform"; // ✅ Correct name
import StudentList from "./components/admin/Dashboard/studentList"; 
import EditStudent  from "./components/admin/Dashboard/editStudent";

function AppWrapper() {
  
  return (
    <>
     
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} >
        <Route path="AddResult" element={<StudentForm />} />
        <Route path="StudentList" element={<StudentList/>}/>
        </Route>
        <Route path="/editStudent/:id"  element={<EditStudent/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Search />} />
        <Route path="/userInfo" element={<UserInfo />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
