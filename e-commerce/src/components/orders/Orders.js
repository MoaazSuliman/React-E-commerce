import React, { useContext, useEffect, useState } from "react";
import "./Orders.css";
import { Button } from "react-bootstrap";
import OrderForm from "./orderForm/OrderForm";
import axios from "axios";
import { Link } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoneIcon from "@mui/icons-material/Done";
import { OrdersContext } from "../Context/OrdersContext";

const Orders = () => {
  const { urlGetOrders } = useContext(OrdersContext);
  const [orders, setOrders] = useState([]);
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlGetOrders);
        // if()
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [urlGetOrders]);

  const handleProSearch = (newUrl) => {
    setOrders(newUrl); // Update the searchUrl state with the new URL
  };

  const handleAccept = (orderId) => {
    // Find the order with the given orderId
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        if (order.status === "IN_WAITING") {
          axios.post(
            `http://localhost:9090/moaaz/api/modernhome/orders/accept/${order.id}`
          );
          return { ...order, status: "IN_DELIVERY" };
        }
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  const handleDone = (orderId) => {
    const updatedOrders = orders.map((order) => {
      if (order.id === orderId) {
        if (order.status === "IN_DELIVERY") {
          axios.post(
            `http://localhost:9090/moaaz/api/modernhome/orders/complete/${order.id}`
          );
          return { ...order, status: "COMPLETED" };
        }
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  return (
    <div className="orders">
      <h2>our orders</h2>
      <OrderForm setGetUrl={handleProSearch} />
      <div style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th className="col-2">user name</th>

              <th className="col-2">address</th>
              <th className="col-1">status</th>
              <th className="col-2">phone</th>

              <th className="col-2">date</th>
              <th className="col-1">total</th>
              <th className="col-2">actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="col-2">{order.name}</td>
                <td className="col-2">{order.address}</td>
                <td className="col-1">{order.status}</td>
                <td className="col-2">{order.phone1}</td>

                <td className="col-2">{order.creationDate}</td>
                <td className="col-1">{order.total}</td>
                <td className="col-2">
                  <div className="admin_btns">
                    <Link to={`/ordersview/${order.id}`}>
                      <Button className="btn btn-primary">View</Button>
                    </Link>

                    <Button
                      className="btn btn-warning"
                      onClick={() => handleAccept(order.id)}
                      style={{
                        display:
                          order.status === "IN_WAITING" ? "block" : "none",
                      }}
                    >
                      <LocalShippingIcon />
                    </Button>

                    <Button
                      className="btn btn-success"
                      onClick={() => handleDone(order.id)}
                      style={{
                        display:
                          order.status === "IN_DELIVERY" ? "block" : "none",
                      }}
                    >
                      <DoneIcon />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;

// IN_WAITING,
// IN_DELIVERY,
// COMPLETED
