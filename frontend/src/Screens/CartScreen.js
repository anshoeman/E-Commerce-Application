import React, { useEffect } from "react";
import { Link, useParams, useLocation, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  Alert,
  Form,
} from "react-bootstrap";
import { addToCart, removeFromCart } from "../actions/cartActions";
const CartScreen = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate()
  console.log(location);
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  console.log("qty", qty);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);
  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  };
  const checkoutHandler = ()=>{
    navigate('/login?redirect=shipping')
  }
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Alert variant="info" style={{ width: 303, marginTop: 20,border:0,textAlign:'center' }}>
            Your Cart Is Empty
          </Alert>
        ) : (
          <ListGroup variant="flush" style={{marginTop:20}}>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={`http://localhost:8000/${item?.image}`}
                      alt={item?.image}
                      fluid
                      rounder
                     
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`} style={{textDecoration:'none'}}>{item?.name}</Link>
                  </Col>
                  <Col md={2}>${item?.price}</Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item?.qty}
                      onChange={(e) =>
                        dispatch(addToCart(item.product, Number(e.target.value)))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card style={{ marginTop: 76 }}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>
                SubTotal Items {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </h3>
              ${cartItems.reduce((acc, item) => acc + item.qty*item.price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
            <Button type="button" className="btn-block" disabled={cartItems.length===0} onClick={checkoutHandler}>
                        Proceed To Checkout
            </Button>
          </ListGroup.Item>
          </ListGroup>
          
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
