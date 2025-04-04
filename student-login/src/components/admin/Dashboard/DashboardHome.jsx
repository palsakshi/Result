import React from 'react'
import Navbar from '../Dashboard/TopNav'
import Sidebar from '../Dashboard/SideNav'
import { Outlet } from 'react-router-dom';

function DashboardHome() {
  return (
    <div>
      <Navbar/>
      <div className="d-flex justify-content-start g-0 ">
        <Sidebar />
        <main className="p-4 w-100" >
        <Outlet />
      </main>  
      </div>
    </div>
  )
}

export default DashboardHome;
