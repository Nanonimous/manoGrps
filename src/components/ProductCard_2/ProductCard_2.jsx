import React from "react";
import pc2 from "./ProductCard_2.module.css";

export const ProductCard_2 = ({ image, title, cat, price, backgroundColor = "#355E3B" }) => {
  return (
    <>
    <div
      className={pc2.productCardContainer}
      style={{ backgroundColor: backgroundColor }}
    >
      <img src={image} className={pc2.imgContainer} alt={title} />
      <div className={pc2.productDetail}>
          <p className={pc2.title}>{title || "Product Name"}</p>
          <p className={pc2.descp}>{cat || "Short description"}</p>
          <p className={pc2.price}>{price || "Price"}</p>
      </div>
      <div className={pc2.hoverContainer}>
        <button className={pc2.viewBtn}>View Product</button>
        <div className={pc2.icons}>
            <span>🔗 Share</span>
            <span>🛒 Cart</span>
        </div>
    </div>
    </div>

    
    </>
  );
};
