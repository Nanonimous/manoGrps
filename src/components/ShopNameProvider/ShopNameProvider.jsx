import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';

const ShopNameProvider = ({ children }) => {
  const location = useLocation();
  const [shopName, setShopName] = useState('');
  
  // Determine shop name based on the current route
  useEffect(() => {
    const getShopName = () => {
      const path = location.pathname;
      
      if (path.startsWith('/liltots')) {
        return 'Lit tots';
      } else if (path.startsWith('/wowla')) {
        return 'Wowla';
      } else if (path.startsWith('/manostore')) {
        return 'Mano Store';
      } else if (path === '/') {
        return 'Main Store'; // Default shop name for home page
      }
      
      return 'Lit tots'; // Fallback shop name
    };

    setShopName(getShopName());
  }, [location.pathname]);

  return (
    <CartProvider shopName={shopName}>
      {children}
    </CartProvider>
  );
};

export default ShopNameProvider;
