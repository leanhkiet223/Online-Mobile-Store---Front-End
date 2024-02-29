import React from 'react';
import { mainCarouselData } from './MainCarouselData';
import Slider from "react-slick";


const MainCarousel = () => {
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000
    };

  return (
    <Slider {...settings}>
      {mainCarouselData.map((item, index) => (
    <img
      key={index}
      className='cursor-pointer'
      role='presentation'
      src={item.image}
      alt=''
    />))
    }
    </Slider>
  );
};


export default MainCarousel;
