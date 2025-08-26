import React from "react";
import { useNavigate } from "react-router-dom";
import pc2 from "./ProductCard_2.module.css";

export const ProductCard_2 = ({
  image,
  title,
  shopName,
  cat,
  price,
  backgroundColor = "#355E3B",
  productId,
}) => {

  const navigate = useNavigate();

  const ViewProduct = () => {
    navigate(`/${shopName}/products/${cat}?id=${productId}`);
  }


  return (
    <div
      className={pc2.productCardContainer}
      style={{ backgroundColor: backgroundColor }}
    >
      <img
        src={`https://lh3.googleusercontent.com/d/${image}=w1000-h1000-rw`}
        className={pc2.imgContainer}
        alt={title || "Product"}
      />

      <div className={pc2.productDetail}>
        <p className={pc2.title}>{title || "Product Name"}</p>
        <p className={pc2.descp}>{cat || "Short description"}</p>
        <p className={pc2.price}>Rs.{price || "Price"}</p>
      </div>

      <div className={pc2.hoverContainer}>
        <button className={pc2.viewBtn} onClick={ViewProduct}>View Product</button>
        <div className={pc2.icons}>
          <span>🔗 Share</span>
          <span>🛒 Cart</span>
        </div>
      </div>
    </div>
  );
};
