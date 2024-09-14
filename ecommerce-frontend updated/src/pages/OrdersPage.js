// import React, { useContext } from 'react';
// import { CartContext } from '../context/CartContext';
// import { Link } from 'react-router-dom';
// import    { useEffect } from 'react';
// import './OrdersPage.css'; 





// function OrdersPage() {
//   const { orders } = useContext(CartContext);




// //products array in  orders object is empty, which is why we are not seeing any product details in the OrdersPage

//   useEffect(() => {
//     console.log('Orders:', orders);
//     if (orders.length > 0) {
//       console.log('First Order:', orders[0]);
//       console.log('Products in First Order:', orders[0].products);
//     }
//   }, [orders]);

//   if (!orders || orders.length === 0) {
//     return (
//       <div className="orders-container">
//         <h2 className="page-title">Orders</h2>
//         <p className="no-orders-message">You have no orders yet. Check back later!</p>
//       </div>
//     );
//   }

//   return (
//     <div className="orders-container">
//       <h2 className="page-title">Order History</h2>



//       <table className="orders-table">
//         <thead>
//           <tr>
//             <th>Order ID</th>
//             <th>Products</th>
//             <th>Quantity</th>
//             <th>Total Price</th>
//             <th>Payment Method</th>
//             <th>Status</th>
//             <th>Actions</th>
//           </tr>
//         </thead>


//         <tbody>
//           {orders.map(order => (
//             <tr key={order.id}>
//               <td>{order.id}</td>
//               <td>
//                 {order.products.map(product => (
//                   <div key={product.name} className="product-info">
//                     {product.name} ({product.quantity})
//                   </div>
//                 ))}
//               </td>
//               <td>
//                 {order.products.reduce((total, product) => total + product.quantity, 0)}
//               </td>
//               <td>₹{order.totalPrice.toFixed(2)}</td>
//               <td>{order.paymentType}</td>
//               <td>
//                 <span className={`status ${order.status.toLowerCase()}`}>
//                   {order.status}
//                 </span>
//               </td>
//               <td>
//                 <Link to={`/orders/${order.id}`} className="details-link">
//                   View Details
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default OrdersPage;


import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './OrdersPage.css'; // Make sure the CSS file is imported

function OrdersPage() {
  const { orders } = useContext(CartContext);

  useEffect(() => {
    console.log('Orders:', orders);
    if (orders.length > 0) {
      console.log('First Order:', orders[0]);
      console.log('Products in First Order:', orders[0].products);
    }
  }, [orders]);

  if (!orders || orders.length === 0) {
    return (
      <div className="orders-container">
        <h2 className="page-title">Orders</h2>
        <p className="no-orders-message">You have no orders yet. Check back later!</p>
      </div>
    );
  }

  return (
    // <div className="orders-container">
    <div className="background">
      <div className="order-page">
        <h2 className="page-title">Order History</h2>

        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Products</th>
              <th>Quantity</th>
              <th>Total Price</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>
                  {order.products.map(product => (
                    <div key={product.name} className="product-info">
                      {product.name} ({product.quantity})
                    </div>
                  ))}
                </td>
                <td>
                  {order.products.reduce((total, product) => total + product.quantity, 0)}
                </td>
                <td>₹{order.totalPrice.toFixed(2)}</td>
                <td>{order.paymentType}</td>
                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <Link to={`/orders/${order.id}`} className="details-link">
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrdersPage;
