import React, { useState, useEffect } from "react";
import { Link, redirect, useNavigate, useHistory } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../actions/userActions";
import FormContainer from "../components/FormContainer";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;

  if (userInfo) {
    navigate("/");
  }
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submmitted");
    if (password !== confirmpassword) setMessage("Password do not match");
    else dispatch(register(name, email, password));
  };

  return (
    <FormContainer>
      <h1 style={{ marginTop: 20 }}>Sign Up</h1>
      {message && show ? (
        <Alert dismissible onClose={() => setShow(false)} variant="danger">
          {message}
        </Alert>
      ) : (
        <></>
      )}
      {loading && <h1>Loading</h1>}
      <Form onSubmit={submitHandler} style={{ marginTop: 20 }}>
        <Form.Group controlId="name" style={{ marginTop: 10 }}>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="email" style={{ marginTop: 10 }}>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" style={{ marginTop: 10 }}>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword" style={{ marginTop: 10 }}>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Cofirm Password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" style={{ marginTop: 20 }}>
          Regitser
        </Button>
      </Form>
      <Row className="py-2">
        <Col>
          <Link to={"/login"} style={{textDecoration:'none',color:'white'}}>Already Have An Account?</Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default RegisterScreen;
