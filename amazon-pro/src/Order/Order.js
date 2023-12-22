import React, { useState, useEffect } from "react";
import "./Order.css";
import axios from "axios";
import { useAuth } from "../context/GlobalState";
import { useParams } from "react-router-dom";
import CheckoutProducts from "../card/CheckoutProducts";

const Order = () => {
  const { user } = useAuth();
  const [ordersDetails, setOrdersDetails] = useState({});
  const { Ordersid } = useParams();
  console.log(Ordersid);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/moaaz/api/modernhome/orders/${Ordersid}`
        );
        console.log("ordersDetails", response.data);
        setOrdersDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      fetchData();
    }
  }, [Ordersid]);

  return (
    <div className="order container">
      <h1>Your orders</h1>
      <div>
        <div>
          <CheckoutProducts
            id={ordersDetails.id}
            name={ordersDetails.name}
            details={ordersDetails.details}
            categoryName={ordersDetails.categoryName}
            creationDate={ordersDetails.creationDate}
            price={ordersDetails.price}
            total={ordersDetails.total}
            image={ordersDetails?.images || []}
          />
        </div>
      </div>
    </div>
  );
};

export default Order;


