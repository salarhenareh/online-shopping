import { useState } from "react";
import { useProductsActions } from "../../Providers/ProductProvider/ProductProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ filter, ticked, getSearched }) => {
  const dispatch = useProductsActions();
  const [value, setValue] = useState("");


  const searchHandler = (e) => {
    dispatch({ type: "filter", event: filter });
    dispatch({ type: "checked", event: ticked });
    dispatch({ type: "search", event: e });
    setValue(e.target.value);

    getSearched(e.target.value)
  };

  return (
    <div>
      <form className="searchForm">
        <div className="shadow"></div>
        <input
          type="text"
          placeholder="Search for items and brands..."
          name="search"
          className="searchInput"
          onChange={searchHandler}
          value={value}
        ></input>
        <button className="searchBtn">
          <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
