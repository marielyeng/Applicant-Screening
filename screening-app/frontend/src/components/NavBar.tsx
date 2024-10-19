import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const NavBar: React.FC = () => {
    return (
      <Navigation expand="lg" className="bg-body-tertiary" fixed="top" variant="light">
        <Container fluid>
          <Logo>
              <a href="/"><JobLogo src = '/job.png' height='50px' width='50px'/></a>
            </Logo> 
          <Brand href="/">Tech/Job Hunt</Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Link href="/jobs">Find Jobs</Link>
              <Dropdown title="Explore" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Find Salaries</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Reviews</NavDropdown.Item>
                <NavDropdown.Item href="#action5">Job Seeker - FAQ</NavDropdown.Item>
              </Dropdown>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search Job"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-primary">Search</Button>
            </Form>
          </Navbar.Collapse>
          </Container>
      </Navigation>
   
    )
}

export const Navigation = styled(Navbar)`
  box-shadow: 2px 2px 5px #ececec;
  display: flex;
  flex-direction: row;
  width: 100%;
   position: sticky;
  top: 0;
  z-index: 1000;

  @media (max-width: 446px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

export const Brand = styled(Navbar.Brand)`
  padding-left: 8px;
`;

export const Link = styled(Nav.Link)`
  transition: color 0.3s ease;
  text-decoration: none;
  color: #142d4c;
  font-size: 1.3em;

  &:hover {
    transition: color 0.3s ease;
    color: #ff9a3c;
  }

  @media (max-width: 446px) {
    padding: 0 4px;
  }
`;

export const Dropdown = styled(NavDropdown)`
  transition: color 0.3s ease;
  text-decoration: none;
  color: #142d4c;
  font-size: 1.3em;

  &:hover {
    transition: color 0.3s ease;
    color: #ff9a3c;
  }

  @media (max-width: 446px) {
    padding: 0 4px;
  }
`;

export const Logo = styled.div`
  @media (min-width: 446px) {
    margin-right: auto;
    justify-content: center;
    align-self: center;
  }
`;

export const DivLink = styled.div`
  display: flex;
  margin-right: 6%;
`;

export const JobLogo = styled.img`
  width: 50px;
  max-width: 100%;
  height: auto;
`;