import React from "react";
import styles from "./LookingFor.module.css";

export const LookingFor = ({
  title = "What are you looking for?",
  categories = [
    {
      id: 1,
      category: "Home & Living",
      title: "SOFA",
      image: "/images/lookingFor/sofa.png",
      buttonText: "SHOP NOW",
      className: styles.sofaCard
    },
    {
      id: 2,
      category: "Clothing & Shoes",
      title: "SNEAKERS",
      image: "/images/lookingFor/shoes.png",
      buttonText: "",
      className: styles.sneakersCard
    },
    {
      id: 3,
      category: "Toys & Entertainment",
      title: "TOY TRAIN",
      image: "/images/lookingFor/train.png",
      buttonText: "",
      className: styles.toyTrainCard
    },
    {
      id: 4,
      category: "Toys & Entertainment",
      title: "TOY TRAIN",
      image: "/images/lookingFor/painting.png",
      buttonText: "",
      className: styles.toyTrainCard2
    },
    {
      id: 5,
      category: "Toys & Entertainment",
      title: "PARTY DECORS",
      image: "/images/lookingFor/caps.png",
      buttonText: "",
      className: styles.partyDecorsCard
    },
    {
      id: 6,
      category: "Jewelry & Accessories",
      title: "DIAMOND\nRING",
      image: "/images/lookingFor/ring.png",
      buttonText: "SHOP NOW",
      className: styles.diamondRingCard
    }
  ],
  backgroundColor = "#ffffff",
  titleColor = "#333333"
}) => {
  return (
    <div className={styles.lookingForContainer} style={{ backgroundColor }}>
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
        {/* Row 1: SOFA (flex: 2) + SNEAKERS (flex: 1) + TOY TRAIN (flex: 1) */}
        <div className={`${styles.row} ${styles.row1}`}>
          {categories.slice(0, 3).map((category) => (
            <div key={category.id} className={`${styles.categoryCard} ${category.className}`}>
              <div className={styles.categoryInfo}>
                <span className={styles.categoryLabel}>{category.category}</span>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                {category.buttonText && (
                  <button className={styles.shopButton}>
                    {category.buttonText}
                    <span className={styles.arrow}>→</span>
                  </button>
                )}
              </div>
              <div className={styles.imageContainer}>
                <img
                  src={category.image}
                  alt={category.title}
                  className={styles.categoryImage}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: TOY TRAIN/Painting (flex: 1) + PARTY DECORS (flex: 1) + DIAMOND RING (flex: 2) */}
        <div className={`${styles.row} ${styles.row2}`}>
          {categories.slice(3).map((category) => (
            <div key={category.id} className={`${styles.categoryCard} ${category.className}`}>
              <div className={styles.categoryInfo}>
                <span className={styles.categoryLabel}>{category.category}</span>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                {category.buttonText && (
                  <button className={styles.shopButton}>
                    {category.buttonText}
                    <span className={styles.arrow}>→</span>
                  </button>
                )}
              </div>
              <div className={styles.imageContainer}>
                <img
                  src={category.image}
                  alt={category.title}
                  className={styles.categoryImage}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
