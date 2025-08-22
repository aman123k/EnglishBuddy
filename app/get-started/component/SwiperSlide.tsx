"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { sliderData } from "../data/sliderData";
import Image from "next/image";

function SwiperSlider() {
  return (
    <Swiper
      pagination={{
        dynamicBullets: true,
      }}
      modules={[Autoplay, Pagination]}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      className="mySwiper"
    >
      {sliderData?.map((slide) => {
        return (
          <SwiperSlide key={slide.id} className=" w-[100%]">
            <div className=" flex flex-col px-16 py-10 justify-center items-center gap-5 max-[650px]:px-0 max-[650px]:gap-3.5 max-[650px]:py-5">
              <h1 className="text-3xl font-nunito-sans text-[#282828] text-center font-bold font-nunito max-[650px]:text-2xl">
                {slide.title}
              </h1>
              <p className="font-nunito-sans text-lg text-[#868686] font-medium tracking-wide text-center">
                {slide.description}
              </p>

              <div className=" w-[210px] h-[210px] mt-5 mix-blend-multiply">
                <Image
                  src={slide.img}
                  alt={slide.title}
                  width={1000}
                  height={1000}
                />
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default SwiperSlider;
