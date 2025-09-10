import React from "react";
import pc from "./ProductCard_1.module.css";
import { useNavigate } from "react-router-dom";

export const ProductCard_1 = ({
  image,
  title,
  cat,
  price,
  productId,
  cardBackgroundColor = "linear-gradient(135deg, #e91e63 0%, #c2185b 100%)",
  titleColor = "#ffffff",
  categoryColor = "#e1e1e1b6",
  priceColor = "#ffffff",
  buttonColor = "#e91e63",
  buttonTextColor = "#ffffff",
  storeName,
  productQuantity,
  id
}) => {
  const navigate = useNavigate();

  // 🏷️ Badge logic
  let badgeText = "";
  let badgeColor = "";

  if (productQuantity === 0) {
    badgeText = "Out of Stock";
    badgeColor = "#d32f2f"; // red
  } else if (productQuantity < 5) {
    badgeText = `Only ${productQuantity} left!`;
    badgeColor = "#f57c00"; // orange
  } else {
    badgeText = "In Stock";
    badgeColor = "#388e3c"; // green
  }

  return (
    <div
      className={pc.productCardContainer}
      style={{ background: cardBackgroundColor }}
    >
      <div className={pc.imageWrapper}>
        {image ? (
          <img
            src={`https://lh3.googleusercontent.com/d/${image}=w1000-h1000-rw`}
            className={pc.imgContainer}
            alt={title}
          />
        ) : (
          <div className={pc.noImagePlaceholder}>
            <span>No Image</span>
          </div>
        )}

        {/* 🏷️ Stock Badge */}
        <span
          className={pc.stockBadge}
          style={{ backgroundColor: badgeColor }}
        >
          {badgeText}
        </span>
      </div>

      <div className={pc.productDetail}>
        <div className={pc.leftProDetail}>
          <p className={pc.title} style={{ color: titleColor }}>{title}</p>
          <p className={pc.cat} style={{ color: categoryColor }}>{cat}</p>
          <p className={pc.price} style={{ color: priceColor }}>{price}/-</p>
        </div>

        <div className={pc.rightProDetail}>
          <a href="/">
            <i className="ri-add-circle-fill"></i>
          </a>
        </div>
      </div>

      <div className={pc.shopButton}>
        <button
          className={pc.shopNowBtn}
          style={{
            color: buttonColor,
            backgroundColor: buttonTextColor
          }}
          onClick={() =>
            navigate(`/${storeName}/products/${cat}?id=${productId}`)
          }
        >
          Shop now
        </button>
      </div>
    </div>
  );
};
