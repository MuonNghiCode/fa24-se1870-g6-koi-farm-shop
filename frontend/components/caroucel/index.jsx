import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./index.scss";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";

export default function Caroucel() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch top sale products from backend
    const fetchTopSaleProducts = async () => {
      try {
        const response = await axios.get(
          "https://66e6c53417055714e58a7c18.mockapi.io/Movie"
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching top sale products", error);
      }
    };
    fetchTopSaleProducts();
  }, []);
  return (
    <>
      <div className="caroucel">
        <Swiper
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={true}
          modules={[Autoplay, Pagination]}
          className="caroucel__mySwiper"
        >
          <SwiperSlide>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/031/228/073/small_2x/two-vibrant-koi-fish-gracefully-swimming-in-a-serene-pond-ai-generated-photo.jpg"
              alt="img"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://images.saatchiart.com/saatchi/397624/art/10876741/9939153-CBSMKWRV-7.jpg"
              alt="img"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src="https://cdn.pixabay.com/photo/2023/02/22/04/18/fish-7805670_1280.jpg"
              alt="img"
            />
          </SwiperSlide>
        </Swiper>
        <div className="caroucel__text">
          <h1>Golden Koi</h1>
          <div className="caroucel__p">
            <p>
              Golden Koi is a trusted source for premium koi fish, renowned for
              their health and elegance. They carefully select and nurture each
              fish to ensure the highest quality. Whether you're a beginner or a
              seasoned koi enthusiast, Golden Koi can help create a tranquil
              pond that brings peace and serenity to your space. Visit them
              today to explore their captivating world and bring harmony to your
              home or garden.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
