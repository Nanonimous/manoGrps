import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./ProductPage.module.css";
import { useCart } from "../../context/CartContext";

export const ProductPage = ({productDetails}) => {
  const location = useLocation();
  const navigate = useNavigate();
    const { addToCart } = useCart();   // 👈 from context

  console.log("show it ",productDetails);

  // Fetch product details based on productId
  const [selectedImage, setSelectedImage] = useState(0);
const [quantity, setQuantity] = useState(1);

const [isWishlisted, setIsWishlisted] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
const [cartLoading, setCartLoading] = useState(false);
const [buyLoading, setBuyLoading] = useState(false);
const [addedToCart, setAddedToCart] = useState(false); // ✅ new state


    useEffect(() => {
      const token = document.cookie.split('; ').find(row => row.startsWith('authToken='));
      if (token) {
        setIsLoggedIn(true);
      }
    }, []);



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
  if (!isLoggedIn) {
    const confirmDelete = window.confirm("Login to use?");
    if (confirmDelete) {
      navigate("/authentication", {
        state: { from: location.pathname + location.search },
      });
    }
    return;
  }

  if (cartLoading) return; // prevent spamming
  setCartLoading(true);

  try {
    const result = await addToCart(productDetails, quantity);
    switch (result.status) {
      case "exists":
        alert("This item is already in your cart!");
        break;
      case "added":
        setAddedToCart(true); // ✅ show success text
        setTimeout(() => setAddedToCart(false), 2000); // reset after 2 sec
        break;
      case "unauthorized":
        alert("Please log in first!");
        break;
      case "failed":
        alert("Failed to add item to cart. Please try again.");
        break;
      default:
        break;
    }
  } catch (err) {
    console.error("Error adding to cart:", err);
  } finally {
    setCartLoading(false);
  }
};



 const handleBuyNow = async () => {
  if (!isLoggedIn) {
    const confirmDelete = window.confirm("login to use?");
    if (confirmDelete) {
      navigate("/authentication", { state: { from: location.pathname + location.search } });
    }
    return;
  }

  if (buyLoading) return;
  setBuyLoading(true);

  try {
    navigate("/payment", { 
      state: { 
        product: {
          id: productDetails.productId,
          name: productDetails.productName,
          code: productDetails.productCode,
          price: productDetails.productSellingPrice,
          quantity: quantity,
          staffName : productDetails.isStaff,
          img: `https://lh3.googleusercontent.com/d/${productDetails.productImageId[0]}=w1000-h1000-rw`
        },
        shopName : productDetails.storeName
      }
    });
  } finally {
    setBuyLoading(false);
  }
};


  const [wishlistLoading, setWishlistLoading] = useState(false);

const toggleWishlist = async () => {
  if (isLoggedIn) {
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
  }else{
    const confirmDelete = window.confirm("login to use?");
  if(confirmDelete){
    navigate("/authentication", { state: { from: location.pathname + location.search } });
  }
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
                  disabled = {quantity >= productDetails.productQuantity }
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
              disabled={productDetails.productQuantity === 0 || cartLoading}
            >
              {cartLoading 
                ? <i className="ri-loader-4-line ri-spin"></i> 
                : addedToCart 
                  ? "✅ Added" 
                  : "Add to Cart"}
            </button>


              <button 
                className={styles.buyNowBtn}
                onClick={handleBuyNow}
                disabled={productDetails.productQuantity === 0 || buyLoading}
              >
                {buyLoading 
                  ? <i className="ri-loader-4-line ri-spin"></i> 
                  : (productDetails.productQuantity === 0 ? "Out of Stock" : "Buy Now")}
              </button>

              <button 
                className={`${styles.wishlistBtn} ${isWishlisted ? styles.wishlisted : ''}`}
                onClick={toggleWishlist}
                disabled={wishlistLoading}
              >
                {wishlistLoading 
                  ? <i className="ri-loader-4-line ri-spin"></i> 
                  : <i className="ri-heart-fill"></i>}
              </button>
            </div>

                  {
                productDetails.productQuantity < 5 && (
                  <p className={styles.noProductLeft}>{productDetails.productQuantity == 0 ? "out of stocks" :`allmost out of stocks Only ${productDetails.productQuantity} is Left`} </p>
                )
              } 
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
