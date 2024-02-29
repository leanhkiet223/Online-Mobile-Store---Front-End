import React from 'react';
import HomeFlashSaleCard from '../HomeFlashSaleCard/HomeFlashSaleCard';
import Slider from "react-slick";
const HomeFlashSaleCarousel = ({data}) => {
  
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  
  return (
   
      <div className='relative px-4 lg:px-8 mt-7'>
      <div className='relative p-5 border rounded-lg  bg-zinc-900' > 
      <div className='flex justify-center'>
        <div className='h-[8rem] w-[30rem] relative overflow-hidden'>
          <img
            className='object-contain w-full h-full transition-opacity duration-300 ease-in-out transform hover:opacity-80'
            src='https://cdn.tgdd.vn/mwgcart/topzone/images/icon-fs.png'
            alt=''
          />
        </div>
      </div>


      <Slider {...settings} className=' border-t border-white'>
      {
        data?.map((item, index) =>(
      <HomeFlashSaleCard product={item} key={index}/>))
      }
      
      </Slider>
      </div>
    </div>
  
  
  )
}

export default HomeFlashSaleCarousel

