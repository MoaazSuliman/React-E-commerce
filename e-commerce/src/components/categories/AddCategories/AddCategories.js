import React from "react";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AddCategories.css";
import AlertDialog from "../../Dialog/AlertDialog";

const AddCategories = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inputsData, setInputsData] = useState({
    name: "",
    details: "",
  });
  const urlAddCategory = "http://localhost:9090/moaaz/api/modernhome/categories";

  function handelFormSubmit(e) {
    e.preventDefault();
    // Create a data object to send with the POST request
    const postData = {
      name: inputsData.name,
      details: inputsData.details,
    };
    // Make the Axios POST request
    axios
      .post(urlAddCategory, postData)
      .then((response) => {
        console.log("Category added successfully", response.data);
        setIsDialogOpen(true);
        setInputsData({
          name: "",
          details: "",
        });
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  }
  const btnIsDisabled = inputsData.name === "";
  return (
    <div className="add-categories">
      <form>
        <div className="column">
          <label>category name</label>
          <input
            type="text"
            placeholder="Enter category name"
            value={inputsData.name}
            onChange={(e) =>
              setInputsData({ ...inputsData, name: e.target.value })
            }
          />
        </div>
        <div className="column">
          <label>Details </label>
          <input
            type="text"
            placeholder="Enter Details"
            value={inputsData.details}
            onChange={(e) =>
              setInputsData({ ...inputsData, details: e.target.value })
            }
          />
        </div>
        <div className="buttons">
          <Button
            disabled={btnIsDisabled}
            variant="info"
            onClick={handelFormSubmit}
          >
            Add
          </Button>
          <Link to="/categories">
            <Button variant="info">Back</Button>
          </Link>
        </div>
      </form>
      <AlertDialog
        isOpen={isDialogOpen}
        dialogText={"Added Succesfully"}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default AddCategories;
