import React from "react";
import styles from "./TrendingHighlight.module.css";

export const TrendingHighlight = ({
  title = "Trending Highlights",
  categories = [
    {
      id: 1,
      title: "Hot Deals",
      image: "/images/productCard/card.jpg",
      className: styles.hotDealsCard
    },
    {
      id: 2,
      title: "New Arrivals",
      image: "/images/productCard/card.jpg",
      className: styles.newArrivalsCard
    },
    {
      id: 3,
      title: "Best Sellers",
      image: "/images/productCard/card.jpg",
      className: styles.bestSellersCard
    },
    {
      id: 4,
      title: "Limited Edition",
      image: "/images/productCard/card.jpg",
      className: styles.limitedEditionCard
    }
  ],
  backgroundColor = "#ffffff",
  titleColor = "#333333"
}) => {
  return (
    <div className={styles.trendingHighlightContainer} style={{ backgroundColor }}>
      <h2
        className={styles.sectionTitle}
        style={{
          color: titleColor,
          '--title-color': titleColor
        }}
      >
        {title}
      </h2>
      <div className={styles.categoriesGrid}>
        {categories.map((category) => (
          <div key={category.id} className={styles.categoryWrapper}>
            <div className={`${styles.categoryCard} ${category.className}`}>
              <div className={styles.imageContainer}>
                <img
                  src={category.image}
                  alt={category.title}
                  className={styles.categoryImage}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
