import { Link, NavLink } from "react-router-dom";
import "./Navigation.css";
import { IoIosBasket } from "react-icons/io";
import { FiHeart } from "react-icons/fi";
import { VscAccount } from "react-icons/vsc";
import { SiAircanada } from "react-icons/si";
import { useCart } from "../../Providers/CartProvider/CartProvider";
import { useAuth } from "../../Providers/AuthProvider/AuthProvider";
import SearchBar from "../../common/Search/SearchBar";
import { useProductsActions } from "../../Providers/ProductProvider/ProductProvider";
import { useEffect, useState } from "react";
import SelectComponent from "../../common/Select/SelectComponent";
import CheckedBox from "../../common/CheckedBox/CheckedBox";
import { useFavorite } from "../../Providers/FavoriteProvider/FavoriteProvider";

const filterOptions = [
  { value: "", label: "All" },
  { value: "men", label: "Men" },
  { value: "female", label: "Women" },
  { value: "kids", label: "Kids" },
];

const Navigation = () => {
  const { cart } = useCart();
  const userData = useAuth();
  const dispatch = useProductsActions();

  const { favorite } = useFavorite();

  const [filter, setFilter] = useState("");
  const [ticked, setTicked] = useState([""]);
  const [searched, setSearched] = useState("");

  const getChecked = (data) => {
    setTicked(data);
  };
  const getSearched = (data) => {
    setSearched(data);
  };

  const filterHandler = (selectedOption) => {
    dispatch({ type: "filter", event: selectedOption.value });
    dispatch({ type: "checked", event: ticked });
    setFilter(selectedOption.value);
  };

  return (
    <header className="mainNavigation">
      <div>
        <nav className="firstNavigation">
          <ul>
            <li>
              <NavLink to="/" className="logo">
                50Off
              </NavLink>
            </li>
          </ul>

          <div>
            <SelectComponent
              title="filter by Gender :"
              value={filter}
              onChange={filterHandler}
              options={filterOptions}
            />
          </div>

          <SearchBar
            filter={filter}
            ticked={ticked}
            getSearched={getSearched}
          />

          <ul>
            <li>
              <NavLink to="/">
                <SiAircanada className="countryIcon" />
              </NavLink>
            </li>
          </ul>

          <ul>
            <li>
              <NavLink to={userData ? "/profile" : "/login"}>
                <VscAccount className="profileIcon" />
              </NavLink>
            </li>
          </ul>

          <ul>
            <li>
              <NavLink to="/favorite">
                <FiHeart className="favoriteIcon" />
              </NavLink>
              <span className={favorite.length ? "favoriteItemNumber" : null}>
                {favorite.length ? `${favorite.length}` : null}
              </span>
            </li>
          </ul>

          <ul>
            <li className="cartLi">
              <NavLink to="/cart">
                <IoIosBasket className="basketIcon" />
              </NavLink>
              <span className={cart.length ? "cartItemNumber" : null}>
                {cart.length ? `${cart.length}` : null}
              </span>
            </li>
          </ul>
        </nav>
      </div>

      <div>
        <nav className="secondNavigation">
          <CheckedBox
            filter={filter}
            getChecked={getChecked}
            searched={searched}
          />
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
