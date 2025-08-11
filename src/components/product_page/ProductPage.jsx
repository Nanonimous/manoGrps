import React, { useState } from "react";
import styles from "./ProductPage.module.css";

export const ProductPage = ({ 
  productName = "Product Name",
  productPrice = "Product Price",
  productImages = [
    "/images/productPage/2.jpg",
    "/images/productPage/1.jpg", 
    "/images/productPage/1.jpg",
    "/images/productPage/1.jpg",
    "/images/productPage/1.jpg"
  ],
  productDescription = "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item.",
  additionalInfo = "I'm a product detail. I'm a great place to add more information about your product such as sizing, material, care and cleaning instructions. This is also a great space to write what makes this product special and how your customers can benefit from this item."
}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);


  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} item(s) to cart`);
    // Add your cart logic here
  };

  const handleBuyNow = () => {
    console.log(`Buy now: ${quantity} item(s)`);
    // Add your buy now logic here
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className={styles.productPageContainer}>
      <div className={styles.productContent}>
        {/* Left side - Product Images */}
        <div className={styles.productImagesSection}>
          <div className={styles.mainImageContainer}>
            <img 
              src={productImages[selectedImage]} 
              alt={productName}
              className={styles.mainImage}
            />
          </div>
          <div className={styles.thumbnailContainer}>
            {productImages.map((image, index) => (
              <div 
                key={index}
                className={`${styles.thumbnail} ${selectedImage === index ? styles.activeThumbnail : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={image} alt={`${productName} view ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Right side - Product Details */}
        <div className={styles.productDetailsSection}>
          <h1 className={styles.productName}>{productName}</h1>
          <p className={styles.productPrice}>{productPrice}</p>
          
          <div className={styles.productDescription}>
            <p>{productDescription}</p>
          </div>
          
          <div className={styles.additionalDescription}>
            <p>{additionalInfo}</p>
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
            >
              <i className="ri-heart-fill"></i>
            </button>
          </div>

          {/* Policy Sections */}
          <div className={styles.policySections}>
            <div className={styles.policySection}>
              <span className={styles.policyHeader}>Return & Refund Policy</span>            </div>

            <div className={styles.policySection}>
              <span className={styles.policyHeader}>Shipping & Delivery Info</span>            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
