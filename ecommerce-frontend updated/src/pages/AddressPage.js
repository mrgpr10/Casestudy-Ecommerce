import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AddressPage.css';
import axios from 'axios';
import { UserContext } from '../context/UserContext';

// AddressForm Component
const AddressForm = ({ onAddAddress }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useContext(UserContext);
  const token = localStorage.getItem("token");

  const [address, setAddress] = useState({
    UserId: userId,
    AddressLine1: '',
    AddressLine2: '',
    PostalCode: '',
    City: '',
    Region: '',
    Country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onAddAddress(address);
    setAddress({
      UserId: userId,
      AddressLine1: '',
      AddressLine2: '',
      PostalCode: '',
      City: '',
      Region: '',
      Country: ''
    });
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5120/api/Address/`, address, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      alert('User details updated successfully');
      navigate('/user');
    } catch (error) {
      alert('Error updating user details');
      if (error.response.status === 401) {
        alert("Your token expired or you are not authorized for this page");
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  return (
    <form className="address-form" onSubmit={handleSubmit}>
      <input name="AddressLine1" placeholder="Address Line 1" value={address.AddressLine1} onChange={handleChange} required />
      <input name="AddressLine2" placeholder="Address Line 2" value={address.AddressLine2} onChange={handleChange} required />
      <input name="PostalCode" placeholder="Pincode" value={address.PostalCode} onChange={handleChange} required />
      <input name="City" placeholder="City" value={address.City} onChange={handleChange} required />
      <input name="Region" placeholder="State" value={address.Region} onChange={handleChange} required />
      <input name="Country" placeholder="Country" value={address.Country} onChange={handleChange} required />
      <button type="submit">Add Address</button>
    </form>
  );
};

// AddressList Component
const AddressList = ({ addresses, onSetDefault }) => (
  <ul className="address-list">
    {addresses.map((addr, index) => (
      <li key={index}>
        <div>
          <p><strong>AddressLine1:</strong> {addr.addressLine1}</p>
          <p><strong>AddressLine2:</strong> {addr.addressLine2}</p>
          <p><strong>Pincode:</strong> {addr.postalCode}</p>
          <p><strong>City:</strong> {addr.city}</p>
          <p><strong>State:</strong> {addr.region}</p>
          <p><strong>Country:</strong> {addr.country}</p>
          <button
            className={addr.isDefault ? 'default' : ''}
            onClick={() => onSetDefault(index)}
          >
            {addr.isDefault ? 'Default' : 'Set as Default'}
          </button>
        </div>
      </li>
    ))}
  </ul>
);

// Main AddressPage Component
const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [defaultAddressIndex, setDefaultAddressIndex] = useState(null);
  const { userId } = useContext(UserContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchAddress = async () => {
      const response = await axios.get(`http://localhost:5120/api/Address/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAddresses(response.data.$values);
    };
    fetchAddress();
  }, userId);


  const addAddress = (newAddress) => {
    setAddresses([...addresses, { ...newAddress, isDefault: defaultAddressIndex === addresses.length }]);
  };

  const setDefaultAddress = (index) => {
    const updatedAddresses = addresses.map((addr, idx) => ({
      ...addr,
      isDefault: idx === index
    }));
    setAddresses(updatedAddresses);
    setDefaultAddressIndex(index);
  };

  return (
    <div className="address-page">
      <h1>Manage Addresses</h1>
      <AddressForm onAddAddress={addAddress} />
      <AddressList addresses={addresses} onSetDefault={setDefaultAddress} />
    </div>
  );
};

export default AddressPage;
