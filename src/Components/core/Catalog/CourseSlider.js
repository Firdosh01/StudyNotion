import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from 'swiper/modules';
import CoursesCard from './CoursesCard';

export default function CourseSlider({Courses}) {
  return (
    <div>
      {
        Courses?.length ? (
          <Swiper
          navigation={true} 
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem] mx-auto"
          >
            {
              Courses?.map((course,index) => (
                <SwiperSlide key={index}>
                  <CoursesCard course={course} Hight={"h-[250px]"} />
                </SwiperSlide>
              ))
            }
          </Swiper>
        ) : (
          <p className='text-xl text-richblack-5'>No Course Found</p>
        )
      }
    </div>
  )
}
