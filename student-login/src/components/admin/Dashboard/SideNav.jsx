import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa"; // for hamburger icon

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // toggle sidebar

  return (
    <>
      {/* Hamburger button */}
      <button
        className="btn btn-dark m-2"
        onClick={() => setIsOpen(!isOpen)}
        style={{ position: "fixed", zIndex: 1000, top:0, left:0 }}
      >
        < FaBars />
      </button>

      {/* Sidebar */}
      {isOpen && (
        <div
          className="bg-dark text-white p-3"
          style={{
            width: "200px",
            minHeight: "100vh",
            position: "fixed",
            top: 50,
            left: 0,
            zIndex: 999,
          }}
        >
          <Link
            to="/dashboard/Record"
            className="d-flex align-items-center pb-3 mb-3 text-white text-decoration-none border-bottom"
          >
            <span className="fs-5">Menu</span>
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
      )}
    </>
  );
};

export default Sidebar;
