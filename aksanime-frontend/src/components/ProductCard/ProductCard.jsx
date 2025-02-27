import React from "react";
import "./ProductCard.css";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, buttonText }) => {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="card">
      <img src={product.image} alt={product.title} className="card-img" />
      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-price">₹{product.price}</p>
        <div className="card-button">
          <div className="wishlist-icon">
            <FaRegHeart className="wish-ic" />
          </div>
          <button className="addto-cart" onClick={handleAddToCart}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
