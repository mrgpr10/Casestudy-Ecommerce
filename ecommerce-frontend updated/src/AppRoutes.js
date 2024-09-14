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
import order from './pages/OrderDetails'
import OrderDetailsPage from './pages/OrderDetails';



function AppRoutes() {
  // const navigate = useNavigate();
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </Router>
        <Router>
          <div>
            <Navbar />
          </div>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route path="/address" element={<AddressPage />} />


            <Route
              path="/category/electronics"
              element={
                <Layout>
                  <ElectronicsPage />
                </Layout>
              }
            />

            <Route
              path="/order-page"
              element={
                <Layout>
                  <OrdersPage />
                </Layout>
              }
            />
            <Route
              path="/payment-page"
              element={
                <Layout>
                  <PaymentPage />
                </Layout>
              }
            />
            <Route
              path="/cart"
              element={
                <Layout>
                  <CartPage />
                </Layout>
              }
            />

            <Route
              path="/user"
              element={
                <Layout>
                  <UserPage />
                </Layout>
              }
            />

            <Route
              path="/wishlist"
              element={
                <Layout>
                  <WishlistPage />
                </Layout>
              }
            />

            <Route
              path="/orderdetail"
              element={
                <Layout>
                  <OrderDetailsPage/>
                </Layout>
              }
            />

            <Route path="/chatbot" element={<ChatBot />} />

          </Routes>
        </Router>

      </CartProvider>
    </UserProvider>
  );
}

export default AppRoutes;
