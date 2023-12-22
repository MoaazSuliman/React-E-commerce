import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import "./InputProSearch.css";
const InputProSearch = ({ onProSearch }) => {
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => {
    const newSearchValue = e.target.value;
    setSearch(newSearchValue);
    if (newSearchValue === "") {
      const urlProSearch =
        "http://localhost:9090/moaaz/api/modernhome/products";
      onProSearch(urlProSearch);
    } else {
      // Perform the search
      const urlProSearch2 = `http://localhost:9090/moaaz/api/modernhome/products/search/${newSearchValue}`;
      onProSearch(urlProSearch2);
    }
  };
  return (
    <div className="inputProSearch">
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
};

export default InputProSearch;
