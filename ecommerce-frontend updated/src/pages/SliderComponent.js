import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import slider2 from "../assets/images/slider 2.jpg";
import slider3 from "../assets/images/slider 3.jpg";
import slider4 from "../assets/images/slider 4.jpg";
import slider5 from "../assets/images/slider 5.jpg";
import './SliderComponent.css'; // Ensure styles are correctly applied

const categories = [
  { name: 'Groceries', imgSrc: slider2, path: '/category/groceries' },
  { name: 'Electronics', imgSrc: slider3, path: '/category/electronics' },
  { name: 'Fashion', imgSrc: slider4, path: '/category/fashion' },
  { name: 'Entertainment', imgSrc: slider5, path: '/category/entertainment' }
];

function SliderComponent() {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,  // Slightly slower for smoother transitions
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 2000,  // Slightly slower autoplay
    pauseOnHover: true,
    draggable: true,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="slider-item"
            onClick={() => navigate(category.path)}
          >
            <img src={category.imgSrc} alt={category.name} />
            <div className="slider-overlay">
              <h3>{category.name}</h3>
              <a href={category.path} className="slider-button">Shop Now</a>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderComponent;
