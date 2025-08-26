import React, { useEffect, useState } from "react";
import { useLocation,useParams } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar_2 from "../components/navbar_2/Navbar_2";
import { ProductPage } from "../components/product_page/ProductPage.jsx";
import axios from "axios";
import { RelatedProducts } from "../components/RelatedProducts/RelatedProducts.jsx";

export const MainProduct = () => {
  const location = useLocation();

  // Extract shop name and category from path
  const { shopname, Cat } = useParams(); // ✅ get route params


  // Extract query params
  const query = new URLSearchParams(location.search);
  const productId = query.get("id");

  const [productDetails, setProductDetails] = useState(null);

useEffect(() => {
  console.log("🚀 MainProduct mounted!");
}, []);

  useEffect(() => {
    console.log("useEffect triggered with productId:", productId);

    if (!productId) {
      console.warn("No productId found in query params");
      return;
    }

    const url = `https://product-whe4.onrender.com/api/product/productId?productId=${productId}`;
    console.log("Fetching:", url);

    const getProd = async () => {
      try {
        const res = await axios.get(url);
        console.log("API Response:", res.data);
        setProductDetails(res.data);
      } catch (err) {
        console.error("Error fetching product:", err.response?.data || err.message);
      }
    };

    getProd();
  }, [productId]);


  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#F5FFFA",
      }}
    >
      <Navbar_2
        brandName="Lil' Tots"
        tagline="LITTLE LOOKS BIG LOVE"
        brandColor="#FF6B35"
        mainNavLinks={[
          { name: "Home", href: "/liltots" },
          { name: "Products", href: "/liltots/products/All" },
          { name: "About Us", href: "/liltots/about" },
          { name: "Contact us", href: "/liltots/contact" },
        ]}
        categoryLinks={[
          { name: "New Born", href: "/liltots/products/New Born" },
          { name: "Infants", href: "/liltots/products/Infants" },
          { name: "Toddler's", href: "/liltots/products/Toddler" },
          { name: "Party Wear", href: "/liltots/products/Party Wear" },
          { name: "Baby Essentials", href: "/liltots/products/Baby Essentials" },
        ]}
        bottomRowBgColor="rgba(188, 80, 144, 1)"
        mainNavLinkHoverColor="#FF6B35"
        shopName={shopname}
      />
      <div
        style={{
          paddingTop: "120px", // Account for fixed navbar height (Navbar_2 is taller)
          width: "100%",
          backgroundColor: "#F5FFFA",
        }}
      >
        <ProductPage productDetails={productDetails} />
        <RelatedProducts
        MainproductId = {productId}
        storeName = {shopname}
        category={Cat}
        />
        <Footer companyName="Lil Tots" backgroundColor="rgba(188, 80, 144, 1)" />
      </div>
    </div>
  );
};
