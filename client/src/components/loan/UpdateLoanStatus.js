import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

const UpdateLoanStatus = () => {
  const { id } = useParams();
  const [status, setStatus] = useState(""); // State for loan status
  const history = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/loan/${id}`);
        setStatus(response.data.status);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdateStatus = async () => {
    try {
      // Send a PATCH request to update the status
      await axios.patch(`http://localhost:3001/loan/${id}/status`, { status });
      // Handle the response, e.g., show a success message or redirect
      
      history(`/details/${id}`);
  
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
      <div className="w-50 border bg-light text-dark p-5">
        <h2 className="text-center mt-2">Update Loan Status</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Loan ID</Form.Label><br></br>
            <Form.Label className="text-muted">{id}</Form.Label>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Loan Status Update</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={status}
              onChange={handleStatusChange}
            >
              <option value="OUTSTANDING">OUTSTANDING</option>
              <option value="CLOSED">CLOSED</option>
            </Form.Select>
          </Form.Group>

          <Button variant="success" onClick={handleUpdateStatus}>
            Update
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default UpdateLoanStatus;
