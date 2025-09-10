import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Trendings.module.css";
import { ProductCard_1 } from "../ProductCard_1/ProductCard_1";

export const Trendings = ({
  title = "Trending & New Arrivals",
  showViewAllButton = true,
  viewAllText = "View all products",
  onViewAllClick = () => console.log("View all clicked"),
  backgroundColor = "#F4EDE6",
  titleColor = "#e91e63",
  buttonColor = "#ffffff",
  buttonBgColor = "#e91e63",
  buttonHoverBgColor = "#c2185b",
  cardBackgroundColor = "linear-gradient(135deg, #e91e63 0%, #c2185b 100%)",
  cardTitleColor = "#ffffff",
  cardCategoryColor = "#e1e1e1b6",
  cardPriceColor = "#ffffff",
  cardButtonColor = "#e91e63",
  cardButtonTextColor = "#ffffff"
}) => {
  const [products, setProducts] = useState([]);

useEffect(() => {
  const getTrend = async () => {
    try {
      const res1 = await axios.get("https://product-7boc.onrender.com/api/product/trend?storeName=Lit%20tots")
      const res2 = await axios.get("https://product-7boc.onrender.com/api/product/trend?storeName=wowla")
      const res3 = await axios.get("https://product-7boc.onrender.com/api/product/trend?storeName=manostore")

      // Convert single object → array
      const products1 = Array.isArray(res1.data) ? res1.data : [res1.data];
      const products2 = Array.isArray(res2.data) ? res2.data : [res2.data];
      const products3 = Array.isArray(res3.data) ? res3.data : [res3.data];

      // Merge all
      const mergedProducts = [...products1, ...products2, ...products3];

      console.log("Merged Products:", mergedProducts);
      setProducts(mergedProducts);
    } catch (error) {
      console.error("Error fetching trending products:", error);
    }
  };

  getTrend();
}, []);


  return (
    <div className={styles.trendingsContainer} style={{ backgroundColor }}>
      <div className={styles.contentWrapper}>
        {/* Section Title */}
        <div className={styles.headerSection}>
          <h4
            className={styles.sectionTitle}
            style={{
              color: titleColor,
              "--title-color": titleColor
            }}
          >
            {title}
          </h4>
        </div>

        {/* Products Grid */}
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <div key={product.id || product._id} className={styles.productWrapper}>
              <ProductCard_1
                title={product.productName}
                price={product.productSellingPrice}
                image={product.productImageId}
                cardBackgroundColor={cardBackgroundColor}
                titleColor={cardTitleColor}
                categoryColor={cardCategoryColor}
                priceColor={cardPriceColor}
                buttonColor={cardButtonColor}
                buttonTextColor={cardButtonTextColor}
                cat = {product.category}
                id={product.productId}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        {showViewAllButton && (
          <div className={styles.viewAllSection}>
            <button
              className={styles.viewAllButton}
              onClick={onViewAllClick}
              style={{
                color: buttonColor,
                backgroundColor: buttonBgColor,
                "--hover-bg-color": buttonHoverBgColor
              }}
            >
              {viewAllText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Trendings;
