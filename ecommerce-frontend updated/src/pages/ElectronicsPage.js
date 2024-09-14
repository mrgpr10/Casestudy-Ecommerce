//=============================================================================================================================


import React, { useState, useEffect, useContext } from 'react';
import { FaStar, FaCartPlus, FaShoppingBag, FaHeart, FaShareAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { UserContext } from '../context/UserContext';
import mac from "../assets/images/macbook.jpg";
import iphone from "../assets/images/iphone.png";
import axios from 'axios';
import './ElectronicsPage.css';  // Import the CSS file
import ShareButton from './share.js';

function ElectronicsPage() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [selectedProductId, setselectedProductId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [ratings, setRatings] = useState({});
  const [newReview, setNewReview] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { userId, cartId, wishlistId } = useContext(UserContext);
  const { wishlistItems, addItemToCart, addToWishlist, addItemToWishlist } = useContext(CartContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pr, setPr] = useState(null);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      const { categoryId } = location.state;
      setselectedProductId(location.state.selectedProductId);
      setCategory(location.state.categoryName);
      // console.log(location.state.selectedProductId);
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
  }, [location.state]);


  useEffect(() => {
    if (selectedProductId != undefined) {
      console.log(selectedProductId);
      const prod = products.find(p => p.productId === selectedProductId);
      console.log(products.find(p => p.productId === selectedProductId));
      setPr(prod);
    }
  }, selectedProductId)

  useEffect(() => {
    if (pr != null) {
      console.log(pr);
      handleProductClick(pr);
    }
  }, [pr]);


  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };


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
        // console.log(response.data.$values);
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
    };
    fetchWishlistItems();
  }, [category]);



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

      // setProducts(response.data.$values);
    }
    catch (error) {
      console.log(error);
      if (error.code == "ERR_NETWORK") {
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
  }

  const handleAddReview = (productId) => {
    const review = newReview.trim();
    const rating = ratings[productId] || 0;

    if (!review || rating === 0) {
      alert('Please provide both a review and a rating.');
      return;
    }

    setProducts(products.map(product =>
      product.id === productId
        ? { ...product, reviews: [...product.reviews, { id: product.reviews.length + 1, content: review, rating }] }
        : product
    ));

    addReview(productId, review, rating);

    alert('Review added successfully!');
    setNewReview('');
    setRatings({ ...ratings, [productId]: 0 });
  };

  const handleBuyNow = (p) => {
    const cartItem = {
      quantity: 1,
      product: {
        productId: p.productId,
        name: p.name,
        price: p.price
      }
    }
    const orderProducts = [cartItem];
    navigate('/orderdetail', { state: { selectedProducts: orderProducts, amount: p.price } });
  }

  const handleAddToCart = async (product) => {
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
    //ReactSession.set("cart", resp);
    navigate('/cart');
  };

  const handleShare = () => {
    return (<ShareButton />);
  }

  const handleReviewChange = (e) => {
    setNewReview(e.target.value);
  };

  const handleRatingChange = (productId, ratingValue) => {
    setRatings({ ...ratings, [productId]: ratingValue });
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.$values.length === 0) return 0;
    const total = reviews.$values.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.$values.length).toFixed(1);
  };

  const handleOpenShareModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseShareModal = () => {
    setIsModalOpen(false);
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
                src={`data:image/png;base64,${selectedProduct.image}`}
                //  src=  {selectedProduct.image}
                alt={selectedProduct.name}
                className="product-image-large"
              />
              <div className="product-actions">
                <button className="action-button cart-button" onClick={() => handleAddToCart(selectedProduct)}>
                  <h3><FaCartPlus className="icon" /> Add to Cart </h3>
                </button>
                <button className="action-button buy-button" onClick={() => handleBuyNow(selectedProduct)}>
                  <h3><FaShoppingBag className="icon" /> Buy Now</h3>
                </button>
              </div>
              <FaShareAlt
                className="share-icon"
                onClick={handleOpenShareModal}
              />
              {isModalOpen && (
                <ShareButton
                  productUrl={location.pathname}
                  closeModal={handleCloseShareModal} // Pass the close modal handler as a prop
                />
              )}
              <FaHeart
                className={`wishlist-icon ${wishlistItems.some(wishlistItem => wishlistItem.productId === selectedProduct.productId) ? 'added' : ''}`}
                onClick={() => handleAddToWishlist(selectedProduct)}
              />
            </div>
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
                            onClick={() => handleRatingChange(selectedProduct.productId, ratingValue)}
                            style={{ display: 'none' }}
                          />
                          <FaStar
                            color={ratingValue <= (ratings[selectedProduct.productId] || 0) ? "#ffc107" : "#e4e5e9"}
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
                  <button className="submit-review-button" onClick={() => handleAddReview(selectedProduct.productId)}>Submit Review</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {
            products.length === 0 ? (
              <p className="empty-message">Sorry!!! No products available. Please visit later</p>
            ) : (
              <div className="grid-style">
                {products.map((product) => (
                  <div key={product.$id} className="product-card-style" onClick={() => handleProductClick(product)}>
                    <img src={`data:image/png;base64,${product.image}`}/*{mac}*/ alt={product.name} className="product-image-style" />
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
                    <button className="wishlist-button" onClick={(e) => { e.stopPropagation(); handleAddToWishlist(product); }}>
                      <FaHeart className={`icon ${wishlistItems.some(wishlistItem => wishlistItem.productId === product.productId) ? 'added' : ''}`} />
                    </button>
                  </div>
                ))}
              </div>
            )
          }
        </div>
      )}
    </div>
  );
}

export default ElectronicsPage;













// return (
//   <div className="electronics-page">
//     <h2 className="page-title">{category}</h2>
//     {selectedProduct ? (
//       <div className="product-details">
//         <button className="back-button" onClick={() => setSelectedProduct(null)}>← Back to Products</button>
//         <div className="product-detail-container">
//         <div className="product-image-container">
//             <img
//               src = {mac}
//               //  src=  {selectedProduct.image}
//               alt={selectedProduct.name}
//               className="product-image-large"
//             />
//             <div className="product-actions">
//               <button className="action-button cart-button" onClick={() => handleAddToCart(selectedProduct)}>
//                 <FaCartPlus className="icon" /> Add to Cart
//               </button>
//               <button className="action-button buy-button" onClick={() => alert('Buy Now clicked')}>
//                 <FaShoppingBag className="icon" /> Buy Now
//               </button>
//             </div>
//             <FaHeart
//               className={`wishlist-icon ${wishlist.has(selectedProduct.$id) ? 'added' : ''}`}
//               onClick={() => handleAddToWishlist(selectedProduct.wishlistId)}
//             />
//           </div>
//           <div className="product-info">
//             <h3>{selectedProduct.name}</h3>
//         <p className="price">₹{selectedProduct.price} ({selectedProduct.discounts.$values.map((discount) => (<span>{discount.discountPercentage}</span>))}% off)</p>
//         <div className="rating-stars-style">
//           {[...Array(5)].map((_, index) => (
//             <FaStar
//               key={index}
//               color={index + 1 <= Math.round(calculateAverageRating(selectedProduct.reviews)) ? "#ffc107" : "#e4e5e9"}
//               size={20}
//             />
//           ))}
//           <span className="rating-number">({calculateAverageRating(selectedProduct.reviews)}/5)</span>
//         </div>
//         <div className="action-buttons">
//           <button className="cart-button" onClick={() => handleAddToCart(selectedProduct)}>
//             <FaCartPlus className="icon" /> Add to Cart
//           </button>
//           <button className="buy-button" onClick={() => alert('Buy Now clicked')}>
//             <FaShoppingBag className="icon" /> Buy Now
//           </button>
//         </div>

//         <div className="reviews-section">
//           <h4>Reviews:</h4>
//           {selectedProduct.reviews.$values.length === 0 ? (
//             <p>No reviews yet.</p>
//           ) : (
//             selectedProduct.reviews.$values.map((review) => (
//               <div key={review.$id} className="review-item">
//                 <p>{review.comment}</p>
//                 <div className="rating-stars-style">
//                   {[...Array(5)].map((_, index) => (
//                     <FaStar
//                       key={index}
//                       color={index + 1 <= review.rating ? "#ffc107" : "#e4e5e9"}
//                       size={20}
//                     />
//                   ))}
//                   <span className="rating-number">({review.rating}/5)</span>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>

//         <div className="add-review-section">
//           <h4>Add a Review:</h4>
//           <div className="review-stars-style">
//             {[...Array(5)].map((_, index) => {
//               const ratingValue = index + 1;
//               return (
//                 <label key={index}>
//                   <input
//                     type="radio"
//                     name={`rating-${selectedProduct.productId}`}
//                     value={ratingValue}
//                     onClick={() => handleRatingChange(selectedProduct.productId, ratingValue)}
//                     style={{ display: 'none' }}
//                   />
//                   <FaStar
//                     color={ratingValue <= (ratings[selectedProduct.productId] || 0) ? "#ffc107" : "#e4e5e9"}
//                     size={30}
//                     style={{ cursor: 'pointer' }}
//                   />
//                 </label>
//               );
//             })}
//           </div>
//           <textarea
//             placeholder="Write your review here..."
//             value={newReview}
//             onChange={handleReviewChange}
//             className="review-textarea"
//           />
//           <button className="submit-review-button" onClick={() => handleAddReview(selectedProduct.productId)}>Submit Review</button>
//         </div>
//       </div>
//     ) : (
//       <div className="grid-style">
//         {products.map((product) => (
//           <div key={product.$id} className="product-card-style" onClick={() => handleProductClick(product)}>
//             {/* <img src={product.image} alt={product.name} className="product-image-style" /> */}
//             <h4>{product.name}</h4>
//             <p className="price">₹{product.price}  ({product.discounts.$values.map((discount) => (<span>{discount.discountPercentage}</span>))}% off)</p>
//             <div className="rating-stars-style">
//               {[...Array(5)].map((_, index) => (
//                 <FaStar
//                   key={index}
//                   color={index + 1 <= Math.round(calculateAverageRating(product.reviews)) ? "#ffc107" : "#e4e5e9"}
//                   size={20}
//                 />
//               ))}
//               <span className="rating-number">({calculateAverageRating(product.reviews)}/5)</span>
//             </div>
//           </div>
//         ))}
//       </div>
//     )}
//   </div>
// );
