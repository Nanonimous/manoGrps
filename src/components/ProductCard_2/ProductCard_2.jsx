import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pc2 from "./ProductCard_2.module.css";
import axios from "axios";
import { useUser } from "../../context/UserContext";

export const ProductCard_2 = ({
  image,
  title,
  shopName,
  cat,
  price,
  backgroundColor = "#355E3B",
  productId,
  isfav,
  deleteFav,
  productCode,
  productQuantity
}) => {
  const { user, token } = useUser();
  const navigate = useNavigate();
  const isLoggedIn = !!user;

  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const ViewProduct = () => { 
    navigate(`/${shopName}/products/${cat}?id=${productId}`);
  };

  const generateAffiliateLink = async () => {
    if (!token) {
      return `${window.location.origin}/${shopName}/products/${cat}?id=${productId}`;
    }

    if (isLoggedIn && user.userRole === "STAFF") {
      try {
        const res = await axios.post(
          `https://userenquire-b5sg.onrender.com/api/passkey/encrypt?userEmail=${user.userEmail}`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        return `${window.location.origin}/${shopName}/products/${cat}?id=${productId}&ref=${encodeURIComponent(res.data)}`;
      } catch (err) {
        console.error("Failed to generate affiliate link:", err);
      }
    }

    return `${window.location.origin}/${shopName}/products/${cat}?id=${productId}`;
  };

  const handleShare = async () => {
    setLoading(true);
    setCopied(false);
    try {
      const affiliateLink = await generateAffiliateLink();
      await navigator.clipboard.writeText(affiliateLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // reset after 2 sec
    } catch (err) {
      console.error("Failed to copy:", err);
    } finally {
      setLoading(false);
    }
  };

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
      className={pc2.productCardContainer}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className={pc2.imageWrapper}>
        <img
          src={`https://lh3.googleusercontent.com/d/${image}=w1000-h1000-rw`}
          className={pc2.imgContainer}
          alt={title || "Product"}
        />

        {/* 🏷️ Stock Badge */}
        <span
          className={pc2.stockBadge}
          style={{ backgroundColor: badgeColor }}
        >
          {badgeText}
        </span>
      </div>

      <div className={pc2.productDetail}>
        <p className={pc2.title}>{title || "Product Name"}</p>
        <p className={pc2.descp}>{cat || "Short description"}</p>
        <p className={pc2.price}>Rs.{price || "Price"}</p>
      </div>

      <div className={pc2.hoverContainer}>
        {isfav === "favourite" && (
          <button className={pc2.removeBtn} onClick={() => deleteFav(productCode)}>
            Remove from Favorites
          </button>
        )}
        <button className={pc2.viewBtn} onClick={ViewProduct}>
          View Product
        </button>
        <div className={pc2.icons}>
          <span onClick={handleShare} style={{ cursor: "pointer" }}>
            {loading ? "⏳ Copying..." : copied ? "✅ Copied!" : "🔗 Share"}
          </span>
        </div>
      </div>
    </div>
  );
};
