import React from 'react'
import { useState } from 'react'
import Style from "./CategorySlider.module.css"
import { useEffect } from 'react'
import Slider from 'react-slick'
import axios from 'axios'
import Loading from '../Loading/Loading'

export default function () {
const [Categories, setCategories] = useState([]);



    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows:false,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
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
     async function getCategories() {
        const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
        console.log(data);
        setCategories(data?.data)
        
     }


    const [counter, setcounter] = useState(0);
    useEffect(() => {
        console.log(" Mounting CategorySlider");
        getCategories()
    }, []);
    if(Categories.length==0){
        return <Loading/>
    }
    return (
      <Slider {...settings} className='mt-7'>
            {
                Categories.map((c)=><div key={c._id}>
                    <img src={c.image} alt=""  className='h-[200px] w-full object-cover'/>
                    <p className='text-2xl mt-1'>{c.name}</p>
                </div>)
            }




      </Slider>
    )
}
