import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Navbar brand */}
        <Link className="navbar-brand" to="/">Navbar</Link>

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
  {/* <button className="btn btn-success" type="button">
    Result
  </button> */}
  <button className="btn btn-danger" type="button">
    Add
  </button>
</div>
      </div>
    </nav>
  );
};

export default Navbar;

