import React, { useState } from "react";
import styles from "./Navbar_1.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../context/UserContext";

export default function Navbar_1({
  brandName = "Mano Groups",
  navigationLinks = [
    { href: "/", text: "Home" },
    { href: "/manostore", text: "Mano Store's" },
    { href: "/wowla", text: "Wowla" },
    { href: "/liltots", text: "Lil tot's" },
    { href: "#contact", text: "Contact us" },
  ],
  backgroundColor = "#ffffff",
}) {
  const { user } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const isLoggedIn = !!user;
  console.log("islogged in ",isLoggedIn);

  const handleLoginClick = () => {
    if (isLoggedIn) setIsDropdownOpen(!isDropdownOpen);
    else navigate("/authentication", { state: { from: location } });
  };

  const handleLogout = () => {
    document.cookie = "authToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
    setIsDropdownOpen(false);
    window.location.href = "/"; // reload to reset context
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    navigate("/profile");
  };

  const renderLoginSection = () => {
    if (isLoggedIn) {
      return user?.profileImageUrl ? (
        <img src={user.profileImageUrl} alt="Profile" className={styles.profileImage} />
      ) : (
        <span className={styles.loginText}>Account</span>
      );
    }
    return <span className={styles.loginText}>Login</span>;
  };

  return (
    <nav className={styles.navbar} style={{ backgroundColor }}>
      {/* Desktop Layout */}
      <div className={styles.desktopContainer}>
        <div className={styles.brand}><h1>{brandName}</h1></div>

        <div className={styles.navLinks}>
          {navigationLinks.map((link, index) =>
            link.href.startsWith("#") ? (
              <a key={index} href={link.href} className={styles.navLink}>{link.text}</a>
            ) : (
              <Link key={index} to={link.href} className={styles.navLink}>{link.text}</Link>
            )
          )}
        </div>

        <div className={styles.rightSection}>
          <div className={styles.accountWrapper}>
            <div className={styles.loginSection} onClick={handleLoginClick}>
              {renderLoginSection()}
            </div>

            {isLoggedIn && isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <div className={styles.dropdownItem} onClick={handleProfileClick}>Profile</div>
                <div className={styles.dropdownItem} onClick={handleLogout}>Logout</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={styles.mobileContainer}>
        <div className={styles.mobileTopRow}>
          <div className={styles.brand}><h1>{brandName}</h1></div>
          <div className={styles.rightSection}>
            <div className={styles.accountWrapper}>
              <div className={styles.loginSection} onClick={handleLoginClick}>
                {renderLoginSection()}
              </div>
              {isLoggedIn && isDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <div className={styles.dropdownItem} onClick={handleProfileClick}>Profile</div>
                  <div className={styles.dropdownItem} onClick={handleLogout}>Logout</div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.mobileBottomRow}>
          <div className={styles.mobileNavLinks}>
            {navigationLinks.map((link, index) =>
              link.href.startsWith("#") ? (
                <a key={index} href={link.href} className={styles.mobileNavLink}>{link.text}</a>
              ) : (
                <Link key={index} to={link.href} className={styles.mobileNavLink}>{link.text}</Link>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
