import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../actions/cartActions";
import { useNavigate, Navigate } from "react-router-dom";
import CheckOutState from "../components/CheckOutState";
const ShippingScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <FormContainer>
      <CheckOutState step1 step2 />
      <h1 style={{ marginTop: 10 }}>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="address" style={{ marginTop: 10 }}>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="city" style={{ marginTop: 10 }}>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={city ? city : ""}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalcode" style={{ marginTop: 10 }}>
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode ? postalCode : ""}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="country" style={{ marginTop: 10 }}>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary" style={{ marginTop: 20 }}>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
