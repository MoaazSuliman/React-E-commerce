import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form, FormControl, FormGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "./UpdateProduct.css";
import AvatarAddProduct from "../../Avatars/AvatarAddProduct";
function UpdateProduct() {
  const [categories, setCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  // const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [inputsData, setInputsData] = useState({
    name: "",
    details: "",
    categoryId: "",
    price: "",
    discount: "",
    image: [],
  });
  const { idUpdateProducts } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/moaaz/api/modernhome/products/getById/${idUpdateProducts}`
        );
        setCategories(response.data);
        // if (response.data.length > 0) {
        //   setInputsData((prevInputsData) => ({
        //     ...prevInputsData,
        //     categoryId: response.data[0].id,
        //   }));
        // }
        setInputsData(response.data)
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [idUpdateProducts]);

  function handelFormSubmit(e) {
    e.preventDefault();
    axios
      .put(
        `http://localhost:9090/moaaz/api/modernhome/products/${idUpdateProducts}`,
        inputsData
      )
      .then((response) => {
        console.log("Category updated successfully!", response);
        // setIsDialogOpen(true);
       
      })
      .catch((error) => {
        console.error("Error updating category!:", error);
      });
    setInputsData({
      ...inputsData,
      name: "",
      details: "",
      categoryId: "",
      price: "",
      discount: "",
      image: [],
    });
  }

  const btnIsDisabled = inputsData.name === "";
  return (
    <div className="update-product">
      <Form className="form">
        <FormGroup className="mb-2 was-validated">
          <div className="column">
            <Form.Label>name</Form.Label>
            <FormControl
              type="text"
              required
              placeholder="Entercategory name"
              value={inputsData.name}
              onChange={(e) =>
                setInputsData({ ...inputsData, name: e.target.value })
              }
            />
            <div className="invalid-feedback">please enter name.</div>
          </div>
        </FormGroup>
        <div className="column">
          <label>details</label>
          <input
            type="text"
            placeholder="Enter  details"
            value={inputsData.details}
            onChange={(e) =>
              setInputsData({ ...inputsData, details: e.target.value })
            }
          />
        </div>
        <div className="column">
          <label>category</label>
          <select
            placeholder="Enter name category"
            value={inputsData.categoryId}
            onChange={(e) =>
              setInputsData({ ...inputsData, categoryId: e.target.value })
            }
          >
            {/* {categories.map((category) => ( */}
            {/* <option key={category.id} value={category.id}>
              {category.name}
            </option> 
          // ))}*/}
          </select>
        </div>
        <FormGroup className="mb-2 was-validated">
          <div className="column">
            <Form.Label>price </Form.Label>
            <FormControl
              type="number"
              placeholder="Enter price"
              required
              value={inputsData.price}
              onChange={(e) =>
                setInputsData({ ...inputsData, price: e.target.value })
              }
            />
            <div className="invalid-feedback">please enter price.</div>
          </div>
        </FormGroup>
        <div className="column">
          <label>Discount% </label>
          <input
            type="number"
            placeholder="Enter discount"
            value={inputsData.discount}
            onChange={(e) =>
              setInputsData({ ...inputsData, discount: e.target.value })
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
          <Link to="/products">
            <Button variant="info">Back</Button>
          </Link>
        </div>
      </Form>
      <br />
      <hr />
      <br />
      <AvatarAddProduct onImagesChange={setSelectedImages} />
    </div>
  );
}

export default UpdateProduct;
