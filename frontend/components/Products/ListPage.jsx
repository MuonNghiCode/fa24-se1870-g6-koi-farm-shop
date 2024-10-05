import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "antd/lib/input/Search";
import { Breadcrumb } from "antd";
import {
  Row,
  Col,
  Pagination,
  Select,
  TreeSelect,
  Slider,
  FloatButton,
  Tag,
} from "antd";
import ProductCard from "../../pages/product/productCard/ProductCard";

function ListPage() {
  const [FishData, setFishData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedBreeds, setSelectedBreeds] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100]);

  async function fetchFishs() {
    try {
      const response = await axios.get(
        "https://66e819cfb17821a9d9db5f77.mockapi.io/Koi"
      );
      console.log(response.data);
      setFishData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchFishs();
  }, []);

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

  const handleBreedChange = (value) => {
    setSelectedBreeds(value);
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

  const breeds = [...new Set(FishData.map((Fish) => Fish.breed))];
  const sizes = [...new Set(FishData.map((Fish) => Fish.size))];

  const breedTreeData = breeds.map((breed) => ({
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
      ? FishData.filter((Fish) => {
          if (selectedBreeds.length === 0) return true;
          return selectedBreeds.includes(Fish.breed);
        })
          .filter((Fish) => {
            if (selectedSizes.length === 0) return true;
            return selectedSizes.includes(Fish.size);
          })
          .filter((Fish) => {
            return Fish.price >= priceRange[0] && Fish.price <= priceRange[1];
          })
      : FishData.filter((Fish) => {
          return (
            Fish.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
            (selectedBreeds.length === 0 ||
              selectedBreeds.includes(Fish.breed)) &&
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
    <div className="list-page-container">
      <Row>
        <Col span={24}>
          <div className="breadcrumb-container">
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
              <Breadcrumb.Item>Product List</Breadcrumb.Item>
            </Breadcrumb>
          </div>
        </Col>
      </Row>
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
                  treeData={breedTreeData}
                  value={selectedBreeds}
                  onChange={handleBreedChange}
                  multiple
                  placeholder="Select breed"
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
                  min={0}
                  max={100}
                  defaultValue={[0, 100]}
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
            {selectedBreeds.length > 0 && (
              <Tag
                style={{
                  fontSize: 16,
                  padding: "8px 16px",
                  borderRadius: 5,
                }}
                color="blue"
                closable
                onClose={() => setSelectedBreeds([])}
              >
                Breed: {selectedBreeds.join(", ")}
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

          <div className="product-list">
            {paginatedFishs.map((Fish) => (
              <ProductCard
                key={Fish.id}
                title={Fish.name}
                price={Fish.price}
                imageSrc={Fish.imgpath}
                breed={Fish.breed}
                id={Fish.id}
              />
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
}

export default ListPage;
