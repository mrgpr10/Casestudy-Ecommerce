
// import React, { useState, useEffect, useContext } from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// // import { UserContext } from '../context/UserContext';
// // import { CartContext } from '../context/CartContext';
// import { FaSearch, FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
// import './Navbar.css';
// import logo from "../assets/images/shopease.jpg";
// import axios from 'axios';


// function Navbar() {
//   // const { userId, setUserId, cartId, setCartId } = useContext(UserContext);
//   const [CategoryData, setCategoryData] = useState([]);
//   const [showLoginDropdown, setShowLoginDropdown] = useState(false);
//   const [searchCategory, setSearchCategory] = useState('');
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredSuggestions, setFilteredSuggestions] = useState([]);
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [searchSuggestions, setSearchSuggetions] = useState([]);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const token = localStorage.getItem('token');


//   useEffect(() => {
//     const fetchCategory = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           navigate('/');
//         }
//         const url = 'http://localhost:5120/api/Category';
//         const response = await axios.get(url, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setCategoryData(response.data.$values || []);
//       }
//       catch (error) {
//         console.log(error);
//         if (error.code == "ERR_NETWORK") {
//           alert(error.message);
//           localStorage.removeItem('token');
//           navigate('/login');
//         }
//         if (localStorage.getItem('token') && (error.response.status === 401)) {
//           alert("Your token expired or you are not authorized for this page");
//           localStorage.removeItem('token');
//           navigate('/login');
//         }
//         console.error('Error fetching products', error);
//       }
//     };

//     const fetchProducts = async () => {
//       try {
//         if (!token) {
//           navigate('/login');
//         }
//         const url = 'http://localhost:5120/api/Product';

//         const response = await axios.get(url, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setProducts(response.data.$values);
//       }
//       catch (error) {
//         if (error.code == "ERR_NETWORK") {
//           alert(error.message);
//           localStorage.removeItem('token');
//           navigate('/login');
//           console.log(error.message);
//         }
//         if (error.response.status === 401) {
//           alert("Your token expired or you are not authorized for this page");
//           localStorage.removeItem('token');
//           navigate('/login');
//         }
//         console.error('Error fetching products', error);
//       }
//     };

//     fetchProducts();
//     fetchCategory();
//   }, []);

//   const toggleLoginDropdown = () => {
//     setShowLoginDropdown(!showLoginDropdown);
//   };

//   const handleMouseLeave = () => {
//     setShowLoginDropdown(false);
//   };

//   const handleCategoryChange = (event) => {
//     const selectedCategoryId = event.target.value;
//     const selectedCategory = CategoryData.find(category => category.categoryId == selectedCategoryId);
//     setSearchCategory(selectedCategory);
//     if (selectedCategory) {
//       navigate(`/category/electronics`, { state: { selectedProductId: null, categoryId: selectedCategory.categoryId, categoryName: selectedCategory.categoryName } });
//     }
//   };

//   const handleProfileClick = () => {
//     navigate('/user');
//   };

//   useEffect(() => {
//     setSearchSuggetions(products.map(product => product.name));
//   }, [products]);

//   // Search suggestions list


//   const handleSearchChange = (event) => {
//     const searchValue = event.target.value;
//     setSearchTerm(searchValue);

//     const filtered = searchSuggestions.filter((suggestion) =>
//       suggestion.toLowerCase().includes(searchValue.toLowerCase())
//     );
//     setFilteredSuggestions(filtered);
//     setShowSuggestions(true);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     console.log(suggestion);
//     const product = products.find(item => item.name == suggestion);
//     setSearchTerm(suggestion); // Set search bar value to the clicked suggestion
//     setFilteredSuggestions([]); // Clear suggestions after selection
//     setShowSuggestions(false);
//     navigate('category/electronics', { state: { selectedProductId: product.productId, categoryId: product.categoryId, categoryName: product.categoryName } });
//   };

//   const handleSearchBarBlur = () => {
//     setShowSuggestions(false); // Hide suggestions when focus is lost
//   };

//   const gotoHome = () => {
//     if (location.pathname != '/') {
//       navigate('/')
//     }
//   }

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//   }

//   return (
//     <header className="header">
//       <div className="logo" onClick={gotoHome}>
//         <img src={logo} alt="Company Logo" />
//       </div>

//       <div className="search-bar">
//         <select
//           className="category-dropdown"
//           value={searchCategory}
//           onChange={handleCategoryChange}
//         >
//           <option value={0} >Select Category</option>
//           {CategoryData.map(category => (
//             <option key={category.$id} value={category.categoryId}>
//               {category.categoryName}
//             </option>
//           ))}
//         </select>
//         <input
//           type="text"
//           value={searchTerm}
//           onChange={handleSearchChange}
//           onBlur={handleSearchBarBlur}
//           placeholder="Search..."
//           aria-label="Search"
//         />
//         <button className="search-icon" aria-label="Search">
//           <FaSearch />
//         </button>

//         {showSuggestions && filteredSuggestions.length > 0 && (
//           <ul className="suggestions-dropdown">
//             {filteredSuggestions.map((suggestion, index) => (
//               <li
//                 key={index}
//                 role="button"
//                 onClick={() => { console.log(suggestion); handleSuggestionClick(suggestion) }}
//               >
//                 {suggestion}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div
//         className="login-container"
//         onMouseEnter={toggleLoginDropdown}
//         onMouseLeave={handleMouseLeave}
//       >
//         <Link to="/login" className="login-button" onClick={handleLogout}>Logout</Link>
//         {showLoginDropdown && (
//           <div className="login-dropdown">
//             <Link to="/register">New Customer? Sign-up</Link>
//             <Link to="/user">My Profile</Link>
//             <Link to="/myorders">Orders</Link>
//             <Link to="/wishlist">WishList</Link>
//           </div>
//         )}
//       </div>

//       <div className="cart-icon">
//         <Link to="/wishlist">
//           <FaHeart /> <span>WishList</span>
//         </Link>
//       </div>

//       <div className="cart-icon">
//         <Link to="/cart">
//           <FaShoppingCart /> <span>Cart</span>
//         </Link>
//       </div>

//       <div className="profile-icon" onClick={handleProfileClick} aria-label="Profile">
//         <FaUser />
//       </div>
//     </header>
//   );
// }

// export default Navbar;




import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from 'react-icons/fa';
import './Navbar.css';
import logo from "../assets/images/shopease.jpg";
import axios from 'axios';

function Navbar() {
  const [CategoryData, setCategoryData] = useState([]);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [searchCategory, setSearchCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        if (!token) {
          navigate('/');
          return;
        }
        const url = 'http://localhost:5120/api/Category';
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCategoryData(response.data.$values || []);
      } catch (error) {
        console.error('Error fetching categories', error);
        if (error.response && error.response.status === 401) {
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          alert("An error occurred while fetching categories.");
        }
      }
    };

    const fetchProducts = async () => {
      try {
        if (!token) {
          navigate('/login');
          return;
        }
        const url = 'http://localhost:5120/api/Product';
        const response = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setProducts(response.data.$values);
      } catch (error) {
        console.error('Error fetching products', error);
        if (error.response && error.response.status === 401) {
          alert("Your session has expired. Please log in again.");
          localStorage.removeItem('token');
          navigate('/login');
        } else {
          alert("An error occurred while fetching products.");
        }
      }
    };

    fetchProducts();
    fetchCategory();
  }, [navigate, token]);

  const toggleLoginDropdown = () => {
    setShowLoginDropdown(!showLoginDropdown);
  };

  const handleMouseLeave = () => {
    setShowLoginDropdown(false);
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryId = event.target.value;
    const selectedCategory = CategoryData.find(category => category.categoryId === selectedCategoryId);
    setSearchCategory(selectedCategory);
    if (selectedCategory) {
      navigate(`/category/electronics`, {
        state: {
          selectedProductId: null,
          categoryId: selectedCategory.categoryId,
          categoryName: selectedCategory.categoryName
        }
      });
    }
  };

  const handleProfileClick = () => {
    navigate('/user');
  };

  useEffect(() => {
    setSearchSuggestions(products.map(product => product.name));
  }, [products]);

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);

    const filtered = searchSuggestions.filter(suggestion =>
      suggestion.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredSuggestions(filtered);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (suggestion) => {
    console.log(`Suggestion clicked: ${suggestion}`); // Debugging log
    const product = products.find(item => item.name === suggestion);
    if (product) {
      console.log(`Navigating to: /category/electronics with productId ${product.productId}`); // Debugging log
      setSearchTerm(suggestion);
      setFilteredSuggestions([]);
      setShowSuggestions(false);
      navigate('/category/electronics', {
        state: {
          selectedProductId: product.productId,
          categoryId: product.categoryId,
          categoryName: product.categoryName
        }
      });
    } else {
      console.error('Product not found'); // Debugging log
    }
  };

  const handleSearchBarBlur = () => {
    setShowSuggestions(false);
  };

  const gotoHome = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo" onClick={gotoHome}>
        <img src={logo} alt="Company Logo" />
      </div>

      <div className="search-bar">
        <select
          className="category-dropdown"
          value={searchCategory}
          onChange={handleCategoryChange}
        >
          <option value="">Select Category</option>
          {CategoryData.map(category => (
            <option key={category.$id} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onBlur={handleSearchBarBlur}
          placeholder="Search..."
          aria-label="Search"
        />
        <button className="search-icon" aria-label="Search">
          <FaSearch />
        </button>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                role="button"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div
        className="login-container"
        onMouseEnter={toggleLoginDropdown}
        onMouseLeave={handleMouseLeave}
      >
        <Link to="/login" className="login-button" onClick={handleLogout}>Logout</Link>
        {showLoginDropdown && (
          <div className="login-dropdown">
            <Link to="/register">New Customer? Sign-up</Link>
            <Link to="/user">My Profile</Link>
            <Link to="/myorders">Orders</Link>
            <Link to="/wishlist">WishList</Link>
          </div>
        )}
      </div>

      <div className="cart-icon">
        <Link to="/wishlist">
          <FaHeart /> <span>WishList</span>
        </Link>
      </div>

      <div className="cart-icon">
        <Link to="/cart">
          <FaShoppingCart /> <span>Cart</span>
        </Link>
      </div>

      <div className="profile-icon" onClick={handleProfileClick} aria-label="Profile">
        <FaUser />
      </div>
    </header>
  );
}

export default Navbar;
