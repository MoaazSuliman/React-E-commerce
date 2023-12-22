import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import AlertDialog from "../Dialog/AlertDialog";

const Employee = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [employee, setEmployee] = useState([]);
  const employeeUrl = `http://localhost:9090/moaaz/api/modernhome/employees`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(employeeUrl);
        setEmployee(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [employeeUrl]);

  const handleDeleteEmployee = (employeeId) => {
    axios
      .delete(`${employeeUrl}/${employeeId}`)
      .then((response) => {
        if ([204, 200].includes(response.status)) {
          const updatedEmployee = employee.filter((ele) => ele.id !== employeeId);
          setEmployee(updatedEmployee);
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
    <div className="employee">
      <h2>
        Our Employees
        <div className="mt-2">
          <Link to="/addemployee">
            <Button>Add</Button>
          </Link>
        </div>
      </h2>
      <div style={{ width: "100%" }}>
        <table style={{ width: "100%" }}>
          <thead>
            <tr className="container">
              <th className="col-2">name</th>
              <th className="col-2">email</th>
              <th className="col-2">address</th>
              <th className="col-2">phone</th>
              <th className="col-2">password</th>
              <th className="col-2">actions</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((employee) => (
              <tr key={employee.id}>
                <td className="col-2">{employee.name}</td>
                <td className="col-2">{employee.email}</td>
                <td className="col-2">{employee.address}</td>
                <td className="col-2">{employee.phone1}</td>
                <td className="col-2">{employee.password}</td>
                <td className="col-2">
                  <div className="admin_btns">
                    <Link to={`/updateemployee/${employee.id}`}>
                      <Button className="btn btn-secondary">
                        View & Update
                      </Button>
                    </Link>

                    <Button
                      className="btn btn-danger"
                      onClick={() => handleDeleteEmployee(employee.id)}
                      disabled={employee.numberOfProducts > 0}
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

export default Employee;
