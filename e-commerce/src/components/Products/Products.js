import { React, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./Products.css";
import { Link } from "react-router-dom";
import axios from "axios";
import AlertDialog from "../Dialog/AlertDialog";
import InputProSearch from "../simpleForms/InputProSearch/InputProSearch";
const Products = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [proSearchUrl, setProSearchUrl] = useState(
    "http://localhost:9090/moaaz/api/modernhome/products"
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(proSearchUrl);
        setProducts(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, [proSearchUrl]);

  const handleProSearch = (newUrl) => {
    setProSearchUrl(newUrl); // Update the searchUrl state with the new URL
  };

  const handleDeletePro = (proId) => {
    axios
      .delete(`http://localhost:9090/moaaz/api/modernhome/products/${proId}`)
      .then((response) => {
        if (response.status === 204 || response.status === 200) {
          const updatedCategories = products.filter((ele) => ele.id !== proId);
          setProducts(updatedCategories);
          setIsDialogOpen(true);
        } else {
          console.error("Error deleting category.");
        }
      })
      .catch((error) => {
        console.error("Error deleting category:", error);
      });
  };

  return (
    <div className="products">
      <h2>
        our products
        <div>
          <Link to="/addproduct">
            <Button>Add</Button>
          </Link>
        </div>
      </h2>
      <InputProSearch onProSearch={handleProSearch} />
      <div style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th className="col-1">name</th>
              <th className="col-2">details</th>
              <th className="col-1">
                category
                <br /> name{" "}
              </th>
              <th className="col-1">price</th>
              <th className="col-1">discount</th>
              <th className="col-1">total</th>
              <th className="col-3">image</th>
              <th className="col-2">actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((pro) => (
              <tr key={pro.id}>
                <td data-title="Actions" className="col-1">
                  {pro.name}
                </td>
                <td data-title="Actions" className="col-2">
                  {pro.details}
                </td>
                <td data-title="Actions" className="col-1">
                  {pro.categoryName}
                </td>
                <td data-title="Actions" className="col-1">
                  {pro.price}
                </td>
                <td data-title="Actions" className="col-1">
                  {pro.discount}
                </td>
                <td data-title="Actions" className="col-1">
                  {pro.total}
                </td>
                <td data-title="Actions" className="col-3">
                  <img
                    src={pro.images[0]}
                    alt={pro.name}
                    style={{
                      width: "100%",
                      maxHeight: "150px",
                      objectFit: "cover",
                    }}
                  />
                </td>
                <td data-title="Actions" className="col-2">
                  <div className="admin_btns">
                    <Link to={`/updateproducts/${pro.id}`}>
                      <Button className="btn btn-secondary">
                        View & Update
                      </Button>
                    </Link>
                    <Button
                      className="btn btn-danger"
                      onClick={() => handleDeletePro(pro.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AlertDialog
        isOpen={isDialogOpen}
        dialogText={"Deleted Succesfully"}
        onClose={() => setIsDialogOpen(false)}
      />
    </div>
  );
};

export default Products;
