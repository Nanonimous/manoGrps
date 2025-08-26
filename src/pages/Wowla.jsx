import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { ShopNowCon_1 } from "../components/shopNowCon_1/ShopNowCon_1.jsx";
import { ShopByNeed } from "../components/shopByNeed/ShopByNeed.jsx";
import { WhyChoseUs } from "../components/whyChoseUs/WhyChoseUs.jsx";
import { TopBrands } from "../components/topBrands/TopBrands.jsx";
import Location from "../components/location/Location";
import EnquiryForm from "../components/enquiryForm/EnquiryForm";
import Footer from "../components/footer/Footer";
import Navbar_2 from "../components/navbar_2/Navbar_2";
import MainDisplay from "../components/maindisplay/MainDisplay";
import { LookingFor } from "../components/lookingFor/LookingFor";
import Trendings from "../components/trendings/Trendings.jsx";
import { About_us } from "../components/About_us/About_us";
import { TrendingHighlight } from "../components/trendingHighlight/TrendingHighlight";
import ProductMain from "../components/product_main";
import ShowProduct from "../components/showproduct";
import {ProductPage} from "../components/product_page/ProductPage.jsx";

export const Wowla = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[3] || "all";
  
  console.log(cat);
  const isProductPage = location.pathname.includes('/wowla/products');

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#F5FFFA'
    }}>
      <Navbar_2
        brandName="Wowla"
        tagline="WONDERFUL WORLD OF LIFESTYLE ACCESSORIES"
        brandColor="#FF6B35"
        mainNavLinks={[
          { name: "Home", href: "/wowla" },
          { name: "Products", href: "/wowla/products/all" },
          { name: "About Us", href: "/wowla/about" },
          { name: "Contact us", href: "/wowla/contact" }
        ]}
        categoryLinks={[
          { name: "Home Applications", href: "/wowla/products/home applications" },
          { name: "Toys", href: "/wowla/products/toys" },
          { name: "Return Gift's", href: "/wowla/products/return gifts" },
          { name: "Wallpaper's", href: "/wowla/products/wallpapers" },
          { name: "Stationaries", href: "/wowla/products/stationaries" },
          { name: "Artificial Flowers", href: "/wowla/products/artificial flowers" }
        ]}
        bottomRowBgColor="rgba(53, 94, 59, 1)"
        mainNavLinkHoverColor="#FF6B35"
      />
      <div style={{
        paddingTop: '120px',
        width: '100%',
        backgroundColor: '#F5FFFA'
      }}>
        {isProductPage ? (
          // Product page components
          <>
            <ProductMain
              categoryName="Wowla Products"
              breadcrumbHome="Home"
              breadcrumbCurrent="Products"
              backgroundImage="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              backgroundColor="#F5FFFA"
              titleColor="#ffffff"
              breadcrumbColor="#ffffff"
              onHomeClick={() => window.location.href = '/wowla'}
            />

            <ShowProduct
              title="Our Products"
              shopName="Wowla"
              categoryName={cat || "all"}
              backgroundColor="#F5FFFA"
              titleColor="rgba(53, 94, 59, 1)"
              cardTextColor="#ffffff"

            />
          </>
        ) : (
          <>
            <MainDisplay/>

            <LookingFor
              title="What are you looking for?"
              backgroundColor="#F5FFFA"
              titleColor="rgba(53, 94, 59, 1)"
            />

            <ShopNowCon_1
              mainTitle="Discover amazing lifestyle"
              subTitle="accessories that transform"
              highlightTitle="your everyday living."
              buttonText="Shop now"
              backgroundColor="#F5FFFA"
              titleColor="rgba(255, 255, 255, 1)"
              subtitleColor="rgba(255, 255, 255, 1)"
              highlightColor="rgba(255, 255, 255, 1)"
              buttonColor="black"
              buttonBgColor="white"
            />

            <TrendingHighlight
              title="Trending Highlights"
              backgroundColor="#F5FFFA"
              titleColor="rgba(53, 94, 59, 1)"
            />

            <Trendings
              title="Trending & New Arrivals"
              backgroundColor="#F5FFFA"
              titleColor="rgba(53, 94, 59, 1)"
              buttonColor="#ffffff"
              buttonBgColor="rgba(53, 94, 59, 1)"
              buttonHoverBgColor="rgba(53, 94, 59, 1)"
              cardBackgroundColor="rgba(53, 94, 59, 1)"
              cardTitleColor="#ffffff"
              cardCategoryColor="#ffe4e1"
              cardPriceColor="#ffffff"
              cardButtonColor="rgba(53, 94, 59, 1)"
              cardButtonTextColor="#ffffff"
            />

            <ShopNowCon_1
              mainTitle="Create beautiful spaces"
              subTitle="with our premium collection of"
              highlightTitle="Home & lifestyle accessories."
              buttonText="Shop Now"
              backgroundColor="#F5FFFA"
              titleColor="rgba(255, 255, 255, 1)"
              subtitleColor="rgba(255, 255, 255, 1)"
              highlightColor="rgba(255, 255, 255, 1)"
              buttonColor="black"
              buttonBgColor="white"
            />

            <About_us
              title="About Wowla"
              description="At Wowla, we believe in transforming everyday spaces into extraordinary experiences. Our carefully curated collection of lifestyle accessories, home applications, toys, and decorative items brings joy and functionality to your world. From beautiful wallpapers to unique return gifts, we provide everything you need to create wonderful moments."
              backgroundColor="#F5FFFA"
              titleColor="rgba(53, 94, 59, 1)"
              textColor="rgba(80, 80, 80, 1)"
            />

            <WhyChoseUs
              title="Why choose Wowla?"
              backgroundColor="#F5FFFA"
              titleColor="rgba(53, 94, 59, 1)"
              featureTitleColor="#333333"
              featureDescColor="#666666"
              features={[
                {
                  id: 1,
                  icon: "🚚",
                  title: "Reliable Delivery",
                  description: "Fast and secure delivery to your doorstep"
                },
                {
                  id: 2,
                  icon: "📋",
                  title: "Contact & Enquiry support",
                  description: "24/7 customer support for all your queries"
                },
                {
                  id: 3,
                  icon: "🛒",
                  title: "Bulk Inquiry",
                  description: "Special pricing for bulk orders"
                },
                {
                  id: 4,
                  icon: "👍",
                  title: "Mono Groups Quality Assurance",
                  description: "Premium quality guaranteed products"
                }
              ]}
            />

            <Location
              title="Visit Our Wowla Store in Pondicherry!"
              storeName="Wowla Store"
              backgroundColor="#F5FFFA"
              titleColor="rgba(53, 94, 59, 1)"
              storeNameColor="white"
              storeLocationColor="white"
              addressColor="white"
              buttonColor="black"
              buttonBgColor="white"
              directionButtonColor="#ffffff"
              directionButtonBgColor="rgba(53, 94, 59, 1)"
            />

            <EnquiryForm
              title="Have Questions About Our Products?"
              backgroundColor="#F5FFFA"
              formBackgroundColor="rgba(53, 94, 59, 1)"
              titleColor="rgba(53, 94, 59, 1)"
              inputBorderColor="rgba(53, 94, 59, 1)"
              inputFocusColor="rgba(188, 80, 144, 1)"
              buttonColor="rgba(53, 94, 59, 1)"
              buttonBgColor="white"
              buttonHoverColor="rgba(150, 60, 120, 1)"
            />
          </>
        )}

        <Footer
          companyName="Wowla"
          backgroundColor="rgba(53, 94, 59, 1)"
        />
      </div>
    </div>
  );
};
