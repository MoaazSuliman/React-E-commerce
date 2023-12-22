import React from "react";
import Cart from "../Cart/Cart";
const Home = () => {
  return (
    <div className="home container">
      <div className="row">
        <Cart />
        <Cart />
        <Cart />
        <Cart />
        <Cart />
        <Cart />
      </div>
    </div>
  );
};

export default Home;
