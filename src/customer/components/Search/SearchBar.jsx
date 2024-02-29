import React, { useEffect, useState } from "react";
import Autosuggest from "react-autosuggest";
import request from "../../../utils/request";
import { TERipple } from "tw-elements-react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [value, setValue] = useState("");
  const [suggestionsList, setSuggestionsList] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await request.get(`/getData/search`);
        const data = res.data;
        if (data) {
          setSuggestions([...data]);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };
    fetchApi();
  }, []);
  const getSuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.toLowerCase();
    const filteredSuggestions = suggestions.filter((product) =>
      product.name.toLowerCase().includes(inputValueLowerCase)
    );
    return filteredSuggestions.slice(0, 10);
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestionsList(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestionsList([]);
  };

  const onChange = (event, { newValue }) => {
    setValue(newValue?.name ? newValue?.name : newValue);
  };

  const getSuggestionValue = (suggestion) => suggestion;

  const renderSuggestion = (suggestion) => <div>{suggestion?.name}</div>;

  const onSuggestionSelected = (event, { suggestion }) => {
    event.preventDefault();
    navigate(`product-detail/${suggestion?.id}`);
  };
  const inputProps = {
    placeholder: "Enter product name",
    value,
    onChange: onChange,
  };

  return (
    <div className="md:w-200 mx-auto">
      <div className="relative flex w-full flex-wrap items-stretch">
        <Autosuggest
          id="search"
          suggestions={suggestionsList}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={onSuggestionSelected}
          inputProps={inputProps}
        />
        <button
          className="bg-gray-500 hover:bg-blue-500 text-white py-2 px-2 my-2 rounded"
          onClick={(e) => {
            e.preventDefault();
            if (value && value !== "") {
              navigate(`products/search/${value}`);
            } else {
              navigate(`products`);
            }
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
