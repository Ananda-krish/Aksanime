import React from 'react';
import './Filter.css'; // Optional for specific styles

const Filter = () => {
  return (
    <div className="filter">
      <h2>Filters</h2>
      <div className="filter-item">
        <label>
          <input type="checkbox" /> Price: Low to High
        </label>
      </div>
      <div className="filter-item">
        <label>
          <input type="checkbox" /> Price: High to Low
        </label>
      </div>
      <div className="filter-item">
        <label>
          <input type="checkbox" /> New Arrivals
        </label>
      </div>
      {/* Add more filters as needed */}
    </div>
  );
};

export default Filter;
