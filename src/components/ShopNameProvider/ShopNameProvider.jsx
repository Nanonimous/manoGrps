import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CartProvider } from '../../context/CartContext';

const ShopNameProvider = ({ children }) => {
  const location = useLocation();
  const [shopName, setShopName] = useState('');
  
  // Determine shop name based on the current route
  useEffect(() => {
    const getShopName = () => {
      // ✅ Decode pathname to convert %20 back into spaces
      const path = decodeURIComponent(location.pathname);

      if (path.startsWith('/liltots')) {
        return 'Lit tots';
      } else if (path.startsWith('/Wowla-store') || path.startsWith('/wowla')) {
        return 'wowla';
      } else if (path.startsWith('/Mano-store')) {
        return 'manostore';
      } else if (path === '/') {
        return 'manogroups'; // Default shop name for home page
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
