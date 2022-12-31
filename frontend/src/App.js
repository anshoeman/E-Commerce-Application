import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import HomeScreen from "./Screens/HomeScreen";
import ProductScreen from "./Screens/ProductScreen";
import { Routes, Route, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <main>
        <Container className="py3">
          <Routes>
            <Route path="/" element={<HomeScreen />} exact/>
            <Route path="/product/:id" element={<ProductScreen/>}/>
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
    </BrowserRouter>
  );
}

export default App;
