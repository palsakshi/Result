import {useEffect  } from 'react';

import React from 'react'

import Navbar from '../Dashboard/TopNav'
import Sidebar from '../Dashboard/SideNav'
import { Outlet, useNavigate} from 'react-router-dom';


function DashboardHome() {
  const navigate= useNavigate();
  

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
      navigate('/login');
    }
  }, []);
  return (
    <div  style={{ height: '100vh', overflow: 'hidden' }}>
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
