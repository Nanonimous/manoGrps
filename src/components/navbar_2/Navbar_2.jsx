import React, { useState } from "react";
import styles from "./Navbar_2.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import Cart from "../cart/Cart";
import { useCart } from "../../context/CartContext";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import { useUser } from "../../context/UserContext";

export default function Navbar_2({
  mainNavLinks = [
    { name: "Home", href: "#home" },
    { name: "Products", href: "#products" },
    { name: "About Us", href: "#about" },
    { name: "Contact us", href: "#contact" },
  ],
  categoryLinks = [
    { name: "New Born", href: "#newborn" },
    { name: "Infants", href: "#infants" },
    { name: "Toddler's", href: "#toddlers" },
    { name: "Party Wear", href: "#party-wear" },
    { name: "Baby Essentials", href: "#baby-essentials" },
  ],
  brandName = "Lil' Tots",
  tagline = "LITTLE LOOKS BIG LOVE",
  brandColor = "#FF6B35",
  topRowBgColor = "#ffffff",
  bottomRowBgColor = null,
  mainNavLinkColor = "#333",
  mainNavLinkHoverColor = "#FF6B35",
  categoryLinkColor = "white",
  cartIconColor = "#666",
  cartBackgroundColor = "#4a7c59",
  shopName,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeItem } = useCart();
  const { user } = useUser();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLoggedIn = !!user;
  const correctshopName = {
    'Wowla-store' : 'wowla',
    'Mano-store' : 'manostore',
    'liltots':'Lit tots'
  }


  

  const handleFavoriteClick = () => navigate(`/${shopName}/products/favourite`);

  const handleLoginClick = () => {
    if (isLoggedIn) setIsDropdownOpen(!isDropdownOpen);
    else navigate("/authentication", { state: { from: location } });
  };

  const handleLogout = () => {
    document.cookie = "authToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    setIsDropdownOpen(false);
    window.location.href = "/";
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    navigate("/profile");
  };

  const handleCartClick = () => setIsCartOpen(true);
  const handleCloseCart = () => setIsCartOpen(false);

  const getBottomNavColor = () => {
    if (bottomRowBgColor) return bottomRowBgColor;
    const categoryNames = categoryLinks.map((link) => link.name.toLowerCase()).join(" ");
    if (categoryNames.includes("baby") || categoryNames.includes("infant") ||
        categoryNames.includes("toddler") || categoryNames.includes("newborn") ||
        categoryNames.includes("kids") || categoryNames.includes("children")) {
      return "rgba(188, 80, 144, 1)";
    }
    if (categoryNames.includes("electronic") || categoryNames.includes("tech")) {
      return "linear-gradient(135deg, #4A90E2 0%, #5BA0F2 50%, #6CB0FF 100%)";
    }
    if (categoryNames.includes("fashion") || categoryNames.includes("clothing")) {
      return "linear-gradient(135deg, #E74C3C 0%, #EC7063 50%, #F1948A 100%)";
    }
    if (categoryNames.includes("home") || categoryNames.includes("furniture")) {
      return "linear-gradient(135deg, #27AE60 0%, #58D68D 50%, #82E0AA 100%)";
    }
    if (categoryNames.includes("sport") || categoryNames.includes("fitness")) {
      return "linear-gradient(135deg, #E67E22 0%, #F39C12 50%, #F8C471 100%)";
    }
    return "linear-gradient(135deg, #9B59B6 0%, #BB8FCE 50%, #D7BDE2 100%)";
  };

  return (
    <nav className={styles.navbar}>
      {/* Top Row */}
      <div className={styles.topRow} style={{ backgroundColor: topRowBgColor }}>
        <div className={styles.container}>
          {/* Brand Section */}
          <div className={styles.brandSection}>
            <div className={styles.logoContainer}><div className={styles.lionLogo}></div></div>
            <div className={styles.brandText}>
              <h1 className={styles.brandName} style={{ color: brandColor }}>{brandName}</h1>
              <p className={styles.tagline}>{tagline}</p>
            </div>
          </div>

          {/* Main Nav Links */}
          <div className={styles.mainNavLinks}>
            {mainNavLinks.map((link, index) => (
              <a key={index} href={link.href} className={styles.mainNavLink}
                 style={{ color: mainNavLinkColor, "--hover-color": mainNavLinkHoverColor }}>
                {link.name}
              </a>
            ))}
          </div>

          {/* Right Section */}
          <div className={styles.rightSection}>
            <div className={styles.favoriteIcon} onClick={handleFavoriteClick}>
              <AiOutlineHeart size={24} color={cartIconColor} />
            </div>

            <div className={styles.cartIcon} onClick={handleCartClick}>
              <AiOutlineShoppingCart size={24} color={cartIconColor} />
            </div>

            <div className={styles.loginSection} onClick={handleLoginClick}>
              {isLoggedIn && user?.profileImageUrl ? (
                <img src={user.profileImageUrl} alt="Profile" className={styles.profileImage} />
              ) : (
                <span className={styles.loginText}>{isLoggedIn ? "Account" : "Login"}</span>
              )}
              {isLoggedIn && isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownItem} onClick={handleProfileClick}>Profile</div>
                  <div className={styles.dropdownItem} onClick={handleLogout}>Logout</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className={styles.bottomRow} style={{ background: getBottomNavColor() }}>
        <div className={styles.container}>
          <div className={styles.categoryLinks}>
            {categoryLinks.map((link, index) => (
              <a key={index} href={link.href} className={styles.categoryLink}
                 style={{ color: categoryLinkColor }}>
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Slider */}
      <Cart isOpen={isCartOpen} onClose={handleCloseCart}
            shopName={correctshopName[shopName]} backgroundColor={cartBackgroundColor}
            cartItemsSent={cartItems} onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem} isLoggedIn={isLoggedIn}/>
    </nav>
  );
}
