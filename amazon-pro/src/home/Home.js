import React from "react";
import "./Home.css";
import Slider from "../Slider/Slider";
import Products from "../products/Products";

const Home = () => {
  const images = [
    "https://m.media-amazon.com/images/I/61lwJy4B8PL._SX3000_.jpg",
  ];
  
  return (
    <div className="home">
      <div className="home_container">
        <Slider images={images} />
        <Products />
      </div>
    </div>
  );
};

export default Home;
