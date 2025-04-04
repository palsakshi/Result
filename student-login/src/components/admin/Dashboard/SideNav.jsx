import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <Link
        to="/dashboard"
        className="d-flex align-items-center pb-3 mb-3 text-white text-decoration-none border-bottom"
      >
        <span className="fs-5">Menu</span>
      </Link>

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link text-white">
            Dashboard
          </Link>
        </li>

        <li>
          <Link to="/dashboard/formshow" className="nav-link text-white">
            Result Fill
          </Link>
        </li>

        <li>
          <Link to="/dashboard/formList" className="nav-link text-white">
            Students List
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
