import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch()
  const { userInfo } = userLogin;
  // console.log(userInfo.isAdmin)
  const logoutHandler = ()=>{
    dispatch(logout())
  }
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Shopper</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <i className="fa-sharp fa-solid fa-cart-shopping"></i>Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo?.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fa-sharp fa-solid fa-user"></i>Login
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo&&userInfo.isAdmin && (
                 <NavDropdown title='Admin' id="admin-menu">
                 <LinkContainer to="/admin/userList">
                   <NavDropdown.Item>Users</NavDropdown.Item>
                 </LinkContainer>
                 <LinkContainer to="/admin/products">
                   <NavDropdown.Item>Products</NavDropdown.Item>
                 </LinkContainer>
                 <LinkContainer to="/admin/orderList">
                   <NavDropdown.Item>Orders</NavDropdown.Item>
                 </LinkContainer>
               </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
