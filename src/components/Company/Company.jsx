import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { EffectCoverflow, Pagination } from "swiper";
import Headings from '../Headings/Headings';
export default function Company() {
  return (
    <>
<div >
<Headings title="Company Review" text="Performance reviews play an essential role in employee growth and development. Effectively conveying praise and guidance facilitates open communication and contributes"  />
</div>
   <div className='mt-5' >
   <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        
      >
        <SwiperSlide >
         <div className='card p-5 col-md-6  mx-auto'>
            <p>
            : an act of describing. specifically : discourse intended to give a mental image of something experienced. beautiful beyond description. gave an accurate description of what he saw. : a statement or account giving the characteristics of someone or something : a descriptive statement or account.
            </p>
         </div>
        </SwiperSlide >
        <SwiperSlide >
        <div className='card p-5 col-md-6  mx-auto'>
        <p >
            : an act of describing. specifically : discourse intended to give a mental image of something experienced. beautiful beyond description. gave an accurate description of what he saw. : a statement or account giving the characteristics of someone or something : a descriptive statement or account.
            </p>
         </div>
        </SwiperSlide>
        <SwiperSlide  >
        <div className='card p-5 col-md-6 mx-auto'>
        <p>
            : an act of describing. specifically : discourse intended to give a mental image of something experienced. beautiful beyond description. gave an accurate description of what he saw. : a statement or account giving the characteristics of someone or something : a descriptive statement or account.
            </p>
         </div>
        </SwiperSlide>
      
     
 
      </Swiper>
   </div>
    </>
  )
}
