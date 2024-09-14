// //=============================================================================================================================


// import React, { useState, useEffect, useContext } from 'react';
// import { FaStar, FaCartPlus, FaShoppingBag, FaHeart } from 'react-icons/fa';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { CartContext } from '../context/CartContext';
// import { UserContext } from '../context/UserContext';

// import axios from 'axios';
// import './ElectronicsPage.css';  // Import the CSS file

// function ElectronicsPage() {
//   const [products, setProducts] = useState([]);
//   const [category, setCategory] = useState('');
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [ratings, setRatings] = useState({});
//   const [newReview, setNewReview] = useState('');
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { userId, cartId } = useContext(UserContext);
//   const { addItemToCart } = useContext(CartContext);

//   useEffect(() => {
//     const fetchCategoryProducts = async () => {
//       const { categoryId } = location.state;
//       setCategory(location.state.categoryName);
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           navigate('/');
//         }

//         const url2 = `http://localhost:5120/api/Product/getBycat/${categoryId}`;
//         const response = await axios.get(url2, {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         });
//         setProducts(response.data.$values);
//       } catch (error) {
//         console.log(error);
//         if (error.code === "ERR_NETWORK") {
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
//     fetchCategoryProducts();
//   }, []);


//   const handleProductClick = (product) => {
//     setSelectedProduct(product);
//   };


//   const addReview = async (product, review, rating) => {
//     try {
//       const token = localStorage.getItem('token');

//       const url2 = `http://localhost:5120/api/Review`;
//       const reviewData = {
//         UserId: userId,
//         ProductId: product,
//         Rating: rating,
//         Comment: review
//       }
//       const response = await axios.post(url2, reviewData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       // setProducts(response.data.$values);
//     }
//     catch (error) {
//       console.log(error);
//       if (error.code == "ERR_NETWORK") {
//         alert(error.message);
//         localStorage.removeItem('token');
//         navigate('/login');
//       }
//       if (localStorage.getItem('token') && (error.response.status === 401)) {
//         alert("Your token expired or you are not authorized for this page");
//         localStorage.removeItem('token');
//         navigate('/login');
//       }
//       console.error('Error fetching products', error);
//     }
//   }

//   const handleAddReview = (productId) => {
//     const review = newReview.trim();
//     const rating = ratings[productId] || 0;

//     if (!review || rating === 0) {
//       alert('Please provide both a review and a rating.');
//       return;
//     }

//     setProducts(products.map(product =>
//       product.id === productId
//         ? { ...product, reviews: [...product.reviews, { id: product.reviews.length + 1, content: review, rating }] }
//         : product
//     ));

//     addReview(productId, review, rating);

//     alert('Review added successfully!');
//     setNewReview('');
//     setRatings({ ...ratings, [productId]: 0 });
//   };

//   const handleAddToCart = async (product) => {
//     var resp = await addItemToCart(product);
//     if (resp == 0) {
//       navigate('/login');
//     }
//     alert('Added to cart!');
//     navigate('/cart');
//   };

//   const handleReviewChange = (e) => {
//     setNewReview(e.target.value);
//   };

//   const handleRatingChange = (productId, ratingValue) => {
//     setRatings({ ...ratings, [productId]: ratingValue });
//   };

//   const calculateAverageRating = (reviews) => {
//     if (reviews.$values.length === 0) return 0;
//     const total = reviews.$values.reduce((sum, review) => sum + review.rating, 0);
//     return (total / reviews.$values.length).toFixed(1);
//   };

//   return (
//     <div className="electronics-page">
//       <h2 className="page-title">{category}</h2>
//       {selectedProduct ? (
//         <div className="product-details">
//           <button className="back-button" onClick={() => setSelectedProduct(null)}>← Back to Products</button>
//           <h3>{selectedProduct.name}</h3>
//           <img
//             src={selectedProduct.image}
//             alt={selectedProduct.name}
//             className="product-image-style"
//           />
//           <p>{selectedProduct.description}</p>
//           <p className="price">₹{selectedProduct.price} ({selectedProduct.discounts.$values.map((discount) => (<span>{discount.discountPercentage}</span>))}% off)</p>
//           <div className="rating-stars-style">
//             {[...Array(5)].map((_, index) => (
//               <FaStar
//                 key={index}
//                 color={index + 1 <= Math.round(calculateAverageRating(selectedProduct.reviews)) ? "#ffc107" : "#e4e5e9"}
//                 size={20}
//               />
//             ))}
//             <span className="rating-number">({calculateAverageRating(selectedProduct.reviews)}/5)</span>
//           </div>
//           <div className="action-buttons">
//             <button className="cart-button" onClick={() => handleAddToCart(selectedProduct)}>
//               <FaCartPlus className="icon" /> Add to Cart
//             </button>
//             <button className="buy-button" onClick={() => alert('Buy Now clicked')}>
//               <FaShoppingBag className="icon" /> Buy Now
//             </button>
//           </div>

//           <div className="reviews-section">
//             <h4>Reviews:</h4>
//             {selectedProduct.reviews.$values.length === 0 ? (
//               <p>No reviews yet.</p>
//             ) : (
//               selectedProduct.reviews.$values.map((review) => (
//                 <div key={review.$id} className="review-item">
//                   <p>{review.comment}</p>
//                   <div className="rating-stars-style">
//                     {[...Array(5)].map((_, index) => (
//                       <FaStar
//                         key={index}
//                         color={index + 1 <= review.rating ? "#ffc107" : "#e4e5e9"}
//                         size={20}
//                       />
//                     ))}
//                     <span className="rating-number">({review.rating}/5)</span>
//                   </div>
//                 </div>
//               ))
//             )}
//           </div>

//           <div className="add-review-section">
//             <h4>Add a Review:</h4>
//             <div className="review-stars-style">
//               {[...Array(5)].map((_, index) => {
//                 const ratingValue = index + 1;
//                 return (
//                   <label key={index}>
//                     <input
//                       type="radio"
//                       name={`rating-${selectedProduct.productId}`}
//                       value={ratingValue}
//                       onClick={() => handleRatingChange(selectedProduct.productId, ratingValue)}
//                       style={{ display: 'none' }}
//                     />
//                     <FaStar
//                       color={ratingValue <= (ratings[selectedProduct.productId] || 0) ? "#ffc107" : "#e4e5e9"}
//                       size={30}
//                       style={{ cursor: 'pointer' }}
//                     />
//                   </label>
//                 );
//               })}
//             </div>
//             <textarea
//               placeholder="Write your review here..."
//               value={newReview}
//               onChange={handleReviewChange}
//               className="review-textarea"
//             />
//             <button className="submit-review-button" onClick={() => handleAddReview(selectedProduct.productId)}>Submit Review</button>
//           </div>
//         </div>
//       ) : (
//         <div className="grid-style">
//           {products.map((product) => (
//             <div key={product.$id} className="product-card-style" onClick={() => handleProductClick(product)}>
//               <img src={product.image} alt={product.name} className="product-image-style" />
//               <h4>{product.name}</h4>
//               <p className="price">₹{product.price}  ({product.discounts.$values.map((discount) => (<span>{discount.discountPercentage}</span>))}% off)</p>
//               <div className="rating-stars-style">
//                 {[...Array(5)].map((_, index) => (
//                   <FaStar
//                     key={index}
//                     color={index + 1 <= Math.round(calculateAverageRating(product.reviews)) ? "#ffc107" : "#e4e5e9"}
//                     size={20}
//                   />
//                 ))}
//                 <span className="rating-number">({calculateAverageRating(product.reviews)}/5)</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ElectronicsPage;

//modified

import React, { useState, useEffect, useContext } from 'react';
import { FaStar, FaCartPlus, FaShoppingBag, FaHeart,FaShareAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import './ElectronicsPage.css';
import mac from "../assets/images/macbook.jpg";
import iphone from "../assets/images/iphone.png";

function ElectronicsPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ratings, setRatings] = useState({});
  const [newReview, setNewReview] = useState('');
  const [wishlist, setWishlist] = useState(new Set());
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, cartId } = useContext(UserContext);
  const { addItemToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const { categoryId } = location.state;
      setCategory(location.state.categoryName);
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/');
        }

        const url2 = `http://localhost:5120/api/Product/getBycat/${categoryId}`;
        const response = await axios.get(url2, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data.$values);
      } catch (error) {
        console.log(error);
        if (error.code === "ERR_NETWORK") {
          alert(error.message);
          localStorage.removeItem('token');
          navigate('/login');
        }
        if (localStorage.getItem('token') && (error.response.status === 401)) {
          alert("Your token expired or you are not authorized for this page");
          localStorage.removeItem('token');
          navigate('/login');
        }
        console.error('Error fetching products', error);
      }
    };
    fetchCategoryProducts();
  }, [location.state, navigate]);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const addReview = async (product, review, rating) => {
    try {
      const token = localStorage.getItem('token');

      const url2 = `http://localhost:5120/api/Review`;
      const reviewData = {
        UserId: userId,
        ProductId: product,
        Rating: rating,
        Comment: review
      }
      const response = await axios.post(url2, reviewData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      setProducts(products.map(p =>
        p.id === product
          ? { ...p, reviews: [...p.reviews, { id: p.reviews.length + 1, content: review, rating }] }
          : p
      ));
    } catch (error) {
      console.log(error);
      if (error.code === "ERR_NETWORK") {
        alert(error.message);
        localStorage.removeItem('token');
        navigate('/login');
      }
      if (localStorage.getItem('token') && (error.response.status === 401)) {
        alert("Your token expired or you are not authorized for this page");
        localStorage.removeItem('token');
        navigate('/login');
      }
      console.error('Error adding review', error);
    }
  }

  const handleAddReview = (productId) => {
    const review = newReview.trim();
    const rating = ratings[productId] || 0;

    if (!review || rating === 0) {
      alert('Please provide both a review and a rating.');
      return;
    }

    addReview(productId, review, rating);

    alert('Review added successfully!');
    setNewReview('');
    setRatings({ ...ratings, [productId]: 0 });
  };

  const handleAddToCart = async (product) => {
    var resp = await addItemToCart(product);
    if (resp === 0) {
      navigate('/login');
    }
    alert('Added to cart!');
    navigate('/cart');
  };

  const handleReviewChange = (e) => {
    setNewReview(e.target.value);
  };

  const handleRatingChange = (productId, ratingValue) => {
    setRatings({ ...ratings, [productId]: ratingValue });
  };

  const handleAddToWishlist = (productId) => {
    setWishlist(new Set(wishlist).add(productId));
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.$values.length === 0) return 0;
    const total = reviews.$values.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.$values.length).toFixed(1);
  };



  return (
    <div className="electronics-page">
      <h2 className="page-title">{category}</h2>
      {selectedProduct ? (
        <div className="product-details">
          <button className="back-button" onClick={() => setSelectedProduct(null)}>← Back to Products</button>
          <div className="product-detail-container">
            
            
            
            <div className="product-image-container">
              <img
                src = {mac}
                //  src=  {selectedProduct.image}
                alt={selectedProduct.name}
                className="product-image-large"
              />
              <div className="product-actions">
                <button className="action-button cart-button" onClick={() => handleAddToCart(selectedProduct)}>
                 <h3><FaCartPlus className="icon" /> Add to Cart</h3> 
                </button>
                <button className="action-button buy-button" onClick={() => alert('Buy Now clicked')}>
                <h3><FaShoppingBag className="icon" /> Buy Now</h3>
                </button>
              </div>

               <FaShareAlt
                  className="share-icon"
                  onClick={() => alert('Share clicked')}
                />
              <FaHeart
                className={`wishlist-icon ${wishlist.has(selectedProduct.id) ? 'added' : ''}`}
                onClick={() => handleAddToWishlist(selectedProduct.id)}
              />
            </div>

{/* 
<div className="product-image-container">
      <img
        src={selectedProduct.image} // Assuming product image is passed as props
        alt={selectedProduct.name}
        className="product-image-large"
      />
      <div className="product-actions">
        <button className="action-button cart-button" onClick={() => handleAddToCart(selectedProduct)}>
          <h3><FaCartPlus className="icon" /> Add to Cart</h3> 
        </button>
        <button className="action-button buy-button" onClick={() => alert('Buy Now clicked')}>
          <h3><FaShoppingBag className="icon" /> Buy Now</h3>
        </button>
      </div>
      <FaHeart
        className={`wishlist-icon ${wishlist.has(selectedProduct.id) ? 'added' : ''}`}
        onClick={() => handleAddToWishlist(selectedProduct.id)}
      />
      <FaShareAlt
        className="share-icon"
        onClick={handleShareClick}
      />

      
      {showShareModal && (
        <div className="share-modal">
          <div className="modal-content">
            <h4>Share this product:</h4>
            <input type="text" value={productLink} readOnly />
            <button className="copy-button" onClick={handleCopyLink}>Copy Link</button>
            <button className="close-button" onClick={() => setShowShareModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div> */}




          
            <div className="product-info">
              <h1>{selectedProduct.name}</h1>
              <p className="price">₹{selectedProduct.price}</p>
              <p className="discount">Discount: {selectedProduct.discounts.$values.map((discount) => (<span key={discount.discountId}>{discount.discountPercentage}% off</span>))}</p>
              
              <div className="rating-stars-container">
  <div className="rating-stars-style">
    {[...Array(5)].map((_, index) => (
      <FaStar
        key={index}
        color={index + 1 <= Math.round(calculateAverageRating(selectedProduct.reviews)) ? "#ffc107" : "#e4e5e9"}
        size={20}
      />
    ))}
    <span className="rating-number">({calculateAverageRating(selectedProduct.reviews)}/5)</span>
  </div>
</div>

              
              <div className="reviews-section">
                <h2>Reviews:</h2>
                {selectedProduct.reviews.$values.length === 0 ? (
                  <p>No reviews yet.</p>
                ) : (
                  selectedProduct.reviews.$values.map((review) => (
                    <div key={review.$id} className="review-item">
                      <p>{review.comment}</p>
                      <div className="rating-stars-style">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            color={index + 1 <= review.rating ? "#ffc107" : "#e4e5e9"}
                            size={20}
                          />
                        ))}
                        <span className="rating-number">({review.rating}/5)</span>
                      </div>
                    </div>
                  ))
                )}
                <div className="add-review-section">
                  <h4>Add a Review:</h4>
                  <div className="review-stars-style">
                    {[...Array(5)].map((_, index) => {
                      const ratingValue = index + 1;
                      return (
                        <label key={index}>
                          <input
                            type="radio"
                            name={`rating-${selectedProduct.productId}`}
                            value={ratingValue}
                            onClick={() => handleRatingChange(selectedProduct.id, ratingValue)}
                            style={{ display: 'none' }}
                          />
                          <FaStar
                            color={ratingValue <= (ratings[selectedProduct.id] || 0) ? "#ffc107" : "#e4e5e9"}
                            size={30}
                            style={{ cursor: 'pointer' }}
                          />
                        </label>
                      );
                    })}
                  </div>
                  <textarea
                    placeholder="Write your review here..."
                    value={newReview}
                    onChange={handleReviewChange}
                    className="review-textarea"
                  />
                  <button className="submit-review-button" onClick={() => handleAddReview(selectedProduct.id)}><h4>Submit Review</h4></button>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      ) : (
        <div className="grid-style">
          {products.map((product) => (
            <div key={product.$id} className="product-card-style" onClick={() => handleProductClick(product)}>
              <img src= {mac}/*{product.image}*/ alt={product.name} className="product-image-style" />
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
              <p className="discount"> {product.discounts.$values.map((discount) => (<span key={discount.discountId}>{discount.discountPercentage}% off</span>))}</p>
              <div className="rating-stars-style">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    color={index + 1 <= Math.round(calculateAverageRating(product.reviews)) ? "#ffc107" : "#e4e5e9"}
                    size={20}
                  />
                ))}
                <span className="rating-number">({calculateAverageRating(product.reviews)}/5)</span>
              </div>
              <button className="wishlist-button" onClick={(e) => { e.stopPropagation(); handleAddToWishlist(product.id); }}>
                {/* <FaHeart className={`icon ${wishlist.has(product.id) ? 'added' : ''}`} /> */}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ElectronicsPage;
