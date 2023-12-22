import React from "react";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios"; 
import { Link } from "react-router-dom";
import AlertDialog from "../../Dialog/AlertDialog";
const AddEmployee = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogText ,setDialogText]=useState()
  const [inputsData, setInputsData] = useState({
    name: "",
    email: "",
    address: "",
    phone1: "",
    password: "",
  });
  const urlAddEmployee = "http://localhost:9090/moaaz/api/modernhome/employees";

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const postData = {
      name: inputsData.name,
      email: inputsData.email,
      address: inputsData.address,
      phone1: inputsData.phone1,
      password: inputsData.password,
    };
  
    axios
      .post(urlAddEmployee, postData)
      .then((response) => {
        console.log("Category added successfully", response.data);
        setDialogText("Added Successfully");
        setIsDialogOpen(true);
        setInputsData({
          name: "",
          email: "",
          address: "",
          phone1: "",
          password: "",
        });
      })
      .catch((error) => {
        console.error("Error adding category:", error);
        setDialogText("An error in email. Please try again with later.");
        setIsDialogOpen(true);
      });
  };

  const btnIsDisabled =
    inputsData.name === "" ||
    inputsData.email === "" ||
    inputsData.phone1 === "" ||
    inputsData.password === "";

  return (
    <div className="add-categories">
      <h2>employee</h2>
      <form>
        <div className="column">
          <label>employee name</label>
          <input
            type="text"
            placeholder="Enter employee name"
            value={inputsData.name}
            onChange={(e) =>
              setInputsData({ ...inputsData, name: e.target.value })
            }
          />
        </div>
        <div className="column">
          <label>email </label>
          <input
            type="text"
            placeholder="Enter Email"
            value={inputsData.email}
            onChange={(e) =>
              setInputsData({ ...inputsData, email: e.target.value })
            }
          />
        </div>
        <div className="column">
          <label>address </label>
          <input
            type="text"
            placeholder="Enter Address"
            value={inputsData.address}
            onChange={(e) =>
              setInputsData({ ...inputsData, address: e.target.value })
            }
          />
        </div>
        <div className="column">
          <label>phone </label>
          <input
            type="text"
            placeholder="Enter phone"
            value={inputsData.phone1}
            onChange={(e) =>
              setInputsData({ ...inputsData, phone1: e.target.value })
            }
          />
        </div>
        <div className="column">
          <label>password </label>
          <input
            type="text"
            placeholder="Enter password"
            value={inputsData.password}
            onChange={(e) =>
              setInputsData({ ...inputsData, password: e.target.value })
            }
          />
        </div>
        <div className="buttons">
          <Button
            disabled={btnIsDisabled}
            variant="info"
            onClick={handleFormSubmit}
          >
            Add
          </Button>
          <Link to="/employee">
            <Button variant="info">Back</Button>
          </Link>
        </div>
      </form>
      <AlertDialog
        isOpen={isDialogOpen}
        dialogText={dialogText}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default AddEmployee;
