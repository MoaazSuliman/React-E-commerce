import { React, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/GlobalState";
import "./ForgetPassword.css";
import AlertDialog from "../Dialog/AlertDialog";

const ForgetPassword = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogText, setDialogText] = useState("");
  //   const [error, setError] = useState("");
  const [inputsData, setInputsData] = useState({
    email: "",
  });
  const { user } = useAuth();
  console.log(user?.email);
  const navigate = useNavigate();

  function handelFormSubmit(e) {
    e.preventDefault();
    // convert data to (key , value)
    const postData = new URLSearchParams();
    postData.append("email", inputsData.email);

    axios
      .post(
        `http://localhost:9090/moaaz/api/modernhome/auth/forgetPassword`,
        postData
      )
      .then((response) => {
        console.log("login added successfully", response.data);
        setDialogText(`Sent Successfully`);
        setIsDialogOpen(true);
        setTimeout(() => {
          navigate("/login");
        }, 1500);
        setInputsData({
          ...inputsData,
          email: "",
        });
      })
      .catch((error) => {
        console.error("Error login:", error);
        // setError(error.response.data);
        setDialogText(error.response.data);
        setIsDialogOpen(true);
      });
  }
  const btnIsDisabled =
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(inputsData.email);
  return (
    <div className="forget-password">
      <div>
        <Link to="/">
          <img
            className="forget-password-logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
            alt=""
          />
        </Link>
      </div>
      <Form className="forget-password-form my-3  container">
        <h2>forget password</h2>
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

        {/* <Form.Group
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
            <div className="invalid-feedback">
             Password must be at least 8 characters.
           </div> 
        </Form.Group> */}
        {/* <div style={{ color: "red", margin: "3px 0", textAlign: "center" }}>
          {error}
        </div> */}
        <Button
          variant="warning"
          type="submit"
          disabled={btnIsDisabled}
          onClick={handelFormSubmit}
        >
          Send
        </Button>
      </Form>
      <AlertDialog
        isOpen={isDialogOpen}
        dialogText={dialogText}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default ForgetPassword;
