import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import LoginScreen from "./Screens/LoginScreen";
import ProfileScreen from "./Screens/ProfileScreen";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import RegisterScreen from "./Screens/RegisterScreen";
import CartScreen from "./Screens/CartScreen";
import ShippingScreen from "./Screens/ShippingScreen";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PaymentScreen from "./Screens/PaymentScreen";
import PlaceOrderScreen from "./Screens/PlaceOrderScreen";
import OrderScreen from "./Screens/OrderScreen";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main>
          <Container className="py3">
            <Routes>
              <Route path="/" element={<HomeScreen />} exact />
              <Route path="/login" element={<LoginScreen />} exact />
              <Route path="/product/:id" element={<ProductScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/cart/:id?" element={<CartScreen />} />
              <Route element={<PrivateRoute />}>
                <Route path="/shipping" element={<ShippingScreen />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/payment" element={<PaymentScreen />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/placeorder" element={<PlaceOrderScreen />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/order/:id" element={<OrderScreen />} />
              </Route>
            </Routes>
          </Container>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
