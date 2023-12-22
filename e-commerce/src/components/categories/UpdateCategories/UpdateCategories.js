import React from "react";
import Button from "react-bootstrap/Button";
import "./UpdateCategories.css";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import AlertDialog from "../../Dialog/AlertDialog";
const UpdateCategories = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inputsData, setInputsData] = useState({
    name: "",
    details: "",
  });
  const { idUpdateCategory } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/moaaz/api/modernhome/categories/${idUpdateCategory}`
        );
        setInputsData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [idUpdateCategory]);

  function handelFormSubmit(e) {
    e.preventDefault();
    axios
      .put(
        `http://localhost:9090/moaaz/api/modernhome/categories/update/${idUpdateCategory}`,
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
      details: "",
    });
  }

  const btnIsDisabled = inputsData.name === "";

  return (
    <div className="update-categories container">
      <h2>category</h2>
      <form>
        <div className="column">
          <label>name category </label>
          <input
            type="text"
            placeholder="Enter name category"
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
            update
          </Button>
          <Link to="/categories">
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

export default UpdateCategories;
