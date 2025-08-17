import React, { useState } from "react";
import styles from "./Navbar_2.module.css";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../cart/Cart";
import { useCart } from "../../context/CartContext";

export default function Navbar_2({
  // Main navigation links
  mainNavLinks = [
    { name: "Home", href: "#home" },
    { name: "Products", href: "#products" },
    { name: "About Us", href: "#about" },
    { name: "Contact us", href: "#contact" }
  ],
  // Category navigation links
  categoryLinks = [
    { name: "New Born", href: "#newborn" },
    { name: "Infants", href: "#infants" },
    { name: "Toddler's", href: "#toddlers" },
    { name: "Party Wear", href: "#party-wear" },
    { name: "Baby Essentials", href: "#baby-essentials" }
  ],
  // Brand information
  brandName = "Lil' Tots",
  tagline = "LITTLE LOOKS BIG LOVE",
  brandColor = "#FF6B35",
  // Colors
  topRowBgColor = "#ffffff",
  bottomRowBgColor = null,
  mainNavLinkColor = "#333",
  mainNavLinkHoverColor = "#FF6B35",
  categoryLinkColor = "white",
  // Logo/Icon colors
  logoColor = "#F4A460",
  cartIconColor = "#666",
  userIconColor = "#666",
  // Cart props
  cartBackgroundColor = "#4a7c59",
  onCartClick = () => console.log("Cart clicked"),
}) {
  const { cartItems, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(true);
    onCartClick();
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleLoginClick = () => {
    navigate("/authentication");
  };

  const handleCheckout = (items, total) => {
    console.log(`Checkout with ${items.length} items, total: ${total}`);
  };

  // Function to determine color based on category content
  const getBottomNavColor = () => {
    if (bottomRowBgColor) {
      return bottomRowBgColor;
    }

    const categoryNames = categoryLinks.map(link => link.name.toLowerCase()).join(' ');

    if (categoryNames.includes('baby') || categoryNames.includes('infant') ||
        categoryNames.includes('toddler') || categoryNames.includes('newborn') ||
        categoryNames.includes('kids') || categoryNames.includes('children')) {
      return "rgba(188, 80, 144, 1)";
    }

    if (categoryNames.includes('electronic') || categoryNames.includes('gadget') ||
        categoryNames.includes('phone') || categoryNames.includes('computer') ||
        categoryNames.includes('tech')) {
      return "linear-gradient(135deg, #4A90E2 0%, #5BA0F2 50%, #6CB0FF 100%)";
    }

    if (categoryNames.includes('fashion') || categoryNames.includes('clothing') ||
        categoryNames.includes('apparel') || categoryNames.includes('wear') ||
        categoryNames.includes('dress')) {
      return "linear-gradient(135deg, #E74C3C 0%, #EC7063 50%, #F1948A 100%)";
    }

    if (categoryNames.includes('home') || categoryNames.includes('garden') ||
        categoryNames.includes('furniture') || categoryNames.includes('decor')) {
      return "linear-gradient(135deg, #27AE60 0%, #58D68D 50%, #82E0AA 100%)";
    }

    if (categoryNames.includes('sport') || categoryNames.includes('fitness') ||
        categoryNames.includes('gym') || categoryNames.includes('outdoor')) {
      return "linear-gradient(135deg, #E67E22 0%, #F39C12 50%, #F8C471 100%)";
    }

    return "linear-gradient(135deg, #9B59B6 0%, #BB8FCE 50%, #D7BDE2 100%)";
  };
  return (
    <nav className={styles.navbar}>
      {/* Top Navigation Row */}
      <div className={styles.topRow} style={{ backgroundColor: topRowBgColor }}>
        <div className={styles.container}>
          {/* Logo/Brand Section */}
          <div className={styles.brandSection}>
            <div className={styles.logoContainer}>
              {/* Lion Mascot SVG */}
              <div className={styles.lionLogo}>
                <svg width="50" height="50" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Lion face */}
                  <circle cx="50" cy="45" r="25" fill={logoColor}/>
                  {/* Mane */}
                  <circle cx="35" cy="35" r="8" fill="#CD853F"/>
                  <circle cx="65" cy="35" r="8" fill="#CD853F"/>
                  <circle cx="30" cy="50" r="6" fill="#CD853F"/>
                  <circle cx="70" cy="50" r="6" fill="#CD853F"/>
                  <circle cx="40" cy="25" r="6" fill="#CD853F"/>
                  <circle cx="60" cy="25" r="6" fill="#CD853F"/>
                  {/* Eyes */}
                  <circle cx="43" cy="40" r="3" fill="#000"/>
                  <circle cx="57" cy="40" r="3" fill="#000"/>
                  {/* Nose */}
                  <ellipse cx="50" cy="48" rx="2" ry="1.5" fill="#000"/>
                  {/* Mouth */}
                  <path d="M50 52 Q45 55 40 52" stroke="#000" strokeWidth="2" fill="none"/>
                  <path d="M50 52 Q55 55 60 52" stroke="#000" strokeWidth="2" fill="none"/>
                  {/* Body */}
                  <ellipse cx="50" cy="75" rx="15" ry="20" fill={logoColor}/>
                </svg>
              </div>
            </div>
            <div className={styles.brandText}>
              <h1 className={styles.brandName} style={{ color: brandColor }}>{brandName}</h1>
              <p className={styles.tagline}>{tagline}</p>
            </div>
          </div>

          {/* Main Navigation Links */}
          <div className={styles.mainNavLinks}>
            {mainNavLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={styles.mainNavLink}
                style={{
                  color: mainNavLinkColor,
                  '--hover-color': mainNavLinkHoverColor
                }}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Section - Cart and Login */}
          <div className={styles.rightSection}>
            <div className={styles.cartIcon} style={{ color: cartIconColor }} onClick={handleCartClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.loginSection} onClick={handleLoginClick}>
              <div className={styles.userIcon} style={{ color: userIconColor }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className={styles.loginText}>Login</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Row - Category Links */}
      <div
        className={styles.bottomRow}
        style={{ background: getBottomNavColor() }}
      >
        <div className={styles.container}>
          <div className={styles.categoryLinks}>
            {categoryLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={styles.categoryLink}
                style={{ color: categoryLinkColor }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Slider */}
      <Cart
        isOpen={isCartOpen}
        onClose={handleCloseCart}
        cartItems={cartItems}
        backgroundColor={cartBackgroundColor}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />
    </nav>
  );
}
