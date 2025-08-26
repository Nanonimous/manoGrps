import React, { useState, useEffect } from "react";
import styles from "./Favourite.module.css";
import axios from "axios";

export default function Favourite({storeName}) {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthToken = () => {
    try {
      const cookie = document.cookie
        .split("; ")
        .find(row => row.startsWith("authToken="));
      if (!cookie) return null;
      return cookie.split("=")[1];
    } catch (err) {
      console.error("Error reading auth token:", err);
      return null;
    }
  };

  const fetchFavoriteProducts = async () => {
  try {
    const token = getAuthToken();
    console.log("Using token:", storeName, token);
    const res = await axios.get(
      `https://favourite-cart-uicq.onrender.com/api/favourite/favourites/${storeName}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    console.log("Fetched favorite products:", res.data);
    // If API gives a string → treat as empty array
    if (typeof res.data === "string") {
      setFavoriteProducts([]);
    } else {
      setFavoriteProducts(res.data); // 👈 assuming this is an array of products
    }
  } catch (err) {
    console.error("Error fetching favourites:", err);
    setFavoriteProducts([]);
  }
};

  const removeFromFavorites = async (productId) => {
    try {
      const token = getAuthToken();
      if (!token) {
        setError("Please login to manage favorites");
        return;
      }

      await axios.delete(
        `https://favourite-cart-uicq.onrender.com/api/favorites/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Refresh the list after removal
      fetchFavoriteProducts();
    } catch (error) {
      console.error("Error removing from favorites:", error);
      setError("Failed to remove from favorites");
    }
  };

  useEffect(() => {
    fetchFavoriteProducts();
  }, []);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading favorite products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
      </div>
    );
  }

  return (


    <div className={styles.container}>
      <h1 className={styles.title}>Your Favorite Products</h1>
      
      {favoriteProducts.length > 0 ? (
        favoriteProducts.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))
      ) : (
        <p>No Product Available in Your Favourite. Please Add a Product in your Favourite</p>
      )}
    </div>
  );
}
