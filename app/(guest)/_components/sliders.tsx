"use client"

import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Sliders = () => {

    const banners = [
        {
            id: 1,
            logo: "/images/banners/1.jpeg",
        },
        {
            id: 2,
            logo: "/images/banners/2.jpeg",
        },
        {
            id: 3,
            logo: "/images/banners/3.jpeg",
        },
    ]


        return (
            <Swiper
                modules={[ Navigation, Pagination, Autoplay ]}
                navigation
                pagination={{ clickable: true}}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                loop={true}
                className="w-full h-[150px] md:h-[500px]"
            >
                {banners.map((banner) => (
                    <SwiperSlide key={banner.id}>
                        <div className="w-fit">
                            <img
                                src={banner.logo}
                                alt={banner.logo}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        )
}

export default Sliders