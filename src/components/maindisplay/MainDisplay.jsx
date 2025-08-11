import React, { useState, useEffect } from "react";
import styles from "./MainDisplay.module.css";

export default function MainDisplay({
  title = "Client6 - \"Content\"",
  subtitle = "Images 5",
  buttonText = "Shop now",
  buttonLink = "#shop",
  backgroundImages = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80"
  ],
  autoSlideInterval = 4000,
  onButtonClick = null
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % backgroundImages.length
      );
    }, autoSlideInterval);

    return () => clearInterval(interval);
  }, [backgroundImages.length, autoSlideInterval]);

  const handleButtonClick = (e) => {
    if (onButtonClick) {
      e.preventDefault();
      onButtonClick();
    }
  };

  return (
    <section className={styles.mainDisplay}>
      <div
        className={styles.backgroundContainer}
        style={{
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`
        }}
      >
        <div className={styles.overlay}></div>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <h1 className={styles.title}>{title}</h1>
            <p className={styles.subtitle}>{subtitle}</p>
            <a
              href={buttonLink}
              className={styles.shopButton}
              onClick={handleButtonClick}
            >
              {buttonText}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
