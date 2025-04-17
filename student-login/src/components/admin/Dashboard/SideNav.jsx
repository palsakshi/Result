import React from "react";
import { Link , useNavigate} from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any auth data (if you're using localStorage/sessionStorage)
    localStorage.removeItem("adminToken"); // or whatever you stored
    // Optionally clear more, like user info
    // Redirect to login page
    navigate("/login");
  };
  return (
    <div
      className="bg-dark text-white p-3"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <Link
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
        <li className=""
        style={{marginTop:"370px"}}>
          <button
            onClick={handleLogout}
            className="nav-link text-white bg-primary border-0 text-start" >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
