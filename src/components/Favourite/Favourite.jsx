import React, { useState, useEffect } from "react";
import styles from "./Favourite.module.css";
import axios from "axios";
import FavouriteCard from "../FavouriteCard/FavouriteCard";
import ShowProduct from "../showproduct/ShowProduct";

export default function Favourite({ storeName ,mainColor}) {
  const [favoriteProducts, setFavoriteProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthToken = () => {
    try {
      const cookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("authToken="));
      if (!cookie) return null;
      return cookie.split("=")[1];
    } catch (err) {
      console.error("Error reading auth token:", err);
      return null;
    }
  };

  const fetchFavoriteProducts = async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const res = await axios.get(
        `https://favourite-cart-uicq.onrender.com/api/favourite/favourites/${storeName}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setFavoriteProducts(typeof res.data === "string" ? [] : res.data);
      console.log(res.data)
    } catch (err) {
      console.error("Error fetching favourites:", err);
      setFavoriteProducts([]);
    } finally {
      setLoading(false);
    }
  };

  

  const removeFromFavorites = async (product_code) => {
    try {
      const token = getAuthToken();
      if (!token) {
        setError("Please login to manage favorites");
        return;
      }

      await axios.delete(
        `https://favourite-cart-uicq.onrender.com/api/favourite/delete/${storeName}?productCode=${product_code}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

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
    return <div className={styles.loading}>Loading favorite products...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <ShowProduct
      title="Your Favourite Products"
      shopName={storeName}
      categoryName="favourite"
      backgroundColor="#F5FFFA"
      titleColor={mainColor}
      cardTextColor="#ffffff"
      products={favoriteProducts} // ✅ Pass favourites
      deleteFav = {removeFromFavorites}
    />
  );
}
