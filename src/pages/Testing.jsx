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

export const Testing = () => {
  return (
    <>
      <Navbar_2 />
      {/* <Navbar_1 /> */}
      <HeroSection />
      <MainDisplay />
      <ShopNowCon_1 />
      <ShopByNeed />
      <ShowCard />
      <WhyChoseUs />
      <TopBrands />
      <Location />
      <EnquiryForm />
      <About_us />
      <Footer />
      <LookingFor />
      <ProductPage />
    </>
  );
};
