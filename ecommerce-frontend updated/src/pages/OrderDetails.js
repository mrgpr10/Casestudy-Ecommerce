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
