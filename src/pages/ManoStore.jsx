import React from "react";
import { useLocation } from "react-router-dom";
import { ShopNowCon_1 } from "../components/shopNowCon_1/ShopNowCon_1.jsx";
import { ShopByNeed } from "../components/shopByNeed/ShopByNeed.jsx";
import { WhyChoseUs } from "../components/whyChoseUs/WhyChoseUs.jsx";
import { TopBrands } from "../components/topBrands/TopBrands.jsx";
import Location from "../components/location/Location.jsx";
import EnquiryForm from "../components/enquiryForm/EnquiryForm.jsx";
import Footer from "../components/footer/Footer.jsx";
import Navbar_2 from "../components/navbar_2/Navbar_2.jsx";
import MainDisplay from "../components/maindisplay/MainDisplay.jsx";
import { LookingFor } from "../components/lookingFor/LookingFor.jsx";
import Trendings from "../components/trendings/Trendings.jsx";
import { About_us } from "../components/About_us/About_us.jsx";
import ProductMain from "../components/product_main";
import ShowProduct from "../components/showproduct";
import {ProductPage} from "../components/product_page/ProductPage.jsx";


export const ManoStore = () => {
  const location = useLocation();
  const isProductPage = location.pathname.includes('/manostore/products/all');
  console.log(isProductPage);
  const cat = location.pathname.split("/")[3] || "all";
  console.log(cat);
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#F5FFFA'
    }}>
      <Navbar_2
        brandName="Mano Store's"
        tagline="LITTLE LOOKS BIG LOVE"
        brandColor="#FF6B35"
        mainNavLinks={[
          { name: "Home", href: "/manostore" },
          { name: "Products", href: "/manostore/products/all" },
          { name: "About Us", href: "/manostore/about" },
          { name: "Contact us", href: "/womanostorewla/contact" }
        ]}
        categoryLinks={[
          { name: "Home Appliances", href: "/manostore/products/Home Appliances" },
          { name: "Toys", href: "/manostore/products/Toys" },
          { name: "Return Gift's", href: "/manostore/products/Return Gift" },
          { name: "Carpets", href: "/manostore/products/Carpets" },
          { name: "Wallpaper's", href: "/manostore/products/Wallpaper" },
          { name: "Stationaries", href: "manostore/products/Stationaries" }
        ]}
        bottomRowBgColor="rgba(3, 4, 94, 1)"
        mainNavLinkHoverColor="#FF6B35"
      />
      <div style={{
        paddingTop: '120px', // Account for fixed navbar height (Navbar_2 is taller)
        width: '100%',
        backgroundColor: '#F5FFFA'
      }}>
        {isProductPage ? (
          // Product page components
          <>
            <ProductMain
              categoryName="Mano Store Products"
              breadcrumbHome="Home"
              breadcrumbCurrent="Products"
              backgroundImage="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              backgroundColor="#F5FFFA"
              titleColor="#ffffff"
              breadcrumbColor="#ffffff"
              onHomeClick={() => window.location.href = '/manostore'}
            />


            <ShowProduct
              title="Our Home Products"
              shopName = "Mano Store" 
              categoryName = {cat || "all"}
              backgroundColor="#F5FFFA"
              titleColor="rgba(3, 4, 94, 1)"
              cardTextColor="#ffffff"
            />
          </>
        ) : (
          // Home page components
          <>
            <MainDisplay/>

        <LookingFor
          title="What's perfect for your little one?"
          backgroundColor="#F5FFFA"
          titleColor="rgba(3, 4, 94, 1)"
        />

        <ShopNowCon_1
          mainTitle="Give your baby the comfort"
          subTitle="they deserve with our premium"
          highlightTitle="Baby essentials collection."
          buttonText="Shop Baby Care"
          backgroundColor="#F5FFFA"
          titleColor="rgba(255, 255, 255, 1)"
          subtitleColor="rgba(255, 255, 255, 1)"
          highlightColor="rgba(255, 255, 255, 1)"
          buttonColor="black"
          buttonBgColor="white"
        />

        <ShopByNeed
          title="Shop by Baby's Age"
          backgroundColor="#F5FFFA"
          titleColor="rgba(3, 4, 94, 1)"
        />

        <Trendings
          title="Trending & New Arrivals "
          backgroundColor="#F5FFFA"
          titleColor="rgba(3, 4, 94, 1)"
          buttonColor="#ffffff"
          buttonBgColor="rgba(3, 4, 94, 1)"
          buttonHoverBgColor="rgba(150, 60, 120, 1)"
          cardBackgroundColor="rgba(3, 4, 94, 1)"
          cardTitleColor="#ffffff"
          cardCategoryColor="#ffe4e1"
          cardPriceColor="#ffffff"
          cardButtonColor="rgba(3, 4, 94, 1)"
          cardButtonTextColor="#ffffff"
        />

        <ShopNowCon_1
          mainTitle="Create magical moments"
          subTitle="with our adorable collection of"
          highlightTitle="Party wear & accessories."
          buttonText="Shop Now"
          backgroundColor="#F5FFFA"
          titleColor="rgba(255, 255, 255, 1)"
          subtitleColor="rgba(255, 255, 255, 1)"
          highlightColor="rgba(255, 255, 255, 1)"
          buttonColor="black"
          buttonBgColor="white"
        />

        <About_us
          title="About Us"
          description="At Lil Tots, we understand that every little one deserves the best. Our carefully curated collection of baby and toddler products combines safety, comfort, and style. From organic clothing to educational toys, we provide everything your little angel needs to grow, learn, and play."
          backgroundColor="#F5FFFA"
          titleColor="rgba(3, 4, 94, 1)"
          textColor="rgba(80, 80, 80, 1)"
        />

        <WhyChoseUs
          title="Why Choose Lil Tots?"
          backgroundColor="#F5FFFA"
          titleColor="rgba(3, 4, 94, 1)"
          featureTitleColor="rgba(3, 4, 94, 1)"
          featureDescColor="rgba(80, 80, 80, 1)"
          features={[
            {
              id: 1,
              icon: "👶",
              title: "Baby-Safe Products",
              description: "All products are tested for baby safety standards"
            },
            {
              id: 2,
              icon: "🌱",
              title: "Organic & Natural",
              description: "Eco-friendly and organic materials for sensitive skin"
            },
            {
              id: 3,
              icon: "🎁",
              title: "Gift Wrapping",
              description: "Beautiful gift wrapping for special occasions"
            },
            {
              id: 4,
              icon: "💝",
              title: "Parent Approved",
              description: "Trusted by thousands of happy parents"
            }
          ]}
        />

        <Location
          title="Visit Our Baby Store in Pondicherry!"
          storeName="Lil Tots Store"
          backgroundColor="transparent"
          titleColor="rgba(3, 4, 94, 1)"
          storeNameColor="white"
          storeLocationColor="white"
          addressColor="white"
          buttonColor="black"
          buttonBgColor="white"
          directionButtonColor="#ffffff"
          directionButtonBgColor="rgba(3, 4, 94, 1)"
        />

        <EnquiryForm
          title="Have Questions About Baby Products?"
          backgroundColor="transparent"
          formBackgroundColor="rgba(3, 4, 94, 1)"
          titleColor="rgba(3, 4, 94, 1)"
          inputBorderColor="rgba(188, 80, 144, 0.3)"
          inputFocusColor="rgba(3, 4, 94, 1)"
          buttonColor="rgba(3, 4, 94, 1)"
          buttonBgColor="white"
          buttonHoverColor="rgba(3, 4, 94, 1)"
        />

            <Footer
              companyName="Mano Store"
              backgroundColor="rgba(3, 4, 94, 1)"
            />
          </>
        )}

        <Footer
          companyName="Mano Store"
          backgroundColor="rgba(3, 4, 94, 1)"
        />
      </div>
    </div>
  );
};








