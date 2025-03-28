import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logoImage from '../../assets/aks.jpg'; // Import the logo image
import "./Navbar.css";

const Navbar = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const NavbarContent = () => (
    <>
      <div className="navbar-logo">
        <img 
          src={logoImage} 
          alt="AKS Logo" 
          className="logo-image" 
        />
      </div>
      <div className="navbar-address">
        <p>⚡️ BELIEVE IN THE POWER OF ANIME! ⚡️</p>
        <p>🌟 YOUR NEXT FAVORITE SHOW AWAITS! 🌟</p>
        <p>🔥 WATCH • COLLECT • REPEAT! 🔥</p>
      </div>
    </>
  );

  const SidebarContent = () => (
    <div className="sidebar-content">
      <ul>
        <li><Link to='/' onClick={toggleSidebar}>Dashboard</Link></li>
        <li><Link to='/AksanimeContact'>Contact</Link></li>
        <li><Link to='/Aboutus'>About us</Link></li>
        <li><Link to='/userorder' onClick={toggleSidebar}>my order</Link></li>
        <li><Link to='/Productcart' onClick={toggleSidebar}>Cart</Link></li>
        <li onClick={handleLogout}>Logout</li>
      </ul>
    </div>
  );

  if (isMobile) {
    return (
      <>
        <div className="navbar-container-mobile">
          <div className="navbar-toggle" onClick={toggleSidebar}>
            ☰
          </div>
          <div className="navbar-logo-mobile">
            <img 
              src={logoImage} 
              alt="AKS Logo" 
              className="logo-image" 
            />
          </div>
        </div>

        {isOpen && (
          <div className="sidebar-mobile">
            <div className="sidebar-header">
              <button className="close-btn" onClick={toggleSidebar}>
                ×
              </button>
            </div>
            <SidebarContent />
            <div className="sidebar-footer">
              <p>Powered by aksanime</p>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      <div className="navbar-container">
        <NavbarContent />
        <div className="navbar-toggle" onClick={toggleSidebar}>
          ☰
        </div>
      </div>

      {isOpen && (
        <div className="sidebar">
          <div className="sidebar-header">
            <button className="close-btn" onClick={toggleSidebar}>
              ×
            </button>
          </div>
          <SidebarContent />
          <div className="sidebar-footer">
            <p>Powered by aksanime</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;