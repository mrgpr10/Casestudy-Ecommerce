import axios from 'axios';
import React, { createContext, useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

// Reference to store current cartItems



export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { cartId } = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [updateFlag, setUpdateFlag] = useState(false);

  // const navigate = useNavigate();
  const [orders, setOrders] = useState([]); // Manage orders here
  const token = localStorage.getItem('token');

  const addItemToCart = async (product) => {
    try {
      const token = localStorage.getItem('token');
      console.log(token);
      // console.log("response", product.productId );
      const url1 = `http://localhost:5120/api/CartItem`;
      const cartItem = {
        CartId: cartId,
        ProductId: product.productId,
        Quantity: 1
      }
      const response2 = await axios.post(url1, cartItem, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response2.data.status) return 1;
    }
    catch (error) {
      console.log(error);
      if (error.code == "ERR_NETWORK") {
        alert(error.message);
        localStorage.removeItem('token');
        // navigate('/login');
      }
      if (error.response.status === 401) {
        alert("Your token expired or you are not authorized for this page");
        localStorage.removeItem('token');
        // navigate('/login');
      }
      return 0;
      // console.error('Error fetching products', error);
    }
  }

  const addToCart = (product) => {
    setCartItems(product);
  };

  const removeFromCart = async (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.cartItemId !== productId));
    await new Promise(resolve => setTimeout(resolve, 0));
    try {
      const url1 = `http://localhost:5120/api/CartItem/${productId}`;
      await axios.delete(url1, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    catch (error) {
      console.error('Error updating cart items:', error);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity == null) {
      return;
    }


    setCartItems(prevItems =>
      prevItems.map(item =>
        item.cartItemId === productId
          ? { ...item, quantity }
          : item
      )
    );
    setUpdateFlag(true);
  };


  // const changedItem = cartItems.map( item => { if(item.cartItemId == productId){
  //  return item;
  // }});


  useEffect(() => {
    const updateCartItemsInServer = async () => {
      const url1 = `http://localhost:5120/api/CartItem`;
      try {
        await axios.put(url1, cartItems, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.error('Error updating cart items:', error);
      } finally {
        setUpdateFlag(false); // Reset flag after API call
      }
    };

    updateCartItemsInServer();
  }, [cartItems, token]);


  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => Math.floor((total + item.product.price * item.quantity) * 100) / 100, 0);
  };


  const addOrder = (orderDetails) => {
    setOrders(prevOrders => [...prevOrders, orderDetails]);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, orders, addItemToCart, addToCart, removeFromCart, updateQuantity, getTotalAmount, addOrder, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
