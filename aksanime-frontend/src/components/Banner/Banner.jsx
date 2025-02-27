import React from "react";
import Slider from "react-slick";
import bannerimage1 from "../../assets/bannerimage1.avif";
import bannerimage2 from "../../assets/bannerimage2.avif";
import bannerimage3 from "../../assets/bannerimage3.avif";
import bannerimage4 from "../../assets/bannerimage4.avif";
import ban01 from "../../assets/ban01.png";
import "./Banner.css"; // Keep the styles in the same file

function Banner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="banner-carousel">  {/* Changed class name */}
      <Slider {...settings}>
        <div>
          <img src={bannerimage1} alt="Banner 1" />
        </div>
        <div>
          <img src={bannerimage2} alt="Banner 2" />
        </div>
        <div>
          <img src={bannerimage3} alt="Banner 3" />
        </div>
        <div>
          <img src={ban01} alt="Banner 4" />
        </div>
      </Slider>
    </div>
  );
}

export default Banner;