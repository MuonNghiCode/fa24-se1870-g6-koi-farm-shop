import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  Button,
  Space,
  Image,
  InputNumber,
  Carousel,
  Breadcrumb,
  Rate,
  message,
  Drawer,
  List,
  Typography,
} from "antd";
import "./index.scss";
import { ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import config from "../../config/config";
import { AES, enc } from "crypto-js";
import CurrencyFormatter from "../../components/currency";

const { Text } = Typography;

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cartDrawerVisible, setCartDrawerVisible] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [fishes, setFishes] = useState([]);
  const [fishTypes, setFishTypes] = useState([]);
  const [currentFishTypes, setCurrentFishTypes] = useState({});
  const [activeTab, setActiveTab] = useState("description");
  const { isLoggedIn, token, role } = useSelector((state) => state.auth);
  const decryptedToken = token
    ? AES.decrypt(token, config.SECRET_KEY).toString(enc.Utf8)
    : null;
  const decryptedRole = role
    ? parseInt(AES.decrypt(role, config.SECRET_KEY).toString(enc.Utf8))
    : 0;

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
    fetchFishes();
  }, [id]);

  useEffect(() => {
    getFishTypes();
  }, []);

  useEffect(() => {
    getCurrentFishTypes();
  }, [product, fishTypes]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${config.API_ROOT}fishs/${id}`);
      if (response.data) {
        setProduct(response.data);
      }
    } catch (error) {
      message.error("Failed to fetch product data.");
    }
  };

  const fetchFishes = async () => {
    try {
      const response = await axios.get(`${config.API_ROOT}fishs`);
      setFishes(response.data);
    } catch (error) {
      message.error("Failed to fetch fish data.");
    }
  };

  const getFishPrice = (fishId) => {
    const fish = fishes.find((f) => f.fishId === fishId);
    return fish ? fish.price : 0;
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${config.API_ROOT}cart`, {
        headers: {
          Authorization: `Bearer ${decryptedToken ?? null}`,
        },
      });
      if (response.data && response.data.length > 0) {
        setCartItems(response.data[0].orderLines || []);
      }
    } catch (error) {
      message.error("Failed to fetch cart data.");
    }
  };

  async function handleAddToCart() {
    setLoading(true);
    try {
      if (!token) {
        message.error("Please log in to add items to your cart.");
        return;
      }

      const response = await axios.post(
        `${config.API_ROOT}carts`,
        {
          fishId: parseInt(id),
          quantity: quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${decryptedToken ?? null}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        message.success(`Added ${quantity} of ${product.name} to cart`);
        await fetchCart();
        // setCartDrawerVisible(true);
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      message.error("Failed to add item to cart. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  async function getFishTypes() {
    try {
      const response = await axios.get(`${config.API_ROOT}fishtypes`);
      setFishTypes(response.data);
    } catch (error) {
      console.log("Error: ", error.message);
    }
  }

  function getCurrentFishTypes() {
    if (fishTypes.length > 0 && product.fishTypeId) {
      const temp = fishTypes.filter(
        (fishType) => fishType.fishTypeId === product.fishTypeId
      );
      setCurrentFishTypes(temp[0] || { name: "" });
    } else {
      setCurrentFishTypes({ name: "" });
    }
  }

  if (!product.name) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-detail-page">
      <Row>
        <Col span={24}>
          <div className="breadcrumb-container">
            <Breadcrumb className="breadcrumb" separator=">">
              <Breadcrumb.Item href="/">
                <FontAwesomeIcon
                  icon={faHome}
                  className="icon"
                ></FontAwesomeIcon>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/fish-page">Fish List</Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/breed/${currentFishTypes.name}`}>
                  {capitalizeFirstLetter(currentFishTypes.name) || "Loading..."}
                </Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item className="breadcrumb-page">
                {product?.name}
              </Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </Col>
      </Row>

      <div className="product-detail-container">
        <Row gutter={16}>
          <Col span={10}>
            <Carousel>
              <div>
                <Image src={product.imageUrl} alt={product?.name} />
              </div>
            </Carousel>
          </Col>

          <Col span={14}>
            <div className="info-container">
              <h1>{product.name}</h1>
              <h2>
                Price:{" "}
                <span className="price">
                  <CurrencyFormatter amount={product.price} />
                </span>
              </h2>
              <Rate allowHalf defaultValue={5} />

              <div className="product-info">
                <p>
                  <span>Breed:</span>{" "}
                  {capitalizeFirstLetter(currentFishTypes.name) || "Loading..."}
                </p>
                <p>
                  <span>Age:</span> {product.age}
                </p>
                <p>
                  <span>Gender:</span> {product.gender}
                </p>
              </div>

              <div className="product-submit">
                <InputNumber
                  min={1}
                  max={100}
                  value={quantity}
                  onChange={(value) => setQuantity(value)}
                  style={{ width: 150, borderRadius: 10 }}
                  className="quantity-input"
                />
                <Button
                  className="add-to-cart"
                  icon={<ShoppingCartOutlined />}
                  onClick={handleAddToCart}
                  size="large"
                  style={{
                    fontSize: 10,
                    padding: "8px 16px",
                    borderRadius: 20,
                    border: "none",
                  }}
                  loading={loading}
                >
                  Add to Cart
                </Button>
              </div>

              {/* Tab Box */}
              <div className="tab-container">
                <div
                  className={`tab-item ${
                    activeTab === "description" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </div>
                <div
                  className={`tab-item ${
                    activeTab === "rating" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("rating")}
                >
                  Rating
                </div>
              </div>

              {/* Content Box */}
              {activeTab === "description" && (
                <div className="product-description">
                  <h3>Description</h3>
                  <p>
                    {capitalizeFirstLetter(currentFishTypes.description) ||
                      "No description available."}
                  </p>
                </div>
              )}
              {activeTab === "rating" && (
                <div className="product-ratings">
                  <h3>Customer Ratings</h3>
                  <Rate allowHalf defaultValue={product.rating || 4.5} />
                  <p>Rating: {product.rating || 4.5} / 5</p>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ProductDetail;
