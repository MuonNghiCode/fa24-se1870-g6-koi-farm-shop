import React from "react";
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
} from "antd";
import "./ProductDetail.css"; // Import CSS cho component
import { ShoppingCartOutlined } from "@ant-design/icons";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = React.useState({});
  const [quantity, setQuantity] = React.useState(1);

  React.useEffect(() => {
    fetch(`https://66fe08fb699369308956d74e.mockapi.io/KoiProduct/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProduct(data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const handleAddToCart = () => {
    // Xử lý logic thêm vào giỏ hàng tại đây
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  if (!product.name) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Row>
        <Col span={24}>
          <div className="breadcrumb-container">
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/products">Product List</Breadcrumb.Item>
              <Breadcrumb.Item>
                <Link to={`/breed/${product.breed}`}>{product.breed}</Link>
              </Breadcrumb.Item>
              <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </Col>
      </Row>
      <div className="product-detail-container">
        <Row gutter={16}>
          <Col span={12}>
            <Carousel>
              <div>
                <Image src={product.img_path} alt={product.name} />
              </div>
            </Carousel>
          </Col>
          <Col span={12}>
            <div className="info-container">
              <h1>{product.name}</h1>
              <p>
                <h2>{product.price} VND</h2>
              </p>
              <div className="product-info">
                <p>
                  <span>Breed:</span> {product.breed}
                </p>
                <p>
                  <span>Age:</span> {product.age}
                </p>
                <p>
                  <span>Gender:</span> {product.gender}
                </p>
              </div>
              <div>
                <InputNumber
                  min={1}
                  max={100}
                  value={quantity}
                  onChange={(value) => setQuantity(value)}
                  style={{ width: 150 }}
                />
                <Button
                  className="add-to-cart"
                  icon={<ShoppingCartOutlined />}
                  onClick={handleAddToCart}
                  Size="large"
                  style={{ width: 400 }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default ProductDetail;
