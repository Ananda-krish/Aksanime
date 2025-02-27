// Offers.jsx
import "./Offers.css";
import React from 'react';
import DefaultLayout from '../../components/DefaultLayout/DefaultLayout';


function Offers() {
  return (
    <DefaultLayout>
      <div className="offers-container">
        <h2 className="offers-title">OFFERS</h2>
        <div className="offers-grid">
          
          {/* Add more offer cards here */}
        </div>
      </div>
    </DefaultLayout>
  );
}

export default Offers;