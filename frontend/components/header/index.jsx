import React, { useEffect, useState } from "react";
import "./index.scss";
import logo from "../../assets/images/logo.png";
import { Button, Input } from "antd";
import {
  GlobalOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function Header() {
  const [isNavFixed, setIsNavFixed] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      // Thay đổi giá trị này tùy thuộc vào khi nào bạn muốn gắn nav
      setIsNavFixed(true);
    } else {
      setIsNavFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="header">
      <div className="header__header1">
        <div className="header__header1__logo">
          <img src={logo} alt="logo" />
        </div>

        <div className="header__header1__search">
          <input placeholder="Enter Koi fish name to search" />
          <button type="submit">
            <SearchOutlined />
            <div>Search</div>
          </button>
        </div>
        <div className="header__header1__login">
          <UserOutlined />
          <Link to="Login">Login</Link>
        </div>
        <div className="header__header1__cart">
          <Link to="Cart">
            <ShoppingCartOutlined />
            Cart
          </Link>
        </div>
        <div className="header__header1__language">
          <GlobalOutlined />
          <div>English</div>
          <div>Vietnamese</div>
        </div>
      </div>
      <div className={`header__menu ${isNavFixed ? "fixed" : ""}`}>
        <nav className="header__menu__nav">
          <ul className="header__menu__nav__ul">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="About us">About us</Link>
            </li>
            <li>
              <Link to="Product">Product</Link>
            </li>
            <li>
              <Link to="Blog">Blog</Link>
            </li>
            <li>
              <Link to="Contact">Contact us</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
