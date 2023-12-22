import React from "react";
import "./Admin.css";
import { Outlet } from "react-router-dom";
import logo1 from "../assets/1.jpeg";
const Admin = () => {
  return (
    <div className="admin container">
      {/* <h1>Modern Home</h1> */}
      <div className="image">
        <img src={logo1} alt={<h1>Modern Home</h1> } />
      </div>
      <Outlet />
    </div>
  );
};
export default Admin;
