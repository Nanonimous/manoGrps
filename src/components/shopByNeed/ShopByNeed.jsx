import React from "react";
import styles from "./ShopByNeed.module.css";

export const ShopByNeed = ({
  title = "Shop by Need's",
  categories = [
    {
      id: 1,
      title: "Toys",
      image: "/images/productCard/card.jpg",
      className: styles.toysCard
    },
    {
      id: 2,
      title: "Home Essentials",
      image: "/images/productCard/card.jpg",
      className: styles.homeEssentialsCard
    },
    {
      id: 3,
      title: "Gift Articles",
      image: "/images/productCard/card.jpg",
      className: styles.giftArticlesCard
    },
    {
      id: 4,
      title: "New born - Toddler Clothing",
      image: "/images/productCard/card.jpg",
      className: styles.toddlerClothingCard
    }
  ],
  backgroundColor = "#ffffff",
  titleColor = "#333333"
}) => {
  return (
    <div className={styles.shopByNeedContainer} style={{ backgroundColor }}>
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
            <div className={styles.categoryTitle}>
              <h3>{category.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
