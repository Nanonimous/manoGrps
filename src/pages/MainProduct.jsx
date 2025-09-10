import React, { useEffect, useState } from "react";
import { useLocation,useParams } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Navbar_2 from "../components/navbar_2/Navbar_2";
import { ProductPage } from "../components/product_page/ProductPage.jsx";
import axios from "axios";
import { RelatedProducts } from "../components/RelatedProducts/RelatedProducts.jsx";
import { useUser } from "../context/UserContext.jsx";

export const MainProduct = () => {
  const location = useLocation();

  // Extract shop name and category from path
  const { shopname, Cat } = useParams(); // ✅ get route params
    const { token } = useUser();
  
  // Shop configurations for navbar and footer
  const shopConfigs = {
    wowla: {
      brandName: "Wowla",
      tagline: "WONDERFUL WORLD OF LIFESTYLE ACCESSORIES",
      brandColor: "#FF6B35",
      mainNavLinks: [
{ name: "Home", href: "/Wowla-store" },
          { name: "Products", href: "/Wowla-store/products/All" },
          { name: "About Us", href: "/Wowla-store/about" },
          { name: "Contact us", href: "/Wowla-store/contact" }
      ],
      categoryLinks: [
          { name: "Home Applications", href: "/Wowla-store/products/home application" },
          { name: "Toys", href: "/Wowla-store/products/toys" },
          { name: "Return Gift's", href: "/Wowla-store/products/return gift" },
          { name: "Wallpaper's", href: "/Wowla-store/products/wallpaper" },
          { name: "Stationaries", href: "/Wowla-store/products/stationaries" },
          { name: "Artificial Flowers", href: "/Wowla-store/products/artificial flowers" }
      ],
      bottomRowBgColor: "rgba(53, 94, 59, 1)",
      mainNavLinkHoverColor: "#FF6B35",
      shopName: "Wowla-store",
      footerCompanyName: "Wowla",
      footerBackgroundColor: "rgba(53, 94, 59, 1)"
    },
    "Lit tots": {
      brandName: "Lil' Tots",
      tagline: "LITTLE LOOKS BIG LOVE",
      brandColor: "#FF6B35",
      mainNavLinks: [
          { name: "Home", href: "/liltots" },
          { name: "Products", href: "/liltots/products/All" },
          { name: "About Us", href: "/liltots/about" },
          { name: "Contact us", href: "/liltots/contact" }
      ],
      categoryLinks: [
          { name: "New Born", href: "/liltots/products/New Born" },
          { name: "Infants", href: "/liltots/products/Infants" },
          { name: "Toddler's", href: "/liltots/products/Toddler" },
          { name: "Party Wear", href: "/liltots/products/Party Wear" },
          { name: "Baby Essentials", href: "/liltots/products/Baby Essentials" }
      ],
      bottomRowBgColor: "rgba(188, 80, 144, 1)",
      mainNavLinkHoverColor: "#FF6B35",
      shopName: "liltots",
      footerCompanyName: "Lil Tots",
      footerBackgroundColor: "rgba(188, 80, 144, 1)"
    },
    "Mano-store": {
      brandName: "Mano Store's",
      tagline: "LITTLE LOOKS BIG LOVE",
      brandColor: "#FF6B35",
      mainNavLinks: [
          { name: "Home", href: "/Mano-store" },
          { name: "Products", href: "/Mano-store/products/All" },
          { name: "About Us", href: "/Mano-store/about" },
          { name: "Contact us", href: "/Mano-store/contact" }
      ],
      categoryLinks: [
          { name: "Home Appliances", href: "/Mano-store/products/Home Appliances" },
          { name: "Toys", href: "/Mano-store/products/Toys" },
          { name: "Return Gift's", href: "/Mano-store/products/Return Gift" },
          { name: "Carpets", href: "/Mano-store/products/Carpets" },
          { name: "Wallpaper's", href: "/Mano-store/products/Wallpaper" },
          { name: "Stationaries", href: "/Mano-store/products/Stationaries" }
      ],
      bottomRowBgColor: "rgba(3, 4, 94, 1)",
      mainNavLinkHoverColor: "#FF6B35",
      shopName: "Mano-store",
      footerCompanyName: "Mano Store",
      footerBackgroundColor: "rgba(3, 4, 94, 1)"
    }
  };

  // Get shop config, default to liltots if not found
  const shopConfig = shopConfigs[shopname];


  // Extract query params
  const query = new URLSearchParams(location.search);
  const productId = query.get("id");
  const refName = query.get("ref");
  console.log("main product page",productId);
  const [productDetails, setProductDetails] = useState(null);
  const [isStaff , setIsStaff] = useState('');

useEffect(() => {
    if(!refName) return ;
    const decrypt = async () => {
  try {
    const res = await axios.post(
      "https://userenquire-b5sg.onrender.com/api/passkey/decrypt",
      `${refName}`, // raw encrypted text
      {
        headers: {
          "Content-Type": "text/plain",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data !== false) {
      setIsStaff(res.data);
      console.log(res.data);
    }
  } catch (err) {
    console.error("Decrypt error:", err.response?.data || err.message);
  }
};


    decrypt();
}, []);


  useEffect(() => {

    if (!productId) {
      console.warn("No productId found in query params");
      return;
    }

    const url = `https://product-7boc.onrender.com/api/product/productId?productId=${productId}`;

    const getProd = async () => {
      try {
        const res = await axios.get(url);
        const sendData = {...res.data, isStaff: isStaff }; 

        setProductDetails(sendData);
      } catch (err) {
        console.error("Error fetching product:", err.response?.data || err.message);
      }
    };

    getProd();
  }, [productId,isStaff]);


  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#F5FFFA",
      }}
    >
      <Navbar_2
        brandName={shopConfig.brandName}
        tagline={shopConfig.tagline}
        brandColor={shopConfig.brandColor}
        mainNavLinks={shopConfig.mainNavLinks}
        categoryLinks={shopConfig.categoryLinks}
        bottomRowBgColor={shopConfig.bottomRowBgColor}
        mainNavLinkHoverColor={shopConfig.mainNavLinkHoverColor}
        shopName={shopConfig.shopName}
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
          MainproductId={productId}
          storeName={shopname}
          category={Cat}
          titleColor={shopConfig.bottomRowBgColor} 
          buttonBgColor={shopConfig.bottomRowBgColor}
          cardBackGround={shopConfig.bottomRowBgColor}
          buttonHoverBgColor = {shopConfig.bottomRowBgColor}
          buttonColorText = {shopConfig.bottomRowBgColor}
        />

        <Footer companyName={shopConfig.footerCompanyName} backgroundColor={shopConfig.footerBackgroundColor} />
      </div>
    </div>
  );
};
