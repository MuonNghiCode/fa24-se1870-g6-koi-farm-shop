import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Autosuggest from "react-autosuggest";
import axios from "axios";
import config from "../../config/config";
import "./AutoSuggest.scss";

const EnhancedSearchBar = () => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [fishes, setFishes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFishes = async () => {
      try {
        const response = await axios.get(`${config.API_ROOT}fishs`);
        setFishes(response.data);
      } catch (error) {
        console.error("Error fetching fishes:", error);
      }
    };
    fetchFishes();
  }, []);

  const getSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.trim().toLowerCase();
    return fishes.filter((fish) =>
      fish.name.toLowerCase().includes(inputValueLowerCase)
    );
  };

  const getSuggestionValue = (suggestion) => suggestion.name;

  const renderSuggestion = (suggestion) => (
    <div>
      <strong>{suggestion.name}</strong> - {suggestion.breed}
    </div>
  );

  const onChange = (event, { newValue }) => {
    setValue(newValue);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    navigate(`/products/${suggestion.fishId}`);
  };

  const handleSearch = () => {
    if (value.trim()) {
      navigate(`/products?search=${encodeURIComponent(value.trim())}`);
    }
  };

  const inputProps = {
    placeholder: "Tìm kiếm cá",
    value,
    onChange: onChange,
  };

  return (
    <div
      className="search-bar"
      style={{ zIndex: "1003", position: "relative" }}
    >
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
        onSuggestionSelected={onSuggestionSelected}
      />
      <button onClick={handleSearch} style={{ margin: "0" }}>
        Tìm kiếm
      </button>
    </div>
  );
};

export default EnhancedSearchBar;
