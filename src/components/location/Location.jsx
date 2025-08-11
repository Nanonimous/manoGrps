import React from 'react';
import styles from './Location.module.css';

const Location = ({
  title = "Near Pondicherry? Visit Us In Person!",
  storeName = "Manostore's",
  storeLocation = "Pondicherry, India",
  address = "Shop No. 34, Mission St, Heritage Town, Puducherry, 605001",
  mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3903.0234567890123!2d79.8083!3d11.9416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDU2JzI5LjgiTiA3OcKwNDgnMjkuOSJF!5e0!3m2!1sen!2sin!4v1234567890123",
  directionButtonText = "Click to get direction",
  shopButtonText = "Shop now",
  backgroundColor = "#ffffff",
  titleColor = "rgba(53, 94, 59, 1)",
  storeNameColor = "#333333",
  storeLocationColor = "#666666",
  addressColor = "#888888",
  buttonColor = "#ffffff",
  buttonBgColor = "#e91e63",
  directionButtonColor = "#ffffff",
  directionButtonBgColor = "#2196f3",
  onGetDirection = (address) => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(googleMapsUrl, '_blank');
  },
  onShopNow = () => {
    console.log('Shop now clicked');
  }
}) => {
  const handleGetDirection = () => {
    onGetDirection(address);
  };

  const handleShopNow = () => {
    onShopNow();
  };

  return (
    <div className={styles.locationContainer} style={{ backgroundColor }}>
      <div className={styles.locationHeader} style={{ backgroundColor }}>
        <h2
          style={{
            color: titleColor,
            '--title-color': titleColor
          }}
        >
          {title}
        </h2>
      </div>

      <div className={styles.locationContent}>
          <div className={styles.mapSection}>
          <div className={styles.mapContainer}>
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: '12px' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${storeName} Location`}
            ></iframe>
            <button
              className={styles.directionBtn}
              onClick={handleGetDirection}
              style={{
                color: directionButtonColor,
                backgroundColor: directionButtonBgColor
              }}
            >
              <span className={styles.directionIcon}>📍</span>
              {directionButtonText}
            </button>
          </div>
        </div>

        <div className={styles.storeInfo}>
          <div className={styles.storeDetails}>
            <h3 style={{ color: storeNameColor }}>{storeName}</h3>
            <h3 style={{ color: storeLocationColor }}>{storeLocation}</h3>
            <p className={styles.address} style={{ color: addressColor }}>
              {address}
            </p>
            <button
              className={styles.shopNowBtn}
              onClick={handleShopNow}
              style={{
                color: buttonColor,
                backgroundColor: buttonBgColor
              }}
            >
              {shopButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
