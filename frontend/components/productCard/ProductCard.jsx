import React from "react";
import { Link } from "react-router-dom";
import "./ProductCard.css";
import { Tag, Button, notification } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";

const ProductCard = ({ fish }) => {
  // Add breed as a prop;
  const handleAddToCart = () => {
    notification.open({
      message: "Fish added to cart",
      description: `${fish.name} has been added to your cart`,
      placement: "topRight",
      duration: 2,
    });
  };

  return (
    <Link to={`/products/${fish.id}`}>
      <div className="product-card">
        <div className="image">
          <img src={fish.img_path} alt="name" />
        </div>
        <div className="info-container">
          <div className="info">
            <Tag color="blue">{fish.breed}</Tag>
            <h2>{fish.name}</h2>
            <p>Size: {fish.size} cm</p>
            <p>Origin: {fish.origin}</p>
            <p>Price: ${fish.price}</p>
          </div>
          <div className="button">
            <Button
              type="primary"
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
              style={{
                fontSize: 10,
                height: 50,
                padding: "8px 16px",
                borderRadius: 20,
                marginRight: 20,
              }}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
