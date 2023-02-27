import React, { useEffect, useState } from "react";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  Alert,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckOutState from "../components/CheckOutState";
import { useNavigate } from "react-router-dom";
import {
  createOrder,
  deliverOrder,
  getOrderDetails,
  payOrder,
} from "../actions/orderActions";
// sb-hbgt023980804@personal.example.com
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import { ORDER_PAY_RESET,ORDER_DELIVER_RESET } from "../constants/orderConstants";
// Ab2ERx3ovgWIOyKuY7bXdn5McWE64_a_FVthzpAZDJNNITKSq3eT2wfgbm1HQraZClDM5jbYIWfcy2An

const OrderScreen = () => {
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, error, loading } = orderDetails;
  const { id } = useParams();
  const dispatch = useDispatch();

  console.log(order);
  const [SdkReady, setSdkReady] = useState(false);

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  const orderDelivery = useSelector((state) => state.orderDelivery);
  const {success: successDeliver } = orderDelivery;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  useEffect(() => {
    if (!order || successPay || order._id !== Number(id) || successDeliver) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({type:ORDER_DELIVER_RESET})
      dispatch(getOrderDetails(id));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [order, id, successPay,successDeliver]);

  const addPayScript = () => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AVOUs-l9A_YomJW0yGKJ7JKbx6FMVkAgWeqQRGNmOfxungXP9OvHKrX2lQVbDJwJ6rjTSYgbnBYnsVin";
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };
  const paymentMethod = localStorage.getItem("paymentMethod");
  if (!loading && !error) {
    const paymentMethod = localStorage.getItem("paymentMethod");
    if (!loading && !error)
      order.itemsPrice = order.orderItems
        .reduce((acc, item) => acc + item.price * item.qty, 0)
        .toFixed(2);
  }

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(id, paymentResult));
  };

  const deliverHandler = (paymentResult) => {
    dispatch(deliverOrder(order));
  };
  return loading ? (
    <h2>Loading...</h2>
  ) : error ? (
    <Alert variant="danger">{error}</Alert>
  ) : (
    <div>
      {/* <h1 style={{ marginTop: 10 }}>
        Order Number:{""}
        {order._id}
      </h1> */}
      <Row style={{ marginTop: 10 }}>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong style={{ textTransform: "capitalize" }}>
                  Name :{"  "}
                </strong>
                {order.user.name}
              </p>
              <p>
                <strong>
                  Email{"  "}:{"  "}
                </strong>
                {order.user.email}
              </p>
              <p>
                <strong>
                  Shipping{"  "}:{"  "}
                </strong>
                {order?.shippingAddress.address}, {order?.shippingAddress.city}{" "}
                {order?.shippingAddress.postalCode},{" "}
                {order?.shippingAddress.country}
              </p>
              {order?.isDelivered ? (
                <Alert variant="success">Delivered on {order?.deliveredAt?.substring(0,10)}</Alert>
              ) : (
                <Alert variant="danger">The Order was not Delivered</Alert>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method:</strong> {JSON.parse(paymentMethod)}
              </p>
              <p>
                {order?.isPaid ? (
                  <Alert variant="success">Paid on {order?.paidAt.substring(0,10)}</Alert>
                ) : (
                  <Alert variant="warning">Not Paid</Alert>
                )}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.orderItems.length === 0 ? (
                <Alert variant="info">Your Order Is Empty</Alert>
              ) : (
                <ListGroup variant="flush">
                  {order.orderItems.map((item, index) => {
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
                  <Col>${order?.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>${order?.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${order?.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>TotalPrice:</Col>
                  <Col>${order?.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              {!order?.isPaid && (
                <ListGroup.Item>
                  {loadingPay && <h1>Loading</h1>}
                  {!SdkReady ? (
                    <p>Loading</p>
                  ) : (
                    <PayPalButton
                      amount={order.totalPrice}
                      onSuccess={successPaymentHandler}
                      style={{ backgroundColor: "black", marginTop: 20 }}
                    />
                  )}
                </ListGroup.Item>
              )}
            </ListGroup>
            {userInfo && userInfo.isAdmin &&order.isPaid && !order.isDelivered&&(
              <ListGroup.Item>
                <Button
                type="button"
                className="btn btn-block"
                onClick={deliverHandler}
                style={{width:'100%'}}
                >
                  Mark As Delivered
                </Button>
              </ListGroup.Item>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;
