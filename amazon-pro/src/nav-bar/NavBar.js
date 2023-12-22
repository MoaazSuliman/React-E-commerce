import React from "react";
import "./Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";

const NavBar = () => {
  return (
    <div className="navbar">
      <>
        {["sm,lg,xxl"].map((expand) => (
          <Navbar key={expand} expand={expand}>
            <Container fluid>
              <div className="navbar_links">
                <Nav.Link className="navbar_link" href="#action1">
                  <Navbar.Toggle
                    className="navbar_toglle"
                    aria-controls={`offcanvasNavbar-expand-${expand}`}
                  />
                </Nav.Link>
                <Nav.Link className="navbar_link border_white" href="#action1">
                  today's deals
                </Nav.Link>
                <Nav.Link className="navbar_link border_white" href="#action1">
                  customer service
                </Nav.Link>
                <Nav.Link className="navbar_link border_white" href="#action1">
                  regisrty
                </Nav.Link>
                <Nav.Link className="navbar_link border_white" href="#action1">
                  gift cards
                </Nav.Link>
                <Nav.Link className="navbar_link border_white" href="#action1">
                  sell
                </Nav.Link>
              </div>

              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="start"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    Digital Content & Devices
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="#action1">Home</Nav.Link>
                    <Nav.Link href="#action2">Link</Nav.Link>
                    <NavDropdown
                      title="Dropdown"
                      id={`offcanvasNavbarDropdown-expand-${expand}`}
                    >
                      <NavDropdown.Item href="#action3">
                        Action
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        Another action
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action5">
                        Something else here
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </>
    </div>
  );
};

export default NavBar;
