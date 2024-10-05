import React, { useEffect, useState } from "react";
import axios from "axios";
import "./topsell.scss";
import { Button } from "antd";
import Hot from "../../assets/images/HOT.gif";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

// import required modules
import { Navigation, Pagination } from "swiper/modules";
function ProductCard({ product }) {
  const { name, img_path, price } = product;

  return (
    <div className="product-card">
      {/* Fish image */}
      <img src={img_path} alt={name} className="product-card__image" />

      {/* Fish details */}
      <div className="product-card__details">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">{price} VND</p>
      </div>
    </div>
  );
}

export { ProductCard };

const TopSaleProducts = () => {
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
    <div className="top-sale-products">
      <h2 className="text-center">
        <span>Top Sale Koi Fish</span>
        <img src={Hot} alt="hot" width={50} />
      </h2>
      <Swiper
        slidesPerView={4} // Number of items per slide
        spaceBetween={30} // Space between items
        navigation={true}
        pagination={{
          clickable: true,
        }} // Enable navigation arrows
        modules={[Navigation, Pagination]}
        loop={true}
        className="mySwiper"
      >
        {products.map((product) => (
          <SwiperSlide>
            <ProductCard key={product.id} product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="button">
        <button>View more Koi fish</button>
      </div>
    </div>
  );
};

export default TopSaleProducts;
