import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
  const location = useLocation();
  const { product } = location.state || {};

  // Shades with corresponding images
  const shades = [
    { id: 1, name: "01 Latte", image: "https://via.placeholder.com/400x400/ffdab9" },
    { id: 2, name: "02 Mocha", image: "https://via.placeholder.com/400x400/d2b48c" },
    { id: 3, name: "03 Caramel", image: "https://via.placeholder.com/400x400/deb887" },
  ];

  // State to hold the current main image
  const [mainImage, setMainImage] = useState(product?.image || shades[0].image);

  return (
    <div className=" product-detail-container" >
      <div className="product-image-section" >
        <img src={mainImage} alt="Selected Shade" className="main-image" />
        <div className="image-thumbnails">
          {shades.map((shade) => (
            <img
              key={shade.id}
              src={shade.image}
              alt={shade.name}
              onClick={() => setMainImage(shade.image)}
              className="thumbnail"
            />
          ))}
        </div>
      </div>

      {/* Right: Product Information Section */}
      <div className="product-info-section">
        <h1 className="product-title">{product?.title || "SUGAR Ace Of Face Foundation Stick"}</h1>
        <p className="product-price">₹{product?.price || "599"}</p>

        {/* Shade Selection */}
        <div className="shade-selection">
          <h3>Select a Shade:</h3>
          <div className="shade-options">
            {shades.map((shade) => (
              <button
                key={shade.id}
                className="shade-button"
                onClick={() => setMainImage(shade.image)}
              >
                {shade.name}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart */}
        <button className="add-to-cart">Add to Bag</button>

        {/* Product Badges */}
        <div className="product-badges">
          <span>🛡️ Cruelty Free</span>
          <span>🔄 Easy Return</span>
          <span>✅ Quality First</span>
        </div>

        {/* Accordion Sections */}
        <div className="product-tabs">
          <details>
            <summary>Description</summary>
            <p>
              {product?.description ||
                "Introducing the ultimate foundation stick that gives you a flawless, matte finish!"}
            </p>
          </details>
          <details>
            <summary>Ingredients</summary>
            <p>
              Iron Oxide Yellow (CI 77492), Phenyl Trimethicone, Titanium Dioxide (CI 77891),
              Caprylic/Capric Triglyceride...
            </p>
          </details>
          <details>
            <summary>FAQs</summary>
            <p>Q: How many shades does this foundation come in? A: Over 22 shades...</p>
          </details>
          <details>
            <summary>Product Details</summary>
            <p>Weight: 12g | Shade: 03 Medium | Skin Type: All Skin Types.</p>
          </details>
          <details>
            <summary>Reviews</summary>
            <p>Customer reviews will go here...</p>
          </details>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
