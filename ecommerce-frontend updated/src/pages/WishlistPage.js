import React, { useState, useEffect, useContext } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './WishlistPage.css'; // Import the CSS file for styling
import { UserContext } from '../context/UserContext';
import { CartContext } from '../context/CartContext';
import mac from "../assets/images/macbook.jpg";
import axios from 'axios';

function WishlistPage() {
  const { wishlistItems, addItemToCart, addToWishlist, removeFromWishlist } = useContext(CartContext);
  const { userId, cartId, wishlistId, setWishlistId } = useContext(UserContext);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    setWishlistId(wishlistId);
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }

    const fetchWishlist = async () => {
      try {
        if (wishlistId == undefined) {

          setLoading(true);

          const url2 = `http://localhost:5120/api/Wishlist/${userId}`;
          const response = await axios.post(url2, {
            headers: {
              Authorization: `Bearer${token}`
            }
          });
          setWishlistId(response.data);
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
    fetchWishlist();
  }, []);

  useEffect(() => {
    const fetchWishlistItems = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
      }
      try {
        const url = `http://localhost:5120/api/WishlistItem/${wishlistId}`;

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        addToWishlist(response.data.$values);
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
    }
    fetchWishlistItems();
  }, [wishlistId]);

  useEffect(() => {
    if (wishlistItems.length !== 0) {
      setLoading(false);
    }
    else {
      console.log("loading ");
      setLoading(true);
    }
  }, [wishlistItems]);


  const handleRemoveFromWishlist = async (productId) => {
    try {
      // Simulate removing a product from the wishlist
      removeFromWishlist(productId);
      alert('Removed from wishlist');
    } catch (error) {
      alert('Error removing from wishlist');
    }
  };

  const handleAddToCart = async (product) => {
    try {
      // Simulate adding a product to the cart
      var resp = await addItemToCart(product);
      if (resp == 0) {
        navigate('/login');
      }
      else {
        alert('Added to cart');
        navigate('/cart');
      }
    } catch (error) {
      alert('Error adding to cart');
    }
  };


  const calculateAverageRating = (product) => {
    const reviews = product.reviews;
    // console.log(reviews);
    if (reviews.$values.length === 0) return 0;
    const total = reviews.$values.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.$values.length).toFixed(1);
  };

  return (
    <div className="wishlist-background">
      <div className="wishlist-container">
        <h2 className="wishlist-title">Your Wishlist</h2>
        {wishlistItems.length === 0 ? (
          <p className="empty-message">Your wishlist is empty</p>
        ) : (
          <div className="wishlist-items">
            {/* {console.log(wishlistItems)} */}
            {wishlistItems.map((wlitem) => (
              <div key={wlitem.$id} className="wishlist-item">
                <img src={mac}/*{wlitem.product.image}*/ alt={wlitem.product.name} className="wishlist-item-image" />
                <div className="wishlist-item-details">
                  <h3 className="wishlist-item-name">{wlitem.product.name}</h3>
                  {/* <p className="wishlist-item-description">{product.description}</p> */}
                  <p className="wishlist-item-price">${wlitem.product.price}</p>
                  <div className="wishlist-item-rating">
                    {[...Array(5)].map((_, index) => (
                      <FaStar
                        key={index}
                        color={index + 1 <= Math.round(calculateAverageRating(wlitem.product)) ? "#ffc107" : "#e4e5e9"}
                        size={20}
                      />
                    ))}
                  </div>
                  <div className="wishlist-item-actions">
                    <button className="wishlist-item-add" onClick={() => handleAddToCart(wlitem.product)}>
                      Add to Cart
                    </button>
                    <div className="wishlist-item-actions-bottom">
                      <button className="wishlist-item-remove" onClick={() => handleRemoveFromWishlist(wlitem.product.productId)}>
                        Remove from Wishlist
                      </button>
                      <button className="wishlist-item-view" onClick={() => navigate(`/category/electronics`, { state: { selectedProductId: wlitem.product.productId, categoryId: wlitem.product.categoryId, categoryName: wlitem.product.category.categoryName } })}>
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default WishlistPage;
