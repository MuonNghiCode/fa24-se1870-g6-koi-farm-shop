import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../../components/product-card";
import "./index.scss"; // Import CSS để điều chỉnh layout
import { Link, useLocation } from "react-router-dom";
import { Breadcrumb, Col } from "antd";
import ImageFrame from "../../components/home/ImageFrame";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const AllFishPage = () => {
  const [allFish, setAllFish] = useState([]);
  const [fishByBreed, setFishByBreed] = useState({});
  const [currentPage, setCurrentPage] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  const itemsPerPage = 4; // Số lượng sản phẩm mỗi trang

  // Fetch tất cả dữ liệu về cá
  const fetchAllFish = async () => {
    const response = await axios.get(
      "https://66fe08fb699369308956d74e.mockapi.io/KoiProduct"
    );
    const fishData = response.data;
    setAllFish(fishData);
    categorizeFishByBreed(fishData); // Phân loại cá theo thuộc tính breed
  };

  // Hàm phân loại cá theo thuộc tính breed
  const categorizeFishByBreed = (fishData) => {
    const breedMap = fishData.reduce((acc, fish) => {
      const breed = fish.breed; // Lấy thuộc tính breed từ API
      if (!acc[breed]) {
        acc[breed] = []; // Khởi tạo mảng cho breed mới
      }
      acc[breed].push(fish); // Gom cá theo từng breed
      return acc;
    }, {});
    setFishByBreed(breedMap); // Lưu lại danh sách cá đã phân loại

    // Khởi tạo trang hiện tại cho mỗi breed
    const initialPageState = {};
    Object.keys(breedMap).forEach((breed) => {
      initialPageState[breed] = 1; // Bắt đầu từ trang 1 cho mỗi breed
    });
    setCurrentPage(initialPageState);
  };

  useEffect(() => {
    fetchAllFish(); // Fetch dữ liệu về cá khi component được mount
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const query = params.get("search");
    setSearchQuery(query || "");
  }, [location.search]);

  // Hàm điều khiển chuyển trang
  const handlePageChange = (breed, direction) => {
    setCurrentPage((prevState) => {
      const newPage = prevState[breed] + direction;
      return {
        ...prevState,
        [breed]: newPage,
      };
    });
  };

  const filterFishBySearch = (fish) => {
    if (!searchQuery) return true;
    return fish.name.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <div>
      <Col span={24}>
        <div className="breadcrumb-container">
          <Breadcrumb className="breadcrumb" separator=">">
            <Breadcrumb.Item href="/">
              <FontAwesomeIcon icon={faHome} className="icon"></FontAwesomeIcon>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Product List</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </Col>

      {searchQuery && <h2>Search results for: {searchQuery}</h2>}

      {Object.keys(fishByBreed).map((breed) => {
        const breedFish = fishByBreed[breed].filter(filterFishBySearch);
        if (breedFish.length === 0) return null;

        const currentPageForBreed = currentPage[breed] || 1;
        const startIndex = (currentPageForBreed - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const fishToDisplay = breedFish.slice(startIndex, endIndex);

        return (
          <div key={breed}>
            <ImageFrame />
            <Link to={`/breed/${breed}`}>
              <div className="breed-link">{breed}</div>
            </Link>
            <div className="fish-list">
              <button
                className="nav__button left"
                onClick={() => handlePageChange(breed, -1)}
                disabled={currentPageForBreed === 1}
              >
                &lt;
              </button>
              {fishToDisplay.map((fish) => (
                <ProductCard fish={fish} key={fish.id} />
              ))}
              <button
                className="nav__button right"
                onClick={() => handlePageChange(breed, 1)}
                disabled={endIndex >= breedFish.length}
              >
                &gt;
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AllFishPage;
