import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductProvider from "./context/products/ProductProvider";
import GlobalProvider from "./context/GlobalState";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ProductProvider>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </ProductProvider>
  </React.StrictMode>
);

reportWebVitals();
