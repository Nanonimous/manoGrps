import React, { useState } from "react";
import Navbar_1 from "../components/navbar_1/Navbar_1";
import UserProfile from "../components/userProfile/UserProfile.jsx";

export const Profile = () => {
  

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
          { href: "/Mano-store", text: "Mano Store's" },
          { href: "/Wowla-store", text: "Wowla" },
          { href: "/liltots", text: "Lil tot's" },
          { href: "#contact", text: "Contact us" }
        ]}

      />
      <div style={{
        paddingTop: '80px', // Account for fixed navbar height
        width: '100%',
        backgroundColor: 'rgba(244, 237, 230, 1)'
      }}>
        <UserProfile />
      </div>
    </div>
  );
};








