import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


    
export default function Header() {
  return (
    <div>
      <>
      <Navbar bg="dark" data-bs-theme="dark"style={{height:"60px"}}> 
        <Container>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/customer">Customer</Nav.Link>
          
          </Nav>
        </Container>
      </Navbar>
    </>
    
    
    </div>
  )
}
