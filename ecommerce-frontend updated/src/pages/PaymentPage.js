
// import React, { useState, useContext } from 'react';
// import { CartContext } from '../context/CartContext';
// import { UserContext } from '../context/UserContext';
// import { useNavigate } from 'react-router-dom';
// import './PaymentPage.css';  // Importing the CSS

// function PaymentPage() {
//   const { cartItems, clearCart, addOrder, getTotalAmount } = useContext(CartContext);
//   const [paymentMethod, setPaymentMethod] = useState('');
//   const [upiId, setUpiId] = useState('');
//   const [cardDetails, setCardDetails] = useState({ cardHolder: '', cvv: '', cardNumber: '' });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handlePayment = () => {
//     setLoading(true);
//     if (paymentMethod === 'cod') {
//       createOrder('Cash on Delivery');
//     } else if (paymentMethod === 'upi') {
//       if (upiId) {
//         createOrder('UPI Payment');
//       } else {
//         alert('Please enter your UPI ID.');
//         setLoading(false);
//       }
//     } else if (paymentMethod === 'card') {
//       if (cardDetails.cardHolder && cardDetails.cvv && cardDetails.cardNumber) {
//         createOrder('Card Payment');
//       } else {
//         alert('Please fill in all card details.');
//         setLoading(false);
//       }
//     } else {
//       alert('Please select a payment method.');
//       setLoading(false);
//     }
//   };

//   const createOrder = (paymentType) => {
//     const orderDetails = {
//       id: new Date().getTime(), // Generate a unique order ID
//       products: cartItems.map(item => ({ name: item.name, quantity: item.quantity, price: item.price })),
//       totalPrice: getTotalAmount(),
//       paymentType,
//       status: 'Processing',
//     };

//     addOrder(orderDetails);
//     clearCart();
//     navigate('/order-page');
//   };

//   return (
//     <div className="payment-page-container">
//       <div className="payment-page">
//         <h2>Select Payment Method</h2>
//         <div className="payment-methods">
//           <div className="payment-option">
//             <input
//               type="radio"
//               id="cod"
//               name="payment-method"
//               value="cod"
//               checked={paymentMethod === 'cod'}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             />
//             <label htmlFor="cod">Cash on Delivery</label>
//           </div>
//           <div className="payment-option">
//             <input
//               type="radio"
//               id="upi"
//               name="payment-method"
//               value="upi"
//               checked={paymentMethod === 'upi'}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             />
//             <label htmlFor="upi">UPI</label>
//             {paymentMethod === 'upi' && (
//               <input
//                 type="text"
//                 placeholder="Enter UPI ID"
//                 value={upiId}
//                 onChange={(e) => setUpiId(e.target.value)}
//                 aria-label="UPI ID"
//               />
//             )}
//           </div>
//           <div className="payment-option">
//             <input
//               type="radio"
//               id="card"
//               name="payment-method"
//               value="card"
//               checked={paymentMethod === 'card'}
//               onChange={(e) => setPaymentMethod(e.target.value)}
//             />
//             <label htmlFor="card">Debit/Credit Card</label>
//             {paymentMethod === 'card' && (
//               <div className="card-details">
//                 <input
//                   type="text"
//                   placeholder="Card Holder Name"
//                   value={cardDetails.cardHolder}
//                   onChange={(e) => setCardDetails({ ...cardDetails, cardHolder: e.target.value })}
//                   aria-label="Card Holder Name"
//                 />
//                 <input
//                   type="text"
//                   placeholder="Card Number"
//                   value={cardDetails.cardNumber}
//                   onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
//                   aria-label="Card Number"
//                 />
//                 <input
//                   type="text"
//                   placeholder="CVV"
//                   value={cardDetails.cvv}
//                   onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
//                   aria-label="Card CVV"
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//         <button
//           className="pay-now-button"
//           onClick={handlePayment}
//           disabled={loading}
//         >
//           {loading ? 'Processing...' : 'Pay Now'}
//         </button>
//       </div>
//     </div>
//   );
// }

// export default PaymentPage;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mac from "../assets/images/macbook.jpg";
import iphone from "../assets/images/iphone.png";
import styles from './OrderDetailsPage.module.css'; // Use CSS module

const staticProducts = [
  { id: 1, image: mac, title: 'Product 1', price: 20, quantity: 1 },
  { id: 2, image: iphone, title: 'Product 2', price: 30, quantity: 1 },
];

const initialAddresses = [
  { id: 1, address: '123 Main St, City, Country' },
  { id: 2, address: '456 Elm St, City, Country' },
];

const OrderDetailsPage = () => {
  const [products] = useState(staticProducts);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [addresses] = useState(initialAddresses);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [newAddress, setNewAddress] = useState({
    name: '',
    houseNo: '',
    street: '',
    area: '',
    city: '',
    district: '',
    state: '',
    pinCode: '',
  });
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [upi, setUpi] = useState('');
  const [creditCard, setCreditCard] = useState({ number: '', expiry: '', cvv: '' });

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
  };

  const handleAddOrUpdateAddress = () => {
    if (editingAddress) {
      setEditingAddress(null);
    } else {
      setShowAddressForm(false);
      setNewAddress({
        name: '',
        houseNo: '',
        street: '',
        area: '',
        city: '',
        district: '',
        state: '',
        pinCode: '',
      });
    }
  };

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleUpiChange = (event) => {
    setUpi(event.target.value);
  };

  const handleCreditCardChange = (event) => {
    const { name, value } = event.target;
    setCreditCard((prevCard) => ({ ...prevCard, [name]: value }));
  };

  const handlePayment = () => {
    if (!selectedAddress) {
      alert('Please select or add a delivery address.');
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = () => {
    if (paymentMethod === 'cashOnDelivery') {
      navigate('/cart');
    } else {
      // Handle UPI and Credit Card submission
      console.log('Payment Method:', paymentMethod);
      console.log('UPI:', upi);
      console.log('Credit Card:', creditCard);
    }
    setShowPaymentModal(false);
  };

  const navigate = useNavigate();

  const totalPrice = products.reduce((total, product) => total + product.price * product.quantity, 0);
  const discount = totalPrice * 0.1; // Example discount
  const finalPrice = totalPrice - discount;

  return (
    <div className={styles.orderDetailsContainer}>
      <div className={styles.mainContent}>
        <div className={styles.productsSection}>
          <h2 className={styles.sectionTitle}>Products</h2>
          <div className={styles.productList}>
            {products.map((product) => (
              <div key={product.id} className={styles.productItem}>
                <div className={styles.productDetails}>
                  <img src={product.image} alt={product.title} className={styles.productImage} />
                  <div className={styles.productInfo}>
                    <h3>{product.title}</h3>
                    <p className={styles.productDescription}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </p>
                    <p className={styles.productPrice}>Price: ${product.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address Section */}
        <div className={styles.addressSection}>
          <h2 className={styles.sectionTitle}>Choose Delivery Address</h2>
          <select value={selectedAddress} onChange={handleAddressChange} className={styles.addressSelect}>
            <option value="">Select an address</option>
            {addresses.map((address) => (
              <option key={address.id} value={address.id}>
                {address.address}
              </option>
            ))}
          </select>
          <button onClick={() => setShowAddressForm(!showAddressForm)} className={styles.addAddressButton}>
            {showAddressForm ? 'Cancel' : (editingAddress ? 'Edit Address' : 'Add New Address')}
          </button>
          {showAddressForm && (
            <div className={styles.addressForm}>
              <form>
                <input
                  type="text"
                  name="name"
                  placeholder="Customer Name"
                  value={newAddress.name}
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
                <input
                  type="text"
                  name="houseNo"
                  placeholder="House No"
                  value={newAddress.houseNo}
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
                <input
                  type="text"
                  name="street"
                  placeholder="Street Name"
                  value={newAddress.street}
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
                <input
                  type="text"
                  name="area"
                  placeholder="Area/Region"
                  value={newAddress.area}
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={newAddress.city}
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
                <input
                  type="text"
                  name="district"
                  placeholder="District"
                  value={newAddress.district}
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  value={newAddress.state}
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
                <input
                  type="text"
                  name="pinCode"
                  placeholder="Pin Code"
                  value={newAddress.pinCode}
                  onChange={handleInputChange}
                  className={styles.inputField}
                />
                <button
                  type="button"
                  onClick={handleAddOrUpdateAddress}
                  className={styles.saveAddressButton}
                >
                  {editingAddress ? 'Update Address' : 'Add Address'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Order Summary Section */}
      <div className={styles.orderSummary}>
        <h2 className={styles.sectionTitle}>Order Summary</h2>
        {products.map((product) => (
          <div key={product.id}>
            <p>{product.title} - ${product.price}</p>
          </div>
        ))}
        <p className={styles.summaryTotal}>Subtotal: ${totalPrice}</p>
        {discount > 0 && <p className={styles.summaryDiscount}>Discount: -${discount.toFixed(2)}</p>}
        <p className={styles.summaryFinal}>Total Price: ${finalPrice.toFixed(2)}</p>
        <button onClick={handlePayment} className={styles.payButton}>Pay (${finalPrice.toFixed(2)})</button>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className={styles.paymentModal}>
          <h2 className={styles.paymentTitle}>Select Payment Method</h2>
          <select value={paymentMethod} onChange={handlePaymentMethodChange} className={styles.paymentSelect}>
            <option value="">Select Payment Method</option>
            <option value="upi">UPI</option>
            <option value="creditCard">Credit Card</option>
            <option value="cashOnDelivery">Cash on Delivery</option>
          </select>
          {paymentMethod === 'upi' && (
            <div className={styles.paymentMethodSection}>
              <input
                type="text"
                placeholder="Enter UPI ID"
                value={upi}
                onChange={handleUpiChange}
                className={styles.inputField}
              />
            </div>
          )}
          {paymentMethod === 'creditCard' && (
            <div className={styles.paymentMethodSection}>
              <input
                type="text"
                name="number"
                placeholder="Credit Card Number"
                value={creditCard.number}
                onChange={handleCreditCardChange}
                className={styles.inputField}
              />
              <input
                type="text"
                name="expiry"
                placeholder="Expiry Date"
                value={creditCard.expiry}
                onChange={handleCreditCardChange}
                className={styles.inputField}
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={creditCard.cvv}
                onChange={handleCreditCardChange}
                className={styles.inputField}
              />
            </div>
          )}
          <button onClick={handlePaymentSubmit} className={styles.submitPaymentButton}>
            {paymentMethod === 'cashOnDelivery' ? 'Proceed' : 'Submit Payment'}
          </button>
          <button onClick={() => setShowPaymentModal(false)} className={styles.closePaymentModalButton}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderDetailsPage;
