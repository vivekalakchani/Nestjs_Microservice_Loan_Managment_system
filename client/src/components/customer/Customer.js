import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";

export default function Customer() {
  const [data, setData] = useState([]);
  
  const getUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/customer`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Update the state with the paginated data
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUserData();
  }, []); // Re-fetch data when page or perPage changes


  return (
    <div className="container mt-2">
      <h2 className="text-center mt-2">Customer Details</h2>
      <div className="text-end">
        <Button variant="dark">
          <NavLink to="/register" className="text-decoration-none text-light">
          <i className="material-icons">add</i>
          </NavLink>
        </Button>
      </div>
      <div className="row d-flex align-items-center mt-5">
        <Table striped>
          <thead>
            <tr>
              <th>CustomerID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el, i) => (
              <tr key={i}>
                <td>{el.customerId}</td>
                <td>{el.name}</td>
                <td>{el.email}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
