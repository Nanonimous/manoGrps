import React, { useEffect, useState } from "react";
import styles from "./Navbar_1.module.css";
import { Link, useNavigate } from "react-router-dom";
import Cart from "../cart/Cart";
import { useCart } from "../../context/CartContext";

export default function Navbar_1({
  brandName = "Mano Groups",
  navigationLinks = [
    { href: "/", text: "Home" },
    { href: "/manostore", text: "Mano Store's" },
    { href: "/wowla", text: "Wowla" },
    { href: "/liltots", text: "Lil tot's" },
    { href: "#contact", text: "Contact us" }
  ],
  backgroundColor = "#ffffff",
  cartBackgroundColor = "#4a7c59",
  onCartClick = () => console.log("Cart clicked"),
}) {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeItem } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(true);
    onCartClick();
  };

  const handleCloseCart = () => {
    setIsCartOpen(false);
  };

  const handleLoginClick = () => {
    if (isLoggedIn) {
      document.cookie = "authToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
      setIsLoggedIn(false);
      console.log("User logged out - cookie cleared");
      navigate("/");
    } else {
      navigate("/authentication");
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('authToken='));
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleCheckout = (items, total) => {
    console.log(`Checkout with ${items.length} items, total: ${total}`);
  };
  return (
    <nav className={styles.navbar} style={{ backgroundColor }}>
      {/* Desktop Layout */}
      <div className={styles.desktopContainer}>
        {/* Logo/Brand */}
        <div className={styles.brand}>
          <h1>{brandName}</h1>
        </div>

        {/* Navigation Links */}
        <div className={styles.navLinks}>
          {navigationLinks.map((link, index) => (
            link.href.startsWith('#') ? (
              <a key={index} href={link.href} className={styles.navLink}>
                {link.text}
              </a>
            ) : (
              <Link key={index} to={link.href} className={styles.navLink}>
                {link.text}
              </Link>
            )
          ))}
        </div>

        {/* Right Side Icons */}
        <div className={styles.rightSection}>
          <div className={styles.cartIcon} onClick={handleCartClick}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className={styles.loginSection} onClick={handleLoginClick}>
            <div className={styles.userIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className={styles.loginText}>{isLoggedIn ? "Logout" : "Login"}</span>
          </div>

        </div>
      </div>

      {/* Mobile Layout */}
      <div className={styles.mobileContainer}>
        {/* Top Row: Brand and Right Section */}
        <div className={styles.mobileTopRow}>
          <div className={styles.brand}>
            <h1>{brandName}</h1>
          </div>
          <div className={styles.rightSection}>
            <div className={styles.cartIcon} onClick={handleCartClick}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.loginSection} onClick={handleLoginClick}>
              <span className={styles.loginText}>{isLoggedIn ? "Logout" : "Login"}</span>
            </div>
          </div>
        </div>

        {/* Bottom Row: Navigation Links */}
        <div className={styles.mobileBottomRow}>
          <div className={styles.mobileNavLinks}>
            {navigationLinks.map((link, index) => (
              link.href.startsWith('#') ? (
                <a key={index} href={link.href} className={styles.mobileNavLink}>
                  {link.text}
                </a>
              ) : (
                <Link key={index} to={link.href} className={styles.mobileNavLink}>
                  {link.text}
                </Link>
              )
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
