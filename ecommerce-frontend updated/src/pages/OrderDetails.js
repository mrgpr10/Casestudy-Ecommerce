import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import mac from "../assets/images/macbook.jpg";
import iphone from "../assets/images/iphone.png";
import styles from './OrderDetailsPage.module.css';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import { CartContext } from '../context/CartContext';


const OrderDetailsPage = () => {
    const { userId, setUserId } = useContext(UserContext);
    const { clearCart, clearSelected } = useContext(CartContext);
    const [products, setProducts] = useState([]);
    const [amount, setAmount] = useState(0);
    const navigate = useNavigate();
    const location = useLocation();
    const [fromcart, setFromCart] = useState(0);
    const token = localStorage.getItem('token');

    useState(() => {
        console.log(location.state.fromcart);
        setFromCart(location.state.fromcart);
    }, [location.state]);

    //handling address selection and adding

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [newAddress, setNewAddress] = useState({
        UserId: userId,
        AddressLine1: '',
        AddressLine2: '',
        PostalCode: '',
        City: '',
        Region: '',
        Country: ''
    });

    const handleAddressChange = (event) => {
        const addressId = event.target.value;
        // const selected = addresses.find(addr => addr.addressId === addressId);
        setSelectedAddress(addressId);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewAddress((prevAddress) => ({ ...prevAddress, [name]: value }));
    };

    const handleAddOrUpdateAddress = async () => {
        if (editingAddress) {
            setEditingAddress(null);
        } else {
            setShowAddressForm(false);
            try {
                const addr = await axios.post(`http://localhost:5120/api/Address/`, newAddress, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                console.log(addr);
                setSelectedAddress(newAddress);
                setAddresses(prevAddresses => [
                    ...prevAddresses,
                    addr.data
                ]);
                alert('Address added succesfully');
            } catch (error) {
                alert('Error updating user details');
                if (error.response.status === 401) {
                    alert("Your token expired or you are not authorized for this page");
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            }
            setNewAddress({
                UserId: userId,
                AddressLine1: '',
                AddressLine2: '',
                PostalCode: '',
                City: '',
                Region: '',
                Country: ''
            });
        }
    };

    useEffect(() => {
        const fetchAddress = async () => {
            const response = await axios.get(`http://localhost:5120/api/Address/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            const addr = response.data.$values;
            setAddresses(addr);
        }
        fetchAddress();
    }, [userId]);



    // Fetch orderItems

    useEffect(() => {
        if (location.state) {
            setProducts(location.state.selectedProducts || []);
            setAmount(location.state.amount || 0);
        }
    }, [location.state]);

    const finalPrice = amount;

    //payment processing


    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [upi, setUpi] = useState('');
    const [creditCard, setCreditCard] = useState({ number: '', expiry: '', cvv: '' });
    const [loading, setLoading] = useState(false);
    const [orderdto, setOrderdto] = useState(null);
    const [flag, setFlag] = useState(false);

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
        setShowPaymentModal(true);
    }

    const handlePaymentSubmit = async () => {
        console.log(selectedAddress);
        if (selectedAddress == null) {
            alert('Please select or add a delivery address.');
            return;
        }
        if (selectedAddress == 0) {
            alert('Please select or add a delivery address....');
            return;
        }
        setLoading(true);
        const orderItems = products.map(item => ({
            ProductId: item.product.productId,
            Quantity: item.quantity,
            UnitPrice: item.product.price
        }));

        const orderDTO = {
            UserId: userId,
            AddressId: selectedAddress,
            Amount: amount,
            OrderItemlist: orderItems
        }
        setOrderdto(orderDTO);

        // navigate('/payment-page', { state: { order: products, orderDTO: orderDTO, totalamount: amount } });

        if (paymentMethod === 'cashOnDelivery') {
            orderDTO.PaymentMethod = "Cash on Delivery";
            setFlag(true);
        }
        else if (paymentMethod === 'upi') {
            if (upi) {
                orderDTO.PaymentMethod = "UPI Payment";
                setFlag(true);
            } else {
                alert('Please enter your UPI ID.');
                setLoading(false);
            }
        }
        else if (paymentMethod === 'creditCard') {
            if (creditCard.number && creditCard.expiry && creditCard.cvv) {
                orderDTO.PaymentMethod = "Card Payment";
                setFlag(true);
            } else {
                alert('Please fill in all card details.');
                setLoading(false);
            }
        }
        else {
            alert('Please select a payment method.');
            setLoading(false);
        }

        if (flag) {
            try {
                const url2 = `http://localhost:5120/api/Order`;
                await axios.post(url2, orderDTO, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (fromcart == 1) {
                    clearCart();
                }
                else if (fromcart == 3) {
                    clearSelected(products);
                }
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
        }
    };




    return (
        <div className={styles.orderDetailsContainer}>
            <div className={styles.mainContent}>
                <div className={styles.productsSection}>
                    <h2 className={styles.sectionTitle}>Products</h2>
                    <div className={styles.productList}>
                        {products.map((item) => (
                            <div key={item.$id} className={styles.productItem}>
                                <div className={styles.productDetails}>
                                    <img src={mac} /*{product.image}*/ alt={item.product.name} className={styles.productImage} />
                                    <div className={styles.productInfo}>
                                        <h3>{item.product.name}</h3>
                                        <p className={styles.productPrice}>Price: ₹{item.product.price}</p>
                                        <p className={styles.productPrice}>Quantity: {item.quantity}</p>
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
                        <option value={0} >Select an address</option>
                        {addresses.map((address) => (
                            <option key={address.$id} value={address.addressId}>
                                <p>{address.addressLine1}, </p>
                                <p>{address.addressLine2}, </p>
                                <p>{address.city},</p><p> {address.region},</p><p> {address.country}</p>
                                <p>  -  {address.postalCode}</p>
                            </option>
                        ))}
                    </select>
                    <button onClick={() => setShowAddressForm(!showAddressForm)} className={styles.addAddressButton}>
                        {showAddressForm ? 'Cancel' : (editingAddress ? 'Edit Address' : 'Add New Address')}
                    </button>
                    {showAddressForm && (
                        <div className={styles.addressForm}>
                            <form>
                                <input type="text" name="AddressLine1" placeholder="Address Line 1" value={newAddress.AddressLine1} onChange={handleInputChange} className={styles.inputField} />
                                <input type="text" name="AddressLine2" placeholder="Address Line 2" value={newAddress.AddressLine2} onChange={handleInputChange} className={styles.inputField} />
                                <input type="text" name="City" placeholder="City" value={newAddress.City} onChange={handleInputChange} className={styles.inputField} />
                                <input type="text" name="Region" placeholder="State" value={newAddress.Region} onChange={handleInputChange} className={styles.inputField} />
                                <input type="text" name="Country" placeholder="Country" value={newAddress.Country} onChange={handleInputChange} className={styles.inputField} />
                                <input type="text" name="PostalCode" placeholder="Pin Code" value={newAddress.PostalCode} onChange={handleInputChange} className={styles.inputField} />
                                <button type="button" onClick={handleAddOrUpdateAddress} className={styles.saveAddressButton} >
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
                <p className={styles.summaryTotal}>Subtotal: {/*totalPrice*/}</p>
                {products.map((item) => (
                    <div key={item.$id}>
                        <p>{item.product.name} - ₹{item.product.price}</p>
                    </div>
                ))}
                {/* {discount > 0 && <p className="summary-discount">Discount: -${discount.toFixed(2)}</p>} */}
                <p className={styles.summaryFinal}>Total Price: ₹{finalPrice.toFixed(2)}</p>
                <button onClick={handlePayment} className={styles.payButton}>Confirm & Pay    -   ₹{finalPrice.toFixed(2)}</button>
            </div>

            {showPaymentModal && (
                <div className={styles.paymentModal}>
                    <h2 className={styles.paymentTitle}>Select Payment Method</h2>
                    <select value={paymentMethod} onChange={handlePaymentMethodChange} className={styles.paymentSelect}>
                        <option value="" disabled="true">Select Payment Method</option>
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
        </div >
    );
};

export default OrderDetailsPage;