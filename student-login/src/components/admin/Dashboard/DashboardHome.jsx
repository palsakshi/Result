import {useEffect  } from 'react';
import axios from 'axios';
import React from 'react'
import Navbar from '../Dashboard/TopNav'
import Sidebar from '../Dashboard/SideNav'
import { Outlet, useNavigate} from 'react-router-dom';
import baseURL from '../../../baseURL';

function DashboardHome() {
  const navigate = useNavigate(); 
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
      navigate('/login');
    } else {
      axios.get(`${baseURL}/api/dashboard`, {
        headers: {
          Authorization: `Bearer ${token}`}
      })
      .then(res => {
        console.log('User info:', res.data.user);
      })
      .catch(err => {
        if (err?.response?.data?.error === "Token expired") {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          navigate('/login');
        }
      });
    }
  }, []);

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <Navbar/>
      <div className="d-flex" style={{ height: 'calc(100vh - 56px)' }}>
        <Sidebar />
        <main className="p-4 w-100" style={{ overflowY: 'auto' }} >
        <Outlet />
      </main>  
      </div>
    </div>
  )
}

export default DashboardHome;
