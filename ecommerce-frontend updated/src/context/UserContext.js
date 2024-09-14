import React, { createContext, useState, useContext } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [cartId, setCartId] = useState(null);
  const [wishlistId, setWishlistId] = useState(null);

  return (
    <UserContext.Provider value={{ userId, setUserId, cartId, setCartId, wishlistId, setWishlistId }}>
      {children}
    </UserContext.Provider>
  );
};

// export const useUser = () => useContext(UserContext);
