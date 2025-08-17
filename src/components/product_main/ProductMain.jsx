import React from "react";
import styles from "./ProductMain.module.css";

export default function ProductMain({
  categoryName = "Category Name",
  breadcrumbHome = "Home",
  breadcrumbCurrent = "Products",
  backgroundImage = "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
  backgroundColor = "#F5FFFA",
  titleColor = "#ffffff",
  breadcrumbColor = "#ffffff",
  onHomeClick = null,
  onCategoryClick = null
}) {
  const handleHomeClick = (e) => {
    if (onHomeClick) {
      e.preventDefault();
      onHomeClick();
    }
  };

  const handleCategoryClick = (e) => {
    if (onCategoryClick) {
      e.preventDefault();
      onCategoryClick();
    }
  };

  return (
    <section className={styles.productMain}>
      <div
        className={styles.backgroundContainer}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundColor: backgroundColor
        }}
      >
        <div className={styles.overlay}></div>
        <div className={styles.contentContainer}>
          <div className={styles.content}>
            <h1 
              className={styles.categoryTitle}
              style={{ color: titleColor }}
            >
              {categoryName}
            </h1>
            <nav 
              className={styles.breadcrumb}
              style={{ color: breadcrumbColor }}
            >
              <a 
                href="/" 
                className={styles.breadcrumbLink}
                style={{ color: breadcrumbColor }}
                onClick={handleHomeClick}
              >
                {breadcrumbHome}
              </a>
              <span className={styles.breadcrumbSeparator}>›</span>
              <span 
                className={styles.breadcrumbCurrent}
                style={{ color: breadcrumbColor }}
              >
                {breadcrumbCurrent}
              </span>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
