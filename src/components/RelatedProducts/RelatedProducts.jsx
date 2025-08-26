import React, { useEffect, useState } from "react";
import style from "./RelatedProducts.module.css";
import { ProductCard_1 } from "../ProductCard_1/ProductCard_1";
import axios from "axios";

export const RelatedProducts = ({ MainproductId,storeName, category, titleColor = "#BC5090" ,buttonColor = "#ffffff",
  buttonBgColor = "#BC5090",
  buttonHoverBgColor = "#BC5090",}) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await axios.get(
          `https://product-whe4.onrender.com/api/product/approved?storeName=${storeName}&page=${pageNumber}`
        );
        if (response.data.length === 0) {
          setHasMore(false); // no more products
        } else {
          // Append products instead of replacing
          const filtered = response.data.filter(
        (product) => product.productId != MainproductId
      );
      
          setRelatedProducts((prev) => [...prev, ...filtered]);
          console.log("Related Products:", filtered);
        }

      } catch (error) {
        console.error("Error fetching related products:", error);
      }
    };

    fetchRelatedProducts();
  }, [category, storeName,pageNumber]);

  const handleShowMore = () => {
    setPageNumber((prev) => prev + 1);
  };

const onViewAllClick = () => {
  if (hasMore) {
      setPageNumber((prev) => prev + 1);
    }

}

  return (
    <div className={style.maincontainer}>
      <div className={style.headerSection}>
        <h4
          className={style.sectionTitle}
          style={{
            color: titleColor,
            '--title-color': titleColor
          }}
        >
          Related Products
        </h4>
      </div>
      <div className={style.productGrid}>
        {relatedProducts.map((product) => (

            <div
              key={product.productId}
              onClick={() => handleProductClick(product)}
              style={{ cursor: 'pointer' }}
            >
          <ProductCard_1
            key={product.productId}
            image={product.productImageId}
            title={product.productName}
            cat={product.productDescription}
            price={product.productSellingPrice}
            backgroundColor={titleColor}
            productId={product.productId}
            cardBackgroundColor={"#BC5090"}
          />
          </div>
          
        ))}
      </div>
      <div className={style.viewAllSection}>
                  <button
                    className={style.viewAllButton}
                    onClick={onViewAllClick}
                    style={{
                      color: buttonColor,
                      backgroundColor: buttonBgColor,
                      '--hover-bg-color': buttonHoverBgColor
                    }}
                  >
                    Show More
                  </button>
                </div>
    </div>
  );
};
