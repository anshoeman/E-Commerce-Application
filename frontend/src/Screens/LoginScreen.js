import React, { useState, useEffect } from "react";
import { Link, redirect, useNavigate, useHistory } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo } = userLogin;
  if (userInfo) {
    navigate("/");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submmitted");
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1 style={{ marginTop: 20 }}>Sign In</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <h1>Loading</h1>}
      <Form onSubmit={submitHandler} style={{ marginTop: 20 }}>
        <Form.Group controlId="email" style={{ marginTop: 10 }}>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" style={{ marginTop: 20 }}>
          Sign In
        </Button>
      </Form>
      <Row className="py-2">
        <Col>
          <Link to={"/register"} style={{textDecoration:'none',color:'white'}}> New Customer?</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default LoginScreen;
