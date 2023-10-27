import React, { useEffect, useState } from "react";
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
} from "mdb-react-ui-kit";
export default function Details() {
  const { id } = useParams();
  const [status, setStatus] = useState({});
  const [customer, setCustomer] = useState({});
  const [loading, setLoading] = useState(true);
  const [data, setdata] = useState({});
  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/loan/${id}`);
      setStatus(response.data);

      const customerNo = response.data.customerId;

      const responseCustomer = await axios.get(
        `http://localhost:3001/customer/${customerNo}`
      );

      setCustomer(responseCustomer.data);

      const responsedata = await axios.get(
        `http://localhost:3002/dailydebit/${id}`
      );
      setdata(responsedata.data);

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

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBCol lg="12">
          <div className="text-end justify-content-between align-items-center mb-4">
            <Button
              className="me-2"
              onClick={() =>
                window.open(
                  `http://localhost:3001/pdf/${status.customerId}/${id}`
                )
              }
            >
              <i className="material-icons">download</i>
            </Button>
            <Button variant="success">
              <NavLink
                to={`/email/${status.customerId}/${id}`}
                className="text-decoration-none text-light"
              >
                <i className="material-icons">email</i>
              </NavLink>
            </Button>
          </div>
        </MDBCol>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                <p className="text-muted mb-1">{status.customerId}</p>
                <p className="text-muted mb-4">{customer.name}</p>
                <div className="d-flex justify-content-center mb-2">
                  <MDBIcon
                    fab
                    icon="github fa-lg"
                    style={{ color: "#333333" }}
                  />
                  <MDBCardText>{status.github}</MDBCardText>
                </div>
                <div className="d-flex justify-content-center mb-2">
                  <MDBIcon
                    fab
                    icon="twitter fa-lg"
                    style={{ color: "#55acee" }}
                  />
                  <MDBCardText>{status.twitter}</MDBCardText>
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Loan ID</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {status.loanId}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Amount</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      $ {status.amount}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Duration</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {status.duration} Days
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Status</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {status.status}&nbsp; &nbsp; &nbsp; &nbsp;{" "}
                      <a
                        href={`/updateLoan/${id}`}
                        className="view"
                        title="View"
                        data-toggle="tooltip"
                        style={{ color: "#10ab80" }}
                      >
                        <i className="material-icons">edit</i>
                      </a>
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Start Date</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {new Date(status.date).toLocaleDateString()}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="12">
            <MDBCard className="mb-4" style={{ borderRadius: "15px" }}>
              <MDBCardBody className="p-2">
                <MDBTypography tag="h3">Daily Debit Schedule</MDBTypography>
                <MDBCardText className="small">
                  <MDBIcon fas icon="star text-warning" size="lg" />
                  <span className="mx-2">|</span> trackingNumber :{" "}
                  <span className="mx-2"></span> {data.trackingNumber}
                </MDBCardText>
                <hr className="my-4" />

                <MDBTable>
                  <MDBTableHead>
                    <tr>
                      <th scope="col">Installment Number</th>
                      <th scope="col">Transaction ID</th>
                      <th scope="col">Due Date</th>
                      <th scope="col">Installment Amount</th>
                      <th scope="col">Remaining Balance</th>
                      <th scope="col">Status</th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {data.repaymentSchedule?.map((repayment) => (
                      <tr key={repayment._id}>
                        <td>{repayment.installmentNumber}</td>
                        <td>{repayment.transactionId}</td>
                        <td>
                          {new Date(repayment.dueDate).toLocaleDateString()}
                        </td>
                        <td>${repayment.installmentAmount}</td>
                        <td>${repayment.remainingBalance}</td>
                        <td>{repayment.status}</td>
                        <td>
                          <a
                            href={`/updateDailyDebit/${data.loanId}/${repayment.transactionId}`}
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
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
