import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import "./OrderForm.css";
import axios from "axios";
const OrderForm = ({setGetUrl}) => {
  const [inputsData, setInputsData] = useState({
    fromDate: "",
    toDate: "",
    search: "",
  });
  const urlSaerchOrder = `http://localhost:9090/moaaz/api/modernhome/orders/getAllBySearch`;
  function handelFormSubmit(e) {
    e.preventDefault();
    const postData = {
      fromDate: inputsData.fromDate,
      toDate: inputsData.toDate,
      orderStatus: inputsData.search,
    }
    axios
      .get(urlSaerchOrder, postData)
      .then((response) => {
        console.log("Category added successfully", response.data);
        setGetUrl(urlSaerchOrder)
        setInputsData({
          search: "",
          fromDate: "",
          toDate: "",
        }); 
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  }
  const btnIsDisabled =
    (inputsData.search === "") &
    (inputsData.fromDate === "") &
    (inputsData.toDate === "");

  return (
    <div className="order-form container">
      <Form className="loginin_form my-3">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="form-label">search </Form.Label>
          <Form.Control
            type="text"
            placeholder="search"
            value={inputsData.search}
            onChange={(e) =>
              setInputsData({ ...inputsData, search: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>from Date</Form.Label>
          <Form.Control
            type="date"
            required
            value={inputsData.fromDate}
            onChange={(e) =>
              setInputsData({ ...inputsData, fromDate: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>to Date</Form.Label>
          <Form.Control
            type="date"
            required
            value={inputsData.toDate}
            onChange={(e) =>
              setInputsData({ ...inputsData, toDate: e.target.value })
            }
          />
        </Form.Group>
        <Button
          variant="info"
          type="submit"
          disabled={btnIsDisabled}
          onClick={handelFormSubmit}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default OrderForm;
