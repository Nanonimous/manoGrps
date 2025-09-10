import React from "react";
import styles from "./FavouriteCard.module.css";

const FavouriteCard = ({ product, onRemove }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        {product.productImageId && product.productImageId.length > 0 ? (
          <img
            src={`https://lh3.googleusercontent.com/d/${product.productImageId}=w1000-h1000-rw`}
            alt={product.productName}
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder}>No Image</div>
        )}
      </div>
      <div className={styles.info}>
        <h3 className={styles.name}>{product.productName}</h3>
        <p className={styles.code}>Code: {product.productCode}</p>
        <p className={styles.price}>₹ {product.productPrice}</p>
      </div>
      <button
        className={styles.removeBtn}
        onClick={() => onRemove(product.favouriteId)}
      >
        Remove
      </button>
    </div>
  );
};

export default FavouriteCard;
