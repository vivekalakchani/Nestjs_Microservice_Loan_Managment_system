import "./App.css";
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/loan/Home";
import Customer from "./components/customer/Customer";
import Details from "./components/loan/Details";
import UpdateLoanStatus from "./components/loan/UpdateLoanStatus";
import Register from "./components/customer/Register";
import AddLoan from "./components/loan/AddLoan";
import UpdateDailyDebitStatus from "./components/customer/UpdateDailyDebitStatus";
import Email from "./components/customer/Email";
function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/updateLoan/:id" element={<UpdateLoanStatus />} />
          <Route path="/updateDailyDebit/:id/:newId" element={<UpdateDailyDebitStatus />} />
          <Route path="/email/:id/:newId" element={<Email />} />
          <Route path="/AddLoan" element={<AddLoan />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
