import { useEffect, useRef, useState } from "react";
import styles from "./Cart.module.css";
import { useLocation, useNavigate } from "react-router-dom";

export default function Cart({
  isOpen = false,
  onClose = () => {},
  backgroundColor = "#4a7c59",
  onCheckout = () => {},
  shopName,
  currency = "$",
  showEmptyCartMessage = true,
  emptyCartMessage = "Your cart is empty",
  checkoutButtonText = "Checkout",
  goBackButtonText = "Go Back",
  isLoading = false,
  loadingText = "Processing...",
  maxQuantity = 99,
  showItemAnimation = true,
  enablePersistence = true,
  persistenceKey = "cart_items",
  showConfirmRemove = true,
  titleColor = "#ffffff",
  textColor = "#ffffff",
  cartItemsSent,
  onUpdateQuantity,
  onRemoveItem,
  isLoggedIn
}) {
  const cartRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const [cartItems, setCartItems] = useState(
    Array.isArray(cartItemsSent) ? cartItemsSent : []
  );

  const [loadingQuantityId, setLoadingQuantityId] = useState(null);
  const [loadingRemoveId, setLoadingRemoveId] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setCartItems(Array.isArray(cartItemsSent) ? cartItemsSent : []);
  }, [cartItemsSent]);

  const normalizeCartItem = (item) => {
    if (!item || !item.cartId || !item.productName || !item.productPrice || !item.quantity) {
      return null;
    }
    return {
      id: item.cartId,
      name: item.productName,
      price: item.productPrice,
      quantity: item.quantity,
      imageId: item.productImageId?.[0] || null,
      productCode: item.productCode,
      refName: item.staffName
    };
  };
  console.log(cartItems);

  const validCartItems = (cartItems || [])
    .map(normalizeCartItem)
    .filter(Boolean);

  useEffect(() => {
    if (isOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeKey);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (enablePersistence) {
      if (validCartItems.length > 0) {
        localStorage.setItem(persistenceKey, JSON.stringify(validCartItems));
      } else {
        localStorage.removeItem(persistenceKey);
      }
    }
  }, [validCartItems, enablePersistence, persistenceKey]);

  const calculateTotal = () => {
    return validCartItems
      .reduce((total, item) => {
        const price = parseFloat(item.price) || 0;
        return total + price * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const calculateItemCount = () => {
    return validCartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleUpdateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1 || newQuantity > maxQuantity) return;
    setLoadingQuantityId(id);
    try {
      await onUpdateQuantity(id, newQuantity);
    } finally {
      setLoadingQuantityId(null);
    }
  };

  const handleRemoveItem = async (id) => {
    if (showConfirmRemove) {
      const item = cartItems.find((item) => item.productCode === id);
      if (item && window.confirm(`Remove "${item.productName}" from cart?`)) {
        setLoadingRemoveId(id);
        try {
          await onRemoveItem(id);
        } finally {
          setLoadingRemoveId(null);
        }
      }
    } else {
      setLoadingRemoveId(id);
      try {
        await onRemoveItem(id);
      } finally {
        setLoadingRemoveId(null);
      }
    }
  };

  const mapToPaymentFormat = (item) => ({
    id: item.id,
    name: item.name,
    code: item.productCode,
    price: item.price,
    quantity: item.quantity,
    staffName: item.refName,
    img: item.imageId
      ? `https://lh3.googleusercontent.com/d/${item.imageId}=w1000-h1000-rw`
      : null
  });

  const handleBuyNow = (validCartItems, totalAmount) => {
    if (isLoggedIn) {
      const formattedItems = validCartItems.map(mapToPaymentFormat);
      navigate("/payment", {
        state: {
          product: formattedItems,
          totalAmount,
          shopName: shopName
        }
      });
    } else {
      const confirmDelete = window.confirm("Login to continue?");
      if (confirmDelete) {
        navigate("/authentication", {
          state: { from: location.pathname + location.search }
        });
      }
    }
  };

  const handleCheckout = () => {
    if (validCartItems.length === 0) return;
    const total = calculateTotal();
    handleBuyNow(validCartItems, total);
  };

  const handleKeyDown = (event, action) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      action();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target) && isOpen) {
        const overlay = event.target.closest(`.${styles.overlay}`);
        if (overlay) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const formatPrice = (price) => {
    if (typeof price === "string") {
      return price;
    }
    return `${currency}${price.toFixed(2)}`;
  };

  return (
    <>
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={onClose}
          role="button"
          tabIndex={-1}
          aria-label="Close cart"
        />
      )}

      <div
        ref={cartRef}
        className={`${styles.cartSlider} ${isOpen ? styles.open : ""}`}
        style={{ backgroundColor }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        aria-describedby="cart-description"
      >
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2 id="cart-title" className={styles.title} style={{ color: titleColor }}>
              Cart
            </h2>
            <span
              id="cart-description"
              className={styles.itemCount}
              style={{ color: textColor }}
            >
              ({calculateItemCount()} items)
            </span>
          </div>
          <button
            ref={firstFocusableRef}
            className={styles.closeButton}
            onClick={onClose}
            onKeyDown={(e) => handleKeyDown(e, onClose)}
            aria-label="Close cart"
            style={{ color: textColor }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {isLoggedIn ? (
          <div className={styles.cartItems} role="list">
            {validCartItems.length === 0 ? (
              showEmptyCartMessage && (
                <div className={styles.emptyCart} role="status">
                  <div className={styles.emptyCartIcon}>
                    <svg width="48" height="48" viewBox="0 0 24 24">
                      <path
                        d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H7"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <p style={{ color: textColor }}>{emptyCartMessage}</p>
                  <p className={styles.emptyCartSubtext} style={{ color: textColor }}>
                    Add some items to get started!
                  </p>
                </div>
              )
            ) : (
              validCartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`${styles.cartItem} ${
                    showItemAnimation ? styles.itemAnimation : ""
                  }`}
                  role="listitem"
                  style={{
                    animationDelay: showItemAnimation ? `${index * 0.1}s` : "0s"
                  }}
                >
                  <div className={styles.itemImage}>
                    <img
                      src={`https://lh3.googleusercontent.com/d/${item.imageId}=w1000-h1000-rw`}
                      alt={item.name}
                    />
                  </div>
                  <div className={styles.itemDetails}>
                    <h3 className={styles.itemName} style={{ color: textColor }}>
                      {item.name}
                    </h3>
                    <div className={styles.itemPricing}>
                      <p className={styles.unitPrice} style={{ color: textColor }}>
                        Unit: {formatPrice(item.price)}
                      </p>
                      <p className={styles.subtotal} style={{ color: textColor }}>
                        Subtotal: {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>

                    <div className={styles.quantityControls}>
                      <button
                        className={styles.quantityButton}
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                        disabled={
                          isLoading || item.quantity <= 1 || loadingQuantityId === item.id
                        }
                      >
                        {loadingQuantityId === item.id ? (
                          <span className={styles.loadingSpinner}></span>
                        ) : (
                          "-"
                        )}
                      </button>
                      <span className={styles.quantity} style={{ color: textColor }}>
                        {item.quantity}
                      </span>
                      <button
                        className={styles.quantityButton}
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                        disabled={
                          isLoading ||
                          item.quantity >= maxQuantity ||
                          loadingQuantityId === item.id
                        }
                      >
                        {loadingQuantityId === item.id ? (
                          <span className={styles.loadingSpinner}></span>
                        ) : (
                          "+"
                        )}
                      </button>
                    </div>
                  </div>

                  <div className={styles.itemActions}>
                    <button
                      className={`${styles.checkoutButtonSmall} ${
                        isLoading ? styles.loading : ""
                      }`}
                      onClick={() =>
                        handleBuyNow([item], item.price * item.quantity)
                      }
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className={styles.loadingSpinner}></span>
                      ) : (
                        "Checkout"
                      )}
                    </button>
                    <button
                      className={styles.removeButton}
                      onClick={() => handleRemoveItem(item.productCode)}
                      disabled={isLoading || loadingRemoveId === item.productCode}
                    >
                      {loadingRemoveId === item.productCode ? (
                        <span className={styles.loadingSpinner}></span>
                      ) : (
                        "✕"
                      )}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className={styles.notLoggedIn}>
            <p>Seems like you're not logged in</p>
            <button
              onClick={() =>
                navigate("/authentication", { state: { from: location } })
              }
            >
              Log in
            </button>
          </div>
        )}

        {validCartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.actionButtons}>
              <button
                className={`${styles.goBackButton} ${
                  isLoading ? styles.loading : ""
                }`}
                onClick={onClose}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className={styles.loadingSpinner}></span>
                ) : (
                  goBackButtonText
                )}
              </button>

              

              <p className={styles.securePayment}>Secure payment transaction</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
