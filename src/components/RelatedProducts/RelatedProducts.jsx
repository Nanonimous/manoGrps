import React, { useEffect, useState } from "react";
import style from "./RelatedProducts.module.css";
import { ProductCard_1 } from "../ProductCard_1/ProductCard_1";
import axios from "axios";

export const RelatedProducts = ({ MainproductId,storeName, category, titleColor = "#BC5090" ,
  buttonColorText,
  cardBackGround}) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  
useEffect(() => {
  const fetchRelatedProducts = async () => {
    try {
      const response = await axios.get(
        `https://product-7boc.onrender.com/api/product/category?category=${category}&storeName=${shopName}&page=${pageNumber}`
      );

      let data = response.data;

      // Normalize response
      if (!Array.isArray(data)) {
        data = [data];
      }

      // ✅ Ensure both IDs are compared as strings (or numbers consistently)
      const filtered = data.filter(
        (product) => String(product.productId) !== String(MainproductId)
      );

      // ✅ Replace the state (not append)
      setRelatedProducts(filtered);

      console.log("Related Products:", filtered);
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  fetchRelatedProducts();
}, [category, storeName, pageNumber, MainproductId]);




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
              style={{ cursor: "pointer" }}
            >
              <ProductCard_1
                image={product.productImageId}
                title={product.productName}
                cat={category}
                price={product.productSellingPrice}
                backgroundColor={titleColor}
                productId={product.productId}
                cardBackgroundColor={cardBackGround}
                storeName = {storeName}
                buttonColor = {buttonColorText}
                productQuantity = {product.productQuantity}
              />
            </div>    
        ))}
      </div>
    </div>
  );
};
