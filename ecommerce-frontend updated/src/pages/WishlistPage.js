import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './WishlistPage.css'; // Import the CSS file for styling

function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  // Sample wishlist data
  const sampleWishlist = [
    {
      id: 1,
      name: 'Product 1',
      description: 'This is the description for Product 1.',
      price: 29.99,
      image: 'https://via.placeholder.com/150',
      rating: 4
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'This is the description for Product 2.',
      price: 49.99,
      image: 'https://via.placeholder.com/150',
      rating: 5
    }
  ];

  useEffect(() => {
    // Simulate fetching wishlist data from an API
    const fetchWishlist = async () => {
      setWishlist(sampleWishlist);
    };
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      // Simulate removing a product from the wishlist
      setWishlist(wishlist.filter(product => product.id !== productId));
      alert('Removed from wishlist');
    } catch (error) {
      alert('Error removing from wishlist');
    }
  };

  const handleAddToCart = async (product) => {
    try {
      // Simulate adding a product to the cart
      setCart([...cart, product]);
      alert('Added to cart');
    } catch (error) {
      alert('Error adding to cart');
    }
  };

  return (
    <div className="wishlist-background">
    <div className="wishlist-container">
      <h2 className="wishlist-title">Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="empty-message">Your wishlist is empty</p>
      ) : (
        <div className="wishlist-items">
          {wishlist.map((product) => (
            <div key={product.id} className="wishlist-item">
              <img src={product.image} alt={product.name} className="wishlist-item-image" />
              <div className="wishlist-item-details">
                <h3 className="wishlist-item-name">{product.name}</h3>
                <p className="wishlist-item-description">{product.description}</p>
                <p className="wishlist-item-price">${product.price.toFixed(2)}</p>
                <div className="wishlist-item-rating">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      color={index + 1 <= product.rating ? "#ffc107" : "#e4e5e9"}
                      size={20}
                    />
                  ))}
                </div>
                <div className="wishlist-item-actions">
                  <button className="wishlist-item-add" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </button>
                  <div className="wishlist-item-actions-bottom">
                    <button className="wishlist-item-remove" onClick={() => handleRemoveFromWishlist(product.id)}>
                      Remove from Wishlist
                    </button>
                    <button className="wishlist-item-view" onClick={() => navigate(`/products/${product.id}`)}>
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
