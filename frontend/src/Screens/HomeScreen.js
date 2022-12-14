import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import Alert from "react-bootstrap/Alert";
import Carousel from "react-bootstrap/Carousel";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <>
      <Carousel style={{ marginTop: 60 }}>
        {products.map((product) => {
          return (
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={`http://localhost:8000/${product.image}`}
                alt="First slide"
                style={{ height: 350, borderRadius: 4 }}
              />
              <Carousel.Caption>
                <h3>{product?.name}</h3>
                <p>{product?.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>
      <h1 style={{ marginTop: 20 }}>Latest Product On Shopper</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Row>
          {products.map((product) => {
            return (
              <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                <Product product={product} />
              </Col>
            );
          })}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
