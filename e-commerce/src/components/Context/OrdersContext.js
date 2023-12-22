// ProductContext.js
import React, { createContext, useState } from "react";

const OrdersContext = createContext();

const OrdersProvider = ({ children }) => {
  const [urlGetOrders, setUrlGetOrders] = useState(
    "http://localhost:9090/moaaz/api/modernhome/orders/getAll"
  );

  return (
    <OrdersContext.Provider value={{ urlGetOrders, setUrlGetOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};

export { OrdersContext, OrdersProvider };
