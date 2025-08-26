import { useEffect, useRef ,useState} from "react";
import styles from "./Cart.module.css";
import axios from "axios";

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
  onRemoveItem
}) {

  console.log("cart items in cart component", cartItemsSent);
  const cartRef = useRef(null);
  const firstFocusableRef = useRef(null);
  const [cartItems, setCartItems] = useState(
  Array.isArray(cartItemsSent) ? cartItemsSent : []
);



useEffect(() => {
  setCartItems(Array.isArray(cartItemsSent) ? cartItemsSent : []);
}, [cartItemsSent]);

  // 🔥 Normalize + validate cart items
  const normalizeCartItem = (item) => {
    if (!item || !item.cartId || !item.productName || !item.productPrice || !item.quantity) {
      return null;
    }
    return {
      id: item.cartId, // use cartId as unique id
      name: item.productName,
      price: item.productPrice,
      quantity: item.quantity,
      imageId: item.productImageId?.[0] || null,
    };
  };

  const validCartItems = (cartItems || [])
    .map(normalizeCartItem)
    .filter(Boolean);

  // Enhanced functionality
  useEffect(() => {
    if (isOpen && firstFocusableRef.current) {
      firstFocusableRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key to close cart
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Persistence functionality
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
    return validCartItems.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const calculateItemCount = () => {
    return validCartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 1 || newQuantity > maxQuantity) return;
    onUpdateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    if (showConfirmRemove) {
      const item = cartItems.find(item => item.cartId === id);
      if (item && window.confirm(`Remove "${item.productName}" from cart?`)) {
        onRemoveItem(id);
      }
    } else {
      onRemoveItem(id);
    }
  };

  const handleCheckout = () => {
    if (validCartItems.length === 0) return;
    onCheckout(validCartItems, calculateTotal());
  };

  const handleKeyDown = (event, action) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      action();
    }
  };

  // Handle click outside to close cart
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
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Format price for display
  const formatPrice = (price) => {
    if (typeof price === 'string') {
      return price;
    }
    return `${currency}${price.toFixed(2)}`;
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={onClose}
          role="button"
          tabIndex={-1}
          aria-label="Close cart"
        />
      )}

      {/* Cart Slider */}
      <div
        ref={cartRef}
        className={`${styles.cartSlider} ${isOpen ? styles.open : ''}`}
        style={{ backgroundColor }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        aria-describedby="cart-description"
      >
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <h2
              id="cart-title"
              className={styles.title}
              style={{ color: titleColor }}
            >
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
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Cart Items */}
        <div className={styles.cartItems} role="list">
          {validCartItems.length === 0 ? (
            showEmptyCartMessage && (
              <div className={styles.emptyCart} role="status">
                <div className={styles.emptyCartIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.7 15.3C4.3 15.7 4.6 16.5 5.1 16.5H17M17 13V17C17 18.1 16.1 19 15 19H9C7.9 19 7 18.1 7 17V13M17 13H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
                className={`${styles.cartItem} ${showItemAnimation ? styles.itemAnimation : ''}`}
                role="listitem"
                style={{ animationDelay: showItemAnimation ? `${index * 0.1}s` : '0s' }}
              >
                <div className={styles.itemImage}>
            <img 
                    src={`https://lh3.googleusercontent.com/d/${item.imageId}=w1000-h1000-rw`} 
                    alt={item.name}
                    // className={styles.mainImage}
                  />
                </div>
                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName} style={{ color: textColor }}>
                    {item.name}
                  </h3>
                  <p className={styles.itemPrice} style={{ color: textColor }}>
                    {formatPrice(item.price)}
                  </p>
                  <div className={styles.quantityControls} role="group" aria-label={`Quantity controls for ${item.name}`}>
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      onKeyDown={(e) => handleKeyDown(e, () => handleUpdateQuantity(item.id, item.quantity - 1))}
                      disabled={isLoading || item.quantity <= 1}
                      aria-label={`Decrease quantity of ${item.name}`}
                      title="Decrease quantity"
                    >
                      -
                    </button>
                    <span
                      className={styles.quantity}
                      style={{ color: textColor }}
                      aria-label={`Quantity: ${item.quantity}`}
                    >
                      {item.quantity}
                    </span>
                    <button
                      className={styles.quantityButton}
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      onKeyDown={(e) => handleKeyDown(e, () => handleUpdateQuantity(item.id, item.quantity + 1))}
                      disabled={isLoading || item.quantity >= maxQuantity}
                      aria-label={`Increase quantity of ${item.name}`}
                      title="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveItem(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, () => handleRemoveItem(item.id))}
                  disabled={isLoading}
                  aria-label={`Remove ${item.name} from cart`}
                  title="Remove item"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {validCartItems.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.totalSection}>
              <div className={styles.estimatedTotal}>
                <span className={styles.totalLabel}>Estimated total</span>
                <span className={styles.totalPrice}>{currency}{calculateTotal()}</span>
              </div>
              <p className={styles.disclaimer}>Taxes and shipping are calculated at checkout</p>
            </div>

            <div className={styles.actionButtons}>
              <button
                className={styles.checkoutButton}
                onClick={handleCheckout}
                disabled={isLoading || validCartItems.length === 0}
              >
                {isLoading && <span className={styles.loadingSpinner}></span>}
                {isLoading ? loadingText : checkoutButtonText}
              </button>
              <button
                className={styles.goBackButton}
                onClick={onClose}
                disabled={isLoading}
              >
                {goBackButtonText}
              </button>
              <p className={styles.securePayment}>Secure payment transaction</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
