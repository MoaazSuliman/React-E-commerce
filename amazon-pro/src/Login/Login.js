import { useState, React } from "react";
import "./Login.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";
import { useAuth } from "../context/GlobalState";
import logo from "../assets/2.jpeg"
const Login = () => {
  const [error, setError] = useState("");
  const [inputsData, setInputsData] = useState({
    email: "",
    password: "",
  });
  const {dispatch } = useAuth();
  const navigate = useNavigate();

 

  function handelFormSubmit(e) {
    e.preventDefault();
    // convert data to (key , value)
    const postData = new URLSearchParams();
    postData.append("email", inputsData.email);
    postData.append("password", inputsData.password);

    axios
      .post(`http://localhost:9090/moaaz/api/modernhome/auth/login`, postData)
      .then((response) => {
        console.log("login added successfully", response.data);
        dispatch({
          type: "SET_USER",
          user: response.data,
        });
        navigate("/");
        setInputsData({
          ...inputsData,
          email: "",
          password: "",
        });
      })
      .catch((error) => {
        console.error("Error login:", error);
        setError(error.response.data);
      });
  }
  const btnIsDisabled =
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
      inputsData.email
    ) || inputsData.password.length < 0;

  return (
    <div className="login">
      <div>
        <Link to="/">
          <img
            className="login-logo"
            src={logo}
            alt=""
          />
        </Link>
      </div>
      <Form className="login-form my-3  container">
        <h2>Login</h2>
        <Form.Group className="mb-3 was-validated" controlId="formBasicEmail">
          <Form.Label className="form-label">Email </Form.Label>
          <Form.Control
            type="email"
            placeholder="email"
            pattern="/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/" // error because not effective with button
            required
            value={inputsData.email}
            onChange={(e) =>
              setInputsData({ ...inputsData, email: e.target.value })
            }
          />
          <div className="invalid-feedback">
            Please enter a valid email address.
          </div>
        </Form.Group>

        <Form.Group
          className="mb-3 was-validated"
          // controlId="formBasicPassword"
        >
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            value={inputsData.password}
            onChange={(e) =>
              setInputsData({ ...inputsData, password: e.target.value })
            }
          />
          {/* <div className="invalid-feedback">
            Password must be at least 8 characters.
          </div> */}
        </Form.Group>
        <div style={{ color: "red", margin: "3px 0", textAlign: "center" }}>
          {error}
        </div>
        <div className="forgetPassword">
          <Link to="/forgetpassword"><p>forget password ?</p></Link>
        </div>
        <Button
          variant="warning"
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

export default Login;
