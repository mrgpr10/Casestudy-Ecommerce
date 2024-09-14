import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

function UserPage() {
  const [userDetails, setUserDetails] = useState({
    UserName: '',
    Email: '',
    Password: ''
  });

  const navigate = useNavigate();
  const { userId } = useContext(UserContext);
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("in userpage: ", userId);
    const getUserdata = async () => {
      const response = await axios.get(`http://localhost:5120/api/Customer/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserDetails(response.data);
    }
    getUserdata();
  }, userId);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5120/api/Customer/${userId}`, userDetails, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }); alert('User details updated successfully');
      navigate('/user');
    } catch (error) {
      alert('Error updating user details');
      if (error.response.status === 401) {
        alert("Your token expired or you are not authorized for this page");
        localStorage.removeItem('token');
        navigate('/login');
      }
      if (error.response.status === 400) {
        alert("Sorry for the truble, please login again");
        localStorage.removeItem('token');
        navigate('/login');
      }
    }
  };

  const containerStyle = {
    maxWidth: '500px',
    margin: '50px auto',
    padding: '30px',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
    backgroundImage: 'linear-gradient(135deg, #f9f9f9 0%, #e3f2fd 100%)',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '30px',
    fontSize: '24px',
    color: '#333',
    fontWeight: '600',
    letterSpacing: '1px',
  };

  const formGroupStyle = {
    marginBottom: '20px',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#555',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
    fontSize: '16px',
    transition: 'border-color 0.3s ease',
  };

  const inputFocusStyle = {
    borderColor: '#007bff',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    border: 'none',
    borderRadius: '30px',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    textTransform: 'uppercase',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
    boxShadow: '0 8px 15px rgba(0, 123, 255, 0.3)',
  };

  const linkStyle = {
    display: 'block',
    textAlign: 'center',
    marginTop: '25px',
    color: '#007bff',
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Update Your Details</h2>
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Full name:</label>
          <input
            type="text"
            name="FullName"
            value={userDetails.userName}
            onChange={handleInputChange}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Email:</label>
          <input
            type="email"
            name="Email"
            value={userDetails.email}
            onChange={handleInputChange}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
        <div style={formGroupStyle}>
          <label style={labelStyle}>Password:</label>
          <input
            type="password"
            name="Password"
            value={userDetails.password}
            onChange={handleInputChange}
            style={inputStyle}
            onFocus={(e) => e.target.style.borderColor = inputFocusStyle.borderColor}
            onBlur={(e) => e.target.style.borderColor = '#ddd'}
          />
        </div>
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#007bff'}
        >
          Update
        </button>
      </form>
      <a
        href="/address"
        onClick={(e) => {
          e.preventDefault();
          navigate('/address');
        }}
        style={linkStyle}
      >
        Update Address
      </a>
    </div>
  );
}

export default UserPage;
