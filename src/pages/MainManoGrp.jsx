import React from "react";
import { ShopNowCon_1 } from "../components/shopNowCon_1/ShopNowCon_1.jsx";
import { ShopByNeed } from "../components/shopByNeed/ShopByNeed.jsx";
import { ShowCard } from "../components/showCard/ShowCard.jsx";
import { WhyChoseUs } from "../components/whyChoseUs/WhyChoseUs.jsx";
import { TopBrands } from "../components/topBrands/TopBrands.jsx";
import Location from "../components/location/Location";
import EnquiryForm from "../components/enquiryForm/EnquiryForm";
import Footer from "../components/footer/Footer";
import { LookingFor } from "../components/lookingFor/LookingFor";
import Navbar_1 from "../components/navbar_1/Navbar_1";
import Navbar_2 from "../components/navbar_2/Navbar_2";
import MainDisplay from "../components/maindisplay/MainDisplay";
import { ProductPage } from "../components/product_page/ProductPage";
import { About_us } from "../components/About_us/About_us";
import { HeroSection } from "../components/herosection/HeroSection";
import Trendings from "../components/trendings/Trendings";


export const MainManoGrp = () => {
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: 'rgba(244, 237, 230, 1)'
    }}>
      <Navbar_1
        brandName="Mano Groups"
        backgroundColor="#ffffff"
        navigationLinks={[
          { href: "#home", text: "Home" },
          { href: "#mano-stores", text: "Mano Store's" },
          { href: "#wowla", text: "Wowla" },
          { href: "#lil-tots", text: "Lil tot's" },
          { href: "#contact", text: "Contact us" }
        ]}
        loginText="Login"
        onCartClick={() => console.log("Cart clicked")}
        onLoginClick={() => console.log("Login clicked")}
      />
      <div style={{
        paddingTop: '80px', // Account for fixed navbar height
        width: '100%',
        backgroundColor: 'rgba(244, 237, 230, 1)'
      }}>
        <HeroSection
          mainHeading="The wait is over—our sale starts today!"
          subText="Deals Content - Products"
          buttonText="Shop now"
          backgroundColor="transparent"
          titleColor="rgba(53, 94, 59, 1)"
          subTextColor="rgba(53, 94, 59, 1)"
          highlightColor="black"
          buttonColor="black"
          buttonBgColor="white"
          onButtonClick={() => console.log("Hero shop now clicked")}
        />

        <ShopByNeed
          title="Shop by Need's"
          backgroundColor="transparent"
          titleColor="rgba(53, 94, 59, 1)"
        />



        <ShopNowCon_1
          mainTitle="Experience in pilot's"
          subTitle="Point of view, by grabbing this"
          highlightTitle="Fantastic plane."
          buttonText="Shop now"
          backgroundColor="#F5FFFA"
          titleColor="rgba(255, 255, 255, 1)"
          subtitleColor="rgba(255, 255, 255, 1)"
          highlightColor="rgba(255, 255, 255, 1)"
          buttonColor="black"
          buttonBgColor="rgba(255, 255, 255, 1)"
          onButtonClick={() => console.log("Shop now clicked")}
        />
          <Trendings
            title="Trending & New Arrivals "
            backgroundColor="#F4EDE6"
            titleColor="rgba(53, 94, 59, 1)"
            buttonColor="black"
            buttonBgColor="white"
            buttonHoverBgColor="rgba(53, 94, 59, 0.1)"
            cardBackgroundColor="rgba(53, 94, 59, 1)"
            cardTitleColor="#ffffff"
            cardCategoryColor="#e8f5e8"
            cardPriceColor="#ffffff"
            cardButtonColor="#4CAF50"
            cardButtonTextColor="#ffffff"
          />

                  <WhyChoseUs
          title="Why chose us?"
          backgroundColor="transparent"
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

                <ShopNowCon_1
          mainTitle="Experience in pilot's"
          subTitle="Point of view, by grabbing this"
          highlightTitle="Fantastic plane."
          buttonText="Shop now"
          backgroundColor="#F5FFFA"
          titleColor="rgba(255, 255, 255, 1)"
          subtitleColor="rgba(255, 255, 255, 1)"
          highlightColor="rgba(255, 255, 255, 1)"
          buttonColor="black"
          buttonBgColor="rgba(255, 255, 255, 1)"
          onButtonClick={() => console.log("Shop now clicked")}
        />

        <TopBrands
          title="Top Brands"
          subtitle="Shop by top selected brands"
          backgroundColor="transparent"
          brands={[
            {
              id: 1,
              name: "Brand 1",
              logo: "/images/topBrands/1.png",
              alt: "Brand 1 Logo"
            },
            {
              id: 2,
              name: "Brand 2",
              logo: "/images/topBrands/2.png",
              alt: "Brand 2 Logo"
            },
            {
              id: 3,
              name: "Brand 3",
              logo: "/images/topBrands/3.png",
              alt: "Brand 3 Logo"
            },
            {
              id: 4,
              name: "Brand 4",
              logo: "/images/topBrands/4.jpg",
              alt: "Brand 4 Logo"
            }
          ]}
        />

        <Location
          title="Near Pondicherry? Visit Us In Person!"
          storeName="Manostore's"
          storeLocation="Pondicherry, India"
          address="Shop No. 34, Mission St, Heritage Town, Puducherry, 605001"
          backgroundColor="transparent"
          titleColor="rgba(53, 94, 59, 1)"
          storeNameColor="white"
          storeLocationColor="white"
          addressColor="white"
          buttonColor="black"
          buttonBgColor="white"
          directionButtonColor="#ffffff"
          directionButtonBgColor="#2196f3"
          onShopNow={() => console.log("Shop now clicked")}
        />

        <EnquiryForm
          title="Enquire Us:"
          backgroundColor="transparent"
          formBackgroundColor="#355E3B"
          titleColor="#333333"
          inputBorderColor="#ddd"
          inputFocusColor="#e91e63"
          buttonColor="#355E3B" 
          buttonBgColor="white"
          buttonHoverColor="#c2185b"
          onSubmit={(data) => console.log('Form submitted:', data)}
        />

        <Footer
          companyName="Mano Group's"
          backgroundColor="rgba(53, 94, 59, 1)"
          address="Shop No. 34, Mission St, Heritage Town, Puducherry, 605001"
          socialLinks={[
            { icon: "📱", text: "WhatsApp number" },
            { icon: "📷", text: "Instagram Account" },
            { icon: "📘", text: "Facebook Account" },
            { icon: "📺", text: "You tube Channel" },
            { icon: "✉️", text: "G-Mail Id" }
          ]}
          navigationLinks={["Home", "Product", "Contact us", "Wowla Store", "Lil tot's Store"]}
          helpLinks={["Payment Options", "Returns", "Privacy Policies"]}
          inquiryTitle="Bulk Inquiry & Franchise"
          emailPlaceholder="Enter Your Email Address"
          buttonText="SEND"
          copyrightText="BrandNestOff All rights reserved"
          onEmailSubmit={(email) => console.log('Email submitted:', email)}
        />
      </div>
    </div>
  );
};








