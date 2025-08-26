import React, { useState } from 'react';
import styles from './Payment.module.css';

const Payment = () => {
    const [products, setProducts] = useState([
        { id: 1, name: "Product Name 1", code: "P001", price: 500, quantity: 1, img: "/images/product.png" },
        { id: 2, name: "Product Name 2", code: "P002", price: 750, quantity: 2, img: "/images/product.png" }
    ]);

    const increaseQuantity = (id) => {
        setProducts(products.map(p => 
            p.id === id ? { ...p, quantity: p.quantity + 1 } : p
        ));
    };

    const decreaseQuantity = (id) => {
        setProducts(products.map(p => 
            p.id === id && p.quantity > 1 ? { ...p, quantity: p.quantity - 1 } : p
        ));
    };

    // 🗑️ Delete product
    const deleteProduct = (id) => {
        setProducts(products.filter(p => p.id !== id));
    };

    const totalPrice = products.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <>
            <div className={styles.title}>Payment</div>

            <div className={styles.paymentContainer}>
                {/* Left Section */}
                <div className={styles.leftSection}>
                    {/* Contact */}
                    <div className={styles.contactSection}>
                        <h2>
                            Contact 
                            <span style={{ float: "right", fontSize: "14px", cursor: "pointer" }}>Log in</span>
                        </h2>
                        <input type="text" placeholder="Enter Phone Number / E-mail id:" />
                    </div>

                    {/* Delivery */}
                    <div className={styles.deliverySection}>
                        <h2>Delivery</h2>
                        <input type="text" placeholder="Country/Region" />
                        <div className={styles.row}>
                            <input type="text" placeholder="First Name" />
                            <input type="text" placeholder="Last Name" />
                        </div>
                        <textarea placeholder="Address"></textarea>
                        <div className={styles.row}>
                            <input type="text" placeholder="City" />
                            <input type="text" placeholder="State" />
                            <input type="text" placeholder="Pin code" />
                        </div>
                        <input type="text" placeholder="Phone / Whatsapp number" />
                    </div>

                    {/* Payment */}
                    <div className={styles.paymentSection}>
                        <h2>Payment</h2>
                        <p>All transactions are secure and encrypted.</p>
                        <input type="text" placeholder="Razorpay Secure (UPI, Cards, Wallets, NetBanking)" />
                        <p>
                            After clicking "Pay now", you will be redirected to Razorpay Secure 
                            (UPI, Cards, Wallets, NetBanking) to complete your purchase securely.
                        </p>
                        <button className={styles.payNow}>Pay Now</button>
                    </div>
                </div>

                {/* Right Section - Dynamic Products */}
                <div className={styles.rightSection}>
                    {products.map((product) => (
                        <div key={product.id} className={styles.productItem}>
                            <img src={product.img} alt={product.name} />
                            <div className={styles.productDetails}>
                                <h3>{product.name}</h3>
                                <p>{product.code}</p>
                                <p>₹{product.price}</p>
                                <div className={styles.quantityControl}>
                                    <button onClick={() => decreaseQuantity(product.id)}>-</button>
                                    <span>{product.quantity}</span>
                                    <button onClick={() => increaseQuantity(product.id)}>+</button>
                                </div>
                            </div>
                            {/* 🗑️ Delete button */}
                            <button 
                                className={styles.deleteBtn} 
                                onClick={() => deleteProduct(product.id)}
                            >
                                ✕
                            </button>
                        </div>
                    ))}

                    {/* Total */}
                    <div className={styles.summary}>
                        <span>Estimated total</span>
                        <span>₹{totalPrice}</span>
                    </div>
                    <small>Taxes and shipping are calculated at checkout.</small>
                </div>
            </div>
        </>
    );
};

export default Payment;
