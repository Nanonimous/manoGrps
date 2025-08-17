import React, { useState } from "react";
import Cart from "./Cart";

export default function CartTest() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Wireless Headphones",
      price: "$129.99",
      image: "/api/placeholder/60/60",
      quantity: 2
    },
    {
      id: 2,
      name: "Ergonomic Wireless Mouse",
      price: "$49.99",
      image: "/api/placeholder/60/60",
      quantity: 1
    },
    {
      id: 3,
      name: "Mechanical Gaming Keyboard",
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
      setCartItems([]); // Clear cart after successful checkout
    }, 2000);
  };

  const handleAddTestItem = () => {
    const newItem = {
      id: Date.now(),
      name: `Test Product ${cartItems.length + 1}`,
      price: `$${(Math.random() * 100 + 10).toFixed(2)}`,
      image: "/api/placeholder/60/60",
      quantity: 1
    };
    setCartItems(prevItems => [...prevItems, newItem]);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleAddInvalidItem = () => {
    // Add an invalid item to test validation
    const invalidItem = {
      id: Date.now(),
      name: "", // Invalid: empty name
      price: null, // Invalid: null price
      image: "",
      quantity: -1 // Invalid: negative quantity
    };
    setCartItems(prevItems => [...prevItems, invalidItem]);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f5f5',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>Cart Component Test</h1>
        <p>This is a comprehensive test for the Cart component with all its features.</p>
        
        <div style={{ 
          marginBottom: '30px', 
          display: 'flex', 
          gap: '10px', 
          flexWrap: 'wrap' 
        }}>
          <button 
            onClick={() => setIsCartOpen(true)}
            style={{
              padding: '12px 24px',
              backgroundColor: '#4a7c59',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Open Cart ({cartItems.length} items)
          </button>
          
          <button 
            onClick={handleAddTestItem}
            style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Add Test Item
          </button>
          
          <button 
            onClick={handleClearCart}
            style={{
              padding: '12px 24px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Clear Cart
          </button>

          <button 
            onClick={handleAddInvalidItem}
            style={{
              padding: '12px 24px',
              backgroundColor: '#ffc107',
              color: 'black',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Add Invalid Item (Test Validation)
          </button>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3>Current Cart Items: {cartItems.length}</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map(item => (
              <li key={item.id} style={{ 
                padding: '10px', 
                margin: '5px 0', 
                backgroundColor: 'white', 
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <strong>{item.name || 'Invalid Item'}</strong> - {item.price || 'No Price'} (Qty: {item.quantity})
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Features Being Tested:</h3>
          <ul style={{ lineHeight: '1.6' }}>
            <li>✅ Slide-out animation from right side</li>
            <li>✅ Real-time quantity updates with validation</li>
            <li>✅ Item removal with confirmation dialog</li>
            <li>✅ Dynamic total calculation</li>
            <li>✅ Loading states during checkout</li>
            <li>✅ Responsive design (try resizing window)</li>
            <li>✅ Smooth animations and transitions</li>
            <li>✅ Empty cart state handling</li>
            <li>✅ Customizable styling and colors</li>
            <li>✅ Disabled states for buttons</li>
            <li>✅ Keyboard navigation (Tab, Enter, Escape)</li>
            <li>✅ Click outside to close</li>
            <li>✅ Image error handling with fallbacks</li>
            <li>✅ Invalid item filtering</li>
            <li>✅ Accessibility features (ARIA labels, focus management)</li>
          </ul>
        </div>

        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'white', borderRadius: '8px' }}>
          <h3>Keyboard Shortcuts:</h3>
          <ul>
            <li><strong>Escape:</strong> Close cart</li>
            <li><strong>Tab:</strong> Navigate between elements</li>
            <li><strong>Enter/Space:</strong> Activate buttons</li>
          </ul>
        </div>
      </div>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        backgroundColor="#4a7c59"
        titleColor="#ffffff"
        textColor="#ffffff"
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
        currency="$"
        showEmptyCartMessage={true}
        emptyCartMessage="Your cart is empty"
        checkoutButtonText="Proceed to Checkout"
        goBackButtonText="Continue Shopping"
        isLoading={isLoading}
        loadingText="Processing your order..."
        maxQuantity={10}
        showItemAnimation={true}
        enablePersistence={false}
        persistenceKey="test_cart_items"
        showConfirmRemove={true}
      />
    </div>
  );
}
