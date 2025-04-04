import React from 'react';
import { Link } from 'react-router-dom';
 
function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <a className="navbar-brand" href="/">My Website</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto text-white gap-3">
                        <Link to="/"  className='text-white'>Search
                        </Link>
                      <Link to='/user'  className='text-white '>UserInfo</Link>
                        {/* <li className="nav-item">
                           <Link to="/user">Register</Link> 
                        </li> */}
                    </ul>
                </div>
            </div>
        </nav>
    </div>
  )
}

export default Navbar;
