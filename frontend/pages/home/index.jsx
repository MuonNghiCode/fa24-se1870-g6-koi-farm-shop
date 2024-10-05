import React, { useEffect, useState } from "react";
import Caroucel from "../../components/caroucel";
import TopSaleProducts from "../../components/topSales/topsell";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import GradeIcon from "@mui/icons-material/Grade";
import { Link } from "react-router-dom";
import SetMealIcon from "@mui/icons-material/SetMeal";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import "./index.scss";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import TtyIcon from "@mui/icons-material/Tty";
import { GiftOutlined, StarOutlined, TrophyFilled } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faBlog,
  faCircleQuestion,
  faFish,
  faGift,
  faPhone,
  faPhoneVolume,
  faQuestion,
  faTrophy,
  faTruckFast,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import FaqList from "../../components/FAQ";
function HomePage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          "https://66e6c53417055714e58a7c18.mockapi.io/Koi"
        );
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);
  return (
    <div className="HomePage">
      <Caroucel />
      <div className="Slogan">
        <h2>
          <FontAwesomeIcon
            icon={faTrophy}
            color="red"
            width="50"
            height="100"
          />
          <span>
            GOLDEN KOI IS PROUD TO BE THE ONLY & LARGEST BREEDING CAMP IN
            NORTHERN VIETNAM HIGH QUALITY F1 JAPANESE KOI
          </span>
        </h2>
      </div>
      <div className="detail_slogan">
        <div className="detail_slogan__1">
          {" "}
          {/*cần chỉnh link ở đây*/}
          <Link to="****" className="slogan-link">
            <StarOutlined className="star-icon" />
            <span>
              Vietnamese Koi with prices from only 19K for sizes from 15 cm
            </span>
          </Link>
          <Link to="****" className="slogan-link">
            <StarOutlined className="star-icon" />
            <span>
              F1 Koi from purebred Japanese parents 39 children only 1,000,000
              VND
            </span>
          </Link>
          <Link to="****" className="slogan-link">
            <StarOutlined className="star-icon" />
            <span>
              Koi size 15cm imported from Koix Japan priced from only 1,199,000
              VND
            </span>
          </Link>
          <Link to="****" className="slogan-link">
            <StarOutlined className="star-icon" />
            <span>
              Large size koi fish - Big size only available at Golden Koi
            </span>
          </Link>
          <Link to="****" className="slogan-link">
            <StarOutlined className="star-icon" />
            <span>Let call now to get the best advice</span>
          </Link>
        </div>
        <div className="detail_slogan__2">
          <Link to="****" className="slogan-link">
            <FontAwesomeIcon icon={faFish} />
            <span>Adult koi fish from only 49,000 VND</span>
          </Link>
          <Link to="****" className="slogan-link">
            <GiftOutlined className="Gift-icon" />
            <span>Promotion for playing koi together</span>
          </Link>
          <Link to="****" className="slogan-link">
            <FontAwesomeIcon icon={faQuestion} />
            <span>Why is Goiden Koi number one?</span>
          </Link>
        </div>
      </div>

      <TopSaleProducts />
      <div className="product-category">
        <div className="product-category__title">
          <h2>
            <FontAwesomeIcon icon={faBagShopping} color="rgb(234, 34, 34)" />
            <span>Product Category</span>
          </h2>
        </div>
        <div className="product-category__cards">
          <Link className="koi-card">
            <img
              src="https://minhxuankoifarm.com/wp-content/uploads/2020/09/ce47e057a9fbb1e7073048009a5a5ace-283x400.jpg"
              alt="img"
            />
            <span className="koi-title">Koi Japanese</span>
          </Link>
          <Link className="koi-card">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/move-management-4fb2c.appspot.com/o/Screenshot%202024-09-27%20164559.png?alt=media&token=9733fd2e-3c29-409e-bb74-0fa7acc80cd6"
              alt="img"
            />
            <span className="koi-title">Koi F1</span>
          </Link>
          <Link className="koi-card">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/move-management-4fb2c.appspot.com/o/Screenshot%202024-09-27%20165122.png?alt=media&token=b0415b62-9c2b-43f0-ab76-d63261d5c303"
              alt="img"
            />
            <span className="koi-title">Koi Vietnamese</span>
          </Link>
        </div>
      </div>
      <div className="banner">
        <div className="banner__1">
          <div className="banner__1__title">
            <FontAwesomeIcon icon={faGift} color=" #bbab6f" />
            <h2>Koi Fish Deals</h2>
          </div>
          <div className="banner__1__text">
            <span>
              39 mini Vietnamese Koi only 1,000,000 VND limited to 100 lucky
              customers Firstly
            </span>
            <span>F1 Koi buy 10 get 1 free, Viet Koi Buy 9 get 1 free</span>
          </div>
        </div>
        <div className="banner__2">
          <div className="banner__2__title">
            <FontAwesomeIcon icon={faTruckFast} color="#bbab6f" />
            <h2>Free ship</h2>
          </div>

          <div className="banner__2__text">
            <span>COD Nationwide, free.</span>
            <span>Simple and flexible payment.</span>
          </div>
        </div>
        <div className="banner__3">
          <div className="banner__3__title">
            <FontAwesomeIcon icon={faPhoneVolume} color="#bbab6f" />
            <h2>Companion</h2>
          </div>

          <div className="banner__3__text">
            <span>Consulting and support 24/7</span>
          </div>
        </div>
      </div>
      <div className="why-choose">
        <h2>
          <FontAwesomeIcon icon={faCircleQuestion} /> Why Choose Golden Koi
          Farm?
        </h2>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul>
          <li>
            The farm covers over 20 hectares with a satellite ecosystem of more
            than 10 hectares, the largest in the North
          </li>
          <li>
            Over 10 years of experience in business, breeding, and raising koi
            fish
          </li>
          <li>
            Design and construction of thousands of professional koi ponds, a
            unique offering that few koi fish suppliers can match.
          </li>
          <li>
            <strong>Special:</strong> A passion for koi fish that knows no
            bounds
          </li>
        </ul>
      </div>
      <div className="blog-list-container">
        <h1 className="blog-list-title">
          <FontAwesomeIcon icon={faBlog} />
          Blogs
        </h1>
        <div className="blog-list">
          {blogs.map((blog) => (
            <div key={blog.id} className="blog-card">
              <h2>{blog.title}</h2>
              <div className="blog-info">
                <img
                  src={blog.img_path}
                  alt={blog.title}
                  className="blog-image"
                />
                <p>{blog.short_description}</p>
              </div>
              <button className="read-more-btn">Read more</button>
            </div>
          ))}
        </div>

        {/* Add the "More Blogs" button at the bottom */}
        <div className="more-blogs-button-container">
          <button className="more-blogs-btn">More Blogs</button>
        </div>
      </div>
      <FaqList />
      <div className="koi-expert">
        <h2>Raising Koi Fish Should Be Accompanied By Experts</h2>
        <p>
          “Koi fish are not just ornamental carp, but they are also feng shui
          fish, bringing wealth and luck. Koi fish have quite a long lifespan,
          and for most of my customers, they have become a part of their lives.
        </p>
        <p>
          So, when you choose Golden Koi Farm, you are selecting dedicated
          experts who lead in koi farming knowledge and experience. Based on my
          own experience, I am confident that this is an essential factor in
          your future success in raising and caring for koi.”
        </p>
        <p className="quote-author">Quoted from CEO Golden Koi Farm</p>
        <a href="tel:0943439922" className="consult-btn">
          <FontAwesomeIcon icon={faPhone} />
          Request a Consultation - 09.43.43.99.22
        </a>
      </div>
    </div>
  );
}

export default HomePage;
