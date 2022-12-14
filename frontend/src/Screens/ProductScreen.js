import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import Rating from "../components/Rating";

import { listProductDetails } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
const ProductScreen = ({ match }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listProductDetails(id));
  }, []);
  const productDetails = useSelector((state) => state.productDetails);
  const { product } = productDetails;
  return (
    <div>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={`http://localhost:8000/${product.image}`} alt={product?.name} fluid style={{'height':400}}/>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product?.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                value={product?.rating}
                text={`${product?.numReviews} reviews`}
                color={"#ffd700"}
              />
            </ListGroup.Item>
            <ListGroup.Item>Price : ${product?.price}</ListGroup.Item>
            <ListGroup.Item>
              Description : {product?.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>
                    Price
                    <Col>
                      <strong>${product?.price}</strong>
                    </Col>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>
                    Status
                    <Col>
                      <strong>
                        {product?.countInStock > 0
                          ? "In Stock"
                          : "Out Of Stock"}
                      </strong>
                    </Col>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock == 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
