import React from "react";
import styles from "./WhyChoseUs.module.css";

export const WhyChoseUs = ({
  title = "Why chose us?",
  features = [
    {
      id: 1,
      icon: "🚚",
      title: "Reliable Delivery",
      description: "Fast and secure delivery to your doorstep"
    },
    {
      id: 2,
      icon: "📋",
      title: "Contact & Enquiry support",
      description: "24/7 customer support for all your queries"
    },
    {
      id: 3,
      icon: "🛒",
      title: "Bulk Inquiry",
      description: "Special pricing for bulk orders"
    },
    {
      id: 4,
      icon: "👍",
      title: "Mono Groups Quality Assurance",
      description: "Premium quality guaranteed products"
    }
  ],
  backgroundColor = "w",
  titleColor = "#333333",
  featureTitleColor = "#333333",
  featureDescColor = "#666666"
}) => {
  return (
    <div className={styles.whyChoseUsContainer} style={{ backgroundColor }}>
      <div className={styles.contentWrapper}>
        <h2
          className={styles.mainTitle}
          style={{
            color: titleColor,
            '--title-color': titleColor
          }}
        >
          {title}
        </h2>
        
        <div className={styles.featuresGrid}>
          {features.map((feature) => (
            <div key={feature.id} className={styles.featureCard}>
              <div className={styles.iconContainer}>
                <span className={styles.icon}>{feature.icon}</span>
              </div>
              <h3 className={styles.featureTitle} style={{ color: featureTitleColor }}>
                {feature.title}
              </h3>
              {feature.description && (
                <p style={{ color: featureDescColor }}>{feature.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
