import React from "react";
import "./Payment.css";
import { Link } from "react-router-dom";
import { useAuth } from "../context/GlobalState";
import CheckoutProducts from "./CheckoutProducts";
import { getBasketTotal } from "./TotalPrice";
import axios from "axios";

//  Storage {user: '2', numItem_2: '1', numItem_1: '1', basket:
// '[{"id":2,"name":"moaaz2","categoryName":"Kitchen Tools","creationDate":"2023-11-23","details":"details2","discount":20,"images":["https://modern-home.s3.amazonaws.com/4f81a878-1ca9-467c-8805-668f6c761f5c.png","https://modern-home.s3.amazonaws.com/5a2f97b7-8fa0-4fac-bb2c-f2774e153c8b.png"],"price":200,"total":160},{"id":1,"name":"moaaz","categoryName":"Kitchen Tools","creationDate":"2023-11-23","details":"details","discount":20,"images":["https://modern-home.s3.amazonaws.com/0f6facc1-96b4-467d-8627-6617f63a22e6.png","https://modern-home.s3.amazonaws.com/b7eb20ac-7181-438b-a252-7d95995f667c.png"],"price":100,"total":80}]'

const Payment = () => {
  const { basket, user, dispatch } = useAuth();
  
  function buyNow(e) {
    e.preventDefault();
    // Check if basket is not empty
    if (basket.length > 0) {
      // Create an array to store product data
      const products = basket.map((item) => ({
        productId: item.id,
        quantity: localStorage.getItem(`numItem_${user.id}`),
      }));

      const postData = {
        productCartRequests: products,
        userId: user,
      };
      axios
        .post(
          `http://localhost:9090/moaaz/api/modernhome/orders/addOrder`,
          postData
        )
        .then((response) => {
          // Handle successful response
          console.log(response);
          dispatch({ type: "EMPTY_BASKET" });
        })
        .catch((error) => {
          // Handle error
          console.error(error);
        });
    }
  }
  return (
    <div className="payment">
      <div className="payment-container">
        <h2>
          checkout ( <Link to="/card">{basket.length} items </Link>)
        </h2>
        {/* delivery address */}

        <div className="payment-section">
          <div className="payment-title">
            <h3>delivery address</h3>
          </div>
          <div className="payment-address">
            <p>{user ? user.email : "Enter Your Email"}</p>
            <p>{user ? user.address : "Enter Your Address"}</p>
          </div>
        </div>
        {/*review items*/}

        <div className="payment-section">
          <div className="payment-title">
            <h3>review items and delivery</h3>
          </div>
          <div className="payment-items">
            <CheckoutProducts basket={basket}/>
          </div>
        </div>
        {/*payment method  */}
        <div className="payment-section">
          <h3>payment method</h3>
          {/* stripe card */}
          <div className="payment-details">
            <form>
              <div className="payment-pricecontainer">
                <h3>order total : {getBasketTotal(basket)} EGP</h3>
                <button onClick={buyNow}>buy now</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
