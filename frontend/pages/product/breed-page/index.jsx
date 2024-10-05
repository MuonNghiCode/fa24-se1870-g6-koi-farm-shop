import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../productCard/ProductCard";
import Breadcrumbs from "../breadCrumbs";
import {
  Breadcrumb,
  Col,
  FloatButton,
  Pagination,
  Row,
  Select,
  Slider,
  Tag,
  TreeSelect,
} from "antd";
import Search from "antd/es/transfer/search";
import "./index.scss";
const BreedFishPage = () => {
  const { breedName } = useParams(); // Lấy breed từ URL
  const [breedFish, setBreedFish] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedOrigins, setSelectedOrigins] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([100000, 100000000]);

  useEffect(() => {
    const fetchBreedFish = async () => {
      try {
        // Giả sử API của bạn hỗ trợ lọc theo breed như query parameter
        const response = await axios.get(
          `https://66fe08fb699369308956d74e.mockapi.io/KoiProduct?breed=${breedName}`
        );
        setBreedFish(response.data); // Lưu danh sách cá của breed
      } catch (error) {
        console.error("Error fetching breed fish:", error);
      }
    };

    fetchBreedFish(); // Fetch dữ liệu khi component được mount
  }, [breedName]);
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSortChange = (value) => {
    setSortOrder(value);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOriginChange = (value) => {
    setSelectedOrigins(value);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSizeChange = (value) => {
    setSelectedSizes(value);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
    setCurrentPage(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const origins = [...new Set(breedFish.map((Fish) => Fish.origin))];
  const sizes = [...new Set(breedFish.map((Fish) => Fish.size))];

  const originTreeData = origins.map((breed) => ({
    title: breed,
    value: breed,
    key: breed,
  }));

  const sizeTreeData = sizes.map((size) => ({
    title: size,
    value: size,
    key: size,
  }));

  const filteredFishs =
    searchQuery === ""
      ? breedFish
          .filter((Fish) => {
            if (selectedOrigins.length === 0) return true;
            return selectedOrigins.includes(Fish.origin);
          })
          .filter((Fish) => {
            if (selectedSizes.length === 0) return true;
            return selectedSizes.includes(Fish.size);
          })
          .filter((Fish) => {
            return Fish.price >= priceRange[0] && Fish.price <= priceRange[1];
          })
      : breedFish.filter((Fish) => {
          return (
            Fish.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedOrigins.length === 0 ||
              selectedOrigins.includes(Fish.breed)) &&
            (selectedSizes.length === 0 || selectedSizes.includes(Fish.size)) &&
            Fish.price >= priceRange[0] &&
            Fish.price <= priceRange[1]
          );
        });

  const sortedFishs = filteredFishs.sort((a, b) => {
    if (sortOrder === "newest") {
      return b.date - a.date;
    } else if (sortOrder === "oldest") {
      return a.date - b.date;
    } else if (sortOrder === "price-asc") {
      return a.price - b.price;
    } else if (sortOrder === "price-desc") {
      return b.price - a.price;
    } else {
      return 0;
    }
  });

  const paginatedFishs = sortedFishs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="breed-page-container">
      <Col span={24}>
        <div className="breadcrumb-container">
          <Breadcrumb className="breadcrumb">
            <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/products">Product List</Breadcrumb.Item>
            <Breadcrumb.Item>{breedName}</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </Col>
      <h1>{breedName}</h1> {/* Hiển thị tên breed */}
      <Row gutter={16}>
        <Col span={6} className="left-side">
          <div className="product-list-filter">
            <div className="search-container">
              <h1>Filter</h1>
              <Search
                type="search"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search fish by name"
                style={{ width: 400 }}
              ></Search>
            </div>
            <div className="filter-container">
              <div className="breed-filter">
                <TreeSelect
                  treeData={originTreeData}
                  value={selectedOrigins}
                  onChange={handleOriginChange}
                  multiple
                  placeholder="Select origin"
                  style={{ width: 400, marginBottom: 20, marginTop: 20 }}
                />
              </div>
              <div className="size-filter">
                <TreeSelect
                  treeData={sizeTreeData}
                  value={selectedSizes}
                  onChange={handleSizeChange}
                  multiple
                  placeholder="Select size"
                  style={{ width: 400 }}
                />
              </div>
              <div className="price-filter">
                <Slider
                  range
                  min={100000}
                  max={100000000}
                  defaultValue={[100000, 100000000]}
                  value={priceRange}
                  onChange={handlePriceChange}
                />
                <div className="price-range">
                  <span style={{ fontSize: 16 }}>
                    Price: ${priceRange[0]} - ${priceRange[1]}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col span={18}>
          <div className="banner">
            <img
              src="https://img.freepik.com/premium-photo/set-koi-carps_933530-3237.jpg"
              alt="banner"
            />
          </div>
          <div className="sort-container">
            <div>Sort By</div>
            <Select
              value={sortOrder}
              onChange={handleSortChange}
              style={{ width: 200 }}
            >
              <Select.Option value="price-asc">
                Price (Low to High)
              </Select.Option>
              <Select.Option value="price-desc">
                Price (High to Low)
              </Select.Option>
            </Select>
          </div>
          <div className="filter-tags">
            {selectedOrigins.length > 0 && (
              <Tag
                style={{
                  fontSize: 16,
                  padding: "8px 16px",
                  borderRadius: 5,
                }}
                color="blue"
                closable
                onClose={() => setSelectedOrigins([])}
              >
                Breed: {selectedOrigins.join(", ")}
              </Tag>
            )}
            {selectedSizes.length > 0 && (
              <Tag
                style={{
                  fontSize: 16,
                  padding: "8px 16px",
                  borderRadius: 5,
                }}
                color="blue"
                closable
                onClose={() => setSelectedSizes([])}
              >
                Size: {selectedSizes.join(", ")}
              </Tag>
            )}
            {priceRange[0] !== 0 ||
              (priceRange[1] !== 100 && (
                <Tag
                  style={{
                    fontSize: 16,
                    padding: "8px 16px",
                    borderRadius: 5,
                  }}
                  color="blue"
                  closable
                  onClose={() => setPriceRange([0, 100])}
                >
                  Price: ${priceRange[0]} - ${priceRange[1]}
                </Tag>
              ))}
            {searchQuery !== "" && (
              <Tag
                style={{
                  fontSize: 16,
                  padding: "8px 16px",
                  borderRadius: 5,
                }}
                color="blue"
                closable
                onClose={() => setSearchQuery("")}
              >
                Search: {searchQuery}
              </Tag>
            )}
          </div>

          <div className="fish-list">
            {paginatedFishs.map((fish) => (
              <ProductCard key={fish.id} fish={fish} />
            ))}
          </div>
          <div className="pagination">
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={filteredFishs.length}
              onChange={onChange}
            />
          </div>
          <FloatButton.BackTop />
        </Col>
      </Row>
    </div>
  );
};

export default BreedFishPage;
