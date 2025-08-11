# Component Props Guide

This guide shows how to use all the updated components with their new props and dynamic background colors.

## 🎨 Universal Props
All components now support:
- `backgroundColor` - Dynamic background color (default: varies by component)

## 📋 Component Usage Examples

### 1. About_us Component
```jsx
import { About_us } from './components/About_us';

<About_us 
  title="About Our Company"
  image="/images/about-company.jpg"
  description="Your custom description here..."
  backgroundColor="#f0f8ff"
/>
```

### 2. ShopNowCon_1 Component
```jsx
import { ShopNowCon_1 } from './components/shopNowCon_1';

<ShopNowCon_1 
  mainTitle="Experience the Future"
  subTitle="With our amazing products"
  highlightTitle="Revolutionary Design"
  buttonText="Explore Now"
  image="/images/custom-product.png"
  imageAlt="Amazing Product"
  backgroundColor="#e8f5e8"
  onButtonClick={() => navigate('/products')}
/>
```

### 3. WhyChoseUs Component
```jsx
import { WhyChoseUs } from './components/whyChoseUs';

<WhyChoseUs 
  title="Why Choose Our Brand?"
  features={[
    {
      id: 1,
      icon: "🚀",
      title: "Fast Delivery",
      description: "Lightning fast shipping"
    },
    // ... more features
  ]}
  backgroundColor="#fff5f5"
/>
```

### 4. TopBrands Component
```jsx
import { TopBrands } from './components/topBrands';

<TopBrands 
  title="Featured Brands"
  subtitle="Discover our premium partners"
  brands={[
    {
      id: 1,
      name: "Brand Name",
      logo: "/images/brands/brand1.png",
      alt: "Brand Logo"
    },
    // ... more brands
  ]}
  backgroundColor="#f8f9fa"
/>
```

### 5. ShopByNeed Component
```jsx
import { ShopByNeed } from './components/shopByNeed';

<ShopByNeed 
  title="Shop by Categories"
  categories={[
    {
      id: 1,
      title: "Electronics",
      image: "/images/categories/electronics.jpg",
      className: styles.electronicsCard
    },
    // ... more categories
  ]}
  backgroundColor="#ffffff"
/>
```

### 6. LookingFor Component
```jsx
import { LookingFor } from './components/lookingFor';

<LookingFor 
  title="What are you searching for?"
  categories={[
    {
      id: 1,
      category: "Home & Garden",
      title: "FURNITURE",
      image: "/images/furniture.png",
      buttonText: "SHOP NOW",
      className: styles.furnitureCard
    },
    // ... more categories
  ]}
  backgroundColor="#f5f5f5"
/>
```

### 7. HeroSection Component
```jsx
import { HeroSection } from './components/herosection';

<HeroSection
  mainHeading="Welcome to Our Store!"
  subText="Amazing deals and products await"
  buttonText="Start Shopping"
  heroImage="/images/hero-banner.jpg"
  heroImageAlt="Hero Banner"
  backgroundColor="#e3f2fd"
  headingColor="#2d5a27"
  subTextColor="#666666"
  buttonColor="#ffffff"
  buttonBgColor="linear-gradient(135deg, #ff6b6b, #ff8e53)"
  onButtonClick={() => navigate('/shop')}
/>
```

### 8. Footer Component
```jsx
import Footer from './components/footer';

<Footer 
  companyName="Your Company"
  address="123 Main St, City, State 12345"
  socialLinks={[
    { icon: "📱", text: "WhatsApp" },
    { icon: "📷", text: "Instagram" },
    // ... more social links
  ]}
  navigationLinks={["Home", "Products", "About", "Contact"]}
  helpLinks={["FAQ", "Returns", "Privacy"]}
  inquiryTitle="Get In Touch"
  emailPlaceholder="Your email address"
  buttonText="SUBSCRIBE"
  copyrightText="© 2024 Your Company. All rights reserved."
  backgroundColor="#2c3e50"
  onEmailSubmit={(email) => console.log('Email:', email)}
/>
```

### 9. EnquiryForm Component
```jsx
import EnquiryForm from './components/enquiryForm';

<EnquiryForm 
  title="Contact Us:"
  namePlaceholder="Your Name:"
  emailPlaceholder="Your Email:"
  phonePlaceholder="Your Phone:"
  messagePlaceholder="Your Message:"
  submitButtonText="Send Message →"
  storeOptions={[
    { value: "", label: "Select Location" },
    { value: "store1", label: "Main Store" },
    // ... more options
  ]}
  backgroundColor="#f9f9f9"
  onSubmit={(data) => handleFormSubmit(data)}
  onValidationError={(msg) => showError(msg)}
/>
```

### 10. Location Component
```jsx
import Location from './components/location';

<Location 
  title="Visit Our Store!"
  storeName="Your Store Name"
  storeLocation="City, Country"
  address="123 Store Street, City, State 12345"
  mapEmbedUrl="https://www.google.com/maps/embed?pb=..."
  directionButtonText="Get Directions"
  shopButtonText="Visit Store"
  backgroundColor="#ffffff"
  onGetDirection={(address) => openMaps(address)}
  onShopNow={() => navigate('/store')}
/>
```

### 11. Navbar_1 Component
```jsx
import Navbar_1 from './components/navbar_1';

<Navbar_1 
  brandName="Your Brand"
  navigationLinks={[
    { href: "/home", text: "Home" },
    { href: "/products", text: "Products" },
    { href: "/about", text: "About" },
    { href: "/contact", text: "Contact" }
  ]}
  loginText="Sign In"
  backgroundColor="#ffffff"
  onCartClick={() => openCart()}
  onLoginClick={() => openLogin()}
/>
```

### 12. Trendings Component
```jsx
import { Trendings } from './components/trendings';

<Trendings 
  title="Hot Products"
  products={[
    {
      id: 1,
      title: "Product Name",
      cat: "Category",
      price: "99",
      image: "/images/product1.jpg"
    },
    // ... more products
  ]}
  showViewAllButton={true}
  viewAllText="See All Products"
  backgroundColor="#f8f9fa"
  onViewAllClick={() => navigate('/products')}
/>
```

## 🎨 Color Scheme Examples

### Light Theme
```jsx
backgroundColor="#ffffff"  // Pure white
backgroundColor="#f8f9fa"  // Light gray
backgroundColor="#f0f8ff"  // Alice blue
```

### Colored Themes
```jsx
backgroundColor="#e8f5e8"  // Light green
backgroundColor="#fff5f5"  // Light red
backgroundColor="#e3f2fd"  // Light blue
backgroundColor="#f3e5f5"  // Light purple
```

### Dark Theme
```jsx
backgroundColor="#2c3e50"  // Dark blue-gray
backgroundColor="#34495e"  // Darker gray
backgroundColor="#1a1a1a"  // Near black
```

## 📝 Notes
- All components are fully responsive
- Props are optional with sensible defaults
- Background colors can be any valid CSS color value
- Event handlers are customizable for each component
- Components maintain their original styling while accepting new props
