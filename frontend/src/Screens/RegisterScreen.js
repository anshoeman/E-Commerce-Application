
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
  const [name,setName] = useState("")
  const [confirmpassword,setConfirmPassword] = useState("")
  const [message,setMessage] = useState("")

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const userRegister = useSelector((state) => state.userRegister);
  const { error, loading, userInfo } = userRegister;


    if(userInfo){
        navigate('/')
    }
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("submmitted");
    if(password!==confirmpassword)
        setMessage('Password do not match')
    else
        dispatch(register(name,email, password));
  };

  return (
    <FormContainer>
      <h1 style={{ marginTop: 20 }}>Sign Up</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {loading && <h1>Loading</h1>}
      <Form onSubmit={submitHandler} style={{ marginTop: 20 }}>
        <Form.Group controlId="name" style={{ marginTop: 10 }}>
          <Form.Label>UserName</Form.Label>
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
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
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
          New Customer?
          <Link
            to={'/register'}
          ></Link>
        </Col>
      </Row>
    </FormContainer>
  )
}

export default RegisterScreen