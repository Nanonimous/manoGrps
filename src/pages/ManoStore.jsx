import React from "react";
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


export const ManoStore = () => {
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
          { name: "Home", href: "#home" },
          { name: "Products", href: "#products" },
          { name: "About Us", href: "#about" },
          { name: "Contact us", href: "#contact" }
        ]}
        categoryLinks={[
          { name: "Home Appliances", href: "#newborn" },
          { name: "Toys", href: "#infants" },
          { name: "Return Gift's", href: "#toddlers" },
          { name: "Carpets", href: "#party-wear" },
          { name: "Wallpaper's", href: "#baby-essentials" },
          { name: "Stationaries", href: "#baby-essentials" }
        ]}
        bottomRowBgColor="rgba(3, 4, 94, 1)"
        mainNavLinkHoverColor="#FF6B35"
      />
      <div style={{
        paddingTop: '120px', // Account for fixed navbar height (Navbar_2 is taller)
        width: '100%',
        backgroundColor: '#F5FFFA'
      }}>
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
          companyName="Lil Tots"
          backgroundColor="rgba(3, 4, 94, 1)"
        />
      </div>
    </div>
  );
};








