import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Cart.css";

function Cart() {
  return (
    <div className="product col-xs-12 col-md-6 col-lg-4">
      <Card style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          style={{ width: "100%", maxHeight: "300px" }}
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRYPIHvf-hBTjteYJAHnxyTdGUqqzk9nqk3EepOlpr&s"
        />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          <div className="product_buttons">
            <Button variant="primary">Go </Button>
            <Button variant="primary">Go </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Cart;

