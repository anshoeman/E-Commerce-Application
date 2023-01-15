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
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <main>
        <Container className="py3">
          <Routes>
            <Route path="/" element={<HomeScreen />} exact/>
            <Route path="/login" element={<LoginScreen />} exact/>
            <Route path="/product/:id" element={<ProductScreen/>}/>
            <Route path='/register' element={<RegisterScreen/>}/>
            <Route path='/profile' element={<ProfileScreen/>}/>
            <Route path="/cart/:id?" element={<CartScreen/>}/>
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
