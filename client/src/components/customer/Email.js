import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardText,
  MDBIcon,
  MDBTypography,
  MDBBtn,
  MDBTableBody,
  MDBTableHead,
  MDBTable,
  MDBInput,
  MDBTextArea,
  MDBCheckbox,
  MDBCardTitle,
} from "mdb-react-ui-kit";
import Card from "react-bootstrap/Card";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function Email() {
  const { id } = useParams();
  const { newId } = useParams();
  const [status, setStatus] = useState({});
  const [values, setCustomerdetails] = useState({ name: "" ,email: "" });
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const history = useNavigate();
  const setNewEmail = (e) => {
    const { value } = e.target;
    setEmail(value);
  };

  const setNewMessage = (e) => {
    const { value } = e.target;
    setMessage(value);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/email/${id}/${newId}`
      );
      setStatus(response.data);

      console.log(response.data);

      const responseCustomer = await axios.get(
        `http://localhost:3001/customer/${id}`
      );

      setCustomerdetails({ ...values, name: responseCustomer.data.name , email: responseCustomer.data.email });

      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  if (loading) {
    return <p>Loading...</p>;
  }
  const sendEmail = async (e) => {
    e.preventDefault();

    const sendEmail = {
      email: email,
      message: message,
    };

    const config = {
      Headers: {
        "Content-type": "application/json",
      },
    };

    const res = await axios.post(
      `http://localhost:3001/email/${id}/${newId}`,
      sendEmail,
      config
    );
    
    console.log(res);
    if (res.data.status === 401 || !res.data) {
      console.log("error");
      window.location.reload();
    }
  };
  return (
    <section style={{ backgroundColor: "#eee" }}>
     
      <MDBContainer className="py-5">
      <div className="justify-content-between align-items-center mb-4">
     <Button variant="primary">
              <NavLink
                to={`/details/${newId}`}
                className="text-decoration-none text-light"
              >
                <i className="material-icons">arrow_back</i>
              </NavLink>
            </Button>
     </div>
        <MDBRow>
          <MDBCol lg="6">
            <MDBCard className="mb-2">
              <MDBCardBody className="text-center">
                <form>
                  <div className="grey-text">
                    <p className="h3 text-center mb-4">Email</p>
                    <h6 className="text-right"> Customer ID : {id}</h6>
                    <h6 className="text-right"> Loan ID : {newId}</h6>
                    <h6 className="text-right"> Name : {values.name}</h6>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon">
                          <i className="material-icons">email</i>
                        </span>
                      </div>
                      <input
                        type="text"
                        className="form-control"
                        placeholder=""
                        aria-label=""
                        value={values.email}
                        onChange={(e) => {
                          const newEmail = e.target.value;
                          setEmail(newEmail);
                          setCustomerdetails({
                            ...values,
                            email: e.target.value,
                          });
                        }}
                        aria-describedby="basic-addon"
                      />
                    </div>

                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="basic-addon">
                          <div>
                            <i className="material-icons">edit</i>
                          </div>
                        </span>
                      </div>
                      <textarea
                        className="form-control"
                        placeholder="Message"
                        aria-label="Message"
                        onChange={setNewMessage}
                        id="exampleFormControlTextarea1"
                        rows="5"
                      ></textarea>
                    </div>

                    <div className="text-center mt-4">
                      <MDBBtn outline color="primary" onClick={sendEmail}>
                        Send
                      </MDBBtn>
                    </div>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>

          <MDBCol lg="6">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <p className="h3 text-center mb-4">Email History</p>

                {status.length > 0 ? (
                  status.map((el, i) => (
                    <Card className="mb-2 text-muted" key={i}>
                      <Card.Header>{el.email}</Card.Header>
                      <Card.Body>
                        <blockquote className="blockquote mb-0">
                          <p className="h6">Loan Amount: {el.amount}</p>
                          <p className="h6">Loan Duration: {el.duration}</p>
                          <p className="h6">Loan Status: {el.status}</p>
                          <p className="h6">{el.message}</p>
                          <br></br>
                          <footer className="blockquote-footer">
                            <cite
                              title={new Date(el.date).toLocaleDateString()}
                            >
                              {new Date(el.date).toLocaleDateString()}
                            </cite>
                          </footer>
                        </blockquote>
                      </Card.Body>
                    </Card>
                  ))
                ) : (
                  <p>No email history available.</p>
                )}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
