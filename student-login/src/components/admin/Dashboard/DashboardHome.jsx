import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import Navbar from '../Dashboard/TopNav';
import Sidebar from '../Dashboard/SideNav';
import { Outlet, useNavigate } from 'react-router-dom';
import baseURL from '../../../baseURL';

function DashboardHome() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const navigate = useNavigate(); 

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('token'));
    if (!token) {
      navigate('/login');
    } else {
      axios.get(`${baseURL}/api/dashboard`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => console.log('User info:', res.data.user))
      .catch(err => {
        if (err?.response?.data?.error === "Token expired") {
          alert("Session expired. Please log in again.");
          localStorage.removeItem("token");
          navigate('/login');
        }
      });
    }

    // 🔁 Handle screen resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);

  }, []);

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <Navbar />
      <div className="d-flex" style={{ height: 'calc(100vh - 56px)' }}>
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

        <main
          className="p-4"
          style={{
            marginLeft: !isMobile && sidebarOpen ? '200px' : '0',
            width: '100%',
            overflowY: 'auto',
            transition: 'all 0.3s ease',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardHome;
