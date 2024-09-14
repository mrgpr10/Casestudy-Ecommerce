
import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './HomePage.css';
import axios from 'axios';
import Navbar from './Navbar';
import Categories from '../pages/Categories';
import SliderComponent from '../pages/SliderComponent';
import ChatBot from './ChatBot';  // Import ChatBot component
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';

function HomePage() {
  const { userId, setUserId, cartId, setCartId, wishlistId, setWishlistId } = useContext(UserContext);
  const { addItemToCart, addItemToWishlist } = useContext(CartContext);
  const [productData, setProducts] = useState([]);
  const [showChat, setShowChat] = useState(false);  // State to toggle ChatBot
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setUserId(userId);

    const fetchProducts = async () => {
      try {
        if (!token) {
          navigate('/login');
        }
        const url = 'http://localhost:5120/api/Product';

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data.$values);
        //console.log(productData);
      }
      catch (error) {
        if (error.code == "ERR_NETWORK") {
          alert(error.message);
          localStorage.removeItem('token');
          navigate('/login');
          console.log(error.message);
        }
        if (error.response.status === 401) {
          alert("Your token expired or you are not authorized for this page");
          localStorage.removeItem('token');
          navigate('/login');
        }
        console.error('Error fetching products', error);
      }
    };
    fetchProducts();

    const fetchCart = async () => {
      if (!token) {
        navigate('/login');
      }

      const url2 = `http://localhost:5120/api/Cart/${userId}`;
      const response = await axios.post(url2, {
        headers: {
          Authorization: `Bearer${token}`
        }
      });
      setCartId(response.data);
    };
    fetchCart();

    const fetchWishlist = async () => {
      if (!token) {
        navigate('/login');
      }

      const url2 = `http://localhost:5120/api/Wishlist/${userId}`;
      const response = await axios.post(url2, {
        headers: {
          Authorization: `Bearer${token}`
        }
      });
      setWishlistId(response.data);
    };
    fetchWishlist();

  }, [userId]);

  const handleAddToCart = async (product) => {
    console.log("inside add to cart");
    var resp = await addItemToCart(product);
    if (resp == 0) {
      navigate('/login');
    }
    alert('Added to cart!');
    navigate('/cart');
  };

  const handleAddToWishlist = async (product) => {
    var resp = await addItemToWishlist(product);
    if (resp == 0) {
      navigate('/login');
    }
    alert('Added to Wishlist!');
    navigate('/wishlist');
  };

  const handleBuyNow = (p) => {
    // const productCI = p.cartItems.$values.find(i => i.cartId == cartId);
    const cartItem = {
      quantity: 1,
      // cartItemId: productCI.cartItemId,
      product: {
        productId: p.productId,
        name: p.name,
        price: p.price
      }
    }
    const orderProducts = [cartItem];
    navigate('/orderdetail', { state: { fromcart: 0, selectedProducts: orderProducts, amount: p.price } });
  }



  const navigateToProduct = (product) => {
    navigate('category/electronics', { state: { selectedProductId: product.productId, categoryId: product.categoryId, categoryName: product.categoryName } });
  }

  return (
    <div>
      <Categories />
      <SliderComponent />

      {/* Product Sections */}
      <section className="product-sections">
        <div className="product-row">
          <h2>Best Deals of the Day</h2>
          <div className="products">
            {productData.map(product => (
              <div key={product.productId} className="product-card">
                <div className="product-info">
                  <img src={`data:image/png;base64,${product.image}`} alt={product.name} className="product-image-style" onClick={() => navigateToProduct(product)} />
                  <h3>{product.name}</h3>
                  <p className="price">₹{product.price}</p>
                  <button className="buy-now" onClick={() => handleBuyNow(product)}>Buy Now</button>
                  <div className="product-actions">
                    <button className="wish-list" onClick={() => handleAddToWishlist(product)}>Add to Wish List</button>
                    <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* More Than 50% Off */}
        <div className="product-row">
          <h2>More Than 50% Off</h2>
          <div className="products">
            {productData.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">{product.price}</p>
                  <button className="buy-now" onClick={() => handleBuyNow(product)}>Buy Now</button>
                  <div className="product-actions">
                    <button className="wish-list" onClick={() => handleAddToWishlist(product)}>Add to Wish List</button>
                    <button className="add-to-cart" onClick={() => handleAddToCart(product)} >Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div className="product-row">
          <h2>Featured Products</h2>
          <div className="products">
            {productData.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">{product.price}</p>
                  <button className="buy-now" onClick={() => handleBuyNow(product)}>Buy Now</button>
                  <div className="product-actions">
                    <button className="wish-list" onClick={() => handleAddToWishlist(product)}>Add to Wish List</button>
                    <button className="add-to-cart" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ChatBot Icon */}
      <div className="chatbot-icon" onClick={() => setShowChat(!showChat)}>
        🤖
        <div className="chatbot-tooltip">Hii, I am ShopEase, How Can I help you?</div>
      </div>

      {/* ChatBot Window */}
      {showChat && <ChatBot />}
    </div>


  );
}

export default HomePage;
