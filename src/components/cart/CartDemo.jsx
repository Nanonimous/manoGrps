import React, { useState } from "react";
import Navbar_1 from "../Navbar_1";

export default function CartDemo() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Headphones",
      price: "$129.99",
      image: "/api/placeholder/60/60",
      quantity: 2
    },
    {
      id: 2,
      name: "Wireless Mouse",
      price: "$49.99",
      image: "/api/placeholder/60/60",
      quantity: 1
    },
    {
      id: 3,
      name: "Mechanical Keyboard",
      price: "$89.99",
      image: "/api/placeholder/60/60",
      quantity: 1
    }
  ]);

  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    console.log(`Processing checkout for ${items.length} items, total: $${total}`);
    
    // Simulate checkout process
    setTimeout(() => {
      setIsLoading(false);
      alert(`Checkout successful! Total: $${total}`);
    }, 2000);
  };

  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      name: `New Product ${cartItems.length + 1}`,
      price: `$${(Math.random() * 100 + 10).toFixed(2)}`,
      image: "/api/placeholder/60/60",
      quantity: 1
    };
    setCartItems(prevItems => [...prevItems, newItem]);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Navbar_1
        brandName="Cart Demo"
        backgroundColor="#ffffff"
        cartItems={cartItems}
        cartBackgroundColor="#4a7c59"
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        navigationLinks={[
          { href: "/", text: "Home" },
          { href: "/products", text: "Products" },
          { href: "/about", text: "About" },
          { href: "/contact", text: "Contact" }
        ]}
      />
      
      <div style={{ 
        paddingTop: '100px', 
        padding: '100px 20px 20px', 
        maxWidth: '800px', 
        margin: '0 auto' 
      }}>
        <h1>Cart Component Demo</h1>
        <p>Click the cart icon in the navbar to see the enhanced cart component in action!</p>
        
        <div style={{ marginTop: '30px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={handleAddItem}
            style={{
              padding: '10px 20px',
              backgroundColor: '#4a7c59',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Add Random Item
          </button>
          
          <button 
            onClick={handleClearCart}
            style={{
              padding: '10px 20px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Clear Cart
          </button>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h3>Current Cart Items: {cartItems.length}</h3>
          <ul>
            {cartItems.map(item => (
              <li key={item.id}>
                {item.name} - {item.price} (Qty: {item.quantity})
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginTop: '30px' }}>
          <h3>Features Demonstrated:</h3>
          <ul>
            <li>✅ Slide-out animation from right side</li>
            <li>✅ Real-time quantity updates</li>
            <li>✅ Item removal functionality</li>
            <li>✅ Dynamic total calculation</li>
            <li>✅ Loading states during checkout</li>
            <li>✅ Responsive design (mobile-friendly)</li>
            <li>✅ Smooth animations and transitions</li>
            <li>✅ Empty cart state handling</li>
            <li>✅ Customizable styling and colors</li>
            <li>✅ Disabled states for buttons</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
