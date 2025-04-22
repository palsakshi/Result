import React from 'react';
import { Link ,useNavigate} from 'react-router-dom';



const Navbar = () => {
  const Navigate = useNavigate();
const handleLogout = () => {
  // Clear any auth data (if you're using localStorage/sessionStorage)
  localStorage.removeItem("adminToken");
  Navigate("/login"); };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Navbar brand */}
        <Link className="navbar-brand" style={{paddingLeft:50}}>Navbar</Link>

        {/* Toggle button */}
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-collapse-init=""
          data-mdb-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars text-light"></i>
        </button>

        {/* Collapsible wrapper */}
        <div className="d-flex ms-3 gap-2">
       
        <Link to="/dashboard/AddResult" className="btn btn-success">
            Add
          </Link>
          <button
            onClick={handleLogout}
            className=" btn btn-info border-3 text-start " >
            Logout
          </button>
</div>
      </div>
    </nav>
  );
};

export default Navbar;

