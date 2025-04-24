import React from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Hamburger Button */}
      <button
        className="btn btn-dark m-2"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1051,
        }}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className="bg-dark text-white p-3"
        style={{
          width: "200px",
          minHeight: "100vh",
          position: "fixed",
          top: 56, // below navbar
          left: isOpen ? 0 : "-200px",
          transition: "left 0.3s ease",
          zIndex: 1040,
        }}
      >
        <Link
          to="/dashboard/Record"
          className="d-flex align-items-center pb-3 mb-3 text-white text-decoration-none border-bottom"
        >
          <span className="fs-5">Dashboard</span>
        </Link>

        <ul className="nav nav-pills flex-column mb-auto">
          <li>
            <Link to="/dashboard/AddResult" className="nav-link text-white">
              Result Fill
            </Link>
          </li>
          <li>
            <Link to="/dashboard/StudentList" className="nav-link text-white">
              Students List
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
