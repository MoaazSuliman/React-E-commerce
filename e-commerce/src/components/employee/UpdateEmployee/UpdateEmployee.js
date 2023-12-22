import React from "react";
import { Link, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import AlertDialog from "../../Dialog/AlertDialog";
const UpdateEmployee = () => {
  const { idUpdateEmployee } = useParams();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inputsData, setInputsData] = useState({
    name: "",
    email: "",
    address: "",
    phone1:"",
    password:""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/moaaz/api/modernhome/employees/${idUpdateEmployee}`
        );
        setInputsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [idUpdateEmployee]);
  function handelFormSubmit(e) {
    e.preventDefault();
    axios
      .put(
        `http://localhost:9090/moaaz/api/modernhome/employees`,
        inputsData
      )
      .then((response) => {
        console.log("Category updated successfully!", response);
        setIsDialogOpen(true);
      })
      .catch((error) => {
        console.error("Error updating category!:", error);
      });
    setInputsData({
      ...inputsData,
      name: "",
    email: "",
    address: "",
    phone1:"",
    password:""
    });
  }
  const btnIsDisabled = inputsData.name === "";
  return (
    
      <div className="update-categories employee container">
        <h2>employee</h2>
        <form>
          <div className="column">
            <label>name </label>
            <input
              type="text"
              placeholder="Enter Name"
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
              onClick={handelFormSubmit}
            >
              update
            </Button>
            <Link to="/employee">
              <Button variant="info">back</Button>
            </Link>
          </div>
        </form>
        <AlertDialog
         isOpen={isDialogOpen}
         dialogText={"Updated Succesfully"}
       onClose={() => setIsDialogOpen(false)}
       />
      </div>

  );
};

export default UpdateEmployee;
