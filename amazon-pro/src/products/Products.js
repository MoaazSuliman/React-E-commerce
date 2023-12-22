import React, { useEffect, useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "./Products.css";
import axios from "axios";
import { Link } from "react-router-dom";
import ProductContext from "../context/products/ProductContext";
import { useAuth } from "../context/GlobalState";
const Products = () => {
  const [products, setProducts] = useState([]);
  const { urlGetProducts } = useContext(ProductContext);
  const { dispatch, basket } = useAuth();

  const addToBasket = (pro) => {
    // Check if the item with the same id already exists in the basket
    const existingItem = basket.find((item) => item.id === pro.id);
    if (!existingItem) {
      // Item doesn't exist, add it to the basket
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id: pro.id,
          name: pro.name,
          categoryName: pro.categoryName,
          creationDate: pro.creationDate,
          details: pro.details,
          discount: pro.discount,
          images: pro.images,
          price: pro.price,
          total: pro.total,
        },
      });
      // You may also perform other actions, like sending a request to update the server, etc.
      // axios.post(
      //   `http://localhost:9090/moaaz/api/modernhome/carts/1/product/${pro.id}`
      // );
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(urlGetProducts);
        console.log("from products get", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [urlGetProducts]);

  // const handleAddCart = (id) => {
  //   axios.post(
  //     `http://localhost:9090/moaaz/api/modernhome/carts/1/product/${id}`
  //   );
  // };

  return (
    <div className="products container">
      <div className="main_cards">
        {products.map((pro) => (
          <Card style={{ width: "18rem" }} key={pro.id}>
            <Card.Img variant="top" src={pro.images[0]} />
            <Card.Body>
              <div className="name_categoryName">
                <Card.Title className="name">{pro.name}</Card.Title>
                <Card.Title>{pro.categoryName}.</Card.Title>
              </div>
              <Card.Text className="details">{pro.details}.</Card.Text>
              <div className="numbers">
                <Card.Text className="price">{pro.total}EGP</Card.Text>
                <Card.Text className="discount">
                  <span>save{pro.discount}%</span> with coupon
                </Card.Text>
              </div>
              <div className="buttons">
                <Button variant="warning" onClick={() => addToBasket(pro)}>
                  Add to Cart
                </Button>
                <Link to={`/viewproduct/${pro.id}`}>
                  <Button className="btn-dark">view</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Products;
// i need edit this function to become add item if he not Existing in basket . const addToBasket = (pro) => {
//   dispatch({
//   type: "ADD_TO_BASKET",
//   item: {
//   id: pro.id,
//   name: pro.name,
//   categoryName: pro.categoryName,
//   creationDate: pro.creationDate,
//   details: pro.details,
//   discount: pro.discount,
//   images: pro.images,
//   price: pro.price,
//   total: pro.total,
//   },
//   });
