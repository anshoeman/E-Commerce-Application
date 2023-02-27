import React, { useEffect } from "react";
import {
  Link,
  redirect,
  useNavigate,
  useHistory,
  Navigate,
} from "react-router-dom";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { listUsers } from "../actions/userActions";
import { LinkContainer } from "react-router-bootstrap";
import { listProducts, deleteProduct,createProduct } from "../actions/productActions";
import { PRODUCT_CREATE_RESET } from "../constants/productConstants";
const ProductListScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product:createdProduct
  } = productCreate;

  const deleteHandler = (id) => {
    if (window.confirm("Are u sure u want to delete this product?"))
      dispatch(deleteProduct(id));
    console.log("hi");
  };

  const createProductHandler = () => {
    console.log("product");
    dispatch(createProduct())
  };
  useEffect(() => {
    dispatch({
        type:PRODUCT_CREATE_RESET
    })
    if (!userInfo.isAdmin) dispatch(listProducts());
    if(successCreate){
        navigate(`/admin/product/${createdProduct._id}/edit`)
    }else{
        dispatch(listProducts())
    }
  }, [dispatch, userInfo, navigate,successDelete,successCreate,createdProduct]);
  return (
    <div>
      {/* UserListScreen
        <h1>Users</h1> */}
      <Row>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          {/* <Button className="my-3" onClick={createProductHandler}>
            <i className="fas fa-plus"></i>Create Product
          </Button> */}
        </Col>
      </Row>
      {loadingDelete ? (
        <h1>Loading</h1>
      ) : error ? (
        <Alert variant="danger">{errorDelete}</Alert>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => {
              return (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>${product.price}</td>
                  <td>{product.category}</td>
                  <td>{product?.brand}</td>
                  <td>
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>{" "}
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(product._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ProductListScreen;
