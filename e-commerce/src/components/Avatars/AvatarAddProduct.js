import React, { useRef, useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./AvatarAddProduct.css";

const AvatarAddProduct = (props) => {
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
  useEffect(() => {
    // Load stored cards data from local storage
    //   const storedCards = JSON.parse(sessionStorage.getItem("avatarAddProductCards"));
    //   if (storedCards) {
    //     setCards(storedCards);
    //   }
  }, []);

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
        props.onImagesChange(updatedCards.map((card) => card.img));
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

    // Save updated cards data to local storage
    // sessionStorage.setItem("avatarAddProductCards", JSON.stringify(updatedCards));
    // scrollToAddCard();
  };

  // Function to delete a card
  const deleteCard = (id) => {
    const updatedCards = cards.filter((card) => card.id !== id);
    setCards(updatedCards);

    // Save updated cards data to local storage
    // sessionStorage.setItem("avatarAddProductCards", JSON.stringify(updatedCards));
  };

  return (
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
              <input
                type="file"
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
  );
};

export default AvatarAddProduct;
