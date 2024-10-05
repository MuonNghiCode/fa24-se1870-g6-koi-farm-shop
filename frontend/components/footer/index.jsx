import React from "react";
import "./index.scss"; // Add custom styles here

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__1">
          {/* Logo and contact information */}
          <img
            src="https://firebasestorage.googleapis.com/v0/b/move-management-4fb2c.appspot.com/o/379128395d441b9667fb5156f1bbc970.png?alt=media&token=bb8dc2b6-2551-46e3-bf68-903798945e0d"
            alt="Golden Koi Logo"
            className="footer__logo"
          />
          <p>
            Lô E2a-7, Đường D1, D. D1, Long Thành Mỹ, Thành Phố Thủ Đức, Thành
            phố Hồ Chí Minh 700000, Việt Nam
          </p>
          <p>📞 Hotline: 024xxx.xxx.xxx</p>
          <p>✉️ Email: info@mywebsite.vn</p>
        </div>

        <div className="footer__2">
          {/* Cách nhân */}
          <h4>Cá nhân</h4>
          <ul>
            <li>Tài khoản</li>
            <li>Quên mật khẩu</li>
            <li>Giỏ hàng</li>
            <li>Lịch sử đơn hàng</li>
          </ul>
        </div>

        <div className="footer__3">
          {/* Về chúng tôi and Hỗ trợ */}
          <h4>Về chúng tôi</h4>
          <ul>
            <li>Giới thiệu Golden Koi</li>
            <li>Cửa hàng</li>
            <li>Sản phẩm</li>
            <li>Ký gửi</li>
          </ul>
        </div>
        <div className="footer__4">
          <h4>Hỗ trợ</h4>
          <ul>
            <li>Liên hệ</li>
            <li>Hỏi đáp</li>
            <li>Hướng dẫn mua hàng</li>
            <li>Hướng dẫn bán hàng</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
