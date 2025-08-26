import React from "react";
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
import Favourite from "../components/Favourite";

export const Liltots = () => {
  const location = useLocation();
  const isProductPage = location.pathname.includes('/liltots/products');
  console.log(isProductPage);
  let cat = location.pathname.split('/liltots/products/')[1];
  console.log(cat);

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#F5FFFA'
    }}>
      <Navbar_2
        brandName="Lil' Tots"
        tagline="LITTLE LOOKS BIG LOVE"
        brandColor="#FF6B35"
        mainNavLinks={[
          { name: "Home", href: "/liltots" },
          { name: "Products", href: "/liltots/products/All" },
          { name: "About Us", href: "/liltots/about" },
          { name: "Contact us", href: "/liltots/contact" }
        ]}
        categoryLinks={[
          { name: "New Born", href: "/liltots/products/New Born" },
          { name: "Infants", href: "/liltots/products/Infants" },
          { name: "Toddler's", href: "/liltots/products/Toddler" },
          { name: "Party Wear", href: "/liltots/products/Party Wear" },
          { name: "Baby Essentials", href: "/liltots/products/Baby Essentials" }
        ]}
        bottomRowBgColor="rgba(188, 80, 144, 1)"
        mainNavLinkHoverColor="#FF6B35"
        shopName="Lit tots"
      />
      <div style={{
        paddingTop: '120px', // Account for fixed navbar height (Navbar_2 is taller)
        width: '100%',
        backgroundColor: '#F5FFFA'
      }}>
        {isProductPage ? (
          // Product page components
          <>
           

            {cat === "favourite" ? (
              <>
              <ProductMain
              categoryName="Lil' Tots Favorite Products"
              breadcrumbHome="Home"
              breadcrumbCurrent="Products"
              backgroundImage="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              backgroundColor="#F5FFFA"
              titleColor="#ffffff"
              breadcrumbColor="#ffffff"
              onHomeClick={() => window.location.href = '/liltots'}
            />
              // Show Favourite component when category is "Favourite"
              <Favourite  storeName={"Lit tots"}/>
            </> 
            ) : (
               <>
              <ProductMain
              categoryName="Lil' Tots Products"
              breadcrumbHome="Home"
              breadcrumbCurrent="Products"
              backgroundImage="https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              backgroundColor="#F5FFFA"
              titleColor="#ffffff"
              breadcrumbColor="#ffffff"
              onHomeClick={() => window.location.href = '/liltots'}
            />
              // Show regular product display for other categories
              <ShowProduct
                title="Our Baby Products"
                shopName = "Lit tots"
                categoryName = {cat || "all"}
                backgroundColor="#F5FFFA"
                titleColor="rgba(188, 80, 144, 1)"
                cardTextColor="#ffffff"
              />
              </>
            )}
          </>
        ) : (
          // Home page components
          <>
            <MainDisplay/>

        <LookingFor
          title="What are you looking for?"
          backgroundColor="#F5FFFA"
          titleColor="rgba(188, 80, 144, 1)"
        />

        <ShopNowCon_1
          mainTitle="Give your baby the comfort"
          subTitle="they deserve with our premium"
          highlightTitle="Baby essentials collection."
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
          titleColor="rgba(188, 80, 144, 1)"
        />

        <Trendings
          title="Trending & New Arrivals "
          backgroundColor="#F5FFFA"
          titleColor="rgba(188, 80, 144, 1)"
          buttonColor="#ffffff"
          buttonBgColor="rgba(188, 80, 144, 1)"
          buttonHoverBgColor="rgba(150, 60, 120, 1)"
          cardBackgroundColor="rgba(188, 80, 144, 1)"
          cardTitleColor="#ffffff"
          cardCategoryColor="#ffe4e1"
          cardPriceColor="#ffffff"
          cardButtonColor="#FF69B4"
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
          titleColor="black"
          textColor="rgba(80, 80, 80, 1)"
        />

            <WhyChoseUs
          title="Why chose us?"
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
          title="Visit Our Baby Store in Pondicherry!"
          storeName="Lil Tots Store"
          backgroundColor="#F5FFFA"
          titleColor="rgba(188, 80, 144, 1)"
          storeNameColor="white"
          storeLocationColor="white"
          addressColor="white"
          buttonColor="black"
          buttonBgColor="white"
          directionButtonColor="#ffffff"
          directionButtonBgColor="rgba(150, 60, 120, 1)"
        />

        <EnquiryForm
          title="Have Questions About Baby Products?"
          backgroundColor="#F5FFFA"
          formBackgroundColor="rgba(188, 80, 144, 1)"
          titleColor="rgba(188, 80, 144, 1)"
          inputBorderColor="rgba(188, 80, 144, 0.3)"
          inputFocusColor="rgba(188, 80, 144, 1)"
          buttonColor="rgba(188, 80, 144, 1)"
          buttonBgColor="white"
          buttonHoverColor="rgba(150, 60, 120, 1)"
        />

            <Footer
              companyName="Lil Tots"
              backgroundColor="rgba(188, 80, 144, 1)"
            />
          </>
        )}

        <Footer
          companyName="Lil Tots"
          backgroundColor="rgba(188, 80, 144, 1)"
        />
      </div>
    </div>
  );
};








