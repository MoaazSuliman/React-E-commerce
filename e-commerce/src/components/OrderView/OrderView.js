import React, { useEffect, useState } from "react";
import "./OrderView.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const OrderView = () => {
  const { idOrderView } = useParams();
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/moaaz/api/modernhome/orders/${idOrderView}`
        );
        console.log(response);
        setOrder(response.data);
        setProducts(response.data.productCartResponses);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [idOrderView]);

  return (
    <div className="view-order">
      <h2>order</h2>
      <div className="view-order-code">
        {" "}
        <h3>
          <span className="order-code">order code :</span>{" "}
          <span> {order.code}</span>
        </h3>
      </div>

      <div style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th className="col-1">
                item
                <br /> name
              </th>

              <th className="col-4">images</th>

              <th className="col-1">price</th>
              <th className="col-2">
                price after <br /> discount
              </th>
              <th className="col-1">quantity</th>
              <th className="col-1">total</th>
              <th className="col-2">actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((order) => (
              <tr key={order.id}>
                <td className="col-1">{order.productResponse.name}</td>

                <td className="col-4">
                  <img
                    src={order.productResponse.images[0]}
                    alt=""
                    style={{
                      width: "100%",
                      maxHeight: "150px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td className="col-1">{order.productResponse.price}</td>
                <td className="col-2">{order.productResponse.total}</td>
                <td className="col-1">{order.quantity}</td>
                <td className="col-1">
                  {order.quantity * order.productResponse.total}
                </td>
                <td className="col-2">actions</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="view-order-total">
        <h3>
          total : <span> {order.total}</span> EGP
        </h3>
      </div>
    </div>
  );
};

export default OrderView;
