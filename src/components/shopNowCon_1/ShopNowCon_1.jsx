import React from "react";
import styles from "./ShopNowCon_1.module.css";

export const ShopNowCon_1 = ({
  mainTitle = "Experience in pilot's",
  subTitle = "Point of view, by grabbing this",
  highlightTitle = "Fantastic plane.",
  buttonText = "Shop now",
  image = "/images/shopNowCon/car.png",
  imageAlt = "Fantastic Plane",
  backgroundColor = "#ffffff",
  titleColor = "#333333",
  subtitleColor = "#666666",
  highlightColor = "#e91e63",
  buttonColor = "#ffffff",
  buttonBgColor = "#e91e63",
  onButtonClick = () => console.log("Shop now clicked")
}) => {
  return (
    <div className={styles.shopNowContainer} style={{ backgroundColor }}>
      <div className={styles.contentWrapper}>
        <div className={styles.textSection}>
          <h2 className={styles.mainTitle} style={{ color: titleColor }}>
            {mainTitle}
          </h2>
          <h3 className={styles.subTitle} style={{ color: subtitleColor }}>
            {subTitle}
          </h3>
          <h3 className={styles.highlightTitle} style={{ color: highlightColor }}>
            {highlightTitle}
          </h3>
          <button
            className={styles.shopNowButton}
            onClick={onButtonClick}
            style={{ color: buttonColor, backgroundColor: buttonBgColor }}
          >
            {buttonText}
          </button>
        </div>

        <div className={styles.imageSection}>
          <div className={styles.planeContainer}>
            <img
              src={image}
              alt={imageAlt}
              className={styles.planeImage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
