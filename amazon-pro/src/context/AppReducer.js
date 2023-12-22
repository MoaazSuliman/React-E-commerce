// import React from "react";
export const initialState = {
  basket: JSON.parse(localStorage.getItem("basket")) || [],
  user: JSON.parse(localStorage.getItem("user")) || null,

};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    
    // user*******

    case "SET_USER":
      localStorage.setItem("user", JSON.stringify(action.user));
      return {
        ...state,
        user: action.user,
      };

    case "REMOVE_USER":
      localStorage.removeItem("user");
      return {
        ...state,
        user: null,
      };


      // basket

    case "ADD_TO_BASKET":
      const newBasketToAdd = [...state.basket, action.item];
      localStorage.setItem("basket", JSON.stringify(newBasketToAdd));
      return {
        ...state,
        basket: newBasketToAdd,
      };

    case "EMPTY_BASKET":
      localStorage.removeItem("basket");
      return {
        ...state,
        basket: [],
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
        localStorage.setItem("basket", JSON.stringify(newBasket));
      }
      return {
        ...state,
        basket: newBasket,
      };
 
    default:
      return state;
  }
};

export default AppReducer;

/*// import React from "react";
export const initialState = {
  basket: [],
  // user: null,
};
const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    // case "SET_USER":
    //   return {
    //     ...state,
    //     user: action.user,
    //   };
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case "EMPTY_BASKET":
      return {
        ...state,
        basket: [],
      };
    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex((item) => item.id === action.id);
      let newBasket = [...state.basket];
      if (index >= 0) {
        newBasket.splice(index, 1);
      }
      return {
        ...state,
        basket: newBasket,
      };

    default:
      return state;
  }
};

export default AppReducer;*/
     // case "INCREASE_QUANTITY":
      //   const increasedBasket = state.basket.map((item) =>
      //     item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
      //   );
      //   localStorage.setItem("basket", JSON.stringify(increasedBasket));
      //   return {
      //     ...state,
      //     basket: increasedBasket,
      //   };
  
      // case "DECREASE_QUANTITY":
      //   const decreasedBasket = state.basket.map((item) =>
      //     item.id === action.id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
      //   );
      //   localStorage.setItem("basket", JSON.stringify(decreasedBasket));
      //   return {
      //     ...state,
      //     basket: decreasedBasket,
      //   };