import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./ProductPage.module.css";
import { useCart } from "../../context/CartContext";

export const ProductPage = ({productDetails}) => {
  const location = useLocation();
    const { addToCart } = useCart();   // 👈 from context

  console.log("show it ",productDetails);

  // Fetch product details based on productId
  const [selectedImage, setSelectedImage] = useState(0);
const [quantity, setQuantity] = useState(1);

const [isWishlisted, setIsWishlisted] = useState(false);




  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };



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
const handleAddToCart = async () => {
  const cartItem = {
    cartId: productDetails.productId, // 👈 use productId as unique cartId
    productName: productDetails.productName,
    productPrice: productDetails.productSellingPrice,
    quantity: quantity,
    productImageId: productDetails.productImageId,
  };

  addToCart(cartItem, quantity);
  alert("Product added to cart");
};

  const handleBuyNow = () => {
    console.log(`Buy now: ${quantity} item(s)`);
    // Add your buy now logic here
  };
  const [wishlistLoading, setWishlistLoading] = useState(false);

const toggleWishlist = async () => {
  if (wishlistLoading) return; // ⛔ prevent spamming
  const token = getAuthToken();

  // Optimistically update UI first
  setIsWishlisted((prev) => !prev);
  setWishlistLoading(true);

  try {
    if (isWishlisted) {
      await axios.delete(
        `https://favourite-cart-uicq.onrender.com/api/favourite/delete/${productDetails.storeName}?productCode=${productDetails.productCode}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } else {
      await axios.post(
        `https://favourite-cart-uicq.onrender.com/api/favourite/add`,
        {
          storeName: productDetails.storeName,
          productCode: productDetails.productCode,
          productId: productDetails.productId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    }
  } catch (err) {
    console.error("Error toggling wishlist:", err);
    setIsWishlisted((prev) => !prev); // revert if failed
  } finally {
    setWishlistLoading(false);
  }
};



  const getDriveImageUrl = (fileId) => {
  if (!fileId) return "";
  return `https://lh3.googleusercontent.com/d/${fileId}=w1000-h1000-rw`;
};

useEffect(() => {
  const isFav = async () => {
    try {
      const token = getAuthToken();
      const res = await axios.get(
        `https://favourite-cart-uicq.onrender.com/api/favourite/favourite/${productDetails.storeName}?productCode=${productDetails.productCode}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data) {
        console.log("Favourite check:", res.data);
        setIsWishlisted(true);
      } else {
        setIsWishlisted(false);
      }
    } catch (err) {
      console.error("Error checking favourite:", err);
    }
  };
  if (productDetails) {
    isFav();
  }
}, [productDetails]);


  return (
    <div className={styles.productPageContainer}>
      {productDetails ? (
        <div className={styles.productContent}>
          {/* Left side - Product Images */}
          <div className={styles.productImagesSection}>
            <div className={styles.mainImageContainer}>
      <img 
        src={`https://lh3.googleusercontent.com/d/${productDetails.productImageId[selectedImage]}=w1000-h1000-rw`} 
        alt={productDetails.productName}
        className={styles.mainImage}
      />




            </div>
            <div className={styles.thumbnailContainer}>
              {productDetails.productImageId.map((image, index) => (
                <div 
                  key={index}
                  className={`${styles.thumbnail} ${selectedImage === index ? styles.activeThumbnail : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
<img 
  src={getDriveImageUrl(image)} 
  alt={`${productDetails.productName} view ${index + 1}`} 
/>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Product Details */}
          <div className={styles.productDetailsSection}>
            <h1 className={styles.productName}>{productDetails.productName}</h1>
            <p className={styles.productPrice}>Rs.{productDetails.productSellingPrice}</p>
            
            <div className={styles.productDescription}>
              <p>{productDetails.productDescription}</p>
            </div>
            
            <div className={styles.additionalDescription}>
              <p>temporary text</p>
            </div>

            {/* Quantity Selector */}
            <div className={styles.quantitySection}>
              <label className={styles.quantityLabel}>Product Quantity</label>
              <div className={styles.quantityControls}>
                <button 
                  className={styles.quantityBtn}
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <span className={styles.quantityValue}>{quantity}</span>
                <button 
                  className={styles.quantityBtn}
                  onClick={() => handleQuantityChange(1)}
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className={styles.actionButtons}>
              <button 
                className={styles.addToCartBtn}
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
              <button 
                className={styles.buyNowBtn}
                onClick={handleBuyNow}
              >
                Buy Now
              </button>
              <button 
                className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ''}`}
                onClick={toggleWishlist}
                disabled={wishlistLoading}
              >
                {wishlistLoading ? (
                  <i className="ri-loader-4-line ri-spin"></i> // spinner
                ) : (
                  <i className="ri-heart-fill"></i>
                )}
              </button>

            </div>

            {/* Policy Sections */}
            <div className={styles.policySections}>
              <div className={styles.policySection}>
                <span className={styles.policyHeader}>Return & Refund Policy</span>            
              </div>

              <div className={styles.policySection}>
                <span className={styles.policyHeader}>Shipping & Delivery Info</span>            
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};
