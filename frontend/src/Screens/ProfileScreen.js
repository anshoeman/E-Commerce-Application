import React, { useState, useEffect } from "react";
import { Link, redirect, useNavigate, useHistory } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import FormContainer from "../components/FormContainer";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;
  useEffect(() => {
    if (!userInfo) navigate("/login");
    else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
    console.log(user.name);
  }, [userInfo, user, dispatch, success]);
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("Password do not match");
      console.log("submmitted");
    } else {
      dispatch(
        updateUserProfile({
          id: user?._id,
          name: name,
          email: email,
          password: password,
        })
      );
      console.log("updated");
    }
  };
  return (
    <Row>
      <Col md={3}>
        <h2 style={{ marginTop: 20 }}>User Profile</h2>
        {message && show ? (
        <Alert dismissible onClose={() => setShow(false)} variant="danger">
          {message}
        </Alert>
      ) : (
        <></>
      )}
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
            Update Your Profile
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2 style={{ marginTop: 20 }}>My Orders</h2>
      </Col>
    </Row>
  );
};

export default ProfileScreen;
