import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './RegisterPage.css'; // Import your CSS file

function RegisterPage() {
  const [Fname, setFname] = useState('');
  const [Sname, setSname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!email.includes('@')) {
      setError('Invalid email format');
      return false;
    }
    if (Fname.length < 1) {
      setError('First Name cannot be empty');
      return false;
    }
    if (Sname.length < 1) {
      setError('Last Name cannot be empty');
      return false;
    }
    if (password.length < 3) {
      setError('Password must be at least 3 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    setError('');
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5120/api/Customer/', {
        UserName: Fname + ' ' + Sname,
        Email: email,
        Password: password
      });
      navigate('/login');
    } catch (error) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    // Add OTP verification logic here
  };

  return (
    <div className="container">
      <h2 className="title">Register</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      {/* {!otpSent ? ( */}
      <form className="form" onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="First Name"
          value={Fname}
          onChange={(e) => setFname(e.target.value)}
          className="input"
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={Sname}
          onChange={(e) => setSname(e.target.value)}
          className="input"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input"
          required
        />
        <button type="submit" className="submitButton" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {/* ) : (
        <form className="form otpForm" onSubmit={handleOtpVerify}>
          <p className="otpInstruction">Please check your email for the OTP.</p>
          <input
            type="text"
            placeholder="Enter OTP"
            // value={otp}
            // onChange={(e) => setOtp(e.target.value)}
            className="input"
            required
          />
          <button type="submit" className="submitButton" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify OTP'}
          </button>
        </form>
      )} */}
    </div>
  );
}

export default RegisterPage;










//------------------------------------------------------------------------------------------------------------------

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './RegisterPage.css'; // Import your CSS file

// function RegisterPage() {
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const navigate = useNavigate();

//   const validateForm = () => {
//     if (!email.includes('@')) {
//       setError('Invalid email format');
//       return false;
//     }
//     if (phone.length < 10) {
//       setError('Phone number must be at least 10 digits');
//       return false;
//     }
//     if (password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return false;
//     }
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return false;
//     }
//     setError('');
//     return true;
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       // Backend required
//       // await axios.post('/api/send-otp', { email });
//       setSuccess('OTP sent to your email. Please check your inbox.');
//       setOtpSent(true);
//     } catch (error) {
//       setError('Failed to send OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleOtpVerify = async (e) => {
//     e.preventDefault();
//     // Add OTP verification logic here
//   };

//   return (
//     <div className="register-page">
//       <h2 className="register-title">Register</h2>
//       {error && <p className="error-message">{error}</p>}
//       {success && <p className="success-message">{success}</p>}
//       {!otpSent ? (
//         <form className="register-form" onSubmit={handleRegister}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="form-input"
//             required
//           />
//           <input
//             type="tel"
//             placeholder="Phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             className="form-input"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className="form-input"
//             required
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             className="form-input"
//             required
//           />
//           <button type="submit" className="submit-button" disabled={loading}>
//             {loading ? 'Registering...' : 'Register'}
//           </button>
//         </form>
//       ) : (
//         <form className="otp-form" onSubmit={handleOtpVerify}>
//           <p className="otp-instruction">Please check your email for the OTP.</p>
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             // value={otp}
//             // onChange={(e) => setOtp(e.target.value)}
//             className="form-input"
//             required
//           />
//           <button type="submit" className="submit-button" disabled={loading}>
//             {loading ? 'Verifying...' : 'Verify OTP'}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default RegisterPage;


//===================================================================================================================

// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function RegisterPage() {
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState(true);
//   //backend required
//   //const [success, setSuccess] = useState('');
//   const [otpSent, setOtpSent] = useState(false);
//   const navigate = useNavigate();

//   const validateForm = () => {
//     if (!email.includes('@')) {
//       setError('Invalid email format');
//       return false;
//     }
//     if (phone.length < 10) {
//       setError('Phone number must be at least 10 digits');
//       return false;
//     }
//     if (password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return false;
//     }
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return false;
//     }
//     setError('');
//     return true;
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       //backend required
//       // Send OTP request to backend
//      // await axios.post('/api/send-otp', { email });
//       setSuccess('OTP sent to your email. Please check your inbox.');
//       setOtpSent(true);
//     } catch (error) {
//       setError('Failed to send OTP. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {success && <p style={{ color: 'green' }}>{success}</p>}
//       {!otpSent ? (
//         <form onSubmit={handleRegister}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="tel"
//             placeholder="Phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Confirm Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//           <button type="submit" disabled={loading}>
//             {loading ? 'Registering...' : 'Register'}
//           </button>
//         </form>
//       ) : (
//         <form
//         //backend required
//          /*onSubmit={handleOtpVerify}*/>
//           <p>Please check your email for the OTP.</p>
//           <input
//             type="text"
//             placeholder="Enter OTP"
//             //backend required
//             //value={otp}
//            // onChange={(e) => setOtp(e.target.value)}
//             required
//           />
//           <button type="submit" disabled={loading}>
//             {loading ? 'Verifying...' : 'Verify OTP'}
//           </button>
//         </form>
//       )}
//     </div>
//   );
// }

// export default RegisterPage;
