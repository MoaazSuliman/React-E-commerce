import React from "react";
import "./SubTotal.css";
import { useAuth } from "../context/GlobalState";
import { useNavigate } from "react-router-dom";
import { getBasketTotal } from "./TotalPrice";
const SubTotal = () => {
  const navigate = useNavigate();
  const { basket } = useAuth();
  return (
    <div className="SubTotal">
      {/* <p style={{color:"red"}}>{basket.map((p)=>p.total)}</p> */}
      <p>
        SubTotal ({basket.length} items)
        <strong> {getBasketTotal(basket)} EGP</strong>
      </p>
      <small className="total-gift">
        <input type="checkbox" />
        this order contains a gift
      </small>
      <button onClick={() => navigate("/payment")}>Proceed To Checkout</button>
    </div>
  );
};

export default SubTotal;
