import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import "./Categories.css";
import { Link } from "react-router-dom";
import axios from "axios";
import AlertDialog from "../Dialog/AlertDialog";
import InputSearch from "../simpleForms/InputSearch/InputSearch";

const Categories = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [searchUrl, setSearchUrl] = useState(
    "http://localhost:9090/moaaz/api/modernhome/categories"
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(searchUrl);
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [searchUrl]);

  // Handle the search URL change
  const handleCategorySearch = (url) => {
    setSearchUrl(url); // Update the searchUrl state with the new URL
  };

  const handelDeleteCat = (catId) => {
    axios
      .delete(`http://localhost:9090/moaaz/api/modernhome/categories/${catId}`)
      .then((response) => {
        if (response.status === 204 || response.status === 200) {
          const updatedCategories = categories.filter(
            (ele) => ele.id !== catId
          );
          setCategories(updatedCategories);
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
    <div className="Categories">
      <h2>
        Our Categories
        <div className="mt-2">
          <Link to="/addcategory">
            <Button>Add</Button>
          </Link>
        </div>
      </h2>
      <InputSearch
        onCatSearch={handleCategorySearch}
      />
      <div style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr className="container">
              <th className="col-2">name</th>
              <th className="col-3">details</th>
              <th className="col-2">creation date</th>
              <th className="col-3">number of products</th>
              <th className="col-2">actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="col-2">{category.name}</td>
                <td className="col-3">{category.details}</td>
                <td className="col-2">{category.creationDate}</td>
                <td className="col-3">{category.numberOfProducts}</td>
                <td className="col-2">
                  <div className="admin_btns">
                    <Link to={`/updatecategories/${category.id}`}>
                      <Button className="btn btn-secondary">
                        View & Update
                      </Button>
                    </Link>

                    <Button
                      className="btn btn-danger"
                      onClick={() => handelDeleteCat(category.id)}
                      disabled={category.numberOfProducts > 0}
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

export default Categories;
