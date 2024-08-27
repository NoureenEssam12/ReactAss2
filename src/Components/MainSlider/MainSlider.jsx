import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import img_1 from '../../assets/images/im1.jpg';
import img_2 from '../../assets/images/im2.jpg';
import img_3 from '../../assets/images/im3.jpg';
import img_4 from '../../assets/images/im4.jpg';
import img_5 from '../../assets/images/im5.jpg';
import Style from './MainSlider.module.css'; // Ensure this file contains necessary CSS

function MainSlider() {
  const settings = {
    dots: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    console.log('Mounting MainSlider');
  }, []);

  return (
    <div className="container w-1/2 mx-auto mt-7">
    <div className='grid grid-cols-12 mb-4'>
    {/* <div className="md:col-span-8 "> */}
    <Slider {...settings} className=' col-span-12 md:col-span-8 mb-5 '>
       
       <img className='h-[400px] w-full     cursor-grab	
' src={img_1} alt="" />  
       <img className='h-[400px] w-full     cursor-grab	
' src={img_2} alt="" />
     
       
       <img className='h-[400px] w-full     cursor-grab	
' src={img_3} alt="" />
     
        
    </Slider>
    {/* </div> */}
    <div className=" col-span-12 md:col-span-4  ">
        <img className='md:h-[200px] w-full ' src={img_4} alt="" />
        <img className='md:h-[200px] w-full ' src={img_5} alt="" />
        </div>
    </div>
</div>
  );
}

export default MainSlider;
