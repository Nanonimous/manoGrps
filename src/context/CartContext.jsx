import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ shopName, children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimers = useRef({}); // store debounce timers per cart item

  // --- Utils ---
  const getAuthToken = () => {
    try {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="));
      return cookie ? cookie.split("=")[1] : null;
    } catch {
      return null;
    }
  };

  // --- Load Cart (from localStorage first, then API) ---
  useEffect(() => {
    if (!shopName) return;

    // Load from localStorage instantly
    const savedCart = localStorage.getItem(`cart-${shopName}`);
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }

    // Fetch from API
    const fetchCart = async () => {
      const token = getAuthToken();
      if (!token) return;

      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://favourite-cart-uicq.onrender.com/api/cart/carts/${shopName}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCartItems(res.data || []);
      } catch (err) {
        console.error("❌ Failed to fetch cart:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, [shopName]);

  // --- Persist cart to localStorage ---
  useEffect(() => {
    if (shopName) {
      localStorage.setItem(`cart-${shopName}`, JSON.stringify(cartItems));
    }
  }, [cartItems, shopName]);

  // --- Add Item (Optimistic) ---
const addToCart = async (product, quantity) => {
  const token = getAuthToken();
  if (!token) return alert("Please log in first!");

  // --- Optimistic Update ---
  setCartItems((prev) => {
    const exists = prev.find((item) => item.productId === product.productId);
    if (exists) {
      return prev.map((item) =>
        item.productId === product.productId
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    }
    return [
      ...prev,
      {
        cartId: Math.random().toString(36).slice(2), // temporary id
        productId: product.productId,
        productName: product.productName,
        productSellingPrice: product.productSellingPrice,
        quantity,
      },
    ];
  });

  try {
    await axios.post(
      "https://favourite-cart-uicq.onrender.com/api/cart/add",
      {
        productCode: product.productCode,
        productId: product.productId,
        noOfQuantity: quantity,
        storeName: shopName,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // 🔥 Refresh cart to sync with backend
    const res = await axios.get(
      `https://favourite-cart-uicq.onrender.com/api/cart/carts/${shopName}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCartItems(res.data || []);
  } catch (err) {
    console.error("❌ Add to cart failed:", err);

    // ❌ Rollback on failure
    setCartItems((prev) =>
      prev.filter((item) => item.productId !== product.productId)
    );
  }
};

  // --- Update Quantity (Optimistic + Debounced API) ---
  const updateQuantity = (cartId, quantity) => {
    if (quantity < 1) return;

    // Optimistic UI
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartId === cartId ? { ...item, quantity } : item
      )
    );

    const token = getAuthToken();
    if (!token) return;

    // Debounce API call
    if (debounceTimers.current[cartId]) {
      clearTimeout(debounceTimers.current[cartId]);
    }
    debounceTimers.current[cartId] = setTimeout(async () => {
      try {
        await axios.put(
          `https://favourite-cart-uicq.onrender.com/api/cart/update/${cartId}?noOfQuantity=${quantity}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (err) {
        console.error("❌ Failed to update quantity:", err);
      }
    }, 500); // wait 0.5s before hitting API
  };

  // --- Remove Item (Optimistic) ---
  const removeItem = async (cartId) => {
    const token = getAuthToken();
    if (!token) return;

    // Optimistic removal
    const prevCart = [...cartItems];
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));

    try {
      await axios.delete(
        `https://favourite-cart-uicq.onrender.com/api/cart/delete/${cartId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("❌ Failed to remove item, rolling back:", err);
      setCartItems(prevCart); // rollback
    }
  };

  // --- Totals ---
  const totalAmount = () =>
    cartItems.reduce(
      (sum, item) =>
        sum +
        (parseFloat(item.productSellingPrice || item.productPrice) || 0) *
          item.quantity,
      0
    );

  const totalItems = () =>
    cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoading,
        addToCart,
        updateQuantity,
        removeItem,
        totalAmount,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
