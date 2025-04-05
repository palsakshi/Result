import React from "react";
import {Route,BrowserRouter as Router, Routes, useLocation,} from "react-router-dom";

import "./App.css";
// import Navbar from "./components/Navbar";
import Search from "./components/Search";
import UserInfo from "./components/UserInfo";
import Login from "./components/admin/login";
import Dashboard from "./components/admin/Dashboard/DashboardHome";
import StudentForm from "./components/admin/Dashboard/StudentForm"; // ✅ Correct name
import StudentList from "./components/admin/Dashboard/studentList"; 


function AppWrapper() {
  // const location = useLocation();

  // const hideNavbar = ["/login", "/dashboard", "/dashboard/formshow", "/dashboard/formList"  ].includes(location.pathname);

  return (
    <>
     
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} >
        <Route path="formshow" element={<StudentForm />} />
        <Route path="formList" element={<StudentList/>} />

        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Search />} />
        <Route path="/user" element={<UserInfo />} />
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
