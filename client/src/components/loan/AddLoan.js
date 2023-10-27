import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";
import { NavLink } from "react-router-dom";

export default function AddLoan() {
  const [customerId, setcustomerId] = useState("");
  const [amount, setAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [number, setNo] = useState("");
  const [customerList, setCustomerList] = useState([]);

  const history = useNavigate();

  const setdata = (e) => {
    const { value } = e.target;
    setcustomerId(value);
  };

  const setnumber = (e) => {
    const { value } = e.target;
    setAmount(value);
  };
  const setDurationNumber = (e) => {
    const { value } = e.target;
    setDuration(value);
  };

  const setTrackingNumber = (e) => {
    const { value } = e.target;
    setNo(value);
  };

  const getCustomerList = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/customer`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // Update the state with the paginated data
      setCustomerList(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCustomerList();
  }, []); // Re-fetch data when the component mounts

  const addLoanData = async (e) => {
    e.preventDefault();

    const loan = {
      customerId: customerId,
      amount: amount,
      trackingNumber: number,
      duration: duration,
    };

    const config = {
      Headers: {
        "Content-type": "application/json",
      },
    };

    const res = await axios.post("http://localhost:3001/loan", loan, config);
    console.log(res);
    if (res.data.status === 401 || !res.data) {
      console.log("error");
    } else {
      history("/");
    }
  };

  return (
    <div className="container mt-3">
      <h2>Enter Loan Details</h2>
      <div className="text-end">
        <Button variant="dark">
          <NavLink to="/register" className="text-decoration-none text-light">
            Add Customer
          </NavLink>
        </Button>
        </div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>CustomerID</Form.Label>
          <Form.Select
            aria-label="Default select example"
            onChange={setdata}
            value={customerId}
          >
            <option value="">Choose ...</option>
            {customerList.map((customer) => (
              <option value={customer.id} key={customer.id}>
                {customer.customerId}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Amount </Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="number"
              aria-label="Amount (to the nearest dollar)"
              onChange={setnumber}
              name="amount"
              placeholder="1000"
            />
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Duration </Form.Label>
          <InputGroup className="mb-3">
            <InputGroup.Text>Dates</InputGroup.Text>
            <Form.Control
              type="number"
              onChange={setDurationNumber}
              name="duration"
              placeholder="180"
            />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>TrackingNumber</Form.Label>
          <Form.Control
            type="text"
            name="trackingNumber"
            onChange={setTrackingNumber}
            placeholder=""
          />
        </Form.Group>
        {/* The rest of your form input fields... */}

        <Button variant="dark" type="submit" onClick={addLoanData}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
