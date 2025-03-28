import ParticlesComponent from "../ParticlesBackground";
import black from "../../assets/hinata.jpg"
import nami from "../../assets/nami.jpg"
import mikasa from "../../assets/mikasa.jpg"
import goku from "../../assets/goku.jpg"
import bleach from "../../assets/bleach.jpg"
import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CustomArrow = ({ direction, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute z-30 top-1/2 -translate-y-1/2 ${
      direction === 'prev' ? 'left-4' : 'right-4'
    } bg-black/70 hover:bg-black rounded-full p-3 shadow-xl transition-all duration-300 transform hover:scale-110`}
  >
    {direction === 'prev' ? (
      <ChevronLeft className="w-6 h-6 text-white" />
    ) : (
      <ChevronRight className="w-6 h-6 text-white" />
    )}
  </button>
);

function FirstPage({ user, handleLogout }) {
  const heroRef = useRef(null);
  const leftSliderRef = useRef(null);
  const centerSliderRef = useRef(null);
  const rightSliderRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-text', {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const textVariants = {
    initial: { x: -500, opacity: 0 },
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 1, staggerChildren: 0.1 },
    },
    scrollButton: {
      opacity: [0, 1, 0],
      y: [20, 0, 10],
      transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  const slides = [
    {
      image: goku,
      title: 'GOKU',
      description: 'Believe in the power of dreams!',
      titleFont: 'font-bold font-[Arial] text-7xl sm:text-8xl lg:text-9xl',
      titleColor: 'text-[#FFD700]', // Golden yellow
      descriptionFont: 'font-semibold font-[Comic Sans MS] text-3xl sm:text-4xl lg:text-5xl',
      descriptionColor: 'text-[#FF4500]' // Orange-red
    },
    {
      image: nami,
      title: 'LUFFY',
      description: 'Adventure is out there!',
      titleFont: 'font-extrabold font-[Impact] text-7xl sm:text-8xl lg:text-9xl',
      titleColor: 'text-[#1E90FF]', // Dodger blue
      descriptionFont: 'font-medium font-[Brush Script MT] text-3xl sm:text-4xl lg:text-5xl',
      descriptionColor: 'text-[#32CD32]' // Lime green
    },
    {
      image: black,
      title: 'NARUTO',
      description: 'Never give up! That\'s my Ninja Way!',
      titleFont: 'font-black font-[Times New Roman] text-7xl sm:text-8xl lg:text-9xl',
      titleColor: 'text-[#FF6347]', // Tomato red
      descriptionFont: 'font-bold font-[Lucida Handwriting] text-3xl sm:text-4xl lg:text-5xl',
      descriptionColor: 'text-[#4169E1]' // Royal blue
    },
    {
      image: mikasa,
      title: 'LEVI',
      description: 'Fight! In this world, cruelty is weakness!',
      titleFont: 'font-extrabold font-[Courier New] text-7xl sm:text-8xl lg:text-9xl',
      titleColor: 'text-[#8A2BE2]', // Blue violet
      descriptionFont: 'font-semibold font-[Papyrus] text-3xl sm:text-4xl lg:text-5xl',
      descriptionColor: 'text-[#FF8C00]' // Dark orange
    },
    {
      image: bleach,
      title: 'BYAKUYA',
      description: 'My Senbonzakura does not scatter a single petal in vain.',
      titleFont: 'font-bold font-[Georgia] text-7xl sm:text-8xl lg:text-9xl',
      titleColor: 'text-[#00CED1]', // Dark turquoise
      descriptionFont: 'font-medium font-[Garamond] text-3xl sm:text-4xl lg:text-5xl',
      descriptionColor: 'text-[#DC143C]' // Crimson
    }
  ];

  const baseSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    fade: true,
    cssEase: 'linear',
    arrows: false,
  };

  const mainSettings = {
    ...baseSettings,
    dots: true,
    arrows: true,
    prevArrow: <CustomArrow direction="prev" />,
    nextArrow: <CustomArrow direction="next" />,
    appendDots: (dots) => (
      <div className="absolute w-full bottom-4">
        <ul className="p-0 m-0 text-center">{dots}</ul>
      </div>
    ),
    beforeChange: (oldIndex, newIndex) => {
      leftSliderRef.current.slickGoTo(newIndex);
      rightSliderRef.current.slickGoTo(newIndex);
    }
  };

  return (
    <section ref={heroRef} className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200">
      <div className="absolute inset-0 z-0">
        <ParticlesComponent id="hero-particles" />
      </div>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 lg:flex-row sm:px-8 lg:px-16">
        <div className="hidden lg:block w-[15%] h-[55vh] relative overflow-hidden transform 
            perspective-1000 rotate-y-10 hover:rotate-y-0 transition-all duration-500 
            rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
          <Slider ref={leftSliderRef} {...baseSettings}>
            {slides.map((slide, index) => (
              <div key={index} className="h-[60vh]">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="object-cover w-full h-full blur-sm"
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className="w-full lg:w-[60%] h-[50vh] sm:h-[60vh] lg:h-[70vh] mx-0 lg:mx-10 relative overflow-visible transform 
            perspective-1000 rotate-y-0 transition-all duration-500 
            rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
          <Slider ref={centerSliderRef} {...mainSettings}>
            {slides.map((slide, index) => (
              <div key={index} className="h-[50vh] sm:h-[60vh] lg:h-[70vh] relative">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="object-cover w-full h-full rounded-xl"
                  loading="eager"
                  style={{ imageRendering: 'crisp-edges' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent rounded-xl">
                  <div className="absolute left-0 right-0 p-4 text-center text-white top-1/4">
                    <h2 className={`mb-4 drop-shadow-lg ${slide.titleFont} ${slide.titleColor}`}>
                      {slide.title}
                    </h2>
                    <p className={`drop-shadow-lg ${slide.descriptionFont} ${slide.descriptionColor}`}>
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <div className="hidden lg:block w-[15%] h-[60vh] relative overflow-hidden transform 
            perspective-1000 rotate-y-10 hover:rotate-y-0 transition-all duration-500 
            rounded-xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)]">
          <Slider ref={rightSliderRef} {...baseSettings}>
            {slides.map((slide, index) => (
              <div key={index} className="h-[60vh]">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="object-cover w-full h-full blur-sm"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <motion.div
        className="absolute left-0 right-0 z-20 bottom-4 sm:bottom-8"
        variants={textVariants}
        initial="initial"
        animate="animate"
      >
        <div className="container px-4 mx-auto text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2 text-base font-semibold text-white bg-orange-500 rounded-full sm:px-8 sm:py-3 sm:text-lg hover:bg-gray-800 hero-text"
          >
            Explore Our Work
          </motion.button>
        </div>
      </motion.div>
    </section>
  );
};

export default FirstPage;