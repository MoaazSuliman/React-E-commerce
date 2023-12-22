import React, { useState } from "react";
import "./Signup.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/GlobalState";
import logo from "../assets/2.jpeg";
const Signin = () => {
  const { dispatch } = useAuth();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    PasswordConfirmation: "",
    address: "",
    gender: "",
  });
  const navigate = useNavigate();
  function handelFormSubmit(e) {
    e.preventDefault();
    const postData = {
      name: data.firstName + " " + data.lastName,
      email: data.email,
      address: data.address,
      phone1: data.phone,
      password: data.password,
    };
    axios
      .post(
        `http://localhost:9090/moaaz/api/modernhome/users/register`,
        postData
      )
      .then((response) => {
        console.log("signup added successfully", response.data);
        dispatch({
          type: "SET_USER",
          user: response.data,
        });
        navigate("/");
        setData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
          PasswordConfirmation: "",
          address: "",
          gender: "",
        });
      })
      .catch((error) => {
        console.error("error signup:", error);
      });
  }
  console.log(data);
  const btnIsDisabled =
    data.firstName === "" ||
    data.lastName === "" ||
    // !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email) ||
    data.phone.length >= 15 ||
    data.phone === "" ||
    data.password === "" ||
    data.password !== data.PasswordConfirmation ||
    data.address === "" ||
    data.gender === "";

  return (
    <div className="signin_container">
      <div className="container">
        <div className="signin_logo_father">
          <Link to="/">
      
      
              <img className="signin_logo" src={logo} alt="" />
          </Link>
        </div>

        <Form className="signin_form my-3">
          <h2>Signup</h2>
          <Form.Group className="mb-3">
            <Form.Label> first name</Form.Label>
            <Form.Control
              type="text"
              placeholder="first name"
              value={data.firstName}
              onChange={(e) => setData({ ...data, firstName: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label> last name</Form.Label>
            <Form.Control
              type="text"
              placeholder="last name"
              value={data.lastName}
              onChange={(e) => setData({ ...data, lastName: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>phone</Form.Label>
            <Form.Control
              type="number"
              placeholder="phone"
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password confirmation</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password confirmation"
              value={data.PasswordConfirmation}
              onChange={(e) =>
                setData({ ...data, PasswordConfirmation: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              placeholder="Address"
              value={data.address}
              onChange={(e) => setData({ ...data, address: e.target.value })}
            />
          </Form.Group>
          {/* gender */}
          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Form.Label as="legend" column sm={2}>
                gender
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  type="radio"
                  label="male"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                  value={data.gender}
                  onClick={() => setData({ ...data, gender: "male" })}
                />
                <Form.Check
                  type="radio"
                  label="female"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                  value={data.gender}
                  onClick={() => setData({ ...data, gender: "famale" })}
                />
              </Col>
            </Form.Group>
          </fieldset>
          <Button
            variant="warning"
            type="submit"
            onClick={handelFormSubmit}
            disabled={btnIsDisabled}
          >
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Signin;
