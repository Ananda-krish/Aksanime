import React from "react";
import "./Footer.css";
import logo from '../../assets/logo123.png';
import playstore from '../../assets/image.png';
import applestore from '../../assets/applestore.png';
function Footer() {
  return (
    <footer className="footer">
      {/* Logo at the top of the page */}
      <div className="footer-logo-wrapper">
        <img
          src={logo}
          alt="SUGAR Logo"
          className="footer-logo-round"
        />
      </div>

      {/* Top Section */}
      <div className="footer-top">
        <div className="footer-logo">SPARCLE</div>
        <div className="footer-socials">
          <a href="#" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="#" aria-label="YouTube">
            <i className="fab fa-youtube"></i>
          </a>
          <a href="#" aria-label="Pinterest">
            <i className="fab fa-pinterest"></i>
          </a>
          <a href="#" aria-label="Email">
            <i className="far fa-envelope"></i>
          </a>
        </div>
      </div>

      {/* Links Section */}
      <div className="footer-links">
        <a href="#">Stores</a>
        <a href="#">Elite</a>
        <a href="#">Terms & Conditions</a>
        <a href="#">Returns</a>
        <a href="#">FAQs</a>
        <a href="#">About Us</a>
      </div>

      {/* Contact Section */}
      <div className="footer-contact">
        <div>
          <h4>GET IN TOUCH</h4>
          <p>Call us at</p>
          <p className="phone-number">1800-209-9933</p>
          <p>Monday to Saturday: 09:00 AM - 07:00 PM</p>
        </div>
        <div>
          <h4>Support</h4>
          <p>hello@sparcle.com</p>
        </div>
        <div>
          <h4>Careers</h4>
          <p>We’re hiring!</p>
        </div>
        <div>
          <h4>Press & Media</h4>
          <p>pr@sparcle.com</p>
        </div>
        <div>
          <h4>Influencer Collab</h4>
          <p>Join Us</p>
        </div>
        <div>
          <h4>Contact</h4>
          <p>Sparkle Pvt. Ltd </p>
          <p>Shree Sanwariya estate, 
            main road sector-6, <br/>
            opp Indusind Bank, <br/>
            udaipur, 
							   Rajasthan,313001 </p>
                               <p>+91 9784098890</p>
                               <p>info@sparkle.com</p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="footer-bottom">
        <p>GET THE NEW sparcle APP TODAY!</p>
        <div className="footer-app-links">
          <a href="#">
            <img src={playstore} alt="Google Play" />
          </a>
          <a href="#">
            <img src={applestore} alt="App Store" />
          </a>
        </div>
        <p>
  Copyright &copy; {new Date().getFullYear()} All rights reserved | This template is made with{" "}
  <i className="fa fa-heart-o" aria-hidden="true"></i> by{" "}
  <a href="#" target="_blank">Maxwell Professional Courses</a>
</p>
      </div>
    </footer>
  );
}

export default Footer;
