import React from "react";
import styles from "./TopBrands.module.css";

export const TopBrands = ({
  title = "Top Brands",
  subtitle = "Shop by top selected brands",
  brands = [
    {
      id: 1,
      name: "Disney",
      logo: "/images/brands/disney.png",
      alt: "Disney Logo"
    },
    {
      id: 2,
      name: "Barbie",
      logo: "/images/brands/barbie.png",
      alt: "Barbie Logo"
    },
    {
      id: 3,
      name: "Tigres",
      logo: "/images/brands/tigres.png",
      alt: "Tigres Logo"
    },
    {
      id: 4,
      name: "LEGO",
      logo: "/images/brands/lego.png",
      alt: "LEGO Logo"
    },
    {
      id: 5,
      name: "Mattel",
      logo: "/images/brands/mattel.png",
      alt: "Mattel Logo"
    },
    {
      id: 6,
      name: "Toysmith",
      logo: "/images/brands/toysmith.png",
      alt: "Toysmith Logo"
    }
  ],
  backgroundColor = "#ffffff",
  titleColor = "#2d5a27",
  subtitleColor = "rgba(53, 94, 59, 1)"
}) => {
  // Create multiple duplications for seamless infinite scroll, especially with fewer logos
  const minBrands = 12; // Minimum number of brand instances to ensure smooth cycling
  const duplicationsNeeded = Math.ceil(minBrands / brands.length);
  const duplicatedBrands = Array(duplicationsNeeded).fill(brands).flat();

  // Calculate the percentage to move for seamless loop
  const originalBrandsCount = brands.length;
  const totalBrandsCount = duplicatedBrands.length;
  const movePercentage = (originalBrandsCount / totalBrandsCount) * 100;

  return (
    <div className={styles.topBrandsContainer} style={{ backgroundColor }}>
      <div className={styles.contentWrapper}>
        <div className={styles.headerSection}>
          <h2
            className={styles.mainTitle}
            style={{
              color: titleColor,
              '--title-color': titleColor
            }}
          >
            {title}
          </h2>
          <p className={styles.subtitle} style={{ color: subtitleColor }}>{subtitle}</p>
        </div>

        <div className={styles.brandsSlider}>
          <div
            className={styles.brandsTrack}
            style={{
              '--move-distance': `-${movePercentage}%`
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div key={`${brand.id}-${index}`} className={styles.brandItem}>
                <img
                  src={brand.logo}
                  alt={brand.alt}
                  className={styles.brandLogo}
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                  onLoad={(e) => {
                    // Hide text when image loads successfully
                    e.target.nextSibling.style.display = 'none';
                  }}
                />
                <div className={styles.brandNameFallback} style={{display: 'none'}}>
                  {brand.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
