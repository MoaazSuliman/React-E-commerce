import { React, useState, useEffect } from "react";
import "./NumOfItems.css";
import { getBasketTotal } from "./TotalPrice";


const NumOfItems = ({ itemId }) => {

  const getInitialNumItem = () => {
    const storedNumItem = localStorage.getItem(`numItem_${itemId}`);
    return storedNumItem ? parseInt(storedNumItem) : 1;
  };
  const [numItem, setNumItem] = useState(getInitialNumItem());

  useEffect(() => {
    // Save the updated numItem to localStorage
    localStorage.setItem(`numItem_${itemId}`, numItem.toString());
    // Trigger getBasketTotal when numItem changes
    getBasketTotal();
  }, [itemId, numItem]);

  const decreaseNumItem = () => {
    if (numItem > 1) {
      setNumItem(numItem - 1);
    }
  };
  const increaseNumItem = () => {
    setNumItem(numItem + 1);
  };

  return (
    <div className="num-of-items">
      <button onClick={decreaseNumItem}> - </button>
      <h5> {numItem} </h5>
      <button onClick={increaseNumItem}> + </button>
    </div>
  );
};

export default NumOfItems;

