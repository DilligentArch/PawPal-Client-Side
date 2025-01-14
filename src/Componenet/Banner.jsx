import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState('right');

  const slides = [
    {
      id: 1,
      title: "Welcome to PawPal",
      description: "Find your perfect companion",
      image: "https://i.ibb.co.com/LCTtSDw/photo-1646488438698-2d5f8bd732e4.jpg"
    },
    {
      id: 2,
      title: "Help Animals in Need",
      description: "Support our donation campaigns",
      image: "https://i.ibb.co.com/XpCwx5c/photo-1587896046517-d8154a1e633c.jpg"
    },
    {
      id: 3,
      title: "Change a Life Today",
      description: "Make a Furry Friend",
      image: "https://i.ibb.co.com/sPxpQyt/pexels-babydov-7788657.jpg"
    }
  ];

  useEffect(() => {
    if (!isAnimating) {
      const timer = setInterval(() => {
        handleNextSlide();
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isAnimating]);

  const handleNextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setDirection('right');
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const handlePrevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setDirection('left');
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const getSlideStyles = (index) => {
    if (index === currentSlide) {
      return {
        transform: 'rotateY(0deg)',
        transition: 'transform 1s ease',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        zIndex: 1,
      };
    } else if (
      (direction === 'right' && index === (currentSlide - 1 + slides.length) % slides.length) ||
      (direction === 'left' && index === (currentSlide + 1) % slides.length)
    ) {
      return {
        transform: `rotateY(${direction === 'right' ? '-90deg' : '90deg'})`,
        transition: 'transform 1s ease',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        zIndex: 0,
      };
    }
    return {
      transform: `rotateY(${direction === 'right' ? '90deg' : '-90deg'})`,
      transition: 'transform 1s ease',
      transformStyle: 'preserve-3d',
      backfaceVisibility: 'hidden',
      zIndex: 0,
    };
  };

  return (
    <div className="relative bg-green-600 overflow-hidden perspective w-full">
      {/* Removed max-w-7xl to allow full width */}
      <div className="relative h-[calc(100vh-64px)]"> {/* Adjusted height to full viewport minus navbar */}
        {/* Slides Container */}
        <div className="relative h-full" style={{ perspective: '1000px' }}>
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="absolute top-0 left-0 w-full h-full"
              style={getSlideStyles(index)}
            >
              {/* Image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              {/* Text Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white text-center">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">{slide.title}</h2>
                <p className="text-lg md:text-2xl">{slide.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrevSlide}
          disabled={isAnimating}
          className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all disabled:opacity-50"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={handleNextSlide}
          disabled={isAnimating}
          className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all disabled:opacity-50"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!isAnimating) {
                  setIsAnimating(true);
                  setDirection(index > currentSlide ? 'right' : 'left');
                  setCurrentSlide(index);
                  setTimeout(() => setIsAnimating(false), 1000);
                }
              }}
              className={`w-4 h-4 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white scale-110' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
              disabled={isAnimating}
            >
              <span className="sr-only">Slide {index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;