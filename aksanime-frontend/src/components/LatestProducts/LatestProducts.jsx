import React from "react";
import Slider from "react-slick";
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'; // Custom arrows
import ProductCard from "../ProductCard/ProductCard";
import products from '../Data/Products'; 
// import "./LatestProducts.css";
import '../Banner/banner.css';

// import black from '../../assets/black.jpg';


const LatestProducts = () => {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <AiOutlineLeft className="custom-prev-arrow" />,  // Left custom arrow
    nextArrow: <AiOutlineRight className="custom-next-arrow" />, // Right custom arrow
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const filteredProducts = products.filter(product => product.tag === 'latest');


  return (

    <div className="bs-carousel">
    <h1 className="bs-title"> Latest Products </h1>
          <Slider {...settings}>
            {filteredProducts.map(product => (
              <div key={product.id}>
              {/* Pass buttonText dynamically to ProductCard */}
              <ProductCard product={product} buttonText={product.buttonText} />
            </div>
            ))}
          </Slider>
        </div>
   
  );
};


export default LatestProducts;
