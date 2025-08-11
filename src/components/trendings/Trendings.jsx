import React from "react";
import styles from "./Trendings.module.css";
import { ProductCard_1 } from "../ProductCard_1/ProductCard_1";

export const Trendings = ({
  title = "Trending & New Arrivals",
  products = [
    {
      id: 1,
      title: "Off-Road 4W Car Hot Wheels",
      cat: "Hot Wheels",
      price: "1700",
      image: "/images/productCard/card.jpg"
    },
    {
      id: 2,
      title: "Off-Road 4W Car Hot Wheels",
      cat: "Hot Wheels",
      price: "1700",
      image: "/images/productCard/card.jpg"
    },
    {
      id: 3,
      title: "Off-Road 4W Car Hot Wheels",
      cat: "Hot Wheels",
      price: "1700",
      image: "/images/productCard/card.jpg"
    }
  ],
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
  return (
    <div className={styles.trendingsContainer} style={{ backgroundColor }}>
      <div className={styles.contentWrapper}>
        {/* Section Title */}
        <div className={styles.headerSection}>
          <h4
            className={styles.sectionTitle}
            style={{
              color: titleColor,
              '--title-color': titleColor
            }}
          >
            {title}
          </h4>
        </div>

        {/* Products Grid */}
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <div key={product.id} className={styles.productWrapper}>
              <ProductCard_1
                title={product.title}
                cat={product.cat}
                price={product.price}
                image={product.image}
                cardBackgroundColor={cardBackgroundColor}
                titleColor={cardTitleColor}
                categoryColor={cardCategoryColor}
                priceColor={cardPriceColor}
                buttonColor={cardButtonColor}
                buttonTextColor={cardButtonTextColor}
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
                '--hover-bg-color': buttonHoverBgColor
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
