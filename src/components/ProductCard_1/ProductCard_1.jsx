import React from "react";
import pc from "./ProductCard_1.module.css";

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
  buttonTextColor = "#ffffff"
}) => {
  return (
    <div
      className={pc.productCardContainer}
      style={{ background: cardBackgroundColor }}
    >
      <img src={`https://lh3.googleusercontent.com/d/${image}=w1000-h1000-rw`} className={pc.imgContainer} alt={title} />
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
        >
          Shop now
        </button>
      </div>
    </div>
  );
};
