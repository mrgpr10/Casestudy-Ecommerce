import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import './CartPage.css'; // Importing custom CSS
import axios from 'axios';

function CartPage() {
  const { cartItems, addToCart, removeFromCart, updateQuantity, getTotalAmount } = useContext(CartContext);
  const { userId, cartId, setCartId } = useContext(UserContext);
  const [selectedItems, setSelectedItems] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setCartId(cartId);
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }

    const fetchCart = async () => {
      try {
        if (cartId == undefined) {

          setLoading(true);

          const url2 = `http://localhost:5120/api/Cart/${userId}`;
          const response = await axios.post(url2, {
            headers: {
              Authorization: `Bearer${token}`
            }
          });
          setCartId(response.data);
        }
      }

      catch (error) {
        if (error.code == "ERR_NETWORK") {
          alert(error.message);
          localStorage.removeItem('token');
          navigate('/login');
          console.log(error.message);
        }
        if (error.status === 401) {
          alert("Your token expired or you are not authorized for this page");
          localStorage.removeItem('token');
          navigate('/login');
        }
        console.error('Error fetching cartId', error);
      }
    };
    fetchCart();
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
      setLoading(false);
      try {
        const url = `http://localhost:5120/api/CartItem/${cartId}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        addToCart(response.data.$values);
      }
      catch (error) {
        if (error.status === 401) {
          alert("Your token expired or you are not authorized for this page");
          localStorage.removeItem('token');
          navigate('/login');
        }
        else if (error.code == "ERR_NETWORK") {
          alert(error.message);
          localStorage.removeItem('token');
          navigate('/login');
          console.log(error.message);
        }
        console.error('Error fetching products', error);
      }
    };
    fetchCartItems();
  }, [cartId]);


  const handleCheckboxChange = (productId) => {
    setSelectedItems(prevState => ({
      ...prevState,
      [productId]: !prevState[productId]
    }));
  };

  const handleQuantityChange = (cartItemId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    const cItem = cartItems.filter(item => item.cartItemId == cartItemId);
    if (newQuantity > cItem[0].product.inventory.stockQuantity) {
      alert("stock not available");
      updateQuantity(cartItemId, 1);
    }
    // console.log(newQuantity);
    else {
      updateQuantity(cartItemId, newQuantity);
    }
  };

  const calculateSelectedTotal = () => {
    return cartItems.reduce((total, item) =>
      selectedItems[item.cartItemId] ? total + item.product.price * item.quantity : total,
      0
    );
  };


  const handleBuyNow = () => {
    const amt = getTotalAmount();
    navigate('/orderdetail', { state: { fromcart: 1, selectedProducts: cartItems, amount: amt } });
  }

  const handleBuyNowSelected = () => {
    const amt = calculateSelectedTotal();
    const selprods = cartItems.filter(item => selectedItems[item.cartItemId]);
    navigate('/orderdetail', { state: { fromcart: 3, selectedProducts: selprods, amount: amt } });
  }

  return (
    <div>
      {loading ? (
        <div className="loading-screen">Loading...</div>
      ) : (
        <div className="cart-page">
          <h2 className="cart-page-title">Your Cart</h2>
          {cartItems.length === 0 ? (
            <p className="empty-cart-message">Your cart is empty.</p>
          ) : (
            <div>
              <ul className="cart-items-list">
                {cartItems.map((item) => (
                  <li key={item.$id} className="cart-item">
                    <div className="cart-item-details">
                      <h4>{item.product.name}</h4>
                      <p>Price: ₹{item.product.price}</p>
                      <div className="quantity-selector">
                        <label>Quantity: </label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleQuantityChange(item.cartItemId, e)}
                          className="quantity-input"
                        />
                      </div>
                      <div className="checkbox-remove">
                        <input
                          type="checkbox"
                          checked={!!selectedItems[item.cartItemId]}
                          onChange={() => handleCheckboxChange(item.cartItemId)}
                          className="item-checkbox"
                        />
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          className="remove-button"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-totals">
                <button
                  className="buy-now-button"
                  onClick={() => handleBuyNow()}
                >
                  Buy Now - Total Amount: ₹{getTotalAmount()}
                </button>
                <button
                  className="buy-now-button"
                  onClick={() => handleBuyNowSelected()}
                >
                  Buy Now - Selected Amount: ₹{calculateSelectedTotal()}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default CartPage;
