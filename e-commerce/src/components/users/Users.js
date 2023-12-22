import React, { useState, useEffect, useContext } from "react";
import "./Users.css";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DoneIcon from "@mui/icons-material/Done";
import axios from "axios";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { OrdersContext } from "../Context/OrdersContext";
const Users = () => {
  const { setUrlGetOrders } = useContext(OrdersContext);

  const [users, setUsers] = useState([]);
  const usersUrl = `http://localhost:9090/moaaz/api/modernhome/users`;

  const handleInputSearch = (state) => {
    if (state) {
      if (state==="inWaitingOrders") {
        return   setUrlGetOrders(users.inWaitingOrders)
      }else if(state==="inDeliveryOrders"){
    
      }else if(state==="completedOrders"){
    
      }
      
      }
     else {
      return console.log("ahhhha");
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(usersUrl);
        setUsers(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [usersUrl]);

  return (
    <div className="users">
      <h1> Our users</h1>
      <div style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th className="col-1">name</th>
              <th className="col-2">email</th>
              <th className="col-2">phone</th>
              <th className="col-2">address </th>
              <th className="col-1">password </th>
              <th className="col-1">!</th>
              <th className="col-1">
                <LocalShippingIcon />
              </th>
              <th className="col-1">
                <DoneIcon />
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="col-1">{user.name}</td>
                <td className="col-2">{user.email}</td>
                <td className="col-2">{user.phone1}</td>
                <td className="col-2">{user.address}</td>
                <td className="col-2">{user.password}</td>
                <td className="col-1">
                  <Link to="/orders">
                    <Button
                      className="btn btn-secondary"
                      // onClick={() => setUrlGetOrders(users.inWaitingOrders)}
                       onClick={() => handleInputSearch("inDeliveryOrders")}
                    >
                      {user.inWaitingOrders.length}
                    </Button>
                  </Link>
                </td>
                <td className="col-1">
                  <Link to="/orders">
                    <Button
                      className="btn btn-warning"
                      // onClick={() => setUrlGetOrders(users.inDeliveryOrders)}
                    >
                      {user.inDeliveryOrders.length}
                    </Button>
                  </Link>
                </td>
                <td className="col-1">
                  <Link to="/orders">
                    <Button
                      className="btn btn-success"
                      onClick={() => setUrlGetOrders(users.completedOrders)}
                    >
                      {user.completedOrders.length}
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
// onClick={() => handleButtonClick("http://localhost:9090/moaaz/api/modernhome/orders/completed")}
// const handleInputSearch = (id) => {
//   const urlProSearch2 = `http://localhost:9090/moaaz/api/modernhome/products/search/${id}`;
//   setUrlGetOrders(urlProSearch2);
// };
