import React from 'react';
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import ProductCard from '../../components/ProductCard/ProductCard';
import products from '../../components/Data/Products'; 
import Filter from '../../components/Filter/Filter'; // Import the Filter component
import './All-Easylistcards.css'; // Import CSS for styling

const Nails = () => {
  // Filter products based on category 'eyes'
  const filteredProducts = products.filter(product => product.category === 'nails');

  return (
    <DefaultLayout>
    <div className="alleasylist-layout">
      {/* Filter on the left */}
      <div className="filter-section">
        <Filter />
      </div>

      {/* Product list on the right */}
      <div className="alleasylist-product-section">
        <h1 className="alleasylist-title">Nails Products</h1>
        <div className="alleasylist-card-container">
          {/* Loop through the filteredProducts and display each product */}
          {filteredProducts.map(product => (
            <div key={product.id}>
              {/* Pass buttonText dynamically to ProductCard */}
              <ProductCard product={product} buttonText={product.buttonText} />
            </div>
          ))}
        </div>
      </div>
    </div>
  </DefaultLayout>
  );
};

export default Nails;
