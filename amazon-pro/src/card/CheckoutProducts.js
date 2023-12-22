import { React ,useEffect} from "react";
import { useAuth } from "../context/GlobalState";
import "./CheckoutProducts.css";
import NumOfItems from "./NumOfItems";

const CheckoutProducts = ({basket}) => {
  const { dispatch } = useAuth();

  // Load basket from local storage on component mount
  useEffect(() => {
    const savedBasket = JSON.parse(localStorage.getItem("basket"));
    if (savedBasket) {
      dispatch({ type: "SET_BASKET", basket: savedBasket });
    }
  }, [dispatch]);
  const removeFromBasket = (id) => {
    dispatch({
      type: "REMOVE_FROM_BASKET",
      id: id,
    });
    localStorage.removeItem(`numItem_${id}`);
  };
  return (
    <div className="checkout">
      <div className="items">
        {basket ? (
          basket.map((item, index) => (
            <div className="item" key={index}>
              <div className="image">
                {item.images && <img src={item.images[0]} alt={item.name} />}
              </div>
              <div className="text">
                <h4>{item.name}</h4>
                <p>{item.details}</p>
                <p>{item.categoryName}</p>
                <div className="salary">
                  <p>{item.price}</p>
                  <strong>
                    {item.total}
                    <small> EGP</small>
                  </strong>
                </div>

                <div>
                  <NumOfItems itemId={item.id} />
                </div>
                <button
                  className="remove"
                  onClick={() => removeFromBasket(item.id)}
                >
                  Remove From Basket
                </button>
              </div>
            </div>
          ))
        ) : (
          <h3 className="text-basket-empty">
            You have no items on your basket . to buy one or more items ,click
            "Add To Basket" .
          </h3>
        )}
      </div>
    </div>
  );
};

export default CheckoutProducts;
// discount: pro.discount,
