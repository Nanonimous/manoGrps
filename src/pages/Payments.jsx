
import React, { useState } from "react";
import Payment from "../components/payment/Payment.jsx";
import Navbar_1 from "../components/navbar_1/index.js";
import Footer from "../components/footer/index.js";

export const Payments = () => {
    const [cartItems, setCartItems] = useState([
      {
        id: 1,
        name: "Premium Baby Care Set",
        price: "$29.99",
        image: "/api/placeholder/60/60",
        quantity: 1
      },
      {
        id: 2,
        name: "Organic Cotton Onesie",
        price: "$15.99",
        image: "/api/placeholder/60/60",
        quantity: 2
      }
    ]);
  
    const handleUpdateQuantity = (id, newQuantity) => {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    };
  
    const handleRemoveItem = (id) => {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    };
  
    const handleCheckout = (items, total) => {
      console.log(`Processing checkout for ${items.length} items, total: $${total}`);
      // Add your checkout logic here
      alert(`Checkout initiated! Total: $${total}`);
    };
  // Cart state management
  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: 'rgba(244, 237, 230, 1)'
    }}>
      <Navbar_1
        brandName="Mano Groups"
        backgroundColor="#ffffff "
        navigationLinks={[
          { href: "/", text: "Home" },
          { href: "/manostore", text: "Mano Store's" },
          { href: "/wowla", text: "Wowla" },
          { href: "/liltots", text: "Lil tot's" },
          { href: "#contact", text: "Contact us" }
        ]}
        cartItems={cartItems}
        cartBackgroundColor="#4a7c59"
        onCartClick={() => console.log("Cart clicked")}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />
      <div style={{
        paddingTop: '80px', // Account for fixed navbar height
        width: '100%',
        backgroundColor: 'rgba(244, 237, 230, 1)'
      }}>
        <Payment></Payment>
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