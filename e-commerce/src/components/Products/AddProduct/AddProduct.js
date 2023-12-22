import React from "react";
import { useState, useEffect, useRef } from "react";
import "./AddProduct.css";
import Button from "react-bootstrap/Button";
// import AvatarAddProduct from "../../Avatars/AvatarAddProduct";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, FormControl, FormGroup } from "react-bootstrap";
import Card from "react-bootstrap/Card";
const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [inputsData, setInputsData] = useState({
    name: "",
    details: "",
    categoryId: "",
    price: "",
    discount: "",
    image: [],
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/moaaz/api/modernhome/categories"
        );
        setCategories(response.data);
        if (response.data.length > 0) {
          setInputsData((prevInputsData) => ({
            ...prevInputsData,
            categoryId: response.data[0].id,
          }));
        }
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const urlAddProduct = "http://localhost:9090/moaaz/api/modernhome/products";

  function handelFormSubmit(e) {
    e.preventDefault();
    // Create a data object to send with the POST request
    const postData = {
      name: inputsData.name,
      details: inputsData.details,
      categoryId: inputsData.categoryId,
      price: inputsData.price,
      discount: inputsData.discount,
      images: inputsData.image,
    };
    console.log("Sending Object******", postData);

    // Make the Axios POST request
    axios
      .post(urlAddProduct, postData)
      .then((response) => {
        console.log("Product added successfully", response.data);
        setInputsData({
          name: "",
          details: "",
          categoryId: "",
          price: "",
          discount: "",
          image: [],
        });
        setSelectedImages([]);
        inputRefs.current = [];
      })
      .catch((error) => {
        console.error("Error adding category:", error);
      });
  }
  const btnIsDisabled = inputsData.name === "" || inputsData.price === "";
  //              ** * **   avatar   ** * **
  const inputRefs = useRef([]);
  const [cards, setCards] = useState([]);
  const cardsContainerRef = useRef([]);

  const scrollToAddCard = () => {
    const cardsContainer = cardsContainerRef.current;
    if (cardsContainer.children.length === 1) {
      const firstCard = cardsContainer.firstElementChild;
      firstCard.scrollIntoView({ behavior: "smooth" });
    } else {
      const lastCard = cardsContainer.lastChild;
      lastCard.scrollIntoView({ behavior: "smooth" });
    }
  };
  const handleImageChange = (event, cardIndex) => {
    const file = event.target.files[0];
    const updatedCards = [...cards];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // Convert the image to a base64-encoded string
        const base64Image = e.target.result;
        updatedCards[cardIndex].img = base64Image;
        setCards(updatedCards);
        setSelectedImages(updatedCards.map((card) => card.img));
      };
      reader.readAsDataURL(file);
    }
  };

  const addCard = () => {
    const newCard = {
      id: Date.now(),
      img: "",
    };

    const updatedCards = [...cards, newCard];
    setCards(updatedCards);
  };

  // Function to delete a card
  const deleteCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);
  };
  return (
    <div className="add-product">
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
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
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
            Submit
          </Button>
          <Link to="/products">
            <Button variant="info">Back</Button>
          </Link>
        </div>
      </Form>
      <br />
      <hr />
      <br />
      {/* <AvatarAddProduct onImagesChange={setSelectedImages} /> */}
      <div className="avatar-add-product">
        <div className="main" ref={cardsContainerRef}>
          <div className="global-buttons">
            <Button
              variant="primary"
              onClick={() => {
                addCard();
                scrollToAddCard();
              }}
            >
              Add New Image
            </Button>
          </div>

          {cards.map((card, index) => (
            <Card key={card.id} style={{ width: "18rem" }}>
              <Card.Img
                className="card-img-top"
                style={{ width: "100%", maxHeight: "300px" }}
                src={card.img}
                alt="Enter Image"
              />
              <Card.Body>
                {/* <input
                  type="file"
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleImageChange(e, index)}
                  style={{ display: "none" }}
                /> */}
                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleImageChange(e, index)}
                  style={{ display: "none" }}
                />
                <div className="buttons">
                  <Button
                    variant="secondary"
                    onClick={() => inputRefs.current[index].click()}
                  >
                    Update
                  </Button>
                  <Button variant="danger" onClick={() => deleteCard(card.id)}>
                    Delete
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
export default AddProduct;
