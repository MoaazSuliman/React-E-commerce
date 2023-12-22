import * as React from "react";
import { useState } from "react";
import "./InputSearch.css";
import TextField from "@mui/material/TextField";

export default function  InputSearch({ onCatSearch }) {
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => {
    const newSearchValue = e.target.value;
    setSearch(newSearchValue);
    if (newSearchValue === "") {
      const urlCategorySearchBack =
        "http://localhost:9090/moaaz/api/modernhome/categories";
      onCatSearch(urlCategorySearchBack);
    } else {
      // Perform the search
      const urlCategorySearch = `http://localhost:9090/moaaz/api/modernhome/categories/search/${newSearchValue}`;
      onCatSearch(urlCategorySearch);
    }
  };
  return (
    <div className="input_search">
      <form>
        <TextField
          id="standard-basic"
          className=" mx-2"
          label="Search"
          variant="standard"
          value={search}
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
