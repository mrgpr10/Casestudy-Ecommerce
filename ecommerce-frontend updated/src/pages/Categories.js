// // src/pages/Categories.js
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import './Categories.css';

// function Categories() {

//   const [CategoryData, setCategoryData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//   const fetchCategory = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if(!token)
//       {
//         navigate('/');
//       }
//       const url= 'http://localhost:5120/api/Category';
//       const response = await axios.get(url , {
//       headers: {
//       Authorization: `Bearer ${token}`
//       }
//       });
//       setCategoryData(response.data.$values || []);
//       } 
//       catch (error) {
//         console.log(error);
//         if(error.code == "ERR_NETWORK"){
//           alert(error.message);
//           localStorage.removeItem('token');
//           navigate('/login');
//         }
//       if(localStorage.getItem('token') && (error.response.status === 401))
//       {
//         alert("Your token expired or you are not authorized for this page");
//         localStorage.removeItem('token');
//         navigate('/login');
//       }
//       console.error('Error fetching products', error);
//     }
//   };
//   fetchCategory();
// }, []);

// useEffect(() => {
//     setLoading(false);
//   }, [CategoryData]);

//   const navigate = useNavigate();


//   return (
//     <div className="categories-container">
//     {loading ? (
//       <p>Loading categories...</p>
//     ) : (
//       CategoryData.map((category) => (
//         <div key={category.$id} className="category-item">
//           <Link to={'/category/electronics'} state={ {categoryId: category.categoryId, categoryName: category.categoryName} }>
//             <img src={category.image} alt={category.name} className="category-image" />
//             <h3 className="category-name">{category.categoryName}</h3>
//           </Link>
//         </div>
//       ))
//     )}
//     </div>
//   );
// }

// export default Categories;


//modified


// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Categories.css';
// import electronics from "../assets/images/electronics.jpeg";
// import groceries from "../assets/images/groceries.jpg";
// import jewelry from "../assets/images/jewellery.png";
// import fashion from "../assets/images/fashion.png";
// import books from "../assets/images/books.jpg";
// import sports from "../assets/images/sports.png";
// import beauty from "../assets/images/beauty.png";

// const categories = [
//   {
//     name: 'Electronics',
//     image: electronics,
//     subcategories: ['Mobiles', 'Laptops', 'Televisions', 'Cameras'],
//   },
//   {
//     name: 'Groceries',
//     image: groceries,
//     subcategories: ['Vegetables', 'Fruits', 'Dairy', 'Snacks'],
//   },
//   {
//     name: 'Fashion',
//     image: fashion,
//     subcategories: ['Men', 'Women', 'Kids', 'Accessories'],
//   },
//   {
//     name: 'Jewelry',
//     image: jewelry,
//     subcategories: ['Necklaces', 'Rings', 'Earrings', 'Bracelets'],
//   },
//   {
//     name: 'Books',
//     image: books,
//     subcategories: ['Fiction', 'Non-fiction', 'Comics', 'Textbooks'],
//   },
//   {
//     name: 'Beauty Care',
//     image: beauty,
//     subcategories: ['Skincare', 'Haircare', 'Makeup', 'Fragrances'],
//   },
//   {
//     name: 'Sports',
//     image: sports,
//     subcategories: ['Fitness', 'Camping', 'Cycling', 'Team Sports'],
//   },

// ];

// const Categories = () => {
//   const [hoveredCategory, setHoveredCategory] = useState(null);

//   return (
//     <div className="categories-container">
//       {categories.map((category, index) => (
//         <div
//           key={index}
//           className="category-card"
//           onMouseEnter={() => setHoveredCategory(category.name)}
//           onMouseLeave={() => setHoveredCategory(null)}
//         >
//           <img src={category.image} alt={category.name} className="category-image" />
//           <h3 className="category-name">{category.name}</h3>
//           {hoveredCategory === category.name && (
//             <div className="subcategory-list">
//               {category.subcategories.map((subcat, idx) => (
//                 <Link
//                   to={`/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}/${subcat.toLowerCase().replace(/ /g, '-')}`}
//                   key={idx}
//                   className="subcategory-item"
//                 >
//                   {subcat}
//                 </Link>
//               ))}
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Categories;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Categories.css';
import electronics from "../assets/images/electronics.jpeg";
import groceries from "../assets/images/groceries.jpg";
import jewelry from "../assets/images/jewellery.png";
import fashion from "../assets/images/fashion.png";
import books from "../assets/images/books.jpg";
import sports from "../assets/images/sports.png";
import beauty from "../assets/images/beauty.png";

const categories = [
  {
    name: 'Electronics',
    image: electronics,
    subcategories: ['Mobiles', 'Laptops', 'Televisions', 'Cameras'],
  },
  {
    name: 'Groceries',
    image: groceries,
    subcategories: ['Vegetables', 'Fruits', 'Dairy', 'Snacks'],
  },
  {
    name: 'Fashion',
    image: fashion,
    subcategories: ['Men', 'Women', 'Kids', 'Accessories'],
  },
  // {
  //   name: 'Jewelry',
  //   image: jewelry,
  //   subcategories: ['Necklaces', 'Rings', 'Earrings', 'Bracelets'],
  // },
  {
    name: 'Books',
    image: books,
    subcategories: ['Fiction', 'Non-fiction', 'Comics', 'Textbooks'],
  },
  {
    name: 'Beauty Care',
    image: beauty,
    subcategories: ['Skincare', 'Haircare', 'Makeup', 'Fragrances'],
  },
  {
    name: 'Sports',
    image: sports,
    subcategories: ['Fitness', 'Camping', 'Cycling', 'Team Sports'],
  },

];

const Categories = () => {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  return (
    <div className="categories-container">
      {categories.map((category, index) => (
        <div
          key={index}
          className="category-card"
          onMouseEnter={() => setHoveredCategory(category.name)}
          onMouseLeave={() => setHoveredCategory(null)}
        >
          <img src={category.image} alt={category.name} className="category-image" />
          <h3 className="category-name">{category.name}</h3>
          {hoveredCategory === category.name && (
            <div className="subcategory-dropdown">
              {category.subcategories.map((subcat, idx) => (
                <Link
                  key={idx}
                  className="subcategory-item"
                >
                  {subcat}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Categories;
