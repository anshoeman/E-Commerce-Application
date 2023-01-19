import React, { useEffect } from "react";
import {
  Link,
  useParams,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
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
  const navigate = useNavigate();
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
    dispatch(removeFromCart(id));
  };
  const checkoutHandler = () => {
    navigate("/shipping");
  };
  return (
    <Row>
      <Col md={8}>
        <h2 style={{ marginTop: 20 }}>Your Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <Alert variant="primary" style={{marginTop:30,width:345,textAlign:'center'}}>
            Your Cart Is Empty
          </Alert>
        ) : (
          <ListGroup variant="flush" style={{ marginTop: 20 }}>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product} style={{padding:20,marginTop:10}}>
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
                    <Link
                      to={`/product/${item.product}`}
                      style={{ textDecoration: "none" }}
                    >
                      {item?.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item?.price}</Col>
                  <Col md={3}>
                    <Form.Control
                      as="select"
                      value={item?.qty}
                      onChange={(e) =>
                        dispatch(
                          addToCart(item.product, Number(e.target.value))
                        )
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
                      <i className="fas fa-trash" ></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <Card style={{ marginTop: 40,padding:20,marginTop:95 }}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3 style={{ textAlign: "center" }}>
                Total Items{" "}
                {cartItems.reduce((acc, item) => acc + item.qty, 0)}
              </h3>

              <p style={{ textAlign: "center" }}>
                {" "}
                Total Amount $
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.price, 0)
                  .toFixed(2)}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
                <div style={{margin:'0 auto',textAlign:'center',marginTop:30}}>
                <Button
                type="button"
                className="btn btn-primary"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
                style={{textAlign:'center'}}
              >
                Proceed To Checkout
              </Button>
                </div>
              
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
