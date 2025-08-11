import React from "react";
import styles from "./About_us.module.css";

export const About_us = ({
  title = "About us",
  image = "/images/about-us.jpg",
  description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
  backgroundColor = "#ffffff",
  titleColor = "#333333",
  textColor = "#666666"
}) => {
  return (
    <div className={styles.aboutUsContainer} style={{ backgroundColor }}>
      <div className={styles.aboutUsContent}>
        {/* Title */}
        <h2
          className={styles.aboutUsTitle}
          style={{
            color: titleColor,
            '--title-color': titleColor
          }}
        >
          {title}
        </h2>

        {/* Content Section */}
        <div className={styles.contentSection}>
          {/* Left side - Image */}
          <div className={styles.imageSection}>
            <div className={styles.imageContainer}>
              <img
                src={image}
                alt="About us"
                className={styles.aboutImage}
              />
            </div>
          </div>

          {/* Right side - Text */}
          <div className={styles.textSection}>
            <p className={styles.description} style={{ color: textColor }}>
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
