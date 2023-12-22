import React from "react";
import "./Nav_bar.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
// import Input_search from "../input-search/Input_search";
import { NavLink } from "react-router-dom";

const Nav_bar = () => {
  // const [order, setOrder] = useState(
  //   sessionStorage.getItem("order") === "true"
  // );
  // const updateOrder = (boolean) => {
  //   setOrder(boolean);
  //   sessionStorage.setItem("order", boolean.toString());
  // };
  // const showBtn = () => {
  //   updateOrder(true);
  // };
  // const hiddenBtn = () => {
  //   updateOrder(false);
  // };
  const getLocalStorage = (key) => {
    return localStorage.getItem(key);
  };
  return (
    <div className="navbar">
      <div style={{ width: "100%" }}>
        {["sm,lg,xxl"].map((expand) => (
          <Navbar key={expand} expand={expand}>
            <Container fluid>
              <div className="main">
                <div className="navbar_links">
                    <NavLink
                      to="products"
                      className="navbar_link border_white"
                      // onClick={hiddenBtn}
                    >
                      products
                    </NavLink>
                    <NavLink
                      to="categories"
                      className="navbar_link border_white"
                      // onClick={hiddenBtn}
                    >
                      categories
                    </NavLink>
                    <NavLink
                      to="orders"
                      className="navbar_link border_white"
                      // onClick={showBtn}
                    >
                      orders
                    </NavLink>
                    <NavLink
                      to="users"
                      className="navbar_link border_white"
                      // onClick={hiddenBtn}
                    >
                      users
                    </NavLink>
                    <NavLink
                        to={getLocalStorage("role") !== "EMPLOYEE" && "/employee"}
                      className="navbar_link border_white"
                      // onClick={hiddenBtn}
                    >
                     employee
                    </NavLink>
                  </div>
                {/* <>
                  {!order ? <Input_search /> : null}
                </> */}
              </div>
            </Container>
          </Navbar>
        ))}
      </div>
    </div>
  );
};

export default Nav_bar;
