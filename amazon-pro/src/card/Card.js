import { React } from "react";
import "./card.css";
import CheckoutProducts from "./CheckoutProducts";
import SubTotal from "./SubTotal";
import { useAuth } from "../context/GlobalState";

const Card = () => {
  const { user, basket } = useAuth();

  return (
    <div className="main-card container">
      <div className="head">
        <h3>hello {user ? user.name : "Guest"}</h3>
        <h2>your shoping basket </h2>
        <p>
          complete your order and earn 3,389 points for a discount on a future
          purchase .
        </p>
      </div>
      <div className="content">
        <div>
          <CheckoutProducts basket={basket}/>
        </div>
        <div className="total-Price">
          <SubTotal />
        </div>
      </div>
    </div>
  );
};

export default Card;
