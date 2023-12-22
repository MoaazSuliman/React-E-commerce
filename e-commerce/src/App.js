import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./components/Admin/Admin";
import Navbar from "./components/nav-bar/Nav_bar";
import Products from "./components/Products/Products";
import UpdateProducts from "./components/Products/UpdateProduct/UpdateProduct";
import Categories from "./components/categories/Categories";
import Users from "./components/users/Users";
import Orders from "./components/orders/Orders";
import Employee from "./components/employee/Employee";
import AddProduct from "./components/Products/AddProduct/AddProduct";
import AddCategories from "./components/categories/AddCategories/AddCategories";
import UpdateCategories from "./components/categories/UpdateCategories/UpdateCategories";
import UpdateEmployee from "./components/employee/UpdateEmployee/UpdateEmployee";
import AddEmployee from "./components/employee/AddEmployee/AddEmployee";
import OrderView from "./components/OrderView/OrderView";
import Login from "./components/Login/Login";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Login />} />
        <Route path="forgetpassword" element={<ForgetPassword />} />

        <Route
          element={
            <>
              <Navbar /> <Admin />
            </>
          }
        >
          <Route path="products" element={<Products />} />
          <Route
            path="updateproducts/:idUpdateProducts"
            element={<UpdateProducts />}
          />

          <Route path="categories" element={<Categories />} />
          <Route
            path="updatecategories/:idUpdateCategory"
            element={<UpdateCategories />}
          />
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="ordersview/:idOrderView" element={<OrderView />} />

          <Route path="employee" element={<Employee />} />
          <Route path="addemployee" element={<AddEmployee />} />

          <Route
            path="updateemployee/:idUpdateEmployee"
            element={<UpdateEmployee />}
          />
          <Route
            path="addproduct"
            element={
              <>
                <h1>product</h1> <AddProduct />
              </>
            }
          />
          <Route
            path="addcategory"
            element={
              <>
                <h1>Category</h1> <AddCategories />
              </>
            }
          />
        </Route>
        <Route path="*" element={<>page not found !</>} />
      </Routes>
    </Router>
  );
}

export default App;
