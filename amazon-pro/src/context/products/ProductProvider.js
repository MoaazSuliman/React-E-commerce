import React, { useState } from "react";
import ProductContext from "./ProductContext";

const ProductProvider = ({ children }) => {
  const [urlGetProducts, setUrlGetProducts] = useState(
    "http://localhost:9090/moaaz/api/modernhome/products"
  );

  return (
    <ProductContext.Provider value={{ urlGetProducts, setUrlGetProducts }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
