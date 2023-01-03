import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  useEffect(() => {
    dispatch(listProducts());
  }, []);

  return (
    <>
      <h1 style={{ marginTop: 20 }}>Latest Product On Shopper</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
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
