import React from 'react'
import "./Header.css";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
    <div className="header">
      <img
        className="header_logo border_white"
        src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
        alt=''
      />
      <div className="header_search">
        <input className="header_searchInput" />
        <SearchIcon className="header_searchIcon" />
      </div>
      <div className="header_nav">
        < Link to="/signin">
        <div className="header_option border_white">
          <span className="header_optionLineOne">Hello</span>
          <span className="header_optionLineTwo">sign in</span>
        </div>
        </Link>
        <div className="header_option border_white">
          <span className="header_optionLineOne">returns</span>
          <span className="header_optionLineTwo">& orders</span>
        </div>

        <div className="header_optionBasket border_white">
          <ShoppingBasketIcon />
          <span className="header_optionLineTwo header_optionBasketCount">
            0
          </span>
        </div>
      </div>
    </div>

  </>
  )
}

export default Header