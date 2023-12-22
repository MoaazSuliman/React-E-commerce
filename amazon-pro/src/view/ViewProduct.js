import React, { useEffect, useState } from "react";
import "./ViewProduct.css";
import { useParams } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Slider from "../Slider/Slider";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/GlobalState";

const ViewProduct = () => {
  const { idViewProduct } = useParams();
  const [product, setProduct] = useState({});
  const { dispatch,basket } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/moaaz/api/modernhome/products/getById/${idViewProduct}`
        );
        setProduct(response.data);
        console.log(`this is my product by id ` + response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [idViewProduct]);

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

  return (
    <div className="view">
      <Slider images={product.images} />

      <div className="view-card">
        <Card style={{ width: "20rem" }}>
          {product.images && product.images.length > 0 ? (
            <Card.Img variant="top" src={product.images[0]} />
          ) : (
            <Card.Img variant="top" alt="" /> // Provide a default image URL or handle it as needed
          )}
          <Card.Body>
            <div className="name_categoryName">
              <Card.Title className="name">{product.name}</Card.Title>
              <Card.Title>{product.categoryName}.</Card.Title>
            </div>

            <Card.Text className="details">{product.details}.</Card.Text>

            <div className="numbers">
              <Card.Text className="price">
                <strong>{product.price}EGP</strong>
              </Card.Text>
              <Card.Text className="discount">
                <span>save{product.discount}%</span> with coupon
              </Card.Text>
            </div>

            <div className="buttons">
              <Button
                className="btn-warning"
                onClick={() => addToBasket(product)}
              >
                add to card
              </Button>
              <Link to={`/`}>
                <Button className="btn-dark">back</Button>
              </Link>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default ViewProduct;

/*
          <Card style={{ width: "18rem" }} key={pro.id}>
            <Card.Img variant="top" src={pro.images[0]} />
            <Card.Body>
              <div className="name_categoryName">
                <Card.Title className="name">{pro.name}</Card.Title>
                <Card.Title>{pro.categoryName}.</Card.Title>
              </div>
              <Card.Text className="details">{pro.details}.</Card.Text>
              <div className="numbers">
                <Card.Text className="price">{pro.price}</Card.Text>
                <Card.Text className="discount">
                  <span>save{pro.discount}%</span> with coupon
                </Card.Text>
              </div>
              <div className="buttons">
                <Button variant="primary">add to card</Button>
                <Link to={`/viewproduct/${pro.id}`}>
                  <Button variant="primary">view</Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
      */
