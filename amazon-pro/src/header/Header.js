import React, { useState, useContext } from "react";
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
import ProductContext from "../context/products/ProductContext";
import { useAuth } from "../context/GlobalState";
import AlertDialog from "../Dialog/AlertDialog";
import logo from "../assets/2.jpeg"
const Header = () => {
  const [inputSearch, setInputSearch] = useState();
  const { setUrlGetProducts } = useContext(ProductContext);
  const { user, basket, dispatch } = useAuth();

  const handleInputSearch = (e) => {
    const newSearchValue = e.target.value;
    setInputSearch(newSearchValue);
    if (newSearchValue === "") {
      const urlProSearch =
        "http://localhost:9090/moaaz/api/modernhome/products";
      setUrlGetProducts(urlProSearch);
    } else {
      // Perform the search
      const urlProSearch2 = `http://localhost:9090/moaaz/api/modernhome/products/search/${newSearchValue}`;
      setUrlGetProducts(urlProSearch2);
    }
  };
  const handleAuth = () => {
    dispatch({
      type: "REMOVE_USER",
    });
    // dispatch({
    //   type: "EMPTY_BASKET",
    // });
  };
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const dialogText = "Please Login first";
  const handleOrder = () => {
    if (!user) {
      setIsDialogOpen(true);
    }
  };
  return (
    <>
      <div className="header">
        <Link to="/">
          <img
            className="header_logo"
            src={logo}
            alt=""
          />
        </Link>
        <div className="header_search">
          <input
            className="header_searchInput"
            value={inputSearch}
            onChange={handleInputSearch}
          />
          <SearchIcon className="header_searchIcon" />
        </div>
        <div className="header_nav">
          {user ? (
            <Link to={!user && "/signin"}>
              <div className="header_option border_white" onClick={handleAuth}>
                <span className="header_optionLineOne">
                  Hello {user ? user.name : "Guest"}
                </span>
                <span className="header_optionLineTwo">
                  {user ? "Log out" : "Sign up"}
                </span>
              </div>
            </Link>
          ) : (
            <>
              <Link to={!user && "/signin"}>
                <div className="header_option border_white">
                  <span className="header_optionLineOne">
                    Hello {user ? user.name : "Guest"}
                  </span>
                  <span className="header_optionLineTwo">
                    {user ? "Log out" : "Sign up"}
                  </span>
                </div>
              </Link>
              <Link to={!user && "/login"}>
                <div
                  className="header_option border_white"
                  onClick={handleAuth}
                >
                  <span className="header_optionLineOne">
                    Hello {user ? user.name : "Guest"}
                  </span>
                  <span className="header_optionLineTwo">
                    {user ? "Log out" : "Log in"}
                  </span>
                </div>
              </Link>
            </>
          )}
          <Link to={user && "/orders"}>
            <div className="header_option border_white" onClick={handleOrder}>
              <span className="header_optionLineOne">returns</span>
              <span className="header_optionLineTwo">& orders</span>
            </div>
          </Link>
          <div className="header_optionBasket border_white">
            <Link to="/card">
              <ShoppingBasketIcon />
              <span className="header_optionLineTwo header_optionBasketCount">
                {basket.length}
              </span>
            </Link>
          </div>
        </div>
        <AlertDialog
          isOpen={isDialogOpen}
          dialogText={dialogText}
          onClose={() => setIsDialogOpen(false)}
          red
        />
      </div>
    </>
  );
};

export default Header;
