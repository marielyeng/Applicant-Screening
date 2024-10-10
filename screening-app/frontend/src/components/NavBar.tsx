import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';

export const NavBar: React.FC = () => {
    return (
        <Navbar expand="lg" className="bg-body-pink">
        <Container fluid>
            <a href="/"><Image src = '/job.png' height='50px' width='50px' fluid/></a>
          <Navbar.Brand href="#">Job Listings</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/jobs">Find Jobs</Nav.Link>
              <NavDropdown title="Explore" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Find Salaries</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Reviews</NavDropdown.Item>
                <NavDropdown.Item href="#action5">Job Seeker - FAQ</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    )
}