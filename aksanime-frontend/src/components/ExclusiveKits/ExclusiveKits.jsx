import React from "react";
import Slider from "react-slick";
import "./ExclusiveKits.css";

const ExclusiveKits = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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

  return (
    <div className="exclusive-kits">
      <h2 className="section-title">
        <span>Exclusive Kit Series</span>
      </h2>
      <Slider {...settings} className="kits-carousel">
        {/* Card 1 */}
        <div className="kit-card">
          <img
            src="https://via.placeholder.com/300x200"
            alt="Vineeta's Favourite Makeup Kit"
          />
          <div className="kit-info">
            <h3>Vineeta's Favourite Makeup Kit</h3>
            <p>6 handpicked must-haves + a personally autographed box</p>
            <div className="price">
              <span className="old-price">₹3084</span>
              <span className="new-price">₹2999</span>
            </div>
          </div>
        </div>
        {/* Card 2 */}
        <div className="kit-card">
          <img
            src="https://via.placeholder.com/300x200"
            alt="3 Crayon Lipsticks"
          />
          <div className="kit-info">
            <h3>3 Crayon Lipsticks</h3>
            <p>Unbeatable matte for your unforgettable looks</p>
            <div className="price">
              <span className="old-price">₹1799</span>
              <span className="new-price">₹999</span>
            </div>
          </div>
        </div>
        {/* Card 3 */}
        <div className="kit-card">
          <img
            src="https://via.placeholder.com/300x200"
            alt="On Point Makeup Kit"
          />
          <div className="kit-info">
            <h3>On Point Makeup Kit</h3>
            <p>Bold eyes, fluttery lashes, and irresistible lips!</p>
            <div className="price">
              <span className="old-price">₹1523</span>
              <span className="new-price">₹848</span>
            </div>
          </div>
        </div>
        {/* Card 4 */}
        <div className="kit-card">
          <img
            src="https://via.placeholder.com/300x200"
            alt="Deluxe Kit"
          />
          <div className="kit-info">
            <h3>Deluxe Kit</h3>
            <p>A perfect gift for makeup lovers</p>
            <div className="price">
              <span className="old-price">₹3999</span>
              <span className="new-price">₹3499</span>
            </div>
          </div>
        </div>
      </Slider>
    </div>
  );
};

const SampleNextArrow = (props) => {
  const { className, onClick } = props;
  return <div className={`${className} custom-arrow next`} onClick={onClick} />;
};

const SamplePrevArrow = (props) => {
  const { className, onClick } = props;
  return <div className={`${className} custom-arrow prev`} onClick={onClick} />;
};

export default ExclusiveKits;
