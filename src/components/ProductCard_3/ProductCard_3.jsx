import React from "react";
import pc3 from "./ProductCard_3.module.css";
export const ProductCard_3 = ({ image, ProductName, ProductBrand, summary,price ,productCode,RemainingProducts}) => {
  return (
    <div className={pc3.productCardContainer}>
      <div className={pc3.productHeader}>
        <div className={pc3.productImage}>
          <img src={image} className={pc3.productImg} />
        </div>
        <div className={pc3.productBasicInfo}>
          <h3 className={pc3.productName}>{ProductName || "Product Name"}</h3>
          <p className={pc3.productBrand}>{ProductBrand || "Product Brand"}</p>
          <p className={pc3.price}>{price || "Price"}</p>
        </div>
      </div>

      <div className={pc3.summarySection}>
        <h4 className={pc3.summaryTitle}>Summary</h4>
        <p className={pc3.summaryText}>
         {summary}
        </p>
      </div>

      <div className={pc3.productStats}>
        <div className={pc3.statItem}>
          <span className={pc3.statLabel}>Product Code</span>
          <span className={pc3.statValue}>{productCode}</span>
        </div>
        <div className={pc3.statItem}>
          <span className={pc3.statLabel}>Remaining Products</span>
          <span className={pc3.statValue}>{RemainingProducts}</span>
        </div>
      </div>

      {/* Hover Button */}
      <div className={pc3.hoverOverlay}>
        <button className={pc3.updateButton}>
          + UPDATE PRODUCT
        </button>
      </div>

    </div>
  );
};  
