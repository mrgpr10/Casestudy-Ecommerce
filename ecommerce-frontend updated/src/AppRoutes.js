// src/AppRoutes.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ElectronicsPage from './pages/ElectronicsPage';
import UserPage from './pages/UserPage';
import HomePage from './pages/HomePage';
import OrdersPage from './pages/OrdersPage';
import PaymentPage from './pages/PaymentPage';
import Layout from './components/Layout';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import AddressPage from './pages/AddressPage';
import Navbar from './pages/Navbar';
import ChatBot from './pages/ChatBot';
import OrderDetailsPage from './pages/OrderDetails';



function AppRoutes() {
  // const navigate = useNavigate();
  return (
    <UserProvider>
      <CartProvider>
        <Router>

          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/" element={<div> <Navbar /><HomePage /> </div>} />
            <Route
              path="/address"
              element={
                <div>
                  <Navbar />
                  <AddressPage />
                </div>} />
            <Route
              path="/category/electronics"
              element={
                <div>
                  <Navbar />
                  <ElectronicsPage />
                </div>
              }
            />

            <Route
              path="/myorders"
              element={
                <div>
                  <Navbar />
                  <OrdersPage />
                </div>
              }
            />
            {/* <Route
              path="/payment-page"
              element={
                <div><Navbar />
                  <PaymentPage />
                </div>
              }
            /> */}
            <Route
              path="/cart"
              element={
                <div>
                  <Navbar />
                  <CartPage />
                </div>
              }
            />

            <Route
              path="/user"
              element={
                <div>
                  <Navbar />
                  <UserPage />
                </div>
              }
            />

            <Route
              path="/wishlist"
              element={
                <div>
                  <Navbar />
                  <WishlistPage />
                </div>
              }
            />

            <Route
              path="/chatbot"
              element={
                <div>
                  <Navbar />
                  <ChatBot />
                </div>} />
            <Route
              path="/orderdetail"
              element={
                <div>
                  <Navbar />
                  <OrderDetailsPage />
                </div>
              }
            />

          </Routes>
        </Router>

      </CartProvider>
    </UserProvider>
  );
}

export default AppRoutes;
