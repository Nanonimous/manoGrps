import React, { useState, useMemo } from "react";
import styles from "./ShowProduct.module.css";
import { ProductCard_2 } from "../ProductCard_2/ProductCard_2.jsx";

export default function ShowProduct({
  title = "Our Products",
  products = [
    {
      id: 1,
      name: "Product Name",
      price: "Price",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      backgroundColor: "#FF6B9D"
    },
    {
      id: 2,
      name: "Product Name",
      price: "Price",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      backgroundColor: "#4ECDC4"
    },
    {
      id: 3,
      name: "Product Name",
      price: "Price",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      backgroundColor: "#45B7D1"
    },
    {
      id: 4,
      name: "Product Name",
      price: "Price",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      backgroundColor: "#96CEB4"
    }
  ],
  backgroundColor = "#F5FFFA",
  titleColor = "rgba(53, 94, 59, 1)",
  cardTextColor = "#ffffff",
  showTitle = true,
  onProductClick = null,
  loadMoreText = "Load More",
  showLoadMore = true,
  onLoadMore = null,
  showSearch = true,
  searchPlaceholder = "Search product here",
  showFilter = true,
  onFilterClick = null,
  itemsPerPage = 10,
  currentPage = 1
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleProductClick = (product) => {
    if (onProductClick) {
      onProductClick(product);
    }
  };

  const handleLoadMore = () => {
    if (onLoadMore) {
      onLoadMore();
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }

    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [products, searchTerm]);

  const handleFilterClick = () => {
    if (onFilterClick) {
      onFilterClick();
    }
  };

  // Calculate pagination info
  const totalResults = filteredProducts.length;
  const startItem = Math.min((currentPage - 1) * itemsPerPage + 1, totalResults);
  const endItem = Math.min(currentPage * itemsPerPage, totalResults);
  const resultsText = totalResults > 0
    ? `Showing ${startItem}-${endItem} of ${totalResults} results`
    : "No results found";

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
                  onClick={handleFilterClick}
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
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              style={{ cursor: 'pointer' }}
            >
              <ProductCard_2
                image={product.image}
                title={product.name}
                cat={product.category || "Product Category"}
                price={product.price}
                backgroundColor={product.backgroundColor}
              />
            </div>
          ))}
        </div>

        {showLoadMore && (
          <div className={styles.loadMoreContainer}>
            <button
              className={styles.loadMoreButton}
              onClick={handleLoadMore}
              style={{ 
                color: titleColor,
                borderColor: titleColor 
              }}
            >
              {loadMoreText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
