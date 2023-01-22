import React, { useEffect } from "react";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Alert,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckOutState from "../components/CheckOutState";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";

const PlaceOrderScreen = () => {
  const cart = useSelector((state) => state.cart);
  const paymentMethod = localStorage.getItem("paymentMethod");
  cart.itemsPrice = cart.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0).toFixed(2)
  cart.shippingPrice = (cart.itemsPrice>100?0:10).toFixed(3)//if shipping is below $100 give $10 shipping price
  cart.taxPrice = ((0.082)*cart.itemsPrice).toFixed(2)
  cart.totalPrice = Number(cart.itemsPrice)+Number(cart.shippingPrice)+Number(cart.taxPrice)

  const orderCreate = useSelector(state=>state.orderCreate)
  const {order,error,success}=orderCreate
  const dispatch = useDispatch()
  const navigate = useNavigate()
  console.log(order)

  const placeOrder = ()=>{
    console.log('Place Order')
    dispatch(createOrder({
        orderItems:cart.cartItems,
        shippingAddress:cart.shippingAddress,
        paymentMethod:"paypal",
        itemsPrice:cart.itemsPrice,
        shippingPrice:cart.shippingPrice,
        totalPrice:cart.totalPrice,
        taxPrice:cart.taxPrice
    }))
  }

  useEffect(()=>{
    if(success){
        navigate(`/order/${order._id}`)
        dispatch({
            type:ORDER_CREATE_RESET
        })
    }
    
  },[navigate,success])
  return (
    <div>
      <CheckOutState step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Shipping: </strong>
                {cart?.shippingAddress.address}, {cart?.shippingAddress.city}{" "}
                {cart?.shippingAddress.postalCode},{" "}
                {cart?.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {JSON.parse(paymentMethod)}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length === 0 ? (
                <Alert variant="info">Your Cart Is Empty</Alert>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={`http://localhost:8000/${item.image}`}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link
                              to={`/product/${item.product}`}
                              style={{ textDecoration: "none" }}
                            >
                              {item?.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item?.qty} X ${item?.price}
                            {""}={""}${(item.qty * item.price).toFixed(2)}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Order Summary</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Item:</Col>
                            <Col>${cart?.itemsPrice}</Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Shipping:</Col>
                            <Col>${cart?.shippingPrice}</Col>
                        </Row>

                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>Tax:</Col>
                            <Col>${cart?.taxPrice}</Col>
                        </Row>
                  
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Row>
                            <Col>TotalPrice:</Col>
                            <Col>${cart?.totalPrice}</Col>
                        </Row>
                  
                    </ListGroup.Item>
                    {/* <ListGroup.Item>
                       {error&&<Alert variant="danger">{error}</Alert>}
                  
                    </ListGroup.Item> */}
                    <ListGroup.Item>
                       <Button
                       type="button"
                       className="btn-block"
                       disabled={cart.cartItems===0}
                       onClick={placeOrder}
                       style={{width:'100%'}}
                       >
                        Place Order
                       </Button>
                  
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PlaceOrderScreen;
