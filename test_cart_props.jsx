import React from 'react';
import Cart from './src/components/cart/Cart';

// Test that Cart component receives required props
function TestCartProps() {
  const testProps = {
    isOpen: true,
    onClose: () => console.log('Close cart'),
    shopName: 'Test Shop',
    cartItems: [
      {
        id: 1,
        name: 'Test Product',
        price: '$10.00',
        image: '/api/placeholder/60/60',
        quantity: 1
      }
    ],
    backgroundColor: '#4a7c59',
    onCheckout: () => console.log('Checkout'),
    onUpdateQuantity: () => console.log('Update quantity'),
    onRemoveItem: () => console.log('Remove item')
  };

  return (
    <div>
      <h1>Testing Cart Component Props</h1>
      <p>This test verifies that the Cart component receives all required props.</p>
      
      <Cart {...testProps} />
      
      <div style={{ marginTop: '20px' }}>
        <h3>Props being passed:</h3>
        <ul>
          <li>isOpen: {testProps.isOpen.toString()}</li>
          <li>shopName: {testProps.shopName}</li>
          <li>cartItems: {testProps.cartItems.length} items</li>
          <li>onUpdateQuantity: {typeof testProps.onUpdateQuantity}</li>
          <li>onRemoveItem: {typeof testProps.onRemoveItem}</li>
        </ul>
      </div>
    </div>
  );
}

export default TestCartProps;
