import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "../App.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/login'); 
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="#">
            <img
              src="sample.jpg"
              style={{ borderRadius: "50%" }}
              width="80"
              height="90"
              alt="Logo"
            />
          </NavLink>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/expenses_list">
                  All Expense
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/add_expenses">
                  Add Expenses
                </NavLink>
              </li>
            </ul>
            

            {/* Right-side links */}
            <ul className="navbar-nav ms-auto">
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      <i className="fas fa-user-plus"></i> Signup
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login">
                      <i className="fas fa-sign-in-alt"></i> Login
                    </NavLink>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/profile">
                      <i className="fas fa-user"></i> Profile
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn btn-link"
                      onClick={handleLogout}
                      style={{ textDecoration: 'none', color: 'inherit' }}
                    >
                      <i className="fas fa-sign-out-alt"></i> Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;