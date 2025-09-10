import React, { useState, useMemo, useEffect } from "react";
import styles from "./ShowProduct.module.css";
import { ProductCard_2 } from "../ProductCard_2/ProductCard_2.jsx";
import axios from 'axios';

export default function ShowProduct({
  title = "Our Products",
  shopName,
  categoryName,
  products: externalProducts = null, // ✅ NEW
  backgroundColor = "#F5FFFA",
  titleColor = "rgba(53, 94, 59, 1)",
  cardTextColor = "#ffffff",
  showTitle = true,
  onProductClick = null,
  searchPlaceholder = "Search product here",
  currentPage = 1,
  itemsPerPage = 20,
  showFilter = true,
  showSearch  = true,
  deleteFav
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [products , setProduct] = useState([]);
  
  // ✅ If externalProducts is passed, use it directly
  useEffect(() => {
    if (externalProducts) {
      setProduct(externalProducts);
      return;
    }

    // fallback fetch if no external products
    const url = categoryName === "All" 
      ? `https://product-7boc.onrender.com/api/product/approved?storeName=${shopName}&page=${pageNumber}` 
      : `https://product-7boc.onrender.com/api/product/category?category=${categoryName}&storeName=${shopName}&page=${pageNumber}`;

    const fetchProducts = async () => {
      try {
        const prod = await axios.get(url);
         const data = prod.data;
         console.log(data,shopName)

    // Ensure products is always an array
      const productsArray = Array.isArray(data) ? data : [data];

      setProduct(productsArray);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [categoryName, shopName, pageNumber, externalProducts]);


// ✅ Remove getCount() useEffect completely

  const handleProductClick = (product) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter products
const filteredProducts = useMemo(() => {
  if (!searchTerm.trim()) return products;
  return products.filter(product =>
    product.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );
}, [products, searchTerm]);

// Pagination after filtering
const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
const startIndex = (pageNumber - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

const resultsText = filteredProducts.length > 0
  ? `Showing ${startIndex + 1}-${Math.min(endIndex, filteredProducts.length)} of ${filteredProducts.length} results`
  : "No results found";



const handlePageChange = (page) => {
  if (page >= 1 && page <= totalPages) {
    setPageNumber(page);
  }
};


  const renderPageNumbers = () => {
  const pageNumbers = [];
  const maxVisiblePages = 5;
  let startPage = Math.max(1, pageNumber - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(
      <button
        key={i}
        className={`${styles.pageButton} ${i === pageNumber ? styles.activePage : ''}`}
        onClick={() => handlePageChange(i)}
        style={{
          color: i === pageNumber ? '#fff' : titleColor,
          backgroundColor: i === pageNumber ? titleColor : 'transparent',
          borderColor: titleColor
        }}
      >
        {i}
      </button>
    );
  }
  return pageNumbers;
};


  return (
    <section 
      className={styles.showProduct}
      style={{ backgroundColor }}
    >
      <div className={styles.container}>
        {showTitle && (
          <h2
            className={styles.title}
            style={{ color: titleColor }}
          >
            {title}
          </h2>
        )}

        {(showFilter || showSearch) && (
          <div className={styles.filterBar}>
            <div className={styles.filterSection}>
              {showFilter && (
                <button
                  className={styles.filterButton}
                  style={{ borderColor: titleColor, color: titleColor }}
                >
                  <span className={styles.filterIcon}>⚙️</span>
                  Filter
                </button>
              )}
              <span className={styles.resultsText}>{resultsText}</span>
            </div>

            {showSearch && (
              <div className={styles.searchInputWrapper}> 
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className={styles.searchInput}
                  style={{ borderColor: titleColor }}
                />
                <div className={styles.searchIcon}>🔍</div>
              </div>
            )}
          </div>
        )}

        <div className={styles.productGrid}>
          {paginatedProducts.map((product) => (
            <div
              key={product.productId}
              onClick={() => handleProductClick(product)}
              style={{ cursor: 'pointer' }}
            >
              <ProductCard_2
               image = {product.productImageId}
                title={product.productName}
                cat={categoryName == "favourite" ? "favourite" : product.category}
                price={product.productSellingPrice }
                backgroundColor={titleColor}
                productId={product.productId}
                productCode={product.productCode}
                shopName={shopName}
                isfav={categoryName}
                deleteFav={deleteFav}
                productQuantity={product.productQuantity}
              />
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className={styles.paginationContainer}>
            <button
                className={styles.navButton}
                onClick={() => handlePageChange(pageNumber - 1)}
                disabled={pageNumber === 1}
                style={{ color: titleColor, borderColor: titleColor }}
              >
                Previous
              </button>

              <div className={styles.pageNumbers}>
                {renderPageNumbers()}
              </div>

              <button
                className={styles.navButton}
                onClick={() => handlePageChange(pageNumber + 1)}
                disabled={pageNumber === totalPages}
                style={{ color: titleColor, borderColor: titleColor }}
              >
                Next
              </button>

          </div>
        )}
      </div>
    </section>
  );
}
