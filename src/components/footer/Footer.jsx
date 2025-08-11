import React from "react"
import f from "./Footer.module.css";

export default function Footer({
  companyName = "Mano Group's",
  address = "Shop No. 34, Mission St, Heritage Town, Puducherry, 605001",
  socialLinks = [
    { icon: "📱", text: "WhatsApp number" },
    { icon: "📷", text: "Instagram Account" },
    { icon: "📘", text: "Facebook Account" },
    { icon: "📺", text: "You tube Channel" },
    { icon: "✉️", text: "G-Mail Id" }
  ],
  navigationLinks = [
    "Home", "Product", "Contact us", "Wowla Store", "Lil tot's Store"
  ],
  helpLinks = [
    "Payment Options", "Returns", "Privacy Policies"
  ],
  inquiryTitle = "Bulk Inquiry & Franchise",
  emailPlaceholder = "Enter Your Email Address",
  buttonText = "SEND",
  copyrightText = "BrandNestOff All rights reserved",
  backgroundColor = "rgba(188, 80, 144, 1)",
  onEmailSubmit = (email) => console.log("Email submitted:", email)
})
{
     const handleSubmit = (e) => {
       e.preventDefault();
       const email = e.target.email.value;
       onEmailSubmit(email);
     };

     return (
      <>
          <div className={f.mainContainer} style={{ backgroundColor }}>
               <div className={f.links}>
                    <div className={`${f.eachLink} ${f.linkGroup1}`}>
                         <h1>{companyName}</h1>
                         <p dangerouslySetInnerHTML={{ __html: address.replace(/,\s*/g, ',<br/> ') }}></p>
                         <div className={f.socialLinks}>
                              {socialLinks.map((link, index) => (
                                <div key={index} className={f.socialItem}>
                                  {link.icon} {link.text}
                                </div>
                              ))}
                         </div>
                    </div>
                    <div className={`${f.eachLink} ${f.linkGroup2}`}>
                         <p>Links</p>
                         {navigationLinks.map((link, index) => (
                           <h2 key={index}>{link}</h2>
                         ))}
                    </div>
                    <div className={`${f.eachLink} ${f.linkGroup3}`}>
                         <p>Help</p>
                         {helpLinks.map((link, index) => (
                           <h2 key={index}>{link}</h2>
                         ))}
                    </div>
                    <div className={`${f.eachLink} ${f.linkGroup4}`}>
                         <p>{inquiryTitle}</p>
                         <form onSubmit={handleSubmit} className={f.form}>
                              <input
                                type="email"
                                name="email"
                                placeholder={emailPlaceholder}
                                className={f.inputBox}
                                required
                              />
                              <button type="submit" className={f.button}>{buttonText}</button>
                         </form>
                    </div>
               </div>
               <div className={f.copyRight}>
                    <p>{copyrightText}</p>
               </div>

          </div>
      </>
     )
}