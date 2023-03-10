import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";
import { Cart } from "./pages/Cart";
import { Navbar } from "./components/molecules/Navbar";
import Footer from "./components/atoms/Footer";
import Login from "./components/Organisms/Login";
import Signup from "./components/Organisms/SignUp";
import SearchProduct from "./components/molecules/SearchProduct";
import { OrderSummery } from "./pages/OrderSummery";

function App() {
  return (
    <>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route
            path="/orderSummery/:productId/:quantity"
            element={<OrderSummery />}
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/SearchProduct/:searchName"
            element={<SearchProduct />}
          />
        </Routes>
      </Container>
      <Footer />
    </>
  );
}

export default App;
