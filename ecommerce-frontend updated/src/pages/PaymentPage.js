
import React, { useState, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import { useNavigate, useLocation } from 'react-router-dom';
import './PaymentPage.css';  // Importing the CSS
import axios from 'axios';


function PaymentPage() {
  const { cartItems, clearCart, addOrder, getTotalAmount } = useContext(CartContext);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({ cardHolder: '', cvv: '', cardNumber: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');


  const orderDTO = location.state.orderDTO;
  const amount = location.state.totalamount;


  const handlePayment = () => {
    setLoading(true);
    if (paymentMethod === 'cod') {
      orderDTO.PaymentMethod = "Cash on Delivery";
      createOrder();
    }
    else if (paymentMethod === 'upi') {
      if (upiId) {
        orderDTO.PaymentMethod = "UPI Payment";
        createOrder();
      } else {
        alert('Please enter your UPI ID.');
        setLoading(false);
      }
    }
    else if (paymentMethod === 'card') {
      if (cardDetails.cardHolder && cardDetails.cvv && cardDetails.cardNumber) {
        orderDTO.PaymentMethod = "Card Payment";
        createOrder();
      } else {
        alert('Please fill in all card details.');
        setLoading(false);
      }
    }
    else {
      alert('Please select a payment method.');
      setLoading(false);
    }
  };

  const createOrder = async () => {
    try {
      const url2 = `http://localhost:5120/api/Order`;
      await axios.post(url2, orderDTO, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      clearCart();
      navigate('/myorders');
    }
    catch (error) {
      if (error.response.status === 401) {
        alert("Your token expired or you are not authorized for this page");
        localStorage.removeItem('token');
        navigate('/login');
      }
      else {
        alert("error. please retry logging in");
        navigate('/login');
      }
    }
  };

  return (
    <div className="payment-page-container">
      <div className="payment-page">
        <h2>Select Payment Method</h2>
        <div className="payment-methods">
          <div className="payment-option">
            <p>{amount}</p>
            <input
              type="radio"
              id="cod"
              name="payment-method"
              value="cod"
              checked={paymentMethod === 'cod'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="cod">Cash on Delivery</label>
          </div>
          <div className="payment-option">
            <input
              type="radio"
              id="upi"
              name="payment-method"
              value="upi"
              checked={paymentMethod === 'upi'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="upi">UPI</label>
            {paymentMethod === 'upi' && (
              <input
                type="text"
                placeholder="Enter UPI ID"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
                aria-label="UPI ID"
              />
            )}
          </div>
          <div className="payment-option">
            <input
              type="radio"
              id="card"
              name="payment-method"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            <label htmlFor="card">Debit/Credit Card</label>
            {paymentMethod === 'card' && (
              <div className="card-details">
                <input
                  type="text"
                  placeholder="Card Holder Name"
                  value={cardDetails.cardHolder}
                  onChange={(e) => setCardDetails({ ...cardDetails, cardHolder: e.target.value })}
                  aria-label="Card Holder Name"
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardDetails.cardNumber}
                  onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                  aria-label="Card Number"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  aria-label="Card CVV"
                />
              </div>
            )}
          </div>
        </div>
        <button
          className="pay-now-button"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
