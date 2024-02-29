import "./App.css";
import { Routes, Route } from "react-router-dom";
import Footer from "./customer/components/Footer/Footer";
import Navigation from "./customer/components/Navigation";

import ProductDetails from "./customer/components/ProductDetails/ProductDetails";
import HomePage from "./customer/pages/HomePage/HomePage";
import ProductPage from "./customer/pages/ProductPage/ProductPage";
import Cart from "./customer/components/Cart/Cart";
import AboutPage from "./customer/components/AboutPage/AboutPage";
import Blog from "./customer/components/Blog/Blog";
import Login from "./customer/components/Login/Login";
import Order from "./customer/components/Order/Order";
import OrderDetail from "./customer/components/OrderDetail/OrderDetail";
import SetProfile from "./customer/components/SetProfle/SetProfile";
import Register from "./customer/components/Register/Register";
import ForgotPass from "./customer/components/ForgotPass/ForgotPass";
import ResetPass from "./customer/components/ForgotPass/ResetPass";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/set-profile" element={<SetProfile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/cart/:id" element={<Cart />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/my-order/:id" element={<Order />} />
        <Route path="/order-detail/:id/:state" element={<OrderDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/products/:trademark" element={<ProductPage />} />
        <Route path="/products/search/:searchKey" element={<ProductPage />} />
        <Route path="product-detail/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
