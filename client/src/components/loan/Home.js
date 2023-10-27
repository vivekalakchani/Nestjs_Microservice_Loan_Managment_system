import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Table from "react-bootstrap/Table";

export default function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1); // Current page

  const getUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/loan?page=${page}`,
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
  }, [page]);

  const goToPage = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="container mt-2">
      <h2 className="text-center mt-2">Loan Details</h2>
      <div className="text-end">
        <Button variant="dark">
          <NavLink to="/AddLoan" className="text-decoration-none text-light">
          <i className="material-icons">add</i>
          </NavLink>
        </Button>
      </div>
      <div className="row d-flex align-items-center mt-5">
        <Table striped>
          <thead>
            <tr>
              <th>LoanID</th>
              <th>CustomerID</th>
              <th>Loan Amount</th>
              <th>Duration</th>
              <th>Status</th>
              <th>Start Day</th>
            </tr>
          </thead>
          <tbody>
            {data.map((el, i) => (
              <tr key={i}>
                <td>{el.loanId}</td>
                <td>{el.customerId}</td>
                <td>$ {el.amount}</td>
                <td>{el.duration}</td>
                <td>{el.status}</td>
                <td>{new Date(el.date).toLocaleDateString()}</td>
                <td>
                  <a
                    href={`/details/${el.loanId}`}
                    className="view"
                    title="View"
                    data-toggle="tooltip"
                  >
                    <i className="material-icons">visibility</i>
                  </a>
                  <a
                    href={`/updateLoan/${el.loanId}`}
                    className="edit"
                    title="Edit"
                    data-toggle="tooltip"
                    style={{ color: "#10ab80" }}
                  >
                    <i className="material-icons">edit</i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="text-center">
        <Button variant="light" onClick={() => goToPage(page - 1)}>
          {page}
        </Button>{" "}
        <Button variant="light" onClick={() => goToPage(page + 1)}>
          {page + 1}
        </Button>
      </div>
    </div>
  );
}
