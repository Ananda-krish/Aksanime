import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = ({handleLogout}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="navbar-container">
        <div className="navbar-logo">N</div>
        <div className="navbar-toggle" onClick={toggleSidebar}>
          ☰
        </div>
        <div className="navbar-address">
          <p>+91 999 84 999 44</p>
          <p>D-310, Sumel Business Park 7</p>
          <p>NH8, Rakhial, Ahmedabad</p>
        </div>
      </div>

      {isOpen && (
        <div className="sidebar">
          <div className="sidebar-header">
            <button className="close-btn" onClick={toggleSidebar}>
              ×
            </button>
          </div>
          <div className="sidebar-content">
            <ul>
              <li>Dashboard</li>
              <li>Profile</li>
              <li><Link to='/userorder'>my order</Link></li>
              <li>Settings</li>
              <li onClick={handleLogout}>Logout</li>
            </ul>
          </div>
          <div className="sidebar-footer">
            <p>Powered by NEER Media</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
