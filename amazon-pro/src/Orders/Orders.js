import React, { useEffect, useState } from "react";
import "./orders.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import { useAuth } from "../context/GlobalState";

const Orders = () => {
  const { user } = useAuth();
  const ordersUrl = `http://localhost:9090/moaaz/api/modernhome/orders/getAllForUserByUserId/${user.id}`;
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(ordersUrl);
        setOrders(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [ordersUrl]);
  return (
    <div className="orders container">
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>State</th>
            <th>creationDate</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td data-title="main year">{order.code}</td>
              <td data-title="State">{order.status}</td>
              <td data-title="creationDate">{order.creationDate}</td>
              <td data-title="Total">{order.total} EGP</td>
              <td data-title="Actions">
                <Link to={`/orders/${order.id}`}>
                  <Button className="btn btn-success">Details</Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
