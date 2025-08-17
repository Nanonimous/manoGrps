import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

const CartContext = createContext();

// Simple API service functions
const cartApi = {
  getCart: async () => {
    try {
      const response = await fetch('/api/cart');
      if (!response.ok) throw new Error('Failed to fetch cart');
      return await response.json();
    } catch (error) {
      console.error('Error fetching cart:', error);
      return [];
    }
  },

  addToCart: async (item) => {
    try {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      if (!response.ok) throw new Error('Failed to add item');
      return await response.json();
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  updateCartItem: async (id, quantity) => {
    try {
      const response = await fetch(`/api/cart/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });
      if (!response.ok) throw new Error('Failed to update item');
      return await response.json();
    } catch (error) {
      console.error('Error updating cart:', error);
      throw error;
    }
  },

  removeFromCart: async (id) => {
    try {
      const response = await fetch(`/api/cart/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to remove item');
      return await response.json();
    } catch (error) {
      console.error('Error removing from cart:', error);
      throw error;
    }
  },

  clearCart: async () => {
    try {
      const response = await fetch('/api/cart/clear', {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to clear cart');
      return await response.json();
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  },
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return action.payload;
    
    case 'ADD_ITEM':
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      }
      return [...state, action.payload];
    
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload);
    
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    
    case 'CLEAR_CART':
      return [];
    
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load cart from API on mount
  useEffect(() => {
    const loadCart = async () => {
      setLoading(true);
      try {
        const items = await cartApi.getCart();
        dispatch({ type: 'SET_CART', payload: items });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    loadCart();
  }, []);

  const addItem = async (item) => {
    setLoading(true);
    try {
      await cartApi.addToCart(item);
      const updatedCart = await cartApi.getCart();
      dispatch({ type: 'SET_CART', payload: updatedCart });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (id) => {
    setLoading(true);
    try {
      await cartApi.removeFromCart(id);
      const updatedCart = await cartApi.getCart();
      dispatch({ type: 'SET_CART', payload: updatedCart });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (id, quantity) => {
    setLoading(true);
    try {
      if (quantity <= 0) {
        await removeItem(id);
      } else {
        await cartApi.updateCartItem(id, quantity);
        const updatedCart = await cartApi.getCart();
        dispatch({ type: 'SET_CART', payload: updatedCart });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    try {
      await cartApi.clearCart();
      dispatch({ type: 'SET_CART', payload: [] });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      loading,
      error,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
