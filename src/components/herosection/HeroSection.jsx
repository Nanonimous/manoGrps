import React from "react";
import styles from "./HeroSection.module.css";

export const HeroSection = ({
  mainHeading = "The wait is over—our sale starts today!",
  subText = "Deals Content - Products",
  buttonText = "Shop now",
  heroImage = "/images/heroSection/heroSection.png",
  heroImageAlt = "Hero Section",
  backgroundColor = "#ffffff",
  headingColor = "#2d5a27",
  subTextColor = "#666",
  buttonColor = "#ffffff",
  buttonBgColor = "linear-gradient(135deg, #ff6b6b, #ff8e53)",
  onButtonClick = () => console.log("Shop now clicked")
}) => {
  return (
    <div className={styles.heroContainer} style={{ backgroundColor }}>
      <div className={styles.contentWrapper}>
        {/* Main content */}
        <div className={styles.mainContent}>
          <h1 className={styles.mainHeading} style={{ color: headingColor }}>
            {mainHeading}
          </h1>

          <p className={styles.subText} style={{ color: subTextColor }}>
            {subText}
          </p>

          <button
            className={styles.shopNowButton}
            onClick={onButtonClick}
            style={{
              color: buttonColor,
              background: buttonBgColor
            }}
          >
            {buttonText}
          </button>
        </div>

        {/* Hero Image Area */}
        <div className={styles.imageArea}>
          <img
            src={heroImage}
            alt={heroImageAlt}
            className={styles.heroImage}
          />
        </div>
      </div>
    </div>
  );
};
