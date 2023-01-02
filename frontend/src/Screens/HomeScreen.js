import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import axios from "axios";
import Product from "../components/Product";
const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const fetchProducts = async () => {
    const products = await axios.get("http://localhost:8000/api/products/");
    const response = await products.data;
    setProducts(response);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <>
    <h1 style={{"marginTop":20}}>Latest Product On Shopper</h1>
    <Row>
      {products.map((product) => {
        return (
          <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
           <Product product={product}/>
          </Col>
        );
      })}
    </Row>
    </>
  );
};

export default HomeScreen;
