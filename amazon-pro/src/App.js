import "./App.css";
import Header from "./header/Header";
import Home from "./home/Home";
import NavBar from "./nav-bar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./signin/Signup";
import Login from "./Login/Login";
import Footer from "./footer/Footer";
import ViewProduct from "./view/ViewProduct";
import Card from "./card/Card";
import Payment from "./card/Payment";
import ForgetPassword from "./ForgetPassword/ForgetPassword";
import Order from "./Order/Order";
import Orders from "./Orders/Orders";
// import { useEffect } from "react";
// import { useAuth } from "./context/GlobalState";

function App() {
  // const { user, dispatch } = useAuth();
  // useEffect(() => {
  //   if (user) {
  //     dispatch({
  //       type: "SET_USER",
  //       user: user,
  //     });
  //   } else {
  //     // If user is null, dispatch REMOVE_USER
  //     dispatch({
  //       type: "REMOVE_USER",
  //     });
  //   }
  // }, [user, dispatch]);

  return (
    <div className="App">
      <>
        <BrowserRouter>
          <Routes>
          <Route path="/login" element={<Login />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/signin" element={<Signin />} />
            <Route
              path="/"
              element={
                <>
                  <Header />
                  <NavBar />
                  <Home />
                  <Footer />
                </>
              }
            />
            <Route
              path="/card"
              element={
                <>
                  <Header /> <Card />
                </>
              }
            />
            <Route
              path="/viewproduct/:idViewProduct"
              element={
                <>
                  <Header />
                  <ViewProduct />
                </>
              }
            />
            <Route
              path="/payment"
              element={
                <>
                  <Header />
                  <Payment />
                </>
              }
            />
            <Route
              path="/orders"
              element={
                <>
                  <Header />
                  <Orders />
                </>
              }
            />
            <Route
              path="/orders/:Ordersid"
              element={
                <>
                  <Header />
                  <Order />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </>
    </div>
  );
}

export default App;
