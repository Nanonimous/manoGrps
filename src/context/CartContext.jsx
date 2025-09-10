import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { ShowCard } from "../components/showCard/ShowCard";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ shopName, children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debounceTimers = useRef({}); // store debounce timers per cart item

  console.log("show name ", shopName);

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

  const token = getAuthToken();

  // ❌ if not logged in, just clear cart and stop
  if (!token) {
    setCartItems([]);
    return;
  }

  // ✅ Fetch from API only when logged in
  const fetchCart = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://favourite-cart-uicq.onrender.com/api/cart/carts/${shopName}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setCartItems(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("❌ Failed to fetch cart:", err);
      setCartItems([]);
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

  // --- Add Item (with duplicate check) ---
// --- Add Item (with duplicate check) ---
const addToCart = async (product, quantity) => {
  const token = getAuthToken();
  if (!token) {
    return { status: "unauthorized" };
  }
  console.log("from cart", product);
  // --- Check if already exists ---
  const alreadyExists = cartItems.find(
    (item) => item.productId === product.productId
  );
  if (alreadyExists) {
    return { status: "exists" };
  }

  // --- Optimistic Update ---
  setCartItems((prev) => [
    ...prev,
    {
      cartId: Math.random().toString(36).slice(2),
      productId: product.productId,
      productCode: product.productCode,
      productName: product.productName,
      productSellingPrice: product.productSellingPrice,
      RefName: product.isStaff,
      quantity,
    },
  ]);

  try {
    await axios.post(
      "https://favourite-cart-uicq.onrender.com/api/cart/add",
      {
        productCode: product.productCode,
        productId: product.productId,
        noOfQuantity: quantity,
        storeName: shopName,
        staffName: product.isStaff
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const res = await axios.get(
      `https://favourite-cart-uicq.onrender.com/api/cart/carts/${shopName}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setCartItems(Array.isArray(res.data) ? res.data : []);

    return { status: "added" };
  } catch (err) {
    console.error("❌ Add to cart failed:", err);

    // ❌ Rollback on failure
    setCartItems((prev) =>
      prev.filter((item) => item.productId !== product.productId)
    );
    return { status: "failed", error: err };
  }
};




  // --- Update Quantity (Optimistic + Debounced API) ---
  const updateQuantity = (cartId, quantity) => {
    if (quantity < 1) return;

    // Optimistic UI
    setCartItems((prev) =>
      Array.isArray(prev)
        ? prev.map((item) =>
            item.cartId === cartId ? { ...item, quantity } : item
          )
        : []
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
  const removeItem = async (productCode) => {
    const token = getAuthToken();
    if (!token) return;

    // Optimistic removal
    const prevCart = [...cartItems];
    setCartItems((prev) =>
      Array.isArray(prev) ? prev.filter((item) => item.productCode !== productCode) : []
    );

    try {
      await axios.delete(
        `https://favourite-cart-uicq.onrender.com/api/cart/delete/${shopName}?productCode=${productCode}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (err) {
      console.error("❌ Failed to remove item, rolling back:", err);
      setCartItems(prevCart); // rollback
    }
  };

  // --- Totals ---
  const totalAmount = () =>
    Array.isArray(cartItems)
      ? cartItems.reduce(
          (sum, item) =>
            sum +
            (parseFloat(item.productSellingPrice || item.productPrice) || 0) *
              item.quantity,
          0
        )
      : 0;

  const totalItems = () =>
    Array.isArray(cartItems)
      ? cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0)
      : 0;

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
