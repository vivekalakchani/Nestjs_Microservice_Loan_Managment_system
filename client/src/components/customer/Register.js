import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import InputGroup from "react-bootstrap/InputGroup";

export default function Register() {
  const [name, setFName] = useState("");
  console.log(name);

  const [email, setAmount] = useState("");
  console.log(email);

  const history = useNavigate();

  const setName = (e) => {
    const { value } = e.target;
    setFName(value);
  };

  const setEmail = (e) => {
    const { value } = e.target;
    setAmount(value);
  };

  // add user data

  const addLoanData = async (e) => {
    e.preventDefault();

    const customer = {
      name: name,
      email: email,
    };

    const config = {
      Headers: {
        "Content-type": "application/json",
      },
    };

    const res = await axios.post(
      "http://localhost:3001/customer",
      customer,
      config
    );
    console.log(res);
    if (res.data.status === 401 || !res.data) {
      console.log("error");
    } else {
      history("/");
    }
  };

  return (
    <div className="container mt-3">
      <h2>Enter Customer Details</h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fname"
            onChange={setName}
            placeholder="saman perera"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email </Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="email"
              onChange={setEmail}
              name="email"
              placeholder="abc@gmail.com"
            />
          </InputGroup>
        </Form.Group>

       

        <Button variant="dark" type="submit" onClick={addLoanData}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
