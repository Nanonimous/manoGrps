# Cart Component

A slide-out cart component that appears from the right side of the screen when the cart button is clicked in the navbar.

## Features

- **Slide Animation**: Smooth slide-in/slide-out animation from the right side with cubic-bezier easing
- **Responsive Design**: Adapts to mobile screens (full width on mobile)
- **Cart Items Display**: Shows product image, name, price, and quantity controls
- **Quantity Management**: Increase/decrease quantity with + and - buttons (with max quantity limits)
- **Remove Items**: Delete button for each cart item with confirmation
- **Real-time Total Calculation**: Automatically calculates and displays total price
- **Loading States**: Shows loading spinner and disabled states during operations
- **Checkout Actions**: Customizable checkout and go back buttons
- **Overlay**: Dark overlay behind the cart when open
- **Item Animations**: Smooth animations when items are added/removed
- **Empty Cart Handling**: Customizable empty cart message and state
- **Accessibility**: Full keyboard navigation, ARIA labels, focus management
- **Customizable**: Background color, button text, currency, title/text colors
- **Data Validation**: Filters out invalid cart items automatically
- **Image Error Handling**: Fallback images for broken/missing product images
- **Click Outside to Close**: Close cart by clicking on overlay
- **Escape Key Support**: Close cart with Escape key
- **Local Storage Persistence**: Optional cart persistence between sessions
- **Enhanced Focus States**: Clear visual focus indicators for all interactive elements

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | boolean | `false` | Controls whether the cart is visible |
| `onClose` | function | `() => {}` | Callback function when cart is closed |
| `cartItems` | array | `[...]` | Array of cart item objects |
| `backgroundColor` | string | `"#4a7c59"` | Background color of the cart |
| `onUpdateQuantity` | function | `() => {}` | Callback when item quantity is updated |
| `onRemoveItem` | function | `() => {}` | Callback when item is removed |
| `onCheckout` | function | `() => {}` | Callback when checkout is initiated |
| `currency` | string | `"$"` | Currency symbol to display |
| `showEmptyCartMessage` | boolean | `true` | Whether to show empty cart message |
| `emptyCartMessage` | string | `"Your cart is empty"` | Message when cart is empty |
| `checkoutButtonText` | string | `"Checkout"` | Text for checkout button |
| `goBackButtonText` | string | `"Go Back"` | Text for go back button |
| `isLoading` | boolean | `false` | Shows loading state |
| `loadingText` | string | `"Processing..."` | Text shown during loading |
| `maxQuantity` | number | `99` | Maximum quantity per item |
| `showItemAnimation` | boolean | `true` | Enable item animations |
| `enablePersistence` | boolean | `false` | Enable localStorage persistence |
| `persistenceKey` | string | `"cart_items"` | Key for localStorage |
| `showConfirmRemove` | boolean | `true` | Show confirmation dialog when removing items |
| `titleColor` | string | `"#ffffff"` | Color of the cart title |
| `textColor` | string | `"#ffffff"` | Color of the cart text |

## Cart Item Object Structure

```javascript
{
  id: 1,                              // Unique identifier
  name: "Product Name",               // Product name
  price: "Product Price.",            // Product price (string)
  image: "/api/placeholder/60/60",    // Product image URL
  quantity: 1                         // Quantity in cart
}
```

## Usage

The cart component is automatically integrated with the Navbar_1 component. You can customize it by passing props to the navbar:

```jsx
<Navbar_1
  cartItems={[
    {
      id: 1,
      name: "Sample Product",
      price: "$29.99",
      image: "/path/to/image.jpg",
      quantity: 2
    }
  ]}
  cartBackgroundColor="#4a7c59"
  onCartClick={() => console.log("Cart opened")}
  onUpdateQuantity={(id, quantity) => {
    // Update item quantity in your state management
    console.log(`Update item ${id} to quantity ${quantity}`);
  }}
  onRemoveItem={(id) => {
    // Remove item from your state management
    console.log(`Remove item ${id}`);
  }}
  onCheckout={(items, total) => {
    // Handle checkout process
    console.log(`Checkout ${items.length} items, total: $${total}`);
  }}
/>
```

## Demo Component

A complete demo component is available at `CartDemo.jsx` that shows all features in action with state management.

## Styling

The component uses CSS modules (`Cart.module.css`) with the following key classes:

- `.cartSlider` - Main cart container
- `.overlay` - Background overlay
- `.cartItem` - Individual cart item
- `.checkoutButton` - Primary checkout button
- `.goBackButton` - Secondary go back button

## Mobile Responsiveness

On screens smaller than 480px, the cart takes up the full width of the screen for better usability.

## Testing

A comprehensive test component is available at `CartTest.jsx` that demonstrates all features including:
- Item validation and filtering
- Error handling for images
- Keyboard navigation
- Loading states
- Persistence functionality

## Future Enhancements

- Connect to actual cart state management (Redux, Context API, etc.)
- Integrate with payment processing APIs
- Add product variants support (size, color, etc.)
- Implement cart sharing functionality
- Add promotional codes/discounts support
- Enhanced analytics and tracking
